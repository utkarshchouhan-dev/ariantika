---
title: Styles Architecture Handbook
tags: [frontend, sass, css, design-system, architecture, ariantika]
---

# Styles Architecture Handbook

> A complete engineering reference for the `src/assets/styles` design system and its relationship to every component, section and page stylesheet in the Ariantika codebase.

This document is written so it can be dropped straight into an Obsidian vault. Internal section links use `[[...]]`-free standard Markdown anchors so it also renders correctly on GitHub.

---

## 1. Folder Structure

```
src/assets/styles/
├── main.scss                     # Single entry point — imported once in the app root layout
├── _index.scss                   # Public "barrel" module re-exported to every component/page stylesheet
├── _functions.scss               # Global Sass functions: rem(), alpha()
├── _utilities.scss                # Global mixins: layout, a11y, motion helpers, decorative effects
├── noscript.css                  # Plain CSS fallback for JS-disabled visitors (NOT part of the Sass graph)
│
├── base/                          # ITCSS "Generic + Base" layer — unclassed HTML element styles
│   ├── _reset.scss                # Low-level browser reset (box model, buttons, lists, links, media)
│   ├── _document.scss             # `:root` token injection + `html`/`body` document defaults
│   └── _accessibility.scss        # Global focus-ring & screen-reader-only rules
│
├── mixins/
│   └── _motion.scss               # Scroll/entrance-reveal animation system (the "motion engine")
│
└── tokens/                        # Design tokens — the design system's single source of truth
    ├── _bundle.scss                # Forwards every token module as one import
    ├── _colors.scss                # Brand palette + `color-scale()` mixin that emits CSS variables
    ├── _typography.scss            # Font families, base size, type scale, font weights
    ├── _spacing.scss                # Spacing scale (`$space-*`)
    ├── _radius.scss                # Border-radius scale
    ├── _breakpoints.scss           # Breakpoint map + `up()`/`down()`/`between()` media mixins
    ├── _z-index.scss               # Named z-index scale
    ├── _motion.scss                # Durations, easings, distances for animation
    └── _layout.scss                # Structural constants (container width, etc.)
```

