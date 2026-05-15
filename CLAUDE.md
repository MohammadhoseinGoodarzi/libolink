# Libolink – Claude Code Project Memory

## Project Overview
- **Name:** Libolink
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Package Manager:** pnpm

## Exact Package Versions (do not upgrade without being asked)
| Package | Version |
|---|---|
| next | 16.1.6 |
| react | 19.2.3 |
| react-dom | 19.2.3 |
| typescript | ^5 |
| tailwindcss | ^4 |
| @tailwindcss/postcss | ^4 |
| shadcn/ui style | new-york |
| lucide-react | ^0.575.0 |
| clsx | ^2.1.1 |
| tailwind-merge | ^3.5.0 |
| class-variance-authority | ^0.7.1 |
| tailwindcss-animate | ^1.0.7 |
| @radix-ui/react-slot | ^1.2.4 |
| @tanstack/react-query | ^5.100.10 |
| @tanstack/react-query-devtools | ^5.100.10 |
| react-hook-form | latest |
| @hookform/resolvers | ^5.2.2 |
| valibot | ^1.4.0 |
| jotai | ^2.20.0 |
| jotai-tanstack-query | ^0.11.0 |
| eslint | ^9 |
| eslint-config-next | 16.1.6 |

## Tech Stack Summary
- **UI:** React 19, Tailwind CSS v4, shadcn/ui (new-york style, neutral base)
- **Icons:** Lucide React
- **Utilities:** clsx, tailwind-merge, class-variance-authority (cva)
- **Forms:** React Hook Form + Valibot (`valibotResolver` from `@hookform/resolvers/valibot`, re-exported at `shared/validations/valibot-resolver.ts`)
- **Server state:** TanStack Query v5
- **Client state:** Jotai v2 — feature atoms in `features/<name>/store/`, global atoms in `shared/store/`
- **Query atoms:** jotai-tanstack-query — `atomWithQuery` / `atomWithMutation` when query state needs to live in atoms
- **Linting:** ESLint 9 with eslint-config-next

## Modular Architecture

The project uses **vertical feature slices**. Full details in `ARCHITECTURE.md`.

```
import direction:  app/ → features/* → shared/
                   (never across features)
```

### Directory Layout
```
app/          Next.js routing ONLY — thin pages, no logic
features/     Vertical feature slices (auth, landing, …)
shared/       Cross-feature shared code — no feature knowledge
public/assets/ Static assets (fonts, images, icons)
messages/     i18n strings (en.json)
```

### Feature Module Shape
Every feature under `features/<name>/` follows the same structure:
```
components/    Presentational — pure props in, JSX out, no state
containers/    Smart — "use client", orchestrates hooks + state, renders components
hooks/         Feature-scoped custom hooks
services/      API functions (import httpClient from shared/services)
store/         Jotai atoms scoped to this feature
validations/   Validation schemas (Valibot)
types/
  index.ts     All TypeScript interfaces for this feature
constants/
  index.ts     SCREAMING_SNAKE_CASE constants
hocs/          Feature-scoped Higher-Order Components
loading/       Skeleton / loading state components
error/         Error UI components
index.ts       Public barrel — ONLY file outside code imports from
```

### Import Rules
| From | May import | May NOT import |
|---|---|---|
| `app/` | `features/*` (barrel only), `shared/` | Internal feature paths |
| `features/<name>/` | `shared/` | Any other `features/*` |
| `shared/` | Nothing in this repo | `features/*`, `app/` |

**Never import internal feature paths.** Always use the barrel (`@/features/auth`, not `@/features/auth/containers/sign-in-form`).

### Page → Container → Component Pattern
```
app/…/page.tsx       async Server Component — getDictionary, pass strings to container
features/…/containers/  "use client" — form state, mutations, hooks
features/…/components/  pure presentational — no state, only props
```

## Naming Conventions
- **Files & folders:** `kebab-case` — `sign-in-form.tsx`, `use-auth.ts`
- **Component/Type names:** `PascalCase` — `export function SignInForm`
- **Hook names:** `camelCase` — `export function useAuth`
- **Constant values:** `SCREAMING_SNAKE_CASE` — `export const AUTH_ROUTES = ...`
- **Jotai atoms:** `camelCase` + `Atom` suffix — `export const userAtom`

## Key Path Aliases
```ts
import { cn }              from "@/shared/utils/cn";
import { Button }          from "@/shared/components/ui/button";
import { getDictionary }   from "@/shared/i18n/dictionary";
import { getQueryClient }  from "@/shared/providers/query-client";
import { ROUTES }          from "@/shared/constants/routes";
import { SignInForm }      from "@/features/auth";
```

## React Server Components (RSC) — #1 Priority
**Default: every component is a Server Component unless it absolutely cannot be.**

Only add `"use client"` when the component needs:
- `useState` or `useReducer`
- `useEffect` or other lifecycle hooks
- Browser-only APIs (`window`, `localStorage`, etc.)
- Event listeners that require client state
- Third-party libraries that require client context

