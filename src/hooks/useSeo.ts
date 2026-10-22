import { useEffect, useMemo } from 'react'
import { absoluteUrl, siteConfig } from '../config/site'

type MetaTag = {
  /** Either `name` (e.g. "description") or `property` (e.g. "og:title"). */
  key: 'name' | 'property'
  value: string
  content: string
}

function upsertMeta({ key, value, content }: MetaTag) {
  const selector = key === 'name' ? `name="${value}"` : `property="${value}"`
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${selector}]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(key, value)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function upsertCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  )

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'canonical')
    document.head.appendChild(element)
  }

  element.setAttribute('href', href)
}

function upsertJsonLd(data: object) {
  const id = 'arqeno-jsonld'
  document.getElementById(id)?.remove()

  const script = document.createElement('script')
  script.id = id
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(data)
  document.head.appendChild(script)
}

export type SeoOptions = {
  /** Page title. The site name is appended automatically. */
  title: string
  description: string
  /** Site-relative path, e.g. "/projects". */
  path: string
  /** Social preview image. Site-relative paths are resolved to absolute. */
  image?: string
  /** Open Graph type. */
  type?: 'website' | 'article' | 'profile'
  /** Extra structured data merged into the page's JSON-LD graph. */
  jsonLd?: Record<string, unknown>
}

/**
 * Builds the document title for a route.
 *
 * The site name is appended to the page name, except when the page name
 * already carries it — the home page's title starts with "Arqeno", so
 * appending it again would read "Arqeno — an independent software studio —
 * Arqeno".
 */
function fullDocumentTitle(title: string) {
  return title.startsWith(siteConfig.name)
    ? title
    : `${title} — ${siteConfig.name}`
}

/**
 * Keeps the document head in sync with the current route.
 *
 * A single-page app only ships one HTML document, so the title, description,
 * canonical URL, social tags and structured data are rewritten on every
 * navigation. Crawlers that execute JavaScript — which includes Google —
 * read these values after the route renders.
 */
export function useSeo({
  title,
  description,
  path,
  image = '/og-image.png',
  type = 'website',
  jsonLd,
}: SeoOptions) {
  // Stable string key so an inline object literal does not retrigger the
  // structured-data effect on every render.
  const jsonLdKey = useMemo(
    () => (jsonLd ? JSON.stringify(jsonLd) : ''),
    [jsonLd],
  )

  useEffect(() => {
    const fullTitle = fullDocumentTitle(title)
    const url = absoluteUrl(path)
    const imageUrl = absoluteUrl(image)

    document.title = fullTitle

    upsertMeta({ key: 'name', value: 'description', content: description })
    upsertCanonical(url)

    upsertMeta({ key: 'property', value: 'og:title', content: fullTitle })
    upsertMeta({ key: 'property', value: 'og:description', content: description })
    upsertMeta({ key: 'property', value: 'og:url', content: url })
    upsertMeta({ key: 'property', value: 'og:type', content: type })
    upsertMeta({ key: 'property', value: 'og:site_name', content: siteConfig.name })
    upsertMeta({ key: 'property', value: 'og:locale', content: siteConfig.locale })
    upsertMeta({ key: 'property', value: 'og:image', content: imageUrl })
    upsertMeta({
      key: 'property',
      value: 'og:image:alt',
      content: `${siteConfig.name} — ${title}`,
    })

    upsertMeta({ key: 'name', value: 'twitter:card', content: 'summary_large_image' })
    upsertMeta({ key: 'name', value: 'twitter:title', content: fullTitle })
    upsertMeta({ key: 'name', value: 'twitter:description', content: description })
    upsertMeta({ key: 'name', value: 'twitter:image', content: imageUrl })
  }, [title, description, path, image, type])

  useEffect(() => {
    const fullTitle = fullDocumentTitle(title)

    upsertJsonLd({
      '@context': 'https://schema.org',
      '@type': type === 'profile' ? 'ProfilePage' : 'WebPage',
      name: fullTitle,
      headline: title,
      description,
      url: absoluteUrl(path),
      inLanguage: 'en',
      isPartOf: {
        '@type': 'WebSite',
        name: siteConfig.name,
        url: siteConfig.url,
      },
      ...(jsonLdKey ? JSON.parse(jsonLdKey) : {}),
    })
  }, [title, description, path, type, jsonLdKey])
}
