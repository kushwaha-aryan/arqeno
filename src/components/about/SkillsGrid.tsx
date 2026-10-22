import { skillGroups } from '../../config/skills'

/**
 * The studio's skill set, grouped by area.
 *
 * A small cobalt dot marks the technologies that can be checked against a
 * public repository listed on this site. Everything else is still shown —
 * it is part of the founder's own account of their work — but it is not
 * presented as something a visitor can open and read.
 */
export function SkillsGrid() {
  return (
    <div>
      <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group, index) => (
          <div key={group.id} className="bg-surface p-6 sm:p-7">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-[0.9375rem] font-medium text-ink">
                {group.label}
              </h3>
              <span className="label-mono text-ink-subtle tabular-nums">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            <ul className="mt-4 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li
                  key={item.label}
                  className="inline-flex items-center gap-1.5 border border-line px-2 py-1 font-mono text-[0.6875rem] tracking-tight text-ink-muted"
                >
                  {item.verified ? (
                    <>
                      <span
                        aria-hidden="true"
                        className="size-1 shrink-0 rounded-full bg-accent"
                      />
                      <span className="sr-only">
                        — also used in a public repository
                      </span>
                    </>
                  ) : null}
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-5 flex items-center gap-2 text-xs text-ink-subtle">
        <span aria-hidden="true" className="size-1 shrink-0 rounded-full bg-accent" />
        <span>
          Also used in a public repository on this site. Everything else is the
          founder&rsquo;s own account of their work.
        </span>
      </p>
    </div>
  )
}
