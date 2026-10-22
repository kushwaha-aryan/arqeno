import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { services } from '../../config/services'
import { Section } from '../ui/Section'

/**
 * Service overview for the home page — a flat, numbered list rather than a
 * grid of cards, which keeps the section readable and compact.
 */
export function ServicesOverview() {
  return (
    <Section
      id="services"
      eyebrow="02 — Services"
      title="What we build for clients."
      description="Four kinds of work, each scoped in writing before it starts. No long list of everything possible — only what a single founder can take responsibility for."
      tone="paper"
      aside={
        <Link
          to="/services"
          className="group inline-flex items-center gap-2 text-sm text-ink-muted transition-colors duration-200 hover:text-accent"
        >
          Service details
          <ArrowUpRight aria-hidden="true" className="arrow-nudge size-4" />
        </Link>
      }
    >
      <ul className="border-t border-line">
        {services.map((service, index) => (
          <li key={service.id} className="border-b border-line">
            <Link
              to="/services"
              className="group grid gap-3 py-7 transition-colors duration-300 hover:bg-surface-muted sm:grid-cols-[4rem_1fr_2rem] sm:items-baseline sm:gap-6 sm:px-4"
            >
              <span className="label-mono text-ink-subtle tabular-nums">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span>
                <span className="block font-display text-lg tracking-[-0.02em] text-ink transition-colors duration-200 group-hover:text-accent sm:text-xl">
                  {service.title}
                </span>
                <span className="mt-2 block max-w-2xl text-sm leading-relaxed text-ink-muted">
                  {service.description}
                </span>
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="hidden size-4 self-center text-ink-subtle transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent sm:block"
              />
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}
