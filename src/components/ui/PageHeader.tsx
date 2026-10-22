import type { ReactNode } from 'react'

type PageHeaderProps = {
  eyebrow: string
  title: ReactNode
  description: ReactNode
  aside?: ReactNode
}

/**
 * Shared header block for the inner pages, keeping the vertical rhythm and
 * the mono eyebrow consistent across the whole site.
 */
export function PageHeader({ eyebrow, title, description, aside }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-lines opacity-60 [mask-image:radial-gradient(ellipse_70%_70%_at_40%_0%,#000_30%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 accent-bloom opacity-60"
      />

      <div className="shell relative pt-16 pb-14 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-20">
        <p
          className="label-mono enter flex items-center gap-3 text-fg-subtle"
          style={{ animationDelay: '40ms' }}
        >
          <span aria-hidden="true" className="inline-block h-px w-8 bg-accent" />
          {eyebrow}
        </p>

        <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-3xl">
            <h1
              className="enter text-[2.25rem] leading-[1.08] tracking-[-0.035em] text-fg sm:text-[2.875rem] lg:text-[3.5rem]"
              style={{ animationDelay: '110ms' }}
            >
              {title}
            </h1>
            <p
              className="enter mt-6 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg"
              style={{ animationDelay: '170ms' }}
            >
              {description}
            </p>
          </div>
          {aside ? <div className="shrink-0">{aside}</div> : null}
        </div>
      </div>
    </section>
  )
}
