'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { StarSolid } from '@/components/site/doodles'
import { useLang } from '@/components/site/lang-provider'

import type { Lang } from '@/data/i18n'

type Msg = { role: 'user' | 'assistant'; text: string }

const SUGGESTIONS = [
  'Schedule a visit',
  'Programs',
  'Hours',
  'Location',
  'Enrollment',
]

const EASE = [0.22, 1, 0.36, 1] as const

/** "Ask Ana" — assistente divertido alimentado pelo conteúdo real do site.
 *  Backend preservado: /api/chat → Gemini (API key do admin) → LLM local → FAQ.
 *  O idioma ativo é enviado para a API responder no mesmo idioma. */
export function ChatWidget() {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: 'assistant',
      text: 'Hi! How can we help your family today?',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [langState, setLangState] = useState<Lang>('en')
  const [sessionId] = useState(() => `c-${Math.random().toString(36).slice(2, 10)}`)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  // Idioma lido no submit (evita recriar o histórico ao trocar idioma)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('apdc-lang')
      if (saved === 'es' || saved === 'pt') setLangState(saved)
    } catch {}
  }, [])

  const send = async (text: string) => {
    const message = text.trim()
    if (!message || loading) return
    setInput('')
    setMessages((m) => [...m, { role: 'user', text: message }])
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          sessionId,
          lang: langState,
          history: messages.slice(-6).map((m) => ({ role: m.role === 'user' ? 'user' : 'model', text: m.text })),
        }),
      })
      const data = await res.json()
      setMessages((m) => [
        ...m,
        { role: 'assistant', text: data.reply || t("Sorry, I couldn't answer that right now. Please call us at +1 415 912 0300 — we'd love to help!") },
      ])
    } catch {
      setMessages((m) => [
        ...m,
        { role: 'assistant', text: t("I couldn't connect just now — but our team would love to help! Call +1 415 912 0300 or email anapauladaycare@gmail.com.") },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Botão flutuante */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Ask Ana'}
        aria-expanded={open}
        className={`fixed bottom-[84px] right-4 z-40 flex h-[54px] items-center gap-2.5 rounded-full px-5 shadow-pop transition-colors duration-300 md:bottom-7 md:right-7 ${
          open
            ? 'bg-navy text-cream'
            : 'bg-pink-500 text-white hover:bg-pink-600'
        }`}
      >
        <span className={`relative flex h-2.5 w-2.5 ${open ? '' : 'anim-bob'}`} aria-hidden>
          <StarSolid className={`h-6 w-6 ${open ? 'text-yellow-400' : 'text-yellow-300'} absolute -left-2 -top-2`} />
        </span>
        <span className="font-display text-[1.05rem] font-bold leading-none">
          {open ? t('Close') : t('Ask Ana')}
        </span>
      </motion.button>

      {/* Painel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed bottom-[144px] right-4 z-40 flex h-[62vh] max-h-[560px] w-[calc(100vw-2rem)] max-w-[400px] flex-col overflow-hidden rounded-[1.5rem] border-2 border-navy/10 bg-white shadow-panel md:bottom-[104px] md:right-7"
            role="dialog"
            aria-label="Ask Ana, virtual assistant"
          >
            {/* Header — com botão X para fechar */}
            <div className="flex items-center justify-between gap-3 border-b-2 border-navy/8 bg-blue-50 px-5 py-3">
              <p className="font-display text-[1.15rem] font-bold text-navy">
                {t('Ask Ana').replace(/\s*Ana$/, '')} <span className="text-pink-500">Ana</span>
              </p>
              <div className="flex min-w-0 items-center gap-2.5">
                <p className="truncate text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-blue-600">
                  {loading ? t('Typing…') : t('Family assistant')}
                </p>
                <button
                  onClick={() => setOpen(false)}
                  aria-label={t('Close chat')}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-navy shadow-pop-sm transition-all duration-200 hover:rotate-90 hover:bg-pink-500 hover:text-white"
                >
                  <span className="relative block h-3.5 w-3.5" aria-hidden>
                    <span className="absolute left-1/2 top-1/2 h-[2.5px] w-3.5 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-current" />
                    <span className="absolute left-1/2 top-1/2 h-[2.5px] w-3.5 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-current" />
                  </span>
                </button>
              </div>
            </div>

            {/* Mensagens */}
            <div ref={scrollRef} className="nice-scroll flex-1 space-y-4 overflow-y-auto bg-cream px-5 py-5">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[86%] whitespace-pre-wrap px-4 py-3 text-[0.875rem] font-semibold leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-navy text-cream'
                        : 'border-2 border-pink-100 bg-white text-ink'
                    }`}
                    style={{ borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '4px 18px 18px 4px' }}
                  >
                    {/* A mensagem inicial é traduzida; respostas da API já chegam no idioma ativo */}
                    {i === 0 ? t(m.text) : m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex gap-1.5 border-2 border-pink-100 bg-white px-4 py-3.5" style={{ borderRadius: '4px 18px 18px 4px' }}>
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className={`h-2 w-2 rounded-full ${['bg-pink-400', 'bg-yellow-400', 'bg-blue-400'][i]}`}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sugestões */}
            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-2 border-t-2 border-navy/8 bg-white px-5 py-3">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="chip bg-blue-50 text-[0.72rem] text-blue-700 transition-colors hover:bg-blue-100"
                  >
                    {t(s)}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
              className="flex items-center gap-3 border-t-2 border-navy/8 bg-white p-4"
            >
              <label htmlFor="chat-input" className="sr-only">{t('Type your question')}</label>
              <input
                id="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('Write your question…')}
                className="field h-11 min-w-0 flex-1 py-0"
                maxLength={500}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                aria-label={t('Send message')}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-500 text-lg text-white transition-colors hover:bg-pink-600 disabled:opacity-40"
              >
                →
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
