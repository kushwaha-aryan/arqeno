# Arqeno

The website for **Arqeno** — a founder-led software studio that builds its own
digital products and provides software development services to clients.

Built with React, TypeScript and Vite. Styled with Tailwind CSS. Deployable to
Cloudflare Pages at no cost.

---

## Contents

- [Stack](#stack)
- [Design system](#design-system)
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

| Concern     | Choice                                   | Why                                                              |
| ----------- | ---------------------------------------- | ---------------------------------------------------------------- |
| Framework   | React 19                                  | Component model, mature ecosystem                                 |
| Language    | TypeScript 5.9 (`strict`)                | Catches mistakes at build time, self-documenting code             |
| Bundler     | Vite 7                                    | Fast dev server, tiny production build                           |
| Styling     | Tailwind CSS 4 (CSS-first `@theme`)      | Design tokens live in one file, no config duplication             |
| Routing     | React Router 7                            | Client-side routes with nested layouts                           |
| Icons       | Lucide React                              | Tree-shakeable, consistent icon set                               |
| Typography  | Instrument Serif, Instrument Sans, JetBrains Mono | A display / text / label trio, self-hosted via Google Fonts |
| Hosting     | Cloudflare Pages                          | Free, static, global edge network                                |

Runtime dependencies: `react`, `react-dom`, `react-router-dom`, `lucide-react`.
Everything else is a dev dependency. No analytics, no fonts SDK, no paid
service, no API keys.

---

## Design system

The palette is deliberately **achromatic with a single chromatic signal**:
paper and ink do nearly all the work, and cobalt appears only where the eye
should go — primary buttons, the active filter, focus rings, the point in the
mark. A single ochre "signal" colour is used sparingly for status.

### Colour tokens

All tokens are CSS custom properties declared in the `@theme` block of
`src/styles/index.css`. Change a value there and the whole site follows.

| Token                   | Light      | Inverted band | Used for                              |
| ----------------------- | ---------- | ------------- | ------------------------------------- |
| `--color-paper`         | `#f7f6f3`  | `#121216`     | Page and section background           |
| `--color-surface`       | `#ffffff`  | `#1a1a20`     | Raised cards                          |
| `--color-surface-muted` | `#efede7`  | `#212129`     | Inset panels, footer container        |
| `--color-ink`           | `#121216`  | `#f7f5f0`     | Headings                              |
| `--color-ink-hover`     | `#2c2c33`  | `#ffffff`     | Heading hover                         |
| `--color-ink-soft`      | `#3d3d45`  | `#d9d6ce`     | Sub-headings                          |
| `--color-ink-muted`     | `#5a5a64`  | `#a6a39c`     | Body copy, secondary text             |
| `--color-ink-subtle`    | `#6b6b75`  | `#8b8882`     | Meta text, labels                     |
| `--color-line`          | `#e3e0d9`  | `#2d2d37`     | Hairlines                             |
| `--color-line-strong`   | `#cfcbc1`  | `#42424f`     | Emphasised borders, inputs            |
| `--color-accent`        | `#2a45d8`  | `#7b93ff`     | Primary accent                        |
| `--color-accent-soft`   | `#4058e8`  | `#98aaff`     | Accent hover                          |
| `--color-accent-deep`   | `#1e33a8`  | `#5d78f0`     | Accent pressed                        |
| `--color-on-accent`     | `#ffffff`  | `#0b1020`     | Text on an accent fill                |
| `--color-signal`        | `#9d5718`  | `#dda15f`     | Secondary accent, used sparingly      |

Three more tokens carry the atmosphere. Their alpha lives **inside the
colour**, not in an opacity modifier, because Tailwind bakes `bg-accent/20`
into a literal hex at build time — which would stop it inverting with the
band:

| Token                | Light                       | Inverted band                  |
| -------------------- | --------------------------- | ------------------------------ |
| `--color-wash`       | `rgb(42 69 216 / 0.17)`     | `rgb(123 147 255 / 0.20)`      |
| `--color-wash-soft`  | `rgb(42 69 216 / 0.08)`     | `rgb(123 147 255 / 0.10)`      |
| `--color-wash-warm`  | `rgb(157 87 24 / 0.10)`     | `rgb(221 161 95 / 0.12)`       |

### The inverted band

Dark sections are not a second theme. The `.band-ink` class **re-points the
same custom properties** to their dark values:

```css
.band-ink {
  --color-paper: #121216;
  --color-ink: #f7f5f0;
  --color-accent: #7b93ff;
  /* …and every other token */
}
```

Because Tailwind v4 emits utilities as `var(--color-*)`, everything inside the
band — type, rules, buttons, borders, accents — flips in one move, and no
second stylesheet is needed. Anything you add inside `.band-ink` inherits the
inversion for free.

> **Gotcha:** never use an opacity modifier on a theme colour inside a band
> (`bg-accent/20`). Tailwind resolves it to a literal hex at build time and it
> will not invert. Use `bg-wash` / `bg-wash-warm`, or a token with the alpha
> already inside it.

### Typography

| Role            | Face              | Notes                                        |
| --------------- | ----------------- | -------------------------------------------- |
| Display         | Instrument Serif  | Headlines, the wordmark, large numerals      |
| Body            | Instrument Sans   | Everything that is read in a sentence        |
| Labels / code   | JetBrains Mono    | Eyebrows, tags, small caps labels            |

Loaded from Google Fonts in `index.html` with `preconnect` hints. No font SDK,
no client-side loader.

### Motion vocabulary

Motion is defined as CSS utilities in `src/styles/index.css`, so it can be
applied with a class and removed by a single `prefers-reduced-motion` rule.

| Utility                    | Effect                                                     |
| -------------------------- | ---------------------------------------------------------- |
| `wash` / `wash-ink`        | Soft cobalt bloom behind a section                          |
| `aurora-blob`              | Drifting, blurred depth blob (with `aurora-a` / `aurora-b`) |
| `text-gradient`            | Accent gradient through a headline, with a drift animation  |
| `rule-flow`                | A hairline that catches a travelling highlight              |
| `marquee` / `marquee-track`| The scrolling technology ticker (pauses on hover)            |
| `sheen`                    | A light sweep across a button on hover                      |
| `border-flow`              | A conic-gradient border that rotates                         |
| `scroll-progress`          | The reading-progress bar in the header                      |
| `hero-schematic`           | The hero's node diagram, with `hero-node` pulses             |
| `float-soft`               | A slow vertical drift for the hero schematic                 |
| `page-enter`               | The route transition — a blur-and-rise                       |
| `[data-reveal]`            | Scroll-triggered reveal, via `useReveal`                    |

Every one of these is disabled under `prefers-reduced-motion: reduce`.

### Cursor

`src/components/layout/CustomCursor.tsx` draws a two-part cursor: a dot that
tracks the pointer exactly, and a ring that eases behind it (0.18 lerp). The
ring carries a contextual label on links that open in a new tab.

It is pointer-driven only — it never mounts on a coarse pointer (touch), and
it never mounts under `prefers-reduced-motion: reduce`. The native cursor is
hidden only once the custom one is running, so nothing is left without a
pointer, and the element is `pointer-events: none` throughout.

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
│   └── generate-sitemap.mjs   # writes sitemap.xml, robots.txt + _redirects
├── public/
│   ├── logo-mark.png          # company mark, cropped from the supplied artwork
│   ├── favicon.png            # 192×192 icon, same mark
│   ├── og-image.png           # 1200×630 social preview image
│   ├── og-image.svg           # vector source for the preview image
│   ├── _redirects             # Cloudflare Pages route rewrites (generated)
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
    │   ├── skills.ts          # skill groups + the hero ticker
    │   ├── services.ts        # service list + engagement process
    │   └── navigation.ts      # primary navigation links
    ├── components/
    │   ├── layout/            # Header, Footer, Layout, Logo, CustomCursor
    │   ├── ui/                # ActionLink, Section, PageHeader, ExternalLink…
    │   ├── home/              # Hero, TechMarquee, FeaturedProjects, ContactCta…
    │   ├── projects/          # ProjectCard, ProjectVisual, StatusPill
    │   ├── services/          # ServiceIcon
    │   ├── contact/           # InquiryForm
    │   └── about/             # SocialLinks, SkillsGrid
    ├── hooks/
    │   ├── useSeo.ts          # per-route title, meta, OG tags and JSON-LD
    │   └── useReveal.ts       # scroll-triggered reveal for [data-reveal]
    ├── pages/                 # one component per route
    └── styles/index.css       # design tokens, motion utilities, base styles
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
    linkedin: 'https://www.linkedin.com/in/aryan-kushwaha-608204322/',
    leetcode: 'https://leetcode.com/u/dartGoblin42/',
  },
}
```

`social.linkedin` is optional — leave it as an empty string and the LinkedIn
button disappears from the header, the footer and the contact page.

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
  visual: 'aperture',           // which generated artwork the card shows
  figure: 'Aperture study',    // the caption printed on the artwork
  highlights: ['A verifiable characteristic of the build.'],
  year: 2026,
  featured: true,                         // shown on the home page
}
```

