'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { Preloader } from '@/components/site/preloader'
import { AudioPlayer } from '@/components/site/audio-player'
import { ChatWidget } from '@/components/site/chat-widget'
import { StickyCTA } from '@/components/site/sticky-cta'
import { SeoAndTracker } from '@/components/site/seo-tracker'
import { HomePage } from '@/components/site/pages/home'
import { AboutPage } from '@/components/site/pages/about'
import { ProgramsPage } from '@/components/site/pages/programs'
import { GalleryPage } from '@/components/site/pages/gallery'
import { BlogListPage, BlogArticlePage } from '@/components/site/pages/blog'
import { ContactPage } from '@/components/site/pages/contact'
import { QuizPage } from '@/components/site/pages/quiz'
import { SafetyPage } from '@/components/site/pages/safety'
import { EnrollPage } from '@/components/site/pages/enroll'
import { AdminPage } from '@/components/site/pages/admin'
import { LangProvider, useLang } from '@/components/site/lang-provider'
import { ContentProvider } from '@/components/site/content-provider'
import { Star, Sparkle } from '@/components/site/doodles'

const EASE = [0.22, 1, 0.36, 1] as const

function getRoute(): string {
  if (typeof window === 'undefined') return '/'
  const hash = window.location.hash.replace(/^#/, '')
  return hash || '/'
}

export default function Home() {
  const [route, setRoute] = useState('/')
  const [firstLoad, setFirstLoad] = useState(true)
  const [transitioning, setTransitioning] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    // Deep-link: em load fresco, aplica a rota do hash após a hidratação
    const r = getRoute()
    // eslint-disable-next-line react-hooks/set-state-in-effect -- padrão de restauração pós-hidratação
    if (r !== '/' && r !== route) setRoute(r)
  }, [])

  useEffect(() => {
    const onHash = () => {
      setTransitioning(true)
      window.setTimeout(() => {
        setRoute(getRoute())
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
        setTransitioning(false)
      }, 320)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    const t = window.setTimeout(() => setFirstLoad(false), 1650)
    return () => window.clearTimeout(t)
  }, [])

  // Roteamento por hash (compatível com preview que expõe apenas "/")
  const parse = () => {
    if (route.startsWith('/blog/')) {
      const slug = route.replace('/blog/', '').replace(/\/$/, '')
      return { page: 'article' as const, slug }
    }
    return { page: route.replace(/\/$/, '') || '/' }
  }
  const parsed = parse()

  const renderPage = () => {
    switch (parsed.page) {
      case 'article':
        return <BlogArticlePage key={`article-${parsed.slug ?? ''}`} slug={parsed.slug ?? ''} onBack={() => (window.location.hash = '/blog')} />
      case '/':
        return <HomePage />
      case '/about':
        return <AboutPage />
      case '/programs':
        return <ProgramsPage />
      case '/gallery':
        return <GalleryPage />
      case '/blog':
        return <BlogListPage onOpen={(slug) => (window.location.hash = `/blog/${slug}`)} />
      case '/contact':
        return <ContactPage />
      case '/quiz':
        return <QuizPage />
      case '/safety':
        return <SafetyPage />
      case '/enroll':
        return <EnrollPage />
      case '/admin':
        return <AdminPage />
      default:
        return <NotFoundPage route={route} />
    }
  }

  return (
    <LangProvider>
      <ContentProvider>
      <div className="flex min-h-screen flex-col">
        <a
          href="#main-content"
          className="sr-only-focusable fixed left-4 top-4 z-[110] rounded-full bg-navy px-4 py-2 text-sm font-extrabold text-cream"
        >
          Skip to content
        </a>
        <SeoAndTracker route={route} />
        <Preloader visible={firstLoad} />
        <Navbar route={route} />

        <main id="main-content" className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={route}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer />
        <ChatWidget />
        <AudioPlayer />
        <StickyCTA route={route} />
        <ScrollTopButton />

        {/* Cortina de transição: navy com estrelinhas */}
        <AnimatePresence>
          {transitioning && (
            <motion.div
              key="veil"
              initial={reduce ? { opacity: 0.9 } : { y: '100%' }}
              animate={reduce ? { opacity: 1 } : { y: '0%' }}
              exit={reduce ? { opacity: 0 } : { y: '-100%' }}
              transition={{ duration: 0.32, ease: EASE }}
              className="pointer-events-none fixed inset-0 z-[60] overflow-hidden bg-navy"
              aria-hidden
            >
              <Star className="anim-float-a absolute left-[22%] top-[30%] h-10 w-10 text-yellow-400/70" />
              <Star className="anim-float-b absolute right-[24%] top-[58%] h-7 w-7 text-pink-400/70" />
              <Star className="anim-float-a absolute left-[60%] top-[24%] h-6 w-6 text-green-400/60" />
              <Sparkle className="absolute right-[34%] top-[38%] h-6 w-6 text-white/50" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="font-display text-xl font-bold text-white/85">
                  Ana Paula <span className="text-yellow-400">Daycare</span>
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </ContentProvider>
    </LangProvider>
  )
}

function ScrollTopButton() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 1100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.3 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-[92px] left-7 z-30 hidden h-12 w-12 items-center justify-center rounded-full bg-navy text-lg font-bold text-cream shadow-pop transition-colors hover:bg-pink-500 md:flex"
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  )
}

function NotFoundPage({ route }: { route: string }) {
  const { t } = useLang()
  return (
    <div className="relative mx-auto flex min-h-[72vh] w-full max-w-[1440px] flex-col justify-center overflow-hidden px-5 pb-16 pt-36 sm:px-8 lg:px-12">
      <Star className="anim-float-a absolute right-[14%] top-24 h-12 w-12 text-yellow-400" aria-hidden />
      <Star className="anim-float-b absolute right-[24%] top-48 h-7 w-7 text-pink-400" aria-hidden />
      <p className="eyebrow">{t('Oops — Error 404')}</p>
      <h1 className="font-display mt-4 max-w-xl text-4xl font-bold leading-[1.1] text-navy sm:text-6xl">
        {t('This page wandered off')}{' '}
        <span className="squiggle squiggle-pink">{t('during playtime.')}</span>
      </h1>
      <p className="mt-5 max-w-md font-semibold text-ink-soft">
        {t('The page')}{' '}
        <code className="rounded-lg bg-yellow-100 px-1.5 py-0.5 text-[0.85em] font-bold text-navy">{route}</code>{' '}
        {t("doesn't exist — but there is plenty to discover back home.")}
      </p>
      <a href="#/" className="btn btn-pink mt-8 w-fit justify-between">
        {t('Back to home')}
        <span className="arr" aria-hidden>
          →
        </span>
      </a>
    </div>
  )
}
