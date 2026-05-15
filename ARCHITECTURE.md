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
│   ├── (landing)/                              # Public pages — with Header
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── layout.tsx                              # Root layout — <Providers> + font only
│   ├── globals.css                             # Tailwind v4 tokens + global styles
│   ├── loading.tsx                             # Global loading UI (Next.js convention)
│   ├── error.tsx                               # Global error boundary (Next.js convention)
│   ├── not-found.tsx                           # 404 page
│   └── favicon.ico
│
├── features/                                   # Vertical feature slices
│   │
│   ├── auth/                                   # ── Auth module ─────────────────────────
│   │   ├── components/                         # Presentational — no state, pure props
│   │   │   ├── auth-tabs.tsx
│   │   │   ├── sign-in-form.tsx
│   │   │   └── sign-up-form.tsx
│   │   ├── containers/                         # Smart — orchestrate state + data
│   │   │   ├── sign-in-container.tsx
│   │   │   └── sign-up-container.tsx
│   │   ├── hooks/                              # Auth-scoped hooks
│   │   │   └── use-auth.ts
│   │   ├── services/                           # API calls for auth endpoints
│   │   │   └── auth-service.ts
│   │   ├── store/                              # Jotai atoms scoped to auth
│   │   │   └── auth-atoms.ts
│   │   ├── validations/                        # Valibot schemas
│   │   │   └── auth-schemas.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── constants/
│   │   │   └── index.ts                        # e.g. AUTH_ROUTES, PASSWORD_MIN_LENGTH
│   │   ├── hocs/                               # Auth-specific HOCs (e.g. with-guest-only)
│   │   ├── loading/                            # Auth skeletons / loading states
│   │   │   └── auth-skeleton.tsx
│   │   ├── error/                              # Auth-specific error UI
│   │   │   └── auth-error.tsx
│   │   └── index.ts                            # Public barrel
│   │
│   └── landing/                                # ── Landing module ───────────────────────
│       ├── components/
│       │   ├── header.tsx
│       │   └── hero.tsx
│       ├── containers/
│       ├── hooks/
│       ├── services/
│       ├── store/
│       ├── validations/
│       ├── types/
│       ├── constants/
│       ├── hocs/
│       ├── loading/
│       ├── error/
│       └── index.ts
│
├── shared/                                     # Cross-feature code — no feature knowledge
│   ├── components/
│   │   └── ui/                                 # shadcn primitives + Libolink design system
│   │       ├── button.tsx
│   │       ├── form-field.tsx
│   │       └── input.tsx
│   ├── hooks/                                  # Generic hooks used by 2+ features
│   ├── hocs/                                   # Global HOCs (e.g. with-auth, with-error-boundary)
│   ├── providers/                              # All React context providers
│   │   ├── query-provider.tsx                  # TanStack Query + jotai-tanstack-query setup
│   │   ├── jotai-provider.tsx
│   │   └── index.tsx                           # <Providers> — single wrapper imported by app/layout.tsx
│   ├── services/                               # HTTP layer
│   │   ├── http-client.ts                      # Axios instance (base URL, headers, timeout)
│   │   └── interceptors.ts                     # Request (token inject) + response (401, errors)
│   ├── store/                                  # Global Jotai atoms (user session, theme, etc.)
│   ├── validations/                            # Shared Valibot helpers + RHF resolver
│   │   └── valibot-resolver.ts                 # Custom RHF resolver bridging Valibot + react-hook-form
│   ├── utils/                                  # Pure functions — no side effects
│   │   └── cn.ts                               # cn() — clsx + tailwind-merge
│   ├── types/                                  # Shared TypeScript interfaces
│   │   └── ui.ts                               # FormFieldProps, etc.
│   ├── constants/                              # Global constants
│   │   ├── routes.ts                           # ROUTES object — all app paths
│   │   └── api-endpoints.ts                    # API_ENDPOINTS object
│   ├── i18n/                                   # Internationalisation
│   │   ├── dictionary.ts                       # getDictionary() helper
│   │   └── types.ts                            # Dictionary type definitions
│   ├── loading/                                # Global loading components
│   │   └── spinner.tsx
│   └── error/                                  # Global error boundary component
│       └── error-boundary.tsx
│
├── public/
│   └── assets/
│       ├── fonts/
│       ├── images/
│       │   ├── logo.svg
│       │   ├── app-preview.png
│       │   └── app-preview-side.png
│       └── icons/
│
├── messages/
│   └── en.json                                 # Single source of truth for all UI strings
│
├── global.d.ts
├── next-env.d.ts
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── eslint.config.mjs
├── components.json
├── package.json
└── pnpm-lock.yaml
```

---

## Feature Module Contract

Every feature follows the **same internal shape** as `shared/`. Not every slot needs a file, but the location is always predictable:

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
  ↓ imports SignInContainer from @/features/auth
  ↓ passes strings as props

features/auth/containers/sign-in-container.tsx   "use client"
  ↓ receives string props from the page
  ↓ manages form state via react-hook-form
  ↓ calls useMutation / atomWithMutation for the API call
  ↓ renders <SignInForm />

features/auth/components/sign-in-form.tsx        pure presentational
  ↓ receives all data + handlers as props
  ↓ renders HTML — no state, no hooks
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

- Global atoms (`userAtom`, `themeAtom`) live in `shared/store/`
- Feature atoms (`authLoadingAtom`) live in `features/<name>/store/`
- Queries and mutations are initiated inside **containers** or **hooks**, never in components

### HTTP: Axios

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
messages/en.json                  source of truth, namespaced by feature
shared/i18n/dictionary.ts         getDictionary(namespace) helper
shared/i18n/types.ts              TypeScript types for the dictionary shape
```

