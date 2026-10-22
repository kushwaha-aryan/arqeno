import { ArrowRight } from 'lucide-react'
import { ActionLink } from '../ui/ActionLink'

/**
 * Closing call to action, reused on every page.
 *
 * It sits in the inverted band, so the palette is re-pointed by the
 * `.band-ink` scope rather than by a second stylesheet.
 */
export function ContactCta({
  title = 'Have a problem worth building?',
  description = 'Tell us what you are trying to do, who it is for, and what is in the way. You will get a straight answer about whether this is a good fit.',
}: {
  title?: string
  description?: string
}) {
  return (
    <section className="band-ink relative overflow-hidden border-t border-line bg-paper">
      {/* Drifting light behind the inverted band. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <span className="aurora-blob aurora-a -right-[14%] -top-[40%] size-[36rem] bg-wash" />
        <span className="aurora-blob aurora-b -bottom-[45%] -left-[12%] size-[32rem] bg-wash-warm" />
      </div>

      <div className="shell relative py-20 sm:py-24 lg:py-28">
        <div className="relative overflow-hidden border border-line bg-surface p-8 sm:p-12 lg:p-16">
          <div
            aria-hidden="true"
            className="grid-lines pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_90%_at_80%_50%,#000_10%,transparent_100%)]"
          />
          <div
            aria-hidden="true"
            className="wash-ink pointer-events-none absolute inset-0 opacity-70"
          />

          <div className="relative max-w-2xl">
            <p className="label-mono flex items-center gap-3 text-ink-subtle">
              <span aria-hidden="true" className="inline-block h-px w-8 bg-accent" />
              Let&rsquo;s talk
            </p>

            <h2 className="mt-6 text-[clamp(1.9rem,4.4vw,3.1rem)] leading-[1.06] text-ink">
              {title}
            </h2>

            <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-ink-muted">
              {description}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ActionLink
                to="/contact"
                size="lg"
                cursorLabel="HELLO"
                className="group"
              >
                Discuss a project
                <ArrowRight aria-hidden="true" className="arrow-slide size-4" />
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
