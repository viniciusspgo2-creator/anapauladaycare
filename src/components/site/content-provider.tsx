'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  DEFAULT_CONTENT,
  mergeContent,
  siteFromContent,
  type EditableContent,
  type SiteInfo,
} from '@/data/content-defaults'

type ContentContextValue = {
  /** Conteúdo mesclado (defaults + overrides do admin). `null` até carregar. */
  content: EditableContent
  /** Info de marca/contato no formato SITE (para substituir `SITE.x` nos componentes). */
  site: SiteInfo
  /** Resolve "ref:img:<id>" para "/api/img/img:<id>"; caminhos comuns voltam iguais. */
  resolveImage: (src?: string | null) => string
  /** true enquanto o conteúdo salvo não carregou (render usa defaults). */
  loading: boolean
}

const ContentContext = createContext<ContentContextValue>({
  content: DEFAULT_CONTENT,
  site: siteFromContent(DEFAULT_CONTENT),
  resolveImage: (s) => s ?? '',
  loading: true,
})

export function ContentProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<Partial<EditableContent> | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    fetch('/api/content')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!alive) return
        if (d?.content) setSaved(d.content)
      })
      .catch(() => {})
      .finally(() => alive && setLoading(false))
    return () => {
      alive = false
    }
  }, [])

  const value = useMemo<ContentContextValue>(() => {
    const content = mergeContent(DEFAULT_CONTENT, saved)
    return {
      content,
      site: siteFromContent(content),
      resolveImage: (src?: string | null) => {
        if (!src) return ''
        if (src.startsWith('ref:')) return `/api/img/${src.slice(4)}`
        return src
      },
      loading,
    }
  }, [saved, loading])

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

export function useContent() {
  return useContext(ContentContext)
}
