import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { verifyToken } from '@/src/app/modules/auth/jwt';

// POST - Create or toggle bookmark
export async function POST(request: NextRequest) {
  try {
    // Check authentication token
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token không tồn tại' },
        { status: 401 }
      );
    }

    // Verify token
    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { success: false, error: 'Token không hợp lệ' },
        { status: 401 }
      );
    }

    const { listing_id } = await request.json();

    if (!listing_id) {
      return NextResponse.json(
        { success: false, error: 'Thiếu listing_id' },
        { status: 400 }
      );
    }

    console.log('POST /api/bookmarks - Request:', {
      brokerId: (payload as any).id,
      listingId: listing_id
    });

    // Check if listing exists
    const listing = await prisma.listings.findUnique({
      where: { id: listing_id }
    });

    if (!listing) {
      return NextResponse.json(
        { success: false, error: 'Bài đăng không tồn tại' },
        { status: 404 }
      );
    }

    // Check if bookmark already exists for this broker and listing
    const existingBookmark = await prisma.bookmarks.findFirst({
      where: {
        listing_id,
        broker_id: (payload as any).id as string
      }
    });

    if (existingBookmark) {
      // Delete bookmark (toggle off)
      await prisma.bookmarks.delete({
        where: {
          id: existingBookmark.id
        }
      });

      console.log('POST /api/bookmarks - Deleted bookmark:', {
        bookmarkId: existingBookmark.id,
        brokerId: (payload as any).id,
        listingId: listing_id
      });

      return NextResponse.json({
        success: true,
        data: {
          bookmarked: false,
          message: 'Đã bỏ lưu bài đăng'
        }
      });
    }

    // Create bookmark with broker_id
    const bookmark = await prisma.bookmarks.create({
      data: {
        listing_id,
        broker_id: (payload as any).id as string
      }
    });

    console.log('POST /api/bookmarks - Created bookmark:', {
      bookmarkId: bookmark.id,
      brokerId: (payload as any).id,
      listingId: listing_id
    });

    return NextResponse.json({
      success: true,
      data: {
        id: bookmark.id,
        bookmarked: true,
        message: 'Đã lưu bài đăng'
      }
    });

  } catch (error) {
    console.error('Error managing bookmark:', error);
    return NextResponse.json(
      { success: false, error: 'Lỗi khi thao tác bookmark' },
      { status: 500 }
    );
  }
}

// GET - Check if listings are bookmarked by current broker
export async function GET(request: NextRequest) {
  try {
    // Check authentication token
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token không tồn tại' },
        { status: 401 }
      );
    }

    // Verify token
    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { success: false, error: 'Token không hợp lệ' },
        { status: 401 }
      );
    }
    const { searchParams } = new URL(request.url);
    const listing_ids = searchParams.get('listing_ids')?.split(',') || [];

    if (listing_ids.length === 0) {
      return NextResponse.json({
        success: true,
        data: {}
      });
    }

    // Get all bookmarks for these listings by current broker
    const bookmarks = await prisma.bookmarks.findMany({
      where: {
        broker_id: (payload as any).id as string,
        listing_id: {
          in: listing_ids
        }
      },
      select: {
        listing_id: true
      }
    });

    // Create a map of bookmarked listing IDs
    const bookmarkedMap = Object.fromEntries(
      bookmarks.map(b => [b.listing_id, true])
    );

    return NextResponse.json({
      success: true,
      data: bookmarkedMap
    });

  } catch (error) {
    console.error('Error checking bookmarks:', error);
    return NextResponse.json(
      { success: false, error: 'Lỗi khi kiểm tra bookmark' },
      { status: 500 }
    );
  }
}
