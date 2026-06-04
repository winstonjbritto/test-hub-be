import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, extractToken } from '@/lib/auth';
import { z } from 'zod';

const createSaintSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  feastDay: z.string().optional(),
  imageUrl: z.string().optional(),
  patronOf: z.string().optional(),
});

const updateSaintSchema = createSaintSchema.partial();

// Get saints
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(50, parseInt(searchParams.get('limit') || '10'));
    const skip = (page - 1) * limit;

    if (id) {
      // Get single saint
      const saint = await prisma.saint.findUnique({
        where: { id },
      });

      if (!saint) {
        return NextResponse.json({ error: 'Saint not found' }, { status: 404 });
      }

      return NextResponse.json(saint);
    }

    // Get all saints with pagination
    const [saints, total] = await Promise.all([
      prisma.saint.findMany({
        skip,
        take: limit,
        orderBy: { name: 'asc' },
      }),
      prisma.saint.count(),
    ]);

    return NextResponse.json({
      saints,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get saints error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Create saint (SUPER_ADMIN only)
export async function POST(req: NextRequest) {
  try {
    const token = extractToken(req.headers.get('authorization'));
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = verifyToken(token);
    if (!user || user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    const data = createSaintSchema.parse(body);

    const saint = await prisma.saint.create({
      data,
    });

    return NextResponse.json(saint, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Create saint error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
