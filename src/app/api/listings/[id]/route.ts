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
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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