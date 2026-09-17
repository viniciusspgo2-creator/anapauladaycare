'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal } from '@/components/site/reveal'
import { useContent } from '@/components/site/content-provider'
import { SmartImage } from '@/components/site/smart-image'
import { useLang } from '@/components/site/lang-provider'
import { Star, StarSolid, Flower, SquiggleLine, Sun } from '@/components/site/doodles'

const EASE = [0.22, 1, 0.36, 1] as const

type Photo = { src: string; alt: string; ratio: string; category: string }

const TAPES = ['bg-pink-300/80', 'bg-yellow-300/90', 'bg-green-300/80', 'bg-blue-300/80']
const TILTS = ['-rotate-1', 'rotate-1', '-rotate-[1.5deg]', 'rotate-[1.5deg]', '-rotate-[0.5deg]', 'rotate-[0.5deg]', '-rotate-2', 'rotate-2']

/** GALLERY — mural infantil: fotos inclinadas com fitas + lightbox. */
export function GalleryPage() {
  const { t, tf } = useLang()
  const { content } = useContent()
  const gallery = content.gallery
  const [category, setCategory] = useState('All')
  const photos: Photo[] = useMemo(
    () =>
      gallery.flatMap((c) =>
        c.images.map((img) => ({ ...img, ratio: img.ratio as string, category: c.name })),
      ),
    [gallery],
  )
  const filtered = photos.filter((p) => category === 'All' || p.category === category)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => setLightbox(null), [])
  const step = useCallback(
    (dir: 1 | -1) =>
      setLightbox((cur) => (cur === null ? cur : (cur + dir + filtered.length) % filtered.length)),
    [filtered.length],
  )

  useEffect(() => {
    if (lightbox === null) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    dialogRef.current?.focus()
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [lightbox, close, step])

  const categories = ['All', ...gallery.map((c) => c.name)]
  const catChips: Record<string, string> = {
    All: 'bg-navy text-white',
    'Creative Play': 'bg-pink-100 text-pink-600',
    'Hands-On Learning': 'bg-blue-100 text-blue-600',
    'Outdoor Fun': 'bg-green-100 text-green-700',
    'Daily Discovery': 'bg-yellow-100 text-yellow-700',
    'Happy Connections': 'bg-orange-100 text-orange-600',
    'Growing Confidence': 'bg-pink-100 text-pink-600',
  }

  return (
    <>
      {/* Abertura */}
      <section className="relative overflow-hidden bg-cream pb-10 pt-32 sm:pt-44" aria-label="Gallery">
      <div
        className="bg-dots-navy pointer-events-none absolute inset-x-0 top-0 h-44 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]"
        aria-hidden
      />
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Star className="anim-float-a absolute right-[8%] top-28 h-11 w-11 text-yellow-300" />
          <Star className="anim-float-b absolute right-[24%] top-44 h-7 w-7 text-pink-300" />
          <Sun className="anim-spin-slow absolute left-[4%] top-32 h-16 w-16 text-yellow-200" />
          <Flower className="anim-float-a absolute left-[16%] top-56 h-9 w-9 text-pink-300" />
          <SquiggleLine className="absolute left-[36%] top-32 w-24 text-blue-200" />
        </div>
        <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <p className="eyebrow">{t('Gallery')}</p>
            <h1 className="font-display mt-5 max-w-[18ch] text-[2.6rem] font-bold leading-[1.08] text-navy sm:text-[3.9rem]">
              {t('Moments We')} <span className="squiggle">{t('Share')}</span> {t('Every Day')}
            </h1>
            <p className="mt-5 max-w-[48ch] text-[1.05rem] font-semibold leading-relaxed text-ink-soft">
              {t('Unposed moments from real days — painting hands, busy puzzles, outdoor air and quiet concentration.')}
            </p>
          </Reveal>

          {/* Filtros divertidos */}
          <div className="mt-9 flex flex-wrap gap-2.5" role="tablist" aria-label="Filter by category">
            {categories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={category === c}
                onClick={() => {
                  setCategory(c)
                  setLightbox(null)
                }}
                className={`chip min-h-[40px] transition-all duration-300 ${
                  category === c
                    ? `${catChips[c] ?? 'bg-navy text-white'} scale-[1.03] shadow-pop`
                    : 'bg-white text-ink-soft hover:bg-white hover:text-navy hover:shadow-pop-sm'
                }`}
              >
                {category === c && <StarSolid className="h-3.5 w-3.5 text-yellow-400" aria-hidden />}
                {t(c)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Mural de fotos */}
      <section className="bg-cream pb-28 pt-10" aria-label="Photo wall">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="columns-2 gap-5 sm:gap-6 lg:columns-3 xl:columns-4 [&>*]:mb-6">
            {filtered.map((p, i) => (
              <Reveal key={p.src + i} delay={0.03 * (i % 8)} y={16} className="break-inside-avoid">
                <button
                  onClick={() => setLightbox(i)}
                  className={`hover-wiggle group relative block w-full ${TILTS[i % TILTS.length]}`}
                  aria-label={tf('Open photo: {alt}', { alt: p.alt })}
                >
                  <span className={`tape -top-3 left-1/2 z-10 -translate-x-1/2 ${i % 2 ? 'rotate-3' : '-rotate-3'} ${TAPES[i % TAPES.length]}`} aria-hidden />
                  <div className="relative w-full overflow-hidden rounded-2xl border-[5px] border-white bg-white shadow-pop-sm transition-shadow duration-300 group-hover:shadow-pop">
                    <div
                      className={`relative w-full ${
                        p.ratio === 'portrait'
                          ? 'aspect-[3/4]'
                          : p.ratio === 'square'
                            ? 'aspect-square'
                            : p.ratio === 'wide'
                              ? 'aspect-[16/10]'
                              : 'aspect-[4/3]'
                      }`}
                    >
                      <SmartImage
                        src={p.src}
                        alt={p.alt}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-navy/60 via-transparent to-transparent px-4 pb-3 pt-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden>
                      <span className="text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-white">
                        {t(p.category)}
                      </span>
                      <StarSolid className="h-4 w-4 text-yellow-400" />
                    </span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && filtered[lightbox] && (
          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-navy-ink/95 p-4 outline-none backdrop-blur-sm sm:p-10"
            role="dialog"
            aria-modal="true"
            aria-label={filtered[lightbox].alt}
            onClick={close}
          >
            <motion.figure
              key={lightbox}
              initial={{ opacity: 0, scale: 0.96, rotate: -1 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="relative max-h-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="overflow-hidden rounded-2xl border-[6px] border-white bg-white shadow-pop">
                <div className="relative max-h-[72vh]">
                  <SmartImage
                    src={filtered[lightbox].src}
                    alt={filtered[lightbox].alt}
                    width={1400}
                    height={1000}
                    priority
                    className="max-h-[72vh] w-auto max-w-full object-contain"
                  />
                </div>
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between gap-6 text-cream/85">
                <span className="text-sm font-bold">{filtered[lightbox].alt}</span>
                <span className="font-display text-sm font-bold text-cream/60">
                  {String(lightbox + 1).padStart(2, '0')} / {String(filtered.length).padStart(2, '0')}
                </span>
              </figcaption>
            </motion.figure>

            <button
              onClick={close}
              aria-label={t('Close gallery')}
              className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-cream/80 transition-colors hover:bg-white/20 hover:text-cream sm:right-8 sm:top-8"
            >
              <span className="relative block h-5 w-5" aria-hidden>
                <span className="absolute left-1/2 top-1/2 h-[2.5px] w-5 -translate-x-1/2 rotate-45 rounded-full bg-current" />
                <span className="absolute left-1/2 top-1/2 h-[2.5px] w-5 -translate-x-1/2 -rotate-45 rounded-full bg-current" />
              </span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                step(-1)
              }}
              aria-label={t('Previous photo')}
              className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-cream/70 transition-colors hover:bg-white/20 hover:text-cream sm:left-6"
            >
              ←
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                step(1)
              }}
              aria-label={t('Next photo')}
              className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-cream/70 transition-colors hover:bg-white/20 hover:text-cream sm:right-6"
            >
              →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
