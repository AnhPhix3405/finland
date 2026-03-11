import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

// Hàm tạo hashtag từ name
function generateHashtag(name: string): string {
    return name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .replace(/đ/g, 'd')
        .replace(/[^a-z0-9\s]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

// GET - Lấy danh sách tất cả transaction_types
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '50');
        const search = searchParams.get('search');

        const skip = (page - 1) * limit;

        // Tạo điều kiện where
        const where: any = {};

        if (search) {
            where.name = { contains: search, mode: 'insensitive' };
        }

        // Lấy tổng số bản ghi
        const totalCount = await prisma.transaction_types.count({ where });

        // Lấy danh sách transaction types
        const transactionTypes = await prisma.transaction_types.findMany({
            where,
            skip,
            take: limit,
            orderBy: { name: 'asc' }
        });

        return NextResponse.json({
            success: true,
            data: transactionTypes,
            pagination: {
                page,
                limit,
                total: totalCount,
                totalPages: Math.ceil(totalCount / limit)
            }
        });

    } catch (error) {
        console.error('Error fetching transaction types:', error);
        return NextResponse.json(
            { success: false, error: 'Lỗi khi lấy danh sách loại hình giao dịch' },
            { status: 500 }
        );
    }
}

// POST - Tạo transaction type mới
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, hashtag } = body;

        // Validation
        if (!name || name.trim() === '') {
            return NextResponse.json(
                { success: false, error: 'Tên loại hình giao dịch là bắt buộc' },
                { status: 400 }
            );
        }

        const trimmedName = name.trim();
        const finalHashtag = hashtag?.trim() || generateHashtag(trimmedName);

        // Kiểm tra tên đã tồn tại chưa
        const existingType = await prisma.transaction_types.findUnique({
            where: { name: trimmedName }
        });

        if (existingType) {
            return NextResponse.json(
                { success: false, error: 'Tên loại hình giao dịch đã tồn tại' },
                { status: 400 }
            );
        }

        // Kiểm tra hashtag đã tồn tại chưa
        const existingHashtag = await prisma.transaction_types.findUnique({
            where: { hashtag: finalHashtag }
        });

        if (existingHashtag) {
            return NextResponse.json(
                { success: false, error: 'Hashtag đã tồn tại' },
                { status: 400 }
            );
        }

        // Tạo transaction type mới
        const newTransactionType = await prisma.transaction_types.create({
            data: {
                name: trimmedName,
                hashtag: finalHashtag
            }
        });

        return NextResponse.json({
            success: true,
            data: newTransactionType,
            message: 'Tạo loại hình giao dịch thành công'
        }, { status: 201 });

    } catch (error) {
        console.error('Error creating transaction type:', error);
        return NextResponse.json(
            { success: false, error: 'Lỗi khi tạo loại hình giao dịch' },
            { status: 500 }
        );
    }
}

// PATCH - Cập nhật transaction type
export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, name, hashtag } = body;

        if (!id || !name || name.trim() === '') {
            return NextResponse.json(
                { success: false, error: 'ID và tên loại hình giao dịch là bắt buộc' },
                { status: 400 }
            );
        }

        const trimmedName = name.trim();
        const finalHashtag = hashtag?.trim() || generateHashtag(trimmedName);

        // Kiểm tra transaction type có tồn tại không
        const existingType = await prisma.transaction_types.findUnique({
            where: { id }
        });

        if (!existingType) {
            return NextResponse.json(
                { success: false, error: 'Loại hình giao dịch không tồn tại' },
                { status: 404 }
            );
        }

        // Kiểm tra tên trùng lặp (nếu có thay đổi)
        if (trimmedName !== existingType.name) {
            const duplicateType = await prisma.transaction_types.findFirst({
                where: {
                    AND: [
                        { id: { not: id } },
                        { name: trimmedName }
                    ]
                }
            });

            if (duplicateType) {
                return NextResponse.json(
                    { success: false, error: 'Tên loại hình giao dịch đã tồn tại' },
                    { status: 400 }
                );
            }
        }

        // Kiểm tra hashtag trùng lặp (nếu có thay đổi)
        if (finalHashtag !== existingType.hashtag) {
            const duplicateHashtag = await prisma.transaction_types.findFirst({
                where: {
                    AND: [
                        { id: { not: id } },
                        { hashtag: finalHashtag }
                    ]
                }
            });

            if (duplicateHashtag) {
                return NextResponse.json(
                    { success: false, error: 'Hashtag đã tồn tại' },
                    { status: 400 }
                );
            }
        }

        // Cập nhật transaction type
        const updatedTransactionType = await prisma.transaction_types.update({
            where: { id },
            data: {
                name: trimmedName,
                hashtag: finalHashtag,
                updated_at: new Date()
            }
        });

        return NextResponse.json({
            success: true,
            data: updatedTransactionType,
            message: 'Cập nhật loại hình giao dịch thành công'
        });

    } catch (error) {
        console.error('Error updating transaction type:', error);
        return NextResponse.json(
            { success: false, error: 'Lỗi khi cập nhật loại hình giao dịch' },
            { status: 500 }
        );
    }
}

// DELETE - Xóa transaction type
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { success: false, error: 'ID loại hình giao dịch là bắt buộc' },
                { status: 400 }
            );
        }

        // Kiểm tra transaction type có tồn tại không
        const existingType = await prisma.transaction_types.findUnique({
            where: { id }
        });

        if (!existingType) {
            return NextResponse.json(
                { success: false, error: 'Loại hình giao dịch không tồn tại' },
                { status: 404 }
            );
        }

        // Kiểm tra có project nào đang sử dụng không
        const projectsUsingType = await prisma.projects.count({
            where: { transaction_type_id: id }
        });

        if (projectsUsingType > 0) {
            return NextResponse.json(
                { success: false, error: `Không thể xóa. Có ${projectsUsingType} dự án đang sử dụng loại hình này` },
                { status: 400 }
            );
        }

        // Kiểm tra có listing nào đang sử dụng không
        const listingsUsingType = await prisma.listings.count({
            where: { transaction_type_id: id }
        });

        if (listingsUsingType > 0) {
            return NextResponse.json(
                { success: false, error: `Không thể xóa. Có ${listingsUsingType} bài đăng đang sử dụng loại hình này` },
                { status: 400 }
            );
        }

        // Xóa transaction type
        await prisma.transaction_types.delete({
            where: { id }
        });

        return NextResponse.json({
            success: true,
            message: 'Xóa loại hình giao dịch thành công'
        });

    } catch (error) {
        console.error('Error deleting transaction type:', error);
        return NextResponse.json(
            { success: false, error: 'Lỗi khi xóa loại hình giao dịch' },
            { status: 500 }
        );
    }
}