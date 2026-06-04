import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, extractToken } from '@/lib/auth';
import { z } from 'zod';

const createChurchSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  address: z.string(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  website: z.string().optional(),
  imageUrl: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

const updateChurchSchema = createChurchSchema.partial();

// Get all churches (public endpoint)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      // Get single church
      const church = await prisma.church.findUnique({
        where: { id },
        include: {
          massSchedules: true,
          events: {
            orderBy: { startDate: 'desc' },
            take: 5,
          },
        },
      });

      if (!church) {
        return NextResponse.json({ error: 'Church not found' }, { status: 404 });
      }

      return NextResponse.json(church);
    }

    // Get all churches with pagination
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(50, parseInt(searchParams.get('limit') || '10'));
    const skip = (page - 1) * limit;

    const [churches, total] = await Promise.all([
      prisma.church.findMany({
        skip,
        take: limit,
        orderBy: { name: 'asc' },
      }),
      prisma.church.count(),
    ]);

    return NextResponse.json({
      churches,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get churches error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Create new church (requires SUPER_ADMIN or CHURCH_ADMIN)
export async function POST(req: NextRequest) {
  try {
    const token = extractToken(req.headers.get('authorization'));
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = verifyToken(token);
    if (!user || (user.role !== 'SUPER_ADMIN' && user.role !== 'CHURCH_ADMIN')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    const data = createChurchSchema.parse(body);

    const church = await prisma.church.create({
      data,
    });

    // If creating church as CHURCH_ADMIN, assign to that user
    if (user.role === 'CHURCH_ADMIN') {
      await prisma.user.update({
        where: { id: user.userId },
        data: { churchId: church.id },
      });
    }

    return NextResponse.json(church, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Create church error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
