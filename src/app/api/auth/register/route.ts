import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { hashPassword } from '@/src/app/modules/auth/passwordHasher';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            full_name,
            phone,
            email,
            password,
            slug,
            province,
            ward,
            referrer_phone
        } = body;

        // Validation cơ bản
        if (!full_name || !phone || !password) {
            return NextResponse.json(
                { success: false, error: 'Họ tên, số điện thoại và mật khẩu là bắt buộc' },
                { status: 400 }
            );
        }

        // Kiểm tra trùng lặp
        const existingBroker = await prisma.brokers.findFirst({
            where: {
                OR: [
                    { phone: phone },
                    ...(slug ? [{ slug: slug }] : []),
                    ...(email ? [{ email: email }] : [])
                ]
            }
        });

        if (existingBroker) {
            let errorMessage = 'Số điện thoại đã tồn tại';
            if (existingBroker.slug === slug) errorMessage = 'Slug đã tồn tại';
            if (existingBroker.email === email) errorMessage = 'Email đã tồn tại';
            return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
        }

        // Hash mật khẩu
        const password_hash = await hashPassword(password);

        // Tạo broker mới
        const newBroker = await prisma.brokers.create({
            data: {
                full_name,
                phone,
                email,
                password_hash,
                slug: slug || phone, // Fallback slug nếu không có
                province,
                ward,
                referrer_phone,
                is_active: true
            }
        });

        const { password_hash: _, ...safeBroker } = newBroker;

        return NextResponse.json({
            success: true,
            data: safeBroker,
            message: 'Đăng ký tài khoản môi giới thành công'
        }, { status: 201 });

    } catch (error: any) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { success: false, error: 'Lỗi trong quá trình đăng ký' },
            { status: 500 }
        );
    }
}
