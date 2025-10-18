# Humanize AI – Starter Template

A clean, responsive template for an AI Text Humanizer app built with Next.js App Router, TypeScript, Tailwind, shadcn/ui, Prisma ORM and Supabase Auth. It includes authentication (email/password + OAuth via NextAuth/Supabase), a modern UI, and a placeholder “humanizer” feature.

Important: The humanizer functionality is not 100% production‑ready. Treat it as a demo/placeholder you can extend or replace with your own logic or API.

## Features
- Next.js 14 App Router + TypeScript
- Auth ready (NextAuth + Prisma + Supabase Postgres)
- shadcn/ui components and themeable design using CSS variables
- Responsive layout and simple, compact footer
- Example pages: Sign in, Sign up, and a Humanizer form

## Tech Stack
- Next.js 14
- NextAuth.js
- Prisma ORM
- Supabase (Postgres)
- Tailwind CSS (with CSS variables/OKLCH palette)
- shadcn/ui

## Prerequisites
- Node.js 18+
- pnpm (or npm/yarn)
- A Supabase project with a Postgres database

## Setup
1) Install dependencies
```bash
pnpm install
```

2) Configure environment variables (create .env.local)
```bash
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-strong-secret

# Database (Supabase Postgres connection string)
DATABASE_URL=postgresql://user:password@host:5432/dbname

# OAuth providers (optional)
GITHUB_ID=...
GITHUB_SECRET=...
GOOGLE_ID=...
GOOGLE_SECRET=...
```

3) Prisma: generate and migrate
```bash
pnpm dlx prisma generate
pnpm dlx prisma migrate dev
```

4) Start dev server
```bash
pnpm dev
```

Open http://localhost:3000 to view the app.

## Notes on the Humanizer
- The humanizer logic is included for demo purposes and may not bypass AI detection reliably.
- You should integrate your own model/API or refine the logic before using in production.

## Deploying
- You can deploy to Vercel or any platform that supports Next.js. Ensure your environment variables are set, and your database is reachable.

## License
This template is provided as-is. Review licenses for dependencies (Next.js, Prisma, Supabase, shadcn/ui, etc.).
