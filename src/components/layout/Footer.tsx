import { Link } from 'react-router-dom'
import { CodeXml, Mail } from 'lucide-react'
import { navLinks } from '../../config/navigation'
import { siteConfig } from '../../config/site'
import { Logo } from './Logo'

/**
 * Site footer. Uses a full-width hairline grid instead of stacked columns so
 * the layout stays flat and legible on small screens.
 */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-ink-950">
      <div className="shell py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-muted">
              A founder-led software studio building digital products, web
              applications and AI-powered tools.
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="group mt-5 inline-flex items-center gap-2 text-sm text-fg-muted transition-colors duration-200 hover:text-accent-soft"
            >
              <Mail aria-hidden="true" className="size-4" />
              {siteConfig.email}
            </a>
          </div>

          <nav aria-label="Footer">
            <p className="label-mono mb-4 text-fg-subtle">Pages</p>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-fg-muted transition-colors duration-200 hover:text-fg"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label-mono mb-4 text-fg-subtle">Elsewhere</p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm text-fg-muted transition-colors duration-200 hover:text-fg"
                >
                  <CodeXml aria-hidden="true" className="size-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-fg-muted transition-colors duration-200 hover:text-fg"
                >
                  LeetCode
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-fg-subtle">
            &copy; {year} {siteConfig.legalName}. Built from scratch.
          </p>
          <p className="text-xs text-fg-subtle">
            Founder-led studio &mdash; no client testimonials or usage figures
            are published here.
          </p>
        </div>
      </div>
    </footer>
  )
}
