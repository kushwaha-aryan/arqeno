import { Section } from '../ui/Section'

const workingRules = [
  {
    title: 'Working software early',
    description:
      'A live URL beats a slide deck. You see the thing running while it is still cheap to change.',
  },
  {
    title: 'Trade-offs explained',
    description:
      'Every meaningful decision comes with the reasoning and the cost, so you can disagree with it.',
  },
  {
    title: 'Honest scope',
    description:
      'If a request would make the product worse or the timeline dishonest, that gets said up front.',
  },
  {
    title: 'A real handover',
    description:
      'You receive the repository, the deployment steps and a walkthrough of how it is organised.',
  },
]

export function StudioIntro() {
  return (
    <Section
      id="studio"
      eyebrow="03 — The studio"
      title="A small studio, on purpose."
      tone="ink"
      atmosphere
    >
      <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <div className="space-y-5 text-[0.9375rem] leading-relaxed text-ink-soft">
          <p className="text-lg leading-relaxed text-ink">
            Arqeno exists because building software has two halves, and most
            studios only do one of them.
          </p>
          <p>
            The first half is <em className="text-ink not-italic">building</em>
            &mdash; turning an idea into an interface, a backend and a model
            that behaves predictably. The second half is{' '}
            <em className="text-ink not-italic">owning</em> the result: living
            with the edge cases, keeping it online, and deciding what to change
            next.
          </p>
          <p>
            Arqeno does both. The studio builds products of its own, so the
            problems are real and the feedback is honest, and it takes on
            client work, so the work has to hold up outside the studio too.
          </p>
          <p>
            It is founder-led. That is not a temporary state before a team
            arrives &mdash; it is the model. The person you speak with is the
            person who writes the code, and the standard of work is set by
            whoever is doing it.
          </p>
        </div>

        <div className="border border-line bg-surface p-7">
          <p className="label-mono text-ink-subtle">How the work gets done</p>
          <ul className="mt-6 space-y-6">
            {workingRules.map((rule, index) => (
              <li key={rule.title} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="label-mono mt-0.5 text-accent tabular-nums"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>
                  <span className="block text-[0.9375rem] font-medium text-ink">
                    {rule.title}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-ink-muted">
                    {rule.description}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
