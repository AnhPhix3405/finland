import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma'
import { projectsWhereInput } from '../../generated/prisma/models';
type status = 's_p_m__b_n' | 'ang_m__b_n' | 'h_ng_th__c_p'
// GET - Lấy danh sách tất cả dự án
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status: status | null = searchParams.get('status') as status | null;
    const search = searchParams.get('search');

    const skip = (page - 1) * limit;

    // Tạo điều kiện where
    const where: projectsWhereInput = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { project_code: { contains: search, mode: 'insensitive' } },
        { developer: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Lấy tổng số bản ghi
    const totalCount = await prisma.projects.count({ where });

    // Lấy danh sách dự án
    const projects = await prisma.projects.findMany({
      where,
      skip,
      take: limit,
      orderBy: {}
    });

    return NextResponse.json({
      success: true,
      data: projects,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { success: false, error: 'Lỗi khi lấy danh sách dự án' },
      { status: 500 }
    );
  }
}

// POST - Tạo dự án mới
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      project_code,
      name,
      slug,
      address,
      developer,
      contact_name,
      contact_phone,
      content,
      status = 'sắp mở bán',
      area_min,
      area_max
    } = body;

    // Validation
    if (!name || !slug) {
      return NextResponse.json(
        { success: false, error: 'Tên dự án và slug là bắt buộc' },
        { status: 400 }
      );
    }

    // Kiểm tra slug đã tồn tại chưa
    const existingProject = await prisma.projects.findFirst({
      where: {
        OR: [
          { slug: slug },
          { project_code: project_code }
        ]
      }
    });

    if (existingProject) {
      return NextResponse.json(
        { success: false, error: 'Slug hoặc mã dự án đã tồn tại' },
        { status: 400 }
      );
    }

    // Tạo dự án mới
    const newProject = await prisma.projects.create({
      data: {
        project_code,
        name,
        slug,
        address,
        developer,
        contact_name,
        contact_phone,
        content,
        status,
        area_min: area_min ? parseInt(area_min) : null,
        area_max: area_max ? parseInt(area_max) : null
      }
    });

    return NextResponse.json({
      success: true,
      data: newProject,
      message: 'Tạo dự án thành công'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { success: false, error: 'Lỗi khi tạo dự án' },
      { status: 500 }
    );
  }
}

// PATCH - Cập nhật dự án
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID dự án là bắt buộc' },
        { status: 400 }
      );
    }

    // Kiểm tra dự án có tồn tại không
    const existingProject = await prisma.projects.findUnique({
      where: { id }
    });

    if (!existingProject) {
      return NextResponse.json(
        { success: false, error: 'Dự án không tồn tại' },
        { status: 404 }
      );
    }

    // Kiểm tra slug/project_code trùng lặp (nếu có thay đổi)
    if (updateData.slug || updateData.project_code) {
      const duplicateProject = await prisma.projects.findFirst({
        where: {
          AND: [
            { id: { not: id } },
            {
              OR: [
                { slug: updateData.slug },
                { project_code: updateData.project_code }
              ]
            }
          ]
        }
      });

      if (duplicateProject) {
        return NextResponse.json(
          { success: false, error: 'Slug hoặc mã dự án đã tồn tại' },
          { status: 400 }
        );
      }
    }

    // Xử lý area_min, area_max
    if (updateData.area_min) updateData.area_min = parseInt(updateData.area_min);
    if (updateData.area_max) updateData.area_max = parseInt(updateData.area_max);

    // Cập nhật dự án
    const updatedProject = await prisma.projects.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json({
      success: true,
      data: updatedProject,
      message: 'Cập nhật dự án thành công'
    });

  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { success: false, error: 'Lỗi khi cập nhật dự án' },
      { status: 500 }
    );
  }
}

// DELETE - Xóa dự án
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID dự án là bắt buộc' },
        { status: 400 }
      );
    }

    // Kiểm tra dự án có tồn tại không
    const existingProject = await prisma.projects.findUnique({
      where: { id }
    });

    if (!existingProject) {
      return NextResponse.json(
        { success: false, error: 'Dự án không tồn tại' },
        { status: 404 }
      );
    }

    // Xóa dự án
    await prisma.projects.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: 'Xóa dự án thành công'
    });

  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { success: false, error: 'Lỗi khi xóa dự án' },
      { status: 500 }
    );
  }
}
