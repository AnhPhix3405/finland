import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

// Helper function to handle BigInt serialization
function serializeData(data: any) {
  return JSON.parse(
    JSON.stringify(data, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    )
  );
}

// GET /api/listings/[id] - Get listing by ID or slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Listing ID or slug is required' },
        { status: 400 }
      );
    }

    // Try to find by slug first, then by ID
    let listing = null;
    
    // Check if it's a UUID (ID) or slug
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
    
    if (isUUID) {
      // Find by ID
      listing = await prisma.listings.findUnique({
        where: { id },
        include: {
          brokers: {
            select: {
              id: true,
              full_name: true,
              phone: true,
              email: true,
              avatar_url: true,
              specialization: true,
              bio: true
            }
          },
          tags: {
            select: {
              id: true,
              name: true,
              slug: true
            }
          },
          property_types: {
            select: {
              id: true,
              name: true,
              hashtag: true
            }
          },
          transaction_types: {
            select: {
              id: true,
              name: true,
              hashtag: true
            }
          }
        }
      });
    } else {
      // Find by slug
      listing = await prisma.listings.findFirst({
        where: { slug: id },
        include: {
          brokers: {
            select: {
              id: true,
              full_name: true,
              phone: true,
              email: true,
              avatar_url: true,
              specialization: true,
              bio: true
            }
          },
          tags: {
            select: {
              id: true,
              name: true,
              slug: true
            }
          },
          property_types: {
            select: {
              id: true,
              name: true,
              hashtag: true
            }
          },
          transaction_types: {
            select: {
              id: true,
              name: true,
              hashtag: true
            }
          }
        }
      });
    }

    if (!listing) {
      return NextResponse.json(
        { success: false, error: 'Listing not found' },
        { status: 404 }
      );
    }

    // Only show approved listings for public access
    const publicStatuses = ['Đang hiển thị', 'Đã bán', 'Đã xong'];
    if (!publicStatuses.includes(listing.status || '')) {
      return NextResponse.json(
        { success: false, error: 'Listing not available' },
        { status: 404 }
      );
    }

    return NextResponse.json(serializeData({
      success: true,
      data: listing
    }));

  } catch (error) {
    console.error('Error fetching listing:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch listing' },
      { status: 500 }
    );
  }
}

// DELETE /api/listings/[id] - Delete a listing permanently
import { jwtVerify } from 'jose';
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_DO_NOT_USE_IN_PROD';
const secretKey = new TextEncoder().encode(JWT_SECRET);

async function verifyBrokerAuth(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { error: 'Authorization header is missing or invalid', status: 401 };
  }
  const token = authHeader.split(' ')[1];
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return { payload, token };
  } catch (err) {
    return { error: 'Invalid or expired token', status: 401 };
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Authenticate broker
    const auth = await verifyBrokerAuth(request);
    if ('error' in auth) {
      return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
    }

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Listing ID is required' },
        { status: 400 }
      );
    }

    // Check if listing exists
    const existingListing = await prisma.listings.findUnique({
      where: { id }
    });

    if (!existingListing) {
      return NextResponse.json(
        { success: false, error: 'Listing not found' },
        { status: 404 }
      );
    }

    // Permission check: ensure the broker owns this listing
    if (existingListing.broker_id !== auth.payload?.id) {
       return NextResponse.json({ success: false, error: 'Bạn không có quyền xóa bài đăng này' }, { status: 403 });
    }

    // Delete associated tags first (if any)
    await prisma.tags.deleteMany({
      where: { listing_id: id }
    });

    // Delete the listing
    await prisma.listings.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: 'Listing deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting listing:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete listing' },
      { status: 500 }
    );
  }
}

// PATCH /api/listings/[id] - Update listing status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Authenticate broker
    const auth = await verifyBrokerAuth(request);
    if ('error' in auth) {
      return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
    }

    const body = await request.json();
    const { id: _ignoredId, price, ...otherData } = body;

    // Check if listing exists
    const existingListing = await prisma.listings.findUnique({
      where: { id }
    });

    if (!existingListing) {
      return NextResponse.json({ success: false, error: 'Listing not found' }, { status: 404 });
    }

    // Permission check
    if (existingListing.broker_id !== auth.payload?.id) {
      return NextResponse.json({ success: false, error: 'Bạn không có quyền sửa bài đăng này' }, { status: 403 });
    }

    // Prepare update data
    const updateData: any = { ...otherData };
    if (price !== undefined) {
      if (price === null || price === "") {
        updateData.price = null;
      } else {
        try {
          updateData.price = BigInt(price);
        } catch (e) {
          console.error("Error converting price to BigInt:", e);
        }
      }
    }

    // Update the listing
    const updatedListing = await prisma.listings.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json(serializeData({
      success: true,
      message: 'Đã cập nhật bài đăng thành công',
      data: updatedListing
    }));

  } catch (error) {
    console.error('Error updating listing:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update listing' },
      { status: 500 }
    );
  }
}
