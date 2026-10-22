import { useMemo, useState } from 'react'
import { ProjectCard } from '../components/projects/ProjectCard'
import { ContactCta } from '../components/home/ContactCta'
import { PageHeader } from '../components/ui/PageHeader'
import { Section } from '../components/ui/Section'
import { projects, type ProjectCategory } from '../config/projects'
import { useSeo } from '../hooks/useSeo'

type Filter = 'all' | ProjectCategory

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'product', label: 'Products' },
  { value: 'prototype', label: 'Prototypes' },
  { value: 'research', label: 'Research' },
  { value: 'experiment', label: 'Experiments' },
]

export function ProjectsPage() {
  const [filter, setFilter] = useState<Filter>('all')

  useSeo({
    title: 'Projects',
    description:
      'Open-source work from Arqeno: AI photo tooling, acoustic event detection, entity resolution research, a multi-agent portfolio advisor and full-stack movie applications. Every entry links to its repository.',
    path: '/projects',
  })

  const visible = useMemo(
    () =>
      filter === 'all'
        ? projects
        : projects.filter((project) => project.category === filter),
    [filter],
  )

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Work that is public, and open to inspection."
        description="Arqeno builds products of its own alongside client work. These are the independent projects — each one links straight to its source code, and to a live demo where one exists."
      />

      <Section
        divided={false}
        eyebrow="01 — Projects"
        title="Everything in the studio."
        description="Independent products, research prototypes and smaller experiments, separated by category so nothing is over-claimed."
      >
        <div
          role="group"
          aria-label="Filter projects by category"
          className="mb-10 flex flex-wrap gap-2"
        >
          {filters.map((option) => {
            const active = filter === option.value
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setFilter(option.value)}
                aria-pressed={active}
                className={[
                  'h-9 rounded-[4px] border px-3.5 text-[0.8125rem] transition-colors duration-200',
                  active
                    ? 'border-accent/60 bg-accent/10 text-accent-soft'
                    : 'border-line text-fg-muted hover:border-line-strong hover:text-fg',
                ].join(' ')}
              >
                {option.label}
              </button>
            )
          })}
        </div>

        <p className="sr-only" aria-live="polite">
          Showing {visible.length} of {projects.length} projects.
        </p>

        <div className="grid gap-5 lg:grid-cols-2">
          {visible.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              variant="full"
              index={index + 1}
            />
          ))}
        </div>

        <p className="mt-10 max-w-2xl text-sm leading-relaxed text-fg-subtle">
          Descriptions and technology lists are taken from each repository.
          Where a project is a prototype or a research effort, it is labelled as
          one &mdash; the label reflects what the code actually does today, not
          where it might go next.
        </p>
      </Section>

      <ContactCta
        title="Want something like this built?"
        description="If any of these projects is close to what you need, or you have a different problem entirely, start a conversation."
      />
    </>
  )
}
