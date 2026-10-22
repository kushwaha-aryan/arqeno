/**
 * Generates `public/sitemap.xml` and `public/robots.txt` from the canonical
 * site URL in `src/config/site.json`.
 *
 * Run automatically before `vite build`. Run it by hand with:
 *   node scripts/generate-sitemap.mjs
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')

const { url } = JSON.parse(
  readFileSync(join(root, 'src/config/site.json'), 'utf8'),
)

const base = url.replace(/\/$/, '')

/** The public routes of the site. */
const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/projects', priority: '0.9', changefreq: 'weekly' },
  { path: '/services', priority: '0.8', changefreq: 'monthly' },
  { path: '/about', priority: '0.6', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'yearly' },
]

/**
 * The most recent edit time across `src/`, used as `lastmod`. Using the real
 * modification time keeps the sitemap honest instead of stamping every build
 * with today's date.
 */
function latestSourceChange(directory) {
  let latest = 0

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const fullPath = join(directory, entry.name)
    if (entry.isDirectory()) {
      latest = Math.max(latest, latestSourceChange(fullPath))
    } else {
      latest = Math.max(latest, statSync(fullPath).mtimeMs)
    }
  }

  return latest
}

const lastmod = new Date(latestSourceChange(join(root, 'src')))
  .toISOString()
  .slice(0, 10)

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${base}${route.path === '/' ? '/' : route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

const robots = `# Arqeno — ${base}
User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`

writeFileSync(join(root, 'public/sitemap.xml'), sitemap, 'utf8')
writeFileSync(join(root, 'public/robots.txt'), robots, 'utf8')

console.log(`sitemap.xml and robots.txt written for ${base} (lastmod ${lastmod})`)
