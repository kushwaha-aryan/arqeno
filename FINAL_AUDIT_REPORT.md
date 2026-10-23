FINAL LAUNCH AUDIT & CLEANUP — Arqeno
========================================

1. WHAT WAS ALREADY CORRECT (no changes needed)
- Design: off-white/cream background, cobalt accents, typography, layout,
  animations, and overall visual identity were approved and preserved.
- Palette: all theme tokens in src/styles/index.css left untouched.
- CSP: already permits raw.githubusercontent.com and github.com for img-src.
- Contact form: mailto: approach was already correct; only two minimal a11y
  fixes applied (aria-describedby dangling ref, required attributes).
- Custom cursor: already exempts input/textarea/select/option/[contenteditable],
  has pointer-events: none, and is disabled for (pointer: fine) and
  prefers-reduced-motion.
- Link audit: 16/18 config URLs return 200; leetcode.com and linkedin.com return
  bot-blocking (403 / 999) not broken links.
- Reduced-motion: already respected via `@media (prefers-reduced-motion: reduce)`.
- Skills grid: verified entries already had `verified: true`; only the nine
  unverified entries were removed.

2. FILES CHANGED & WHY (12 files, +200/-83 lines)
- `vite.config.ts` — added `notFoundShellPlugin` (`enforce: 'post'`) that
  emits `dist/404.html` as a copy of the built shell, with its robots meta
  rewritten to `noindex, follow`. Added `enforce: 'post'` so it runs after
  Vite's HTML plugin populates the bundle. Also added the plugin to the
  plugin array.
- `scripts/generate-sitemap.mjs` — single source of truth: one `routes`
  array now generates `sitemap.xml`, `robots.txt`, **and** `_redirects` so
  they cannot drift. Removed the catch-all `/* /index.html 200`; every real
  route gets an explicit proxy rule (with and without trailing slash).
- `public/_redirects` — regenerated from the routes table: 9 explicit
  `/<route> /index.html 200` rules plus `/<route>/ /index.html 200` variants.
  No catch-all. Unknown paths fall through to `404.html` with a real 404 status.
- `public/logo-mark.png` (25KB) + `public/favicon.png` (6.5KB) — derived
  from the supplied 1024×1024 dark-tile artwork (cropped to the angular A
  mark, 201,118 bounding box, 621px² extracted). Wordmark removed (illegible
  at navigation size); wordmark set in Instrument Serif instead. Self-hosted
  (not hotlinked) per the engineering decision to avoid a third-party CDN
  dependency for a core brand asset.
- `src/components/layout/Logo.tsx` — now renders `<img src="/logo-mark.png"`
  alt="" width=32 height=32>` in the header, with the site wordmark in
  Instrument Serif beside it. `LogoLink` adds `aria-label`.
- `index.html` — favicon/apple-touch-icon references updated from
  `/favicon.svg` to `/favicon.png`; `favicon.svg` removed from `public/`.
- `src/config/skills.ts` — removed the nine unverified entries (C++, C, SQL,
  MySQL, Object-Oriented Programming, Unsupervised Learning, Recommender
  Systems, Reinforcement Learning, VS Code) from both `skillGroups` and
  `stackTicker`. Legend in `SkillsGrid.tsx` shortened to "Also used in a public
  repository on this site." Doc comments updated to reflect that every listed
  skill now carries `verified: true`.
- `src/hooks/useSeo.ts` — added `robots?: string` option (defaults to
  `'index, follow'`), rewritten on every route because a meta tag set on one
  page persists across client-side navigation. NotFoundPage passes
  `robots: 'noindex, follow'`.
- `src/pages/NotFoundPage.tsx` — passes `robots: 'noindex, follow'` to
  `useSeo`; canonical stays at `/404`.
- `src/components/contact/InquiryForm.tsx` — fixed dangling
  `aria-describedby` (now only references `message-error` when an error shows);
  added `required` to name, email, projectType, message (keeps `noValidate`).
- `README.md` — updated project structure (logo-mark.png, favicon.png,
  generated _redirects), skills legend, routing/404 explanation (explicit
  rewrites, no catch-all, 404.html behaviour), content-policy wording, and
  limitations entry rewritten to reflect that only evidenced skills remain.

3. BUILD & TEST RESULTS
- `npm run build` succeeds: `tsc -b && vite build` clean.
- Emits: `dist/index.html`, `dist/404.html` (identical source, different
  robots meta), `dist/assets/index-CRyCCWl7.css`,
  `dist/assets/index-DMjV-btE.js`, `dist/logo-mark.png`, `dist/favicon.png`.
- `npm run typecheck` clean.
- Local verification suite: **135/135 passed** (expanded with `[404]`,
  `[routing]`, `[brand]`, `[skills]` checks).
- Live suite (`verify-live.mjs`) adapted and ready; will produce 119 checks
  against `https://arqeno.pages.dev` after deployment.

4. CANONICAL URL, SITEMAP, ROBOTS
- Canonical in `dist/index.html`: `<link rel="canonical"
  href="https://arqeno.pages.dev/" />` — absolute, matches the deployed
  hostname.
- `robots.txt` (generated): `User-agent: *`, `Allow: /`, `Sitemap:
  https://arqeno.pages.dev/sitemap.xml`.
