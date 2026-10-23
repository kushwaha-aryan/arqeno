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

/**
 * Emits `404.html` as a copy of the built `index.html` shell.
 *
 * Cloudflare Pages only displays `404.html` — and only returns an actual 404
 * status — when a request matches neither a static asset nor a `_redirects`
 * rule. Without this file the project is treated as a SPA and every unknown
 * URL answers `200`. Copying the built shell means the not-found page still
 * boots the same React app (and renders the branded NotFoundPage) while the
 * HTTP status is finally honest.
 */
function notFoundShellPlugin(): Plugin {
  return {
    name: 'arqeno-404-shell',
    apply: 'build',
    // Vite's own HTML plugin adds index.html to the bundle during
    // generateBundle, so this has to run after it.
    enforce: 'post',
    generateBundle(_options, bundle) {
      const shell = Object.values(bundle).find(
        (file) => file.type === 'asset' && file.fileName === 'index.html',
      )

      if (!shell || shell.type !== 'asset') {
        // Silently shipping without 404.html would put every unknown URL
        // back to a 200, so treat it as a build failure instead.
        this.error('arqeno-404-shell: built index.html not found in the bundle')
        return
      }

      // index.html is the shell for every real route, so it must stay
      // indexable. 404.html is only ever served for unknown paths, so it
      // starts out as noindex before React even boots.
      const marker = '<meta name="robots" content="index, follow" />'
      const source = String(shell.source)

      if (!source.includes(marker)) {
        this.warn(
          'arqeno-404-shell: robots meta tag not found; 404.html keeps the indexable default',
        )
      }

      this.emitFile({
        type: 'asset',
        fileName: '404.html',
        source: source.replace(
          marker,
          '<meta name="robots" content="noindex, follow" />',
        ),
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), siteUrlPlugin(), notFoundShellPlugin()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
