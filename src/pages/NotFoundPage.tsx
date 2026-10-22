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
    <section className="relative overflow-hidden border-b border-line bg-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-lines opacity-60 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_30%,transparent_100%)]"
      />

      <div className="shell relative flex min-h-[60vh] flex-col justify-center py-24">
        <p className="label-mono flex items-center gap-3 text-ink-subtle">
          <span aria-hidden="true" className="inline-block h-px w-8 bg-accent" />
          Error 404
        </p>
        <h1 className="mt-6 max-w-3xl text-[clamp(2.25rem,6vw,4rem)] leading-[1.05] text-ink">
          This page does not exist.
        </h1>
        <p className="mt-5 max-w-lg text-[0.9375rem] leading-relaxed text-ink-muted">
          The link may be out of date, or the address may have a typo. The
          projects and services pages are the best places to continue from.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ActionLink to="/" size="lg" className="group">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to the home page
          </ActionLink>
          <ActionLink to="/projects" variant="secondary" size="lg">
            Explore projects
          </ActionLink>
        </div>
      </div>
    </section>
  )
}
