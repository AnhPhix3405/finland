import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

// GET - Lấy danh sách tất cả attachments
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const search = searchParams.get('search');
        const project_id = searchParams.get('project_id');
        const slug = searchParams.get('slug');

        const skip = (page - 1) * limit;

        // Tạo điều kiện where
        const where: any = {};

        if (project_id) {
            where.project_id = project_id;
        }

        if (slug) {
            where.projects = { slug: slug };
        }

        if (search) {
            where.original_name = { contains: search, mode: 'insensitive' };
        }

        // Lấy tổng số bản ghi
        const totalCount = await prisma.attachments.count({ where });

        // Lấy danh sách attachments
        const attachments = await prisma.attachments.findMany({
            where,
            skip,
            take: limit,
            orderBy: { created_at: 'desc' }
        });

        // Prisma trả về BigInt cho trường size_bytes, Nextjs JSON() không parse được BigInt trực tiếp.
        // Xử lý parse size_bytes sang string
        const serializedAttachments = attachments.map(item => ({
            ...item,
            size_bytes: item.size_bytes ? item.size_bytes.toString() : null
        }));

        return NextResponse.json({
            success: true,
            data: serializedAttachments,
            pagination: {
                page,
                limit,
                total: totalCount,
                totalPages: Math.ceil(totalCount / limit)
            }
        });

    } catch (error) {
        console.error('Error fetching attachments:', error);
        return NextResponse.json(
            { success: false, error: 'Lỗi khi lấy danh sách attachments' },
            { status: 500 }
        );
    }
}

// POST - Tạo attachment mới
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const {
            url,
            secure_url,
            size_bytes,
            original_name,
            public_id,
            project_id
        } = body;

        // Validation
        if (!url || !secure_url || !project_id) {
            return NextResponse.json(
                { success: false, error: 'url, secure_url và project_id là bắt buộc' },
                { status: 400 }
            );
        }

        // Tạo attachment mới
        const newAttachment = await prisma.attachments.create({
            data: {
                url,
                secure_url,
                size_bytes: size_bytes ? BigInt(size_bytes) : null,
                original_name,
                public_id,
                project_id
            }
        });

        // Chuyển BigInt sang string để trả về JSON
        const serializedAttachment = {
            ...newAttachment,
            size_bytes: newAttachment.size_bytes ? newAttachment.size_bytes.toString() : null
        };

        return NextResponse.json({
            success: true,
            data: serializedAttachment,
            message: 'Tạo attachment thành công'
        }, { status: 201 });

    } catch (error) {
        console.error('Error creating attachment:', error);
        return NextResponse.json(
            { success: false, error: 'Lỗi khi tạo attachment' },
            { status: 500 }
        );
    }
}
