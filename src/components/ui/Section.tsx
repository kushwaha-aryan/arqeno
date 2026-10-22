import type { ReactNode } from 'react'

type SectionProps = {
  id?: string
  /** Small mono label rendered above the heading, e.g. "02 — SERVICES". */
  eyebrow?: string
  title?: ReactNode
  description?: ReactNode
  /** Rendered on the right of the heading row on wide screens. */
  aside?: ReactNode
  children?: ReactNode
  className?: string
  /** Adds the top hairline that separates stacked sections. */
  divided?: boolean
}

/**
 * A page section with a consistent rhythm: hairline divider, mono eyebrow,
 * heading, optional supporting copy and an optional action slot.
 */
export function Section({
  id,
  eyebrow,
  title,
  description,
  aside,
  children,
  className = '',
  divided = true,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${divided ? 'border-t border-line' : ''} ${className}`}
    >
      <div className="shell py-20 sm:py-24 lg:py-28">
        {(eyebrow || title || description || aside) && (
          <div className="mb-12 flex flex-col gap-8 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              {eyebrow ? (
                <p className="label-mono mb-5 text-fg-subtle">{eyebrow}</p>
              ) : null}
              {title ? (
                <h2 className="text-3xl leading-[1.15] text-fg sm:text-4xl lg:text-[2.75rem]">
                  {title}
                </h2>
              ) : null}
              {description ? (
                <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-fg-muted">
                  {description}
                </p>
              ) : null}
            </div>
            {aside ? <div className="shrink-0">{aside}</div> : null}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
