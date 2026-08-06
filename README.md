# Ariantika

Professional portfolio website for **Ariantika** — an Epidemiology & Biostatistics researcher based in North Sumatra, Indonesia.

**Live site:** [https://ariantika.me](https://ariantika.me)

---

## Table of Contents

- [Quick Start](#quick-start)
- [About the Site](#about-the-site)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Features](#features)
- [Updating Content](#updating-content)
- [Deployment](#deployment)
- [About Ariantika](#about-ariantika)
- [Known Limitations](#known-limitations)
- [Contact](#contact)
- [License](#license)

---

## Quick Start

### Prerequisites

- **Node.js** ≥ 20.9.0
- **pnpm** 11.x (enforced via `packageManager` in `package.json`)

### Install & run

```bash
git clone <repository-url>
cd ariantika
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Create a local `.env` file (see `.env.example` if present, or copy the block below):

```env
# Canonical site URL (metadata, sitemap, JSON-LD)
NEXT_PUBLIC_SITE_URL=https://ariantika.me

# Formspree endpoint for the contact form (required for submissions)
FORMSPREE_FORM_URL=https://formspree.io/f/<your-form-id>
```

| Variable               | Required           | Description                                                                      |
| ---------------------- | ------------------ | -------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | No                 | Canonical URL. Defaults to `https://ariantika.me`, then Netlify's `URL` env var. |
| `FORMSPREE_FORM_URL`   | Yes (contact form) | Formspree endpoint. Without it, `/api/contact` returns `503`.                    |

### Scripts

| Command         | Description                                          |
| --------------- | ---------------------------------------------------- |
| `pnpm dev`      | Start the development server                         |
| `pnpm build`    | Production build (static routes + publication pages) |
| `pnpm start`    | Serve the production build                           |
| `pnpm lint`     | Run ESLint                                           |
| `pnpm lint:fix` | ESLint with auto-fix                                 |

---

## About the Site

A multi-page portfolio built with **Next.js App Router**. Content is data-driven: copy, publications, services, and SEO metadata live in `src/data/` and are imported by pages and sections.

### Routes

| Route                  | Description                                                                                                                |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `/`                    | Home — hero, expertise banner, about preview, services, experience timeline, featured publications, Quranic verse, contact |
| `/aboutme`             | Personal story in five chapters with image carousel                                                                        |
| `/services`            | Service offerings, FAQ, and reasons to work together                                                                       |
| `/publications`        | Full publications list                                                                                                     |
| `/publications/[slug]` | Per-publication pages (metadata + sitemap ready; body is a placeholder — see [Known limitations](#known-limitations))      |
| `/contact`             | Contact form and social links                                                                                              |

Home page sections (in order): `Hero` → `Banner` → `About` → `Services` → `Experience` → `Publication` → `QuranVerse` → `Contact`.

### Services

1. **Scientific Writing & Publication Support** — Manuscript structuring, journal selection (Scopus/Web of Science), reviewer responses, formatting, submission.
2. **Research Design & Data Analysis** — Study design, sample size, SPSS workflows, descriptive/inferential/regression analysis, publication-ready tables.
3. **Copy Editing & Translation** — Academic copy editing, proofreading, English ↔ Indonesian for manuscripts, theses, reports, and books.

**Research areas:** Epidemiology, public health, medical research, and related academic disciplines depending on scope.

**Ethics:** Confidentiality assured; guidance and support only — not ghostwriting of research.

### Publications

Source of truth: `src/data/research/research.js`. Current entries:

| Title                                                                                                                                              | Status       | Year |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ---- |
| [Assessment of Quality of Life in Advanced Lung Cancer](/publications/quality-of-life-in-advanced-stage-lung-cancer)                               | Published    | 2024 |
| [Dyspnea and Family Support in Advanced Lung Cancer](/publications/dyspnea-family-support-quality-of-life-advanced-lung-cancer)                    | Under Review | 2026 |
| [Healthcare-Associated Infections in an Indonesian Teaching Hospital](/publications/healthcare-associated-infections-indonesian-teaching-hospital) | Under Review | 2026 |
| [Biophilic Design for Tuberculosis Isolation Rooms](/publications/biophilic-elements-pulmonary-tuberculosis-isolation-rooms)                       | Submitted    | 2026 |

### Downloadable documents

- [Public Health Resume (PDF)](/documents/ARIANTIKA_PUBLIC_HEALTH_RESUME.pdf)
- [Quality of Life in Advanced Lung Cancer (PDF)](/documents/QUALITY-OF-LIFE-ADVANCED-LUNG-CANCER.pdf)

### LLM-friendly summary

[`public/llms.txt`](public/llms.txt) provides a structured, crawlable overview of the site for AI assistants and similar tools.

---

## Tech Stack

| Category        | Technology                                                             |
| --------------- | ---------------------------------------------------------------------- |
| Framework       | [Next.js 16](https://nextjs.org/) (App Router)                         |
| UI              | [React 19](https://react.dev/)                                         |
| Styling         | [Sass](https://sass-lang.com/) — tokens, mixins, co-located `.scss`    |
| Animation       | [Motion](https://motion.dev/)                                          |
| Accessibility   | [React Aria Components](https://react-spectrum.adobe.com/react-aria/)  |
| Icons           | [React Icons](https://react-icons.github.io/react-icons/)              |
| Images          | [Sharp](https://sharp.pixelplumbing.com/) (AVIF/WebP via `next/image`) |
| Fonts           | Inter, Sour Gummy, Caveat Brush, Amiri (`next/font/google`)            |
| Compiler        | React Compiler (`babel-plugin-react-compiler`)                         |
| Linting         | ESLint 9 + `eslint-config-next`                                        |
| Package manager | [pnpm](https://pnpm.io/) 11                                            |
| Deployment      | [Netlify](https://www.netlify.com/)                                    |

---

## Architecture

```
src/data/*.js          →  static content (single source of truth)
        ↓
src/app/               →  routes, metadata exports, API routes
src/sections/          →  home page sections
src/components/        →  shared UI (header, forms, cards, …)
src/lib/               →  metadata, JSON-LD, motion presets, contact proxy
        ↓
public/                →  PDFs, favicons, llms.txt
```

**Conventions**

- **Path alias:** `@/` → `src/` (configured in `jsconfig.json`).
- **Co-located styles:** each component, section, or page has a matching `.scss` file beside its `.jsx`.
- **Barrel exports:** `@/data`, `@/lib`, `@/components`, `@/sections`, `@/hooks`, `@/utils`.
- **Design tokens:** colors, spacing, typography, motion, breakpoints, and z-index under `src/assets/styles/tokens/`.
- **Static generation:** publication slugs are pre-rendered via `generateStaticParams()`; sitemap and robots are generated at build time.

**Page lifecycle**

1. Root `layout.js` wraps every page with fonts, header, footer, skip link, back-to-top, toasts, and Person JSON-LD.
2. Root `template.jsx` mounts `TransitionOverlay` (route enter animation) and `RevealObserver` (scroll-triggered reveals after transition completes).
3. Each route exports metadata from its data file via `createPageMetadata()`.

---

## Project Structure

```
ariantika/
├── public/
│   ├── documents/              # Downloadable PDFs
│   ├── favicon/                # PWA icons (192, 512)
│   └── llms.txt                # LLM-friendly site summary
├── src/
│   ├── app/                    # App Router pages & API
│   │   ├── aboutme/
│   │   ├── api/contact/        # POST → Formspree proxy
│   │   ├── contact/
│   │   ├── publications/
│   │   │   └── [slug]/         # Static publication routes
│   │   ├── services/
│   │   │   ├── FAQ/
│   │   │   ├── ServiceOfferings/
│   │   │   └── WhyChooseMe/
│   │   ├── layout.js           # Root layout
│   │   ├── template.jsx        # Page transition + reveal observer
│   │   ├── TemplateEffects.jsx
│   │   ├── metadata.js         # Site-wide default metadata
│   │   ├── manifest.js         # PWA manifest
│   │   ├── robots.js
│   │   ├── sitemap.js
│   │   └── opengraph-image.png
│   ├── assets/
│   │   ├── images/             # Hero, about, research, services, experience
│   │   └── styles/             # Global SCSS, tokens, mixins, reset, noscript.css
│   ├── components/             # Reusable UI (Header, Contact, ResearchCard, …)
│   ├── data/                   # All site content & per-page metadata
│   ├── hooks/                  # useMediaQuery, useHideOnScrollDown
│   ├── lib/
│   │   ├── contact/            # Formspree submission
│   │   ├── json-ld/            # Person, ProfilePage schema
│   │   ├── metadata/           # createPageMetadata, SEO constants
│   │   ├── motion/             # Reveal presets, page-transition timing
│   │   └── site.js             # getSiteUrl / SITE_URL
│   ├── sections/               # Home page sections
│   └── utils/                  # Media helpers, toast queue, duration formatting
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
└── package.json
```

---

## Features

### SEO & metadata

- Per-route metadata via `createPageMetadata()` in `src/data/*/metadata.js`
- Per-route canonical URLs, Open Graph, and Twitter cards
- Default OG image at `/opengraph-image.png` (1200×630)
- Dynamic `sitemap.xml` and `robots.txt`
- Schema.org **Person** JSON-LD on every page; **ProfilePage** JSON-LD on home

### Progressive Web App

- Web app manifest with theme color `#BFDDF7` and shortcuts to main sections
- Maskable icons at 192×192 and 512×512

### Accessibility

- Skip-to-main-content link
- React Aria Components for tooltips, form fields, and toasts
- Noscript fallback navigation (`src/assets/styles/noscript.css`)
- Semantic landmarks and ARIA labels
- `prefers-reduced-motion` respected in page transitions and Motion animations

### Motion & transitions

- **Page transitions:** layered sheet overlay on route change (`TransitionOverlay` + `src/lib/motion/page-transition.js`)
- **Scroll reveals:** `RevealObserver` toggles `data-in-view` on elements after the transition finishes
- **Motion presets:** blur/lift reveals and deck animations in `src/lib/motion/motion.js`

### Contact form

- Fields: full name (≥ 2 chars), email, optional service, message (50–200 chars)
- Client- and server-side validation (`contact.validation.js` + `/api/contact`)
- Honeypot field (`_gotcha`) for spam
- Proxied to Formspree via `FORMSPREE_FORM_URL`

### Preview deployments

When `CONTEXT !== "production"` (Netlify preview builds):

- `robots.txt` disallows all crawlers
- Sitemap returns an empty list

---

## Updating Content

Edit data files — do not hard-code copy in JSX.

| What to change                 | File                                                |
| ------------------------------ | --------------------------------------------------- |
| Hero text, portrait, CTAs      | `src/data/hero/hero.js`                             |
| Expertise banner marquee       | `src/data/banner/banner.js`                         |
| Home about preview             | `src/data/about/source.js` (`aboutSection`)         |
| About page chapters & carousel | `src/data/about/source.js` (`aboutSource`)          |
| Services list                  | `src/data/services/services.js`                     |
| FAQ                            | `src/data/services/faq.js`                          |
| Why choose me                  | `src/data/services/whyChooseMe.js`                  |
| Services page contact CTA      | `src/data/services/contact.js`                      |
| Publications                   | `src/data/research/research.js`                     |
| Experience timeline            | `src/data/experience/experience.js`                 |
| Contact form labels & services | `src/data/contact/form.js`                          |
| Footer                         | `src/data/footer/footer.js`                         |
| Social links                   | `src/data/socialLinks/socialLinks.js`               |
| Quranic verses                 | `src/data/quran/quran.js`                           |
| Per-page SEO                   | `src/data/*/metadata.js` or route `header.js` files |
| Global SEO constants           | `src/lib/metadata/constants.js`                     |

After editing publications, slugs in `research.js` drive the list page, `/publications/[slug]` routes, and the sitemap on the next build.

---

## Deployment

Hosted on **Netlify** with the [Next.js runtime](https://docs.netlify.com/frameworks/next-js/overview/).

1. Connect the repository.
2. Build command: `pnpm build`
3. Set `FORMSPREE_FORM_URL` in the Netlify dashboard.
4. Optionally set `NEXT_PUBLIC_SITE_URL` to the production domain.

Netlify injects `URL` and `CONTEXT` automatically. Preview deploys use `CONTEXT=deploy-preview` (or similar) to block indexing.

---

## About Ariantika

Ariantika (also known as Ariantika Effendi) conducts research in cancer, infectious disease, and non-communicable diseases. She specializes in research design, SPSS statistical analysis, scientific writing, and translating public health data into actionable insights.

|              |                                                                      |
| ------------ | -------------------------------------------------------------------- |
| **Role**     | Epidemiology & Biostatistics Researcher                              |
| **Location** | North Sumatra, Indonesia (Medan)                                     |
| **Email**    | [ariantikaeffendi@gmail.com](mailto:ariantikaeffendi@gmail.com)      |
| **LinkedIn** | [linkedin.com/in/ariantikaa](https://www.linkedin.com/in/ariantikaa) |

**Education**

- **MPH, Epidemiology** — Universitas Sumatera Utara (2022–2024, GPA 3.85/4.00)
- **Bachelor of Public Health, Environmental Health** — Universitas Sumatera Utara (2012–2017, GPA 3.34/4.00)

**Experience**

- **Research Assistant**, Universitas Sumatera Utara Hospital — Medan (2017–present). Oncology and infectious-disease epidemiology, SPSS analysis, manuscripts, ethics submissions.
- **Administration Officer**, Adam Malik General Hospital — Medan (2021–2023). Documentation and institutional correspondence.

---

## Known Limitations

- **Publication detail pages** (`/publications/[slug]`) render a "Coming soon" placeholder. Summaries on the Publications page and in `research.js` are the most complete public descriptions.
- **Contact form** requires `FORMSPREE_FORM_URL`; otherwise submissions return `503`.

---

## Contact

For research collaboration, publication support, or general inquiries:

- **Website:** [https://ariantika.me/contact](https://ariantika.me/contact)
- **Email:** [ariantikaeffendi@gmail.com](mailto:ariantikaeffendi@gmail.com)
- **LinkedIn:** [linkedin.com/in/ariantikaa](https://www.linkedin.com/in/ariantikaa)

---

## License

Private project. All rights reserved.
