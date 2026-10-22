import { ContactCta } from '../components/home/ContactCta'
import { SkillsGrid } from '../components/about/SkillsGrid'
import { SocialLinks } from '../components/about/SocialLinks'
import { PageHeader } from '../components/ui/PageHeader'
import { Section } from '../components/ui/Section'
import { founder, socialLinks, team } from '../config/founder'
import { useSeo } from '../hooks/useSeo'

const studioPrinciples = [
  {
    title: 'Products first, services second',
    description:
      'Arqeno builds its own digital products so the studio keeps a live relationship with real users. Client work runs on the same standards.',
  },
  {
    title: 'Small on purpose',
    description:
      'The studio stays at the size where the person you talk to is the person who writes the code. Growing that is allowed; hiding it is not.',
  },
  {
    title: 'Public where it counts',
    description:
      'Independent projects are published as open source so the work can be inspected, reused and argued with.',
  },
  {
    title: 'No borrowed credibility',
    description:
      'No invented testimonials, usage numbers or awards appear anywhere on this site. If a figure is not verifiable, it is not published.',
  },
]

export function AboutPage() {
  useSeo({
    title: 'About',
    description:
      'Arqeno is a founder-led software studio. Aryan Kushwaha builds independent products and works with clients on websites, web applications and AI features.',
    path: '/about',
  })

  const founderLinks = socialLinks(founder)
  const isFounderOnly = team.length === 1

  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A studio of one, on purpose."
        description="Arqeno builds digital products of its own and takes on software work for clients. It is founder-led: the person who scopes the work is the person who writes it, and this page says exactly who that is."
      />

      <Section
        divided={false}
        eyebrow="01 — The studio"
        title="What founder-led means here."
        description="Not a temporary stage before a team arrives. It is the operating model, and it decides how work is scoped, priced and handed over."
        tone="surface"
      >
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div className="space-y-5 text-[0.9375rem] leading-relaxed text-ink-muted">
            <p className="text-lg leading-relaxed text-ink">
              Most studios are either a product company or an agency. Arqeno is
              both, in a deliberately small form.
            </p>
            <p>
              On one side there are independent products &mdash; the AI photo
              editor, the acoustic supervisor, the entity-resolution research
              work and the full-stack applications. They exist because the
              studio wanted to solve them, and they are open source because
              there is no reason to hide the thinking.
            </p>
            <p>
              On the other side there is client work: websites, web
              applications and AI features built to order. The same
              engineering standards apply, and the difference is that the
              requirements come from outside.
            </p>
            <p>
              Keeping both sides in one small studio means the lessons from
              building a product for yourself &mdash; what breaks, what users
              actually do, which parts were over-engineered &mdash; feed
              directly into the work done for clients.
            </p>
          </div>

          <ul className="grid gap-px self-start overflow-hidden rounded-[4px] border border-line bg-line">
            {studioPrinciples.map((principle, index) => (
              <li key={principle.title} className="bg-surface p-6">
                <span className="label-mono text-accent tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-[0.9375rem] font-medium text-ink">
                  {principle.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {principle.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section
        eyebrow="02 — The founder"
        title="The person behind the work."
        description={
          isFounderOnly
            ? 'Arqeno currently has one founder. If the studio grows, additional people will be listed here.'
            : 'The people who work on client projects at Arqeno.'
        }
        tone="paper"
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
          <div>
            <div className="relative">
              {/* Accent frame offset behind the portrait. */}
              <span
                aria-hidden="true"
                className="absolute -bottom-3 -left-3 -z-10 size-full rounded-[4px] border border-accent/30"
              />
              {founder.photo ? (
                <img
                  src={founder.photo}
                  alt={founder.photoAlt ?? `Portrait of ${founder.name}`}
                  width={640}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full rounded-[4px] border border-line object-cover"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="grid aspect-[4/5] w-full place-items-center rounded-[4px] border border-line bg-surface-muted font-display text-5xl text-ink-subtle"
                >
                  {founder.name
                    .split(' ')
                    .map((part) => part[0])
                    .join('')}
                </div>
              )}
            </div>

            <div className="mt-8">
              <p className="label-mono text-accent">{founder.role}</p>
              <h3 className="mt-3 text-2xl text-ink">{founder.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {founder.shortBio}
              </p>
              <div className="mt-5">
                <SocialLinks links={founderLinks} />
              </div>
            </div>
          </div>

          <div className="space-y-5 text-[0.9375rem] leading-relaxed text-ink-muted lg:pt-2">
            {founder.bio?.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}

            <div className="rounded-[4px] border border-line bg-surface p-6">
              <p className="label-mono text-ink-subtle">A note on this page</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Arqeno publishes what can be verified. There are no client
                testimonials, revenue figures, awards or team-size claims on
                this site, because there is nothing verified to point at yet.
                When there is, it will appear here &mdash; and nowhere else.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="03 — Skills & stack"
        title="What the studio works with."
        description="The areas the founder works in day to day. A cobalt dot marks the technologies that also appear in a public repository on this site, so the claim can be checked rather than believed."
        tone="surface"
      >
        <SkillsGrid />
      </Section>

      {!isFounderOnly ? (
        <Section
          eyebrow="04 — The team"
          title="Everyone who works on client projects."
          description="Listed in the order they joined the studio."
        >
          <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {team.map((member) => (
              <li
                key={member.id}
                className="rounded-[4px] border border-line bg-surface p-7"
              >
                <p className="label-mono text-accent">{member.role}</p>
                <h3 className="mt-3 text-xl text-ink">{member.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {member.shortBio}
                </p>
                <div className="mt-5">
                  <SocialLinks links={socialLinks(member)} />
                </div>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <ContactCta
        title="Work with the studio."
        description="Every enquiry is read and answered by the founder. If the fit is not right, you will get told that plainly."
      />
    </>
  )
}
