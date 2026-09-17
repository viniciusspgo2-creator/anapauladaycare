'use client'

import { Reveal } from '@/components/site/reveal'
import { SAFETY_ITEMS } from '@/data/site'
import { useLang } from '@/components/site/lang-provider'
import { useContent } from '@/components/site/content-provider'
import { Star, StarSolid, Sun, Cloud, Rainbow, Sparkle, SquiggleLine } from '@/components/site/doodles'
import { ShieldCheck, Moon, HeartHandshake, Sparkles, HandHeart, MessagesSquare } from 'lucide-react'
import type { ReactNode } from 'react'

const ITEM_ICONS: ReactNode[] = [
  <ShieldCheck key="s0" className="h-6 w-6 text-blue-600" />,
  <Moon key="s1" className="h-6 w-6 text-pink-500" />,
  <Sparkles key="s2" className="h-6 w-6 text-yellow-600" />,
  <HeartHandshake key="s3" className="h-6 w-6 text-green-600" />,
  <HandHeart key="s4" className="h-6 w-6 text-pink-600" />,
  <MessagesSquare key="s5" className="h-6 w-6 text-blue-500" />,
]
const ITEM_CHIPS = ['bg-blue-100', 'bg-pink-100', 'bg-yellow-100', 'bg-green-100', 'bg-pink-100', 'bg-blue-100']

/** SAFETY — abertura escura amigável + práticas em cartões claros. */
export function SafetyPage() {
  const { t, tf } = useLang()
  const { site } = useContent()
  return (
    <>
      {/* Abertura: navy com céu de doodles */}
      <section className="relative overflow-hidden bg-navy pb-20 pt-32 sm:pb-24 sm:pt-44" aria-label="Safety and protocols">
      <div className="bg-dots-white pointer-events-none absolute inset-0 opacity-50" aria-hidden />

        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Star className="anim-float-a absolute left-[8%] top-36 h-9 w-9 text-yellow-400/70" />
          <Star className="anim-float-b absolute right-[12%] top-32 h-6 w-6 text-pink-400/70" />
          <Cloud className="absolute right-[26%] top-48 h-12 w-12 text-white/10" />
          <Sun className="anim-spin-slow absolute right-[6%] top-40 h-14 w-14 text-yellow-400/40" />
          <Rainbow size={72} className="absolute left-[16%] top-56 opacity-40" />
        </div>
        <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <p className="eyebrow eyebrow--light">{t('Safety & care')}</p>
            <h1 className="font-display mt-5 max-w-[20ch] text-[2.5rem] font-bold leading-[1.08] text-white sm:text-[3.7rem]">
              {t('Safety lives in')} <span className="text-yellow-400">{t('everyday details.')}</span>
            </h1>
            <p className="mt-6 max-w-[52ch] text-[1.05rem] font-semibold leading-relaxed text-white/70">
              {t('Trust between parents and caregivers is built on the small, consistent things: supervised spaces, careful routines, honest communication. Here is how that looks in our home every day.')}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Itens */}
      <section className="bg-cream py-20 sm:py-24" aria-label="Our safety practices">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {SAFETY_ITEMS.map((item, i) => (
              <li key={item.index} className={i % 3 === 1 ? 'lg:translate-y-8' : ''}>
                <Reveal delay={0.05 * (i % 3)} y={20}>
                  <div className="hover-wiggle card-fun h-full p-6 transition-colors hover:border-blue-200">
                    <div className="flex items-center justify-between">
                      <span className={`flex h-13 w-13 items-center justify-center rounded-2xl p-3 ${ITEM_CHIPS[i]}`} aria-hidden>
                        {ITEM_ICONS[i]}
                      </span>
                      <span className="font-display text-[2rem] font-bold text-navy/10" aria-hidden>
                        {item.index}
                      </span>
                    </div>
                    <h2 className="font-display mt-4 text-[1.25rem] font-bold leading-snug text-navy">
                      {t(item.title)}
                    </h2>
                    <p className="mt-2 text-[0.9rem] font-semibold leading-relaxed text-ink-soft">
                      {t(item.description)}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Reveal className="mt-20">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-pink-50 px-7 py-12 text-center sm:px-12">
            <div className="bg-dots-white pointer-events-none absolute inset-0 opacity-30" aria-hidden />

              <Star className="anim-float-a absolute left-[8%] top-8 h-8 w-8 text-pink-300" aria-hidden />
              <Sparkle className="absolute right-[12%] top-10 h-6 w-6 text-yellow-400" aria-hidden />
              <SquiggleLine className="mx-auto w-32 text-pink-300" />
              <h2 className="font-display mx-auto mt-4 max-w-[26ch] text-[1.8rem] font-bold leading-[1.15] text-navy sm:text-[2.3rem]">
                {t('Questions about a policy or procedure?')}{' '}
                <span className="text-pink-600">{t('Ask us — always welcome.')}</span>
              </h2>
              <div className="mt-7 flex flex-wrap justify-center gap-4">
                <a href={site.phoneHref} className="btn btn-pink">
                  {tf('Call {phone}', { phone: site.phone })}
                </a>
                <a href="#/contact" className="btn btn-white">
                  {t('Write to us')}
                  <span className="arr" aria-hidden>
                    →
                  </span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