The Projects page filters automatically by `category`, and the home page shows
everything with `featured: true`.

`visual` selects one of the hand-drawn project artworks in
`src/components/projects/ProjectVisual.tsx`. The available names are
`aperture`, `filmstrip`, `agents`, `spectrogram`, `clusters`, `document`,
`catalogue` and `tiles` — pick one per project. `figure` is the short
caption printed on the artwork.

### Skills and the technology ticker

`src/config/skills.ts` holds two things: the grouped skill list shown on the
About page, and the short labels that scroll through the hero ticker.

```ts
export const skillGroups: SkillGroup[] = [
  {
    id: 'backend',
    label: 'Backend & databases',
    items: [
      { label: 'Node.js', verified: true },
      { label: 'Express.js', verified: true },
    ],
  },
]
```

`verified: true` marks a technology that also appears in a public repository
listed on this site, so a visitor can open it and check. Every skill currently
listed carries the flag — anything added later without that evidence is still
shown as part of the founder's own account of their work, but without the dot
that invites a reader to go and read the proof.

The ticker is driven by `stackTicker` in the same file. Keep the entries short
(the strip is a single line) and only list what the studio actually ships
with.

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

**Routing, 404s and headers**

`public/_redirects` is generated by `scripts/generate-sitemap.mjs` from the
same route table as the sitemap, so the two cannot drift apart:

