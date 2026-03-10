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
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const listings = await prisma.listings.findMany({
      skip,
      take: limit,
      include: {
        brokers: {
          select: {
            id: true,
            full_name: true,
            phone: true,
            email: true,
            avatar_url: true
          }
        }
      },
      orderBy: {
        id: 'desc' // Order by creation (assuming newer UUID comes after)
      }
    });

    const total = await prisma.listings.count();

    return NextResponse.json(serializeData({
      success: true,
      data: listings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    }));

  } catch (error) {
    console.error('Error fetching listings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch listings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['broker_id', 'title', 'description', 'transaction_type', 'property_type', 'province', 'ward'];
    const missingFields = requiredFields.filter(field => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Missing required fields: ${missingFields.join(', ')}`
        },
        { status: 400 }
      );
    }

    // Extract valid fields
    const {
      broker_id, title, description, transaction_type,
      property_type, province, ward, address,
      area, width, length, price, direction
    } = body;

    // Convert price to BigInt if provided and not empty
    let priceBigInt: bigint | null = null;
    if (price !== undefined && price !== null && price !== "") {
      try {
        priceBigInt = BigInt(price);
      } catch (e) {
        console.error("Error converting price to BigInt:", e);
      }
    }

    const listing = await prisma.listings.create({
      data: {
        broker_id,
        title,
        description,
        transaction_type,
        property_type,
        province,
        ward,
        address,
        area: area ?? null,
        width: width ?? null,
        length: length ?? null,
        price: priceBigInt,
        direction,
        status: 'Đang chờ duyệt',
      },
      include: {
        brokers: {
          select: {
            id: true,
            full_name: true,
            phone: true,
            email: true,
            avatar_url: true
          }
        }
      }
    });

    return NextResponse.json(serializeData({
      success: true,
      data: listing,
      message: 'Listing created successfully'
    }));

  } catch (error) {
    console.error('Error creating listing:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create listing' },
      { status: 500 }
    );
  }
}
