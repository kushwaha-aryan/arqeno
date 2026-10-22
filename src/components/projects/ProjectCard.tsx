import { Check } from 'lucide-react'
import type { Project } from '../../config/projects'
import { ExternalLink } from '../ui/ExternalLink'
import { StatusPill } from './StatusPill'

type ProjectCardProps = {
  project: Project
  /** `compact` shows the summary only; `full` adds details and highlights. */
  variant?: 'compact' | 'full'
  /** Zero-padded index shown in the card corner. */
  index?: number
}

/**
 * Reusable project card used on the home page and the projects page.
 *
 * Every outbound link points at the real repository, and the demo link only
 * renders when the project has a verified live URL.
 */
export function ProjectCard({
  project,
  variant = 'full',
  index,
}: ProjectCardProps) {
  return (
    <article className="group relative flex h-full flex-col rounded-[6px] border border-line bg-ink-850/60 p-6 transition-colors duration-300 hover:border-accent/45 hover:bg-ink-850 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <StatusPill status={project.status} label={project.statusLabel} />
        {typeof index === 'number' ? (
          <span className="label-mono text-fg-subtle tabular-nums">
            {String(index).padStart(2, '0')}
          </span>
        ) : null}
      </div>

      <h3 className="mt-5 text-xl leading-snug text-fg sm:text-[1.375rem]">
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="after:absolute after:inset-0 after:content-[''] hover:text-accent-soft"
        >
          {project.name}
        </a>
      </h3>

      <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-fg-muted">
        {project.summary}
      </p>

      {variant === 'full' ? (
        <>
          <p className="mt-4 text-sm leading-relaxed text-fg-muted/90">
            {project.description}
          </p>

          {project.highlights.length > 0 ? (
            <ul className="mt-5 space-y-2">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-2.5 text-[0.8125rem] leading-relaxed text-fg-muted"
                >
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 size-3.5 shrink-0 text-accent"
                  />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </>
      ) : null}

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {project.tech.map((item) => (
          <li
            key={item}
            className="rounded-[3px] border border-line bg-ink-800 px-2 py-1 font-mono text-[0.6875rem] tracking-tight text-fg-muted"
          >
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4">
        <ExternalLink
          href={project.repoUrl}
          label={`${project.name} GitHub repository`}
          className="relative z-10 inline-flex items-center gap-1.5 text-[0.8125rem] text-fg-muted transition-colors duration-200 hover:text-accent-soft"
        >
          Repository
        </ExternalLink>

        {project.demoUrl ? (
          <ExternalLink
            href={project.demoUrl}
            label={`${project.name} live demo`}
            className="relative z-10 inline-flex items-center gap-1.5 text-[0.8125rem] text-fg-muted transition-colors duration-200 hover:text-accent-soft"
          >
            Live demo
          </ExternalLink>
        ) : null}

        <span className="ml-auto font-mono text-[0.6875rem] text-fg-subtle tabular-nums">
          {project.year}
        </span>
      </div>
    </article>
  )
}
