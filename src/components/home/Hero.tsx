import { ArrowRight } from 'lucide-react'
import { ActionLink } from '../ui/ActionLink'
import { HeroSchematic } from './HeroSchematic'
import { TechMarquee } from './TechMarquee'

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
    <section className="relative overflow-hidden border-b border-line bg-paper">
      {/* Atmosphere: a soft cobalt wash under the engineering grid. */}
      <div
        aria-hidden="true"
        className="wash pointer-events-none absolute inset-0 opacity-90"
      />
      <div
        aria-hidden="true"
        className="grid-lines pointer-events-none absolute inset-0 opacity-80 [mask-image:radial-gradient(ellipse_85%_70%_at_45%_0%,#000_30%,transparent_100%)]"
      />

      <div className="shell relative pt-14 pb-14 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <div
              className="enter flex flex-wrap items-center gap-x-6 gap-y-2"
              style={{ animationDelay: '40ms' }}
            >
              <p className="label-mono flex items-center gap-3 text-ink-subtle">
                <span aria-hidden="true" className="inline-block h-px w-8 bg-accent" />
                Arqeno &mdash; software studio
              </p>
              <p className="label-mono flex items-center gap-2 text-ink-subtle">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-signal motion-safe:animate-[float-soft_4s_ease-in-out_infinite]"
                />
                Open for enquiries
              </p>
            </div>

            <h1
              className="enter mt-8 max-w-[14ch] text-[clamp(2.6rem,7vw,5.25rem)] leading-[1.03] text-ink"
              style={{ animationDelay: '110ms' }}
            >
              Software for{' '}
              <em className="text-gradient">
                real-world
              </em>{' '}
              problems.
            </h1>

            <p
              className="enter mt-7 max-w-xl text-base leading-relaxed text-ink-muted sm:text-[1.0625rem]"
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
              <ActionLink
                to="/projects"
                size="lg"
                cursorLabel="WORK"
                className="group"
              >
                Explore projects
                <ArrowRight aria-hidden="true" className="arrow-slide size-4" />
              </ActionLink>
              <ActionLink to="/contact" variant="secondary" size="lg">
                Discuss a project
              </ActionLink>
            </div>
          </div>

          <div
            className="enter hidden justify-self-center lg:block"
            style={{ animationDelay: '300ms' }}
          >
            <div className="float-soft relative w-full max-w-[26rem]">
              <HeroSchematic />
            </div>
          </div>
        </div>

        <dl
          className="enter mt-14 grid gap-px overflow-hidden border border-line bg-line sm:mt-20 lg:grid-cols-3"
          style={{ animationDelay: '340ms' }}
        >
          {principles.map((principle) => (
            <div key={principle.index} className="bg-surface p-6">
              <dt className="label-mono flex items-center gap-2.5 text-ink-subtle">
                <span aria-hidden="true" className="text-accent tabular-nums">
                  {principle.index}
                </span>
                {principle.title}
              </dt>
              <dd className="mt-3 text-sm leading-relaxed text-ink-muted">
                {principle.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="relative">
        <div aria-hidden="true" className="rule-flow" />
        <TechMarquee />
      </div>
    </section>
  )
}
