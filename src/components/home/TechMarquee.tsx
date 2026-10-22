import { stackTicker } from '../../config/skills'

/**
 * The studio's stack, as a slow ticker.
 *
 * The list is the founder's own set of technologies, and the items that
 * also appear in a public repository on this site are the ones that can
 * be checked by a visitor. The track is duplicated so the loop has no
 * visible seam, and it pauses while the pointer is over it.
 */

function Track() {
  return (
    <span className="marquee-track" aria-hidden="true">
      {stackTicker.map((item) => (
        <span
          key={item}
          className="label-mono inline-flex items-center gap-3.5 text-ink-subtle"
        >
          <span className="size-1 shrink-0 rounded-full bg-accent/60" />
          {item}
        </span>
      ))}
    </span>
  )
}

export function TechMarquee() {
  return (
    <div className="border-t border-line">
      <div className="shell flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:gap-8">
        <p className="label-mono shrink-0 text-ink-subtle">Working with</p>
        <div className="marquee flex-1">
          <Track />
          <Track />
        </div>
      </div>
    </div>
  )
}
