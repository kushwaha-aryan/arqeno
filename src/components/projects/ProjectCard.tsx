import { Check } from 'lucide-react'
import type { Project } from '../../config/projects'
import { ExternalLink } from '../ui/ExternalLink'
import { ProjectVisual } from './ProjectVisual'
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
 * The illustration is a schematic drawn in SVG — a diagram of what the
 * project is about, never a screenshot. Every outbound link points at the
 * real repository, and the demo link only renders when the project has a
 * verified live URL.
 */
export function ProjectCard({
  project,
  variant = 'full',
  index,
}: ProjectCardProps) {
  return (
    <article className="border-flow group relative flex h-full flex-col border border-line bg-surface transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift">
      <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-3.5">
        <StatusPill status={project.status} label={project.statusLabel} />
        {typeof index === 'number' ? (
          <span className="label-mono text-ink-subtle tabular-nums">
            {String(index).padStart(2, '0')}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-6 p-5 sm:flex-row sm:gap-7">
        <div className="min-w-0 flex-1">
          <h3 className="text-xl leading-snug text-ink sm:text-[1.3125rem]">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
              data-cursor-label="REPO"
              className="after:absolute after:inset-0 after:content-[''] transition-colors duration-200 hover:text-accent"
            >
              {project.name}
            </a>
          </h3>

          <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-muted">
            {project.summary}
          </p>

          {variant === 'full' ? (
            <>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                {project.description}
              </p>

              {project.highlights.length > 0 ? (
                <ul className="mt-5 space-y-2">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-2.5 text-[0.8125rem] leading-relaxed text-ink-muted"
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
                className="border border-line px-2 py-1 font-mono text-[0.6875rem] tracking-tight text-ink-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <figure className="shrink-0 sm:w-32">
          <div className="flex aspect-square w-28 items-center justify-center overflow-hidden border border-line bg-paper p-3 transition-colors duration-300 group-hover:border-line-strong sm:w-full">
            <ProjectVisual
              visual={project.visual}
              title={`${project.name} — ${project.figure}`}
              className="size-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            />
          </div>
          <figcaption className="label-mono mt-2 text-ink-subtle">
            {project.figure}
          </figcaption>
        </figure>
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line px-5 py-3.5">
        <ExternalLink
          href={project.repoUrl}
          label={`${project.name} GitHub repository`}
          className="relative z-10 inline-flex items-center gap-1.5 text-[0.8125rem] text-ink-muted transition-colors duration-200 hover:text-accent"
        >
          Repository
        </ExternalLink>

        {project.demoUrl ? (
          <ExternalLink
            href={project.demoUrl}
            label={`${project.name} live demo`}
            cursorLabel="LIVE"
            className="relative z-10 inline-flex items-center gap-1.5 text-[0.8125rem] text-ink-muted transition-colors duration-200 hover:text-accent"
          >
            Live demo
          </ExternalLink>
        ) : null}

        <span className="ml-auto font-mono text-[0.6875rem] text-ink-subtle tabular-nums">
          {project.year}
        </span>
      </div>
    </article>
  )
}
