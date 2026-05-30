# Libolink — Modular Architecture

## Guiding Principles

```
import direction:  app/ → features/* → shared/
                   (never across features, never upward)
```

1. **Features are isolated.** A feature never imports from another feature.
2. **Barrel-only access.** `app/` imports only from `features/<name>/index.ts`, never internal paths.
3. **`app/` is a thin layer.** No business logic, no schemas, no types declared in pages.
4. **`shared/` has no feature knowledge.** It cannot import from `features/`.
5. **Types live where they are used.** Feature domain types live in `features/<name>/types/`; truly shared UI prop types live in `shared/types/`.
6. **Every user-visible string is in `messages/en.json`**, namespaced by feature.
7. **RSC first.** `"use client"` is pushed to the leaves; data fetching happens in Server Components.

---

## Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| Files & folders | `kebab-case` | `sign-in-form.tsx`, `use-auth.ts` |
| Component names | `PascalCase` | `export function SignInForm` |
| Hook names | `camelCase` | `export function useAuth` |
| Constant values | `SCREAMING_SNAKE_CASE` | `export const AUTH_ROUTES = ...` |
| Type / Interface | `PascalCase` | `interface SignInFormProps` |
| Jotai atoms | `camelCase` + `Atom` suffix | `export const userAtom` |

---

## Directory Structure

```
libolink/
│
├── app/                                        # Next.js routing layer ONLY
│   ├── (auth)/                                 # Auth route group — no Header
│   │   ├── layout.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── signup/
│   │       └── page.tsx
│   │
│   ├── (dashboard)/                            # Authenticated shell
│   │   ├── layout.tsx                          # Assembles DashboardShell with sidebars
│   │   └── home/
│   │       └── page.tsx
│   │
│   ├── (landing)/                              # Public pages — with Header
│   │   ├── layout.tsx
│   │   └── page.tsx                            # Landing or feed depending on auth cookie
│   │
│   ├── layout.tsx                              # Root layout — <Providers> + font + no-flash script
│   ├── globals.css                             # Tailwind v4 @theme tokens + dark mode variables
│   ├── loading.tsx                             # Global loading UI (Next.js convention)
│   ├── error.tsx                               # Global error boundary (Next.js convention)
│   ├── not-found.tsx                           # 404 page
│   └── favicon.ico
│
├── features/                                   # Vertical feature slices
│   │
│   ├── auth/                                   # ── Auth module ─────────────────────────
│   │   ├── containers/                         # Smart — "use client", orchestrates state + forms
│   │   │   ├── auth-tabs.tsx
│   │   │   ├── sign-in-form.tsx
│   │   │   └── sign-up-form.tsx
│   │   ├── services/                           # Mock auth service + Server Action bridge
│   │   │   └── auth-service.ts
│   │   ├── store/
│   │   │   └── index.ts
│   │   ├── validations/                        # Valibot schemas
│   │   │   └── auth-schemas.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── index.ts                            # Public barrel
│   │
│   ├── home/                                   # ── Home / Feed module ───────────────────
│   │   ├── components/                         # Presentational — pure props in, JSX out
│   │   │   ├── ads-panel.tsx
│   │   │   ├── ai-assistant-panel.tsx
│   │   │   ├── download-app-card.tsx
│   │   │   ├── favorite-book-card.tsx
│   │   │   ├── nav-menu.tsx
│   │   │   ├── post-card.tsx
│   │   │   ├── post-composer.tsx
│   │   │   ├── sidebar-left.tsx
│   │   │   ├── sidebar-right.tsx
│   │   │   ├── social-media-nav.tsx
│   │   │   ├── stories-panel.tsx
│   │   │   └── user-profile-card.tsx
│   │   ├── containers/                         # Smart — "use client"
│   │   │   ├── dashboard-shell.tsx             # Three-column shell + mobile drawer
│   │   │   └── home-feed.tsx                   # Feed tabs, post list, composer
│   │   ├── constants/
│   │   │   └── index.ts                        # Mock posts, stories, nav items
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── index.ts                            # Public barrel
│   │
│   └── landing/                                # ── Landing module ───────────────────────
│       ├── components/
│       │   ├── header.tsx
│       │   └── hero.tsx
│       ├── types/
│       ├── constants/
│       └── index.ts
│
├── shared/                                     # Cross-feature code — no feature knowledge
│   ├── actions/                                # Next.js Server Actions
│   │   └── auth-cookie.ts                      # setAuthCookie() / clearAuthCookie()
│   ├── components/
│   │   ├── theme-toggle.tsx                    # Hydration-safe dark/light toggle
│   │   └── ui/                                 # shadcn primitives + Libolink design system
│   │       ├── button.tsx                      # Variants: default, outline, ghost, destructive, post
│   │       ├── form-field.tsx                  # Label + input + reserved h-4 error row
│   │       ├── input.tsx                       # Variants: default, auth (pill)
│   │       ├── password-input.tsx              # Input with built-in show/hide toggle
│   │       └── search-input.tsx                # Pill search bar with Search + Mic icons
│   ├── hooks/                                  # Generic hooks used by 2+ features
│   ├── i18n/
│   │   └── dictionary.ts                       # getDictionary(namespace) — mirrors next-intl API
│   ├── providers/                              # All React context providers
│   │   ├── index.tsx                           # <Providers> — single wrapper in app/layout.tsx
│   │   └── query-client.ts                     # makeQueryClient() / getQueryClient()
│   ├── services/                               # HTTP layer (Axios instance + interceptors)
│   ├── store/                                  # Global Jotai atoms (user session, etc.)
│   ├── types/                                  # Shared TypeScript interfaces
│   │   └── ui.ts                               # FormFieldProps, etc.
│   ├── utils/
│   │   └── cn.ts                               # cn() — clsx + tailwind-merge
│   ├── validations/
│   │   └── valibot-resolver.ts                 # RHF resolver bridging Valibot + react-hook-form
│   └── constants/                              # Global constants (routes, API endpoints)
│
├── public/
│   └── assets/
│       ├── fonts/
│       │   └── Vazirmatn[wght].woff2
│       ├── images/
│       │   └── logo.png
│       └── icons/
│           ├── apple.svg
│           └── android.svg
│
├── messages/
│   └── en.json                                 # Single source of truth for all UI strings
│
├── global.d.ts
├── next-env.d.ts
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── biome.json
├── components.json
├── package.json
└── pnpm-lock.yaml
```

