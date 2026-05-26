# Libolink — Design System

## 1. Scope of this document

This document covers Libolink's **visual layer**: color tokens, typography, spacing, shadcn/ui primitives in `shared/components/ui/`, and the UI composition patterns built on top of them. It does **not** restate rules that live elsewhere:

- **Architecture, import direction, module boundaries** → `ARCHITECTURE.md`
- **Project conventions, package versions, RSC rules, i18n setup, git workflow** → `CLAUDE.md`
- **This document** → tokens, primitives, composition patterns, visual gaps

When a rule appears in two places, the other doc wins — references are inserted in line so Claude (chat) and Claude Code both land on the same answer.

---

## 2. Design principles

Inferred from the Figma frames in `uploads/image_2026-05-27_*.png` (auth, forgot-password, landing hero, feed):

- **Roomy, low-decoration interface.** Cards sit on white or a near-white surface with clear separation by whitespace rather than borders or dividers. Page sections in the auth flow leave large empty quadrants intentionally — see the empty middle column in `image_2026-05-27_00-32-29.png`.
- **Two-color personality.** Deep forest green (`#023618`) anchors brand surfaces — logo lockup, profile card, sidebar nav pill, "Social Media" pill — and crimson (`#C14953`) is reserved for the _single_ primary form action on a screen (Sign in, Send verification code). This inversion of "primary = brand color" is the system's most distinctive choice; document and protect it.
- **Soft, fully-rounded form controls.** Inputs are pills (`rounded-full`) with a tinted surface fill (`#E8EBF4`) and a low-contrast brand-primary border. Buttons are squircle-radius rectangles.
- **Decorative gradients used sparingly and intentionally.** The AI Assistant panel (`image_2026-05-27_00-33-06.png`) is the only place a `brand-soft → brand-glow` pink/purple gradient appears. It is a _featured-surface_ treatment, not a default.

---

## 3. Color system

Libolink uses **Tailwind v4 `@theme` tokens** in `app/globals.css` layered with **shadcn new-york CSS variables**. The current file (`app/globals.css`) defines both layers independently — see §10 for the gap. The target state below is what all new UI should be written against.

### 3.1 Primitive layer — brand palette

OKLCH-recommended source-of-truth, defined in `@theme` (`app/globals.css` lines 7–17). Hex shown here are the values the Figma frame in `image_2026-05-27_00-30-42.png` was sampled from.

| Token                          | Hex       | Role                                                                                                                                                                   |
| ------------------------------ | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--color-brand-primary`        | `#023618` | Forest green. Branding, nav, headings, profile/sidebar surfaces.                                                                                                       |
| `--color-brand-accent`         | `#C14953` | Crimson. Primary form CTA — _not_ destructive.                                                                                                                         |
| `--color-brand-navy`           | `#1D3557` | Defined in `globals.css` line 11; **not currently consumed by any component**. Reserve for a future informational/link role (e.g. inline links, info badges). See §10. |
| `--color-brand-gray`           | `#6B7280` | Body text on white, placeholder text, secondary UI labels ("@username", timestamps).                                                                                   |
| `--color-brand-gray-light`     | `#EAEAEA` | Section dividers, low-emphasis surfaces (social-auth buttons on white).                                                                                                |
| `--color-brand-surface`        | `#E8EBF4` | Form-control fill — input background, hover surface for ghost buttons.                                                                                                 |
| `--color-brand-surface-hover`  | `#dde1ef` | Hover state of `--color-brand-surface`.                                                                                                                                |
| `--color-brand-surface-active` | `#d0d4e8` | Active/pressed state of `--color-brand-surface`.                                                                                                                       |
| `--color-brand-soft`           | `#F8EAED` | Light pink — text-on-dark on `brand-primary` post buttons; light end of the AI-assistant gradient.                                                                     |
| `--color-brand-glow`           | `#E9D5FF` | Light lavender — shadow color on the `post` button variant; dark end of the AI-assistant gradient.                                                                     |

These are **primitive tokens**. Feature components should not read them directly except for clearly decorative surfaces (the AI assistant gradient, the post-button glow). All other styling should go through the semantic layer below.

### 3.2 Semantic layer — shadcn tokens

Defined in `:root` and `.dark` blocks (`app/globals.css` lines 58–127). These map shadcn's contract (`bg-background`, `text-foreground`, `bg-primary`, etc.) onto Libolink's brand vocabulary. The current file uses **stock shadcn new-york neutral grayscale** for these tokens, which is why every Libolink component currently reaches past them to `bg-brand-*` utilities — see §10 for the gap and the recommended remap.

**Target mapping (light):**

