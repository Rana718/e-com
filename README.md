# InterestShop - E-Commerce Interest Selection App

A full-stack e-commerce interest-selection application built with Next.js 15, tRPC, Prisma, and PostgreSQL.

## 🚀 Features

- **Authentication System**: Secure user registration and login with NextAuth.js
- **Two-Step Registration**: Clean registration flow with name/email validation and password confirmation
- **Interest Selection**: Browse and select from 100+ categories with smart pagination (6 per page)
- **Persistent Selections**: User interests are saved and persist across sessions
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Type-Safe APIs**: tRPC for end-to-end type safety
- **Database**: PostgreSQL with Prisma ORM
- **Form Validation**: Zod schemas for robust form validation
- **Toast Notifications**: Success/error feedback with Sonner

## 🛠️ Tech Stack

- **Frontend**: Next.js 15+ (App Router), TypeScript, Tailwind CSS
- **Backend**: tRPC, NextAuth.js
- **Database**: PostgreSQL, Prisma ORM
- **UI Components**: shadcn/ui, Radix UI
- **Form Handling**: React Hook Form, Zod validation
- **Styling**: Tailwind CSS, Framer Motion
- **Dev Tools**: ESLint, TypeScript

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd e-com
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your database URL and NextAuth secret:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/ecom_db"
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   # Run migrations
   bun run db:migrate
   
   # Seed the database with 100 categories
   bun run db:seed
   ```

5. **Start the development server**
   ```bash
   bun run dev
   ```

## 🎯 Usage

### 1. Registration (2 Steps)
- **Step 1**: Enter name and email
- **Step 2**: Set password and confirm

### 2. Login
- Email and password authentication
- Automatic redirect to interests page after login

### 3. Interests Selection
- Browse 100+ categories (6 per page)
- Select/unselect interests with checkboxes
- Save selections with persistent storage
- Pagination controls for easy navigation

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   │   ├── signin/        # Login page
│   │   └── signup/        # Sign up page
│   ├── register/          # Two-step registration
│   ├── interests/         # Protected interests page
│   ├── dashboard/         # User dashboard
│   └── layout.tsx         # Root layout with providers
├── components/
│   ├── ui/               # shadcn/ui components
│   └── providers/        # React providers (tRPC, Session)
├── server/               # tRPC server setup
│   ├── routers/         # API route handlers
│   │   ├── auth.ts      # Authentication routes
│   │   └── categories.ts # Category routes
│   ├── context.ts       # tRPC context
│   └── trpc.ts          # tRPC configuration
├── lib/                 # Utility functions
└── types/              # TypeScript type definitions

prisma/
├── schema.prisma       # Database schema
├── seed.ts            # Database seeding script
└── migrations/        # Database migrations
```

## 🗄️ Database Schema

```prisma
model User {
  id        String     @id @default(uuid())
  name      String
  email     String     @unique
  password  String
  interests Category[] @relation("UserInterests")
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
}

model Category {
  id    String @id @default(uuid())
  name  String @unique
  users User[] @relation("UserInterests")
}
```

## 🔗 API Routes (tRPC)

### Authentication
- `auth.register` - User registration
- `auth.login` - User login

### Categories
- `categories.list` - Get paginated categories
- `categories.getUserInterests` - Get user's selected interests
- `categories.saveUserInterests` - Save user's interest selections

## 🎨 UI Components

Built with shadcn/ui for consistent, accessible design:
- **Forms**: Input, Button, Label with validation
- **Layout**: Card, CardHeader, CardContent
- **Feedback**: Toast notifications
- **Navigation**: Pagination components
- **Interactions**: Checkbox for selections

## 🔐 Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **Session Management**: NextAuth.js with JWT strategy
- **Route Protection**: Middleware for protected routes
- **Form Validation**: Client and server-side validation
- **CSRF Protection**: Built-in with NextAuth.js

## 🚀 Available Scripts

```bash
# Development
bun run dev              # Start development server
bun run build           # Build for production
bun run start           # Start production server

# Database
bun run db:migrate      # Run database migrations
bun run db:seed         # Seed database with categories
bun run db:studio       # Open Prisma Studio
bun run db:generate     # Generate Prisma client

# Code Quality
bun run lint            # Run ESLint
```

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

## 🎯 Future Enhancements

- [ ] Email verification
- [ ] Password reset functionality
- [ ] User profile management
- [ ] Category search and filtering
- [ ] Interest-based recommendations
- [ ] Social features (sharing interests)
- [ ] Analytics dashboard
- [ ] Mobile app with React Native

---

Built with ❤️ using Next.js, tRPC, Prisma, and modern web technologies.
