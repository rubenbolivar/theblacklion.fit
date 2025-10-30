# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Black Lion Empire is a Next.js 14 fitness coaching platform with an admin dashboard, built for online coaching services. The application uses the App Router architecture and features a public-facing website with an authenticated admin panel for managing clients, plans, and transformations.

## Development Commands

```bash
# Development
npm run dev                  # Start dev server on localhost:3000
npm run build               # Build for production
npm start                   # Start production server on port 3000

# Database (Prisma)
npx prisma generate         # Generate Prisma client
npx prisma db push          # Push schema changes to database
npm run prisma:seed         # Seed database with initial data
npm run prisma:studio       # Open Prisma Studio GUI
npm run prisma:migrate      # Deploy migrations

# Production (PM2)
npm run start:prod          # Start with PM2 on port 3002
pm2 logs black-lion-empire  # View logs
pm2 restart black-lion-empire  # Restart app
pm2 stop black-lion-empire  # Stop app

# Linting
npm run lint                # Run ESLint

# Utility Scripts
node scripts/add-transformaciones.js          # Add transformations
node scripts/remove-duplicate-planes.js       # Clean duplicate plans
node scripts/fix-transformaciones-tiempo.js   # Fix transformation times
```

## Architecture

### Database (SQLite + Prisma)

The application uses SQLite with Prisma ORM. The database schema includes:

- **Plan**: Fitness plans with pricing, duration, and features (JSON string for caracteristicas array)
- **Transformacion**: Client before/after transformations with categories (perdida_peso, ganancia_muscular, recomposicion)
- **Contacto**: Contact form submissions with objective field and WhatsApp integration
- **Usuario**: Admin users with bcrypt-hashed passwords
- **ConfiguracionSitio**: Key-value configuration store

**Important**: The `caracteristicas` field in Plan model stores a JSON string, not a native array. Always stringify arrays before saving and parse when reading.

### API Routes Pattern

All API routes follow this structure in [app/api/](app/api/):

- **GET**: Public access for fetching active/visible records
- **POST/PUT/DELETE**: Protected with NextAuth session check
- Authentication uses `getServerSession(authOptions)` from [app/api/auth/\[...nextauth\]/route.js](app/api/auth/[...nextauth]/route.js)
- All protected routes return 401 if no session exists

Example pattern:
```javascript
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  // ... protected logic
}
```

### Prisma Client Singleton

The Prisma client is instantiated as a singleton in [lib/prisma.js](lib/prisma.js) with hot reload protection for development. Always import from `@/lib/prisma` rather than creating new instances.

### Authentication (NextAuth)

- Credentials-based authentication with bcrypt password hashing
- JWT session strategy (30-day expiration)
- Custom sign-in page at `/admin/login`
- Session includes user id, email, name, and role in JWT token
- Admin pages protected with NextAuth session checks

### Admin Dashboard Structure

Located in [app/admin/](app/admin/):
- **layout.js**: Wraps all admin pages with Sidebar navigation and session protection
- **dashboard/page.js**: Overview statistics
- **planes/page.js**: CRUD for fitness plans
- **transformaciones/page.js**: CRUD for client transformations
- **contactos/page.js**: View contact form submissions

The Sidebar component ([components/admin/Sidebar.js](components/admin/Sidebar.js)) uses Lucide React icons and client-side routing.

### Public Components

Main page components in [components/](components/):
- **Hero.js**: Landing hero with animated particles
- **Planes.js**: Displays fitness plans fetched from API
- **Transformaciones.js**: Before/after image slider using react-compare-slider
- **Contacto.js**: Contact form with WhatsApp integration
- **Navbar.js**: Responsive navbar (logo hidden on mobile per design)

### Styling System

Tailwind configuration in [tailwind.config.js](tailwind.config.js) defines:
- Custom colors: `lion-black` (#0A0A0A), `lion-gold` (#D4AF37), `lion-red` (#C41E3A), `lion-gray` (#1A1A1A)
- Custom fonts: Montserrat (headings), Inter (body)
- Gold glow shadows and animations for branding

## Environment Variables

Required variables (see [.env.example](.env.example)):

```
DATABASE_URL               # SQLite: file:./prisma/dev.db
NEXTAUTH_SECRET           # Random secret for JWT signing
NEXTAUTH_URL              # http://localhost:3000 (dev) or production URL
ADMIN_EMAIL               # Initial admin email
ADMIN_PASSWORD            # Initial admin password (hashed by seed)
CLOUDINARY_CLOUD_NAME     # For image uploads (if using Cloudinary)
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
WHATSAPP_NUMBER           # Contact form WhatsApp integration
```

## Deployment Configuration

**PM2 Configuration** ([ecosystem.config.js](ecosystem.config.js)):
- App runs on port 3002 in production
- 1GB memory limit with auto-restart
- Logs written to `./logs/` directory
- Process name: `black-lion-empire`

**Production Flow**:
1. Build with `npm run build`
2. Deploy with `npm run start:prod` (uses PM2)
3. Nginx reverse proxy handles SSL and port forwarding
4. Zero-downtime restarts with `pm2 restart`

## Key Implementation Details

1. **Image Handling**: Next.js Image component configured for Cloudinary remote patterns in [next.config.js](next.config.js)

2. **WhatsApp Integration**: Contact form formats data and opens WhatsApp web link with pre-filled message

3. **Server Actions**: Experimental server actions enabled in next.config.js

4. **Client Components**: Admin dashboard components use `'use client'` directive for interactivity

5. **Database Seeding**: The [prisma/seed.js](prisma/seed.js) script creates initial admin user and sample data

6. **Transformation Categories**: Use exact strings - "perdida_peso", "ganancia_muscular", "recomposicion"

7. **Mobile Optimization**: Navbar logo hidden on mobile devices for better UX (design decision)

## Common Patterns

**Fetching data in pages**:
```javascript
// Public pages - fetch in server component
const response = await fetch(`${process.env.NEXTAUTH_URL}/api/planes`, {
  cache: 'no-store' // or use Next.js revalidation
});
```

**Admin CRUD operations**:
- Use fetch with session cookies automatically included
- Handle loading/error states
- Refresh data after mutations with router.refresh()

**Prisma queries**:
- Use `findMany()` with `where`, `orderBy` for filtering
- Use `orden` field for custom sorting
- Filter by `activo: true` or `visible: true` for public endpoints

## Production Notes

- Production runs on port 3002 (configured in PM2)
- SSL managed by Nginx with Let's Encrypt certificates
- ESLint errors ignored during builds (`ignoreDuringBuilds: true`)
- Database is SQLite (not PostgreSQL despite .env.example showing Postgres URL format)
- Admin credentials in README should be changed in production
