'use client'

import { NAV_LINKS } from '@/data/site'
import { useContent } from '@/components/site/content-provider'
import { useLang } from '@/components/site/lang-provider'
import { Rainbow, Star, StarSolid, Sun, Cloud } from '@/components/site/doodles'

/** Playful footer on deep navy: rainbow, doodles, honest info. */
export function Footer() {
  const { t, tf } = useLang()
  const { site } = useContent()
  return (
    <footer className="relative mt-auto overflow-hidden bg-navy text-cream">
      {/* Scallop: fileira branca vinda da seção anterior mordendo o navy */}
      <div className="scallop-b relative" style={{ '--scallop-color': '#ffffff' } as React.CSSProperties} aria-hidden />
      {/* Céu decorado */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Star className="anim-float-a absolute left-[8%] top-14 h-8 w-8 text-yellow-400/60" />
        <Star className="anim-float-b absolute right-[12%] top-24 h-5 w-5 text-pink-400/60" />
        <Cloud className="absolute left-[78%] top-10 h-12 w-12 text-white/10" />
        <Cloud className="absolute left-[14%] top-40 h-10 w-10 text-white/8" />
        <div className="absolute -bottom-24 left-1/2 h-64 w-[720px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      {/* Faixa CTA final */}
      <div className="relative border-b border-white/10">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-7 px-5 py-14 sm:px-8 sm:py-16 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <div className="flex items-start gap-5">
            <div className="hidden sm:block" aria-hidden>
              <Rainbow size={72} />
            </div>
            <div>
              <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.22em] text-yellow-400">
                {t('Visit us')}
              </p>
              <p className="font-display mt-2 max-w-xl text-[1.8rem] font-bold leading-tight text-white sm:text-[2.3rem]">
                {t('Come play and grow with us — ')}
                <span className="text-yellow-400">{t("we'd love to meet your family!")}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
            <a href="#/contact" className="btn btn-pink justify-between">
              {t('Schedule a Visit')}
              <span className="arr" aria-hidden>
                →
              </span>
            </a>
            <a
              href={site.phoneHref}
              className="btn btn-ghost justify-between border-white/30 text-white hover:bg-white/10 hover:border-white/60"
            >
              {site.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Colunas */}
      <div className="relative mx-auto grid max-w-[1440px] gap-12 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-4 lg:px-12">
        <div>
          <p className="flex items-center gap-2 font-display text-2xl font-bold text-white">
            {site.shortName} <span className="text-yellow-400">{site.name.replace(site.shortName, '').trim() || 'Daycare'}</span>
          </p>
          <p className="mt-3 max-w-[28ch] text-sm font-semibold leading-relaxed text-white/65">
            {t('A warm, home-like daycare in San Francisco — a safe, happy place to learn and grow.')}
          </p>
          <div className="mt-6 flex items-center gap-1.5" aria-hidden>
            <StarSolid className="h-4 w-4 text-yellow-400" />
            <StarSolid className="h-4 w-4 text-pink-400" />
            <StarSolid className="h-4 w-4 text-green-400" />
            <StarSolid className="h-4 w-4 text-blue-400" />
          </div>
          <p className="mt-2 text-[0.65rem] font-extrabold uppercase tracking-[0.28em] text-white/40">
            {t('Learn · Play · Grow · Shine')}
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <h3 className="text-[0.72rem] font-extrabold uppercase tracking-[0.22em] text-white/45">
            {t('Explore')}
          </h3>
          <ul className="mt-5 grid gap-2.5 text-sm font-bold">
            {NAV_LINKS.filter((l) => l.href !== '/').map((l) => (
              <li key={l.href}>
                <a
                  href={`#${l.href}`}
                  className="text-white/80 transition-colors hover:text-yellow-400"
                >
                  {t(l.label)}
                </a>
              </li>
            ))}
            <li>
              <a href="#/safety" className="text-white/80 transition-colors hover:text-yellow-400">
                {t('Safety')}
              </a>
            </li>
            <li>
              <a href="#/enroll" className="text-white/80 transition-colors hover:text-yellow-400">
                {t('Enrollment')}
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <h3 className="text-[0.72rem] font-extrabold uppercase tracking-[0.22em] text-white/45">
            {t('Contact')}
          </h3>
          <ul className="mt-5 grid gap-3 text-sm font-semibold text-white/80">
            <li>
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="leading-relaxed transition-colors hover:text-yellow-400">
                {site.addressStreet}
                <br />
                {site.addressCity}
              </a>
            </li>
            <li>
              <a href={site.phoneHref} className="transition-colors hover:text-yellow-400">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={site.emailHref} className="break-all transition-colors hover:text-yellow-400">
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-[0.72rem] font-extrabold uppercase tracking-[0.22em] text-white/45">
            {t('Hours')}
          </h3>
          <p className="mt-5 text-sm font-semibold leading-relaxed text-white/65">
            <span className="inline-block rounded-xl bg-white/10 px-3 py-2 text-white/75">
              {t('[CONTENT REQUIRED: opening days and hours]')}
            </span>
          </p>
          <p className="mt-4 text-sm font-semibold leading-relaxed text-white/65">
            {t('Ask about current openings when you')}{' '}
            <a href="#/contact" className="font-extrabold text-yellow-400 hover:underline">
              {t('get in touch')}
            </a>
            .
          </p>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-2 px-5 py-6 text-xs font-semibold text-white/45 sm:flex-row sm:items-center sm:px-8 lg:px-12">
          <p>{tf('© {year} Ana Paula Daycare · San Francisco, CA', { year: new Date().getFullYear() })}</p>
          <p className="flex gap-5">
            <a href="#/quiz" className="hover:text-yellow-400">
              {t('Find the right care')}
            </a>
            <a href="#/admin" className="hover:text-yellow-400">
              {t('Admin')}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
