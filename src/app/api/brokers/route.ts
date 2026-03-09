import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { brokersWhereInput } from '../../generated/prisma/models';
import { hashPassword } from '@/src/app/modules/auth/passwordHasher';

// GET - Lấy danh sách tất cả môi giới
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const is_active = searchParams.get('is_active');
    const search = searchParams.get('search');
    const specialization = searchParams.get('specialization');
    const province = searchParams.get('province');
    const ward = searchParams.get('ward');


    const skip = (page - 1) * limit;

    // Tạo điều kiện where
    const where: brokersWhereInput = {};

    if (is_active !== null && is_active !== undefined) {
      where.is_active = is_active === 'true';
    }

    if (specialization) {
      where.specialization = { contains: specialization, mode: 'insensitive' };
    }

    if (province) {
      where.province = { contains: province, mode: 'insensitive' };
    }
    if (ward) {
      where.ward = { contains: ward, mode: 'insensitive' };
    }


    if (search) {
      where.OR = [
        { full_name: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Lấy tổng số bản ghi
    const totalCount = await prisma.brokers.count({ where });

    // Lấy danh sách môi giới
    const brokers = await prisma.brokers.findMany({
      where,
      skip,
      take: limit,
      orderBy: { created_at: 'desc' }
    });

    // Trả về danh sách môi giới (không bao gồm password_hash)
    const safeBrokers = brokers.map(({ password_hash, ...rest }) => rest);

    return NextResponse.json({
      success: true,
      data: safeBrokers,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    });


  } catch (error) {
    console.error('Error fetching brokers:', error);
    return NextResponse.json(
      { success: false, error: 'Lỗi khi lấy danh sách môi giới' },
      { status: 500 }
    );
  }
}

// PATCH - Cập nhật môi giới theo slug
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, password, ...updateData } = body;


    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Slug môi giới là bắt buộc' },
        { status: 400 }
      );
    }

    // Tìm broker theo slug để lấy id
    const existingBroker = await prisma.brokers.findFirst({
      where: { slug }
    });

    if (!existingBroker) {
      return NextResponse.json(
        { success: false, error: 'Môi giới không tồn tại' },
        { status: 404 }
      );
    }

    const id = existingBroker.id;

    // Kiểm tra phone/email trùng lặp (nếu có thay đổi)
    if (updateData.phone || updateData.email) {
      const duplicateBroker = await prisma.brokers.findFirst({
        where: {
          AND: [
            { id: { not: id } },
            {
              OR: [
                ...(updateData.phone ? [{ phone: updateData.phone }] : []),
                ...(updateData.email ? [{ email: updateData.email }] : [])
              ]
            }
          ]
        }
      });

      if (duplicateBroker) {
        let errorMessage = 'Dữ liệu đã tồn tại';
        if (duplicateBroker.phone === updateData.phone) errorMessage = 'Số điện thoại đã tồn tại';
        if (duplicateBroker.email === updateData.email) errorMessage = 'Email đã tồn tại';

        return NextResponse.json(
          { success: false, error: errorMessage },
          { status: 400 }
        );
      }
    }

    // Xử lý hash password nếu client gửi password mới
    const finalUpdateData: any = { ...updateData };
    if (password) {
      finalUpdateData.password_hash = await hashPassword(password);
    }

    // Xử lý is_active
    if (finalUpdateData.is_active !== undefined) {
      finalUpdateData.is_active = Boolean(finalUpdateData.is_active);
    }

    // Cập nhật môi giới
    const updatedBroker = await prisma.brokers.update({
      where: { id },
      data: {
        ...finalUpdateData,
        updated_at: new Date()
      }
    });

    const { password_hash: _, ...safeUpdatedBroker } = updatedBroker;

    return NextResponse.json({
      success: true,
      data: safeUpdatedBroker,
      message: 'Cập nhật môi giới thành công'
    });


  } catch (error) {
    console.error('Error updating broker:', error);
    return NextResponse.json(
      { success: false, error: 'Lỗi khi cập nhật môi giới' },
      { status: 500 }
    );
  }
}

// DELETE - Xóa môi giới
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID môi giới là bắt buộc' },
        { status: 400 }
      );
    }

    // Kiểm tra môi giới có tồn tại không
    const existingBroker = await prisma.brokers.findUnique({
      where: { id }
    });

    if (!existingBroker) {
      return NextResponse.json(
        { success: false, error: 'Môi giới không tồn tại' },
        { status: 404 }
      );
    }

    // Xóa môi giới
    await prisma.brokers.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: 'Xóa môi giới thành công'
    });

  } catch (error) {
    console.error('Error deleting broker:', error);
    return NextResponse.json(
      { success: false, error: 'Lỗi khi xóa môi giới' },
      { status: 500 }
    );
  }
}