| Semantic token           | Maps to                       | OKLCH (recommended)                    | Used for                                                                                                                                       |
| ------------------------ | ----------------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `--background`           | white                         | `oklch(1 0 0)`                         | Page background.                                                                                                                               |
| `--foreground`           | near-black                    | `oklch(0.145 0 0)`                     | Default body text.                                                                                                                             |
| `--card`                 | white                         | `oklch(1 0 0)`                         | Card surface (post card, AI assistant card chrome).                                                                                            |
| `--card-foreground`      | `--foreground`                | `oklch(0.145 0 0)`                     | Text inside a card.                                                                                                                            |
| `--popover`              | `--card`                      | `oklch(1 0 0)`                         | Floating popover surface.                                                                                                                      |
| `--popover-foreground`   | `--foreground`                | `oklch(0.145 0 0)`                     | —                                                                                                                                              |
| `--primary`              | `--color-brand-primary`       | `oklch(0.225 0.038 158)` (≈ `#023618`) | Brand surfaces — header CTA, nav active pill, profile card BG.                                                                                 |
| `--primary-foreground`   | white                         | `oklch(0.985 0 0)`                     | Text on `--primary`.                                                                                                                           |
| `--secondary`            | `--color-brand-surface`       | `oklch(0.93 0.013 264)` (≈ `#E8EBF4`)  | Outline button BG, soft surface.                                                                                                               |
| `--secondary-foreground` | `--primary`                   | `oklch(0.225 0.038 158)`               | Text on `--secondary`.                                                                                                                         |
| `--muted`                | `--color-brand-gray-light`    | `oklch(0.93 0 0)` (≈ `#EAEAEA`)        | Skeleton fills, low-emphasis chips.                                                                                                            |
| `--muted-foreground`     | `--color-brand-gray`          | `oklch(0.55 0.013 264)` (≈ `#6B7280`)  | Placeholder text, captions, timestamps.                                                                                                        |
| `--accent`               | `--color-brand-surface-hover` | `oklch(0.91 0.014 264)`                | Hover surface inside menus/lists.                                                                                                              |
| `--accent-foreground`    | `--primary`                   | `oklch(0.225 0.038 158)`               | —                                                                                                                                              |
| `--destructive`          | `--color-brand-accent`        | `oklch(0.58 0.12 17)` (≈ `#C14953`)    | **Primary form CTA + true destructive actions.** This is the Libolink-specific overload — see §3.3.                                            |
| `--border`               | neutral 200                   | `oklch(0.922 0 0)`                     | Card/divider strokes.                                                                                                                          |
| `--input`                | `--primary` at 50%            | n/a (alpha modifier)                   | Input border. The auth input also uses this as its border source — see `shared/components/ui/input.tsx` line 13.                               |
| `--ring`                 | `--primary` at 30%            | n/a (alpha modifier)                   | Focus ring on inputs.                                                                                                                          |
| `--chart-1..5`           | stock shadcn                  | unchanged                              | Defined but **not yet used** — keep stock until charts ship.                                                                                   |
| `--sidebar-*`            | stock shadcn                  | unchanged                              | Defined but **not yet used** — Libolink's sidebar is custom (see `image_2026-05-27_00-33-06.png`). Document when a sidebar primitive is built. |

**Target mapping (dark) — recommendation, dark mode not yet implemented (your requirement: design now, implement later).** Suggested values:

| Token                  | Light              | Dark (proposed)         | Reason                                                       |
| ---------------------- | ------------------ | ----------------------- | ------------------------------------------------------------ |
| `--background`         | `oklch(1 0 0)`     | `oklch(0.16 0.012 158)` | Deep desaturated green-black — keeps brand temperature.      |
| `--foreground`         | `oklch(0.145 0 0)` | `oklch(0.96 0.005 158)` | Off-white with a green tint.                                 |
| `--card`               | white              | `oklch(0.22 0.012 158)` | One step lighter than background.                            |
| `--primary`            | `#023618`          | `oklch(0.55 0.07 158)`  | A green light enough to satisfy WCAG AA on the dark BG.      |
| `--primary-foreground` | white              | `oklch(0.12 0 0)`       | Dark text on the lifted green.                               |
| `--secondary`          | `#E8EBF4`          | `oklch(0.27 0.012 158)` | Tinted dark surface, mirror of light's tinted light surface. |
| `--muted-foreground`   | `#6B7280`          | `oklch(0.7 0.013 264)`  | Lifted gray for placeholders.                                |
| `--destructive`        | `#C14953`          | `oklch(0.65 0.16 17)`   | Slightly lighter crimson for AA on dark BG.                  |
| `--border`             | `oklch(0.922 0 0)` | `oklch(1 0 0 / 12%)`    | Translucent white, matches new-york dark convention.         |
| `--input`              | brand-primary/50   | `oklch(1 0 0 / 18%)`    | —                                                            |

Document the proposed dark values here so Claude Code can implement them as a single `app/globals.css` edit when you're ready.

### 3.3 Usage rules

- **`primary` vs `destructive`.** Counter to convention, Libolink's primary _form CTA_ (the big button at the end of a form — Sign in, Send verification, Sign up) uses `variant="destructive"` (which maps to `--color-brand-accent`/crimson). `variant="default"` (green) is used for **navigation-style CTAs** — header Sign in, "Get Start" on the landing hero, the auth-tab pill, the Post button in the composer. See `features/auth/containers/sign-in-form.tsx` line 134 (form CTA, destructive) vs `features/landing/components/hero.tsx` line 23 (landing CTA, default). When in doubt: _am I asking the user to commit the form on this screen?_ → `destructive`. _Am I asking them to navigate, post, or open something?_ → `default`.
- **`foreground` vs `muted-foreground`.** Default copy is `text-foreground`. Use `text-muted-foreground` for: input placeholders, secondary metadata ("1 hour ago", "@anna"), helper text, "Or" dividers. Do not put body content in `muted-foreground` — at the proposed light value (`oklch(0.55 0.013 264)` ≈ `#6B7280`) it sits below AA on white for body sizes.
- **`accent` vs `primary`.** `primary` is a fill (green button, profile-card BG). `accent` is a _background hover state_ — e.g. the hover background of a list row or menu item. They are not interchangeable.
- **`border` vs `input`.** `border` is for card/divider strokes (stable, low-contrast). `input` is the form-control border, intentionally tinted toward `--primary` so inputs read as branded. The auth input variant currently builds this manually as `border-brand-primary/50` (`shared/components/ui/input.tsx` line 13) — that should be replaced with `border-input` once the semantic mapping is wired.
- **No raw colors.** Components write `bg-card`, `text-foreground`, `bg-primary`, `text-destructive` — never `bg-white`, `text-zinc-900`, no arbitrary hex. **Exception**: primitive-tier _brand_ tokens (`bg-brand-soft`, `bg-brand-glow`) are allowed for explicitly decorative surfaces (AI assistant gradient, post-button glow shadow). Anything else is a violation.
- **The pink/purple AI assistant gradient is special-cased**, not a general accent. It exists on exactly one surface (`image_2026-05-27_00-33-06.png`, right-rail AI Assistant panel). Do not extend it to other surfaces without explicit design review.

