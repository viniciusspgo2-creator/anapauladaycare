'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { Reveal, Words } from '@/components/site/reveal'
import { useContent } from '@/components/site/content-provider'
import { SmartImage } from '@/components/site/smart-image'
import { useLang } from '@/components/site/lang-provider'
import { HomeSections } from '@/components/site/home-sections'
import {
  Star,
  StarSolid,
  Sun,
  Rainbow,
  Flower,
  Sparkle,
  Blocks,
  Pencil,
  BlobShape,
  ConfettiDots,
  SquiggleLine,
} from '@/components/site/doodles'

const EASE = [0.22, 1, 0.36, 1] as const

export function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeStrip />
      <Concepts />
      <Welcome />
      <HomeSections />
    </>
  )
}

/* ============================================================
   01 — HERO · playful collage: texto à esquerda, composição de
   fotos em moldura orgânica + doodles à direita. Assimétrica.
   ============================================================ */
function Hero() {
  const reduce = useReducedMotion()
  const { t, lang } = useLang()
  const { content, site } = useContent()
  const hero = content.hero
  // Palavra destacada: "Happy"/"feliz" no título; cai para [] se o admin mudar o texto
  const line1 = t(hero.titleLine1)
  const accentMatch = line1.match(/(Happy|feliz|contente)/i)
  const accent = accentMatch ? [accentMatch[0]] : []
  return (
    <section className="bg-hero-morning relative overflow-hidden" aria-label="Welcome">
      {/* fundo: gradiente manhã + grade de pontos + confetes + blobs */}
      <div
        className="bg-dots-navy pointer-events-none absolute inset-x-0 top-0 h-full w-full opacity-80 [m[mask-image:linear-gradient(to_bottom,black_0%,transparent_70%)]"
        aria-hidden
      />
      <ConfettiDots className="pointer-events-none absolute inset-x-0 top-0 h-full w-full opacity-70" />
      <BlobShape
        color="var(--yellow-100)"
        className="pointer-events-none absolute -right-24 -top-20 h-[520px] w-[520px] opacity-80"
      />
      <BlobShape
        color="var(--blue-50)"
        className="pointer-events-none absolute -bottom-32 -left-28 h-[420px] w-[420px] opacity-80"
      />
      {/* composição vazada: anéis + losango — assinatura própria */}
      <span className="pointer-events-none absolute left-[44%] top-[16%] hidden h-14 w-14 rounded-full border-[3px] border-pink-300/50 lg:block" aria-hidden />
      <span className="pointer-events-none absolute bottom-[26%] left-[3%] hidden h-9 w-9 rotate-12 rounded-[8px] border-[3px] border-green-300/60 lg:block" aria-hidden />
      <span className="pointer-events-none absolute right-[36%] top-[10%] hidden h-6 w-6 rounded-full border-[3px] border-blue-200/80 lg:block" aria-hidden />
      <span className="pointer-events-none absolute bottom-[18%] right-[4%] hidden h-12 w-12 -rotate-6 rounded-[10px] border-[3px] border-yellow-300/60 lg:block" aria-hidden />

      <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-5 pb-16 pt-32 sm:px-8 sm:pt-36 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-44 lg:px-12">
        {/* Texto — coluna esquerda */}
        <div className="lg:col-span-6 xl:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
            className="chip bg-white font-extrabold text-navy"
          >
            <StarSolid className="h-4 w-4 text-yellow-500" aria-hidden />
            {t(hero.badge)}
          </motion.div>

          <h1 className="font-display mt-6 text-[2.6rem] font-bold leading-[1.06] text-navy sm:text-[3.6rem] lg:text-[3.7rem] xl:text-[4.1rem]">
            <Words key={line1} text={line1} className="block" />
            <Words key={hero.titleLine2} text={t(hero.titleLine2)} delay={0.2} accentWords={accent} className="block" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
            className="mt-5 max-w-[46ch] text-[1.05rem] font-semibold leading-relaxed text-ink-soft sm:text-[1.125rem]"
          >
            {t(hero.subtitle)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: EASE }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a href="#/contact" className="btn btn-pink">
              {t('Schedule a Visit')}
              <span className="arr" aria-hidden>
                →
              </span>
            </a>
            <a href="#/programs" className="btn btn-white">
              {t('Explore Programs')}
            </a>
          </motion.div>

          {/* mini chips Learn Play Grow Shine */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease: EASE }}
            className="mt-8 flex flex-wrap gap-2"
            aria-hidden
          >
            <span className="chip bg-yellow-100 text-yellow-700"><Pencil className="h-4 w-4" />{t('Learn')}</span>
            <span className="chip bg-blue-100 text-blue-700"><Blocks className="h-4 w-4" />{t('Play')}</span>
            <span className="chip bg-green-100 text-green-700"><Flower className="h-4 w-4" />{t('Grow')}</span>
            <span className="chip bg-pink-100 text-pink-600"><StarSolid className="h-4 w-4" />{t('Shine')}</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.95 }}
            className="mt-6 text-[0.85rem] font-bold text-ink-faint"
          >
            {site.address} ·{' '}
            <a href={site.phoneHref} className="link-draw text-blue-600">
              {site.phone}
            </a>
          </motion.p>
        </div>

        {/* Composição visual — coluna direita (colagem) */}
        <div className="relative lg:col-span-6">
          <div className="relative mx-auto max-w-[540px]">
            {/* blob de fundo */}
            <BlobShape
              color="var(--blue-100)"
              className="absolute -left-10 top-8 -z-0 h-[92%] w-[92%] opacity-90"
              aria-hidden
            />

            {/* foto principal em moldura de arco */}
            <motion.figure
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26, rotate: 2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
              className="arch shadow-sticker relative z-10 mx-auto aspect-[4/4.9] w-[78%] overflow-hidden border-[5px] border-white bg-yellow-100 sm:w-[74%]"
            >
              <SmartImage
                src={hero.photoMain}
                alt={hero.photoMainAlt}
                fill
                priority
                sizes="(max-width: 1024px) 78vw, 38vw"
                className="object-cover"
              />
            </motion.figure>

            {/* foto circular sobreposta */}
            <motion.figure
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
              className="anim-bob absolute -bottom-4 left-0 z-20 aspect-square w-[38%] overflow-hidden rounded-full border-[5px] border-white bg-pink-100 shadow-pop sm:w-[34%]"
            >
              <SmartImage
                src={hero.photoCircle}
                alt={hero.photoCircleAlt}
                fill
                sizes="(max-width: 1024px) 38vw, 18vw"
                className="object-cover"
              />
            </motion.figure>

            {/* sticker de legenda */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: EASE }}
              className="chip absolute -right-2 bottom-10 z-20 -rotate-2 bg-navy text-[0.72rem] text-cream sm:right-2"
            >
              {t(hero.sticker)}
            </motion.span>

            {/* doodles ao redor — moderados */}
            <Sun className="anim-spin-slow absolute -top-8 left-2 z-0 h-16 w-16 text-yellow-400 sm:h-20 sm:w-20" />
            <Star className="anim-float-a absolute -right-3 top-10 z-0 h-12 w-12 text-pink-500" />
            <Rainbow size={64} className="absolute -bottom-2 right-[16%] z-0" />
            <Flower className="anim-float-b absolute -left-7 bottom-24 z-0 hidden h-11 w-11 text-green-500 sm:block" />
            <Sparkle className="absolute -top-4 right-[30%] h-6 w-6 text-blue-400" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   02 — MARQUEE · faixa navy com a tagline real rolando.
   ============================================================ */
