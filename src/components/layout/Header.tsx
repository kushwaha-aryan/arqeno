import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowUpRight, CodeXml, Menu, X } from 'lucide-react'
import { navLinks } from '../../config/navigation'
import { siteConfig } from '../../config/site'
import { LinkedInIcon } from '../ui/LinkedInIcon'
import { LogoLink } from './Logo'

/**
 * Sticky site header with a responsive navigation.
 *
 * On wide screens the active link is marked with a cobalt rule that slides
 * between items, and the whole bar condenses onto a blurred paper
 * background once the page scrolls. A hairline across the bottom fills with
 * cobalt as the page is read. On small screens the links collapse into a
 * panel that:
 *  - closes on route change,
 *  - closes on Escape,
 *  - locks background scrolling while open,
 *  - returns focus to the toggle button when closed.
 */
export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(
    null,
  )

  const location = useLocation()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)

  // Close the mobile panel whenever the route changes.
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // A hairline separates the header once the page has scrolled, and the
  // progress bar fills with the amount of the page that has been read.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12)

      const doc = document.documentElement
      const scrollable = doc.scrollHeight - window.innerHeight
      const progress =
        scrollable > 0
          ? Math.min(1, Math.max(0, window.scrollY / scrollable))
          : 0

      const bar = progressRef.current
      if (bar) {
        bar.style.transform = `scaleX(${progress})`
        bar.classList.toggle('is-active', progress > 0.002)
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Position the sliding indicator under the active link.
  useEffect(() => {
    const list = listRef.current
    if (!list) return

    const measure = () => {
      const active = list.querySelector<HTMLElement>('[data-active="true"]')
      if (!active) {
        setIndicator(null)
        return
      }
      setIndicator({ left: active.offsetLeft, width: active.offsetWidth })
    }

    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(list)
    window.addEventListener('resize', measure)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [location.pathname])

  // Escape closes the panel.
  useEffect(() => {
    if (!open) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  // Lock background scrolling while the panel is open.
  useEffect(() => {
    if (!open) return

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  // Move focus into the panel when it opens.
  useEffect(() => {
    if (!open) return
    const firstLink = panelRef.current?.querySelector<HTMLAnchorElement>('a')
    firstLink?.focus()
  }, [open])

  return (
    <header
      className={[
        'sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300',
        scrolled
          ? 'border-b border-line bg-paper/88 shadow-soft backdrop-blur-md'
          : 'border-b border-transparent bg-paper',
      ].join(' ')}
    >
      <div className="shell flex h-[4.5rem] items-center justify-between gap-6">
        <LogoLink />

        <nav aria-label="Primary" className="hidden md:block">
          <ul ref={listRef} className="relative flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  data-cursor
                  data-cursor-label={link.label.toUpperCase()}
                  className={({ isActive }) =>
                    [
                      'group relative inline-flex h-9 items-center px-3 text-[0.8125rem] tracking-[-0.005em] transition-colors duration-200',
                      isActive
                        ? 'text-ink'
                        : 'text-ink-muted hover:bg-surface-muted hover:text-ink',
                    ].join(' ')
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        data-active={isActive ? 'true' : 'false'}
                        className="inline-block"
                      >
                        {link.label}
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-ink-subtle transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}

            {/* The single accent rule that marks the current page. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-0 h-0.5 bg-accent transition-[transform,width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                width: indicator?.width ?? 0,
                transform: `translateX(${indicator?.left ?? 0}px)`,
                opacity: indicator ? 1 : 0,
              }}
            />
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${siteConfig.name} on GitHub`}
            data-cursor
            data-cursor-label="GITHUB"
            className="hidden size-9 place-items-center border border-line text-ink-muted transition-colors duration-200 hover:border-ink/25 hover:bg-surface-muted hover:text-ink sm:grid"
          >
            <CodeXml aria-hidden="true" className="size-4" />
          </a>

          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${siteConfig.name} on LinkedIn`}
            data-cursor
            data-cursor-label="LINKEDIN"
            className="hidden size-9 place-items-center border border-line text-ink-muted transition-colors duration-200 hover:border-ink/25 hover:bg-surface-muted hover:text-ink sm:grid"
          >
            <LinkedInIcon className="size-3.5" />
          </a>

          <Link
            to="/contact"
            data-cursor
            data-cursor-label="HELLO"
            className="group hidden h-9 items-center gap-1.5 bg-ink px-4 text-[0.8125rem] font-medium text-white transition-colors duration-200 hover:bg-ink-hover lg:inline-flex"
          >
            Start a project
            <ArrowUpRight aria-hidden="true" className="arrow-nudge size-3.5" />
          </Link>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid size-9 place-items-center border border-line text-ink transition-colors duration-200 hover:border-ink/25 hover:bg-surface-muted md:hidden"
          >
            {open ? (
              <X aria-hidden="true" className="size-4" />
            ) : (
              <Menu aria-hidden="true" className="size-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation panel */}
      <div
        id="mobile-navigation"
        ref={panelRef}
        hidden={!open}
        className="border-t border-line bg-surface md:hidden"
      >
        <nav aria-label="Mobile" className="shell py-4">
          <ul className="flex flex-col">
            {navLinks.map((link, index) => (
              <li key={link.to} className="border-b border-line">
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    [
                      'group flex items-baseline gap-4 py-4 transition-colors duration-200',
                      isActive ? 'text-ink' : 'text-ink-muted',
                    ].join(' ')
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        aria-hidden="true"
                        className="label-mono w-6 shrink-0 tabular-nums text-accent"
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="font-display text-2xl tracking-[-0.015em]">
                        {link.label}
                      </span>
                      <span className="ml-auto text-right text-xs text-ink-subtle">
                        {isActive ? 'Current page' : link.description}
                      </span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-3 pb-2">
            <Link
              to="/contact"
              className="group inline-flex h-11 items-center justify-center gap-1.5 bg-ink text-sm font-medium text-white transition-colors duration-200 hover:bg-ink-hover"
            >
              Start a project
              <ArrowUpRight aria-hidden="true" className="arrow-nudge size-3.5" />
            </Link>
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 border border-line-strong text-sm text-ink transition-colors duration-200 hover:border-ink/30 hover:bg-surface-muted"
            >
              <CodeXml aria-hidden="true" className="size-4" />
              GitHub
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 border border-line-strong text-sm text-ink transition-colors duration-200 hover:border-ink/30 hover:bg-surface-muted"
            >
              <LinkedInIcon className="size-4" />
              LinkedIn
            </a>
          </div>
        </nav>
      </div>

      {/* How much of the page has been read. Decorative only. */}
      <span ref={progressRef} aria-hidden="true" className="scroll-progress" />
    </header>
  )
}