**Patterns to follow:**
- Fetch data directly in Server Components using `async/await` — never use `useEffect` for data fetching
- Push `"use client"` to the leaves — containers are the typical boundary
- Pass Server Component output as `children` into Client Components to keep them on the server
- Use React `cache()` for deduplicating server-side fetches
- Prefer `loading.tsx` and `error.tsx` over client-side loading states

## Code Style Rules
- Always use TypeScript, never plain `.js` files
- Use `cn()` from `@/shared/utils/cn` for all className merging (clsx + tailwind-merge)
- Use `cva` for component variants
- Use Lucide React for all icons
- Never install a new shadcn component manually — use `pnpm dlx shadcn@latest add <component>`
- Prefer named exports for components
- Use `async/await` over `.then()` chains
- Never suggest installing a new package without asking first
- **Never use `import * as React from "react"`** — always import exactly what is needed: `import { useState, forwardRef, type ComponentProps } from "react"`
- **Never declare types or interfaces inside component files** — all types go in `features/<name>/types/` or `shared/types/`

## Tailwind CSS v4 Notes
- Config is in `app/globals.css` (not `tailwind.config.ts` — v4 uses CSS-based config)
- PostCSS is handled via `@tailwindcss/postcss`
- CSS variables are enabled for theming

## shadcn/ui Notes
- Style: `new-york`
- RTL: disabled
- RSC: enabled
- Always check `shared/components/ui/` before building a new primitive from scratch
- Components are installed via shadcn then customized to Libolink design — no duplicate style overrides; edit the source file directly
- No styling logic in components; use `cn()` and `cva` variants defined in the component file itself

## Commands
```bash
pnpm dev        # Start dev server
pnpm build      # Production build
pnpm start      # Start production server
pnpm lint       # Run ESLint
pnpm dlx shadcn@latest add <component>  # Add shadcn component
```

## React Query (TanStack Query v5)
- `QueryClientProvider` lives in `shared/providers/index.tsx` (Client Component), wrapping the full app in `app/layout.tsx`
- `shared/providers/query-client.ts` exports `makeQueryClient()` (new instance) and `getQueryClient()` (browser singleton)
- **Use React Query only for client-side needs:** mutations, optimistic updates, polling, invalidation
- **Do NOT use `useQuery` to replace RSC data fetching** — server data belongs in `async` Server Components
- DevTools (`ReactQueryDevtools`) are bundled in the provider and visible in development only

## Internationalization (i18n) — Zero-Package Preparation

The app is **not** multi-language yet, but is wired for a zero-friction next-intl migration.

### Current setup (no packages installed)
- **`messages/en.json`** — single source of truth for all UI strings. Use nested namespaces named after the feature (e.g. `"Auth"`, `"Landing"`). Never hardcode display strings in components.
- **`shared/i18n/dictionary.ts`** — async helper that wraps `messages/en.json`. Its API intentionally mirrors `next-intl`'s `getTranslations()`:
  ```ts
  const t = await getDictionary("Auth");
  t("signIn"); // → "Sign in"
  ```
- **All Server Components that render text must be `async`** and call `getDictionary(namespace)` instead of writing strings inline.

### Rules
- **Never hardcode UI strings in components.** Every user-visible string goes in `messages/en.json` first, then referenced via `getDictionary`.
- When adding a new component with text, add its namespace to `messages/en.json` and call `getDictionary` in the component.
- **Namespace = feature name** (PascalCase). Key names are camelCase.

### Migration path (when next-intl is added)
Replace the entire body of `shared/i18n/dictionary.ts` with one line:
```ts
export { getTranslations as getDictionary } from "next-intl/server";
```
Everything else stays the same — no component changes needed.

## Tailwind Scale Rule
- **Always use Tailwind's built-in scale.** Write `max-w-120`, not `max-w-[480px]`. Use bracket (arbitrary) values only when no built-in equivalent exists.

## Package Management
- **Before installing any package, check version compatibility** against the existing stack. Verify peer dependencies, check the package's release notes for breaking changes, and test with a quick node import if uncertain. Example failure: `zod@4.4.x` breaks `@hookform/resolvers@5.2.2` because the resolver was compiled against Zod 4.3.x types.
- Never suggest installing a new package without asking first.
- **When a package is added, update the version table** in this file under "Exact Package Versions".

## Git Workflow
- **Never commit directly to `dev` or `main`/`master`.** Always create a new branch first.
- **Always create a branch from `dev`** before starting any new feature, fix, or refactor. Branch names must be descriptive: `feat/auth-forms`, `fix/input-border`, `refactor/types-folder`.
- **Commit step by step.** After completing a logical unit of work, ask the user if the step is done before committing. Do not batch unrelated changes into one commit.
- Commit messages follow conventional commits: `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`
- **Never include `Co-Authored-By:` in commit messages.**

## Key Reminders
- This is a monorepo-free single Next.js app
- `shared/components/ui/` files are intentionally edited — changes there are part of the design system
- Do not touch `next-env.d.ts`
- Keep `next.config.ts` minimal unless a specific feature requires it
- Always run `pnpm lint` before considering a task done
- Public static assets live under `public/assets/` (images, fonts, icons)
