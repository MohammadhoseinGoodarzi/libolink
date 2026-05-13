# Libolink

> A social platform for book lovers — discover, share, and connect over books.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)

## Overview

Libolink is a book-centric social network where readers discover new reads, share reviews, exchange books, and connect with others who share their literary tastes.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, RSC-first) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 + shadcn/ui (new-york) |
| UI Primitives | Radix UI |
| Icons | Lucide React |
| Forms | React Hook Form + Zod v4 |
| Server State | React Server Components + `async/await` |
| Client State | TanStack Query v5 |
| i18n | Custom `getDictionary()` — zero-package, next-intl-compatible API |
| Package Manager | pnpm |

## Getting Started

**Prerequisites:** Node.js 18+, pnpm

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
  (auth)/             # Auth route group — sign-in and sign-up pages (no Header)
  (landing)/          # Landing route group — public pages (with Header)
  layout.tsx          # Root layout — Providers only
components/
  auth/               # Auth forms and tab switcher ("use client")
  landing/            # Landing page sections (Header, Hero)
  ui/                 # shadcn/ui primitives customized to Libolink design system
lib/                  # Business logic, Zod schemas, utilities, i18n helper
types/                # All TypeScript interfaces — never declared inside components
messages/
  en.json             # Single source of truth for all UI strings
public/               # Static assets
```

> Path alias `@/` maps to the project root. Full structure: [`STRUCTURE.md`](STRUCTURE.md)

## Design System

Brand tokens are defined in [`app/globals.css`](app/globals.css) under `@theme inline`:

| Token | Value | Usage |
|---|---|---|
| `brand-primary` | `#023618` | Main green — buttons, headings |
| `brand-accent` | `#c14953` | Destructive / CTA accent |
| `brand-navy` | `#1d3557` | Dark navy for contrast |
| `brand-surface` | `#E8EBF4` | Subtle background fills |
| `brand-gray` | `#6B7280` | Secondary text |
| `brand-soft` | `#F8EAED` | Soft pink tint |
| `brand-glow` | `#E9D5FF` | Purple glow for shadows |

### Button Variants

| Variant | Description |
|---|---|
| `default` | Primary dark-green filled button |
| `outline` | Surface-background with green text |
| `ghost` | Transparent with green text |
| `destructive` | Red accent, large — for bold CTAs |
| `post` | Primary with purple glow shadow — for post actions |

## Commands

```bash
pnpm dev        # Start development server
pnpm build      # Production build
pnpm start      # Start production server
pnpm lint       # Run ESLint
```

## Key Conventions

- **Server Components by default** — only add `"use client"` when strictly needed (state, browser APIs, event handlers)
- **No hardcoded hex values** — always use or create a CSS token in `globals.css`
- **Tailwind built-in scale** — prefer `max-w-120` over `max-w-[480px]`; arbitrary values only when no built-in equivalent exists
- **shadcn/ui components** are installed via `pnpm dlx shadcn@latest add <component>` then edited directly — no duplicate overrides
- **Data fetching** in Server Components via `async/await`; TanStack Query only for mutations, polling, and optimistic updates
- **Types** are never declared inside component files — all interfaces live in `types/`
- **Git workflow** — always branch from `dev`; never commit directly to `dev` or `main`
