import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, extractToken } from '@/lib/auth';
import { z } from 'zod';

const createMassScheduleSchema = z.object({
  dayOfWeek: z.string(),
  time: z.string(),
  type: z.string().optional(),
  churchId: z.string(),
});

const updateMassScheduleSchema = createMassScheduleSchema.partial();

// Get mass schedules
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const churchId = searchParams.get('churchId');

    if (id) {
      // Get single mass schedule
      const schedule = await prisma.massSchedule.findUnique({
        where: { id },
        include: { church: true },
      });

      if (!schedule) {
        return NextResponse.json(
          { error: 'Mass schedule not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(schedule);
    }

    // Get mass schedules for a church
    const where: any = {};
    if (churchId) where.churchId = churchId;

    const schedules = await prisma.massSchedule.findMany({
      where,
      orderBy: [{ dayOfWeek: 'asc' }, { time: 'asc' }],
      include: { church: true },
    });

    return NextResponse.json(schedules);
  } catch (error) {
    console.error('Get mass schedules error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Create mass schedule
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
    const data = createMassScheduleSchema.parse(body);

    // Check authorization
    if (user.role === 'CHURCH_ADMIN' && user.churchId !== data.churchId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const schedule = await prisma.massSchedule.create({
      data,
      include: { church: true },
    });

    return NextResponse.json(schedule, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Create mass schedule error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
