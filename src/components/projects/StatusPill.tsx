import type { ProjectStatus } from '../../config/projects'

/**
 * Status markers.
 *
 * The palette stays monochrome with a single accent, so the four states are
 * told apart by shape as much as by colour. The wording always comes from
 * the project data, so a card never claims more than the repository
 * actually supports — the mark itself is decorative.
 */
const marks: Record<ProjectStatus, { shape: string; swatch: string }> = {
  live: { shape: 'rounded-full', swatch: 'bg-accent' },
  active: { shape: 'rounded-full', swatch: 'bg-ink' },
  prototype: { shape: 'rounded-full border border-signal', swatch: '' },
  research: { shape: 'h-px w-3', swatch: 'bg-ink-subtle' },
}

export function StatusPill({
  status,
  label,
}: {
  status: ProjectStatus
  label: string
}) {
  const mark = marks[status]

  return (
    <span className="label-mono inline-flex items-center gap-2 border border-line px-2.5 py-1.5 text-ink-muted">
      <span
        aria-hidden="true"
        className={`inline-block size-1.5 shrink-0 ${mark.shape} ${mark.swatch}`}
      />
      {label}
    </span>
  )
}
