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
      aside={
        <Link
          to="/services"
          className="group inline-flex items-center gap-2 text-sm text-fg-muted transition-colors duration-200 hover:text-accent-soft"
        >
          Service details
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      }
    >
      <ul className="border-t border-line">
        {services.map((service, index) => (
          <li key={service.id} className="border-b border-line">
            <Link
              to="/services"
              className="group grid gap-3 py-7 transition-colors duration-300 hover:bg-ink-850/60 sm:grid-cols-[4rem_1fr_2rem] sm:items-baseline sm:gap-6 sm:px-4"
            >
              <span className="label-mono text-fg-subtle tabular-nums">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span>
                <span className="block font-display text-lg tracking-[-0.02em] text-fg transition-colors duration-200 group-hover:text-accent-soft sm:text-xl">
                  {service.title}
                </span>
                <span className="mt-2 block max-w-2xl text-sm leading-relaxed text-fg-muted">
                  {service.description}
                </span>
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="hidden size-4 self-center text-fg-subtle transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent sm:block"
              />
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}
