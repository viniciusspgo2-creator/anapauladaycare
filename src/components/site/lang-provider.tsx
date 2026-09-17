'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { DICTS, LANG_LOCALE, type Lang } from '@/data/i18n'

const STORAGE_KEY = 'apdc-lang'

type LangContextValue = {
  lang: Lang
  setLang: (l: Lang) => void
  /** Traduz uma string (chave = texto original em inglês). Fallback: o próprio texto. */
  t: (s: string) => string
  /** Traduz e substitui variáveis {chave}. */
  tf: (s: string, vars: Record<string, string | number>) => string
}

const LangContext = createContext<LangContextValue>({
  lang: 'en',
  setLang: () => {},
  t: (s) => s,
  tf: (s) => s,
})

const isLang = (v: string | null): v is Lang => v === 'en' || v === 'es' || v === 'pt'

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  // Restaura o idioma salvo após a hidratação (localStorage só existe no cliente;
  // ler no initializer causaria mismatch de hidratação com o HTML renderizado em EN)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      // eslint-disable-next-line react-hooks/set-state-in-effect -- padrão de restauração pós-hidratação
      if (isLang(saved)) setLangState(saved)
    } catch {}
  }, [])

  // <html lang> atualizado
  useEffect(() => {
    document.documentElement.lang = LANG_LOCALE[lang]
  }, [lang])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {}
  }, [])

  const t = useCallback((s: string) => DICTS[lang]?.[s] ?? s, [lang])

  const tf = useCallback(
    (s: string, vars: Record<string, string | number>) => {
      let out = DICTS[lang]?.[s] ?? s
      for (const [k, v] of Object.entries(vars)) out = out.replaceAll(`{${k}}`, String(v))
      return out
    },
    [lang],
  )

  const value = useMemo(() => ({ lang, setLang, t, tf }), [lang, setLang, t, tf])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}
