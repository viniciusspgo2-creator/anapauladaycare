'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { Globe } from 'lucide-react'
import { NAV_LINKS } from '@/data/site'
import { useContent } from '@/components/site/content-provider'
import { LANGS } from '@/data/i18n'
import { useLang } from '@/components/site/lang-provider'
import { Star, StarSolid } from '@/components/site/doodles'

const EASE = [0.22, 1, 0.36, 1] as const

/** Seletor de idioma com 1 clique: EN · ES · PT. */
function LangSwitch({ darkHero = false, full = false }: { darkHero?: boolean; full?: boolean }) {
  const { lang, setLang } = useLang()
  return (
    <div
      className={`flex items-center gap-0.5 rounded-full p-1 ${
        darkHero ? 'bg-white/15' : 'bg-white shadow-pop-sm'
      }`}
      role="group"
      aria-label="Change language"
    >
      <Globe className={`ml-1.5 h-3.5 w-3.5 shrink-0 ${darkHero ? 'text-white/70' : 'text-ink-faint'}`} aria-hidden />
      {LANGS.map((l) => {
        const active = lang === l.code
        return (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            aria-pressed={active}
            aria-label={l.label}
            title={l.label}
            className={`rounded-full px-2.5 py-1 text-[0.7rem] font-black uppercase tracking-wide transition-all duration-200 ${
              active
                ? 'bg-pink-500 text-white shadow-pop-sm'
                : darkHero
                  ? 'text-white/75 hover:bg-white/10 hover:text-white'
                  : 'text-ink-soft hover:bg-cream hover:text-navy'
            } ${full ? 'px-3.5 py-1.5 text-[0.75rem]' : ''}`}
          >
            {l.short}
          </button>
        )
      })}
    </div>
  )
}

