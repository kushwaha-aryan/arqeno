import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import siteJson from './src/config/site.json'

/**
 * Injects the canonical site URL into `index.html`.
 *
 * The URL lives in `src/config/site.json` so the app, the sitemap script
 * and the static HTML shell can never disagree. `%SITE_URL%` placeholders in
 * `index.html` are replaced at build time (and in dev) with that value.
 */
function siteUrlPlugin(): Plugin {
  const siteUrl = siteJson.url.replace(/\/$/, '')

  return {
    name: 'arqeno-site-url',
    transformIndexHtml(html) {
      return html.replaceAll('%SITE_URL%', siteUrl)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), siteUrlPlugin()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
