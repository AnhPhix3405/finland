import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { processTagsForListing } from '@/src/app/modules/tags.service.server';

// Helper function to handle BigInt serialization
function serializeData(data: any) {
  return JSON.parse(
    JSON.stringify(data, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    )
  );
}

// Helper function to convert Vietnamese text to URL-friendly slug
function createSlug(text: string): string {
  // Vietnamese character mappings
  const vietnameseMap: { [key: string]: string } = {
    'à': 'a', 'á': 'a', 'ạ': 'a', 'ả': 'a', 'ã': 'a', 'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ậ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ặ': 'a', 'ẳ': 'a', 'ẵ': 'a',
    'è': 'e', 'é': 'e', 'ẹ': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ê': 'e', 'ề': 'e', 'ế': 'e', 'ệ': 'e', 'ể': 'e', 'ễ': 'e',
    'ì': 'i', 'í': 'i', 'ị': 'i', 'ỉ': 'i', 'ĩ': 'i',
    'ò': 'o', 'ó': 'o', 'ọ': 'o', 'ỏ': 'o', 'õ': 'o', 'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ộ': 'o', 'ổ': 'o', 'ỗ': 'o', 'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ợ': 'o', 'ở': 'o', 'ỡ': 'o',
    'ù': 'u', 'ú': 'u', 'ụ': 'u', 'ủ': 'u', 'ũ': 'u', 'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ự': 'u', 'ử': 'u', 'ữ': 'u',
    'ỳ': 'y', 'ý': 'y', 'ỵ': 'y', 'ỷ': 'y', 'ỹ': 'y',
    'đ': 'd',
    'À': 'A', 'Á': 'A', 'Ạ': 'A', 'Ả': 'A', 'Ã': 'A', 'Â': 'A', 'Ầ': 'A', 'Ấ': 'A', 'Ậ': 'A', 'Ẩ': 'A', 'Ẫ': 'A', 'Ă': 'A', 'Ằ': 'A', 'Ắ': 'A', 'Ặ': 'A', 'Ẳ': 'A', 'Ẵ': 'A',
    'È': 'E', 'É': 'E', 'Ẹ': 'E', 'Ẻ': 'E', 'Ẽ': 'E', 'Ê': 'E', 'Ề': 'E', 'Ế': 'E', 'Ệ': 'E', 'Ể': 'E', 'Ễ': 'E',
    'Ì': 'I', 'Í': 'I', 'Ị': 'I', 'Ỉ': 'I', 'Ĩ': 'I',
    'Ò': 'O', 'Ó': 'O', 'Ọ': 'O', 'Ỏ': 'O', 'Õ': 'O', 'Ô': 'O', 'Ồ': 'O', 'Ố': 'O', 'Ộ': 'O', 'Ổ': 'O', 'Ỗ': 'O', 'Ơ': 'O', 'Ờ': 'O', 'Ớ': 'O', 'Ợ': 'O', 'Ở': 'O', 'Ỡ': 'O',
    'Ù': 'U', 'Ú': 'U', 'Ụ': 'U', 'Ủ': 'U', 'Ũ': 'U', 'Ư': 'U', 'Ừ': 'U', 'Ứ': 'U', 'Ự': 'U', 'Ử': 'U', 'Ữ': 'U',
    'Ỳ': 'Y', 'Ý': 'Y', 'Ỵ': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y',
    'Đ': 'D'
  };

  let slug = text.toLowerCase();
  
  // Replace Vietnamese characters
  for (const [viet, eng] of Object.entries(vietnameseMap)) {
    slug = slug.replace(new RegExp(viet, 'g'), eng);
  }
  
  return slug
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

// Helper function to ensure unique slug
async function generateUniqueSlug(title: string): Promise<string> {
  let baseSlug = createSlug(title);
  let slug = baseSlug;
  let counter = 1;

  // Check if slug already exists
  while (true) {
    const existingListing = await prisma.listings.findFirst({
      where: { slug }
    });

    if (!existingListing) {
      break;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    const hashtags = searchParams.get('hashtags'); // Get hashtags parameter

    // Build where clause based on hashtags
    let whereClause: any = {
      // Public users only see approved listings
      status: {
        notIn: ['Đang chờ duyệt', 'Đang ẩn', 'Bị từ chối']
      }
    };
    
    if (hashtags) {
      const hashtagList = hashtags.split(',').map(tag => tag.trim().toLowerCase());
      console.log('Filtering by hashtags:', hashtagList);
      
      // Find matching IDs from different tables
      const [transactionTypes, propertyTypes, tags] = await Promise.all([
        // Find transaction types with matching hashtags
        prisma.transaction_types.findMany({
          where: {
            hashtag: {
              in: hashtagList
            }
          },
          select: { id: true, hashtag: true }
        }),
        // Find property types with matching hashtags  
        prisma.property_types.findMany({
          where: {
            hashtag: {
              in: hashtagList
            }
          },
          select: { id: true, hashtag: true }
        }),
        // Find tags with matching slugs
        prisma.tags.findMany({
          where: {
            slug: {
              in: hashtagList
            }
          },
          select: { id: true, slug: true }
        })
      ]);

      console.log('Found transaction types:', transactionTypes);
      console.log('Found property types:', propertyTypes);
      console.log('Found tags:', tags);

      // Build OR conditions based on found IDs
      const orConditions = [];

      if (transactionTypes.length > 0) {
        orConditions.push({
          transaction_type_id: {
            in: transactionTypes.map(t => t.id)
          }
        });
      }

      if (propertyTypes.length > 0) {
        orConditions.push({
          property_type_id: {
            in: propertyTypes.map(p => p.id)
          }
        });
      }

      if (tags.length > 0) {
        orConditions.push({
          tags: {
            some: {
              id: {
                in: tags.map(tag => tag.id)
              }
            }
          }
        });
      }

      if (orConditions.length > 0) {
        whereClause.AND = [
          {
            status: {
              notIn: ['Đang chờ duyệt', 'Đang ẩn', 'Bị từ chối']
            }
          },
          {
            OR: orConditions
          }
        ];
        
        // Remove the top-level status since it's in AND clause now
        delete whereClause.status;
      }
    }

    const listings = await prisma.listings.findMany({
      where: whereClause,
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
      },
      orderBy: {
        id: 'desc' // Order by creation (assuming newer UUID comes after)
      }
    });

    const total = await prisma.listings.count({ where: whereClause });
    
    console.log(`Found ${listings.length} listings with whereClause:`, JSON.stringify(whereClause, null, 2));

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
    const requiredFields = ['broker_id', 'title', 'description', 'province', 'ward'];
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
      broker_id, title, description, slug: clientSlug, transaction_type_id,
      property_type_id, province, ward, address,
      area, width, length, price, direction, tags,
      contact_name: rawContactName, contact_phone: rawContactPhone
    } = body;

    // Generate listing_code (e.g. FIN26000001)
    const currentYearStr = new Date().getFullYear().toString().substring(2, 4);
    const prefix = `FIN${currentYearStr}`;
    
    // Find the latest listing code for the current year to determine next sequence
    const latestListing = await prisma.listings.findFirst({
      where: {
        listing_code: {
          startsWith: prefix
        }
      },
      orderBy: {
        listing_code: 'desc'
      },
      select: {
        listing_code: true
      }
    });

    let nextSequenceNumber = 1;
    if (latestListing && latestListing.listing_code) {
      // Extract the 6-digit sequence from the end
      const lastSeqStr = latestListing.listing_code.substring(5); // prefix is 5 chars e.g. FIN26
      const lastSeqNum = parseInt(lastSeqStr, 10);
      if (!isNaN(lastSeqNum)) {
        nextSequenceNumber = lastSeqNum + 1;
      }
    }
    
    // Format to 6 digits, e.g. 000001
    const sequenceStr = nextSequenceNumber.toString().padStart(6, '0');
    const finalListingCode = `${prefix}${sequenceStr}`;

    // Convert price to BigInt if provided and not empty
    let priceBigInt: bigint | null = null;
    if (price !== undefined && price !== null && price !== "") {
      try {
        priceBigInt = BigInt(price);
      } catch (e) {
        console.error("Error converting price to BigInt:", e);
      }
    }

    // Use provided slug or generate from title
    let finalSlug: string;
    if (clientSlug && clientSlug.trim()) {
      // Validate and sanitize the provided slug
      finalSlug = createSlug(clientSlug.trim());
      
      // Ensure uniqueness
      let counter = 1;
      let uniqueSlug = finalSlug;
      while (true) {
        const existingListing = await prisma.listings.findFirst({
          where: { slug: uniqueSlug }
        });
        if (!existingListing) {
          finalSlug = uniqueSlug;
          break;
        }
        uniqueSlug = `${finalSlug}-${counter}`;
        counter++;
      }
    } else {
      // Generate unique slug from title
      finalSlug = await generateUniqueSlug(title);
    }

    // Resolve contact info: use provided value or fall back to broker data
    let finalContactName: string | null = null;
    let finalContactPhone: string | null = null;

    if (rawContactName && rawContactName.trim()) {
      finalContactName = rawContactName.trim();
    } else {
      // Fallback: fetch broker data
      const broker = await prisma.brokers.findUnique({
        where: { id: broker_id },
        select: { full_name: true, phone: true }
      });
      if (broker) {
        finalContactName = broker.full_name;
        finalContactPhone = broker.phone;
      }
    }

    if (rawContactPhone && rawContactPhone.trim()) {
      finalContactPhone = rawContactPhone.trim();
    } else if (finalContactPhone === null) {
      // Only fetch if we haven't already fetched broker (fallback above sets it)
      const broker = await prisma.brokers.findUnique({
        where: { id: broker_id },
        select: { phone: true }
      });
      if (broker) {
        finalContactPhone = broker.phone;
      }
    }

    const listing = await prisma.listings.create({
      data: {
        broker_id,
        title,
        description,
        transaction_type_id,
        property_type_id,
        province,
        ward,
        address,
        area: area ?? null,
        width: width ?? null,
        length: length ?? null,
        price: priceBigInt,
        direction,
        slug: finalSlug,
        status: 'Đang chờ duyệt',
        contact_name: finalContactName,
        contact_phone: finalContactPhone,
        listing_code: finalListingCode,
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

    // Process tags if provided
    let processedTags: Awaited<ReturnType<typeof processTagsForListing>> = [];
    if (tags && Array.isArray(tags) && tags.length > 0) {
      try {
        processedTags = await processTagsForListing(tags, listing.id);
        console.log(`Created/found ${processedTags.length} tags for listing ${listing.id}`);
      } catch (tagError) {
        console.error('Error processing tags:', tagError);
        // Don't fail the entire operation if tags fail
      }
    }

    return NextResponse.json(serializeData({
      success: true,
      data: listing,
      tags: processedTags,
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