---

## 4. Typography

### 4.1 Font families

Defined in `app/globals.css` lines 18–19:

```css
--font-sans: var(--font-geist-sans);
--font-mono: var(--font-geist-mono);
```

The CSS variables `--font-geist-sans` / `--font-geist-mono` are **declared but not currently set** anywhere in `app/layout.tsx` (`app/layout.tsx` lines 18–24) — see §10. The Figma frames are rendered in a humanist sans that looks like Geist Sans / Inter. Recommend loading Geist via `next/font` in `app/layout.tsx` and binding to `--font-geist-sans`.

There is **one font family in use today** (the default browser sans). Keep it to one family; mono is reserved for future code/UID surfaces.

### 4.2 Type scale in use

Sampled from the codebase. All values are Tailwind utilities — no arbitrary `text-[Npx]` unless noted.

| Role                               | Class                                               | Computed (16px base)            | Cited at                                            |
| ---------------------------------- | --------------------------------------------------- | ------------------------------- | --------------------------------------------------- |
| Display / hero title               | `text-4xl sm:text-5xl md:text-6xl font-bold`        | 36 / 48 / 60 px                 | `features/landing/components/hero.tsx` line 14      |
| Page / auth title                  | `text-3xl font-bold`                                | 30 px                           | `app/(auth)/layout.tsx` line 56                     |
| Form heading (forgot pw)           | `text-3xl font-bold` (proposed)                     | 30 px                           | _Figma only — not yet in code_                      |
| Body                               | `text-base md:text-lg`                              | 16 / 18 px                      | `features/landing/components/hero.tsx` line 17      |
| Auth subtitle / helper             | `text-sm leading-relaxed`                           | 14 px                           | `app/(auth)/layout.tsx` line 62                     |
| Form label                         | `text-sm font-medium`                               | 14 px                           | `shared/components/ui/form-field.tsx` line 7        |
| Form field error / caption         | `text-xs`                                           | 12 px                           | `shared/components/ui/form-field.tsx` line 12       |
| Inline link (e.g. Forgot password) | `text-xs font-semibold`                             | 12 px                           | `features/auth/containers/sign-in-form.tsx` line 96 |
| Button label (default)             | `text-[13px] font-medium`                           | 13 px (**arbitrary — see §10**) | `shared/components/ui/button.tsx` line 9            |
| Button label (destructive)         | `text-[20px] font-bold`                             | 20 px (**arbitrary — see §10**) | `shared/components/ui/button.tsx` line 18           |
| Button label (post)                | `text-[11px]`                                       | 11 px (**arbitrary — see §10**) | `shared/components/ui/button.tsx` line 26           |
| Input                              | `text-sm` (auth) / `text-base md:text-sm` (default) | 14 / 16→14 px                   | `shared/components/ui/input.tsx` lines 12–13        |

### 4.3 Heading hierarchy

- `h1` → `text-3xl font-bold text-primary` for auth/page titles; `text-4xl sm:text-5xl md:text-6xl font-bold text-primary` for landing hero.
- `h2` (not yet in code) → `text-2xl font-semibold text-foreground` recommended.
- `h3` (not yet in code) → `text-lg font-semibold text-foreground` recommended.

Color note: headings on the auth screens use `text-brand-primary` (forest green) for emphasis. Once §3.2 is wired, that becomes `text-primary`.

### 4.4 Body / label / caption conventions

- **Body** — `text-base` / `text-sm` on `text-foreground` for content; `text-muted-foreground` for secondary metadata.
- **Form label** — always rendered by `<FormField>` from `shared/components/ui/form-field.tsx`. Class is `text-sm font-medium` — do not override per-field.
- **Caption / helper / timestamp** — `text-xs text-muted-foreground`.
- **Field error** — `text-xs text-destructive` (currently hardcoded as `text-brand-accent` in `form-field.tsx` line 12 — see §10).

### 4.5 i18n reminder

Every visible string is a key in `messages/en.json`, surfaced via `getDictionary("Namespace")`. Components and containers **never** call `getDictionary` directly — the Server Component page does, and passes strings as props. See `app/(auth)/login/page.tsx` for the canonical pattern. Full rules in `ARCHITECTURE.md` §i18n and `CLAUDE.md` §Internationalization. If you find a hardcoded string in a component, treat it as a bug.

---

## 5. Spacing & sizing

### 5.1 Scale

Tailwind v4's default dynamic scale (`--spacing: 0.25rem` = 4 px per unit) — **no overrides** in `app/globals.css`. Any positive number works as a utility: `h-13` = 52 px, `w-26` = 104 px, `max-w-120` = 480 px, `h-22.75` = 91 px (used in `features/landing/components/header.tsx` line 11 — fractional units are allowed by v4).

**Hard rule (CLAUDE.md §Tailwind Scale Rule):** use built-in scale only. Write `max-w-120`, never `max-w-[480px]`. Arbitrary `[...]` values only when no built-in equivalent exists — and even then, prefer adjusting the design to the scale. The button file currently violates this (`text-[13px]`, `pb-[2px]`, `rounded-[9.75px]`, `rounded-[12px]`, `text-[20px]`, `text-[11px]`, `h-[42px]`, `h-[52px]`, `h-[19px]`, `px-[10px]`) — see §10 for the fix list.

### 5.2 Composition patterns observed

