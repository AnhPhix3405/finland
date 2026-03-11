import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

// GET /api/tags - Get all unique tag names for autocomplete
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q'); // Optional search query
    
    let whereCondition = {};
    
    if (query) {
      whereCondition = {
        name: {
          contains: query,
          mode: 'insensitive'
        }
      };
    }

    const tags = await prisma.tags.findMany({
      where: whereCondition,
      select: {
        name: true
      },
      distinct: ['name'],
      orderBy: {
        name: 'asc'
      },
      take: 20 // Limit results for performance
    });

    const tagNames = tags.map(tag => tag.name);
    
    return NextResponse.json({
      success: true,
      data: tagNames
    });

  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tags' },
      { status: 500 }
    );
  }
}

// POST /api/tags - Create bulk tags (for testing purposes)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { names } = body; // Array of tag names

    if (!names || !Array.isArray(names)) {
      return NextResponse.json(
        { success: false, error: 'Names array is required' },
        { status: 400 }
      );
    }

    const createdTags = [];
    
    for (const name of names) {
      if (name && name.trim()) {
        const slug = name.toLowerCase()
          .trim()
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]+/g, '')
          .replace(/\-\-+/g, '-')
          .replace(/^-+/, '')
          .replace(/-+$/, '');

        try {
          const tag = await prisma.tags.upsert({
            where: { name: name.trim() },
            update: {},
            create: {
              name: name.trim(),
              slug: slug
            }
          });
          createdTags.push(tag);
        } catch (error) {
          console.error(`Error creating tag ${name}:`, error);
        }
      }
    }

    return NextResponse.json({
      success: true,
      data: createdTags,
      message: `Processed ${createdTags.length} tags`
    });

  } catch (error) {
    console.error('Error creating tags:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create tags' },
      { status: 500 }
    );
  }
}
