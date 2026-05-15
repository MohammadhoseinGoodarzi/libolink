# Libolink — Project Structure

## Overview
Three core domains: **Social** (feed, profiles, reviews) · **Events** (book events, clubs) · **Marketplace** (buy & sell)

Full architecture rules: [`ARCHITECTURE.md`](ARCHITECTURE.md)

---

```
libolink/
│
├── app/                                        # Next.js routing ONLY — thin pages
│   ├── (auth)/                                 # Auth route group — no Header
│   │   ├── layout.tsx                          # Two-column layout: left image + right form
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
│   └── favicon.ico
│
├── features/                                   # Vertical feature slices
│   │
│   ├── auth/
│   │   ├── containers/                         # "use client" — form state, RHF, mutations
│   │   │   ├── auth-tabs.tsx
│   │   │   ├── sign-in-form.tsx
│   │   │   └── sign-up-form.tsx
│   │   ├── components/                         # Presentational (add when splitting containers)
│   │   ├── hooks/                              # Auth-scoped hooks (e.g. use-auth.ts)
│   │   ├── services/
│   │   │   └── auth-service.ts                 # signIn / signUp stubs
│   │   ├── store/                              # Jotai atoms for auth
│   │   ├── validations/
│   │   │   └── auth-schemas.ts                 # Valibot schemas + inferred types
│   │   ├── types/
│   │   │   └── index.ts                        # AuthTabsProps, SignInFormProps, etc.
│   │   ├── constants/
│   │   ├── hocs/
│   │   ├── loading/
│   │   ├── error/
│   │   └── index.ts                            # Public barrel
│   │
│   └── landing/
│       ├── components/
│       │   ├── header.tsx                      # async Server Component
│       │   └── hero.tsx                        # async Server Component
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
│       └── index.ts                            # Public barrel
│
├── shared/                                     # Cross-feature code — no feature knowledge
│   ├── components/
│   │   └── ui/                                 # shadcn primitives + Libolink design system
│   │       ├── button.tsx
│   │       ├── form-field.tsx
│   │       └── input.tsx
│   ├── hooks/                                  # Generic hooks (useDebounce, etc.)
│   ├── hocs/                                   # Global HOCs (with-auth, with-error-boundary)
│   ├── providers/
│   │   ├── query-client.ts                     # makeQueryClient / getQueryClient
│   │   └── index.tsx                           # <Providers> — QueryClientProvider wrapper
│   ├── services/                               # Axios instance + interceptors (add when backend ready)
│   ├── store/                                  # Global Jotai atoms (user session, theme)
│   ├── validations/
│   │   └── valibot-resolver.ts                 # Re-exports valibotResolver from @hookform/resolvers
│   ├── utils/
│   │   └── cn.ts                               # cn() — clsx + tailwind-merge
│   ├── types/
│   │   └── ui.ts                               # FormFieldProps
│   ├── constants/                              # ROUTES, API_ENDPOINTS
│   ├── i18n/
│   │   └── dictionary.ts                       # getDictionary() helper
│   ├── loading/                                # Global Spinner, Skeleton
│   └── error/                                  # Global ErrorBoundary
│
├── public/
│   └── assets/
│       ├── images/
│       │   ├── logo.svg
│       │   ├── app-preview.png
│       │   └── app-preview-side.png
│       ├── fonts/
│       └── icons/
│
├── messages/
│   └── en.json                                 # All UI strings, namespaced by feature
│
├── global.d.ts
├── next-env.d.ts
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── eslint.config.mjs
├── components.json                             # shadcn config — aliases updated for new paths
├── package.json
├── pnpm-lock.yaml
├── ARCHITECTURE.md                             # Architecture rules and decisions
├── CLAUDE.md                                   # Claude Code project memory
└── STRUCTURE.md                                # This file
```

---

## Rules

| Location | What goes here |
|---|---|
| `app/` | Next.js pages and layouts — no business logic, no types, no schemas |
| `features/<name>/containers/` | "use client" smart components — state, hooks, mutations |
| `features/<name>/components/` | Presentational — pure props in, JSX out, zero state |
| `features/<name>/services/` | API calls for this feature using `shared/services/http-client` |
| `features/<name>/validations/` | Validation schemas (Valibot) |
| `features/<name>/types/index.ts` | All domain types for this feature |
| `features/<name>/index.ts` | Public barrel — the ONLY file external code imports |
| `shared/components/ui/` | shadcn primitives — install via shadcn CLI then edit directly |
| `shared/utils/cn.ts` | `cn()` helper and other pure utilities |
| `shared/i18n/dictionary.ts` | `getDictionary()` — i18n helper |
| `shared/providers/` | All React context providers |
| `shared/types/` | Shared UI prop types |
| `messages/en.json` | Every user-visible string — namespaced by feature (PascalCase) |
| `public/assets/` | Static files — images, fonts, icons |

## Boundaries
- `app/` never contains business logic — only imports from `features/*` (barrel) and `shared/`
- `features/<name>/` never imports from another feature — cross-feature state goes through `shared/store/`
- `shared/` has zero knowledge of any feature
- Types are never declared inside component files — they live in `features/<name>/types/` or `shared/types/`
- Every user-visible string is in `messages/en.json` — never hardcoded in components
