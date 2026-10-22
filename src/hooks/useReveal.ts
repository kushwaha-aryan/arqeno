import { useLayoutEffect } from 'react'

/**
 * Reveals `[data-reveal]` elements as they scroll into view.
 *
 * The behaviour is progressive:
 *
 *  - Without JavaScript nothing is hidden at all — the CSS that hides the
 *    elements only applies once the `js` class has been added to <html>.
 *  - With `prefers-reduced-motion: reduce` the effect is skipped entirely
 *    and the content is shown immediately.
 *  - If `IntersectionObserver` is unavailable, nothing is hidden either.
 *
 * `useLayoutEffect` is deliberate: it runs before the browser paints, so
 * content that is already on screen is marked as visible in the same frame
 * and never flickers.
 */
export function useReveal(routeKey: string) {
  useLayoutEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)'),
    )

    if (targets.length === 0) return

    const show = (element: HTMLElement) => {
      element.classList.add('is-visible')
    }

    // Anything already within the first viewport is shown straight away.
    for (const element of targets) {
      if (element.getClientRects().length === 0) continue
      const rect = element.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        show(element)
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          show(entry.target as HTMLElement)
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.06 },
    )

    for (const element of targets) {
      if (!element.classList.contains('is-visible')) observer.observe(element)
    }

    return () => observer.disconnect()
  }, [routeKey])
}
