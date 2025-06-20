# InterestShop - E-Commerce Interest Selection Platform

A modern, full-stack e-commerce interest-selection application built with Next.js 15, tRPC, Prisma, and PostgreSQL. Users can register, authenticate, and curate their personal interests from over 100 categories with a seamless, responsive experience.

## ✨ Key Features

### 🔐 Authentication & Security
- **Secure Authentication**: JWT-based authentication with NextAuth.js
- **Two-Step Registration**: Clean, validated registration flow
- **Protected Routes**: Middleware-based route protection
- **Password Security**: bcryptjs hashing with secure session management
- **Form Validation**: Client and server-side validation with Zod schemas

### 🎯 Interest Management
- **100+ Categories**: Curated categories generated with faker.js
- **Smart Pagination**: Browse categories with 6 per page for optimal UX
- **Real-time Selection**: Instant save/unsave with optimistic updates
- **Persistent Storage**: User interests saved across sessions
- **Visual Feedback**: Toast notifications and loading states

### 🎨 Modern User Experience
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Framer Motion for delightful interactions
- **Dark Mode Support**: Built-in theme switching
- **Accessible UI**: shadcn/ui components with Radix UI primitives
- **Loading States**: Comprehensive loading and error handling

### 🏗️ Technical Excellence
- **Type Safety**: End-to-end type safety with tRPC and TypeScript
- **Database Relations**: Efficient many-to-many relationships with Prisma
- **API Design**: RESTful tRPC procedures with proper error handling
- **Code Quality**: ESLint configuration with modern standards

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui, Radix UI
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **State Management**: tRPC React Query integration

### Backend
- **API Layer**: tRPC v11 for type-safe APIs
- **Authentication**: NextAuth.js v4 with JWT strategy
- **Database**: PostgreSQL (Neon hosted)
- **ORM**: Prisma with custom output directory
- **Validation**: Zod schemas for runtime validation

### Development Tools
- **Runtime**: Bun (package manager & runtime)
- **Linting**: ESLint with Next.js configuration
- **Type Checking**: TypeScript v5
- **Database Tools**: Prisma Studio, migrations

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ or **Bun** runtime
- **PostgreSQL** database (local or hosted)
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd e-com
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory:
   ```env
   # Database Configuration
   DATABASE_URL="postgresql://username:password@localhost:5432/interestshop"
   
   # Authentication
   NEXTAUTH_SECRET="your-super-secret-key-change-in-production"
   NEXTAUTH_URL="http://localhost:3000"
   
   # Optional: For production
   NODE_ENV="development"
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   bun run db:generate
   
   # Run database migrations
   bun run db:migrate
   
   # Seed with 100 categories
   bun run db:seed
   ```

5. **Start Development Server**
   ```bash
   bun run dev
   # Application will be available at http://localhost:3000
   ```


## 🎯 User Journey

### 1. **Registration Process**
- **Step 1**: Enter name and email with real-time validation
- **Step 2**: Set secure password with confirmation
- **Validation**: Comprehensive form validation with error feedback

### 2. **Authentication**
- **Sign In**: Email/password authentication with session management
- **Security**: JWT tokens with 30-day expiration
- **Redirects**: Automatic navigation to dashboard after login

### 3. **Interest Selection**
- **Browse**: 100+ categories with smart 6-per-page pagination
- **Select**: Checkbox-based selection with visual feedback
- **Save**: Real-time persistence with optimistic updates
- **Navigate**: Smooth pagination with page indicators

### 4. **Dashboard Experience**
- **Overview**: Personal dashboard with quick actions
- **Navigation**: Intuitive navbar with active state indicators
- **Profile**: User profile management and settings

## 📱 Application Pages

| Page | Route | Description | Authentication |
|------|-------|-------------|----------------|
| **Landing** | `/` | Marketing homepage with features | Public |
| **Sign Up** | `/signup` | Two-step registration process | Public |
| **Sign In** | `/signin` | User authentication | Public |
| **Dashboard** | `/dashboard` | User overview and quick actions | Protected |
| **Interests** | `/interests` | Category selection interface | Protected |
| **Profile** | `/profile` | User profile management | Protected |
| **Products** | `/products` | Product browsing (placeholder) | Protected |

