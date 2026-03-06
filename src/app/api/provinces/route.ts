import { NextResponse } from 'next/server';
import {prisma} from '@/src/lib/prisma'

export async function GET() {
  try {
    const provinces = await prisma.provinces.findMany({
    //   orderBy: {
    //     code: 'asc',           // sắp xếp theo mã tỉnh tăng dần
    //   },
      // select: {               // nếu chỉ muốn lấy vài field
      //   id: true,
      //   code: true,
      //   name: true,
      // },
    });

    return NextResponse.json({
      success: true,
      data: provinces,
      count: provinces.length,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: 'Lỗi server' },
      { status: 500 }
    );
  }
}