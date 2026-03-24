# Backend Setup Guide - Node.js + PostgreSQL + Vercel

This is a complete backend implementation using Node.js (Next.js API Routes), PostgreSQL, and Prisma ORM, deployed on Vercel.

## Overview

The backend includes:
- **Authentication**: JWT-based with role-based access control (Super Admin, Church Admin, User)
- **Database**: PostgreSQL with Prisma ORM
- **API Routes**: RESTful endpoints for Churches, Users, Events, Mass Schedules, and Saints
- **Security**: Password hashing, token validation, role-based middleware, input validation

## Prerequisites

1. Node.js 18+ installed
2. PostgreSQL database (Neon is already connected via environment variables)
3. Vercel account (for deployment)

## Installation & Setup

### 1. Install Dependencies

The required packages are already in `package.json`. Install them:

```bash
npm install
# or
yarn install
```

You may need to add additional packages for backend functionality:

```bash
npm install @prisma/client bcryptjs jsonwebtoken
npm install --save-dev prisma @types/bcryptjs @types/jsonwebtoken
```

### 2. Set Up Environment Variables

Create a `.env.local` file with your Neon PostgreSQL connection:

```env
DATABASE_URL="postgresql://user:password@host/database"
JWT_SECRET="your-secret-key-change-in-production"
```

The `DATABASE_URL` is already available via your Neon integration.

### 3. Create Prisma Migration

The Prisma schema is defined in `/prisma/schema.prisma`. Create the initial migration:

```bash
npx prisma migrate dev --name init
```

Or deploy existing migrations:

```bash
npx prisma migrate deploy
```

### 4. Generate Prisma Client

```bash
npx prisma generate
```

## Database Schema

The schema includes the following models:

- **User**: Authentication and user profiles with role-based access
- **Church**: Church information and details
- **Event**: Church events with attendee tracking
- **UserEvent**: Attendance tracking for events
- **MassSchedule**: Mass times for each church
- **Saint**: Saint information for the liturgical calendar
- **Blog**: Church blog posts
- **Media**: Church media files (images, videos, audio)
- **Document**: Church documents
- **Notice**: System notices and announcements
- **Notification**: User notifications

## API Endpoints

### Authentication

- `POST /api/auth?action=login` - Login with email and password
- `POST /api/auth?action=register` - Register a new user

### Users

- `GET /api/users` - Get current user profile (requires auth)
- `PATCH /api/users` - Update current user profile (requires auth)

### Churches

- `GET /api/churches` - Get all churches (public)
- `GET /api/churches?id={id}` - Get single church (public)
- `POST /api/churches` - Create church (requires auth: SUPER_ADMIN or CHURCH_ADMIN)
- `PATCH /api/churches/{id}` - Update church (requires auth)
- `DELETE /api/churches/{id}` - Delete church (requires auth: SUPER_ADMIN)

### Events

- `GET /api/events` - Get all events (public)
- `GET /api/events?churchId={id}` - Get events for a church (public)
- `POST /api/events` - Create event (requires auth: SUPER_ADMIN or CHURCH_ADMIN)
- `PATCH /api/events/{id}` - Update event (requires auth)
- `DELETE /api/events/{id}` - Delete event (requires auth)

### Mass Schedules

- `GET /api/mass-schedules` - Get all mass schedules (public)
- `GET /api/mass-schedules?churchId={id}` - Get schedules for a church (public)
- `POST /api/mass-schedules` - Create schedule (requires auth: SUPER_ADMIN or CHURCH_ADMIN)
- `PATCH /api/mass-schedules/{id}` - Update schedule (requires auth)
- `DELETE /api/mass-schedules/{id}` - Delete schedule (requires auth)

### Saints

- `GET /api/saints` - Get all saints (public)
- `GET /api/saints?id={id}` - Get single saint (public)
- `POST /api/saints` - Create saint (requires auth: SUPER_ADMIN)
- `PATCH /api/saints/{id}` - Update saint (requires auth: SUPER_ADMIN)
- `DELETE /api/saints/{id}` - Delete saint (requires auth: SUPER_ADMIN)

## Authentication

All protected endpoints require an `Authorization` header with a JWT token:

```
Authorization: Bearer <token>
```

### User Roles

- **SUPER_ADMIN**: Full access to all resources
- **CHURCH_ADMIN**: Can manage their assigned church and its resources
- **USER**: Can view public data and manage their profile

## Frontend Integration

Use the provided React hooks for API integration:

```typescript
// Authentication
import { useAuth } from '@/hooks/useAuth';
const { login, register, logout, user, token } = useAuth();

// Data fetching
import { useChurches, useEvents, useSaints } from '@/hooks/useApi';
const { churches, isLoading } = useChurches(token);
const { events } = useEvents(churchId, token);
const { saints } = useSaints(token);
```

## Deployment to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard:
   - `DATABASE_URL` (from Neon)
   - `JWT_SECRET` (create a secure random string)
4. Deploy

## Security Best Practices

1. **Password Hashing**: All passwords are hashed using bcryptjs
2. **JWT Tokens**: Tokens expire after 7 days
3. **Role-Based Access**: All endpoints check user role and church ownership
4. **Input Validation**: All inputs are validated using Zod
5. **SQL Injection Protection**: Prisma prevents SQL injection
6. **HTTPS Only**: All requests should use HTTPS in production

## Development

Start the development server:

```bash
npm run dev
```

Access API at `http://localhost:3000/api/`

## Database Management

### View Database in Browser

```bash
npx prisma studio
```

Opens Prisma Studio at `http://localhost:5555`

### Update Schema

1. Modify `/prisma/schema.prisma`
2. Create migration: `npx prisma migrate dev --name <name>`
3. Changes are automatically applied

## Troubleshooting

### Database Connection Error
- Check `DATABASE_URL` is correct in `.env.local`
- Ensure Neon database is running and accessible
- Try: `npx prisma db push`

### JWT Token Issues
- Ensure `JWT_SECRET` is set in environment variables
- Token expires after 7 days - re-login to get new token
- Check Authorization header format: `Bearer <token>`

### API 404 Errors
- Verify route file exists in `/app/api/` directory
- Check method is correct (GET, POST, PATCH, DELETE)
- Clear Next.js cache: `rm -rf .next` and rebuild

## Next Steps

1. Connect frontend forms to API endpoints using the provided hooks
2. Implement real-time updates with WebSocket (optional)
3. Add file uploads for media and images
4. Set up email notifications
5. Add analytics and logging