- **Auth form max-width.** `max-w-sm` (= 384 px) — `app/(auth)/layout.tsx` line 48. This is the canonical narrow-form width.
- **Hero subtitle width.** `max-w-120` (= 480 px) — `features/landing/components/hero.tsx` line 16.
- **Hero image width.** `max-w-6xl` (= 1152 px) — `features/landing/components/hero.tsx` line 28.
- **Form field stack gap.** `gap-4` between fields inside `<form>` — `features/auth/containers/sign-in-form.tsx` line 82.
- **Form field internal stack.** `gap-1.5` between label, input, and error row — `shared/components/ui/form-field.tsx` line 5.
- **Form field error row reserved height.** `h-4` (= 16 px) — `shared/components/ui/form-field.tsx` line 10. This is what keeps the form from jumping when an error appears. Preserve it.
- **Auth screen top padding above tabs.** `pt-8` — `app/(auth)/layout.tsx` line 46.
- **Auth title → subtitle gap.** `mb-3` — `app/(auth)/layout.tsx` line 56.
- **Auth subtitle → first field gap.** `mb-8` — `app/(auth)/layout.tsx` line 61.
- **Header height.** `h-22.75` (= 91 px) — `features/landing/components/header.tsx` line 11. The hero section reserves height accordingly: `md:h-[calc(100vh-91px)]` (line 11 of `hero.tsx`) — **this is the one place where an arbitrary value is unavoidable** (`calc()` against a non-scale number); the scale value `h-22.75` and the calc literal `91px` must stay in sync.
- **Header horizontal padding.** `px-4 sm:px-8` — `features/landing/components/header.tsx` line 11.
- **Auth right-panel padding.** `px-8 py-6` — `app/(auth)/layout.tsx` line 30.
- **Social-auth button gap (inside form).** `gap-3` — `features/auth/containers/sign-in-form.tsx` line 150.

### 5.3 Container widths

| Container                      | Width                 | Cited at                                       |
| ------------------------------ | --------------------- | ---------------------------------------------- |
| Narrow form (auth)             | `max-w-sm` (384 px)   | `app/(auth)/layout.tsx` line 48                |
| Reading column (hero subtitle) | `max-w-120` (480 px)  | `features/landing/components/hero.tsx` line 16 |
| Hero heading                   | `max-w-3xl` (768 px)  | `features/landing/components/hero.tsx` line 14 |
| Hero image                     | `max-w-6xl` (1152 px) | `features/landing/components/hero.tsx` line 28 |

Pick from these four widths when introducing a new section. Don't invent new max-widths unless the design clearly demands it.

---

## 6. Radius, shadows, borders

### 6.1 Radius scale

From `app/globals.css` lines 50–56:

```css
--radius: 0.625rem; /* 10 px — base */
--radius-sm: calc(var(--radius) - 4px); /*  6 px */
--radius-md: calc(var(--radius) - 2px); /*  8 px */
--radius-lg: var(--radius); /* 10 px */
--radius-xl: calc(var(--radius) + 4px); /* 14 px */
--radius-2xl: calc(var(--radius) + 8px); /* 18 px */
--radius-3xl: calc(var(--radius) + 12px); /* 22 px */
--radius-4xl: calc(var(--radius) + 16px); /* 26 px */
```

**Usage from the frames:**

- **Cards** (post, AI assistant) — `rounded-2xl` (18 px).
- **Buttons (default / outline / ghost)** — `rounded-lg` (10 px). Currently `rounded-[9.75px]` in `button.tsx` line 9 — see §10.
- **Button (destructive form CTA)** — `rounded-xl` (14 px). Currently `rounded-[12px]` in `button.tsx` line 18 — between md (8) and xl (14); recommend `rounded-xl` (closer to the 12 px Figma value than md=8, and on-scale).
- **Inputs (auth)** — `rounded-full` (pill).
- **Inputs (default shadcn)** — `rounded-md` (8 px) — `shared/components/ui/input.tsx` line 12.
- **Profile card / sidebar nav active pill** — `rounded-2xl` (18 px) by visual eyeball.
- **Story avatar** — pill-shaped (capsule, `rounded-full` on a tall box).

### 6.2 Shadows

Only one custom shadow is defined, on `button.tsx` line 21 (post variant):

```css
shadow-[0px_4px_6px_-1px_var(--color-brand-glow),0px_2px_4px_-2px_var(--color-brand-glow)]
```

This is the _lavender glow_ under the green Post button — a brand-tinted shadow, not a neutral drop shadow. There are **no other shadows** in the system yet. Recommendation:

| Token (proposed)               | Use                                                                                                 |
| ------------------------------ | --------------------------------------------------------------------------------------------------- |
| `shadow-sm` (Tailwind default) | Card resting state — _if_ you decide cards need a shadow. The Figma cards are currently shadowless. |
| `shadow-md`                    | Floating menus / popovers (not yet in design).                                                      |
| Custom `shadow-glow-*`         | Reserved for the brand-tinted post-button treatment. Do not generalise.                             |

### 6.3 Borders

- **Default border** — `border` + `border-border` (1 px solid, `oklch(0.922 0 0)`). Use for card edges and dividers.
- **Input border** — `border-input` (after §3.2 remap; currently `border-brand-primary/50` for the auth variant). The auth input is intentionally tinted toward brand so the form field reads as branded.
- **Divider line** (e.g. "Or" separator) — `h-px flex-1 bg-border` inside a flex row. Pattern at `features/auth/containers/sign-in-form.tsx` line 144.

---

## 7. `shared/components/ui/` inventory

Per `CLAUDE.md` §shadcn/ui Notes: these files are intentionally edited; this is the catalogue of deviations from stock new-york.

