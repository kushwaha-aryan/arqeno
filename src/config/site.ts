/**
 * Central site configuration for Arqeno.
 *
 * Everything that is likely to change after deployment lives here:
 *  - `url`     -> canonical site URL used for <link rel="canonical">, Open
 *                 Graph tags, sitemap.xml and robots.txt.
 *  - `email`  -> the contact fallback address used by the inquiry form.
 *  - `social` -> verified profile links rendered in the header and footer.
 *
 * Update `url` once your Cloudflare Pages domain is known. It defaults to the
 * `pages.dev` hostname that Cloudflare assigns to a new Pages project. The
 * value lives in `site.json` so the sitemap/robots build script and the app
 * can never drift apart.
 */

import siteJson from './site.json'

export const siteConfig = {
  name: 'Arqeno',
  legalName: 'Arqeno',
  /** Short, factual description used across metadata and the footer. */
  description:
    'Arqeno is a founder-led software studio building digital products, web applications and AI-powered tools, and helping clients turn ideas into working software.',
  /** Canonical origin. No trailing slash. Sourced from site.json so the build
   *  script that generates sitemap.xml and robots.txt reads the same value. */
  url: siteJson.url,
  locale: 'en_US',
  themeColor: '#0a0a0e',
  /** Contact address — used by the mailto fallback on the Contact page. */
  email: 'aryankushwaha9829@gmail.com',
  social: {
    github: 'https://github.com/kushwaha-aryan',
    leetcode: 'https://leetcode.com/u/dartGoblin42/',
  },
} as const

/** Absolute URL helper — used by the SEO hook, sitemap and JSON-LD. */
export function absoluteUrl(path: string): string {
  const base = siteConfig.url.replace(/\/$/, '')
  const suffix = path.startsWith('/') ? path : `/${path}`
  return `${base}${suffix === '/' ? '/' : suffix}`
}
