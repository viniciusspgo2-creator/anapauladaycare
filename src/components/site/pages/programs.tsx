'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Reveal, Words } from '@/components/site/reveal'
import { PROGRAMS } from '@/data/site'
import { useLang } from '@/components/site/lang-provider'
import { Star, StarSolid, Blocks, Pencil, Rainbow, Sun, Cloud, Sparkle } from '@/components/site/doodles'

const EASE = [0.22, 1, 0.36, 1] as const

const ACCENTS = {
  blue: { chip: 'bg-blue-100 text-blue-600', soft: 'bg-blue-50', text: 'text-blue-700', frame: 'bg-blue-100', icon: <Blocks className="h-8 w-8 text-blue-500" /> },
  orange: { chip: 'bg-orange-100 text-orange-600', soft: 'bg-orange-50', text: 'text-orange-600', frame: 'bg-orange-100', icon: <StarSolid className="h-8 w-8 text-orange-500" /> },
  green: { chip: 'bg-green-100 text-green-700', soft: 'bg-green-50', text: 'text-green-700', frame: 'bg-green-100', icon: <Pencil className="h-8 w-8 text-green-600" /> },
  pink: { chip: 'bg-pink-100 text-pink-600', soft: 'bg-pink-50', text: 'text-pink-600', frame: 'bg-pink-100', icon: <Star className="h-8 w-8 text-pink-500" /> },
} as const

const FRAMES = [
  'rounded-[2rem] rotate-[1deg]',           // infants
  'rounded-[2rem] -rotate-[1deg]',          // toddlers
  'rounded-[2rem] rotate-[1deg]',           // preschool
]

/** PROGRAMS — programas numerados, cores próprias, fotos divertidas. */
export function ProgramsPage() {
  const { t, tf } = useLang()
  return (
    <>
      {/* Abertura */}
      <section className="relative overflow-hidden bg-cream pb-12 pt-32 sm:pt-44" aria-label="Programs">
      <div
        className="bg-dots-navy pointer-events-none absolute inset-x-0 top-0 h-44 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]"
        aria-hidden
      />
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Cloud className="anim-float-a absolute left-[6%] top-32 h-16 w-16 text-blue-100" />
          <Cloud className="absolute right-[10%] top-44 h-12 w-12 text-pink-100" />
          <Sun className="anim-spin-slow absolute right-[22%] top-28 h-14 w-14 text-yellow-200" />
          <Star className="anim-float-b absolute left-[20%] top-52 h-8 w-8 text-pink-300" />
          <Sparkle className="absolute left-[38%] top-40 h-6 w-6 text-blue-300" />
        </div>
        <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <p className="eyebrow">{t('Programs')}</p>
            <h1 className="font-display mt-5 max-w-[18ch] text-[2.6rem] font-bold leading-[1.08] text-navy sm:text-[3.9rem]">
              {t('Care that grows')} <span className="text-blue-600">{t('with the child.')}</span>
            </h1>
            <p className="mt-5 max-w-[52ch] text-[1.05rem] font-semibold leading-relaxed text-ink-soft">
              {t('Three programs, one philosophy: gentle attention and play-based learning, matched to each stage of early childhood.')}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Programas alternados */}
      <section className="overflow-x-clip bg-white pb-10 pt-6" aria-label="Program list">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          {PROGRAMS.map((p, i) => {
            const flipped = i % 2 === 1
            const a = ACCENTS[p.color]
            return (
              <article
                key={p.id}
                className="grid items-center gap-10 py-14 sm:py-16 lg:grid-cols-12 lg:gap-14"
                aria-label={p.name}
              >
                {/* Texto */}
                <div className={`lg:col-span-6 ${flipped ? 'lg:order-2' : 'lg:order-1'}`}>
                  <Reveal>
                    <div className="flex items-center gap-4">
                      <span className={`font-display flex h-16 w-16 items-center justify-center rounded-3xl ${a.chip} text-[1.6rem] font-bold`}>
                        {p.index}
                      </span>
                      <span className={`chip ${a.chip}`}>{t('Program')}</span>
                    </div>
                    <h2 className="font-display mt-5 text-[2.1rem] font-bold text-navy sm:text-[2.8rem]">
                      {t(p.name)}
                    </h2>
                    <p className="mt-4 max-w-[52ch] text-[1.02rem] font-semibold leading-relaxed text-ink-soft">
                      {t(p.long)}
                    </p>
                    <ul className="mt-6 grid gap-3">
                      {p.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-3">
                          <span className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${a.chip} text-[0.7rem] font-black`} aria-hidden>
                            ✓
                          </span>
                          <span className="font-bold text-navy/85">{t(h)}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 text-[0.8rem] font-extrabold uppercase tracking-[0.14em] text-ink-faint">
                      {p.ageRange ?? t('[CONTENT REQUIRED: exact age range]')}
                    </p>
                    <a href="#/contact" className={`btn mt-6 ${p.color === 'green' ? 'btn-green' : p.color === 'orange' ? 'btn-yellow' : 'btn-blue'}`}>
                      {tf('Ask about {name} openings', { name: t(p.name).toLowerCase() })}
                      <span className="arr" aria-hidden>
                        →
                      </span>
                    </a>
                  </Reveal>
                </div>

                {/* Foto em moldura divertida */}
                <div className={`lg:col-span-6 ${flipped ? 'lg:order-1' : 'lg:order-2'}`}>
                  <motion.figure
                    initial={{ opacity: 0, y: 26, rotate: flipped ? -2 : 2 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="relative"
                  >
                    <span className={`blob-a absolute -inset-5 ${a.frame} opacity-70`} aria-hidden />
                    <div className={`relative aspect-[5/4] overflow-hidden border-[5px] border-white shadow-pop ${FRAMES[i]}`}>
                      <Image
                        src={p.image}
                        alt={p.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                    <span className={`chip absolute -bottom-4 left-8 ${a.chip} rotate-[-2deg] shadow-pop-sm`} aria-hidden>
                      {t(p.name)} · {p.index}
                    </span>
                  </motion.figure>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* CTA final */}
      <section className="overflow-x-clip bg-white pb-24 pt-8" aria-label="Join us">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <div className="shadow-sticker relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-500 via-blue-600 to-navy px-7 py-12 text-center sm:px-12 sm:py-16">
            <div className="bg-dots-white pointer-events-none absolute inset-0 opacity-30" aria-hidden />

              <Rainbow size={84} className="absolute -left-2 bottom-2 opacity-70" aria-hidden />
              <Star className="anim-float-a absolute right-[10%] top-8 h-10 w-10 text-yellow-300" aria-hidden />
              <StarSolid className="anim-float-b absolute right-[24%] bottom-10 h-6 w-6 text-pink-300" aria-hidden />
              <h2 className="font-display relative mx-auto max-w-[24ch] text-[1.9rem] font-bold leading-[1.15] text-white sm:text-[2.5rem]">
                {t('Not sure which program fits?')} <span className="text-yellow-300">{t("We'll figure it out together.")}</span>
              </h2>
              <div className="relative mt-8 flex flex-wrap justify-center gap-4">
                <a href="#/quiz" className="btn btn-yellow">
                  {t('Take the 2-minute quiz')}
                  <span className="arr" aria-hidden>
                    →
                  </span>
                </a>
                <a href="#/contact" className="btn border-2 border-white/60 text-white hover:bg-white/10">
                  {t('Contact us')}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
