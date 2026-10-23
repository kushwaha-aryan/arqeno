import { Link } from 'react-router-dom'
import { siteConfig } from '../../config/site'

type LogoProps = {
  className?: string
  /** Hide the wordmark and show the mark only. */
  markOnly?: boolean
}

/**
 * The Arqeno mark.
 *
 * The supplied logo artwork is a dark tile carrying the angular mark with a
 * small wordmark beneath it. At navigation size that wordmark collapses into
 * noise, so `public/logo-mark.png` is the artwork cropped to the mark alone
 * and the wordmark is set here in the site's display face — which keeps it
 * typographically correct at every size and on every background.
 *
 * Source artwork:
 * https://raw.githubusercontent.com/kushwaha-aryan/storage/refs/heads/main/arqeno-logo.png
 */
export function Logo({ className = '', markOnly = false }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src="/logo-mark.png"
        alt={markOnly ? siteConfig.name : ''}
        width={32}
        height={32}
        decoding="async"
        className="size-8 shrink-0 rounded-[4px]"
      />

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
