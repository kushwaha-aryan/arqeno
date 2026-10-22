import { Check } from 'lucide-react'
import { ContactCta } from '../components/home/ContactCta'
import { ServiceIcon } from '../components/services/ServiceIcon'
import { PageHeader } from '../components/ui/PageHeader'
import { Section } from '../components/ui/Section'
import { processSteps, services } from '../config/services'
import { useSeo } from '../hooks/useSeo'

export function ServicesPage() {
  useSeo({
    title: 'Services',
    description:
      'Arqeno builds business websites and landing pages, portfolio and personal websites, full-stack web applications, and AI integrations with practical fallbacks. Scoped in writing before work starts.',
    path: '/services',
  })

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Software work, scoped honestly."
        description="Arqeno is a founder-led studio, so the list below is deliberately short. These are the engagements a single person can take responsibility for end to end — and the deliverable is always working software with a repository you own."
      />

      <Section
        divided={false}
        eyebrow="01 — What can be delivered"
        title="Four kinds of work."
        description="Each service lists what is actually included, so there is a shared understanding before anyone signs anything."
        tone="surface"
      >
        <div className="grid gap-5 lg:grid-cols-2">
          {services.map((service, index) => (
            <article
              key={service.id}
              className="border-flow group relative flex flex-col border border-line bg-paper p-7 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="grid size-10 place-items-center border border-line bg-surface text-accent transition-colors duration-300 group-hover:border-accent/50">
                  <ServiceIcon name={service.icon} />
                </span>
                <span className="label-mono text-ink-subtle tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <h3 className="mt-6 text-xl leading-snug text-ink sm:text-[1.375rem]">
                {service.title}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">
                {service.description}
              </p>

              <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
                {service.deliverables.map((deliverable) => (
                  <li
                    key={deliverable}
                    className="flex gap-2.5 text-sm leading-relaxed text-ink-muted"
                  >
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 size-3.5 shrink-0 text-accent"
                    />
                    <span>{deliverable}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="02 — How an engagement runs"
        title="Four steps, no surprises."
        description="The same sequence applies to a one-page site and a multi-month application build."
        tone="paper"
      >
        <ol className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((step) => (
            <li key={step.step} className="bg-surface p-7">
              <span className="label-mono text-accent tabular-nums">
                {step.step}
              </span>
              <h3 className="mt-4 text-lg text-ink">{step.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        eyebrow="03 — What this is not"
        title="Honest limits."
        description="A short list of what a founder-led studio cannot promise, so the wrong project is declined early."
        tone="ink"
        atmosphere
      >
        <ul className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
          {[
            'No guaranteed timelines or rankings. Estimates depend on decisions that have not been made yet.',
            'No 24/7 operations team. Hosting, monitoring and incidents are handled by the person who built the system.',
            'No enterprise-scale compliance programmes, dedicated infrastructure or multi-region delivery.',
            'No unsubstantiated performance claims. Benchmarks are measured and published when they exist.',
          ].map((item) => (
            <li
              key={item}
              className="bg-surface p-6 text-sm leading-relaxed text-ink-muted"
            >
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <ContactCta
        title="Tell me what you are trying to build."
        description="A short description of the problem, the audience and the deadline is enough to start. You will get a plain answer about scope, cost and whether Arqeno is the right studio for it."
      />
    </>
  )
}
