import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'

type ExternalLinkProps = {
  href: string
  className?: string
  /** Describe the destination for screen readers, e.g. "PortraitLab AI repository". */
  label: string
  /** Short label shown beside the custom cursor. */
  cursorLabel?: string
  children: ReactNode
  showIcon?: boolean
}

/**
 * Anchor for outbound links. Always opens in a new tab with a safe `rel`,
 * and marks the destination with an accessible label plus an icon that is
 * hidden from assistive technology.
 */
export function ExternalLink({
  href,
  className = '',
  label,
  cursorLabel = 'OPEN',
  children,
  showIcon = true,
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      data-cursor
      data-cursor-label={cursorLabel}
      className={className}
    >
      {children}
      {showIcon ? (
        <ArrowUpRight
          aria-hidden="true"
          className="arrow-nudge size-3.5 shrink-0"
        />
      ) : null}
    </a>
  )
}
