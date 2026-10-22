import { Link } from 'react-router-dom'
import { siteConfig } from '../../config/site'

type LogoProps = {
  className?: string
  /** Hide the wordmark and show the monogram only. */
  markOnly?: boolean
}

/**
 * The Arqeno logo: a hairline square with an angled "A" and the wordmark.
 * Rendered as inline SVG so it needs no network request and inherits colour.
 */
export function Logo({ className = '', markOnly = false }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative grid size-8 place-items-center overflow-hidden rounded-[4px] border border-line-strong bg-ink-800 transition-colors duration-200 group-hover:border-accent/60">
        <svg
          viewBox="0 0 32 32"
          aria-hidden="true"
          className="size-full text-accent-soft"
          fill="none"
        >
          <path
            d="M7 25 L16 7 L25 25"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
          <path
            d="M11.5 18 H20.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="square"
          />
        </svg>
      </span>
      {markOnly ? null : (
        <span className="font-display text-[0.95rem] font-semibold tracking-[-0.02em] text-fg">
          {siteConfig.name}
        </span>
      )}
    </span>
  )
}

/** A standalone home link that also serves as the "skip to content" target. */
export function LogoLink() {
  return (
    <Link
      to="/"
      className="group inline-flex items-center rounded-[4px]"
      aria-label={`${siteConfig.name} — home`}
    >
      <Logo />
    </Link>
  )
}
