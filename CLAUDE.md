# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 (App Router) project called "social-admin" - a social media administration dashboard for managing posts across Instagram, Facebook, TikTok, and LinkedIn. Built with React 19, TypeScript, Tailwind CSS, and shadcn/ui components. Features authentication via better-auth with SQLite local database and comprehensive analytics dashboards.

## Development Commands

```bash
# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Create admin user for authentication (after initial setup)
node scripts/create-admin.mjs
```

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **React**: Version 19.2.0
- **TypeScript**: Version 5
- **Styling**: Tailwind CSS v4 with CSS variables
- **UI Components**: shadcn/ui (New York style) with Radix UI primitives
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Theme Management**: next-themes for light/dark/system mode
- **Authentication**: better-auth v1.3.31 with email/password strategy and better-sqlite3 database
- **Database**: better-sqlite3 with WAL mode for local SQLite authentication
- **Charts**: Recharts for analytics visualizations
- **Fonts**: Montserrat (configured in layout.tsx with weights 300-700)

## Architecture

### Directory Structure

```
src/
├── app/              # Next.js App Router pages and API routes
│   ├── (main)/       # Protected routes group - require authentication
│   │   ├── dashboard/     # Main analytics dashboard
│   │   ├── instagram/      # Instagram feed management
│   │   ├── facebook/       # Facebook feed management
│   │   ├── tiktok/         # TikTok feed management
│   │   ├── linkedin/       # LinkedIn feed management
│   │   └── page.tsx        # Root redirect to /dashboard
│   ├── auth/         # Public authentication routes
│   │   ├── sign-in/        # Login page
│   │   └── sign-up/        # Registration page
│   ├── api/
│   │   ├── auth/[...path]/route.ts   # better-auth API handler
│   │   └── posts/route.ts            # Posts data API
│   ├── layout.tsx            # Root layout with Montserrat font and ThemeProvider
│   └── globals.css           # Global styles, Tailwind directives, CSS variables
├── components/
│   ├── ui/          # shadcn/ui components (50+ reusable UI primitives)
│   ├── layout/      # Layout components (AppSidebar, PageHeader)
│   ├── theme/       # Theme components (ThemeToggle, LogoutButton)
│   └── main/        # Application-specific components (SocialMediaCard, AnalyticsDashboard)
├── hooks/           # Custom React hooks
│   ├── use-auth.ts         # Authentication hook (sign in/up/out, session management)
│   ├── use-file-upload.ts  # File upload with drag-and-drop support
│   ├── use-mobile.ts       # Mobile breakpoint detection (768px)
│   └── use-form.ts         # Form state management for add/edit/view/clone modes
├── lib/
│   ├── auth.ts      # better-auth configuration with SQLite database
│   ├── analytics.ts # Analytics calculations and chart data generation
│   └── utils.ts     # Utility functions (cn for className merging)
├── proxy.ts         # Next.js middleware for authentication redirects
└── scripts/
    └── create-admin.mjs  # Script to seed initial admin user into database
```

### Path Aliases

The project uses TypeScript path aliases configured in `tsconfig.json`:
- `@/*` maps to `src/*`
- `@/components`, `@/lib`, `@/hooks`, `@/ui` are configured in `components.json`

### shadcn/ui Configuration

Components are configured with:
- Style: "new-york"
- Base color: neutral
- CSS variables: enabled
- RSC (React Server Components): enabled
- Icon library: lucide-react

Add new shadcn components using the shadcn CLI (ensure you have it installed globally or use npx).

### Key Components

**SocialMediaCard** (`src/components/main/social-media-card.tsx`): Displays individual social media posts with:
- Responsive image display with zoom on hover
- 2-line caption clamping with fixed height
- Like/comment counts badge with hover effects
- Scheduling status and date display
- Compact button layout (4+ cards per row on desktop)
- Uses `"use client"` directive

**AppSidebar** (`src/components/layout/app-sidebar.tsx`): Main navigation sidebar featuring:
- Collapsible desktop sidebar (72px when open, 16px when collapsed)
- Mobile hamburger menu with overlay drawer
- Logo section with gradient background and fade animation
- Navigation links for Instagram, Facebook, TikTok
- Theme toggle and logout buttons in fixed footer
- Smooth opacity transitions for text (uses CSS, not animations)