---

## Feature Module Contract

Every feature follows the **same internal shape**. Not every slot needs a file, but the location is always predictable:

```
features/<name>/
├── components/       presentational — pure props in, JSX out, no state
├── containers/       smart — "use client", orchestrates hooks + state + data, renders components
├── hooks/            feature-scoped custom hooks
├── services/         API functions for this feature (use shared/services/http-client)
├── store/            Jotai atoms scoped to this feature
├── validations/      Valibot schemas for this feature's forms
├── types/
│   └── index.ts      all TypeScript interfaces for this feature
├── constants/
│   └── index.ts      SCREAMING_SNAKE_CASE constants for this feature
├── hocs/             Higher-Order Components scoped to this feature
├── loading/          skeleton / loading state components
├── error/            error UI components
└── index.ts          public barrel — the only file outside code may import
```

---

## Page → Container → Component Pattern

```
app/(auth)/login/page.tsx            Server Component (async)
  ↓ calls getDictionary("Auth")
  ↓ imports SignInForm from @/features/auth (via barrel)
  ↓ passes strings as props

features/auth/containers/sign-in-form.tsx   "use client"
  ↓ receives string props from the page
  ↓ manages form state via react-hook-form + valibotResolver
  ↓ calls signIn() service + setAuthCookie() Server Action
  ↓ renders <FormField>, <Input>, <PasswordInput>, <Button>

app/(dashboard)/layout.tsx           Server Component (async)
  ↓ calls getDictionary("Home")
  ↓ imports DashboardShell, SidebarLeft, SidebarRight, SocialMediaNav from @/features/home
  ↓ imports SearchInput from @/shared/components/ui/search-input
  ↓ passes ReactNode slots to DashboardShell
```

The page owns **nothing** except routing. The container owns **client state and data access**. The component owns **only appearance**.

---

## Import Rules

| From | May import | May NOT import |
|---|---|---|
| `app/` | `features/*` (via barrel only), `shared/` | Internal feature paths |
| `features/<name>/` | `shared/` | Any other `features/*` |
| `shared/` | Nothing in this repo | `features/*`, `app/` |

Cross-feature state (e.g. current user needed in multiple features) lives in `shared/store/` as a Jotai atom that any feature can read.

---

## Tech Stack Integration

### State: Jotai + TanStack Query + jotai-tanstack-query

```
Server state (API data)    →  TanStack Query  (queries, mutations)
Client/UI state            →  Jotai atoms     (user session, modals, theme)
Bridge                     →  atomWithQuery / atomWithMutation from jotai-tanstack-query
```

