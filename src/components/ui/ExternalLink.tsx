import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'

type ExternalLinkProps = {
  href: string
  className?: string
  /** Describe the destination for screen readers, e.g. "PortraitLab AI repository". */
  label: string
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
  children,
  showIcon = true,
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={className}
    >
      {children}
      {showIcon ? (
        <ArrowUpRight
          aria-hidden="true"
          className="size-3.5 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      ) : null}
    </a>
  )
}
