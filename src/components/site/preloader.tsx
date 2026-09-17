'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { Star, StarSolid } from '@/components/site/doodles'
import { useLang } from '@/components/site/lang-provider'

const EASE = [0.22, 1, 0.36, 1] as const

/** Playful splash: bouncing logo, colorful dots, quick and light. */
export function Preloader({ visible }: { visible: boolean }) {
  const reduce = useReducedMotion()
  const { t } = useLang()
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream"
          initial={{ opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: '-100%' }}
          transition={{ duration: 0.7, ease: EASE }}
          role="status"
          aria-label="Loading Ana Paula Daycare"
        >
          <Star className="anim-float-a absolute left-[18%] top-[26%] h-9 w-9 text-yellow-400" aria-hidden />
          <Star className="anim-float-b absolute right-[20%] top-[32%] h-6 w-6 text-pink-400" aria-hidden />
          <Star className="anim-float-a absolute bottom-[28%] left-[26%] h-6 w-6 text-blue-400" aria-hidden />
          <Star className="anim-float-b absolute bottom-[24%] right-[26%] h-9 w-9 text-green-400" aria-hidden />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { scale: [0.8, 1.08, 1], opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative h-24 w-24 overflow-hidden rounded-full border-[3px] border-white bg-white shadow-pop"
          >
            <Image src="/images/logo.webp" alt="Ana Paula Daycare logo" fill sizes="96px" className="object-contain p-1" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.55, ease: EASE }}
            className="font-display mt-5 text-2xl font-bold text-navy sm:text-3xl"
          >
            Ana Paula <span className="text-pink-500">Daycare</span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-1.5 text-[0.65rem] font-extrabold uppercase tracking-[0.3em] text-ink-faint"
          >
            {t('Learn · Play · Grow · Shine')}
          </motion.p>

          <div className="mt-7 flex gap-2" aria-hidden>
            {['bg-pink-500', 'bg-yellow-400', 'bg-blue-500', 'bg-green-500'].map((c, i) => (
              <motion.span
                key={c}
                className={`h-3 w-3 rounded-full ${c}`}
                animate={reduce ? {} : { y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.12, ease: 'easeInOut' }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