**ThemeToggle** (`src/components/theme/theme-toggle.tsx`): Theme switcher that:
- Cycles through Light → Dark → System on click
- Integrates with next-themes for persistence
- Fades in/out text label based on sidebar open state
- Uses Sun/Moon icons from Lucide React

### Custom Hooks

**useFileUpload** (`src/hooks/use-file-upload.ts`): Comprehensive file upload hook with:
- Single/multiple file support
- Drag-and-drop functionality
- File validation (size, type, duplicates)
- Preview generation
- Configurable via FileUploadOptions
- Returns [state, actions] tuple

**useIsMobile** (`src/hooks/use-mobile.ts`): Detects mobile devices using 768px breakpoint

**useForm** (`src/hooks/use-form.ts`): Form state management for multiple modes:
- Modes: "add", "edit", "view", "clone"
- Manages formData, isLoading, error, and isReadOnly states
- Supports field types: text, textarea, number, email, date, select, file
- Auto-disables fields in "view" mode
- Provides handleChange, handleFileChange, handleSubmit, reset functions
- Async onSubmit callback support

### Styling Approach

- Uses Tailwind CSS v4 with `@tailwindcss/postcss`
- CSS variables for theming (defined in `globals.css`)
- `cn()` utility function combines clsx and tailwind-merge for conditional classNames
- Dark mode support via CSS variables (next-themes integration)
- Component styling follows shadcn/ui patterns with variants via class-variance-authority

### Color Theming

**Light Mode Theme Variables** (`:root`):
- **Background**: `oklch(0.98 0.001 286)` - Soft gray background
- **Card**: `oklch(1 0 0)` - Pure white for card surfaces
- **Sidebar**: `oklch(0.96 0.002 286)` - Slightly darker gray than background
- **Sidebar Accent**: `oklch(0.91 0.003 286.32)` - Darker for hover states
- **Primary**: `oklch(0.541 0.281 293.009)` - Purple accent color
- **Sidebar Border**: `oklch(0.88 0.004 286.32)` - Subtle borders

**Dark Mode Theme Variables** (`.dark`):
- **Background**: `oklch(0.141 0.005 285.823)` - Dark gray
- **Card**: `oklch(0.21 0.006 285.885)` - Slightly lighter than background
- **Sidebar**: `oklch(0.21 0.006 285.885)` - Same as card
- **Primary**: `oklch(0.606 0.25 292.717)` - Lighter purple for contrast

Note: CSS variables are used throughout the application, allowing for consistent theming and easy dark mode switching.

### Analytics System

The home page (`src/app/page.tsx`) displays a comprehensive analytics dashboard with:
- **AnalyticsDashboard** (`src/components/main/analytics-dashboard.tsx`): Main dashboard component featuring:
  - Four summary cards (Total Posts, Total Likes, Total Comments, Average Engagement Ratio)
  - Area chart showing engagement ratio trends per platform over time
  - Stacked bar chart comparing likes and comments per platform
  - Line chart tracking likes trends across platforms monthly
  - Summary table with platform-specific metrics
  - Responsive 2-column grid layout on desktop
  - Custom tooltips for all charts with small, readable text

- **AnalyticsCard** (`src/components/main/analytics-card.tsx`): Reusable card component for metrics display with:
  - Optional trend indicators (up/down with percentage)
  - Icon and title support
  - Subtitle for additional context

- **Analytics Library** (`src/lib/analytics.ts`): Core calculation engine providing:
  - `calculateAnalytics(posts)`: Main aggregation function returning Analytics interface
  - Quantitative metrics: totalPosts, totalLikes, totalComments, growth percentages
  - Qualitative metrics: averageEngagementRatio, platform-specific engagement data
  - Chart data generation:
    - `engagementRatioTrend`: Monthly engagement ratio per platform (for area chart)
    - `likesCommentsStackedByPlatform`: Total likes/comments per platform (for stacked bar)
    - `likesByPlatformTrend`: Monthly likes per platform (for line chart)
  - All calculations are deterministic and use proper null checks

