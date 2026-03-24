import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractToken, JwtPayload } from './auth';
import { UserRole } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

// Add user to request
export function withAuth(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    const token = extractToken(req.headers.get('authorization'));
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Attach user to request
    (req as any).user = user;
    return handler(req);
  };
}

// Check if user has specific role
export function withRole(...allowedRoles: UserRole[]) {
  return (handler: (req: NextRequest) => Promise<NextResponse>) => {
    return withAuth(async (req: NextRequest) => {
      const user = (req as any).user as JwtPayload;
      if (!allowedRoles.includes(user.role)) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
      return handler(req);
    });
  };
}

// Check if user owns the church resource
export function withChurchAccess(handler: (req: NextRequest, churchId: string) => Promise<NextResponse>) {
  return withAuth(async (req: NextRequest) => {
    const user = (req as any).user as JwtPayload;
    const { searchParams } = new URL(req.url);
    const churchId = searchParams.get('churchId');

    if (!churchId) {
      return NextResponse.json({ error: 'Church ID is required' }, { status: 400 });
    }

    // Super admins have access to all churches
    if (user.role === 'SUPER_ADMIN') {
      return handler(req, churchId);
    }

    // Church admins can only access their own church
    if (user.role === 'CHURCH_ADMIN' && user.churchId === churchId) {
      return handler(req, churchId);
    }

    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  });
}
