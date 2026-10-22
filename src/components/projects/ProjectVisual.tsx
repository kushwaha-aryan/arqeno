import type { ProjectVisual as ProjectVisualKey } from '../../config/projects'

type ProjectVisualProps = {
  visual: ProjectVisualKey
  /** Accessible description of the diagram. */
  title: string
  className?: string
}

/**
 * Schematic illustrations for the project cards.
 *
 * Every composition is drawn from primitives — rings, grids, waveforms,
 * matrices — and is labelled as a diagram rather than a screenshot. The
 * colours are read from the theme variables, so the same component works
 * on the paper sections and inside the inverted ones.
 */

const ink = 'var(--color-ink)'
const line = 'var(--color-line-strong)'
const accent = 'var(--color-accent)'
const signal = 'var(--color-signal)'

function Aperture() {
  return (
    <>
      <circle cx="60" cy="60" r="42" fill="none" stroke={line} strokeWidth="1" />
      <circle cx="60" cy="60" r="30" fill="none" stroke={line} strokeWidth="1" />
      {Array.from({ length: 8 }, (_, index) => {
        const angle = (index * Math.PI) / 4
        const inner = 14
        const outer = 30
        return (
          <line
            key={index}
            x1={60 + Math.cos(angle) * inner}
            y1={60 + Math.sin(angle) * inner}
            x2={60 + Math.cos(angle) * outer}
            y2={60 + Math.sin(angle) * outer}
            stroke={ink}
            strokeWidth="1"
            opacity={index % 2 === 0 ? 0.55 : 0.22}
          />
        )
      })}
      <circle cx="60" cy="60" r="9" fill="none" stroke={accent} strokeWidth="1.5" />
      <circle cx="60" cy="60" r="2.5" fill={accent} />
      <path d="M60 6v8M60 106v8M6 60h8M106 60h8" stroke={ink} strokeWidth="1" opacity="0.45" />
    </>
  )
}

function Filmstrip() {
  return (
    <>
      <rect x="6" y="26" width="108" height="68" fill="none" stroke={line} strokeWidth="1" />
      {[0, 1, 2, 3].map((index) => (
        <g key={index}>
          <rect
            x={14 + index * 26}
            y="34"
            width="20"
            height="20"
            fill="none"
            stroke={ink}
            strokeWidth="1"
            opacity={index === 1 ? 0.8 : 0.35}
          />
          <rect
            x={14 + index * 26}
            y="66"
            width="20"
            height="20"
            fill="none"
            stroke={ink}
            strokeWidth="1"
            opacity={index === 1 ? 0.8 : 0.35}
          />
        </g>
      ))}
      {Array.from({ length: 9 }, (_, index) => (
        <rect
          key={`perf-top-${index}`}
          x={10 + index * 13}
          y="28"
          width="6"
          height="3"
          fill={ink}
          opacity="0.3"
        />
      ))}
      {Array.from({ length: 9 }, (_, index) => (
        <rect
          key={`perf-bottom-${index}`}
          x={10 + index * 13}
          y="89"
          width="6"
          height="3"
          fill={ink}
          opacity="0.3"
        />
      ))}
      <rect x="40" y="34" width="20" height="20" fill={accent} opacity="0.16" />
      <rect x="40" y="34" width="20" height="20" fill="none" stroke={accent} strokeWidth="1.5" />
    </>
  )
}

function Agents() {
  return (
    <>
      <path d="M60 34v18M60 52H30v18M60 52h30v18M30 70v14M90 70v14" stroke={line} strokeWidth="1" />
      <circle cx="60" cy="26" r="9" fill="none" stroke={accent} strokeWidth="1.5" />
      <circle cx="60" cy="26" r="3" fill={accent} />
      <circle cx="24" cy="76" r="8" fill="none" stroke={ink} strokeWidth="1" />
      <circle cx="24" cy="76" r="2.5" fill={ink} />
      <circle cx="52" cy="76" r="8" fill="none" stroke={ink} strokeWidth="1" />
      <circle cx="52" cy="76" r="2.5" fill={ink} />
      <circle cx="96" cy="76" r="8" fill="none" stroke={ink} strokeWidth="1" />
      <circle cx="96" cy="76" r="2.5" fill={ink} />
      <circle cx="38" cy="100" r="8" fill="none" stroke={ink} strokeWidth="1" opacity="0.6" />
      <circle cx="82" cy="100" r="8" fill="none" stroke={ink} strokeWidth="1" opacity="0.6" />
      <path d="M30 92h8M42 92h10M68 92h8M82 92h8" stroke={line} strokeWidth="1" />
      <rect x="20" y="44" width="20" height="6" fill="none" stroke={signal} strokeWidth="1" />
    </>
  )
}

