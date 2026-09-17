'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '@/components/site/lang-provider'

const EASE = [0.22, 1, 0.36, 1] as const

/** Mini player de áudio: discreto, canto inferior esquerdo, NUNCA autoplay.
 *  Arquivo do cliente em /audio/anapaula-jingle.mp3 (trocar arquivo = atualizar player). */
export function AudioPlayer() {
  const { t } = useLang()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [open, setOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = new Audio('/audio/anapaula-jingle.mp3')
    audio.preload = 'none'
    audioRef.current = audio
    const onTime = () => setProgress(audio.duration ? audio.currentTime / audio.duration : 0)
    const onMeta = () => setDuration(audio.duration || 0)
    const onEnd = () => setPlaying(false)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('ended', onEnd)
    return () => {
      audio.pause()
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('ended', onEnd)
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    }
  }

  const fmt = (s: number) => (isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}` : '0:00')

  return (
    <div className="fixed bottom-[84px] left-4 z-40 md:bottom-7 md:left-7" aria-label="Background music player">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="mb-3 w-64 rounded-[1.4rem] border-2 border-navy/10 bg-white p-4 shadow-panel"
          >
            <div className="flex items-center gap-3.5">
              <button
                onClick={toggle}
                aria-label={playing ? t('Pause music') : t('Play music')}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700 transition-colors hover:bg-green-500 hover:text-white"
              >
                {playing ? (
                  <span className="flex gap-[3px]" aria-hidden>
                    <span className="h-3 w-px bg-current" />
                    <span className="h-3 w-px bg-current" />
                  </span>
                ) : (
                  <span className="ml-0.5 h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-current" aria-hidden />
                )}
              </button>
              <div className="min-w-0 flex-1">
                <p className="font-display truncate text-[0.95rem] font-bold text-navy">Ana Paula Daycare</p>
                <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-ink-faint">{t('Our little song')}</p>
              </div>
            </div>
            <div className="mt-3.5 h-1.5 w-full rounded-full bg-blue-100">
              <div
                className="h-full rounded-full bg-pink-500 transition-[width] duration-300"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <div className="mt-1.5 flex justify-between text-[0.625rem] font-bold text-ink-faint">
              <span>{fmt(progress * duration)}</span>
              <span>{fmt(duration)}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={() => {
          if (open && playing) {
            audioRef.current?.pause()
            setPlaying(false)
          }
          setOpen((v) => !v)
        }}
        aria-expanded={open}
        aria-label={open ? t('Close music player') : t('Open music player')}
        className={`flex h-12 w-12 items-center justify-center rounded-full shadow-pop transition-colors ${
          open ? 'bg-navy text-cream' : 'bg-yellow-400 text-navy hover:bg-yellow-500'
        }`}
        style={{ borderRadius: 999 }}
      >
        {/* Nota musical desenhada — discreta */}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M6 12.5V3.5L13 2v9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="4" cy="12.5" r="2" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="11" cy="11" r="2" stroke="currentColor" strokeWidth="1.2" />
        </svg>
        {playing && <span className="anim-bob absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-pink-500" aria-hidden />}
      </motion.button>
    </div>
  )
}
