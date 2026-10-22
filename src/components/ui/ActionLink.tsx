import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { buttonStyles, type ButtonSize, type ButtonVariant } from './buttonStyles'

type ActionLinkProps = {
  /** Internal route. Rendered with react-router's <Link>. */
  to?: string
  /** External URL. Rendered as an <a>. */
  href?: string
  /** Open the link in a new tab with a safe `rel`. */
  external?: boolean
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  /** Short label shown beside the custom cursor. */
  cursorLabel?: string
  children: ReactNode
}

/**
 * A single link primitive for the whole site.
 *
 * - `to`  renders a react-router <Link> for internal navigation.
 * - `href` renders an anchor; when `external` is set it opens in a new tab
 *   with `rel="noopener noreferrer"` so the new page cannot reach back
 *   through `window.opener`.
 */
export function ActionLink({
  to,
  href,
  external = false,
  variant = 'primary',
  size = 'md',
  className = '',
  cursorLabel,
  children,
}: ActionLinkProps) {
  const classes = buttonStyles(variant, size, className)
  const cursorProps = cursorLabel
    ? { 'data-cursor': true, 'data-cursor-label': cursorLabel }
    : {}

  if (to) {
    return (
      <Link to={to} className={classes} {...cursorProps}>
        {children}
      </Link>
    )
  }

  return (
    <a
      href={href}
      className={classes}
      {...cursorProps}
      {...(external
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {})}
    >
      {children}
    </a>
  )
}
