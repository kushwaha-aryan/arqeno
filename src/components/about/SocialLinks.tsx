import { Briefcase, CodeXml, Globe, Mail, Trophy } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { SocialLink } from '../../config/founder'

const icons: Record<string, LucideIcon> = {
  GitHub: CodeXml,
  LinkedIn: Briefcase,
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
              className="inline-flex h-9 items-center gap-2 rounded-[4px] border border-line px-3 text-[0.8125rem] text-fg-muted transition-colors duration-200 hover:border-accent/60 hover:text-accent-soft"
            >
              {Icon ? <Icon aria-hidden="true" className="size-4" /> : null}
              {link.label}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