- Global atoms (`userAtom`) live in `shared/store/`
- Feature atoms live in `features/<name>/store/`
- Queries and mutations are initiated inside **containers** or **hooks**, never in components

### HTTP: Axios (planned)

```
shared/services/http-client.ts    creates the Axios instance (baseURL, timeout, headers)
shared/services/interceptors.ts   attaches request interceptor (inject token)
                                  attaches response interceptor (handle 401, normalise errors)

features/<name>/services/         imports httpClient and defines endpoint functions
```

### Validation: Valibot

```
shared/validations/valibot-resolver.ts    RHF resolver bridging Valibot + react-hook-form
features/<name>/validations/              Valibot schemas for this feature's forms
```

### i18n

```
messages/en.json                  source of truth, namespaced by feature (PascalCase key)
shared/i18n/dictionary.ts         getDictionary(namespace) helper — mirrors next-intl API
```

Migration path when next-intl is added: replace the body of `dictionary.ts` with one line — `export { getTranslations as getDictionary } from 'next-intl/server'`. No component changes needed.

### Dark Mode

```
app/layout.tsx          inline <script> reads localStorage("theme"), sets .dark on <html>
                        before React hydrates — eliminates theme flash on first paint
app/globals.css         .dark {} block overrides all CSS variables
shared/components/
  theme-toggle.tsx      useSyncExternalStore + MutationObserver watches document.classList
                        getServerSnapshot = () => false ensures server/client hydration agreement
```

`suppressHydrationWarning` on `<html>` is intentional — it covers only the `class` attribute mismatch introduced by the no-flash script.

---

## Barrel Export — Public API

The `index.ts` at the root of each feature is its **only public interface**:

```ts
// features/home/index.ts
export { SidebarLeft }     from './components/sidebar-left';
export { SidebarRight }    from './components/sidebar-right';
export { SocialMediaNav }  from './components/social-media-nav';
export { DashboardShell }  from './containers/dashboard-shell';
export { HomeFeed }        from './containers/home-feed';
export { MOCK_POSTS, MOCK_STORIES } from './constants';
export type { HomeFeedLabels } from './types';
```

```ts
// ✅ correct
import { DashboardShell } from "@/features/home";

// ❌ wrong — never reach inside a feature
import { DashboardShell } from "@/features/home/containers/dashboard-shell";
```

`SearchInput` and `PasswordInput` are in `shared/components/ui/` (used by multiple features) — import them from `@/shared/components/ui/search-input` and `@/shared/components/ui/password-input` directly.

---

## `messages/en.json` — Namespace Convention

Top-level key = feature name (PascalCase). Nested keys are camelCase:

```json
{
  "Auth": {
    "emailLabel": "...",
    "signIn": "..."
  },
  "Home": {
    "searchPlaceholder": "...",
    "tabRecent": "..."
  },
  "Landing": {
    "Header": { "signIn": "...", "signUp": "..." },
    "Hero":   { "title": "...", "getStart": "..." }
  }
}
```

---

## `shared/components/ui/` — What Belongs Here

| Belongs | Does NOT belong |
|---|---|
| Primitives used by 2+ features (`Button`, `Input`, `SearchInput`, `PasswordInput`, `FormField`) | Feature-specific components |
| `ThemeToggle` — used on every page | Feature business logic |
| `utils/cn.ts` — `cn()` helper | Feature Valibot schemas |
| `i18n/dictionary.ts` | Feature API service functions |
| `providers/` — all app providers | Feature contexts |
| `store/` — global atoms | Feature-scoped atoms |
| `validations/valibot-resolver.ts` | Feature validation schemas |
| `actions/` — shared Server Actions | Feature-only Server Actions |

Rule: if two separate features would copy the code, it belongs in `shared/`.

---

## Path Aliases

`@/` maps to the project root:

```ts
import { cn }             from "@/shared/utils/cn";
import { Button }         from "@/shared/components/ui/button";
import { Input }          from "@/shared/components/ui/input";
import { PasswordInput }  from "@/shared/components/ui/password-input";
import { SearchInput }    from "@/shared/components/ui/search-input";
import { FormField }      from "@/shared/components/ui/form-field";
import { ThemeToggle }    from "@/shared/components/theme-toggle";
import { getDictionary }  from "@/shared/i18n/dictionary";
import { getQueryClient } from "@/shared/providers/query-client";
import { ROUTES }         from "@/shared/constants/routes";
import { DashboardShell } from "@/features/home";
import { SignInForm }     from "@/features/auth";
```
