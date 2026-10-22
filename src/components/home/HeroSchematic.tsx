import { useEffect, useRef } from 'react'

/** Tick marks around the outer ring. */
const TICKS = Array.from({ length: 48 }, (_, index) => index * 7.5)

/** Three accent nodes placed on the inner ring. */
const NODES = [
  { angle: -28, radius: 132 },
  { angle: 74, radius: 132 },
  { angle: 196, radius: 132 },
]

function polar(angle: number, radius: number) {
  const radians = ((angle - 90) * Math.PI) / 180
  return {
    x: 200 + radius * Math.cos(radians),
    y: 200 + radius * Math.sin(radians),
  }
}

/**
 * The studio schematic behind the hero.
 *
 * A viewfinder drawn from concentric rings, radial ticks and a slowly
 * rotating arc. It is an abstract diagram — not a product screenshot — and
 * it leans a couple of degrees towards the pointer for a moment of depth.
 *
 * The tilt is written straight to CSS custom properties, so the component
 * never re-renders while the pointer moves.
 */
export function HeroSchematic() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    let frame = 0

    const onPointerMove = (event: PointerEvent) => {
      if (frame) return

      frame = window.requestAnimationFrame(() => {
        frame = 0
        const rect = svg.getBoundingClientRect()
        const x = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
        const y = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)

        svg.style.setProperty('--tx', Math.max(-1, Math.min(1, x)).toFixed(3))
        svg.style.setProperty('--ty', Math.max(-1, Math.min(1, y)).toFixed(3))
      })
    }

    const onPointerLeave = () => {
      svg.style.setProperty('--tx', '0')
      svg.style.setProperty('--ty', '0')
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('mouseleave', onPointerLeave)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('mouseleave', onPointerLeave)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 400 400"
      role="img"
      aria-label="An abstract studio schematic: concentric viewfinder rings with a rotating arc and three marked nodes."
      className="hero-schematic h-auto w-full"
    >
      <defs>
        <linearGradient id="arcFade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.15" />
          <stop offset="45%" stopColor="var(--color-accent)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Outer ring */}
      <circle
        cx="200"
        cy="200"
        r="176"
        fill="none"
        stroke="var(--color-ink)"
        strokeOpacity="0.12"
      />

      {/* Radial ticks */}
      <g stroke="var(--color-ink)" strokeOpacity="0.16" strokeWidth="1">
        {TICKS.map((angle) => {
          const outer = polar(angle, 176)
          const inner = polar(angle, angle % 30 === 0 ? 164 : 169)
          return (
            <line
              key={angle}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              strokeOpacity={angle % 30 === 0 ? 0.3 : 0.13}
            />
          )
        })}
      </g>

      {/* Dashed inner ring */}
      <circle
        cx="200"
        cy="200"
        r="146"
        fill="none"
        stroke="var(--color-ink)"
        strokeOpacity="0.22"
        strokeWidth="1"
        strokeDasharray="2 9"
      />

      {/* Rotating accent arc */}
      <g className="hero-arc">
        <path
          d="M 200 40 A 160 160 0 0 1 338 200"
          fill="none"
          stroke="url(#arcFade)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="200" cy="40" r="2.6" fill="var(--color-accent)" />
      </g>

      {/* Crosshairs */}
      <g stroke="var(--color-ink)" strokeOpacity="0.1" strokeWidth="1">
        <line x1="24" y1="200" x2="376" y2="200" />
        <line x1="200" y1="24" x2="200" y2="376" />
      </g>

      {/* Inner diamond */}
      <path
        d="M 200 118 L 282 200 L 200 282 L 118 200 Z"
        fill="none"
        stroke="var(--color-ink)"
        strokeOpacity="0.26"
        strokeWidth="1"
      />

      {/* Core square */}
      <rect
        x="182"
        y="182"
        width="36"
        height="36"
        fill="none"
        stroke="var(--color-ink)"
        strokeOpacity="0.4"
        strokeWidth="1"
        transform="rotate(45 200 200)"
      />

      {/* Marked nodes */}
      <g>
        {NODES.map((node) => {
          const point = polar(node.angle, node.radius)
          return (
            <g key={node.angle}>
              <circle
                className="hero-node"
                cx={point.x}
                cy={point.y}
                r="9"
                fill="none"
                stroke="var(--color-accent)"
                strokeOpacity="0.4"
                strokeWidth="1"
                style={{ animationDelay: `${node.angle}ms` }}
              />
              <circle cx={point.x} cy={point.y} r="2.4" fill="var(--color-accent)" />
            </g>
          )
        })}
      </g>

      {/* Readout frame */}
      <g
        stroke="var(--color-ink)"
        strokeOpacity="0.18"
        strokeWidth="1"
        fill="none"
      >
        <path d="M40 40 H96" />
        <path d="M40 40 V72" />
        <path d="M360 360 H304" />
        <path d="M360 360 V328" />
      </g>
    </svg>
  )
}