/** Playful modern header: real logo, friendly menu, colorful pill CTA. */
export function Navbar({ route }: { route: string }) {
  const { t } = useLang()
  const { site } = useContent()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const isActive = (href: string) => (href === '/' ? route === '/' : route.startsWith(href))
  const close = () => setOpen(false)
  // Páginas com abertura escura precisam de header claro antes do scroll
  const darkHero = route.startsWith('/safety') && !scrolled

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,box-shadow] duration-300 ${
          scrolled
            ? 'border-b-2 border-navy/8 bg-cream/95 shadow-[0_4px_20px_-8px_rgb(0_36_108/0.15)] backdrop-blur-md'
            : 'border-b-2 border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between gap-6 px-4 sm:px-8 lg:px-12">
          {/* Logo */}
          <a href="#/" className="flex shrink-0 items-center gap-2.5" aria-label="Ana Paula Daycare — Home">
            <motion.span
              className="relative block h-12 w-12 overflow-hidden rounded-full border-2 border-white bg-white shadow-pop-sm"
              whileHover={{ rotate: 8, scale: 1.06 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <Image src="/images/logo.webp" alt="" fill sizes="48px" className="object-contain p-0.5" />
            </motion.span>
            <span className="flex min-w-0 flex-col leading-none">
              <span className={`font-display text-[1.3rem] font-bold tracking-tight ${darkHero ? 'text-white' : 'text-navy'}`}>
                Ana Paula
              </span>
              <span className={`mt-0.5 text-[0.5625rem] font-extrabold uppercase tracking-[0.28em] ${darkHero ? 'text-yellow-400' : 'text-blue-500'}`}>
                Daycare · SF
              </span>
            </span>
          </a>

          {/* Menu */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={`#${l.href}`}
                aria-current={isActive(l.href) ? 'page' : undefined}
                className={`relative rounded-full px-4 py-2 text-[0.9rem] font-extrabold transition-colors ${
                  isActive(l.href)
                    ? darkHero
                      ? 'bg-white/15 text-white'
                      : 'bg-white text-navy shadow-pop-sm'
                    : darkHero
                      ? 'text-white/80 hover:bg-white/10 hover:text-white'
                      : 'text-ink-soft hover:bg-white/70 hover:text-navy'
                }`}
              >
                {t(l.label)}
              </a>
            ))}
          </nav>

          {/* Right: idioma + CTA */}
          <div className="flex items-center gap-2.5">
            <div className="hidden lg:block">
              <LangSwitch darkHero={darkHero} />
            </div>
            <a href="#/contact" className="btn btn-pink btn-sm hidden sm:inline-flex">
              {t('Schedule a Visit')}
              <span className="arr" aria-hidden>
                →
              </span>
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className={`flex h-12 w-12 flex-col items-center justify-center gap-[5px] rounded-full shadow-pop-sm lg:hidden ${
                darkHero ? 'bg-white/15' : 'bg-white'
              }`}
            >
              <span
                className={`h-[2.5px] w-5 rounded-full transition-transform duration-300 ${
                  open ? 'translate-y-[4px] rotate-45' : ''
                } ${darkHero ? 'bg-white' : 'bg-navy'}`}
              />
              <span
                className={`h-[2.5px] w-5 rounded-full transition-transform duration-300 ${
                  open ? '-translate-y-[3.5px] -rotate-45' : ''
                } ${darkHero ? 'bg-yellow-400' : 'bg-pink-500'}`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile: joyful full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-50 flex flex-col bg-cream lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            {/* topo decorado */}
            <div className="relative shrink-0 overflow-hidden bg-navy px-5 pb-8 pt-5 sm:px-8" aria-hidden>
              <Star className="anim-float-a absolute -right-3 top-6 h-16 w-16 text-yellow-400" />
              <Star className="anim-float-b absolute right-20 top-16 h-7 w-7 text-pink-400" />
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2.5">
                  <span className="relative block h-11 w-11 overflow-hidden rounded-full border-2 border-white/30 bg-white">
                    <Image src="/images/logo.webp" alt="" fill sizes="44px" className="object-contain p-0.5" />
                  </span>
                  <span className="font-display text-[1.3rem] font-bold text-white">Ana Paula</span>
                </span>
                <button
                  onClick={close}
                  aria-label="Close menu"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white"
                >
                  <span className="relative block h-4 w-4">
                    <span className="absolute left-1/2 top-1/2 h-[2.5px] w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-current" />
                    <span className="absolute left-1/2 top-1/2 h-[2.5px] w-4 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-current" />
                  </span>
                </button>
              </div>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-1 px-5 sm:px-8" aria-label="Mobile navigation">
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={`#${l.href}`}
                  onClick={close}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.45, ease: EASE }}
                  className={`group flex min-h-[58px] items-center gap-4 rounded-2xl px-4 font-display text-[1.7rem] font-bold transition-colors sm:text-[1.9rem] ${
                    isActive(l.href) ? 'bg-white text-navy shadow-pop-sm' : 'text-ink-soft hover:bg-white/60 hover:text-navy'
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-[0.7rem] font-extrabold ${
                      ['bg-yellow-200 text-navy', 'bg-pink-100 text-pink-600', 'bg-blue-100 text-blue-600', 'bg-green-100 text-green-700', 'bg-orange-100 text-orange-600', 'bg-pink-100 text-pink-600'][i % 6]
                    }`}
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {t(l.label)}
                  <span className="ml-auto text-pink-500 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" aria-hidden>
                    →
                  </span>
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.4, ease: EASE }}
              className="shrink-0 px-5 pb-9 pt-3 sm:px-8"
            >
              {/* Idioma — 1 clique */}
              <div className="mb-5 flex justify-center">
                <LangSwitch full />
              </div>
              <a href="#/contact" onClick={close} className="btn btn-pink w-full justify-between">
                {t('Schedule a Visit')}
                <span className="arr" aria-hidden>
                  →
                </span>
              </a>
              <div className="mt-5 flex flex-col gap-1 text-sm font-bold text-ink-soft">
                <a href={site.phoneHref} className="text-navy">
                  {site.phone}
                </a>
                <a href={site.emailHref} className="break-all">
                  {site.email}
                </a>
                <p className="font-semibold">{site.address}</p>
              </div>
              <div className="mt-4 flex items-center gap-2 text-navy" aria-hidden>
                <StarSolid className="h-4 w-4 text-yellow-500" />
                <StarSolid className="h-4 w-4 text-pink-500" />
                <StarSolid className="h-4 w-4 text-blue-500" />
                <StarSolid className="h-4 w-4 text-green-500" />
                <span className="ml-2 text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-ink-faint">
                  Learn · Play · Grow · Shine
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
