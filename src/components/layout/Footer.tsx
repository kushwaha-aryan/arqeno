import { Link } from 'react-router-dom'
import { CodeXml, Mail } from 'lucide-react'
import { navLinks } from '../../config/navigation'
import { siteConfig } from '../../config/site'
import { LinkedInIcon } from '../ui/LinkedInIcon'
import { Logo } from './Logo'

/**
 * Site footer. Deliberately minimal: the studio's own pages on one side,
 * the founder's verified profiles on the other, and nothing invented.
 */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-paper">
      <div className="shell py-14 lg:py-16">
        <div className="grid gap-10 rounded-[12px] bg-surface-muted p-8 md:grid-cols-[1.6fr_1fr_1fr] lg:p-12">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-muted">
              An independent software studio building digital products, web
              applications and AI-powered tools.
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              data-cursor
              data-cursor-label="EMAIL"
              className="link-line group mt-5 inline-flex items-center gap-2 text-sm text-ink-soft transition-colors duration-200 hover:text-ink"
            >
              <Mail aria-hidden="true" className="size-4 text-accent" />
              {siteConfig.email}
            </a>
          </div>

          <nav aria-label="Footer">
            <p className="label-mono mb-4 text-ink-subtle">Pages</p>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="link-line inline-block text-sm text-ink-muted transition-colors duration-200 hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label-mono mb-4 text-ink-subtle">Elsewhere</p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor
                  data-cursor-label="GITHUB"
                  className="group inline-flex items-center gap-2 text-sm text-ink-muted transition-colors duration-200 hover:text-ink"
                >
                  <CodeXml aria-hidden="true" className="size-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor
                  data-cursor-label="LINKEDIN"
                  className="group inline-flex items-center gap-2 text-sm text-ink-muted transition-colors duration-200 hover:text-ink"
                >
                  <LinkedInIcon className="size-4" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor
                  data-cursor-label="LEETCODE"
                  className="text-sm text-ink-muted transition-colors duration-200 hover:text-ink"
                >
                  LeetCode
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="label-mono text-ink-subtle">
            &copy; {year} {siteConfig.legalName}
          </p>
          <p className="text-xs text-ink-subtle">
            Founder-led studio &mdash; no client testimonials or usage figures
            are published here.
          </p>
        </div>
      </div>
    </footer>
  )
}
