import { Link } from 'react-router-dom'
import { siteConfig } from '../../config/site'

type LogoProps = {
  className?: string
  /** Hide the wordmark and show the mark only. */
  markOnly?: boolean
}

/**
 * The Arqeno mark: four crop marks around a single cobalt point — a
 * viewfinder, drawn in inline SVG so it needs no network request and
 * inherits the surrounding colour.
 */
export function Logo({ className = '', markOnly = false }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative grid size-7 place-items-center">
        <svg
          viewBox="0 0 32 32"
          aria-hidden="true"
          className="size-full text-ink"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="square"
        >
          <path d="M4 11V5h6" opacity="0.5" />
          <path d="M28 11V5h-6" opacity="0.5" />
          <path d="M4 21v6h6" opacity="0.5" />
          <path d="M28 21v6h-6" opacity="0.5" />
          <circle
            cx="16"
            cy="16"
            r="2.6"
            fill="var(--color-accent)"
            stroke="none"
          />
        </svg>
      </span>

      {markOnly ? null : (
        <span className="font-display text-[1.15rem] leading-none tracking-[-0.015em] text-ink">
          {siteConfig.name}
        </span>
      )}
    </span>
  )
}

/** A standalone home link, also used as the site identity in the header. */
export function LogoLink() {
  return (
    <Link
      to="/"
      className="group inline-flex items-center rounded-[3px]"
      aria-label={`${siteConfig.name} — home`}
      data-cursor
      data-cursor-label="HOME"
    >
      <Logo />
    </Link>
  )
}
