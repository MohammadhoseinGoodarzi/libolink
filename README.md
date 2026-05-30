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
| Forms | React Hook Form + Valibot |
| Server State | React Server Components + `async/await` |
| Client State | Jotai v2 + TanStack Query v5 |
| Linting / Formatting | Biome 2 |
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
app/                    Next.js routing layer only — thin pages, no logic
  (auth)/               Auth route group — sign-in, sign-up (no header)
  (dashboard)/          Authenticated app shell and routes
  (landing)/            Public pages with header
  layout.tsx            Root layout — Providers, font, no-flash theme script
  globals.css           Tailwind v4 @theme tokens + dark mode CSS variables

features/               Vertical feature slices
  auth/                 Sign-in, sign-up, Valibot schemas, mock auth service
  home/                 Feed, sidebars, nav, post cards, AI panel, stories
  landing/              Landing hero and public header

shared/                 Cross-feature code — no feature knowledge
  actions/              Server Actions (e.g. set-auth-cookie)
  components/
    ui/                 shadcn/ui primitives customised to Libolink design
      button.tsx        Variants: default, outline, ghost, destructive, post
      input.tsx         Variants: default, auth (pill)
      form-field.tsx    Label + input + reserved error row
      search-input.tsx  Pill search bar with Search + Mic icon decorators
      password-input.tsx Input with built-in show/hide toggle
    theme-toggle.tsx    Hydration-safe dark/light toggle
  i18n/                 getDictionary() helper (mirrors next-intl API)
  providers/            TanStack Query + Jotai provider tree
  store/                Global Jotai atoms
  types/                Shared TypeScript interfaces
  utils/                cn() — clsx + tailwind-merge
  validations/          valibotResolver re-export for react-hook-form

messages/
  en.json               Single source of truth for all UI strings

public/assets/
  fonts/                Vazirmatn variable font (woff2)
  images/               logo.png, app preview images
  icons/                Platform SVG icons (Apple, Android)
```

> Full architecture details: [`ARCHITECTURE.md`](ARCHITECTURE.md)

## Design System

Brand tokens are defined in [`app/globals.css`](app/globals.css) under `@theme inline`:

| Token | Value | Usage |
|---|---|---|
| `brand-primary` | `#023618` | Main green — buttons, headings, nav |
| `brand-accent` | `#c14953` | Destructive / form CTA accent |
| `brand-navy` | `#1d3557` | Inline links, info badges |
| `brand-surface` | `#E8EBF4` | Input fills, soft surfaces |
| `brand-gray` | `#6B7280` | Secondary text, placeholders |
| `brand-soft` | `#F8EAED` | Soft pink tint |
| `brand-glow` | `#E9D5FF` | Purple glow for post-button shadow |

### Dark Mode

Dark mode is fully implemented via CSS variable overrides in the `.dark` class:

- Background `#051a0e`, card `#0c2218`, secondary `#162d1e`
- Applied synchronously before React mounts via an inline `<script>` — reads `localStorage("theme")` and sets `.dark` on `<html>` to eliminate flash
- `ThemeToggle` component handles toggling and persistence; uses `useSyncExternalStore` to avoid hydration mismatches
- Present on every page: home dashboard, landing, sign-in, sign-up

### Button Variants

| Variant | Description |
|---|---|
| `default` | Primary dark-green filled button |
| `outline` | Surface-background with green text |
| `ghost` | Transparent with green text on hover surface |
| `destructive` | Red accent, large — primary form CTA (sign-in, sign-up) |
| `post` | Brand-primary with purple glow shadow — feed composer |

| Size | Dimensions | Usage |
|---|---|---|
| `default` | h-42 | Standard CTAs |
| `sm` | h-8 | Compact buttons |
| `lg` | h-52 | Large emphasis |
| `icon` | 36 × 36 | Icon-only buttons |
| `icon-sm` | 32 × 32 | Small icon buttons (nav, toggles, close) |
| `post` | h-19 | Inline composer submit |

All `<Button>` elements default to `type="button"`. Pass `type="submit"` explicitly on form submit buttons.

## Commands

```bash
pnpm dev        # Start development server
pnpm build      # Production build
pnpm start      # Start production server
pnpm lint       # Run Biome checks
pnpm format     # Run Biome format and write
```

## Key Conventions

- **Server Components by default** — only add `"use client"` when strictly needed (state, browser APIs, event listeners)
- **Always use shared UI components** — never raw `<button>` or `<input>`; add a variant/size if the style is close, create a new component in `shared/components/ui/` if it's truly different
- **No hardcoded hex values** — always reference a CSS token in `globals.css`
- **Tailwind built-in scale** — prefer `max-w-120` over `max-w-[480px]`; bracket notation only when no equivalent exists
- **All UI strings in `messages/en.json`** — served via `getDictionary(namespace)`, never hardcoded in components
- **shadcn/ui components** installed via `pnpm dlx shadcn@latest add <component>`, then edited in-place
- **Data fetching** in Server Components via `async/await`; TanStack Query only for mutations, polling, optimistic updates
- **Types** live in `features/<name>/types/` or `shared/types/` — never declared inside component files
- **Git workflow** — always branch from `dev`; never commit directly to `dev` or `main`
