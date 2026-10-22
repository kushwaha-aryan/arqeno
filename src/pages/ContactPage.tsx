import { Clock, CodeXml, Mail } from 'lucide-react'
import { InquiryForm } from '../components/contact/InquiryForm'
import { PageHeader } from '../components/ui/PageHeader'
import { Section } from '../components/ui/Section'
import { LinkedInIcon } from '../components/ui/LinkedInIcon'
import { siteConfig } from '../config/site'
import { useSeo } from '../hooks/useSeo'

const expectations = [
  {
    title: 'A reply from the founder',
    description:
      'Enquiries are read and answered by one person, so a response may take a day or two.',
  },
  {
    title: 'A scoping question, not a quote',
    description:
      'The first reply usually asks a couple of clarifying questions before any number is discussed.',
  },
  {
    title: 'A written scope',
    description:
      'Once the problem is clear, you get a short written outline of what will be built and what is out of scope.',
  },
]

export function ContactPage() {
  useSeo({
    title: 'Contact',
    description:
      'Start a conversation with Arqeno about a website, a full-stack web application or an AI-powered feature. The studio is founder-led, so enquiries go straight to the person who would do the work.',
    path: '/contact',
  })

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Start a conversation."
        description="Tell Arqeno what you are trying to build, who it is for, and what is getting in the way. You will get a straight answer about scope, cost and whether this is a good fit."
      />

      <Section divided={false} tone="surface">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
          <div>
            <h2 className="text-xl text-ink">Project inquiry</h2>
            <p className="mt-2 mb-8 text-sm leading-relaxed text-ink-muted">
              All fields marked required help narrow the answer. The budget
              field is genuinely optional.
            </p>
            <InquiryForm />
          </div>

          <aside className="space-y-5 lg:pt-16">
            <div className="border border-line bg-paper p-6">
              <p className="label-mono text-ink-subtle">Direct contact</p>
              <a
                href={`mailto:${siteConfig.email}`}
                data-cursor
                data-cursor-label="EMAIL"
                className="group mt-4 flex items-center gap-2.5 text-sm text-ink transition-colors duration-200 hover:text-accent"
              >
                <Mail aria-hidden="true" className="size-4 shrink-0 text-accent" />
                {siteConfig.email}
              </a>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                data-cursor-label="GITHUB"
                className="group mt-3 flex items-center gap-2.5 text-sm text-ink transition-colors duration-200 hover:text-accent"
              >
                <CodeXml aria-hidden="true" className="size-4 shrink-0 text-accent" />
                github.com/kushwaha-aryan
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                data-cursor-label="LINKEDIN"
                className="group mt-3 flex items-center gap-2.5 text-sm text-ink transition-colors duration-200 hover:text-accent"
              >
                <LinkedInIcon className="size-4 shrink-0 text-accent" />
                linkedin.com/in/aryan-kushwaha
              </a>
            </div>

            <div className="border border-line bg-paper p-6">
              <p className="label-mono flex items-center gap-2 text-ink-subtle">
                <Clock aria-hidden="true" className="size-3.5" />
                What happens next
              </p>
              <ul className="mt-4 space-y-4">
                {expectations.map((item, index) => (
                  <li key={item.title} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="label-mono mt-0.5 text-accent tabular-nums"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-ink">
                        {item.title}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-ink-muted">
                        {item.description}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-line bg-paper p-6">
              <p className="label-mono text-ink-subtle">A realistic fit</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                The studio works best with small to mid-sized projects that
                have a clear owner on the client side, and with people who are
                comfortable making decisions quickly.
              </p>
            </div>
          </aside>
        </div>
      </Section>

      {/* The closing band — the same inverted palette used on every page. */}
      <section className="band-ink border-t border-line bg-paper">
        <div className="shell flex flex-col gap-6 py-14 lg:flex-row lg:items-center lg:justify-between lg:py-16">
          <p className="max-w-xl font-display text-[1.5rem] leading-snug text-ink sm:text-[1.75rem]">
            Every enquiry is read and answered by the founder &mdash; usually
            within a day or two.
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            data-cursor
            data-cursor-label="EMAIL"
            className="sheen group inline-flex h-12 shrink-0 items-center justify-center gap-2 bg-accent px-6 text-sm font-medium text-on-accent transition-colors duration-200 hover:bg-accent-soft"
          >
            <Mail aria-hidden="true" className="size-4" />
            Write to the studio
          </a>
        </div>
      </section>
    </>
  )
}
