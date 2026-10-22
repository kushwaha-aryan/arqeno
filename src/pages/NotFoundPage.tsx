import { ArrowLeft } from 'lucide-react'
import { ActionLink } from '../components/ui/ActionLink'
import { useSeo } from '../hooks/useSeo'

export function NotFoundPage() {
  useSeo({
    title: 'Page not found',
    description: 'The page you were looking for does not exist on the Arqeno website.',
    path: '/404',
  })

  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-lines opacity-50 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_30%,transparent_100%)]"
      />

      <div className="shell relative flex min-h-[60vh] flex-col justify-center py-24">
        <p className="label-mono text-fg-subtle">Error 404</p>
        <h1 className="mt-5 text-[2.25rem] leading-[1.1] tracking-[-0.035em] text-fg sm:text-5xl">
          This page does not exist.
        </h1>
        <p className="mt-5 max-w-lg text-[0.9375rem] leading-relaxed text-fg-muted">
          The link may be out of date, or the address may have a typo. The
          projects, services and contact details are all still where you left
          them.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ActionLink to="/" size="lg" className="group">
            <ArrowLeft
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5"
            />
            Back to home
          </ActionLink>
          <ActionLink to="/projects" variant="secondary" size="lg">
            Explore projects
          </ActionLink>
        </div>
      </div>
    </section>
  )
}