Everything **outside** `src/assets/styles` — every `*.scss` file that lives next to a component, section, or page — is a *consumer* of this system, not part of it. Those files are documented in [§12 Component Styles](#12-component-styles) and [§13 Page Styles](#13-page-styles).

---

## 2. Why Each File Exists

| File | Reason it exists as a separate file |
|---|---|
| `main.scss` | Needs to be the **only** file `import`-ed by JavaScript (in `layout.js`). Keeping it tiny and side-effect-only (resets, document defaults, a11y, the entry keyframes) means the bundler emits exactly one global stylesheet and nothing else leaks into the global scope by accident. |
| `_index.scss` | Components need tokens, functions and mixins but must **never** re-trigger the global resets (that would duplicate CSS on every component file). Splitting the "output-producing" base styles from the "API-only" barrel is what makes `@use "../../assets/styles" as *;` safe to repeat in 50+ files. |
| `_functions.scss` | Pure computation (`rem`, `alpha`) has no business living beside mixins, which *emit* declarations. Sass functions and mixins are different tools; separating them clarifies intent at the call site (`rem(24)` vs `@include flex-center`). |
| `_utilities.scss` | Houses every **reusable declaration-emitting mixin** that isn't a token and isn't a single-purpose "system" (motion has its own file because it's large and conceptually its own engine). |
| `noscript.css` | Must be read with Node's `fs` at build time and inlined into a `<style>` tag inside `<noscript>` (see `src/app/layout.js`). It is deliberately **plain CSS**, not Sass, because it is never processed by the bundler's CSS pipeline — it's injected as a raw string, so Sass features would never be compiled. |
| `base/_reset.scss` | Isolates "opinionated browser normalization" so it can be reasoned about, audited, or swapped independently of document-level defaults. |
| `base/_document.scss` | This is the **only** place `root-color-tokens` is invoked — i.e. the only place that ever writes color CSS variables onto `:root`. Keeping token *emission* separate from token *definition* (`tokens/_colors.scss`) means the palette can be redefined without hunting for where it's mounted. |
| `base/_accessibility.scss` | Focus rings and `.sr-only` are cross-cutting concerns that apply to *native* elements (`button`, `input`, `a`, …) globally — they don't belong to any one component, so they can't live in a component stylesheet. |
| `mixins/_motion.scss` | The scroll-reveal/entrance-animation system is large (250+ lines), highly parameterized, and reused by nearly every section on the site. It earns its own file for discoverability and to keep `_utilities.scss` from becoming a dumping ground. |
| `tokens/_bundle.scss` | Lets any file import "all tokens" with one `@use` instead of eight. This is what `_index.scss` and `_functions.scss` both rely on internally. |
| `tokens/_colors.scss` | Centralizes the brand palette and the algorithm (`color-mix` ladder) used to derive hover/active/soft/disabled states for **every** color, so a new brand color automatically gets a full interaction ladder for free. |
| `tokens/_typography.scss` | Type is a first-class token category (families, scale, weights) consumed by nearly every stylesheet in the project. |
| `tokens/_spacing.scss` | A constrained numeric scale prevents arbitrary magic-number padding/margin values from creeping into components. |
| `tokens/_radius.scss` | Same rationale as spacing — a small, named scale instead of ad-hoc `border-radius` values. |
| `tokens/_breakpoints.scss` | Centralizing breakpoint values *and* providing `up()/down()/between()` mixins means a breakpoint can be changed once and every media query in the codebase updates automatically. |
| `tokens/_z-index.scss` | Prevents the classic "z-index war" — stacking order is documented once, named semantically (`$z-header`, `$z-modal`, …), and every component references the name instead of an arbitrary number. |
| `tokens/_motion.scss` | Animation timing needs to be consistent across dozens of components; centralizing durations/eases/distances means a global "make everything feel snappier" change is a one-line edit. |
| `tokens/_layout.scss` | Structural constants that don't fit spacing/radius/breakpoints (currently just `$container-width`), reserved as its own namespace so it can grow (see the commented-out modal-size constants already staged there). |

---

## 3. Sass Architecture & Philosophy

### 3.1 Two entry points, one direction of dependency

There are exactly **two** ways any file in the project reaches the styles folder:

1. **`main.scss`** — imported exactly once, by `src/app/layout.js`. This is the only file allowed to *produce* global, unscoped CSS (resets, `:root` tokens, `html`/`body` defaults).
2. **`_index.scss`** (the folder's implicit default module) — imported by every component/section/page stylesheet via:

    ```scss
    @use "../../assets/styles" as *;
    ```

   This barrel is **side-effect-free**: it only forwards variables, functions, and mixins. It never emits a single rule of CSS on its own. That's what makes it safe to `@use` from 50+ files without generating duplicate output — `@use` (unlike the legacy `@import`) only evaluates a module once per compilation, and a module with no top-level selectors has nothing to duplicate anyway.

This is a deliberate split: **base/global styles vs. reusable design-system API** are two different concerns, so they get two different doors. `main.scss` is the "house"; `_index.scss` is the "toolbox" every room in the house borrows from.

### 3.2 Modern Sass module system (`@use`/`@forward`), not `@import`

Every file uses `@use` and `@forward` — the legacy global-namespace `@import` rule never appears. This gives:

- **Explicit dependencies**: reading the top of any file tells you exactly what it needs (`@use "../../assets/styles" as *;`, `@use "sass:map";`, etc.).
- **No global namespace pollution**: two files can define a `$primary` variable without collision because each module's members are scoped.
- **Forwarding chains as intentional APIs**: `tokens/_bundle.scss` and `_index.scss` are pure `@forward` chains — they are the *only* files whose entire job is to build a public surface out of otherwise-private modules.

### 3.3 ITCSS-inspired layering

The cascade is organized from generic → specific, borrowing from [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/):

1. **Tokens** (`tokens/`) — pure values, zero CSS output.
2. **Functions** (`_functions.scss`) — pure computation over tokens.
3. **Base** (`base/`) — reset → document → accessibility, in that exact `@use` order in `main.scss`, so later layers can safely override earlier ones.
4. **Utilities** (`_utilities.scss`, `mixins/_motion.scss`) — reusable mixins components opt into.
5. **Components** (`src/components/**/*.scss`) — scoped, single-responsibility UI pieces.
6. **Sections** (`src/sections/**/*.scss`) — page-section compositions built from components.
7. **Pages** (`src/app/**/page.scss`) — page-level shells and one-off layout glue.

Specificity and "blast radius" increase monotonically down this list — a change to `tokens/_colors.scss` can affect the whole site, while a change to `Hero.scss` can only ever affect the hero section.

### 3.4 Design tokens as CSS custom properties, structural values as Sass variables

The system deliberately uses **two different token mechanisms** depending on whether a value needs to change at runtime:

- **CSS custom properties (`var(--x)`)** for anything that is *themeable* or *stateful*: colors (`--primary`, `--surface`), and component-local state hooks (`--button-bg`, `--reveal-delay`). These are written onto `:root` once (`root-color-tokens` in `base/_document.scss`) or onto a component root (button color variants, motion reveal delays) so they can be overridden per-instance via inline styles, per-state via classes, or in the future via a `[data-theme]` attribute — without any Sass recompilation.
- **Sass variables (`$x`)** for anything that is *structural and compile-time*: spacing, radius, breakpoints, z-index, font sizes/weights, motion durations. These never need to vary at runtime, so baking them in at build time is cheaper and gives compile-time errors for typos (an unknown `$space-99` fails the build; an unknown `--space-99` silently does nothing).

This hybrid is the core philosophy of the whole system: **"tokens that describe interactive/visual identity are CSS variables; tokens that describe layout math are Sass variables."**

### 3.5 BEM-flavored naming, implemented with Sass nesting

Every component stylesheet follows the same shape:

```scss
.block {
  // block styles

  &__element {
    // element styles
  }

  &--modifier {
    // modifier styles
  }
}
```

Sass's `&` interpolation (`&__element`, `&--modifier`) keeps this compact while still compiling to flat BEM class names (`.button__icon`, `.button--variant-primary`) — no nested-selector specificity problems, no runaway specificity, and a predictable, greppable class-naming scheme (see [§14 Naming Conventions](#14-naming-conventions)).

### 3.6 Composition over inheritance

There is no `@extend` anywhere in the codebase. Shared behavior is composed with mixins (`@include flex-center`, `@include reveal(...)`) instead of Sass placeholder inheritance. This is intentional: `@extend` moves selectors around in ways that are hard to predict once a codebase has 50+ stylesheets, while mixins are copy-in and local to the call site — easier to reason about, easier to tree-shake mentally, and they support argument-based configuration (`@include reveal($direction: left, $variant: spring)`) that `@extend` cannot express.

---

## 4. File Dependency Graph

```
tokens/_colors.scss ─┐
tokens/_typography   │
tokens/_spacing      │
tokens/_radius       ├──▶ tokens/_bundle.scss ──▶ _index.scss ──▶ every component/section/page *.scss
tokens/_breakpoints  │                        └─▶ base/_document.scss
tokens/_z-index      │                        └─▶ base/_accessibility.scss (via utilities)
tokens/_motion       │                        └─▶ mixins/_motion.scss
tokens/_layout      ─┘

_functions.scss ──(uses tokens/_typography)──▶ _index.scss, _utilities.scss, base/_document.scss

_utilities.scss ──(uses tokens/_bundle + _functions)──▶ _index.scss, base/_accessibility.scss

mixins/_motion.scss ──(uses tokens/_bundle + tokens/_breakpoints)──▶ _index.scss, main.scss

base/_reset.scss ────────────────────────────────────────────────▶ main.scss (only)
base/_document.scss ─(uses tokens/_bundle + _functions)──────────▶ main.scss (only)
base/_accessibility.scss ─(uses tokens/_bundle + _utilities)─────▶ main.scss (only)

main.scss ──▶ imported once by src/app/layout.js
_index.scss ──▶ imported by every *.scss under src/components, src/sections, src/app
```

Key rule embedded in this graph: **`base/*` is a dead end.** Nothing forwards `base/*` through `_index.scss`, so component stylesheets can never accidentally re-trigger the reset or re-inject `:root` tokens — they only ever get the *API* (tokens, functions, mixins), never the *output* (actual reset/document CSS rules). This one-way graph is what guarantees the reset and root tokens exist exactly once in the final stylesheet.

---

## 5. Design Tokens Reference

### 5.1 Colors — `tokens/_colors.scss`

Eleven brand "source" colors are defined as Sass constants and then expanded into a full interaction ladder via the `color-scale()` mixin, which is invoked once for each color inside `root-color-tokens` (mounted onto `:root` in `base/_document.scss`):

| Source variable | Hex | Role |
|---|---|---|
| `$src-primary` | `#1563a7` | Navy — primary brand color |
| `$src-secondary` | `#1ba79b` | Teal |
| `$src-accent` | `#f59e0b` | Amber |
| `$src-tertiary` | `#a5f9b3` | Lime |
| `$src-tertiary-light` | `#e7fbce` | Lime-light |
| `$src-quaternary` | `#66deef` | Sky |
| `$src-info` | `#0284c7` | Cyan-blue |
| `$src-success` | `#16a34a` | Emerald |
| `$src-warning` | `#d97706` | Burnt amber |
| `$src-danger` | `#dc2626` | Red |
| `$src-neutral` | `#334155` | Slate |

`color-scale($name, $source, $on: #fff)` emits **10 CSS variables per color** using `color-mix(in oklab, ...)` for perceptually-even shade steps:

```
--{name}              base color
--{name}-hover         92% source / black
--{name}-active        86% source / black
--{name}-pressed       82% source / black
--{name}-disabled      35% source / white
--{name}-border        55% source / white
--{name}-border-strong 75% source / white
--{name}-soft          10% source / white
--{name}-softer         8% source / white
--{name}-focus-ring    45% source / transparent (color-mix in srgb)
--{name}-on            foreground/on-color (default white)
```

This means every one of the 11 palette colors automatically gets a consistent hover/active/pressed/disabled/border/soft/focus-ring state **for free** — a new brand color only needs one `@include color-scale(...)` line to be fully themeable across the whole site.

Additional non-scaled tokens on `:root`:

- **Surfaces:** `--background`, `--surface`, `--surface-muted`, `--surface-dark`, `--surface-dark-muted`, `--surface-dark-softer`, `--image-bg`
- **Text:** `--text`, `--text-light`, `--text-muted`, `--text-inverse`
- **Misc:** `--border`, `--ring` (aliased to `--primary-focus-ring`)

The `alpha($color, $percent)` function (see [§6](#6-functions--utility-mixins)) is the companion tool for one-off transparency needs that don't warrant a dedicated variable.

### 5.2 Typography — `tokens/_typography.scss`

**Font families** (all wired to CSS variables produced by `next/font` in `layout.js`, with system-font fallbacks):

| Sass variable | Stack | Used for |
|---|---|---|
| `$font-primary` | `var(--font-sans)`, ui-sans-serif, system-ui, sans-serif | Body copy (Inter) |
| `$font-display` | `var(--font-sour-gummy))`, "Sour Gummy", ui-sans-serif, sans-serif | Headings/display type |
| `$font-brush` | `var(--font-caveat-brush)`, "Caveat Brush", cursive | Handwritten accents (eyebrows, highlights) |
| `$font-arabic` | `var(--font-arabic)`, "Amiri", serif | Arabic script (Qur'an verse component) |

**Base size:** `$base-font-size: 16px` — the divisor used by the `rem()` function.

**Type scale** (`$font-size-*`, a subset of an 8px-derived scale, with several sizes deliberately commented out to keep the scale lean and intentional — e.g. `40`, `56`, `64`, `96` are reserved but unused):

```
8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 72   (px, expressed as rem)
```

**Weights:** `$fw-regular` (400), `$fw-medium` (500, the html-wide default), `$fw-semibold` (600), `$fw-bold` (700).

### 5.3 Spacing — `tokens/_spacing.scss`

A 4px-rooted scale: `$space-4, 8, 10, 12, 14, 16, 18, 20, 24, 32, 40, 48, 64, 72, 96` (values in `rem`). Almost every spacing value in the codebase is expressed as `clamp($space-a, Nvw, $space-b)` rather than a fixed value — see [§5.9 Layout](#59-layout--container).

### 5.4 Radius — `tokens/_radius.scss`

Five-step scale: `$radius-sm` (0.25rem) → `$radius-md` (0.5rem) → `$radius-lg` (1rem) → `$radius-xl` (2rem) → `$radius-2xl` (4rem). `$radius-xl` is the de-facto "pill/button" radius; `$radius-2xl` is used for large glassy surfaces (e.g. the floating header).

### 5.5 Breakpoints — `tokens/_breakpoints.scss`

```scss
$breakpoints: (
  sm: 450px,
  md: 768px,
  lg: 1024px,
  xl: 1279px,
  xxl: 1536px,
);
```

Accessed exclusively through three mixins (never `map.get` directly in consumer code):

- `@include down($name) { ... }` → `@media (width <= breakpoint)` — "at or narrower than."
- `@include up($name) { ... }` → `@media (width > breakpoint)` — "strictly wider than."
- `@include between($min, $max) { ... }` → range query; **errors at compile time** if `$min` isn't narrower than `$max`.

All three use the modern CSS **media query range syntax** (`width <= X`, `width > X`) rather than legacy `min-width`/`max-width`, which reads closer to plain English and avoids the classic off-by-one-pixel overlap bug between adjacent breakpoints.

`md` (768px) is by far the most common breakpoint in the codebase — it's the de-facto "mobile vs. desktop" split used throughout components and sections.

### 5.6 Z-Index — `tokens/_z-index.scss`

A named, ascending scale — never a raw number in consumer code:

| Variable | Value | Typical use |
|---|---|---|
| `$z-below` | -1 | Decorative background layers |
| `$z-base` | 1 | Default stacking context anchor |
| `$z-above` | 2 | Slightly-raised decorative elements (e.g. Hero badge) |
| `$z-elevated` | 10 | Elevated UI elements |
| `$z-card` | 15 | Cards, hover-card cursor |
| `$z-floating` | 50 | Fixed floating UI (Back-to-top button) |
| `$z-menu` | 800 | Mobile menu overlay |
| `$z-header` | 900 | Sticky/fixed header |
| `$z-dropdown` | 1000 | Popovers/dropdowns |
| `$z-modal` | 1100 | Modal dialogs, toast region |
| `$z-modal-content` | 1110 | Content inside a modal, above its own backdrop |
| `$z-route-transition` | 1200 | Full-page route-transition overlay — always on top of everything |

### 5.7 Motion — `tokens/_motion.scss`

**Durations:**

- Interaction-level (fast UI feedback): `$duration-fast` 150ms, `$duration-quick` 200ms, `$duration-base` 300ms.
- Reveal-level (entrance animation): `$motion-duration` 0.8s, `$motion-duration-medium` 0.5s, `$motion-duration-bar` 0.8s, `$motion-duration-page-header-surface` 1.2s.
- `$motion-marquee-duration` 25s — continuous scrolling elements.

**Easing:** `$ease-default` (`ease-in-out`, used for micro-interactions), `$ease-out-expo` (`cubic-bezier(0.16, 1, 0.3, 1)`, the signature "decelerate hard" curve used by almost every reveal animation), `$ease-spring` (`cubic-bezier(0.34, 1.56, 0.64, 1)`, overshoot/bounce for playful reveals).

**Reveal distances:** `$motion-blur` / `$motion-blur-strong` (12px/20px), `$motion-lift` / `-medium` / `-large` (30/70/100px vertical travel), `$motion-slide-x` (60px horizontal travel).

**Scale & rotation:** `$motion-scale-spring-from` (0), `$motion-scale-rotate-from` (0.6), `$motion-rotate-from` (-12deg), `$motion-rotate-to` (4deg).

**Stagger:** `$motion-stagger-step` (0.1s), `$motion-stagger-step-tight` (0.05s), `$motion-stagger-delay-children` (0.1s), `$motion-stagger-delay-nav` (0.05s).

**Scroll-driven view thresholds:** `$motion-view-threshold` map (`mobile: 20%`, `desktop: 40%`) — how far an element must scroll into the viewport before `animation-timeline: view()` completes; and `$motion-view-width-*` — width-growth scroll animations (e.g. an underline that grows as you scroll past it).

**Header offset:** `$motion-bar-offset` (-150px) — how far the header hides itself above the viewport before the page-transition completes.

### 5.8 Motion tokens vs. structural tokens

Note the naming convention split: `$duration-*`/`$ease-default` (unprefixed, generic transition tokens) vs. `$motion-*` (prefixed, reserved specifically for the *entrance-reveal system* in `mixins/_motion.scss`). This lets a reader distinguish "a normal hover transition" from "a scroll-triggered choreography value" purely from the variable name.

### 5.9 Layout & Container

`tokens/_layout.scss` currently defines a single active constant, `$container-width: 1200px`, consumed by the `container` mixin (see [§6](#6-functions--utility-mixins)). Several modal-sizing constants are pre-staged as comments, signaling that this file is the intended home for future structural tokens (modal widths/heights) once that UI is built — a documented extension point rather than dead code.

---

## 6. Functions & Utility Mixins

### 6.1 Functions — `_functions.scss`

```scss
@function rem($value) { ... }
```
Converts a pixel value (or unitless number treated as px) to `rem`, dividing by `$base-font-size` (16px). Throws a compile-time `@error` for non-numeric input or units other than `px`. This is the standard way arbitrary pixel values (e.g. from a Figma handoff) enter the codebase as accessible, user-zoom-respecting `rem` units — used constantly inside `clamp()` expressions (`clamp(rem(50), 10vw, rem(80))`).

```scss
@function alpha($color, $percent) { ... }
```
Returns `rgb(from <color> r g b / <percent/100>)` — modern **relative color syntax** — after validating `$percent` is a multiple of 5 between 5–95 (again, a compile-time `@error` on misuse). This is the tool for one-off opacity needs on any color (custom property or literal) without hand-writing `rgba()` math or needing a dedicated `--x-alpha-40` variable for every possible combination. Used for text selection color, focus rings, glassmorphism surfaces, grid backdrops, etc.

### 6.2 Utility mixins — `_utilities.scss`

| Mixin | Purpose |
|---|---|
| `focus-ring` | The site-wide focus-visible treatment: 2px solid `var(--accent)` outline, 4px offset, `$radius-xl` corners. Applied globally in `base/_accessibility.scss` to interactive elements. |
| `sr-only` | Standard visually-hidden-but-accessible pattern (absolute position, 1px box, clipped, no white-space collapse). Powers the `.sr-only` utility class. |
| `reduced-motion` | Thin wrapper around `@media (prefers-reduced-motion: reduce) { @content }` for ad-hoc reduced-motion overrides outside the main reveal system. |
| `flex-center` | `display: flex; align-items: center; justify-content: center;` — the single most-used mixin in the codebase. |
| `flex-between` | `display: flex; align-items: center; justify-content: space-between;` |
| `flex-column` | `display: flex; flex-direction: column;` |
| `section` | Full-width block with vertically-clamped block padding — the standard wrapper for every `<section>`-level component. |
| `page` | Full-width page background: a gradient from `--primary-softer` at the top to `--background` by 400px down. |
| `container` | The canonical centered content column: `max-width: $container-width`, auto inline margins, clamp-based padding, and a `down(md)` override that switches to a narrower `--tablet-width` with tighter padding. |
| `responsive-grid($columns, $gap, $breakpoints)` | Configurable CSS grid with a map of breakpoint → column-template overrides, defaulting to a 3→2→1 column collapse at `xl`/`md`. |
| `fixed-floating($inset-block-end, $inset-inline-end, $z-index)` | Standard recipe for a `position: fixed` corner-anchored element (used by the Back-to-top button), defaulting to `$z-floating`. |
| `unselectable-media` | `pointer-events: none; user-select: none; -webkit-user-drag: none;` — prevents images/decorative media from being dragged or selected. |
| `cover-image` | `object-fit: cover` + `unselectable-media` — the standard "background-like `<img>`" recipe. |
| `square($size)` | Forces `aspect-ratio: 1`, optionally also setting explicit width/height. |
| `fade-edges-mask($direction, $edge-start, $edge-end)` | CSS mask that fades an element's edges to transparent — used for carousels/marquees to visually fade content at the container edges. |
| `grid-backdrop($size, $line-color, $fade)` | Decorative graph-paper-style grid background with a radial fade-out mask — used behind route-transition overlays. |
| `page-header-surface(...)` + `$page-header-wave-mask` | A shared decorative "wavy divider" surface (SVG data-URI mask) used behind every page's hero/header banner. |
| `button-hover` | Encodes the project's *pointer-state* philosophy: only applies `@content` on devices with real hover (`@media (hover: hover)`), and only when the element isn't already pressed/expanded/current — prevents "sticky hover" on touch devices and avoids hover styles fighting with active/expanded states. |
| `fine-pointer-hover` | Stricter version requiring both `hover: hover` *and* `pointer: fine` — reserved for effects (like the custom cursor) that should never activate on any touch device, even one with a hover-capable stylus. |
| `transition-base($properties, $duration, $ease)` | Generates a `transition` shorthand from a list of properties, defaulting to `$duration-base`/`$ease-default`, so multi-property transitions don't need to be hand-written every time. |

`_utilities.scss` also defines global CSS resources shared by mixins in this file: `$page-header-wave-mask` (the wave SVG data URI) sits at module scope so both `page-header-surface` can reference it without recomputing it per call site.

### 6.3 Motion system — `mixins/_motion.scss`

This file is the site's **scroll/entrance-reveal engine** — the animation vocabulary layered on top of `data-in-view="true"` attributes (set by a JS intersection-observer hook, not shown here, but consumed everywhere in this Sass).

| Mixin/function | Purpose |
|---|---|
| `motion-reduced` | Forces a hard "no animation" state (`opacity: 1 !important`, all transforms `none !important`, `transition: none !important`) under **both** `prefers-reduced-motion: reduce` **and** `scripting: none` (i.e., JS disabled — the reveal system depends on JS to toggle `data-in-view`, so without JS everything must default to visible). |
| `reveal-transition($duration, $ease)` | The base transition declaration all reveal variants share (`opacity`, `translate`, `scale`, `rotate`, `filter`), respecting a `--reveal-delay` custom property, and automatically including `motion-reduced`. |
| `reveal-visible` / `reveal-hidden-up` | The two canonical end-states of a reveal: fully visible, or hidden-and-offset-upward with blur. |
| `reveal($direction, $variant, $trigger, ...)` | The primary, highly-parameterized entry point. Supports variants `spring` (scale+blur), `rotate` (rotate+scale spring), `up-medium`/`up-large` (bigger vertical travel), and directions `up`/`left`/`right` (adds horizontal `translate` above the `md` breakpoint only — mobile always reveals vertically to avoid horizontal overflow). Sets `--reveal-active: 1` (a hook other code can query) and, for `$trigger: eager`, `--reveal-eager: 1`. |
| `reveal-group($step, $delay-children, ..., $max-children)` | Applies `reveal(...)` to up to `$max-children` (default 24) direct children via `:nth-child()`, auto-computing a staggered `--reveal-delay` per child (`delay-children + i * step`). This is how every list/grid of cards animates in sequence. |
| `reveal-eager($direction, $variant)` | Shorthand for `reveal(..., $trigger: eager)` — content that should animate immediately on page load rather than waiting for scroll-into-view. |
| `reveal-from-top($offset, $duration, $ease, $hidden-class)` | The header's specific "slide down from off-screen once the page-transition overlay finishes" behavior, gated by `html[data-page-transition="done"]`. |
| `page-header-surface-reveal(...)` | Reveal treatment specifically for the `::before` pseudo-element created by `page-header-surface` (in `_utilities.scss`) — slides the wavy surface down into place. |
| `motion-view-range($property, $prefix)` | Sets `animation-range`, reading the responsive mobile/desktop percentage from `$motion-view-threshold`. |
| `view-scroll-keyframes` | Defines the shared `@keyframes view-scroll-width` (animating a `width` custom property) — included exactly once, in `main.scss`, since `@keyframes` are global and must not be duplicated. |
| `view-scroll-width(...)` | Applies a scroll-driven width animation using native CSS `animation-timeline: view()` with an `@supports` fallback to a static width, and a `prefers-reduced-motion` override that disables the animation outright. |

**Design philosophy of the motion system:** every reveal mixin degrades gracefully three ways — (1) `@supports` fallback for browsers without scroll-driven animations, (2) `prefers-reduced-motion: reduce` forces the final visible state instantly, and (3) `scripting: none` (no JS) also forces the final visible state, since the JS-driven `data-in-view` attribute would otherwise never appear and content would stay invisible forever. This third guard is *also* backed up by the `noscript.css` rule targeting `[style*="opacity: 0"]` as a belt-and-suspenders fallback for inline styles set by the animation library before hydration.

---

## 7. Utility Classes

The project intentionally has **very few** standalone utility classes — this is not a utility-first (Tailwind-style) system. The two that exist are generated from mixins in `base/_accessibility.scss`:

```scss
.sr-only { @include sr-only; }
```
Visually hides content while keeping it in the accessibility tree — used for supplementary screen-reader-only text.

The focus-ring mixin is also applied as a class hook for non-native focusable elements:

```scss
.skip-link:focus-visible { @include focus-ring; }
```

Everything else that *looks* like a utility (e.g. `flex-center`, `container`, `section`) is a **mixin**, not a class — it's compiled directly into the component's own selector (`.hero { @include flex-center; }`) rather than requiring `class="flex-center"` in markup. This is a deliberate architectural choice: it keeps React component markup clean of styling-related class soup and keeps all visual logic co-located in `.scss` files, at the cost of some duplicated compiled CSS (mitigated by production minification/gzip).

---

## 8. Global Styles

Defined in `base/`, assembled by `main.scss`, and — critically — **only ever emitted once**, because `main.scss` is imported exactly one time in the entire app (`src/app/layout.js`).

### 8.1 Reset — `base/_reset.scss`

A minimal, modern reset:

- Universal box-model reset (`margin/padding: 0`, `box-sizing: border-box`) on `*`, `::before`, `::after`.
- `button { all: unset; outline: revert; }` — fully de-styles native buttons but explicitly restores the browser's default outline behavior (so `outline: revert` + the project's own `:focus-visible` rule together guarantee buttons are never accidentally keyboard-inaccessible).
- `list-style: none` on `:where(ul, ol)`.
- Links inherit color and drop the underline by default (`:where(a)`).
- `:where(address)` normalized to non-italic.
- `:where(img, iframe, figure)` forced to `display: block`, capped at `max-width: 100%`, `height: 100%` (fills a sized parent by default — common in a design where images live inside intentionally-sized containers, e.g. the Hero's blob-shaped image container).
- `:where(figcaption) { display: none; }` — captions are hidden by default (presumably used for accessible/SEO text rather than visual captions in this project).

Note the consistent use of `:where()` instead of a plain selector list — `:where()` has **zero specificity**, so any component can override these reset rules with a single class selector without needing `!important` or extra specificity hacks.

### 8.2 Document — `base/_document.scss`

- Mounts every color CSS variable onto `:root` via `@include root-color-tokens;` — the **only** place this happens in the whole codebase.
- Sets `html` typography defaults (`$font-primary`, `$base-font-size`, `$fw-medium`) and `scrollbar-gutter: stable` (prevents layout shift when a vertical scrollbar appears/disappears) plus `height: 100%`.
- A commented-out `scroll-behavior: smooth` block under a reduced-motion-safe media query — left in place as a documented, easily-reversible decision (native smooth scroll was disabled, likely in favor of the JS-driven scroll/reveal system, but the safe implementation is preserved for future reference).
- `body` gets `min-height: 100vh`/`100svh` (the `svh` unit is a progressive enhancement for mobile browsers with dynamic toolbars) and is a flex column — this is what allows a sticky footer layout (header/content/footer stacked, content growing to fill remaining space).
- Font smoothing (`-webkit-font-smoothing: antialiased`, `-moz-osx-font-smoothing: grayscale`) for crisper text rendering on retina/WebKit and macOS Firefox.
- `html, body` share `overflow-x: clip` (prevents horizontal scrollbars from decorative overflow — e.g. the Hero's blob shapes or off-screen reveal transforms) and `background-color: var(--background)`.
- Headings (`h1`–`h6`) default to `$fw-medium`.
- `::selection` uses `alpha(var(--primary), 70)` background with `var(--primary-on)` text — brand-colored text selection instead of the browser default blue.
- A **performance-specific** rule: on `down(md)` viewports, every `section` *except* `.contact` gets `will-change: auto`, `transform: translateZ(0)`, and `backface-visibility: hidden` — see [§15 Performance Considerations](#15-performance-considerations) for why.

### 8.3 Accessibility — `base/_accessibility.scss`

- A single, comprehensive `:focus-visible` selector list covering every interactive element type the project actually uses (form controls, links, `abbr`, ARIA `region`/`tab` roles, React Aria's `[data-state="tap"]`, and the skip-link) — all sharing the one `focus-ring` mixin, so the entire site has **one visual focus treatment** defined in **one place**.
- Exposes `.sr-only` as a usable class (see [§7](#7-utility-classes)).

---

## 9. Accessibility Considerations

Accessibility is not bolted on — it's threaded through nearly every layer of this system:

- **Focus visibility**: One centralized, high-contrast (`var(--accent)`, 2px, 4px offset) focus ring applied via `:focus-visible` (not `:focus`, so mouse users don't see rings on click) across every interactive element and ARIA role in use — see `base/_accessibility.scss`.
- **`prefers-reduced-motion`**: Respected at every level of the motion system (`motion-reduced` mixin, `reduced-motion` mixin, individual `@keyframes` guards in Hero/Header/etc.) — animations collapse to their final state instantly rather than simply "not playing" (which could leave content invisible).
- **No-JS fallback**: `noscript.css` is a dedicated, hand-maintained safety net ensuring (a) content hidden by inline `opacity: 0` styles (set ahead of JS-driven reveal) becomes visible, (b) the header isn't stuck off-screen, (c) the custom cursor never renders and native cursors are restored, (d) React Aria disclosure panels (FAQ, Experience) show their full content instead of relying on JS-only expand/collapse, and (e) a static, real `<nav>` with plain `<a>` tags is shown since the client-gated header nav depends on `isMounted`.
- **`:where()` in the reset**: keeps specificity at zero so accessibility-related overrides (like focus rings) never lose a specificity battle against reset rules.
- **`.sr-only` utility**: standard screen-reader-only content pattern (not `display: none`, which would remove it from the accessibility tree).
- **Semantic color contrast pairs**: every color in the scale ships with a matching `-on` (foreground-on-this-background) token, encouraging correct-contrast text-on-color pairings by default rather than ad-hoc white/black choices.
- **Pointer-type-aware hover**: `button-hover`/`fine-pointer-hover` mixins prevent hover-only affordances from being the *only* way to discover interactivity on touch devices, and prevent "stuck hover" states after a tap.
- **Respect for user color-selection preferences**: `::selection` is styled but still functional and visible with adequate contrast (`var(--primary-on)` text on a 70%-alpha primary background).
- **`scrollbar-gutter: stable`**: prevents content from visually "jumping" horizontally when a scrollbar appears — a subtle but real accessibility/usability win for users sensitive to layout shift.

---

## 10. Performance Considerations

- **Single global stylesheet entry point**: `main.scss` is imported exactly once, so global CSS (reset, tokens, document defaults) is never duplicated in the compiled output, no matter how many components exist.
- **Side-effect-free barrel module**: `_index.scss` only forwards variables/functions/mixins — importing it from 50+ files adds **zero** duplicate CSS output, because there's no CSS to duplicate (Sass `@use` also only evaluates a module's *side effects* once per compilation, regardless of how many files `@use` it).
- **CSS custom properties for theming instead of full re-compiles**: color states are runtime CSS variables, so switching a button's color scheme is a single attribute/class swap, not a Sass recompilation or a separate stylesheet.
- **`will-change`/GPU-layer promotion is scoped and conditional**: `base/_document.scss` only promotes `section` elements to their own compositor layer on mobile (`down(md)`) and explicitly excludes `.contact` — layer promotion is a targeted, evidence-based performance decision, not a blanket `* { will-change: transform }` (which itself would hurt performance by creating too many layers).
- **Reduced-motion and no-JS both collapse to zero-cost states**: when animations are disabled (`prefers-reduced-motion` or `scripting: none`), all `transition`/`transform`/`filter` properties are forced off — this avoids paying any paint/compositing cost for animation infrastructure that will never animate.
- **Native scroll-driven animations with `@supports` fallback**: `view-scroll-width` prefers `animation-timeline: view()` (a compositor-only, main-thread-free CSS feature) over JS scroll listeners, falling back to a static width when unsupported — better performance than an `IntersectionObserver`-driven inline-style approach for this specific effect.
- **`rem()`/design-token discipline avoids float/precision creep**: consistent, computed rem conversion instead of hand-typed decimal rem values reduces the chance of inconsistent, hard-to-diff spacing values across dozens of files.
- **`clamp()` instead of multiple media-query breakpoints**: the overwhelming majority of spacing/font-size responsiveness in this codebase uses `clamp(min, preferred-vw, max)` rather than 3–4 discrete breakpoint overrides — fewer style recalculation triggers on resize/zoom and smaller compiled CSS than an equivalent breakpoint ladder.
- **`content-visibility`-friendly structure**: sections are self-contained blocks (`@include section`) with predictable padding, which is compatible with lazy-rendering strategies like `content-visibility: auto` if adopted later (not currently used, but the architecture doesn't fight it).
- **Backdrop filters are used sparingly and deliberately**: `backdrop-filter: blur(...)` (Header, HoverCard cursor) is an expensive GPU operation, and its usage is limited to small, fixed-position elements rather than large scrolling surfaces.

---

## 11. Naming Conventions

| Category | Convention | Example |
|---|---|---|
| Sass token variables | `$kebab-case`, category-prefixed | `$font-size-16`, `$space-24`, `$z-header`, `$motion-duration` |
| "Source" (unmixed) color constants | `$src-*` prefix | `$src-primary`, `$src-danger` |
| CSS custom properties (global) | `--kebab-case`, semantic (not literal-color) names | `--primary`, `--surface-muted`, `--text-inverse` |
| CSS custom properties (component-scoped) | `--{component}-{property}` | `--button-bg`, `--button-icon-size`, `--reveal-delay` |
| Partial files (not directly compiled) | Leading underscore | `_functions.scss`, `_colors.scss` |
| Non-partial entry files | No leading underscore | `main.scss`, `noscript.css` |
| Mixin/function names | `kebab-case`, verb-or-noun-phrase | `flex-center`, `reveal-group`, `rem()`, `alpha()` |
| CSS classes (block) | `kebab-case`, matches component name | `.button`, `.hover-card`, `.section__header` |
| CSS classes (element) | BEM `&__element`, chainable | `.hero__title-highlight`, `.header__menu-line` |
| CSS classes (modifier) | BEM `&--modifier`, often `key-value` shaped | `.button--variant-primary`, `.button--color-danger`, `.button--size-large` |
| Page-level root class | `{route}__page` or `{route}__main` | `.services__page`, `.home__main` |
| Stylesheet file names (components/sections) | PascalCase, matches the component's file/folder | `Button.scss`, `Header.scss`, `Hero.scss` |
| Stylesheet file names (pages) | lowercase, matches Next.js file convention | `page.scss`, `not-found.scss` |
| Component-local token partials | `{component}.tokens.scss` | `button.tokens.scss` |

**Modifier naming pattern worth calling out**: the `Button` component uses a structured `--{axis}-{value}` modifier grammar (`--variant-primary`, `--color-danger`, `--size-large`, `--icon-only`) rather than flat modifier names (`--primary`, `--danger`, `--large`). This makes multi-axis components (variant × color × size, all independently combinable) unambiguous and greppable — `--color-` finds every color modifier across the whole file regardless of variant/size.

---

## 12. Component Styles

Every component under `src/components/**` (and `src/sections/**`, which are larger page-section compositions built the same way) follows an identical contract:

```scss
@use "../../assets/styles" as *;  // or "../assets/styles" depending on folder depth

.component-name {
  // 1. layout mixins (flex-center, container, etc.)
  // 2. box model, then visual (color, background, border, shadow)
  // 3. --custom-properties defined for internal theming
  // 4. states: &:disabled, &[data-pressed], &[aria-*], &[data-state]
  // 5. &--modifier blocks (often generated with @each over a token list/map)
  // 6. &__element blocks (nested BEM elements, often with their own sub-elements)
  // 7. @keyframes local to this component, if any
}
```

Representative examples surveyed for this handbook: `Button` (multi-axis variant/color/size system backed by `button.tokens.scss`), `Header` (fixed positioning + `reveal-from-top` + mobile hamburger state machine driven by `&--active`), `HoverCard` (custom cursor, `fine-pointer-hover`-gated), `ToastRegion`/`Toast` (fixed positioning, `z-modal`, status-color variants), `SectionHeader`/`PageHeader` (shared "eyebrow / title / subtitle" content pattern used across every page).

**Component-local token files** (`button.tokens.scss` is the only current example) exist when a component's variant system is complex enough to need its own mixin API (here: `button-color-tokens`, `button-derived-color-tokens`, plus the `$button-scale-colors` list and `$button-mapped-colors` map) — separating "how to compute a button's color tokens" from "how a button actually renders" keeps `Button.scss` readable despite supporting 9 semantic colors, 1 custom color, 4 variants, 3 sizes and an icon-only mode (potentially 100+ combinations from one file).

**Key architectural pattern — `@each` over token lists/maps to generate modifier classes**: rather than hand-writing a `&--color-primary`, `&--color-secondary`, … block for every color, `Button.scss` loops `$button-scale-colors` (a plain list, for palette colors that already have a full CSS-variable ladder) and `$button-mapped-colors` (a map, for one-off colors like `surface` that don't follow the standard ladder) to generate every color modifier programmatically. This is the standard technique in this codebase whenever a component needs "N modifier classes that all follow the same shape."

---

## 13. Page Styles

Files named `page.scss` (or route-specific names like `not-found.scss`) live directly beside their Next.js `page.js`/`page.jsx` route file (App Router convention) under `src/app/**`. They follow a consistently thin pattern:

```scss
@use "../assets/styles" as *;   // depth-relative path back to the design system

.route__page {
  @include page;        // shared page background gradient

  &-container {
    @include container; // shared centered content column
    @include flex-column;
  }
}
```

Page stylesheets are intentionally **minimal** — they define only the page-level shell (background, container, top-level flex direction). All real visual content lives in the section/component stylesheets rendered inside that page. This is why `src/app/services/page.scss`, `src/app/publications/page.scss`, and `src/app/aboutme/page.scss` are all just a few lines each, while nested feature folders under a route (e.g. `src/app/services/FAQ/FAQ.scss`, `src/app/services/WhyChooseMe/WhyChooseMe.scss`, `src/app/services/ServiceOfferings/ServiceOfferings.scss`) carry the actual page-section styling and are structured exactly like a component stylesheet (see [§12](#12-component-styles)).

Two page-level naming exceptions worth noting: the home page uses `.home__main` (not `.home__page`) because its root element is a `<main>`, and dynamic routes (`src/app/publications/[slug]/page.scss`) follow the exact same contract as static ones — the bracketed folder name has no bearing on the Sass architecture.

---

## 14. Best Practices (as practiced in this codebase)

- **Always reach the design system through one door**: `@use "<relative-path-to>/assets/styles" as *;` — never `@use` an individual token file directly from a component. This keeps the barrel (`_index.scss`) as the single point of change if the internal token file structure ever needs to move.
- **Never write a raw z-index number** — always a `$z-*` token, even for values that "seem safe," so stacking order stays centrally auditable.
- **Never write a raw color hex value inside a component stylesheet** — always `var(--token)` (or `alpha(var(--token), N)` for transparency). Hex literals only exist in `tokens/_colors.scss`.
- **Prefer `clamp()` over discrete breakpoint overrides** for anything that scales continuously (font-size, spacing, gaps) — reserve `up()`/`down()`/`between()` for genuinely discrete layout changes (flex-direction flips, grid column-count changes, showing/hiding elements).
- **Gate every hover effect behind `button-hover`/`fine-pointer-hover` (or at minimum `@media (hover: hover)`)** rather than a bare `&:hover`, to avoid sticky-hover bugs on touch devices.
- **Wrap every animation in a `prefers-reduced-motion` fallback** — either implicitly (by using the `reveal`/`reveal-group`/`motion-reduced` mixins, which already do this) or explicitly for one-off `@keyframes` (as seen in Hero's icon-bounce and badge-spin animations).
- **Use `@each` over a token list/map to generate repetitive modifier classes** instead of hand-writing each one — see `Button.scss`.
- **Compute derived values with functions (`rem()`, `alpha()`), never hand-calculate** — avoids silent unit/precision mistakes and keeps values self-documenting.
- **Keep page-level stylesheets to shell-only concerns** (background, container, top-level direction) — real content styling belongs to the component/section that owns that markup.
- **Name component-scoped custom properties with a component prefix** (`--button-*`, not a bare `--bg`) to avoid accidental collisions when multiple components' custom properties are in scope on nested markup.

---

## 15. Common Mistakes to Avoid

- **Don't `@use` `base/*` files from component code.** They are wired into `main.scss` only, and `_index.scss` deliberately does not forward them. Pulling `base/_document.scss` into a component would re-emit `:root` color tokens and `html`/`body` rules inside that component's compiled CSS — harmless in output (later `:root` blocks just reassign the same variables) but a maintenance smell and a sign the architecture boundary is being misunderstood.
- **Don't hardcode a breakpoint value (`768px`, `1024px`, …) in a media query.** Always go through `up()`/`down()`/`between()` — a hardcoded value silently drifts out of sync when the token file is updated.
- **Don't use `@extend`.** It isn't used anywhere in this codebase and introduces the exact kind of hidden coupling this architecture is designed to avoid; use a mixin instead.
- **Don't add new global, unscoped selectors outside `base/`.** Any new "site-wide" rule belongs in one of the three `base/*` files (reset/document/accessibility), not scattered into a random component stylesheet, or it will only apply when that specific component happens to be mounted.
- **Don't define a new color as a bare hex value in a component.** Add it to `tokens/_colors.scss` (as a `$src-*` constant run through `color-scale()`, or as an entry in a component-local mapped-colors structure like `$button-mapped-colors` if it's genuinely one-off) so it gets the interaction-state ladder and stays greppable/auditable.
- **Don't forget the `scripting: none` branch when adding new JS-driven visual state** (e.g. a new "hidden until JS reveals it" pattern). Anything gated behind `data-*` attributes set by client JS needs either a `motion-reduced`-style `@media (scripting: none)` fallback or an entry in `noscript.css` — otherwise no-JS visitors see permanently hidden content.
- **Don't duplicate the wavy `page-header-surface` SVG mask** or similar decorative constructs per-component — reuse the shared mixin/constant in `_utilities.scss` so there's one place to tweak the shape.
- **Don't mix Sass variables and CSS custom properties for the same concept.** If a value needs to vary at runtime/per-instance, it should be a CSS variable end-to-end (see `--button-*`); if it's compile-time structural, keep it a Sass variable. Reaching for `var(--space-16)` (which doesn't exist) instead of `$space-16` — or vice versa, hardcoding a *themeable* value as a Sass variable — breaks the system's internal consistency.
- **Don't forget `:where()`-level specificity when adding new base rules.** A new base rule written with a plain selector (not `:where()`) can make legitimate component overrides require `!important`.

---

## 16. Reusable vs. Ariantika-Specific

### 16.1 Fully reusable across any project (drop-in design-system core)

- `tokens/_breakpoints.scss` — the `up()`/`down()`/`between()` mixins and map pattern are project-agnostic; only the pixel values are Ariantika-specific.
- `tokens/_z-index.scss` — the *pattern* (named, ascending semantic scale) is universal; only the specific names (`$z-header`, `$z-modal`, …) are tailored to this app's UI inventory.
- `tokens/_spacing.scss` / `tokens/_radius.scss` — generic numeric scales; values are a starting point any project could adopt or rescale.
- `_functions.scss` (`rem()`, `alpha()`) — pure, project-agnostic utilities usable verbatim in any Sass codebase.
- `_utilities.scss` mixins that are pure layout/behavior primitives: `flex-center`, `flex-between`, `flex-column`, `responsive-grid`, `unselectable-media`, `cover-image`, `square`, `fade-edges-mask`, `button-hover`, `fine-pointer-hover`, `transition-base`.
- `base/_reset.scss` — a generic, opinionated-but-portable modern CSS reset with no project-specific values.
- `base/_accessibility.scss` — the *pattern* (centralized focus-ring + `.sr-only`) is universal, though the exact selector list should be adapted to whatever interactive elements/ARIA roles a new project actually uses.
- The overall **architecture** — two-entry-point split (`main.scss` global vs. `_index.scss` barrel), ITCSS layering, `@use`/`@forward` module strategy, CSS-variables-for-theming + Sass-variables-for-structure hybrid, BEM-via-nesting — is the most valuable reusable asset here and should be considered the template for any new Sass-based project.
- `mixins/_motion.scss`'s **engineering pattern** (reduced-motion-first, no-JS-fallback-aware, `@supports`-guarded scroll animation) is reusable as a technique even where the specific token values (`$motion-lift-large: 100px`, etc.) would need retuning.

### 16.2 Ariantika-specific (tailored to this exact site)

- `tokens/_colors.scss` — the eleven brand hex values (`$src-primary: #1563a7`, etc.) and surface/text values are this brand's specific palette.
- `tokens/_typography.scss` font stacks (`$font-display` → Sour Gummy, `$font-brush` → Caveat Brush, `$font-arabic` → Amiri) are chosen for this portfolio's personal-brand aesthetic and Arabic (Qur'an verse) content need.
- `_utilities.scss`'s `page-header-surface` wave-divider SVG mask and `grid-backdrop` — bespoke decorative treatments matching this site's specific visual identity (rounded, playful, wave-motif hero/page headers).
- `noscript.css` — every rule targets Ariantika-specific component class names (`.hover-card`, `.experience__content`, `.services__faq-panel`, `.noscript-nav`) and would need to be rewritten per project.
- `mixins/_motion.scss`'s specific tuned values (durations, easing curves, lift/blur distances, stagger timings) reflect this site's particular "soft, springy, staggered" motion personality — the *mechanism* is reusable, the *feel* is bespoke.
- All of `src/components/**/*.scss`, `src/sections/**/*.scss`, and `src/app/**/page.scss` — these consume the reusable core but encode Ariantika's actual UI (Hero's blob-shaped photo, the badge with years-of-experience, the Qur'an verse component, publications/services page layouts) and are not portable as-is to another project.
- `button.tokens.scss`'s specific color-mapping choices (e.g. the `surface` variant's exact bg/hover/active values) are tuned to this app's button inventory, though the *mixin pattern* it establishes is reusable.

---

## 17. Quick-Reference Cheat Sheet

```scss
// Import the whole design-system API (from a component two levels deep):
@use "../../assets/styles" as *;

// Spacing / sizing
padding: clamp($space-16, 2vw, $space-32);
border-radius: $radius-xl;

// Typography
font-family: $font-display;
font-size: clamp($font-size-32, 4vw, $font-size-48);
font-weight: $fw-bold;

// Color (always CSS variables, never hex)
color: var(--primary);
background-color: alpha(var(--text), 10);

// Responsive
@include down(md) { /* mobile/tablet override */ }
@include up(lg)   { /* desktop-only enhancement */ }

// Layout primitives
@include flex-center;
@include container;
@include section;

// Motion
@include reveal($direction: up, $variant: spring);
@include reveal-group($max-children: 3);

// Z-index
z-index: $z-modal;

// Units
width: rem(24);
```

---

*Generated from a full read-through of `src/assets/styles/**` and a representative sample of consumer stylesheets across `src/components`, `src/sections`, and `src/app` in the Ariantika codebase.*