function MarqueeStrip() {
  const { t } = useLang()
  const items = ['Learn', 'Play', 'Grow', 'Shine']
  const stars = ['text-yellow-400', 'text-pink-400', 'text-green-400', 'text-blue-400']
  const seq = [...items, ...items, ...items]
  return (
    <div className="relative z-10 overflow-x-clip" aria-hidden>
      <div className="-rotate-[0.6deg] scale-[1.01]">
        {/* scallop navy: recorte próprio entre hero e faixa */}
        <div className="scallop-t" style={{ '--scallop-color': 'var(--navy)' } as React.CSSProperties} />
        <div className="bg-navy py-4 shadow-pop">
        <div className="flex overflow-hidden">
          <div className="anim-marquee flex w-max shrink-0 items-center gap-8 pr-8">
            {[...seq, ...seq].map((w, i) => (
              <span key={i} className="flex items-center gap-8">
                <span className="font-display text-xl font-bold uppercase tracking-wide text-cream">
                  {t(w)}
                </span>
                <StarSolid className={`h-5 w-5 ${stars[i % 4]}`} />
              </span>
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   03 — LEARN · PLAY · GROW · SHINE — composição dinâmica,
   blocos com offsets e rotações (nada de 4 cards iguais).
   ============================================================ */
function Concepts() {
  const { t } = useLang()
  const { content } = useContent()
  const blocks = [
    { wrap: 'bg-yellow-100 text-navy lg:rotate-[0.8deg]', icon: <Pencil className="h-9 w-9 text-yellow-600" />, chipC: 'bg-white text-yellow-700' },
    { wrap: 'bg-blue-100 text-navy lg:-rotate-[0.8deg] lg:translate-y-10', icon: <Blocks className="h-9 w-9 text-blue-600" />, chipC: 'bg-white text-blue-700' },
    { wrap: 'bg-white text-navy border-2 border-green-100 lg:rotate-[0.8deg] lg:translate-y-3', icon: <Flower className="h-9 w-9 text-green-600" />, chipC: 'bg-green-100 text-green-700' },
    { wrap: 'bg-pink-100 text-navy lg:-rotate-[0.8deg] lg:translate-y-14', icon: <StarSolid className="h-9 w-9 text-pink-500" />, chipC: 'bg-white text-pink-600' },
  ]
  const doodles = [
    <Sparkle key="d0" className="absolute -right-3 -top-3 h-7 w-7 text-yellow-400" />,
    <Star key="d1" className="absolute -left-3 -bottom-3 h-7 w-7 text-blue-400" />,
    <Flower key="d2" className="absolute -right-3 -top-4 h-7 w-7 text-green-400" />,
    <StarSolid key="d3" className="absolute -left-2 -top-4 h-6 w-6 text-pink-400" />,
  ]
  return (
    <section className="relative overflow-hidden bg-white pb-28 pt-16 lg:pb-36" aria-label="Learn, play, grow, shine">
      {/* grade de pontos no canto superior — textura própria da seção */}
      <div
        className="bg-dots-navy pointer-events-none absolute inset-x-0 top-0 h-40 opacity-60 [m[mask-image:linear-gradient(to_bottom,black,transparent)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">{t("What we're all about")}</p>
          <h2 className="font-display mt-4 text-[2.1rem] font-bold leading-[1.1] text-navy sm:text-[2.9rem]">
            {t(content.concepts.heading)} <span className="squiggle">{t(content.concepts.headingAccent)}</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-7">
          {content.concepts.items.map((c, i) => (
            <Reveal key={c.title + i} delay={0.08 * i} y={26}>
              <div className={`shadow-sticker-sm hover-wiggle relative h-full rounded-[1.75rem] p-7 ${blocks[i].wrap}`}>
                {doodles[i]}
                <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-2xl">
                  <SmartImage
                    src={c.photo}
                    alt={c.photoAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 22vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-pop-sm">
                    {blocks[i].icon}
                  </span>
                  <span className={`chip ${blocks[i].chipC} text-[0.7rem]`}>{`0${i + 1}`}</span>
                </div>
                <h3 className="font-display mt-4 text-[1.65rem] font-bold">{t(c.title)}</h3>
                <p className="mt-2 text-[0.925rem] font-semibold leading-relaxed opacity-80">{t(c.text)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   04 — WELCOME · colagem de fotos inclinadas + checklist real.
   ============================================================ */
function Welcome() {
  const { t } = useLang()
  const { content } = useContent()
  return (
    <section className="relative overflow-hidden bg-cream py-20 sm:py-28" aria-label="Welcome to our daycare">
      <Star className="anim-float-a pointer-events-none absolute right-[6%] top-14 h-10 w-10 text-yellow-300" />
      <div
        className="bg-dots-navy pointer-events-none absolute inset-y-0 right-0 w-1/3 opacity-50 [mask-image:linear-gradient(to_left,black,transparent)]"
        aria-hidden
      />
      <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        {/* Colagem de fotos */}
        <div className="relative lg:col-span-5">
          <div className="relative mx-auto max-w-[460px]">
            <Reveal y={20} className="relative z-10 w-[74%] rotate-[-2deg]">
              <div className="relative aspect-[4/4.6] overflow-hidden rounded-[1.4rem] border-[5px] border-white bg-blue-100 shadow-pop">
                <SmartImage
                  src={content.welcome.photo1}
                  alt="Kids painting together at the art table"
                  fill
                  sizes="(max-width: 1024px) 74vw, 30vw"
                  className="object-cover"
                />
              </div>
              <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-3 bg-pink-300/80" aria-hidden />
            </Reveal>
            <Reveal delay={0.15} y={20} className="absolute -bottom-10 right-0 z-20 w-[52%] rotate-[2.5deg]">
              <div className="relative aspect-square overflow-hidden rounded-[1.4rem] border-[5px] border-white bg-yellow-100 shadow-pop">
                <SmartImage
                  src={content.welcome.photo2}
                  alt="Kids playing with colorful balls"
                  fill
                  sizes="(max-width: 1024px) 52vw, 22vw"
                  className="object-cover"
                />
              </div>
              <span className="tape -top-3 right-6 rotate-6 bg-green-300/80" aria-hidden />
            </Reveal>
            <Flower className="anim-float-b absolute -left-6 bottom-16 h-12 w-12 text-pink-400" />
            <SquiggleLine className="absolute -right-4 top-6 w-24 text-blue-300" />
          </div>
        </div>

        {/* Texto + checklist */}
        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <p className="eyebrow">{t(content.welcome.eyebrow)}</p>
            <h2 className="font-display mt-4 text-[2rem] font-bold leading-[1.12] text-navy sm:text-[2.6rem]">
              {t(content.welcome.heading1)} <span className="text-pink-500">{t(content.welcome.headingAccent)}</span>
            </h2>
            <p className="mt-5 max-w-[52ch] text-[1.02rem] font-semibold leading-relaxed text-ink-soft">
              {t(content.welcome.text)}
            </p>
          </Reveal>

          <ul className="mt-8 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
            {content.welcome.points.map((point, i) => (
              <Reveal key={point} delay={0.05 * i} y={12}>
                <li className="flex items-center gap-3">
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[0.8rem] font-black text-white ${
                      ['bg-pink-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500', 'bg-orange-500', 'bg-pink-500'][i % 6]
                    }`}
                    aria-hidden
                  >
                    ✓
                  </span>
                  <span className="font-extrabold text-navy">{t(point)}</span>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.2}>
            <a href="#/about" className="btn btn-blue mt-9">
              {t('More about us')}
              <span className="arr" aria-hidden>
                →
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
