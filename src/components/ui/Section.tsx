import type { ReactNode } from 'react'

export type SectionTone = 'paper' | 'surface' | 'ink'

type SectionProps = {
  id?: string
  /** Small mono label rendered above the heading, e.g. "02 / SERVICES". */
  eyebrow?: string
  title?: ReactNode
  description?: ReactNode
  /** Rendered under the description, on the right of the heading. */
  aside?: ReactNode
  children?: ReactNode
  className?: string
  /** Adds the top hairline that separates stacked sections. */
  divided?: boolean
  /** Background treatment — used to make section transitions deliberate. */
  tone?: SectionTone
  /**
   * Adds a layer of slowly drifting light behind the content. It reads as
   * depth rather than colour, and it inverts with the band.
   */
  atmosphere?: boolean
}

const tones: Record<SectionTone, string> = {
  paper: 'bg-paper',
  surface: 'bg-surface',
  ink: 'band-ink bg-paper',
}

/**
 * A page section with an editorial rhythm: a hairline divider, a numbered
 * mono eyebrow, an oversized display heading on the left and the supporting
 * copy on the right.
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
  tone = 'paper',
  atmosphere = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative ${tones[tone]} ${className}`}
    >
      {divided ? <div aria-hidden="true" className="rule-flow" /> : null}

      {atmosphere ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <span className="aurora-blob aurora-a -left-[12%] -top-[28%] size-[34rem] bg-wash" />
          <span className="aurora-blob aurora-b -bottom-[30%] right-[-10%] size-[30rem] bg-wash-warm" />
        </div>
      ) : null}

      <div className="shell relative py-20 sm:py-24 lg:py-28">
        {(eyebrow || title || description || aside) && (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-20">
            <div>
              {eyebrow ? (
                <p className="label-mono flex items-center gap-3 text-ink-subtle">
                  <span aria-hidden="true" className="inline-block h-px w-8 bg-accent" />
                  {eyebrow}
                </p>
              ) : null}
              {title ? (
                <h2 className="mt-6 max-w-3xl text-[clamp(1.9rem,4.2vw,3.1rem)] leading-[1.08] text-ink">
                  {title}
                </h2>
              ) : null}
            </div>

            {(description || aside) && (
              <div className="lg:pt-10">
                {description ? (
                  <p className="max-w-xl text-[0.9375rem] leading-relaxed text-ink-muted">
                    {description}
                  </p>
                ) : null}
                {aside ? <div className="mt-6">{aside}</div> : null}
              </div>
            )}
          </div>
        )}

        {children ? <div className="mt-14 lg:mt-20">{children}</div> : null}
      </div>
    </section>
  )
}
