'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { StarSolid } from '@/components/site/doodles'
import { useLang } from '@/components/site/lang-provider'

const EASE = [0.22, 1, 0.36, 1] as const

/** CTA persistente mobile: barra amigável no rodapé (some perto do fim da página). */
export function StickyCTA({ route }: { route: string }) {
  const { t } = useLang()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const hide = route.startsWith('/contact') || route.startsWith('/enroll') || route.startsWith('/admin')

  return (
    <AnimatePresence>
      {visible && !hide && (
        <motion.a
          href="#/contact"
          initial={{ y: 70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 70, opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="fixed inset-x-0 bottom-0 z-30 flex min-h-[60px] items-stretch border-t-2 border-navy/10 bg-cream/97 shadow-[0_-6px_24px_-12px_rgb(0_36_108/0.25)] backdrop-blur-md md:hidden"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <span className="flex min-w-0 flex-1 flex-col justify-center px-4">
            <span className="truncate font-display text-[1rem] font-bold leading-tight text-navy">
              {t('Come visit us!')}
            </span>
            <span className="flex items-center gap-1.5 text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-ink-faint">
              <StarSolid className="h-3 w-3 shrink-0 text-yellow-500" aria-hidden />
              <span className="truncate">{t('New families welcome')}</span>
            </span>
          </span>
          <span className="btn btn-pink m-2 shrink-0 items-center px-5" aria-hidden>
            {t('Schedule')} <span className="arr">→</span>
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