function Spectrogram() {
  const columns = 12
  const rows = 6
  const heights = [
    0.3, 0.6, 0.9, 0.45, 0.75, 0.35, 0.85, 0.55, 0.4, 0.95, 0.5, 0.65,
  ]
  return (
    <>
      {Array.from({ length: columns }, (_, column) =>
        Array.from({ length: rows }, (_, row) => {
          const threshold = (row + 0.5) / rows
          const active = threshold < heights[column]
          return (
            <rect
              key={`${column}-${row}`}
              x={12 + column * 9}
              y={18 + row * 15}
              width="7"
              height="13"
              fill={active ? ink : 'none'}
              opacity={active ? 0.16 + (rows - row) * 0.1 : 0}
              stroke={active ? 'none' : line}
              strokeWidth="0.75"
            />
          )
        }),
      )}
      <path
        d="M12 96c12-4 16 10 28 6s18-16 30-10 16 12 26 4 18-4 26 0"
        fill="none"
        stroke={accent}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M12 14h96" stroke={line} strokeWidth="1" />
    </>
  )
}

function Clusters() {
  const points = [
    [30, 34], [38, 44], [26, 46], [82, 40], [90, 50], [74, 48],
    [46, 78], [58, 86], [66, 76], [86, 88], [96, 80],
  ]
  const groups = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 10],
  ]
  return (
    <>
      <rect x="6" y="6" width="108" height="108" fill="none" stroke={line} strokeWidth="1" />
      <path d="M60 6v108M6 60h108" stroke={line} strokeWidth="1" strokeDasharray="2 4" opacity="0.8" />
      {groups.map((group, index) => (
        <circle
          key={index}
          cx={points[group[0]][0]}
          cy={points[group[0]][1]}
          r={16 + group.length * 2}
          fill="none"
          stroke={index === 0 ? accent : ink}
          strokeWidth="1"
          opacity={index === 0 ? 0.9 : 0.28}
        />
      ))}
      {points.map(([x, y], index) => (
        <circle
          key={index}
          cx={x}
          cy={y}
          r={index === 0 ? 4 : 3}
          fill={index === 0 ? accent : ink}
          opacity={index === 0 ? 1 : 0.65}
        />
      ))}
    </>
  )
}

function Document() {
  return (
    <>
      <rect x="30" y="8" width="60" height="104" fill="none" stroke={line} strokeWidth="1" />
      <path d="M42 30h36M42 42h24M42 54h36M42 66h30" stroke={ink} strokeWidth="1.5" opacity="0.55" />
      <rect x="42" y="80" width="14" height="20" fill={accent} opacity="0.18" />
      <rect x="42" y="80" width="14" height="20" fill="none" stroke={accent} strokeWidth="1.25" />
      <path d="M62 84h16M62 90h16M62 96h10" stroke={ink} strokeWidth="1" opacity="0.35" />
      <path d="M72 8v-0M30 8h60" stroke={line} strokeWidth="1" />
      <circle cx="60" cy="16" r="3" fill="none" stroke={line} strokeWidth="1" />
    </>
  )
}

function Catalogue() {
  return (
    <>
      {Array.from({ length: 3 }, (_, row) =>
        Array.from({ length: 4 }, (_, column) => (
          <rect
            key={`${row}-${column}`}
            x={14 + column * 26}
            y={22 + row * 30}
            width="20"
            height="22"
            fill="none"
            stroke={ink}
            strokeWidth="1"
            opacity={row === 0 && column === 1 ? 0.85 : 0.3}
          />
        )),
      )}
      <rect
        x="40"
        y="22"
        width="20"
        height="22"
        fill={accent}
        opacity="0.14"
      />
      <rect x="40" y="22" width="20" height="22" fill="none" stroke={accent} strokeWidth="1.5" />
      <path d="M14 112h92" stroke={line} strokeWidth="1" />
      <path d="M14 108h28M48 108h16M70 108h36" stroke={ink} strokeWidth="1" opacity="0.3" />
      <rect x="8" y="18" width="4" height="86" fill="none" stroke={line} strokeWidth="1" />
    </>
  )
}

function Tiles() {
  const cells = [
    '0001110000',
    '0012210000',
    '0122221000',
    '0122332100',
    '0012221000',
    '0001210000',
    '0000110000',
  ]
  return (
    <>
      {cells.map((row, y) =>
        row.split('').map((value, x) => {
          const solid = value !== '0'
          const accentCell = value === '3'
          return (
            <rect
              key={`${x}-${y}`}
              x={16 + x * 10}
              y={16 + y * 14}
              width="8"
              height="12"
              fill={accentCell ? accent : solid ? ink : 'none'}
              opacity={accentCell ? 0.9 : solid ? 0.5 : 1}
              stroke={solid && !accentCell ? 'none' : line}
              strokeWidth="0.75"
            />
          )
        }),
      )}
      <rect x="12" y="12" width="104" height="100" fill="none" stroke={line} strokeWidth="1" />
    </>
  )
}

const compositions: Record<ProjectVisualKey, () => React.JSX.Element> = {
  aperture: Aperture,
  filmstrip: Filmstrip,
  agents: Agents,
  spectrogram: Spectrogram,
  clusters: Clusters,
  document: Document,
  catalogue: Catalogue,
  tiles: Tiles,
}

/**
 * Renders the schematic that stands in for a project screenshot.
 */
export function ProjectVisual({ visual, title, className = '' }: ProjectVisualProps) {
  const Composition = compositions[visual]

  return (
    <svg
      viewBox="0 0 120 120"
      role="img"
      aria-label={title}
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <Composition />
    </svg>
  )
}