### 7.1 `button.tsx`

**Purpose** — All button surfaces in the app: header CTAs, form submit, social auth, post composer, tab switcher.

**Semantic tokens it consumes** (target state) — `primary`, `primary-foreground`, `secondary`, `secondary-foreground`, `destructive`, `destructive-foreground`, `ring`, `background`.

**Current state** — reaches for brand primitives directly (`bg-brand-primary/91`, `bg-brand-surface`, `bg-brand-accent`, `text-brand-primary`, `text-brand-soft`). See §10.

**cva variants present:**

| Variant       | Visual                                                                | Used for                                                      |
| ------------- | --------------------------------------------------------------------- | ------------------------------------------------------------- |
| `default`     | Forest green fill, white text, 13 px label                            | Header Sign in, landing Get Start, auth tabs active, nav CTA  |
| `outline`     | Light-blue surface fill (`--color-brand-surface`), brand-primary text | Landing Read More, social-auth (Google/Facebook) buttons      |
| `ghost`       | Transparent BG, brand-primary text, surface fill on hover             | Header Sign up, auth-tab inactive                             |
| `destructive` | Crimson fill, white text, **20 px bold label**, 14 px radius          | **Primary form CTA** — Sign in, Sign up, Send verification    |
| `post`        | Brand-primary fill, brand-soft text, lavender brand-glow shadow       | Post composer submit button, sized differently (small/inline) |

| Size      | Height              | Padding                    |
| --------- | ------------------- | -------------------------- |
| `default` | 42 px               | `px-6`                     |
| `sm`      | 32 px (`h-8`)       | `px-3`, `text-xs`          |
| `lg`      | 52 px (`h-[52px]`)  | `px-8`                     |
| `icon`    | 36 × 36 (`h-9 w-9`) | —                          |
| `post`    | 19 px (`h-[19px]`)  | `px-[10px]`, `text-[11px]` |

Compound variant: `variant=destructive` + `size=default` → `h-13` (52 px), overriding the default 42 px. This is why the auth Sign-in button is taller than the header Sign-in button.

**Deviations from stock new-york** (every line is intentional):

- The `destructive` variant has been **repurposed**. In stock shadcn, `destructive` is for delete-style red actions and uses default sizing/weight. Here it carries the primary form-submit role with its own taller height (52 px), larger text (20 px), heavier weight (bold), and larger radius (12 px). This is the system's biggest divergence.
- New `post` variant added — bespoke small inline button used in the feed composer.
- `text-[13px]` body — stock shadcn buttons are `text-sm` (14 px); Libolink runs 1 px tighter.
- `pb-[2px]` (`pb-[4px]` for destructive) — optical baseline correction, not stock.
- `rounded-[9.75px]` — should be `rounded-lg`; the half-pixel is Figma export noise, not a meaningful value. See §10.
- `active:scale-[0.98]` — added micro-press animation.
- `cursor-pointer` — added explicitly (stock shadcn relies on the `<button>` default).

### 7.2 `input.tsx`

**Purpose** — All text/email/password inputs.

**Semantic tokens it consumes** — `input`, `ring`, `muted-foreground`, `border` (target state). Currently mixes `border-input` (default variant) and `bg-brand-surface` / `border-brand-primary/50` (auth variant).

**cva variants:**

| Variant   | Visual                                                                                              | Used for                                                                              |
| --------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `default` | 36 px tall, `rounded-md`, transparent BG, neutral border, shadow-sm                                 | Stock shadcn input — not currently used by any Libolink feature, kept as the fallback |
| `auth`    | 52 px tall (`h-13`), `rounded-full` (pill), `bg-brand-surface`, brand-primary/50 border, 14 px text | All auth forms (`sign-in-form.tsx`, `sign-up-form.tsx`)                               |

**Deviations from stock new-york:**

- New `auth` variant added — entirely Libolink-specific. Pill-shape, tinted fill, brand-tinted border, brand-tinted focus ring (`focus-visible:ring-brand-primary/30`).
- `default` variant kept as-is for any future internal/utility input usage.

### 7.3 `form-field.tsx`

**Purpose** — Wrapper that pairs a label, input, and reserved error row. Used as the building block of every form field. **Not a stock shadcn primitive** — this is Libolink's own composition of the underlying shadcn `<Label>` pattern.

**Semantic tokens it consumes** — `foreground` (label), `destructive` (error). Currently uses `text-brand-accent` for error — see §10.

**Props** — from `shared/types/ui.ts`:

```ts
interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  action?: ReactNode; // e.g. "Forgot Password?" link, right-aligned on the error row
  children: ReactNode; // the <Input> goes here
}
```

**Deviations from stock new-york:**

- Stock shadcn ships `<Form>`, `<FormField>`, `<FormItem>`, `<FormLabel>`, `<FormControl>`, `<FormMessage>` as a tightly coupled set requiring RHF context. Libolink **does not use that** — it ships its own `<FormField>` that takes plain props. This is a deliberate simplification: errors and labels are passed in, RHF is wired by the caller (see `sign-in-form.tsx` line 87 for the pattern).
- The reserved `h-4` error row is Libolink-specific — it prevents layout shift when an error appears.
- The `action` prop slot (used for "Forgot Password?") is Libolink-specific.

### 7.4 What is _not_ installed yet

Stock shadcn primitives that are referenced by the design but not yet present in `shared/components/ui/`:

- `Label` — `<FormField>` currently uses a raw `<label>` element. Install when you need a standalone label outside `<FormField>`.
- `Form` (the RHF-bound set) — intentionally skipped, see §7.3.
- `Card` — Figma feed shows clear card surfaces; install when building feed UI.
- `Avatar` — needed for profile card, story bubbles, post author.
- `Tabs` — needed for Recent/Popular/Following.
- `Dropdown`, `Dialog`, `Sheet`, `Popover` — not yet needed; install as required.

