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
| eslint | ^9 |
| eslint-config-next | 16.1.6 |

## Tech Stack Summary
- **UI:** React 19, Tailwind CSS v4, shadcn/ui (new-york style, neutral base)
- **Icons:** Lucide React
- **Utilities:** clsx, tailwind-merge, class-variance-authority (cva)
- **Linting:** ESLint 9 with eslint-config-next

## Project Structure Conventions
- `app/` – Next.js App Router pages and layouts (RSC by default)
- `components/` – Shared components
- `components/ui/` – shadcn/ui primitives, customized to match Libolink's design system (editing is expected and intentional)
- `lib/` – All business logic, data-fetching helpers, and utility functions (no logic in components)
- `hooks/` – Custom React hooks
- Path alias `@/` maps to project root

## React Server Components (RSC) — #1 Priority
This project maximizes Server Components. Follow this strictly:

**Default: every component is a Server Component unless it absolutely cannot be.**

Only add `"use client"` when the component needs:
- `useState` or `useReducer`
- `useEffect` or other lifecycle hooks
- Browser-only APIs (`window`, `localStorage`, etc.)
- Event listeners that require client state
- Third-party libraries that require client context

**Patterns to follow:**
- Fetch data directly in Server Components using `async/await` — never use `useEffect` for data fetching
- Push `"use client"` to the **leaves** of the component tree, not the top
- If only a small part needs interactivity, extract it into its own small Client Component
- Pass Server Component output as `children` into Client Components to keep them on the server
- Use React `cache()` for deduplicating server-side fetches
- Prefer `loading.tsx` and `error.tsx` over client-side loading states

## Code Style Rules
- Always use TypeScript, never plain `.js` files
- Use `cn()` from `@/lib/utils` for all className merging (clsx + tailwind-merge)
- Use `cva` for component variants
- Use Lucide React for all icons
- Never install a new shadcn component manually — use `pnpm dlx shadcn@latest add <component>`
- Prefer named exports for components
- Use `async/await` over `.then()` chains
- Never suggest installing a new package without asking first

## Tailwind CSS v4 Notes
- Config is in `app/globals.css` (not `tailwind.config.ts` — v4 uses CSS-based config)
- PostCSS is handled via `@tailwindcss/postcss`
- CSS variables are enabled for theming

## shadcn/ui Notes
- Style: `new-york`
- RTL: disabled
- RSC: enabled
- Always check `components/ui/` before building a new primitive from scratch
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

- `QueryClientProvider` lives in `components/providers.tsx` (Client Component), wrapping the full app in `app/layout.tsx`
- `lib/query-client.ts` exports `makeQueryClient()` (new instance) and `getQueryClient()` (browser singleton)
- **Use React Query only for client-side needs:** mutations, optimistic updates, polling, invalidation
- **Do NOT use `useQuery` to replace RSC data fetching** — server data belongs in `async` Server Components
- DevTools (`ReactQueryDevtools`) are bundled in the provider and visible in development only

## Internationalization (i18n) — Zero-Package Preparation

The app is **not** multi-language yet, but is wired for a zero-friction next-intl migration.

### Current setup (no packages installed)
- **`messages/en.json`** — single source of truth for all UI strings. Use nested namespaces named after the component (e.g. `"Header"`, `"Hero"`). Never hardcode display strings in components.
- **`lib/dictionary.ts`** — async helper that wraps `messages/en.json`. Its API intentionally mirrors `next-intl`'s `getTranslations()`:
  ```ts
  const t = await getDictionary("Header");
  t("signIn"); // → "Sign in"
  ```
- **All Server Components that render text must be `async`** and call `getDictionary(namespace)` instead of writing strings inline.

### Rules
- **Never hardcode UI strings in components.** Every user-visible string goes in `messages/en.json` first, then referenced via `getDictionary`.
- When adding a new component with text, add its namespace to `messages/en.json` and call `getDictionary` in the component.
- **Namespace = component name** (PascalCase, matching the component filename). Key names are camelCase.

### Migration path (when next-intl is added)
Replace the entire body of `lib/dictionary.ts` with one line:
```ts
export { getTranslations as getDictionary } from "next-intl/server";
```
Everything else stays the same — no component changes needed.

### Adding a new language
1. Install `next-intl`: `pnpm add next-intl`
2. Copy `messages/en.json` → `messages/[locale].json` and translate
3. Replace `lib/dictionary.ts` body as above
4. Add next-intl middleware and routing config

## Tailwind Scale Rule
- **Always use Tailwind's built-in scale.** Write `max-w-120`, not `max-w-[480px]`. Use bracket (arbitrary) values only when no built-in equivalent exists.

## Key Reminders
- This is a monorepo-free single Next.js app
- `components/ui/` files are intentionally edited — changes there are part of the design system
- Do not touch `next-env.d.ts`
- Keep `next.config.ts` minimal unless a specific feature requires it
- Always run `pnpm lint` before considering a task done
