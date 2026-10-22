import type { ReactNode } from 'react'

type PageHeaderProps = {
  eyebrow: string
  title: ReactNode
  description: ReactNode
  aside?: ReactNode
}

/**
 * Shared header block for the inner pages. The mono eyebrow, the oversized
 * serif heading and the two-column split stay identical across the site so
 * every route opens with the same rhythm.
 */
export function PageHeader({ eyebrow, title, description, aside }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper">
      <div
        aria-hidden="true"
        className="wash pointer-events-none absolute inset-0 opacity-80"
      />
      <div
        aria-hidden="true"
        className="grid-lines pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_80%_80%_at_35%_0%,#000_25%,transparent_100%)]"
      />

      <div className="shell relative pt-14 pb-14 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-20">
        <p
          className="label-mono enter flex items-center gap-3 text-ink-subtle"
          style={{ animationDelay: '40ms' }}
        >
          <span aria-hidden="true" className="inline-block h-px w-8 bg-accent" />
          {eyebrow}
        </p>

        <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <h1 className="enter max-w-4xl text-[clamp(2.5rem,6.4vw,4.75rem)] leading-[1.02] text-ink" style={{ animationDelay: '110ms' }}>
            {title}
          </h1>

          <div
            className="enter lg:pb-2"
            style={{ animationDelay: '170ms' }}
          >
            <p className="max-w-xl text-base leading-relaxed text-ink-muted">
              {description}
            </p>
            {aside ? <div className="mt-6">{aside}</div> : null}
          </div>
        </div>
      </div>
    </section>
  )
}
