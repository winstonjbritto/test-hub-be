import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, extractToken } from '@/lib/auth';
import { z } from 'zod';

const updateSaintSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  feastDay: z.string().optional(),
  imageUrl: z.string().optional(),
  patronOf: z.string().optional(),
});

// Update saint (SUPER_ADMIN only)
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = extractToken(req.headers.get('authorization'));
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = verifyToken(token);
    if (!user || user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const saint = await prisma.saint.findUnique({
      where: { id: params.id },
    });

    if (!saint) {
      return NextResponse.json({ error: 'Saint not found' }, { status: 404 });
    }

    const body = await req.json();
    const data = updateSaintSchema.parse(body);

    const updatedSaint = await prisma.saint.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json(updatedSaint);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Update saint error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Delete saint (SUPER_ADMIN only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = extractToken(req.headers.get('authorization'));
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = verifyToken(token);
    if (!user || user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const saint = await prisma.saint.findUnique({
      where: { id: params.id },
    });

    if (!saint) {
      return NextResponse.json({ error: 'Saint not found' }, { status: 404 });
    }

    await prisma.saint.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete saint error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
