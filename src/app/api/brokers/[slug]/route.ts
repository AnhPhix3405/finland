import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

// GET /api/brokers/[slug] - Lấy 1 broker theo slug
export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

        const broker = await prisma.brokers.findFirst({
            where: { slug }
        });

        if (!broker) {
            return NextResponse.json(
                { success: false, error: 'Không tìm thấy môi giới' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: broker });

    } catch (error) {
        console.error('Error fetching broker:', error);
        return NextResponse.json(
            { success: false, error: 'Lỗi khi lấy thông tin môi giới' },
            { status: 500 }
        );
    }
}
