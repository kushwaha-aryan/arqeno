import { ArrowRight } from 'lucide-react'
import { ActionLink } from '../ui/ActionLink'

/**
 * Closing call to action, reused on every page.
 */
export function ContactCta({
  title = 'Have a problem worth building?',
  description = 'Tell us what you are trying to do, who it is for, and what is in the way. You will get a straight answer about whether this is a good fit.',
}: {
  title?: string
  description?: string
}) {
  return (
    <section className="border-t border-line bg-ink-950">
      <div className="shell py-20 sm:py-24 lg:py-28">
        <div className="relative overflow-hidden rounded-[6px] border border-line bg-ink-900 p-8 sm:p-12 lg:p-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 accent-bloom opacity-60"
          />
          <div className="relative max-w-2xl">
            <p className="label-mono text-fg-subtle">Let&rsquo;s talk</p>
            <h2 className="mt-5 text-3xl leading-[1.15] text-fg sm:text-4xl lg:text-[2.75rem]">
              {title}
            </h2>
            <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-fg-muted">
              {description}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ActionLink to="/contact" size="lg" className="group">
                Discuss a project
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </ActionLink>
              <ActionLink to="/projects" variant="secondary" size="lg">
                Explore projects
              </ActionLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
