# BookVault - Library Management System

A professional, full-stack book management application built with modern web technologies.

## Features

- **Dashboard**: Overview with statistics, low stock alerts, and recent books
- **Book Management**: Complete CRUD operations for books
- **Search & Filter**: Search by title, author, or ISBN with category filtering
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Modern UI**: Glassmorphism design with dark mode
- **Real-time Updates**: TanStack Query for optimistic updates and caching

## Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Shadcn/UI**: Beautiful component library
- **TanStack Query**: Advanced data fetching and state management
- **React Hook Form**: Form management with validation
- **Zod**: Schema validation
- **Lucide React**: Icon library
- **Sonner**: Toast notifications

### Backend
- **Next.js API Routes**: RESTful API endpoints
- **Service Layer Pattern**: NestJS-inspired architecture
- **Supabase**: PostgreSQL database with Row Level Security
- **TypeScript**: Shared types between frontend and backend

## Project Structure

```
/tmp/cc-agent/63594923/project/
├── app/
│   ├── api/                 # API routes (backend)
│   │   ├── books/          # Book endpoints
│   │   └── dashboard/      # Dashboard stats
│   ├── books/              # Book pages
│   │   ├── [id]/          # Book detail & edit
│   │   └── new/           # Create book
│   ├── settings/          # Settings page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Dashboard
├── components/
│   ├── books/             # Book-specific components
│   ├── layout/            # Layout components
│   └── ui/                # Shadcn UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities
│   └── supabase/         # Supabase client
├── providers/            # React providers
├── services/             # Business logic layer
├── shared/               # Shared TypeScript types
│   └── types/
└── public/               # Static assets

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Add your Supabase credentials

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## Database Schema

### Books Table
- `id`: UUID (primary key)
- `title`: Book title
- `author`: Author name
- `isbn`: ISBN number (optional)
- `category`: Book category
- `price`: Book price
- `stock`: Available stock quantity
- `description`: Book description (optional)
- `publisher`: Publisher name (optional)
- `published_year`: Year of publication (optional)
- `cover_image`: Cover image URL (optional)
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

## API Endpoints

- `GET /api/books` - Get all books (with optional search/filter)
- `POST /api/books` - Create a new book
- `GET /api/books/[id]` - Get a specific book
- `PUT /api/books/[id]` - Update a book
- `DELETE /api/books/[id]` - Delete a book
- `GET /api/books/categories` - Get all categories
- `GET /api/dashboard/stats` - Get dashboard statistics

## Design System

- **Color Scheme**: Dark mode with blue accent colors
- **Typography**: Inter font family
- **Glassmorphism**: Frosted glass effects with subtle shadows
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Mobile-first design with breakpoints

## Security

- Row Level Security (RLS) enabled on all tables
- Authentication required for write operations
- Public read access for browsing
- Input validation with Zod schemas
- Type-safe API layer

## Build

Build for production:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## License

MIT
