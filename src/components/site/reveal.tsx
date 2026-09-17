'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import Image from 'next/image'
import { useCallback, useRef, type ReactNode } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

/** Fade + rise once when entering the viewport. */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'span' | 'li' | 'section' | 'figure' | 'blockquote' | 'p' | 'h2'
}) {
  const reduce = useReducedMotion()
  const Comp = motion[as] as typeof motion.div
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Comp>
  )
}

/** Cinematic image reveal: the frame unmasks from the bottom, photo settles from a slight scale. */
export function ImageMask({
  src,
  alt,
  className,
  imgClassName,
  delay = 0,
  sizes,
  priority,
}: {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  delay?: number
  sizes?: string
  priority?: boolean
}) {
  const reduce = useReducedMotion()
  return (
    <motion.figure
      className={`relative overflow-hidden bg-sand ${className ?? ''}`}
      initial={reduce ? { opacity: 0 } : { clipPath: 'inset(8% 0% 8% 0%)', opacity: 0 }}
      whileInView={
        reduce ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }
      }
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1.15, delay, ease: EASE }}
    >
      <motion.div
        className="h-full w-full"
        initial={reduce ? undefined : { scale: 1.06 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 1.35, delay, ease: EASE }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${imgClassName ?? ''}`}
        />
      </motion.div>
    </motion.figure>
  )
}

/** Word-by-word staggered reveal for editorial headlines. */
export function Words({
  text,
  className,
  delay = 0,
  as = 'span',
  accentWords = [],
}: {
  text: string
  className?: string
  delay?: number
  as?: 'span' | 'h1' | 'h2' | 'p'
  accentWords?: string[]
}) {
  const reduce = useReducedMotion()
  const words = text.split(' ')
  const Comp = motion[as] as typeof motion.span
  if (reduce) {
    return <Comp className={className}>{text}</Comp>
  }
  return (
    <Comp
      key={text}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.055, delayChildren: delay } },
      }}
      aria-label={text}
    >
      {words.map((w, i) => {
        const clean = w.replace(/[.,—]/g, '').toLowerCase()
        const accent = accentWords.some((a) => clean.includes(a.toLowerCase()))
        return (
          <motion.span
            key={`${w}-${i}`}
            aria-hidden
            className="inline-block will-change-transform"
            variants={{
              hidden: { opacity: 0, y: '0.6em', rotate: 0.5 },
              show: {
                opacity: 1,
                y: '0em',
                rotate: 0,
                transition: { duration: 0.85, ease: EASE },
              },
            }}
          >
            <span className={accent ? 'text-pink-500' : undefined}>{w}</span>
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        )
      })}
    </Comp>
  )
}

/** Horizontal hairline that draws itself on scroll. */
export function LineDraw({
  className,
  delay = 0,
  light = false,
}: {
  className?: string
  delay?: number
  light?: boolean
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      aria-hidden
      className={`h-px w-full ${light ? 'bg-paper/20' : 'bg-ink/15'} ${className ?? ''}`}
      initial={reduce ? { opacity: 0 } : { scaleX: 0 }}
      whileInView={reduce ? { opacity: 1 } : { scaleX: 1 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 1.1, delay, ease: EASE }}
      style={{ transformOrigin: 'left' }}
    />
  )
}

/** Numbered editorial section marker: "01 / Manifesto". */
export function SectionMark({
  index,
  label,
  light = false,
  className,
}: {
  index: string
  label: string
  light?: boolean
  className?: string
}) {
  return (
    <Reveal className={`flex items-center gap-2.5 ${className ?? ''}`} y={10}>
      <span
        className={`flex h-7 min-w-7 items-center justify-center rounded-full px-1.5 text-[0.7rem] font-extrabold ${
          light ? 'bg-white/15 text-yellow-400' : 'bg-blue-100 text-blue-700'
        }`}
      >
        {index}
      </span>
      <span
        className={`text-[0.72rem] font-extrabold uppercase tracking-[0.2em] ${
          light ? 'text-white/70' : 'text-ink-soft'
        }`}
      >
        {label}
      </span>
    </Reveal>
  )
}

/** Drag-to-scroll horizontal strip with snap + momentum (used by galleries). */
export function useDragScroll() {
  const ref = useRef<HTMLDivElement>(null)
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const el = ref.current
    if (!el || e.button !== 0) return
    const startX = e.pageX
    const startScroll = el.scrollLeft
    el.classList.add('is-dragging')
    const onMove = (ev: MouseEvent) => {
      ev.preventDefault()
      el.scrollLeft = startScroll - (ev.pageX - startX)
    }
    const onUp = () => {
      el.classList.remove('is-dragging')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [])
  return { ref, onMouseDown }
}

export const editorialVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.08, ease: EASE },
  }),
}
