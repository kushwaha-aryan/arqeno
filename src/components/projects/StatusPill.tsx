import type { ProjectStatus } from '../../config/projects'

const tones: Record<ProjectStatus, { dot: string; text: string }> = {
  live: { dot: 'bg-emerald-400', text: 'text-emerald-300/90' },
  active: { dot: 'bg-accent-blue', text: 'text-sky-300/90' },
  prototype: { dot: 'bg-accent', text: 'text-accent-soft' },
  research: { dot: 'bg-amber-400', text: 'text-amber-300/90' },
}

/**
 * Small status marker. The wording comes from the project data so a card
 * never claims more than the repository actually supports.
 */
export function StatusPill({
  status,
  label,
}: {
  status: ProjectStatus
  label: string
}) {
  const tone = tones[status]

  return (
    <span
      className={`label-mono inline-flex items-center gap-2 rounded-[3px] border border-line bg-ink-850 px-2.5 py-1.5 ${tone.text}`}
    >
      <span
        aria-hidden="true"
        className={`size-1.5 rounded-full ${tone.dot}`}
      />
      {label}
    </span>
  )
}