## 📁 Project Architecture

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                  # Authentication group
│   │   ├── signin/              # Login page
│   │   └── signup/              # Registration page
│   ├── api/                     # API routes
│   │   ├── auth/[...nextauth]/  # NextAuth.js handler
│   │   └── trpc/[trpc]/         # tRPC API handler
│   ├── dashboard/               # User dashboard
│   ├── interests/               # Interest selection page
│   ├── profile/                 # User profile page
│   ├── products/                # Products page (placeholder)
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout with providers
│   └── page.tsx                 # Landing page
├── components/
│   ├── ui/                      # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── providers/               # React context providers
│   │   ├── providers.tsx        # Combined providers
│   │   └── trpc-provider.tsx    # tRPC client setup
│   └── Navbar.tsx               # Navigation component
├── server/                      # tRPC server configuration
│   ├── routers/                 # API route handlers
│   │   ├── auth.ts              # Authentication endpoints
│   │   └── categories.ts        # Category management
│   ├── context.ts               # tRPC context setup
│   ├── index.ts                 # Router aggregation
│   └── trpc.ts                  # tRPC configuration
├── lib/                         # Utility functions
│   ├── trpc.ts                  # tRPC client setup
│   └── utils.ts                 # Helper functions
├── types/                       # TypeScript definitions
│   └── next-auth.d.ts           # NextAuth type extensions
├── auth.ts                      # NextAuth configuration
├── middleware.ts                # Route protection middleware
└── prisma.ts                    # Prisma client instance

prisma/
├── migrations/                  # Database migrations
├── schema.prisma               # Database schema definition
└── seed.ts                     # Database seeding script

public/                         # Static assets
├── favicon.ico
└── ...
```


### Database Features
- **UUID Primary Keys**: Secure, non-sequential identifiers
- **Many-to-Many Relations**: Users can have multiple interests
- **Unique Constraints**: Prevent duplicate emails and categories
- **Timestamps**: Automatic creation and update tracking
- **Indexed Fields**: Optimized queries on email and category names


### Error Handling
- **UNAUTHORIZED**: User not authenticated
- **NOT_FOUND**: Resource not found
- **BAD_REQUEST**: Invalid input data
- **INTERNAL_SERVER_ERROR**: Server-side errors

## 🎨 UI Components & Design System

### Component Library
Built with **shadcn/ui** and **Radix UI** primitives:

- **Forms**: `Input`, `Button`, `Label`, `Checkbox`
- **Layout**: `Card`, `CardHeader`, `CardContent`, `CardFooter`
- **Feedback**: `Badge`, `Sonner` (toast notifications)
- **Navigation**: `Pagination` components
- **Interactive**: Hover states, focus management, keyboard navigation


### Animations
- **Framer Motion**: Page transitions, component animations
- **CSS Transitions**: Hover effects, state changes
- **Loading States**: Skeleton loaders, spinners

## 🔐 Security Implementation

### Authentication Security
- **Password Hashing**: bcryptjs with salt rounds
- **JWT Tokens**: Secure session management with 30-day expiration
- **Session Storage**: HTTP-only cookies for token storage
- **CSRF Protection**: Built-in with NextAuth.js



### Input Validation
- **Client-side**: React Hook Form with Zod schemas
- **Server-side**: tRPC input validation with Zod
- **Sanitization**: Automatic input sanitization

### Environment Security
- **Environment Variables**: Sensitive data in `.env`
- **Database URLs**: Secure connection strings
- **API Keys**: Proper secret management

## 🚀 Available Scripts

### Development
```bash
bun run dev              # Start development server (with Turbopack)
bun run build           # Build for production
bun run start           # Start production server
bun run lint            # Run ESLint for code quality
```

### Database Management
```bash
bun run db:generate     # Generate Prisma client
bun run db:migrate      # Run database migrations
bun run db:seed         # Seed database with 100 categories
bun run db:studio       # Open Prisma Studio (database GUI)
bun run db:push         # Push schema changes to database
```

### Development Workflow
1. **Start development**: `bun run dev`
2. **Make changes**: Edit code with hot reload
3. **Database changes**: Update schema → `db:migrate` → `db:generate`
4. **Code quality**: `bun run lint` before commits
5. **Production build**: `bun run build` → `bun run start`

## 🌟 Key Features Implemented

✅ **Authentication**
- Two-step registration process
- Secure login with session management
- Protected routes with middleware

✅ **Interest Selection**
- 100 categories generated with faker.js
- Paginated display (6 per page)
- Persistent selections across sessions
- Real-time save/unsave functionality

✅ **User Experience**
- Loading states and disabled buttons
- Toast notifications for feedback
- Responsive design
- Form validation with error messages

✅ **Technical Excellence**
- Type-safe APIs with tRPC
- Database relations with Prisma
- Clean code architecture
- Error handling throughout

## 🔧 Environment Variables

Required environment variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/database"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

## 📱 Pages Overview

1. **Home (/)** - Landing page with features and navigation
2. **Register (/register)** - Two-step registration process
3. **Sign In (/signin)** - User authentication
4. **Interests (/interests)** - Protected category selection page
5. **Dashboard (/dashboard)** - User profile and overview


