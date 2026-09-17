'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ShieldCheck,
  Clock,
  MessageCircle,
  Heart,
  Sun,
  Users,
  Apple,
  Moon,
  Palette,
  MapPin,
} from 'lucide-react'
import { Reveal, Words } from '@/components/site/reveal'
import { DAY_STEPS, SAFETY_ITEMS, WHY_CHOOSE } from '@/data/site'
import { useContent } from '@/components/site/content-provider'
import { SmartImage } from '@/components/site/smart-image'
import { useLang } from '@/components/site/lang-provider'
import {
  Star,
  StarSolid,
  Sun as SunDoodle,
  Cloud,
  Rainbow,
  Blocks,
  Pencil,
  Kite,
  Flower,
  Sparkle,
  SquiggleLine,
} from '@/components/site/doodles'

const EASE = [0.22, 1, 0.36, 1] as const

type Accent = 'pink' | 'blue' | 'green' | 'yellow' | 'orange'

const ACCENT: Record<Accent, { solid: string; chip: string; soft: string; text: string; border: string }> = {
  pink: { solid: 'bg-pink-500', chip: 'bg-pink-100 text-pink-600', soft: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-200' },
  blue: { solid: 'bg-blue-500', chip: 'bg-blue-100 text-blue-600', soft: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
  green: { solid: 'bg-green-500', chip: 'bg-green-100 text-green-700', soft: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
  yellow: { solid: 'bg-yellow-400', chip: 'bg-yellow-100 text-yellow-700', soft: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-200' },
  orange: { solid: 'bg-orange-500', chip: 'bg-orange-100 text-orange-600', soft: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' },
}

/** Seções 05–13 da Home — PLAYFUL MODERN COLLAGE. */
export function HomeSections() {
  return (
    <>
      <Programs />
      <LittleMoments />
      <GalleryCollage />
      <WhyFamilies />
      <SafetyStrip />
      <Testimonial />
      <AnswersForParents />
      <LocationBlock />
      <FinalCTA />
    </>
  )
}

/* ============================================================
   05 — PROGRAMS · cards assimétricos (1 grande + 2 menores),
   cada um com sua cor, foto e CTA. bg azul clarinho.
   ============================================================ */
function Programs() {
  const { t, tf } = useLang()
  const { content } = useContent()
  const [infants, toddlers, preschool] = content.programs.items

  return (
    <section className="relative overflow-hidden bg-blue-50 py-20 sm:py-28" aria-label="Our programs">
      {/* textura própria: pontos brancos + nuvens */}
      <div className="bg-dots-white pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <Cloud className="anim-float-a pointer-events-none absolute left-[4%] top-12 h-16 w-16 text-white" />
      <Cloud className="pointer-events-none absolute right-[8%] top-24 h-12 w-12 text-white/80" />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="eyebrow">{t(content.programs.eyebrow)}</p>
            <h2 className="font-display mt-4 max-w-[20ch] text-[2rem] font-bold leading-[1.12] text-navy sm:text-[2.7rem]">
              {t(content.programs.heading1)} <span className="text-blue-600">{t(content.programs.headingAccent)}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <a href="#/programs" className="btn btn-white">
              {t('All programs')}
              <span className="arr" aria-hidden>
                →
              </span>
            </a>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-7">
          {/* CARD GRANDE — Infants */}
          <Reveal className="lg:col-span-7" y={24}>
            <article className="hover-wiggle group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-pop-sm">
              <span className="absolute inset-x-0 top-0 h-2 bg-blue-500" aria-hidden />
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-blue-100">
                <SmartImage
                  src={infants.image}
                  alt={infants.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <span className="chip absolute left-5 top-6 bg-blue-100 text-blue-600 -rotate-2">
                  01 · {t('Program')}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7 sm:p-8">
                <div className="flex items-center gap-3">
                  <h3 className="font-display text-[1.9rem] font-bold text-navy">{t(infants.name)}</h3>
                  <Blocks className="h-8 w-8 text-blue-500" />
                </div>
                <p className="mt-3 max-w-[54ch] font-semibold leading-relaxed text-ink-soft">{t(infants.long)}</p>
                <a href="#/programs" className="link-draw mt-5 w-fit text-[0.95rem] text-blue-700">
                  {tf('Learn more about {name}', { name: t(infants.name).toLowerCase() })}
                </a>
              </div>
            </article>
          </Reveal>

          {/* Coluna direita: 2 cards menores */}
          <div className="grid gap-6 lg:col-span-5">
            {[toddlers, preschool].map((p, idx) => (
              <Reveal key={p.name} delay={0.08 * (idx + 1)} y={24}>
                <article className="hover-wiggle group relative flex gap-5 overflow-hidden rounded-[1.75rem] bg-white p-5 shadow-pop-sm sm:p-6">
                  <span className={`absolute inset-y-0 left-0 w-2 ${ACCENT[['orange', 'green'][idx]].solid}`} aria-hidden />
                  <div className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-2xl bg-yellow-100 sm:w-32">
                    <SmartImage
                      src={p.image}
                      alt={p.imageAlt}
                      fill
                      sizes="(max-width: 640px) 112px, 128px"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                  </div>
                  <div className="flex min-w-0 flex-col justify-center">
                    <span className={`chip w-fit ${ACCENT[['orange', 'green'][idx]].chip} text-[0.7rem]`}>
                      0{idx + 2} · {t('Program')}
                    </span>
                    <h3 className="font-display mt-2 text-[1.45rem] font-bold text-navy">{t(p.name)}</h3>
                    <p className="mt-1.5 line-clamp-3 text-[0.875rem] font-semibold leading-relaxed text-ink-soft">
                      {t(p.short)}
                    </p>
                    <a href="#/programs" className={`link-draw mt-3 w-fit text-[0.85rem] ${ACCENT[['orange', 'green'][idx]].text}`}>
                      {t('Learn more')}
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}

            {/* mini CTA card */}
            <Reveal delay={0.24} y={24}>
              <article className="relative flex items-center justify-between gap-4 overflow-hidden rounded-[1.75rem] bg-navy p-6 text-cream shadow-pop-sm">
                <StarSolid className="anim-float-a absolute -right-3 -top-3 h-14 w-14 text-yellow-400/40" aria-hidden />
                <div>
                  <h3 className="font-display text-[1.2rem] font-bold text-white">{t('Not sure which one fits?')}</h3>
                  <p className="mt-1 text-[0.85rem] font-semibold text-white/70">
                    {t('Take our 2-minute quiz and find out.')}
                  </p>
                </div>
                <a href="#/quiz" className="btn btn-yellow btn-sm shrink-0">
                  {t('Quiz')}
                  <span className="arr" aria-hidden>
                    →
                  </span>
                </a>
              </article>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   06 — LITTLE MOMENTS · "A day full of little discoveries" —
   rotina real do FAQ em cards divertidos com offsets.
   ============================================================ */
function LittleMoments() {
  const { t } = useLang()
  const stepIcons = [
    <SunDoodle key="i0" className="h-6 w-6 text-yellow-600" />,
    <Blocks key="i1" className="h-6 w-6 text-blue-600" />,
    <Apple key="i2" className="h-6 w-6 text-orange-600" />,
    <Moon key="i3" className="h-6 w-6 text-blue-700" />,
    <Palette key="i4" className="h-6 w-6 text-pink-600" />,
    <Kite key="i5" className="h-6 w-6 text-green-600" />,
  ]
  const stepChips: Accent[] = ['yellow', 'blue', 'orange', 'blue', 'pink', 'green']
  const offsets = ['lg:translate-y-0', 'lg:translate-y-8', 'lg:translate-y-2', 'lg:translate-y-10', 'lg:translate-y-4', 'lg:translate-y-12']

  return (
    <section className="relative overflow-hidden bg-yellow-50 py-20 sm:py-28" aria-label="A day at Ana Paula Daycare">
      {/* textura própria: listras diagonais suaves */}
      <div className="bg-stripes-soft pointer-events-none absolute inset-x-0 top-0 h-full w-full opacity-40" aria-hidden />
      <SunDoodle className="anim-spin-slow pointer-events-none absolute right-[5%] top-14 h-20 w-20 text-yellow-300" />
      <Rainbow size={88} className="pointer-events-none absolute left-[3%] bottom-16 opacity-70" />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">{t('A day full of little discoveries')}</p>
          <h2 className="font-display mt-4 text-[2rem] font-bold leading-[1.1] text-navy sm:text-[2.8rem]">
            {t('Little Moments,')} <span className="squiggle">{t('Big Discoveries.')}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] font-semibold text-ink-soft">
            {t('Every day follows a gentle rhythm — play, meals, rest, and lots of discovery in between. Here is how our days unfold.')}
          </p>
        </Reveal>

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {DAY_STEPS.map((step, i) => (
            <li key={step.index} className={offsets[i]}>
              <Reveal delay={0.06 * i} y={22}>
                <article className="hover-wiggle relative h-full rounded-[1.6rem] bg-white p-6 shadow-pop-sm">
                  <span className={`chip absolute -top-3.5 left-5 ${ACCENT[stepChips[i]].chip}`}>
                    {t(step.time)}
                  </span>
                  <div className="flex items-start justify-between gap-4">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${ACCENT[stepChips[i]].soft}`}>
                      {stepIcons[i]}
                    </span>
                    <span className="font-display text-[2rem] font-bold text-ink/8" aria-hidden>
                      {step.index}
                    </span>
                  </div>
                  <h3 className="font-display mt-4 text-[1.3rem] font-bold text-navy">{t(step.title)}</h3>
                  <p className="mt-2 text-[0.9rem] font-semibold leading-relaxed text-ink-soft">
                    {t(step.description)}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-14 text-center">
          <a href="#/enroll" className="btn btn-navy">
            {t('Ask about enrollment')}
            <span className="arr" aria-hidden>
              →
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}

/* ============================================================
   07 — GALLERY COLLAGE · mural infantil: fotos inclinadas,
   molduras brancas, fitas coloridas + lightbox na página.
   ============================================================ */
function GalleryCollage() {
  const { t, tf } = useLang()
  const { content } = useContent()
  const g = content.gallery
  const photos = [
    g[0].images[0], // paint art class
    g[1].images[0], // abacus
    g[2].images[0], // multicultural balls
    g[4].images[0], // nursery group
    g[3].images[3], // girl with train
    g[5].images[2], // curly hair girl
    g[1].images[3], // wood blocks
  ]
  const tapes = ['bg-pink-300/80', 'bg-yellow-300/80', 'bg-green-300/80', 'bg-blue-300/80']
  const tilts = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', '-rotate-[1.5deg]', 'rotate-[1.5deg]', 'rotate-1']
  const heights = [
    'aspect-[4/3]', 'aspect-[3/4] lg:mt-10', 'aspect-square', 'aspect-[3/4] lg:-mt-4',
    'aspect-[4/3] lg:mt-6', 'aspect-square lg:mt-2', 'aspect-[4/3] lg:-mt-8',
  ]
  return (
    <section className="relative overflow-hidden bg-pink-50 py-20 sm:py-28" aria-label="Gallery preview">
      {/* textura própria: pontos brancos */}
      <div className="bg-dots-white pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <Star className="anim-float-b pointer-events-none absolute left-[6%] top-16 h-9 w-9 text-pink-300" />
      <Flower className="anim-float-a pointer-events-none absolute right-[5%] bottom-20 h-12 w-12 text-pink-300" />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="eyebrow">{t('Moments we share every day')}</p>
            <h2 className="font-display mt-4 max-w-[18ch] text-[2rem] font-bold leading-[1.12] text-navy sm:text-[2.7rem]">
              {t('Our little wall')} <span className="text-pink-500">{t('of happy days.')}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <a href="#/gallery" className="btn btn-pink">
              {t('Open the gallery')}
              <span className="arr" aria-hidden>
                →
              </span>
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4">
          {photos.map((p, i) => (
            <Reveal key={p.src + i} delay={0.05 * (i % 4)} y={22} className={i === 0 ? 'lg:col-span-2' : ''}>
              <a
                href="#/gallery"
                aria-label={tf('See this moment in the gallery: {alt}', { alt: p.alt })}
                className={`hover-wiggle group relative block w-full ${tilts[i]}`}
              >
                <span className={`tape -top-3 left-1/2 z-10 -translate-x-1/2 ${i % 2 ? 'rotate-3' : '-rotate-3'} ${tapes[i % 4]}`} aria-hidden />
                <div className={`relative w-full overflow-hidden rounded-2xl border-[5px] border-white bg-white shadow-pop-sm transition-shadow duration-300 group-hover:shadow-pop ${heights[i]}`}>
                  <SmartImage
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 30vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   08 — WHY FAMILIES CHOOSE US · 6 itens reais em chips coloridos
   com offsets, ícones lucide.
   ============================================================ */
function WhyFamilies() {
  const { t } = useLang()
  const icons = [
    <ShieldCheck key="w0" className="h-7 w-7" />,
    <Clock key="w1" className="h-7 w-7" />,
    <MessageCircle key="w2" className="h-7 w-7" />,
    <Heart key="w3" className="h-7 w-7" />,
    <Sun key="w4" className="h-7 w-7" />,
    <Users key="w5" className="h-7 w-7" />,
  ]
  const offsets = ['lg:translate-y-0', 'lg:translate-y-6', 'lg:translate-y-0', 'lg:translate-y-6', 'lg:translate-y-0', 'lg:translate-y-6']
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28" aria-label="Why families choose us">
      <SquiggleLine className="pointer-events-none absolute right-[8%] top-16 w-28 text-yellow-300" />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">{t('Peace of mind for parents')}</p>
          <h2 className="font-display mt-4 text-[2rem] font-bold leading-[1.1] text-navy sm:text-[2.8rem]">
            {t('Why Families Love')} <span className="text-pink-500">{t('Our Daycare')}</span>
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {WHY_CHOOSE.map((w, i) => (
            <li key={w.title} className={offsets[i]}>
              <Reveal delay={0.05 * i} y={20}>
                <div className="hover-wiggle flex h-full items-center gap-5 rounded-[1.6rem] border-2 border-ink/5 bg-cream p-6 shadow-pop-sm transition-colors hover:border-pink-200">
                  <span
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${ACCENT[w.color as Accent].chip}`}
                    aria-hidden
                  >
                    {icons[i]}
                  </span>
                  <h3 className="font-display text-[1.25rem] font-bold leading-snug text-navy">{t(w.title)}</h3>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ============================================================
   09 — SAFETY STRIP · faixa verde com escudo + pontos reais.
   ============================================================ */
function SafetyStrip() {
  const { t } = useLang()
  const items = SAFETY_ITEMS.slice(0, 4)
  return (
    <section className="bg-white pb-20 sm:pb-28" aria-label="Safety and care">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <Reveal y={26}>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-green-50 px-7 py-12 sm:px-12 sm:py-16">
            <div className="bg-dots-white pointer-events-none absolute inset-0 opacity-60" aria-hidden />
            <Sparkle className="anim-float-a absolute right-[8%] top-8 h-8 w-8 text-green-300" aria-hidden />
            <Star className="anim-float-b absolute bottom-8 right-[18%] h-9 w-9 text-yellow-300" aria-hidden />
            <div className="relative grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white shadow-pop-sm" aria-hidden>
                  <ShieldCheck className="h-9 w-9 text-green-600" />
                </span>
                <h2 className="font-display mt-5 text-[1.9rem] font-bold leading-[1.15] text-navy sm:text-[2.4rem]">
                  {t('Safe hands,')} <span className="text-green-600">{t('happy hearts.')}</span>
                </h2>
                <p className="mt-4 max-w-[44ch] font-semibold leading-relaxed text-ink-soft">
                  {t('Supervised spaces, careful routines and open communication — the everyday details that keep children safe and parents at ease.')}
                </p>
                <a href="#/safety" className="btn btn-green mt-7">
                  {t('Read our safety approach')}
                  <span className="arr" aria-hidden>
                    →
                  </span>
                </a>
              </div>
              <ul className="grid gap-3.5 sm:grid-cols-2 lg:col-span-7">
                {items.map((item, i) => (
                  <li
                    key={item.index}
                    className={`rounded-2xl bg-white p-5 shadow-pop-sm ${i % 2 === 1 ? 'sm:translate-y-3' : ''}`}
                  >
                    <span className={`chip ${ACCENT[(['green', 'blue', 'yellow', 'pink'] as Accent[])[i]].chip} text-[0.7rem]`}>
                      {item.index}
                    </span>
                    <h3 className="font-display mt-2.5 text-[1.05rem] font-bold text-navy">{t(item.title)}</h3>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ============================================================
   10 — TESTIMONIAL · citação real com estrelinhas.
   ============================================================ */
function Testimonial() {
  const { t } = useLang()
  const { content } = useContent()
  return (
    <section className="relative overflow-hidden bg-cream py-20 sm:py-28" aria-label="What parents say">
      <Cloud className="anim-float-a pointer-events-none absolute left-[10%] top-14 h-14 w-14 text-blue-100" />
      <StarSolid className="anim-float-b pointer-events-none absolute right-[12%] bottom-16 h-8 w-8 text-yellow-300" />
      <div className="relative mx-auto max-w-[900px] px-5 text-center sm:px-8">
        <Reveal>
          <div className="flex justify-center gap-1.5" aria-hidden>
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0, rotate: -30 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.09, type: 'spring', stiffness: 260, damping: 14 }}
              >
                <StarSolid className="h-8 w-8 text-yellow-400" />
              </motion.span>
            ))}
          </div>
        </Reveal>
        <blockquote className="mt-8">
          <Words
            as="p"
            key={content.testimonial.quote}
            text={t(content.testimonial.quote)}
            className="font-display text-[1.4rem] font-semibold leading-[1.45] text-navy sm:text-[1.9rem]"
          />
          <footer className="mt-7">
            <Reveal delay={0.2}>
              <span className="chip bg-pink-100 text-pink-600">{t(content.testimonial.author)}</span>
            </Reveal>
          </footer>
        </blockquote>
      </div>
    </section>
  )
}

/* ============================================================
   11 — FAQ · accordion divertido com botões coloridos.
   ============================================================ */
function AnswersForParents() {
  const { t } = useLang()
  const { content, site } = useContent()
  const [open, setOpen] = useState<number | null>(0)
  const circles = ['bg-pink-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500', 'bg-orange-500', 'bg-pink-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500']
  return (
    <section className="bg-white py-20 sm:py-28" aria-label="Frequently asked questions">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="eyebrow">{t('Answers for parents')}</p>
              <h2 className="font-display mt-4 text-[2rem] font-bold leading-[1.12] text-navy sm:text-[2.5rem]">
                {t('Ask us anything.')} <span className="text-pink-500">{t('Really!')}</span>
              </h2>
              <p className="mt-4 max-w-[36ch] font-semibold leading-relaxed text-ink-soft">
                {t("If your question isn't answered here, call or write — we love talking with families.")}
              </p>
              <a href={site.phoneHref} className="btn btn-white mt-6">
                {site.phone}
              </a>
            </Reveal>
          </div>
        </div>
        <div className="lg:col-span-8">
          <ul className="grid gap-3">
            {content.faqs.map((f, i) => {
              const isOpen = open === i
              return (
                <li key={f.q}>
                  <Reveal delay={0.03 * i} y={10}>
                    <div
                      className={`overflow-hidden rounded-2xl border-2 transition-colors duration-300 ${
                        isOpen ? 'border-pink-200 bg-pink-50/60' : 'border-ink/8 bg-cream hover:border-blue-200'
                      }`}
                    >
                      <h3>
                        <button
                          onClick={() => setOpen(isOpen ? null : i)}
                          aria-expanded={isOpen}
                          aria-controls={`faq-panel-${i}`}
                          className="flex w-full items-center gap-4 px-5 py-5 text-left"
                        >
                          <span
                            className={`relative h-8 w-8 shrink-0 rounded-full transition-transform duration-300 ${circles[i % circles.length]} ${isOpen ? 'rotate-45' : ''}`}
                            aria-hidden
                          >
                            <span className="absolute left-1/2 top-1/2 h-[2.5px] w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
                            <span className="absolute left-1/2 top-1/2 h-3.5 w-[2.5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
                          </span>
                          <span className="font-display text-[1.1rem] font-bold leading-snug text-navy sm:text-[1.25rem]">
                            {t(f.q)}
                          </span>
                        </button>
                      </h3>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={`faq-panel-${i}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <p className="max-w-[64ch] px-5 pb-5 pl-[4.25rem] font-semibold leading-relaxed text-ink-soft">
                              {t(f.a)}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Reveal>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   12 — LOCATION · mapa arredondado + cartão de informações.
   ============================================================ */
function LocationBlock() {
  const { t } = useLang()
  const { site } = useContent()
  return (
    <section className="relative overflow-hidden bg-blue-50 py-20 sm:py-28" aria-label="Location">
      {/* textura própria: pontos brancos */}
      <div className="bg-dots-white pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">{t('Find us')}</p>
            <h2 className="font-display mt-4 text-[2rem] font-bold leading-[1.12] text-navy sm:text-[2.5rem]">
              {t('A quiet street')} <span className="text-blue-600">{t('in San Francisco.')}</span>
            </h2>
            <div className="card-fun mt-7 flex items-start gap-4 p-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100" aria-hidden>
                <MapPin className="h-6 w-6 text-blue-600" />
              </span>
              <address className="not-italic">
                <p className="font-display text-[1.2rem] font-bold leading-snug text-navy">
                  {site.addressStreet}
                  <br />
                  {site.addressCity}
                </p>
                <div className="mt-3 grid gap-1 text-[0.9rem] font-bold text-blue-700">
                  <a href={site.phoneHref} className="link-draw w-fit">
                    {site.phone}
                  </a>
                  <a href={site.emailHref} className="link-draw w-fit break-all">
                    {site.email}
                  </a>
                </div>
              </address>
            </div>
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-navy mt-6">
              {t('Get directions')}
              <span className="arr" aria-hidden>
                →
              </span>
            </a>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.12}>
            <div className="relative overflow-hidden rounded-[2rem] border-[5px] border-white shadow-pop">
              <iframe
                title={`Map — ${site.name}, ${site.address}`}
                src={site.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[360px] w-full sm:h-[440px]"
                allowFullScreen
              />
              <span className="chip absolute left-5 top-5 -rotate-2 bg-white text-navy" aria-hidden>
                <StarSolid className="h-4 w-4 text-yellow-500" />
                {site.name}
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   13 — FINAL CTA · cartão gradiente colorido com doodles.
   ============================================================ */
function FinalCTA() {
  const { t, tf } = useLang()
  const { content, site } = useContent()
  return (
    <section className="bg-white py-20 sm:py-24" aria-label="Get in touch">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <Reveal y={26}>
          <div className="shadow-sticker relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-pink-500 via-orange-400 to-yellow-400 px-7 py-14 text-center sm:px-12 sm:py-20">
            {/* textura própria: pontos brancos sobre o gradiente */}
            <div className="bg-dots-white pointer-events-none absolute inset-0 opacity-30" aria-hidden />
            {/* doodles */}
            <SunDoodle className="anim-spin-slow absolute left-[6%] top-8 h-16 w-16 text-white/50" aria-hidden />
            <Cloud className="absolute right-[10%] top-10 h-14 w-14 text-white/40" aria-hidden />
            <Star className="anim-float-a absolute bottom-10 left-[12%] h-10 w-10 text-white/50" aria-hidden />
            <StarSolid className="anim-float-b absolute right-[16%] bottom-14 h-7 w-7 text-white/60" aria-hidden />
            <Sparkle className="absolute right-[28%] top-6 h-6 w-6 text-white/60" aria-hidden />
            <Rainbow size={80} className="absolute -left-2 bottom-2 opacity-60" aria-hidden />

            <p className="eyebrow eyebrow--bare relative justify-center text-white/85">
              {t(content.finalCta.eyebrow)}
            </p>
            <h2 className="font-display relative mx-auto mt-4 max-w-[22ch] text-[2.1rem] font-bold leading-[1.1] text-white sm:text-[3.1rem]">
              {t(content.finalCta.heading)}
            </h2>
            <div className="relative mt-9 flex flex-wrap items-center justify-center gap-4">
              <a href="#/contact" className="btn btn-navy">
                {t('Schedule a Visit')}
                <span className="arr" aria-hidden>
                  →
                </span>
              </a>
              <a
                href={site.phoneHref}
                className="btn border-2 border-white/70 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
              >
                {tf('Call {phone}', { phone: site.phone })}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