```
/            /index.html   200
/projects    /index.html   200
/projects/   /index.html   200
…
```

Each real route (with and without a trailing slash) is proxied to the SPA
shell, which is what makes `/projects`, `/services`, `/about` and `/contact`
work on a hard refresh or a direct link.

There is deliberately **no** catch-all `/* /index.html 200`. Cloudflare Pages
only falls back to `404.html` — and only returns a real `404` status — when a
request matches neither a static asset nor a rewrite rule, so a catch-all
would answer every unknown URL with `200`. Instead the Vite config emits
`dist/404.html` as a copy of the built shell; unknown paths reach it, the
React router renders the branded not-found page, and the response carries
`404` plus `noindex`.

Adding a page therefore means adding it to the `routes` array in
`scripts/generate-sitemap.mjs` and re-running the build. A route that is
missed will serve the 404 page rather than the route — annoying, but honest,
and immediately visible in a smoke test.

`public/_headers` sets a Content-Security-Policy,
`X-Content-Type-Options`, `Referrer-Policy` and long-lived caching for the
hashed `/assets` files. Review the CSP before adding a third-party script or
an image from another host — you will need to extend `img-src` / `script-src`.
Brand assets are self-hosted in `public/` for exactly this reason: the mark is
`public/logo-mark.png`, cropped from the supplied 1024×1024 artwork to remove
the tiny embedded wordmark that collapses into noise at navigation size. The
wordmark is set in Instrument Serif instead.

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

The skill list on the About page follows the same rule. A cobalt dot marks
the technologies that also appear in a public repository listed on this site.
Every skill currently listed carries that dot; anything added later without
the evidence is still shown, but as the founder's own account of their work
rather than as a claim a visitor can check. If a skill should not be listed
at all, remove it from `src/config/skills.ts`.

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
- `prefers-reduced-motion: reduce` disables the entrance animation, the
  scroll reveals, the ticker, the drifting blobs, the gradient drift and every
  transition.
- The custom cursor is pointer-driven only and is not rendered on touch
  devices.

**Colour contrast** (measured against the shipped tokens):

| Foreground         | On paper | On surface | On surface-muted |
| ------------------ | -------- | ---------- | ---------------- |
| `--color-ink`      | 17.29:1  | 18.69:1    | 15.96:1          |
| `--color-ink-muted`| 6.31:1   | 6.82:1     | 5.82:1           |
| `--color-ink-subtle` | 4.88:1 | 5.27:1     | 4.50:1           |
| `--color-accent`   | 6.61:1   | 7.14:1     | 6.10:1           |
| `--color-signal`   | 5.10:1   | 5.51:1     | 4.71:1           |

Inside the inverted `.band-ink` scope the same roles measure 17.15:1 (ink),
7.42:1 (muted), 5.29:1 (subtle), 6.64:1 (accent) and 8.31:1 (signal) on
paper, and 6.73:1 for text on an accent fill. Every text/background pair on
the site clears WCAG AA (4.5:1) for body text.

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
- **Only evidenced skills are listed.** The About page shows the technologies
  that also appear in the founder's public repositories. Skills without that
  evidence (C++, C, SQL, MySQL, object-oriented programming, unsupervised and
  reinforcement learning, recommender systems, VS Code) were removed rather
  than shown without a verification dot. They can be added back to
  `src/config/skills.ts` if evidence appears.

---

## Licence

Private project. All product names, repositories and marks belong to their
respective owners.