Per `CLAUDE.md` §Code Style Rules: install with `pnpm dlx shadcn@latest add <name>`. Never hand-copy.

---

## 8. UI composition patterns (visual layer only)

This section is the _how_ of building UI on top of the primitives above. Architecture rules (import direction, barrel exports, module boundaries) live in `ARCHITECTURE.md`; this section only governs what the visual code looks like.

### 8.1 Container vs component — visually

Per `ARCHITECTURE.md` §Page → Container → Component, containers wire state and components render. From the _design system's_ perspective, **only components contain styling**. Containers are class-free `"use client"` files that orchestrate hooks and pass data down. _In Libolink's current code_ (`features/auth/containers/sign-in-form.tsx`), the form is a container that also renders markup — that's a layering note for `ARCHITECTURE.md`, not for this doc. From the visual side: wherever the JSX lives, the rules in §3–§7 apply unchanged.

### 8.2 `cn()` usage

From `shared/utils/cn.ts`:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Use `cn()` for every conditional or merged className. Example from `button.tsx` line 51:

```tsx
<Comp
  className={cn(buttonVariants({ variant, size, className }))}
  ref={ref}
  {...props}
/>
```

The `twMerge` step is what lets a consumer override `className` from outside without producing duplicate conflicting Tailwind classes — that's why every primitive in `shared/components/ui/` must end with `cn(... className)`.

### 8.3 `cva` variants

Introduce `cva` when a component has **two or more visual states** that are not just sizing tweaks (size alone is a cva _size_ variant, not a separate `cva` definition). One source-of-truth file per variant set, exported alongside the component:

```ts
const buttonVariants = cva(
  "<base classes>",
  {
    variants: { variant: { default: "...", outline: "..." }, size: { ... } },
    compoundVariants: [ ... ],
    defaultVariants: { variant: "default", size: "default" },
  }
);

export const Button = forwardRef<...>(({ variant, size, className, ...props }, ref) => (
  <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
));
export { Button, buttonVariants };
```

Pattern is taken verbatim from `shared/components/ui/button.tsx`. Always export `*Variants` alongside the component so containers can compose them (e.g. `cn(buttonVariants({ variant: "outline" }), "...")` on a non-`<button>` element).

### 8.4 Form composition

The visual pattern, derived from `features/auth/containers/sign-in-form.tsx`:

1. `<form noValidate className="flex flex-col gap-4">` — vertical stack, `gap-4` between fields.
2. Each field is a `<FormField label htmlFor error action?>` wrapping an `<Input variant="auth">`.
3. The label is left-aligned (`text-sm font-medium`); the input sits below with `gap-1.5`; an `h-4` reserved row holds the error (and optional right-aligned `action`).
4. The submit `<Button variant="destructive" className="w-full mt-2">` is the **only** destructive-styled button on the screen — never two.
5. Social/alt actions live below a divider row (`h-px flex-1 bg-border` + centered "Or" label) and use `variant="outline"` with a leading icon.

RHF wiring uses `valibotResolver` re-exported from `shared/validations/valibot-resolver.ts` (one-liner re-export of `@hookform/resolvers/valibot`). Schemas live in `features/<name>/validations/`. The visual layer cares only that errors arrive as strings on `formState.errors.<field>.message`.

### 8.5 Loading states

Per `ARCHITECTURE.md` §Feature Module Shape, every feature has a `loading/` folder. Visual rule:

- **Skeletons match the shape of what they replace.** If you're loading a 52 px pill input, the skeleton is a 52 px pill (`h-13 rounded-full bg-muted`). If you're loading a card, the skeleton is a card-shaped block with the same `rounded-2xl` radius.
- **No spinners as a layout substitute.** A spinner is acceptable _inside_ a button while submitting (Lucide `Loader2` with `animate-spin`, `size-4`) — never as the entire content of a route segment. Use `app/loading.tsx` + feature-level skeletons instead.
- Use `bg-muted` for skeleton fills (after §3.2 remap; currently approximate to `bg-brand-gray-light`). Animate with `animate-pulse` from `tailwindcss-animate`.

### 8.6 Error UI

Per `ARCHITECTURE.md`, every feature has an `error/` folder. Visual rule:

- Error text — `text-destructive`. Never `text-red-500`, never raw hex.
- The destructive token doubles as the primary form CTA color (§3.3). For _inline_ error messaging inside a form, use `text-destructive text-xs` — the `h-4` row in `<FormField>` handles this automatically.
- For _block_ error UI (`error.tsx` route segments, error boundaries), surround the message with a `border border-destructive/30 bg-destructive/5 rounded-xl p-4` container.

### 8.7 Icon usage