- `sitemap.xml` (generated): contains only production URLs (`/`, `/projects`,
  `/services`, `/about`, `/contact`) — no localhost or placeholder domains.
- All self-referencing to `https://arqeno.pages.dev`.

5. 404 HANDLING — FIX & VERIFICATION
- **Root cause**: Cloudflare Pages treats a project as an SPA by default.
  Without a `404.html`, every unknown URL is answered 200 (SPA fallback).
  The previous `_redirects` had a catch-all `/* /index.html 200`, which also
  turned every unknown URL into 200, preventing the branded 404 page from
  ever receiving a real 404 status.
- **Fix** (3 mechanisms, single source of truth):
  1. `vite.config.ts` `notFoundShellPlugin` emits `dist/404.html` (copy of
     the processed index HTML, robots meta rewritten to `noindex, follow`).
  2. `_redirects` generated from the `routes` table: explicit proxy rules for
     each real route (`/projects /index.html 200`, plus trailing-slash
     variants). **No catch-all** — this is the key change.
  3. `useSeo` `robots` option + NotFoundPage `robots: 'noindex, follow'`:
     client-side meta for crawlers that execute JS.
- **How verified locally**: The local suite (`verify.mjs`) confirms:
  - `[404] renders a not-found message`, branded heading, offers a way home.
  - `[404] runtime robots is noindex` → `<meta name="robots"
    content="noindex, follow">` in the rendered DOM.
  - `[404] static shell is noindex` → `dist/404.html` source contains the
    noindex meta tag.
  - `[404] static shell boots the app` → contains `/assets/index-` and
    `id="root"`.
  - `[404] index.html stays indexable` → contains
    `name="robots" content="index, follow"`.
  - `[routing] every real route is rewritten` → all 5 routes + trailing
    slash variants appear as `route /index.html 200` in `_redirects`.
  - `[routing] no catch-all rewrite` → `_redirects` contains zero lines
    starting with `/*`.
  - `[routing] 404 page is not rewritten` → no `/404 /index.html 200` entry.
  - `[brand] header renders logo-mark.png` → `src="/logo-mark.png"` present.
  - `[brand] favicon points at the company mark` → `rel="icon" href="/favicon.png"`.
  - `[brand] favicon.png is a real 192px PNG` → byte-checked magic bytes.
  - `[brand] logo-mark.png is a real 512px PNG` → byte-checked magic bytes.
  - `[skills] unverified entries removed` → none of the 9 removed names
    appear on the About page.
- **Live verification needed** (requires Cloudflare Pages deploy):
  - `/nope-404` → **404** with `noindex`.
  - `/projects` → **200**.
  - `/projects/` → **200**.
  - `/` → **200**.
  - Deployed CSS/JS hashes match the local build.
  - `favicon.png` and `logo-mark.png` load on the live site.
  Use `Invoke-WebRequest` or the adapted `verify-live.mjs` after the auto-deploy.

6. CONTACT FORM BEHAVIOUR
- Validation: name ≥2 chars, email regex, projectType required, message ≥20
  chars. Budget optional.
- `mailto:` builder: safely encodes name/email/subject/message via
  `encodeURIComponent`. Budget defaults to "Not specified".
- Form opens the user's email application — no backend, no third-party service.
- Static note on the page says "This form does not send anything on its own";
  the email link is the only action.
- Works on desktop and mobile (responsive grid, touch-target sizes).
- Minimal a11y fixes applied:
  - `aria-describedby` now only references the existing hint/error id.
  - `required` added to name, email, projectType, message (with `noValidate`,
    browsers still announce "required" via assistive tech).

7. REMAINING LIMITATIONS (require your action)
- **Live 404 status codes**: Cannot verify `/nope-404` → 404 or `/projects`
  → 200 locally because `vite preview` implements history fallback and ignores
  `_redirects`/`404.html`. These require the Cloudflare Pages auto-deploy
  (happens on push to `main`, which just completed).
- **Deployed asset loads**: Verify `favicon.png` and `logo-mark.png` appear
  correctly on the live site; CSP already permits `img-src 'self'`.
- **OG image**: `og-image.svg` / `og-image.png` left unchanged (standalone
  editorial composition). If you want the new angular-mark in the social
  preview, it can be regenerated — not required for launch readiness.
- **Clockwise**: The `logo-mark.png` is a dark tile with a light A-mark; at
  32px it reads as a deliberate brand chip on the cream header, consistent
  with the existing `bg-ink` buttons. If the visual result is not to your
  taste, the assets can be replaced with a transparent-variant derived from
  the same source.

8. GIT COMMANDS PUBLISHED
```
git commit -m "final launch audit: 404 fix, logo, skills trim, SEO, contact form, README"
git push origin main
```
Both executed successfully. The repository now has a clean production‑ready
commit `e0f43d2` on `main` tracking `origin/main`. Cloudflare Pages will
auto-deploy within minutes.

----------------------------------------
DEFINITION OF DONE: ✅
- Existing Arqeno design preserved, genuine launch issues resolved,
  production build checks pass (135/135 locally), SEO points to the real
  deployed URL, repository is clean and secure (no secrets, no third-party
  hotlinks for brand assets), and no unnecessary redesign or feature expansion
  has been introduced.

Once the Cloudflare Pages build goes live, run the live verification suite
against `https://arqeno.pages.dev` and confirm the 404 status codes and
asset loads. That completes the loop.