### Authentication System

The application uses **better-auth v1.3.31** with email/password strategy for authentication:

**Core Files:**
- **`src/lib/auth.ts`**: Configures better-auth with `better-sqlite3` database (`./auth.db`)
  - Enables `emailAndPassword` strategy for email/password authentication
  - Database uses WAL (Write-Ahead Logging) mode for better concurrency
  - Auto-generates schema: `user`, `account`, `session`, `verification` tables

- **`src/hooks/use-auth.ts`**: Client-side hook wrapping better-auth client
  - Provides: `user`, `isLoading`, `isAuthenticated`, `error`
  - Methods: `signIn(email, password)`, `signUp(email, password, name)`, `signOut()`
  - Auto-fetches session on component mount

- **`src/app/api/auth/[...path]/route.ts`**: API handler for all auth endpoints
  - Minimal setup using `toNextJsHandler(auth)` from better-auth
  - Handles sign-in, sign-up, sign-out, session validation automatically

- **`src/proxy.ts`**: Next.js middleware for route protection
  - Fetches session from `/api/auth/get-session` on every request
  - Redirects authenticated users away from `/auth/*` pages to `/dashboard`
  - Redirects unauthenticated users from protected routes (`/dashboard`, `/`) to `/auth/sign-in`

**Database Schema:**
- `user`: id, name, email, emailVerified, image, createdAt, updatedAt
- `account`: id, accountId, providerId (always "credential" for email/password), userId, password (hashed), createdAt, updatedAt
- `session`: Session management handled automatically
- `verification`: Email verification tokens (if enabled)

**Initial Setup:**
1. better-auth schema is generated automatically on first run
2. Admin user must be created via `scripts/create-admin.mjs` script
3. Default credentials: `admin@admin.com` / `admin123`

**LogoutButton** (`src/components/theme/logout-button.tsx`):
- Uses `useAuth().signOut()` to clear session
- Redirects to `/auth/sign-in` after logout
- Respects sidebar open/closed state with text fade animation

### Data Flow

This is currently a client-side focused application. Most components use `"use client"` directive. Server components are available but not heavily utilized yet. When adding data fetching:
- Use Server Components for data fetching where possible
- Use client components for interactivity (forms, animations, state)
- Follow Next.js 16 App Router conventions for data fetching and caching

**Dashboard Data Flow**: Dashboard page fetches posts from all platforms (Instagram, Facebook, TikTok, LinkedIn), aggregates them with platform field, and passes unified array to AnalyticsDashboard for rendering.

**Authentication Flow**:
1. Unauthenticated user visits `/` → middleware redirects to `/auth/sign-in`
2. User enters credentials and clicks sign in
3. Request goes to `/api/auth/sign-in/email`
4. better-auth validates password against `account` table
5. Session cookie is set
6. User is redirected to `/dashboard` by sign-in page
7. Middleware validates session on all subsequent requests

## Important Notes

- The project uses React 19 which includes automatic memo optimization
- Next.js 16 requires explicit `"use client"` for client-side interactivity
- Image components use Next.js Image with fill layout for responsive images
- External images configured with wildcard remotePatterns in `next.config.ts`
- All UI components are in `src/components/ui/` and should not be modified directly if from shadcn/ui (regenerate instead)
- Custom application components go in `src/components/main/` or other feature-specific directories
- Sidebar uses CSS transitions instead of animations to prevent layout shifts
- Sidebar links have fixed height (`h-10`) to maintain consistent spacing
- Theme toggle integrates with next-themes for persistence across page reloads
- Portuguese language used throughout the UI for form labels, buttons, and messages

## Authentication Implementation Notes

**Key Points:**
- Single SQLite database (`auth.db`) for all authentication data - no separate databases for auth and application data
- Route group `(main)` enforces authentication via middleware - all routes inside are protected
- Public routes: `/auth/sign-in`, `/auth/sign-up`
- Protected routes: everything under `/(main)/` including dashboard and platform feeds
- Middleware (`proxy.ts`) is the primary gatekeeper - it runs on every request before components load
- Session is fetched server-side in middleware via `/api/auth/get-session` endpoint
- Client-side auth state via `useAuth()` hook for UI updates (loading states, showing user info)