- **Library:** `lucide-react` only (`CLAUDE.md` §Code Style Rules). No inline SVG except for third-party brand marks (Google G, Facebook f — see `sign-in-form.tsx` lines 17–48; these are exceptions because Lucide doesn't ship brand marks).
- **Sizes:** `size-4` (16 px) for inline icons inside text or compact button labels; `size-5` (20 px) for primary actions and standalone icon buttons. The button base already includes `[&_svg]:size-4` (`button.tsx` line 9) — pass `<Icon />` without a size prop and it'll inherit; override per-instance only if needed.
- **Stroke:** Lucide default (2 px). Don't change unless the design explicitly calls for it.
- **Color:** inherits from `text-*` on the parent. Don't set `stroke=` or `color=` props on the SVG.

### 8.8 Animation

- **Library:** `tailwindcss-animate` (loaded via `@plugin "tailwindcss-animate"` in `globals.css` line 3).
- **Entry / exit:** use Radix-style data-state animations — `data-[state=open]:animate-in`, `data-[state=closed]:animate-out`, paired with `fade-in-0`, `slide-in-from-top-2`, etc. This is the convention every shadcn primitive ships with.
- **Micro-interactions:** `active:scale-[0.98]` on pressable surfaces (already on `<Button>`); `transition-colors duration-150` on hover-color changes (already on `<Button>` and `<Input>`).
- **Avoid:** custom keyframes, framer-motion, large staggered animations on first paint. Anything beyond `tailwindcss-animate` warrants a separate design conversation.

### 8.9 i18n composition (visual side)

The Server Component page calls `getDictionary("Namespace")` and passes strings as props to the container. Containers and components never call `getDictionary`. Canonical pattern in `app/(auth)/login/page.tsx`:

```tsx
const t = await getDictionary("Auth");
return (
  <SignInForm
    strings={{
      emailLabel: t("email"),
      // ...
    }}
  />
);
```

The strings shape is a per-feature type in `features/<name>/types/index.ts` (e.g. `SignInFormStrings` in `features/auth/types/index.ts`). When you add a string-bearing component, add the namespace to `messages/en.json` _first_, then add the typed strings interface, then write the JSX.

Full rules in `ARCHITECTURE.md` §i18n and `CLAUDE.md` §Internationalization.

---

## 9. Claude Code working agreement (UI scope)

Checklist for Claude Code when doing UI work. Each item links to where the full reasoning lives.

- [ ] **Semantic tokens only.** No `bg-white`, `text-zinc-900`, no arbitrary hex. Primitive `brand-*` tokens only for explicitly decorative surfaces (§3.3, this doc).
- [ ] **Built-in Tailwind scale only.** Arbitrary `[Npx]` values only when there is no built-in equivalent (`CLAUDE.md` §Tailwind Scale Rule).
- [ ] **`cn()` for conditional classes, `cva` for components with 2+ visual states.** Always export `*Variants` alongside the component (§8.2, §8.3, this doc).
- [ ] **`lucide-react` for icons.** No inline SVG except third-party brand marks (§8.7, this doc; `CLAUDE.md` §Code Style Rules).
- [ ] **Check `shared/components/ui/` before building a new primitive.** If it doesn't exist, install via `pnpm dlx shadcn@latest add <component>` and then customise (`CLAUDE.md` §shadcn/ui Notes).
- [ ] **All visible text via `getDictionary`.** Add the namespace to `messages/en.json` first, type the strings, then write JSX (`ARCHITECTURE.md` §i18n).
- [ ] **Default to Server Components.** `"use client"` only when state, effects, browser APIs, or event listeners require it (`CLAUDE.md` §RSC).
- [ ] **Types live in `features/<name>/types/` or `shared/types/`.** Never inside component files (`CLAUDE.md` §Code Style Rules).
- [ ] **Named exports for components** (`CLAUDE.md` §Code Style Rules).
- [ ] **Import features only via the barrel** `@/features/<name>` (`ARCHITECTURE.md` §Import Rules).
- [ ] **Components are pure props in / JSX out; containers own state** (`ARCHITECTURE.md` §Page → Container → Component Pattern).
- [ ] **Primary form CTA → `variant="destructive"`. Navigational/page CTA → `variant="default"`.** Counter-intuitive but intentional (§3.3, this doc).

---

## 10. Gaps & inconsistencies

File-cited, actionable. Each item is a follow-up ticket.

### 10.1 Semantic token layer is not wired to brand primitives

**Where:** `app/globals.css` lines 58–127.

**Problem:** `:root` and `.dark` use stock shadcn neutral grayscale for `--primary`, `--secondary`, `--destructive`, etc. As a result, every Libolink component bypasses semantic tokens and reaches for `bg-brand-*` utilities (`button.tsx`, `input.tsx`, `form-field.tsx`, `sign-in-form.tsx`, etc.). The "use semantic tokens only" rule is currently unenforceable because the semantic tokens don't carry the brand.

**Fix:** Edit `:root` (and add `.dark` values from §3.2) so `--primary: var(--color-brand-primary)`, `--destructive: var(--color-brand-accent)`, `--secondary: var(--color-brand-surface)`, `--muted-foreground: var(--color-brand-gray)`, etc. Then refactor `button.tsx`/`input.tsx`/`form-field.tsx` to consume `bg-primary`, `bg-destructive`, `border-input`, `text-destructive` instead of brand utilities. The brand utilities stay defined (decorative use only).

### 10.2 Arbitrary values in `button.tsx`

**Where:** `shared/components/ui/button.tsx` lines 9, 13, 17, 18, 21, 24, 25, 26.

| Current                     | Recommended                                           | Reason                                                                                                   |
| --------------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `text-[13px]`               | `text-sm` (14 px) **or** keep as documented exception | 1 px below Tailwind's `text-sm`. Probably Figma noise — confirm with the designer and snap to `text-sm`. |
| `pb-[2px]` / `pb-[4px]`     | Keep                                                  | Optical baseline correction; no scale equivalent. Document why.                                          |
| `rounded-[9.75px]`          | `rounded-lg` (10 px)                                  | Half-pixel is Figma export noise.                                                                        |
| `rounded-[12px]`            | `rounded-xl` (14 px)                                  | Closer than `rounded-md` (8 px). Confirm with designer; 12 px is technically off-scale.                  |
| `text-[20px]` (destructive) | `text-xl` (20 px)                                     | Identical value, scale class exists.                                                                     |
| `text-[11px]` (post)        | `text-xs` (12 px)                                     | Snap to scale unless 1 px matters here.                                                                  |
| `h-[42px]` (default size)   | `h-10` (40 px) or `h-[42px]` documented               | 2 px above `h-10`. Confirm.                                                                              |
| `h-[52px]` (lg size)        | `h-13` (52 px)                                        | Identical value, scale class exists.                                                                     |
| `h-[19px]` (post size)      | `h-5` (20 px) or `h-[19px]` documented                | 1 px below `h-5`. Confirm.                                                                               |
| `px-[10px]` (post size)     | `px-2.5` (10 px)                                      | Identical value, scale class exists.                                                                     |

### 10.3 Hardcoded `text-brand-accent` on error message

**Where:** `shared/components/ui/form-field.tsx` line 12.

**Problem:** Field error uses `text-brand-accent` (the primitive). Once §10.1 is done, this should be `text-destructive`.

**Fix:** `text-xs text-destructive`.

### 10.4 `text-brand-primary` on auth headings & subtitle color

**Where:** `app/(auth)/layout.tsx` lines 56, 62; `features/landing/components/hero.tsx` lines 14, 17.

**Problem:** Headings use `text-brand-primary` directly. After §10.1: `text-primary`. Subtitles use `text-brand-gray` → should be `text-muted-foreground`.

### 10.5 Tinted input border built manually

**Where:** `shared/components/ui/input.tsx` line 13.

**Problem:** `border-brand-primary/50` is hand-built. After §10.1, the `--input` semantic token can be set to `oklch(... / 50%)` of brand-primary at the root, and the utility becomes `border-input` everywhere.

### 10.6 `--font-geist-sans` and `--font-geist-mono` referenced but never set

**Where:** `app/globals.css` lines 18–19; `app/layout.tsx` (no `next/font` usage).

**Problem:** `--font-sans: var(--font-geist-sans)` resolves to nothing because no `next/font` call sets `--font-geist-sans`. The browser falls back to system sans.

**Fix:** In `app/layout.tsx`, add:

```ts
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

<html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
```

Then add `geist` to `package.json` dependencies (`CLAUDE.md` §Package Management — ask first).

### 10.7 Dark mode is scaffolded but not implemented

**Where:** `app/globals.css` `.dark` block (lines 96–127) uses stock shadcn dark grays. No theme toggle exists in the app.

**Status:** Intentional per your direction — "design now, implement later". The proposed brand-aware dark values are in §3.2. When implementing, also add a `useTheme` hook + theme atom in `shared/store/`, and a `<ThemeProvider>` in `shared/providers/`.

### 10.8 `--color-brand-navy` (`#1D3557`) is defined but unused

**Where:** `app/globals.css` line 11.

**Suggested role:** Inline links (`<a>` inside body copy), informational badges, or chart-3 stand-in. Pick one and document the choice when you first need it, rather than leaving it floating.

### 10.9 Container/component boundary is blurred in auth

**Where:** `features/auth/containers/sign-in-form.tsx`, `features/auth/containers/sign-up-form.tsx`.

**Problem:** Per `ARCHITECTURE.md` §Page → Container → Component, containers orchestrate state and _render components_. Today, `sign-in-form.tsx` is in `containers/` but contains all the JSX too — there is no `features/auth/components/sign-in-form.tsx`. This is an architecture concern, not a visual one, but it affects this doc's §8.1: the rule "only components contain styling" can't be applied if the component layer is missing.

**Fix:** Split: `features/auth/components/sign-in-form.tsx` (pure props in, JSX out) + `features/auth/containers/sign-in-container.tsx` (RHF + mutation + `"use client"`). Same for sign-up.

### 10.10 `auth-tabs.tsx` is in `containers/` but the barrel re-exports it as if it were a component

**Where:** `features/auth/index.ts` line 1; `features/auth/containers/auth-tabs.tsx`.

**Problem:** `AuthTabs` uses `usePathname()`, so it must be `"use client"` — fine. But it's purely presentational with no state; the _container_ designation is misleading. Either move it to `components/` (acceptable for thin client components) or accept that "container" in this codebase means "any `"use client"` boundary" and clarify the wording in `ARCHITECTURE.md`.

### 10.11 Inline brand SVGs in `sign-in-form.tsx`

**Where:** `features/auth/containers/sign-in-form.tsx` lines 17–48 (`GoogleIcon`, `FacebookIcon`).

**Status:** Justified — Lucide doesn't ship third-party brand marks. **But** they should be extracted to `shared/components/icons/google.tsx` and `shared/components/icons/facebook.tsx` and named-exported, not inlined inside a form file. Types declared inline in a component file also violate `CLAUDE.md` §Code Style Rules — though for icon function components without props, this is borderline.

### 10.12 `chart-*` and `sidebar-*` tokens defined but unused

**Where:** `app/globals.css` lines 76–94 (light), 117–127 (dark).

**Status:** Stock shadcn defaults. Leave in place; revisit and rebrand when charts/sidebar primitives are first introduced. Note here so it isn't forgotten.

### 10.13 `app-preview-side.png` decorative image has empty `alt`

**Where:** `app/(auth)/layout.tsx` line 23.

**Status:** Correct (`alt=""` marks decorative). Listed here only so a future audit doesn't flag it as a regression.

### 10.14 Forgot-password screen exists in Figma but not in code

**Where:** `image_2026-05-27_00-31-58.png` shows the Forgot Password screen; `features/auth/containers/sign-in-form.tsx` line 95 links to `/forgot-password`; no `app/(auth)/forgot-password/page.tsx` exists in the imported file tree.

**Status:** Known missing page. When building it, follow the same Page → Container → Component split (§10.9), reuse `<FormField>` + `<Input variant="auth">` + `<Button variant="destructive">`, and add a `ForgotPassword` namespace to `messages/en.json`.

---

_End of DESIGN_SYSTEM.md._
