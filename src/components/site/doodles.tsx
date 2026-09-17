/* ============================================================
   ANA PAULA — doodle library
   One consistent hand: 2.4px rounded strokes, no clipart.
   All decorative, aria-hidden by default usage.
   ============================================================ */
import type { SVGProps } from 'react'

type D = SVGProps<SVGSVGElement> & { size?: number }

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 48 48',
  fill: 'none' as const,
  'aria-hidden': true as const,
})

export function Star({ size = 32, ...p }: D) {
  return (
    <svg {...base(size)} {...p}>
      <path
        d="M24 4l5.6 11.8 12.9 1.7-9.5 9 2.4 12.8L24 33.2l-11.4 6.1 2.4-12.8-9.5-9 12.9-1.7L24 4z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function StarSolid({ size = 32, ...p }: D) {
  return (
    <svg {...base(size)} {...p}>
      <path
        d="M24 4l5.6 11.8 12.9 1.7-9.5 9 2.4 12.8L24 33.2l-11.4 6.1 2.4-12.8-9.5-9 12.9-1.7L24 4z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Sparkle({ size = 24, ...p }: D) {
  return (
    <svg {...base(size)} {...p}>
      <path
        d="M24 6c1.2 9.5 4.5 12.8 14 14-9.5 1.2-12.8 4.5-14 14-1.2-9.5-4.5-12.8-14-14 9.5-1.2 12.8-4.5 14-14z"
        fill="currentColor"
      />
    </svg>
  )
}

export function Sun({ size = 48, ...p }: D) {
  return (
    <svg {...base(size)} {...p}>
      <circle cx="24" cy="24" r="9" stroke="currentColor" strokeWidth="2.4" />
      <path
        d="M24 5v5M24 38v5M5 24h5M38 24h5M10 10l3.6 3.6M34.4 34.4L38 38M38 10l-3.6 3.6M13.6 34.4L10 38"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Cloud({ size = 48, ...p }: D) {
  return (
    <svg {...base(size)} {...p}>
      <path
        d="M13 33a7 7 0 0 1-.8-13.95A10 10 0 0 1 31.5 16 8.5 8.5 0 0 1 36 33H13z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Rainbow({ size = 56, ...p }: D) {
  return (
    <svg width={size} height={(size * 30) / 48} viewBox="0 0 48 30" fill="none" aria-hidden {...p}>
      <path d="M4 27a20 20 0 0 1 40 0" stroke="#F03078" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M10 27a14 14 0 0 1 28 0" stroke="#FCC000" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M16 27a8 8 0 0 1 16 0" stroke="#9CC024" strokeWidth="3.4" strokeLinecap="round" />
    </svg>
  )
}

export function Flower({ size = 36, ...p }: D) {
  return (
    <svg {...base(size)} {...p}>
      <circle cx="24" cy="24" r="4.5" stroke="currentColor" strokeWidth="2.4" />
      <path
        d="M24 15.5c0-4.5 0-7.5 0-7.5s0 3 0 7.5zM24 32.5c0 4.5 0 7.5 0 7.5s0-3 0-7.5zM15.5 24c-4.5 0-7.5 0-7.5 0s3 0 7.5 0zM32.5 24c4.5 0 7.5 0 7.5 0s-3 0-7.5 0z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M18 18c-3-3-5-5-5-5s2 2 5 5zM30 30c3 3 5 5 5 5s-2-2-5-5zM30 18c3-3 5-5 5-5s-2 2-5 5zM18 30c-3 3-5 5-5 5s2-2 5-5z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Blocks({ size = 48, ...p }: D) {
  return (
    <svg {...base(size)} {...p}>
      <rect x="6" y="22" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="2.4" />
      <rect x="26" y="22" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="2.4" />
      <rect x="16" y="6" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="2.4" />
      <path d="M21 11.5h6M12.5 27.5h3M31.5 27.5h3M12.5 32.5h3M31.5 32.5h3" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M27 16.5l3-4 3 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Pencil({ size = 48, ...p }: D) {
  return (
    <svg {...base(size)} {...p}>
      <path
        d="M12 36l2.2-7.2L33 10a3.4 3.4 0 0 1 4.8 4.8L19 33.8 12 36z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path d="M30 13l5 5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M12 36l4.4-1.4L14 32l-2 4z" fill="currentColor" />
    </svg>
  )
}

export function Smile({ size = 36, ...p }: D) {
  return (
    <svg {...base(size)} {...p}>
      <circle cx="24" cy="24" r="17" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="18" cy="20" r="1.6" fill="currentColor" />
      <circle cx="30" cy="20" r="1.6" fill="currentColor" />
      <path d="M17 28c1.8 2.6 4.2 4 7 4s5.2-1.4 7-4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

export function Heart({ size = 32, ...p }: D) {
  return (
    <svg {...base(size)} {...p}>
      <path
        d="M24 40S7 29.5 7 17.8C7 12 11.4 8 16.6 8c3.2 0 5.9 1.6 7.4 4.2C25.5 9.6 28.2 8 31.4 8 36.6 8 41 12 41 17.8 41 29.5 24 40 24 40z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ArrowSquiggle({ size = 48, ...p }: D) {
  return (
    <svg {...base(size)} {...p}>
      <path
        d="M6 32c8 2 14-1 16-8 1.5 6 6 9 14 8"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path d="M30 26.5L37 32l-7.5 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function SquiggleLine({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 12" fill="none" aria-hidden className={className}>
      <path
        d="M2 8 Q 12 2, 24 7 T 48 7 T 72 7 T 96 7 T 118 6"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Circles({ size = 40, ...p }: D) {
  return (
    <svg {...base(size)} {...p}>
      <circle cx="17" cy="24" r="9" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="31" cy="24" r="9" stroke="currentColor" strokeWidth="2.4" />
    </svg>
  )
}

export function Kite({ size = 48, ...p }: D) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M24 4l12 14-12 14L12 18 24 4z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M12 18h24M24 4v28" stroke="currentColor" strokeWidth="2" />
      <path d="M24 32c-3 3-2 6 1 8s3 5-1 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

/** Big soft blob used behind hero/photos. */
export function BlobShape({ className, color = 'var(--yellow-100)' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden className={className}>
      <path
        fill={color}
        d="M45.9,-66.2C58.8,-58.1,68.1,-44.6,73.4,-29.6C78.7,-14.5,80,2.1,75.4,16.8C70.8,31.4,60.3,44.1,47.4,53.6C34.5,63.1,19.2,69.5,2.7,72.4C-13.8,75.3,-31.4,74.8,-45.5,66.9C-59.6,59.1,-70.2,43.9,-75.4,27.2C-80.6,10.5,-80.3,-7.7,-74.3,-23.5C-68.3,-39.3,-56.6,-52.7,-42.6,-60.8C-28.6,-68.9,-12.3,-71.7,2.2,-74.6C16.7,-77.4,33.1,-74.3,45.9,-66.2Z"
        transform="translate(100 100)"
      />
    </svg>
  )
}

/** Confetti dots + stars scatter for hero backgrounds. */
export function ConfettiDots({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" fill="none" aria-hidden className={className}>
      <circle cx="40" cy="60" r="5" fill="#F03078" opacity="0.5" />
      <circle cx="340" cy="40" r="7" fill="#9CC024" opacity="0.5" />
      <circle cx="200" cy="24" r="4" fill="#0060B4" opacity="0.4" />
      <circle cx="370" cy="200" r="5" fill="#FCC000" opacity="0.55" />
      <circle cx="30" cy="240" r="6" fill="#FCA800" opacity="0.45" />
      <circle cx="120" cy="360" r="5" fill="#0060B4" opacity="0.4" />
      <circle cx="300" cy="350" r="6" fill="#F03078" opacity="0.4" />
      <path d="M90 130l4 8 9 1-6.5 6 1.6 8.8L90 149l-8.1 4.8 1.6-8.8-6.5-6 9-1 4-8z" fill="#FCC000" opacity="0.6" />
      <path d="M330 290l3 6 7 .8-5 4.8 1.2 6.8-6.2-3.6-6.2 3.6 1.2-6.8-5-4.8 7-.8 3-6z" fill="#F03078" opacity="0.5" />
    </svg>
  )
}
