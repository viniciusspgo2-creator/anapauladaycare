'use client'

import { useEffect } from 'react'
import { useLang } from '@/components/site/lang-provider'

const SEO_MAP: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Ana Paula Daycare | Safe & Nurturing Child Care in San Francisco, CA',
    description:
      'Warm, home-like daycare in San Francisco (94112). Infant, toddler & preschool care with play-based learning. Book a visit today!',
  },
  '/about': {
    title: 'About Us | Ana Paula Daycare — San Francisco, CA',
    description: 'A place where little ones feel at home. Our family-centered approach, loving care and play-based philosophy.',
  },
  '/programs': {
    title: 'Programs: Infants, Toddlers & Preschool | Ana Paula Daycare',
    description: 'Gentle infant care, active toddler learning and engaging preschool programs in San Francisco.',
  },
  '/gallery': {
    title: 'Gallery | Ana Paula Daycare — Moments We Share Every Day',
    description: 'Creative play, hands-on learning, outdoor fun and daily discovery at Ana Paula Daycare.',
  },
  '/blog': {
    title: 'Parenting & Daycare Blog | Ana Paula Daycare',
    description: 'Practical tips for parents: daycare readiness, routines, nutrition and child development 0-5.',
  },
  '/contact': {
    title: 'Contact & Book a Visit | Ana Paula Daycare — San Francisco',
    description: 'Call +1 415 912 0300. 431 Paris St, San Francisco, CA 94112. Schedule your visit today!',
  },
  '/quiz': {
    title: 'Is Ana Paula Daycare Right for Your Family? | Fun 2-Minute Quiz',
    description: 'Answer 5 quick questions and get a personalized recommendation for your child care needs.',
  },
  '/safety': {
    title: 'Safety & Protocols | Ana Paula Daycare — San Francisco',
    description: 'How we keep your child safe: supervision, hygiene routines, secure pickup and emergency preparedness.',
  },
  '/enroll': {
    title: 'Enrollment Pre-Registration | Ana Paula Daycare',
    description: 'Start your child’s enrollment at Ana Paula Daycare in San Francisco. Pre-register online!',
  },
  '/admin': {
    title: 'Admin | Ana Paula Daycare',
    description: 'Site management.',
  },
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(path: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.rel = 'canonical'
    document.head.appendChild(el)
  }
  el.href = `https://anapauladaycare.com${path === '/' ? '' : path}`
}

/** SEO dinâmico (do admin, com fallback local) + tracking de pageviews por rota (SPA). */
export function SeoAndTracker({ route }: { route: string }) {
  const { t } = useLang()
  useEffect(() => {
    const seo = SEO_MAP[route] ?? SEO_MAP['/']
    const title = t(seo.title)
    const description = t(seo.description)
    document.title = title
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', `https://anapauladaycare.com${route}`)
    setCanonical(route)

    // SEO gerenciável: aplica o que foi configurado no admin (se houver)
    fetch(`/api/settings?page=${encodeURIComponent(route)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d?.seo?.title) return
        document.title = d.seo.title
        setMeta('name', 'description', d.seo.description || '')
        setMeta('property', 'og:title', d.seo.title)
        setMeta('property', 'og:description', d.seo.description || '')
      })
      .catch(() => {})
  }, [route, t])

  useEffect(() => {
    let sessionId = localStorage.getItem('apdc_sid')
    if (!sessionId) {
      sessionId = `s-${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`
      localStorage.setItem('apdc_sid', sessionId)
    }
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: route, referrer: document.referrer || 'Direct', sessionId }),
      keepalive: true,
    }).catch(() => {})
  }, [route])

  return null
}
