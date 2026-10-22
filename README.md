# Arqeno

The website for **Arqeno** — a founder-led software studio that builds its own
digital products and provides software development services to clients.

Built with React, TypeScript and Vite. Styled with Tailwind CSS. Deployable to
Cloudflare Pages at no cost.

---

## Contents

- [Stack](#stack)
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [Deploying to Cloudflare Pages](#deploying-to-cloudflare-pages)
- [Content policy](#content-policy)
- [Accessibility](#accessibility)
- [SEO notes](#seo-notes)
- [Known limitations](#known-limitations)

---

## Stack

| Concern    | Choice                                   | Why                                                              |
| ---------- | ---------------------------------------- | ---------------------------------------------------------------- |
| Framework  | React 19                                  | Component model, mature ecosystem                                 |
| Language   | TypeScript 5.9 (`strict`)                | Catches mistakes at build time, self-documenting code             |
| Bundler    | Vite 7                                    | Fast dev server, tiny production build                           |
| Styling    | Tailwind CSS 4 (CSS-first `@theme`)      | Design tokens live in one file, no config duplication             |
| Routing    | React Router 7                            | Client-side routes with nested layouts                           |
| Icons      | Lucide React                              | Tree-shakeable, consistent icon set                               |
| Hosting    | Cloudflare Pages                          | Free, static, global edge network                                |

Runtime dependencies: `react`, `react-dom`, `react-router-dom`, `lucide-react`.
Everything else is a dev dependency. No analytics, no fonts SDK, no paid
service, no API keys.

---

## Getting started

**Requirements:** Node.js 20 or newer (Node 22+ recommended).

```bash
npm install     # install dependencies
npm run dev     # start the dev server on http://localhost:5173
```

Other useful commands:

```bash
npm run build     # type-check, then build to dist/
npm run preview   # serve the production build locally
npm run typecheck # type-check only
npm run sitemap   # regenerate sitemap.xml and robots.txt
```

---

## Project structure

```
arqeno/
├── index.html                 # HTML shell, fonts, default meta + JSON-LD
├── vite.config.ts             # Vite + React + Tailwind plugins
├── scripts/
│   └── generate-sitemap.mjs   # writes public/sitemap.xml + public/robots.txt
├── public/
│   ├── favicon.svg            # logo mark
│   ├── og-image.png           # 1200×630 social preview image
│   ├── og-image.svg           # vector source for the preview image
│   ├── _redirects             # Cloudflare Pages SPA fallback
│   ├── _headers               # Cloudflare Pages security + cache headers
│   ├── robots.txt             # generated
│   └── sitemap.xml            # generated
└── src/
    ├── main.tsx               # React entry point
    ├── App.tsx                # Route table
    ├── config/                # ← all editable content lives here
    │   ├── site.ts            # name, canonical URL, contact email, socials
    │   ├── site.json          # canonical URL (shared with the build script)
    │   ├── founder.ts         # founder / team entries
    │   ├── projects.ts        # project data
    │   ├── services.ts        # service list + engagement process
    │   └── navigation.ts      # primary navigation links
    ├── components/
    │   ├── layout/            # Header, Footer, Layout, Logo
    │   ├── ui/                # ActionLink, Section, PageHeader, ExternalLink…
    │   ├── home/              # Hero, FeaturedProjects, ServicesOverview…
    │   ├── projects/          # ProjectCard, StatusPill
    │   ├── services/          # ServiceIcon
    │   ├── contact/           # InquiryForm
    │   └── about/             # SocialLinks
    ├── hooks/
    │   └── useSeo.ts          # per-route title, meta, OG tags and JSON-LD
    ├── pages/                 # one component per route
    └── styles/index.css       # design tokens + base styles
```

---

## Configuration

Almost everything you are likely to change lives in `src/config/`.

### Site name, URL and contact email

`src/config/site.ts`

```ts
export const siteConfig = {
  name: 'Arqeno',
  url: siteJson.url,          // ← canonical URL
  email: 'aryankushwaha9829@gmail.com',
  social: {
    github: 'https://github.com/kushwaha-aryan',
    leetcode: 'https://leetcode.com/u/dartGoblin42/',
  },
}
```

### Canonical URL

The canonical URL lives in **`src/config/site.json`**:

```json
{ "url": "https://arqeno.pages.dev" }
```

It is read by both the app (for `<link rel="canonical">` and Open Graph tags)
and by `scripts/generate-sitemap.mjs`, so the two can never drift apart.

**After your first deployment, replace `https://arqeno.pages.dev` with your
real domain** and rebuild. The sitemap and robots file regenerate
automatically as part of `npm run build`.

> The value below is a placeholder for the `pages.dev` hostname Cloudflare
> assigns to a new Pages project. Replace it with your own before sharing the
> site.

### Contact email

The contact address is defined once, in `src/config/site.ts` (`siteConfig.email`).
The inquiry form, the footer and the contact page all read it from there — you
do not need to edit anything else to change it.

### Projects

`src/config/projects.ts` holds one entry per project. To add or edit one:

```ts
{
  slug: 'portraitlab-ai',                 // unique key
  name: 'PortraitLab AI',
  summary: 'One line for the card.',
  description: 'Two or three sentences of detail.',
  category: 'product',                    // product | prototype | research | experiment
  status: 'live',                         // live | active | prototype | research
  statusLabel: 'Live product',            // the wording shown on the card
  repoUrl: 'https://github.com/…',        // required
  demoUrl: 'https://…',                   // optional — only if verified
  tech: ['Next.js', 'TypeScript'],
  highlights: ['A verifiable characteristic of the build.'],
  year: 2026,
  featured: true,                         // shown on the home page
}
```

The Projects page filters automatically by `category`, and the home page shows
everything with `featured: true`.

### Founder and team

`src/config/founder.ts`

```ts
export const team: TeamMember[] = [
  {
    id: 'aryan-kushwaha',
    name: 'Aryan Kushwaha',
    role: 'Founder',
    photo: 'https://…/photo.jpg',
    photoAlt: 'Portrait of Aryan Kushwaha, founder of Arqeno',
    shortBio: 'One or two sentences.',
    bio: ['Longer paragraphs for the founder spotlight.'],
    links: {
      github: 'https://github.com/kushwaha-aryan',
      linkedin: '',       // ← add a verified URL to show the button
      leetcode: 'https://leetcode.com/u/dartGoblin42/',
    },
  },
]
```

The About page renders a single founder spotlight while `team` has one entry.
When you add genuine team members to the array, the page automatically switches
to a multi-person team grid — no other change is needed. Links without a URL
are never rendered, so an unverified profile simply does not appear.

### Services

`src/config/services.ts` lists the four services and the four engagement
steps. Adding a service means adding an entry with a `deliverables` array and
one of the icon names (`globe`, `user`, `layers`, `sparkles`).

---

## Scripts

| Script            | What it does                                                    |
| ----------------- | --------------------------------------------------------------- |
| `npm run dev`     | Vite dev server with hot module replacement                     |
| `npm run build`   | Regenerates sitemap/robots, type-checks, then builds to `dist/` |
| `npm run preview` | Serves the built `dist/` folder locally                        |
| `npm run typecheck` | TypeScript project check, no emit                            |
| `npm run sitemap` | Regenerates `public/sitemap.xml` and `public/robots.txt`       |

---

## Deploying to Cloudflare Pages

The project is a standard static build — no server, no database, no paid
service.

**Build settings**

| Setting          | Value           |
| ---------------- | --------------- |
| Framework preset | `Vite`          |
| Build command    | `npm run build` |
| Build output dir | `dist`          |
| Root directory   | `/` (repo root) |

Node version: set `NODE_VERSION` to `20` or newer in the Pages dashboard
(*Settings → Builds & deployments → Environment variables*).

**First deployment**

1. Push this repository to GitHub.
2. Sign in to [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers
   & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Select the repository and apply the build settings above.
4. Deploy. Cloudflare assigns a `https://<project>.pages.dev` address.
5. **Update the canonical URL** in `src/config/site.json` to that address,
   commit, and redeploy. Also update the matching `og:url` / `og:image` values
   in `index.html`.
6. Optionally attach a custom domain under *Custom domains*.

**Routing and headers**

`public/_redirects` contains the SPA fallback:

```
/*    /index.html   200
```

This makes `/projects`, `/services`, `/about` and `/contact` work on a hard
refresh or a direct link. `public/_headers` sets a Content-Security-Policy,
`X-Content-Type-Options`, `Referrer-Policy` and long-lived caching for the
hashed `/assets` files. Review the CSP before adding a third-party script or
an image from another host — you will need to extend `img-src` / `script-src`.

**After deploying**

- Submit `https://<your-domain>/sitemap.xml` in
  [Google Search Console](https://search.google.com/search-console). This
  *requests* a crawl; it does not guarantee that Google will index or rank
  the site.
- Optionally verify the domain in Google Search Console and Bing Webmaster
  Tools.

---

## Content policy

Arqeno is founder-led. The site deliberately publishes **no** invented
content:

- No client testimonials, logos or case studies.
- No revenue, user-count, traffic or award figures.
- No invented team members or company statistics.
- No unsubstantiated performance claims or guaranteed outcomes.

Every project description, technology list and status label is taken from the
project's own repository. Where a project is a prototype or a research effort
it says so, and the "Honest limits" section on the Services page states
plainly what a single founder cannot promise.

If you add a client project later, add it to `src/config/projects.ts` with
`category: 'client'`-style labelling of your choosing and a real repository or
live URL — and only publish a testimonial if the client actually gave one.

---

## Accessibility

- A skip-to-content link is the first focusable element on every page.
- One `<h1>` per page and a correct heading hierarchy (verified: no skipped
  levels on any route).
- The mobile navigation exposes `aria-expanded` and `aria-controls`, locks
  background scrolling while open, moves focus to the first link, closes on
  <kbd>Escape</kbd> and returns focus to the toggle button.
- The projects filter uses `aria-pressed` buttons and announces the result
  count through a polite live region.
- Form fields have real `<label for>` bindings, inline error messages wired
  with `aria-describedby`, and `aria-invalid` on the failing field. Submitting
  an invalid form focuses the first problem.
- External links open in a new tab with `rel="noopener noreferrer"` and carry
  a descriptive `aria-label`.
- Focus is always visible (a 2px accent outline with offset).
- `prefers-reduced-motion: reduce` disables the entrance animation and all
  transitions.
- Colour contrast: body text is `#a3a3b3` on `#0a0a0e` (≈6.4:1); accent text
  on dark surfaces clears 4.5:1.

---

## SEO notes

- Unique `<title>` and meta description per route, written by the
  `useSeo` hook in `src/hooks/useSeo.ts`.
- `<link rel="canonical">` per route, Open Graph and Twitter card tags, and a
  1200×630 preview image.
- `Organization` JSON-LD ships in the static `index.html`; each route adds
  `WebPage` JSON-LD at runtime.
- `public/sitemap.xml` and `public/robots.txt` are generated from the
  canonical URL at build time.
- Semantic landmarks (`header`, `nav`, `main`, `aside`, `footer`), one `h1`
  per page, descriptive link text and `alt` text on images.

**One honest caveat:** this is a client-rendered single-page app, so the
per-route metadata is written by JavaScript after the page loads. Search
engines that execute JavaScript — including Google — read it correctly, but a
crawler that does not will only ever see the home page's tags in the raw
HTML. If complete static per-route HTML becomes necessary, the routes can be
pre-rendered at build time; that is a deliberate future step, not something
this version claims to do.

---

## Known limitations

- **The contact form has no backend.** It validates the fields and then opens
  the visitor's own mail client with everything pre-filled via `mailto:`. It
  says so on the page rather than pretending to submit. To collect
  submissions instead, point the form at a form service (Formspree, Basin,
  a Cloudflare Worker) and update the submit handler in
  `src/components/contact/InquiryForm.tsx`.
- **Metadata is client-rendered** — see the SEO note above.
- **No analytics or error tracking** are installed, deliberately.
- The social preview image uses a Google Fonts download at build time; if you
  change the fonts, regenerate `public/og-image.png`.

---

## Licence

Private project. All product names, repositories and marks belong to their
respective owners.