**When Making Changes:**
- If adding new protected pages, put them in `/(main)/` directory - middleware will auto-protect them
- If adding new public pages, ensure they're outside `/(main)/` and not caught by middleware redirects
- Always use `useAuth()` hook for user context on client components
- Don't bypass middleware redirects - they're essential for security

**Seeding Data:**
- After fresh setup, always run `node scripts/create-admin.mjs` to create the initial admin user
- This script inserts into BOTH `user` and `account` tables with correct structure

## Key Implementation Patterns

### Authentication in Protected Pages
Use the `useAuth()` hook to access current user and authentication state in protected pages:
```typescript
"use client";
import { useAuth } from "@/hooks/use-auth";

export default function ProtectedPage() {
  const { user, isLoading, isAuthenticated, signOut } = useAuth();

  if (isLoading) return <Loader text="Carregando..." />;

  return (
    <div>
      <p>Bem-vindo, {user?.name}!</p>
      <button onClick={signOut}>Sair</button>
    </div>
  );
}
```
- Middleware ensures unauthenticated users never reach this component
- `useAuth()` provides loading state during session verification
- Session is auto-fetched on component mount

### Page Headers
Use the `PageHeader` component from `@/components/layout/page-header` for all page titles:
```typescript
import { PageHeader } from "@/components/layout/page-header";

<PageHeader
  title="Dashboard"
  description="Análise qualitativa de performance e engajamento"
  onNewClick={handleNewPost}
  newButtonLabel="Novo Post"
>
  {/* Optional children for additional controls like search/filters */}
</PageHeader>
```
- **Title**: `text-xl font-bold` - Consistent sizing across all pages
- **Description**: `text-xs text-muted-foreground` - Supporting text
- **Optional**: New button with Plus icon, optional children slots
- All pages use this single component for visual consistency

### Sidebar State Management
The sidebar uses React Context (`SidebarContext`) for state management. To access sidebar state in components:
```typescript
import { useSidebar } from "@/components/ui/sidebar";
const { open, setOpen } = useSidebar();
```

### Form Component Integration
Forms should use the `FormModal` component with the `useForm` hook. The hook handles different modes automatically:
```typescript
const form = useForm({
  mode: "edit", // "add" | "edit" | "view" | "clone"
  initialData: post,
  onSubmit: async (data) => {
    // Handle form submission
  }
});
```

### Chart Implementation with Recharts
Charts follow a consistent pattern with:
- **Container**: `div className="w-full h-60"` for fixed, compact heights
- **Legend**: `wrapperStyle={{ paddingTop: "4px", fontSize: "12px" }} height={18}` - small, readable text
- **Axes**: `tick={{ fontSize: 10 }} width={30}` (YAxis) - compact axis labels
- **Custom Tooltips**: Small text (10px-12px) with minimal padding for clarity
- **Colors**: Use hardcoded hex values for consistency (chart1: #ec4899, chart2: #3b82f6, chart3: #06b6d4, chart4: #ef4444)
- **Card Container**: `p-4` padding with `space-y-2` gaps between title and chart

Example minimal chart pattern:
```typescript
<div className="bg-card border border-border rounded-lg p-4">
  <h2 className="text-sm font-semibold text-foreground mb-2">Chart Title</h2>
  <div className="w-full h-60">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
        <XAxis dataKey="name" tick={{ fontSize: 10 }} />
        <YAxis tick={{ fontSize: 10 }} width={30} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ paddingTop: "4px", fontSize: "12px" }} height={18} />
        <Bar dataKey="value" fill="#ec4899" />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>
```

### CSS Variables in Components
Always use CSS variable classes (e.g., `bg-sidebar`, `border-sidebar-border`) instead of hardcoding colors to maintain theme consistency:
```typescript
// Good
className="bg-sidebar border-sidebar-border"

// Avoid
className="bg-gray-100 border-gray-300"
```
