import { ArrowRight } from 'lucide-react'
import { ActionLink } from '../ui/ActionLink'

/** The three honest statements about how the studio operates. */
const principles = [
  {
    index: '01',
    title: 'Independent products',
    description:
      'Tools Arqeno builds and maintains for its own sake — the projects listed on this site.',
  },
  {
    index: '02',
    title: 'Client work',
    description:
      'Websites, web applications and AI features built to order, scoped before a line is written.',
  },
  {
    index: '03',
    title: 'One founder',
    description:
      'You work directly with the person writing the code. Nothing is handed to a middle layer.',
  },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      {/* Backdrop: a faint engineering grid with a single accent bloom. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-lines opacity-70 [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,#000_35%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 accent-bloom opacity-80"
      />

      <div className="shell relative pt-20 pb-16 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-24">
        <p
          className="label-mono enter flex items-center gap-3 text-fg-subtle"
          style={{ animationDelay: '40ms' }}
        >
          <span
            aria-hidden="true"
            className="inline-block h-px w-8 bg-accent"
          />
          Arqeno &mdash; software studio
        </p>

        <h1
          className="enter mt-7 max-w-4xl text-[2.5rem] leading-[1.06] tracking-[-0.035em] text-fg sm:text-[3.25rem] lg:text-[4.25rem]"
          style={{ animationDelay: '110ms' }}
        >
          Building digital products and software for{' '}
          <span className="text-accent-soft">real-world problems</span>.
        </h1>

        <p
          className="enter mt-7 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg"
          style={{ animationDelay: '180ms' }}
        >
          Arqeno is a founder-led studio. We design and engineer web
          applications, product interfaces and AI-powered tools &mdash; and we
          build products of our own, learning from the same work we ship for
          clients.
        </p>

        <div
          className="enter mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          style={{ animationDelay: '250ms' }}
        >
          <ActionLink to="/projects" size="lg" className="group">
            Explore projects
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </ActionLink>
          <ActionLink to="/contact" variant="secondary" size="lg">
            Discuss a project
          </ActionLink>
        </div>

        <dl
          className="enter mt-16 grid gap-px overflow-hidden rounded-[6px] border border-line bg-line sm:mt-20 lg:grid-cols-3"
          style={{ animationDelay: '320ms' }}
        >
          {principles.map((principle) => (
            <div key={principle.index} className="bg-ink-900 p-6">
              <dt className="label-mono flex items-center gap-2.5 text-fg-subtle">
                <span aria-hidden="true" className="text-accent">
                  {principle.index}
                </span>
                {principle.title}
              </dt>
              <dd className="mt-3 text-sm leading-relaxed text-fg-muted">
                {principle.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
