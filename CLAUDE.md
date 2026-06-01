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
| @biomejs/biome | 2.3.15 |

## Tech Stack Summary
- **UI:** React 19, Tailwind CSS v4, shadcn/ui (new-york style, neutral base)
- **Font:** Vazirmatn variable font loaded via `next/font/local`, bound to `--font-vazirmatn`
- **Icons:** Lucide React
- **Utilities:** clsx, tailwind-merge, class-variance-authority (cva)
- **Forms:** React Hook Form + Valibot (`valibotResolver` from `@hookform/resolvers/valibot`, re-exported at `shared/validations/valibot-resolver.ts`)
- **Server state:** TanStack Query v5
- **Client state:** Jotai v2 — feature atoms in `features/<name>/store/`, global atoms in `shared/store/`
- **Query atoms:** jotai-tanstack-query — `atomWithQuery` / `atomWithMutation` when query state needs to live in atoms
- **Linting / Formatting:** Biome 2 (`biome.json`) — replaces ESLint. `pnpm lint` runs `biome check .`; `pnpm format` runs `biome format --write .`

## Modular Architecture

The project uses **vertical feature slices**. Full details in `ARCHITECTURE.md`.

```
import direction:  app/ → features/* → shared/
                   (never across features)
```

### Directory Layout
```
app/          Next.js routing ONLY — thin pages, no logic
features/     Vertical feature slices (auth, home, landing)
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
import { Input }           from "@/shared/components/ui/input";
import { PasswordInput }   from "@/shared/components/ui/password-input";
import { SearchInput }     from "@/shared/components/ui/search-input";
import { FormField }       from "@/shared/components/ui/form-field";
import { ThemeToggle }     from "@/shared/components/theme-toggle";
import { getDictionary }   from "@/shared/i18n/dictionary";
import { getQueryClient }  from "@/shared/providers/query-client";
import { ROUTES }          from "@/shared/constants/routes";
import { SignInForm }      from "@/features/auth";
import { DashboardShell }  from "@/features/home";
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

## Component Rules — Always Use Shared UI
- **Never use raw `<button>` elements** outside of primitive UI components. Always use `<Button>` from `@/shared/components/ui/button`.
  - If the style is close to an existing variant, add a `className` override.
  - If it's a new reusable pattern, add a variant or size to `button.tsx`.
  - If it's truly different and reusable, create a new component in `shared/components/ui/`.
  - **Exception:** invisible/wrapper `<button>` elements used purely for accessibility (e.g. a full-screen backdrop click-to-close, an image container that must have zero visual styling) may be raw `<button>` elements to avoid fighting `<Button>` defaults. These must have `type="button"`, an `aria-label`, and no visual styling.
- **Never use raw `<input>` elements** outside of primitive UI components. Use `<Input>`, `<PasswordInput>`, or `<SearchInput>`.
- **`<Button>` defaults to `type="button"`** — always pass `type="submit"` explicitly on form submit buttons.

## Button Variants & Sizes

| Variant | Visual | Used for |
|---|---|---|
| `default` | Green fill, white text | Header CTAs, nav actions |
| `outline` | Surface fill, green text | Social auth, secondary actions |
| `ghost` | Transparent, green text + hover surface | Icon buttons, tab navigation |
| `destructive` | Crimson fill, white text, large | Primary form submit (sign-in, sign-up) |
| `post` | Brand-primary, glow shadow | Feed composer post button |

| Size | Dimensions | Used for |
|---|---|---|
| `default` | h-42 px-6 | Standard CTAs |
| `sm` | h-8 px-3 | Compact buttons |
| `lg` | h-52 px-8 | Large buttons |
| `icon` | 36 × 36 | Standard icon buttons |
| `icon-sm` | 32 × 32 | Small icon buttons (nav hamburger, drawer close, theme toggle) |
| `post` | h-19 px-2.5 | Inline composer submit |

## Tailwind CSS v4 Notes
- Config is in `app/globals.css` (not `tailwind.config.ts` — v4 uses CSS-based config)
- PostCSS is handled via `@tailwindcss/postcss`
- CSS variables are enabled for theming
- Dark mode: `@custom-variant dark (&:is(.dark *))` — the `.dark` class is set on `<html>`

## Dark Mode Implementation
- **No-flash script** in `app/layout.tsx` `<body>`: reads `localStorage("theme")`, sets `.dark` on `<html>` synchronously before React mounts. This is the only reliable way to avoid flash — do not replace with `useEffect`.
- **`suppressHydrationWarning`** on `<html>`: safe — scoped only to the `class` attribute diff caused by the no-flash script.
- **`ThemeToggle`** (`shared/components/theme-toggle.tsx`): uses `useSyncExternalStore` with a `MutationObserver` on `document.documentElement.classList`. `getServerSnapshot = () => false` ensures server/client agree during hydration.
- **CSS tokens**: `.dark {}` block in `globals.css` overrides all semantic tokens — `--background: #051a0e`, `--card: #0c2218`, `--secondary: #162d1e`.
- **ThemeToggle must be on every page**: home sidebar, auth layout, landing header.

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
pnpm lint       # Run Biome (check)
pnpm format     # Run Biome (format + write)
pnpm dlx shadcn@latest add <component>  # Add shadcn component
```

## Biome Configuration
- Config: `biome.json` — replaces `eslint.config.mjs` (deleted)
- Single quotes, trailing commas, semicolons, 2-space indent, 100-char line width
- `organizeImports` enabled — import order is enforced
- `noDangerouslySetInnerHtml` disabled globally (the no-flash `<script>` is intentional)
- CSS parser: `tailwindDirectives: true` (required for Tailwind v4 `@plugin`, `@custom-variant`, `@theme` syntax)
- `next.config.ts` sets `eslint.ignoreDuringBuilds: true` (Biome handles linting, not Next.js build pipeline)

## React Query (TanStack Query v5)
- `QueryClientProvider` lives in `shared/providers/index.tsx` (Client Component), wrapping the full app in `app/layout.tsx`
- `shared/providers/query-client.ts` exports `makeQueryClient()` (new instance) and `getQueryClient()` (browser singleton)
- **Use React Query only for client-side needs:** mutations, optimistic updates, polling, invalidation
- **Do NOT use `useQuery` to replace RSC data fetching** — server data belongs in `async` Server Components
- DevTools (`ReactQueryDevtools`) are bundled in the provider and visible in development only

## Internationalization (i18n) — Zero-Package Preparation

The app is **not** multi-language yet, but is wired for a zero-friction next-intl migration.

### Current setup (no packages installed)
- **`messages/en.json`** — single source of truth for all UI strings. Use nested namespaces named after the feature (e.g. `"Auth"`, `"Home"`, `"Landing"`). Never hardcode display strings in components.
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

## Overlay / Portal Pattern
- **Never use Radix `Dialog` for full-screen overlays that need a true glass/blur backdrop.** Radix always renders its own `bg-black/80` overlay underneath, which means `backdrop-blur` on the content only blurs black — not the page.
- Use `createPortal(…, document.body)` instead. Put `backdrop-blur-xl bg-white/10` directly on the outermost `<div>` to get the glassmorphism effect.
- See `features/home/components/image-lightbox.tsx` for the canonical implementation.

## next/image Patterns
- **Natural aspect ratio:** `width={0} height={0} sizes="…" className="w-full h-auto block"` — lets CSS control layout while Next.js serves the correct intrinsic size.
- **Blob URLs:** `unoptimized={src.startsWith('blob:')}` — Next.js cannot optimize `blob:` URLs. Use this conditional prop so the same component handles both static paths and user-uploaded previews.

## Scroll-Hide Animation — Anti-Oscillation
When hiding/showing a sticky element based on scroll direction, a layout change (e.g. the element collapsing) triggers a synthetic scroll event that immediately re-shows it, causing oscillation. Guard against this with two refs:
- `visibleRef` — mirrors the state value so the scroll handler always sees the current value without needing it in deps.
- `lastToggle` ref — stores `Date.now()` on every state change; the handler skips any event within 350 ms of the last toggle.
See `features/home/containers/home-feed.tsx` for the canonical implementation.

## Mock Assets
- Mock book cover images live at `public/assets/images/mock/` (book-portrait.jpg, book-square.jpg, book-landscape.jpg, book-tall.jpg).
- On Windows, download images with `curl --ssl-no-revoke` to bypass the CRL revocation check that fails when offline or on restricted networks.

## Key Reminders
- This is a monorepo-free single Next.js app
- `shared/components/ui/` files are intentionally edited — changes there are part of the design system
- Do not touch `next-env.d.ts`
- Keep `next.config.ts` minimal unless a specific feature requires it
- Always run `pnpm lint` before considering a task done
- Public static assets live under `public/assets/` (images, fonts, icons)
- Mock auth uses a `mock-auth` cookie set by `shared/actions/auth-cookie.ts` — no real backend yet
- All post/comment service functions are stubs — they map 1:1 to future API endpoints. Swap the function body only; callers stay the same.
