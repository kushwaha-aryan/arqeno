import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { CodeXml, Menu, X } from 'lucide-react'
import { navLinks } from '../../config/navigation'
import { siteConfig } from '../../config/site'
import { LogoLink } from './Logo'

/**
 * Sticky site header with a responsive navigation.
 *
 * On small screens the links collapse into a panel that:
 *  - closes on route change,
 *  - closes on Escape,
 *  - locks background scrolling while open,
 *  - returns focus to the toggle button when closed.
 */
export function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Close the mobile panel whenever the route changes.
  useEffect(() => {
    setOpen(false)
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
    <header className="sticky top-0 z-50 border-b border-line bg-ink-900/85 backdrop-blur-xl">
      <div className="shell flex h-16 items-center justify-between gap-6">
        <LogoLink />

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    [
                      'relative inline-flex h-9 items-center rounded-[4px] px-3 text-[0.8125rem] transition-colors duration-200',
                      isActive
                        ? 'text-fg'
                        : 'text-fg-muted hover:text-fg',
                    ].join(' ')
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span
                        aria-hidden="true"
                        className={[
                          'absolute inset-x-3 -bottom-px h-px transition-colors duration-200',
                          isActive ? 'bg-accent' : 'bg-transparent',
                        ].join(' ')}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${siteConfig.name} on GitHub`}
            className="hidden size-9 place-items-center rounded-[4px] border border-transparent text-fg-muted transition-colors duration-200 hover:border-line-strong hover:text-fg sm:grid"
          >
            <CodeXml aria-hidden="true" className="size-4" />
          </a>

          <Link
            to="/contact"
            className="hidden h-9 items-center rounded-[4px] border border-line-strong px-3.5 text-[0.8125rem] text-fg transition-colors duration-200 hover:border-accent/60 hover:text-accent-soft lg:inline-flex"
          >
            Discuss a project
          </Link>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid size-9 place-items-center rounded-[4px] border border-line-strong text-fg transition-colors duration-200 hover:border-accent/60 md:hidden"
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
        className="border-t border-line bg-ink-950/98 backdrop-blur-xl md:hidden"
      >
        <nav aria-label="Mobile" className="shell py-6">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.to} className="border-b border-line last:border-b-0">
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    [
                      'group flex items-baseline justify-between gap-4 py-4 transition-colors duration-200',
                      isActive ? 'text-fg' : 'text-fg-muted',
                    ].join(' ')
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="font-display text-lg tracking-[-0.02em]">
                        {link.label}
                      </span>
                      <span className="flex-1 text-right text-xs text-fg-subtle">
                        {isActive ? 'Current page' : link.description}
                      </span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-3">
            <Link
              to="/contact"
              className="inline-flex h-11 items-center justify-center rounded-[4px] bg-accent text-sm font-medium text-ink-950 transition-colors duration-200 hover:bg-accent-soft"
            >
              Discuss a project
            </Link>
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-[4px] border border-line-strong text-sm text-fg transition-colors duration-200 hover:border-accent/60"
            >
              <CodeXml aria-hidden="true" className="size-4" />
              GitHub
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