---

## Barrel Export — Public API

The `index.ts` at the root of each feature is its **only public interface**. External code never reaches inside:

```ts
// features/auth/index.ts
export { AuthTabs }         from "./components/auth-tabs";
export { SignInContainer }  from "./containers/sign-in-container";
export { SignUpContainer }  from "./containers/sign-up-container";
export { useAuth }          from "./hooks/use-auth";
export type { SignInFormProps, SignUpFormProps, AuthTabsProps } from "./types";
```

```ts
// ✅ correct
import { SignInContainer } from "@/features/auth";

// ❌ wrong — never reach inside a feature
import { SignInContainer } from "@/features/auth/containers/sign-in-container";
```

---

## `messages/en.json` — Namespace Convention

Top-level key = feature name (PascalCase). Nested keys = component or sub-section:

```json
{
  "Auth": {
    "title": "...",
    "signIn": "...",
    "signUp": "..."
  },
  "Landing": {
    "Header": { "signIn": "...", "signUp": "..." },
    "Hero":   { "title": "...", "getStart": "..." }
  }
}
```

---

## `shared/` — Belongs Here vs. Does Not

| Belongs in `shared/` | Does NOT belong in `shared/` |
|---|---|
| `components/ui/` — shadcn primitives | Feature components or containers |
| `utils/cn.ts` — `cn()` helper | Feature business logic |
| `i18n/dictionary.ts` | Feature Valibot schemas |
| `services/http-client.ts` — Axios instance | Feature API service functions |
| `services/interceptors.ts` | Feature types |
| `providers/` — all app providers | Feature contexts |
| `store/` — global atoms (user, theme) | Feature-scoped atoms |
| `validations/valibot-resolver.ts` | Feature validation schemas |
| `hooks/` — generic hooks (useDebounce, etc.) | Feature-specific hooks |
| `constants/routes.ts`, `api-endpoints.ts` | Feature constants |
| `error/error-boundary.tsx` | Feature error UI |
| `loading/spinner.tsx` | Feature skeleton components |

Rule: if two separate features would copy the code, it belongs in `shared/`.

---

## Path Aliases

`@/` maps to the project root:

```ts
import { cn }        from "@/shared/utils/cn";
import { Button }    from "@/shared/components/ui/button";
import { ROUTES }    from "@/shared/constants/routes";
import { httpClient } from "@/shared/services/http-client";
import { SignInContainer } from "@/features/auth";
```

---

## Migration Map — Current → Target

| Current path | Target path |
|---|---|
| `components/auth/AuthTabs.tsx` | `features/auth/components/auth-tabs.tsx` |
| `components/auth/SignInForm.tsx` | `features/auth/components/sign-in-form.tsx` |
| `components/auth/SignUpForm.tsx` | `features/auth/components/sign-up-form.tsx` |
| `components/landing/Header.tsx` | `features/landing/components/header.tsx` |
| `components/landing/Hero.tsx` | `features/landing/components/hero.tsx` |
| `components/ui/` | `shared/components/ui/` |
| `components/providers.tsx` | `shared/providers/index.tsx` |
| `lib/auth.ts` | `features/auth/services/auth-service.ts` + `features/auth/validations/auth-schemas.ts` |
| `lib/zod-resolver.ts` | `shared/validations/valibot-resolver.ts` (Valibot replaces Zod) |
| `lib/dictionary.ts` | `shared/i18n/dictionary.ts` |
| `lib/query-client.ts` | `shared/providers/query-provider.tsx` |
| `lib/utils.ts` | `shared/utils/cn.ts` |
| `types/auth.ts` | `features/auth/types/index.ts` |
| `types/ui.ts` | `shared/types/ui.ts` |
| `public/*.png`, `public/logo.svg` | `public/assets/images/`, `public/assets/icons/` |
