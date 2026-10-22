import { useEffect, useRef } from 'react'

/**
 * A small custom cursor for desktop pointing devices.
 *
 * Behaviour:
 *  - a 5px dot that tracks the pointer exactly, with no easing and no
 *    transition, so the click point is never ambiguous,
 *  - a 34px ring that follows with a short, eased lag,
 *  - the ring expands and picks up a short label when the pointer is over
 *    an element marked with `data-cursor` (for example `data-cursor-label="VIEW"`),
 *  - the ring contracts briefly while the pointer is held down.
 *
 * Technical notes:
 *  - The root element stays at the viewport origin and never moves. The
 *    dot is positioned in viewport coordinates, and a separate anchor
 *    carries the ring and its label. (Transforming the root *and* the
 *    children would apply the pointer offset twice.)
 *  - Everything is driven from refs inside a single `requestAnimationFrame`
 *    loop, so the component never triggers a React re-render.
 *  - The element is `pointer-events: none`, so it can never intercept a
 *    click or a hover.
 *  - The native cursor is only hidden once this component has mounted
 *    (the `cursor-ready` class), and never on touch devices or when the
 *    visitor prefers reduced motion.
 */
export function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null)
  const anchorRef = useRef<HTMLSpanElement>(null)
  const ringRef = useRef<HTMLSpanElement>(null)
  const dotRef = useRef<HTMLSpanElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const anchor = anchorRef.current
    const ring = ringRef.current
    const dot = dotRef.current
    const label = labelRef.current

    if (!root || !anchor || !ring || !dot || !label) return

    const precise = window.matchMedia('(pointer: fine)')
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (!precise.matches || motion.matches) return

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const eased = { x: pointer.x, y: pointer.y }

    let frame = 0
    let shown = false
    let currentLabel = ''

    const writeLabel = (text: string) => {
      if (text === currentLabel) return
      currentLabel = text
      label.textContent = text
    }

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX
      pointer.y = event.clientY

      if (!shown) {
        shown = true
        root.classList.add('is-visible')
      }

      const target = event.target
      const interactive =
        target instanceof Element
          ? target.closest<HTMLElement>('[data-cursor]')
          : null

      if (interactive) {
        writeLabel(interactive.dataset.cursorLabel ?? 'OPEN')
        ring.classList.add('is-active')
        root.classList.add('is-active')
      } else {
        writeLabel('')
        ring.classList.remove('is-active')
        root.classList.remove('is-active')
      }
    }

    const onPointerDown = () => root.classList.add('is-down')
    const onPointerUp = () => root.classList.remove('is-down')

    const hide = () => {
      shown = false
      root.classList.remove('is-visible', 'is-active', 'is-down')
      ring.classList.remove('is-active')
    }

    const tick = () => {
      // The ring eases towards the pointer; the dot does not move at all
      // between the event and the next frame.
      eased.x += (pointer.x - eased.x) * 0.18
      eased.y += (pointer.y - eased.y) * 0.18

      anchor.style.transform = `translate3d(${eased.x}px, ${eased.y}px, 0)`
      dot.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0)`

      frame = window.requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    window.addEventListener('pointerup', onPointerUp, { passive: true })
    document.addEventListener('mouseleave', hide)
    window.addEventListener('blur', hide)

    // The native cursor is replaced only once the custom one is running.
    document.documentElement.classList.add('cursor-ready')
    frame = window.requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      document.removeEventListener('mouseleave', hide)
      window.removeEventListener('blur', hide)
      window.cancelAnimationFrame(frame)
      document.documentElement.classList.remove('cursor-ready')
    }
  }, [])

  return (
    <div ref={rootRef} className="cursor-root" aria-hidden="true">
      {/* The ring and its label share one anchor so they stay together. */}
      <span ref={anchorRef} className="cursor-anchor">
        <span ref={ringRef} className="cursor-ring" />
        <span ref={labelRef} className="cursor-label label-mono" />
      </span>
      <span ref={dotRef} className="cursor-dot" />
    </div>
  )
}
