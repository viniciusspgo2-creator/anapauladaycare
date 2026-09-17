'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Reveal, ImageMask, Words } from '@/components/site/reveal'
import { VALUES, PILLARS, EXPECTATIONS } from '@/data/site'
import { useLang } from '@/components/site/lang-provider'
import { useContent } from '@/components/site/content-provider'
import { Star, StarSolid, Sun, Flower, Rainbow, Sparkle, SquiggleLine, Heart } from '@/components/site/doodles'

const EASE = [0.22, 1, 0.36, 1] as const
const PILLAR_ACCENTS = [
  { chip: 'bg-pink-100 text-pink-600', bar: 'bg-pink-400' },
  { chip: 'bg-blue-100 text-blue-600', bar: 'bg-blue-400' },
  { chip: 'bg-yellow-100 text-yellow-700', bar: 'bg-yellow-400' },
  { chip: 'bg-green-100 text-green-700', bar: 'bg-green-400' },
]

/** ABOUT — página narrativa com energia infantil e acabamento premium. */
export function AboutPage() {
  const { t, tf } = useLang()
  const { site } = useContent()
  return (
    <>
      {/* Abertura divertida */}
      <section className="relative overflow-hidden bg-cream pb-14 pt-32 sm:pt-44" aria-label="Our story">
      <div
        className="bg-dots-navy pointer-events-none absolute inset-x-0 top-0 h-44 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]"
        aria-hidden
      />
        <ConfettiBg />
        <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <p className="eyebrow">{t('About us')}</p>
            <h1 className="font-display mt-5 max-w-[18ch] text-[2.6rem] font-bold leading-[1.08] text-navy sm:text-[3.9rem]">
              {t('A Place Where')} <span className="text-pink-500">{t('Little Ones')}</span>{' '}
              <span className="squiggle">{t('Feel at Home')}</span>
            </h1>
          </Reveal>
          <div className="mt-9 grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-6" delay={0.15}>
              <p className="text-[1.05rem] font-semibold leading-relaxed text-ink-soft">
                {tf('Ana Paula Daycare is a {setting} in San Francisco — a real home, with a real family rhythm, where a small group of children spends the day learning through play under attentive, loving care.', { setting: site.setting })}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#/contact" className="btn btn-pink">
                  {t('Schedule a Visit')}
                  <span className="arr" aria-hidden>
                    →
                  </span>
                </a>
                <a href="#/programs" className="btn btn-white">
                  {t('See our programs')}
                </a>
              </div>
            </Reveal>
            <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.25}>
              <div className="relative">
                <div className="arch relative aspect-[4/4.4] overflow-hidden border-[5px] border-white bg-pink-100 shadow-pop">
                  <Image
                    src="/images/gallery/mother-son-art.webp"
                    alt="A caregiver and child painting together at the art table"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 38vw"
                    className="object-cover"
                  />
                </div>
                <Star className="anim-float-a absolute -left-5 top-6 h-10 w-10 text-yellow-400" />
                <Flower className="anim-float-b absolute -right-4 bottom-10 h-10 w-10 text-pink-400" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* História + pilares como blocos coloridos */}
      <section className="bg-white py-20 sm:py-28" aria-label="Philosophy">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="eyebrow">{t('How we care')}</p>
                <h2 className="font-display mt-4 text-[1.9rem] font-bold leading-[1.15] text-navy sm:text-[2.4rem]">
                  {t('Care is the')} <span className="text-blue-600">{t('curriculum.')}</span>
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal delay={0.1}>
                <p className="text-[1.02rem] font-semibold leading-relaxed text-ink-soft">
                  {t('Nothing about the day feels institutional. Children settle on the mat for stories, gather at the table for meals, explore shelves of open-ended toys, and step outside for fresh air — always within sight and sound of a caring adult.')}
                </p>
                <p className="mt-4 text-[1.02rem] font-semibold leading-relaxed text-ink-soft">
                  {t('We work closely with parents, sharing the little details of each day. That partnership is what makes an unfamiliar place feel like a second home — for children')} <span className="font-extrabold text-navy">{t('and')}</span> {t('for their families.')}
                </p>
              </Reveal>
            </div>
          </div>

          {/* Pilares — blocos com cores próprias */}
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
            {PILLARS.map((p, i) => (
              <li key={p.index} className={i % 2 === 1 ? 'lg:translate-y-8' : ''}>
                <Reveal delay={0.06 * i} y={20}>
                  <div className="hover-wiggle relative h-full rounded-[1.6rem] border-2 border-ink/5 bg-cream p-6 shadow-pop-sm">
                    <span className={`chip ${PILLAR_ACCENTS[i].chip}`}>{p.index}</span>
                    <h3 className="font-display mt-4 text-[1.3rem] font-bold leading-snug text-navy">
                      {t(p.title)}
                    </h3>
                    <p className="mt-2 text-[0.9rem] font-semibold leading-relaxed text-ink-soft">
                      {t(p.description)}
                    </p>
                    <span className={`absolute inset-x-6 bottom-0 h-1 rounded-full ${PILLAR_ACCENTS[i].bar} opacity-70`} aria-hidden />
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Momentos — colagem inclinada */}
      <section className="relative overflow-hidden bg-yellow-50 py-20 sm:py-24" aria-label="Moments from our days">
      <div className="bg-stripes-soft pointer-events-none absolute inset-0 opacity-40" aria-hidden />

        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <Reveal className="text-center">
            <p className="eyebrow justify-center">{t('Moments')}</p>
            <h2 className="font-display mt-4 text-[1.9rem] font-bold text-navy sm:text-[2.5rem]">
              {t('Little Steps,')} <span className="text-orange-500">{t('Big Growth')}</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4">
            {[
              { src: '/images/gallery/wood-blocks-teacher.webp', alt: 'Teacher guiding a child with wooden blocks', tape: 'bg-pink-300/80', tilt: '-rotate-2' },
              { src: '/images/gallery/girl-with-train.webp', alt: 'Girl concentrating on a toy train', tape: 'bg-blue-300/80', tilt: 'rotate-2 lg:mt-10' },
              { src: '/images/gallery/nursery-group.webp', alt: 'Children playing together in the nursery', tape: 'bg-green-300/80', tilt: '-rotate-1' },
              { src: '/images/gallery/kids-painting.webp', alt: 'Children painting side by side', tape: 'bg-yellow-300/90', tilt: 'rotate-2 lg:mt-10' },
            ].map((p, i) => (
              <motion.div
                key={p.src}
                className={`hover-wiggle relative ${p.tilt}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.7, delay: 0.06 * i, ease: EASE }}
              >
                <span className={`tape -top-3 left-1/2 z-10 -translate-x-1/2 ${i % 2 ? 'rotate-3' : '-rotate-3'} ${p.tape}`} aria-hidden />
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border-[5px] border-white bg-white shadow-pop-sm">
                  <Image src={p.src} alt={p.alt} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Valores + expectativas */}
      <section className="bg-white py-20 sm:py-28" aria-label="What we value">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <p className="eyebrow">{t('What guides our care')}</p>
            <h2 className="font-display mt-4 text-[1.9rem] font-bold text-navy sm:text-[2.5rem]">
              {t('What We')} <span className="text-pink-500">{t('Value')}</span>
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={0.05 * i}>
                <div className="flex items-start gap-4 rounded-2xl bg-cream p-6 shadow-pop-sm">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-pink-100" aria-hidden>
                    <Heart className="h-6 w-6 text-pink-500" />
                  </span>
                  <div>
                    <h3 className="font-display text-[1.35rem] font-bold text-navy">{t(v.title)}</h3>
                    <p className="mt-1.5 font-semibold leading-relaxed text-ink-soft">{t(v.description)}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16">
            <Reveal>
              <p className="eyebrow">{t('What families can expect')}</p>
            </Reveal>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {EXPECTATIONS.map((e, i) => (
                <Reveal key={e.title} delay={0.06 * i}>
                  <div className={`h-full rounded-[1.6rem] p-6 shadow-pop-sm ${['bg-yellow-100', 'bg-blue-100', 'bg-pink-100'][i]}`}>
                    <span className="font-display text-[1.9rem] font-bold text-navy/20" aria-hidden>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-display -mt-2 text-[1.3rem] font-bold leading-snug text-navy">{t(e.title)}</h3>
                    <p className="mt-2 text-[0.9rem] font-semibold leading-relaxed text-ink/70">{t(e.description)}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Reveal className="mt-20">
            <div className="shadow-sticker relative overflow-hidden rounded-[2.5rem] bg-navy px-7 py-12 text-center sm:px-12 sm:py-16">
            <div className="bg-dots-white pointer-events-none absolute inset-0 opacity-30" aria-hidden />

              <Sun className="anim-spin-slow absolute left-[6%] top-8 h-14 w-14 text-yellow-400/50" aria-hidden />
              <Star className="anim-float-a absolute right-[10%] bottom-8 h-9 w-9 text-pink-400/60" aria-hidden />
              <Sparkle className="absolute right-[24%] top-10 h-6 w-6 text-white/50" aria-hidden />
              <Rainbow size={72} className="absolute -left-1 bottom-2 opacity-50" aria-hidden />
              <h2 className="font-display relative mx-auto max-w-[24ch] text-[1.9rem] font-bold leading-[1.15] text-white sm:text-[2.5rem]">
                {t('Sound like the right place')} <span className="text-yellow-400">{t('for your child?')}</span>
              </h2>
              <div className="relative mt-8 flex flex-wrap justify-center gap-4">
                <a href="#/contact" className="btn btn-pink">
                  {t('Schedule a visit')}
                  <span className="arr" aria-hidden>
                    →
                  </span>
                </a>
                <a href="#/programs" className="btn border-2 border-white/60 text-white hover:bg-white/10">
                  {t('See our programs')}
                </a>
              </div>
              <SquiggleLine className="mx-auto mt-8 w-40 text-yellow-400/70" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

function ConfettiBg() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <Star className="anim-float-a absolute right-[10%] top-28 h-12 w-12 text-yellow-300" />
      <Star className="anim-float-b absolute right-[26%] top-52 h-7 w-7 text-pink-300" />
      <Sun className="anim-spin-slow absolute left-[4%] top-36 h-16 w-16 text-yellow-200" />
      <Sparkle className="absolute left-[22%] top-24 h-6 w-6 text-blue-300" />
      <StarSolid className="anim-float-a absolute left-[8%] bottom-10 h-8 w-8 text-green-200" />
      <SquiggleLine className="absolute right-[36%] top-24 w-24 text-yellow-300" />
    </div>
  )
}
