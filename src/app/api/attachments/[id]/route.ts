import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import cloudinary from '@/src/lib/cloudinary';

// DELETE /api/attachments/[id]
export async function DELETE(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Tìm attachment trong DB để lấy public_id
        const attachment = await prisma.attachments.findUnique({
            where: { id }
        });

        if (!attachment) {
            return NextResponse.json(
                { success: false, error: 'Không tìm thấy attachment' },
                { status: 404 }
            );
        }

        // Xóa trên Cloudinary nếu có public_id
        if (attachment.public_id) {
            await cloudinary.uploader.destroy(attachment.public_id);
        }

        // Xóa record trong DB
        await prisma.attachments.delete({ where: { id } });

        return NextResponse.json({ success: true, message: 'Đã xóa attachment' });

    } catch (error) {
        console.error('Error deleting attachment:', error);
        return NextResponse.json(
            { success: false, error: 'Lỗi khi xóa attachment' },
            { status: 500 }
        );
    }
}
