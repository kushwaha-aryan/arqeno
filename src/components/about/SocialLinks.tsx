import { CodeXml, Globe, Mail, Trophy } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { SocialLink } from '../../config/founder'
import { LinkedInIcon } from '../ui/LinkedInIcon'

const icons: Record<string, LucideIcon> = {
  GitHub: CodeXml,
  LeetCode: Trophy,
  Website: Globe,
  Email: Mail,
}

/**
 * Renders a member's verified social links. Links without a URL are never
 * rendered, so an unconfigured profile simply does not appear.
 */
export function SocialLinks({ links }: { links: SocialLink[] }) {
  if (links.length === 0) return null

  return (
    <ul className="flex flex-wrap items-center gap-2">
      {links.map((link) => {
        const Icon = icons[link.label]
        return (
          <li key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
              data-cursor-label={link.label.toUpperCase()}
              className="inline-flex h-9 items-center gap-2 border border-line px-3 text-[0.8125rem] text-ink-muted transition-colors duration-200 hover:border-accent/60 hover:text-accent"
            >
              {link.label === 'LinkedIn' ? (
                <LinkedInIcon className="size-3.5" />
              ) : Icon ? (
                <Icon aria-hidden="true" className="size-4" />
              ) : null}
              {link.label}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
