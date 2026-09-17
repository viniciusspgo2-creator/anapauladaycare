'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Reveal, LineDraw } from '@/components/site/reveal'
import { LANG_LOCALE } from '@/data/i18n'
import { useLang } from '@/components/site/lang-provider'
import { useContent } from '@/components/site/content-provider'
import { Star, StarSolid, Sun, Cloud, Pencil, Rainbow, SquiggleLine } from '@/components/site/doodles'

const EASE = [0.22, 1, 0.36, 1] as const

type Post = {
  id: string
  slug: string
  title: string
  excerpt: string | null
  coverImage: string | null
  category: string | null
  tags: string | null
  readTime: number
  createdAt: string
}

function fmtDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })
}

/* ================= JOURNAL — listagem ================= */
export function BlogListPage({ onOpen }: { onOpen: (slug: string) => void }) {
  const { t, tf, lang } = useLang()
  const { site } = useContent()
  const [posts, setPosts] = useState<Post[] | null>(null)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  useEffect(() => {
    fetch('/api/posts')
      .then((r) => r.json())
      .then((d) => setPosts(d.posts ?? []))
      .catch(() => setPosts([]))
  }, [])

  const categories = ['All', ...new Set((posts ?? []).map((p) => p.category).filter(Boolean) as string[])]
  const filtered = (posts ?? []).filter(
    (p) =>
      (category === 'All' || p.category === category) &&
      (query === '' ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        (p.excerpt ?? '').toLowerCase().includes(query.toLowerCase())),
  )
  const [lead, ...rest] = filtered

  return (
    <>
      {/* Abertura divertida */}
      <section className="relative overflow-hidden bg-cream" aria-label="Blog">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Pencil className="anim-float-a absolute right-[10%] top-36 h-12 w-12 text-yellow-300" />
          <Star className="anim-float-b absolute right-[24%] top-48 h-7 w-7 text-pink-300" />
          <Sun className="anim-spin-slow absolute left-[5%] top-40 h-14 w-14 text-yellow-200" />
          <Cloud className="absolute left-[26%] top-32 h-10 w-10 text-blue-100" />
          <SquiggleLine className="absolute left-[40%] top-56 w-24 text-blue-200" />
        </div>
        <div className="relative mx-auto max-w-[1440px] px-5 pb-14 pt-32 sm:px-8 sm:pt-44 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow">{t('Blog')}</p>
              <h1 className="font-display mt-6 text-[2.6rem] font-bold leading-[1.06] text-navy sm:text-[3.9rem]">
                {t('Notes on raising')} <span className="text-pink-500">{t('little humans.')}</span>
              </h1>
            </div>
            <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.3}>
              <p className="max-w-[40ch] font-semibold leading-relaxed text-ink-soft">
                {t('Practical guidance on daycare readiness, routines, nutrition and development — written by people who care for little ones every day.')}
              </p>
              <label className="mt-7 block">
                <span className="sr-only">{t('Search articles')}</span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('Search the blog…')}
                  className="field"
                />
              </label>
            </Reveal>
          </div>

          {/* Categorias */}
          <div className="mt-11 flex flex-wrap gap-2.5" role="tablist" aria-label="Filter by category">
            {categories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={category === c}
                onClick={() => setCategory(c)}
                className={`chip min-h-[40px] transition-all duration-300 ${
                  category === c
                    ? 'scale-[1.03] bg-navy text-white shadow-pop'
                    : 'bg-white text-ink-soft hover:text-navy hover:shadow-pop-sm'
                }`}
              >
                {category === c && <StarSolid className="h-3.5 w-3.5 text-yellow-400" aria-hidden />}
                {c === 'All' ? t('All') : c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Artigos */}
      <section className="bg-cream pb-28" aria-label="Articles">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          {!posts ? (
            <div className="grid gap-10 pt-6" aria-busy="true">
              <div className="h-[46vh] animate-pulse rounded-3xl bg-yellow-100" />
              <div className="grid gap-8 sm:grid-cols-2">
                <div className="h-64 animate-pulse rounded-3xl bg-blue-100" />
                <div className="h-64 animate-pulse rounded-3xl bg-pink-100" />
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="pt-20">
              <p className="font-display text-2xl font-bold text-navy">{t('Nothing found here.')}</p>
              <p className="mt-2 font-semibold text-ink-soft">{t('Try another search or category.')}</p>
            </div>
          ) : (
            <div className="pt-12">
              {/* Artigo principal — composição grande assimétrica */}
              {lead && (
                <Reveal>
                  <button onClick={() => onOpen(lead.slug)} className="hover-wiggle group grid w-full gap-8 text-left lg:grid-cols-12 lg:items-center lg:gap-14">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border-[5px] border-white shadow-pop lg:col-span-7">
                      {lead.coverImage ? (
                        <Image
                          src={lead.coverImage}
                          alt={lead.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 58vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                          priority
                        />
                      ) : (
                        <div className="h-full w-full bg-yellow-100" />
                      )}
                    </div>
                    <div className="lg:col-span-5">
                      {lead.category && (
                        <span className="chip bg-pink-100 text-pink-600">{lead.category}</span>
                      )}
                      <h2 className="font-display mt-4 text-[1.9rem] font-bold leading-[1.12] text-navy transition-colors group-hover:text-pink-600 sm:text-[2.4rem]">
                        {lead.title}
                      </h2>
                      {lead.excerpt && (
                        <p className="mt-4 max-w-[52ch] font-semibold leading-relaxed text-ink-soft">{lead.excerpt}</p>
                      )}
                      <p className="mt-5 text-[0.8125rem] font-bold text-ink-faint">
                        {fmtDate(lead.createdAt, LANG_LOCALE[lang])} · {tf('{n} min read', { n: lead.readTime })}
                      </p>
                      <span className="btn btn-pink btn-sm mt-6">{t('Read the article')} <span className="arr">→</span></span>
                    </div>
                  </button>
                </Reveal>
              )}

              {/* Secundários — composição assimétrica em hairlines */}
              {rest.length > 0 && (
                <>
                  <LineDraw className="mt-16" />
                  <ul className="mt-2">
                    {rest.map((p, i) => (
                      <li key={p.id} className="border-b border-ink/10">
                        <Reveal delay={0.03 * i} y={12}>
                          <button
                            onClick={() => onOpen(p.slug)}
                            className="group grid w-full grid-cols-[1fr_auto] items-baseline gap-x-8 gap-y-3 py-7 text-left sm:grid-cols-12 sm:py-8"
                          >
                            <div className="sm:col-span-5 lg:col-span-4">
                              {p.category && (
                                <span className="chip bg-blue-100 text-blue-600 text-[0.7rem]">{p.category}</span>
                              )}
                              <h3 className="font-display mt-2.5 text-[1.35rem] font-bold leading-snug text-navy transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-pink-600 sm:text-[1.55rem]">
                                {p.title}
                              </h3>
                            </div>
                            {p.excerpt && (
                              <p className="col-span-1 line-clamp-2 max-w-[52ch] font-semibold leading-relaxed text-ink-soft sm:col-span-5 sm:col-start-6 lg:col-span-5 lg:col-start-7">
                                {p.excerpt}
                              </p>
                            )}
                            <p className="col-span-1 text-[0.75rem] font-bold text-ink-faint sm:col-span-2 sm:text-right">
                              {fmtDate(p.createdAt, LANG_LOCALE[lang])}
                            </p>
                          </button>
                        </Reveal>
                      </li>
                    ))}
                    <li aria-hidden className="border-t border-ink/10" />
                  </ul>
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

/* ================= JOURNAL — artigo individual ================= */
export function BlogArticlePage({ slug, onBack }: { slug: string; onBack: () => void }) {
  const { t, tf, lang } = useLang()
  const { site } = useContent()
  const [post, setPost] = useState<(Post & { content: string | null; metaTitle: string | null; metaDescription: string | null }) | null>(null)
  const [related, setRelated] = useState<Post[]>([])
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    fetch(`/api/posts?slug=${encodeURIComponent(slug)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('not found'))))
      .then((d) => {
        setPost(d.post)
        // Artigos relacionados (mesma categoria)
        return fetch('/api/posts')
          .then((r) => r.json())
          .then((all) => {
            const list: Post[] = all.posts ?? []
            setRelated(
              list
                .filter((p) => p.slug !== slug && (!d.post?.category || p.category === d.post.category))
                .slice(0, 2),
            )
          })
          .catch(() => {})
      })
      .catch(() => setNotFound(true))
  }, [slug])

  // SEO dinâmico por artigo
  useEffect(() => {
    if (post) {
      document.title = post.metaTitle || `${post.title} | Ana Paula Daycare`
      setMetaByName('description', post.metaDescription || post.excerpt || '')
    }
  }, [post])

  if (notFound) {
    return (
      <div className="mx-auto flex min-h-[64vh] w-full max-w-[1440px] flex-col justify-center px-5 pb-16 pt-32 sm:px-8 lg:px-12">
        <p className="eyebrow">{t('Not found')}</p>
        <h1 className="font-display mt-4 max-w-md text-3xl font-bold leading-snug text-navy sm:text-4xl">
          {t("This article isn't on our shelf")} <span className="text-pink-500">{t('right now.')}</span>
        </h1>
        <button onClick={onBack} className="btn btn-white mt-6 w-fit">
          {t('← Back to the Blog')}
        </button>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="mx-auto max-w-[1440px] px-5 pt-36 sm:px-8 lg:px-12" aria-busy="true">
        <div className="h-6 w-40 animate-pulse rounded-full bg-yellow-100" />
        <div className="mt-6 h-12 w-3/4 animate-pulse rounded-2xl bg-blue-100" />
        <div className="mt-10 h-[52vh] animate-pulse rounded-3xl bg-pink-100" />
      </div>
    )
  }

  const tags = (post.tags ?? '').split(',').map((t) => t.trim()).filter(Boolean)
  const words = post.title.split(' ')
  const breakAt = Math.min(4, Math.max(2, Math.ceil(words.length / 2)))
  const titleA = words.slice(0, breakAt).join(' ')
  const titleB = words.slice(breakAt).join(' ')

  return (
    <article className="bg-cream pb-28">
      {/* Abertura */}
      <header className="mx-auto max-w-[1440px] px-5 pt-32 sm:px-8 sm:pt-44 lg:px-12">
        <button onClick={onBack} className="chip bg-white text-navy hover:shadow-pop-sm">
          {t('← Blog')}
        </button>
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h1 className="font-display text-[2.3rem] font-bold leading-[1.08] text-navy sm:text-[3.3rem] lg:col-span-9">
            <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} className="block">
              {titleA}
            </motion.span>
            {titleB && (
              <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.12, ease: EASE }} className="block">
                <span className="squiggle">{titleB}</span>
              </motion.span>
            )}
          </h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-[0.8125rem] font-bold text-ink-faint lg:col-span-3 lg:text-right"
          >
            {post.category && <p className="mb-2"><span className="chip bg-pink-100 text-pink-600">{post.category}</span></p>}
            <p>
              {fmtDate(post.createdAt, LANG_LOCALE[lang])} · {tf('{n} min read', { n: post.readTime })}
            </p>
          </motion.div>
        </div>
      </header>

      {/* Capa */}
      {post.coverImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mx-auto mt-14 max-w-[1440px] px-5 sm:px-8 lg:px-12"
        >
          <div className="relative aspect-[16/8] overflow-hidden rounded-[2rem] border-[5px] border-white shadow-pop">
            <Image src={post.coverImage} alt={post.title} fill priority sizes="100vw" className="object-cover" />
          </div>
        </motion.div>
      )}

      {/* Corpo */}
      <div className="mx-auto mt-16 max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-12">
          {post.excerpt && (
            <motion.aside
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              className="lg:col-span-3"
            >
              <p className="font-display rounded-2xl border-l-4 border-yellow-400 bg-yellow-50 p-5 text-[1.05rem] font-semibold leading-relaxed text-blue-800">
                {post.excerpt}
              </p>
            </motion.aside>
          )}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
            className={`prose-editorial ${post.excerpt ? 'lg:col-span-8 lg:col-start-5' : 'lg:col-span-8 lg:col-start-3'}`}
            dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
          />
        </div>

        {tags.length > 0 && (
          <div className="mt-16 flex flex-wrap items-center gap-2.5 border-t border-ink/12 pt-6">
            {tags.map((t) => (
              <span key={t} className="chip bg-blue-100 text-blue-600 text-[0.7rem]">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Relacionados */}
      {related.length > 0 && (
        <div className="mx-auto mt-20 max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <LineDraw />
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            {related.map((r, i) => (
              <Reveal key={r.id} delay={0.05 * i}>
                <button
                  onClick={() => (window.location.hash = `/blog/${r.slug}`)}
                  className="group grid w-full gap-6 text-left sm:grid-cols-2 sm:items-center"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-[4px] border-white shadow-pop-sm">
                    {r.coverImage && (
                      <Image
                        src={r.coverImage}
                        alt={r.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 30vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    )}
                  </div>
                  <div>
                    {r.category && (
                      <span className="chip bg-pink-100 text-pink-600 text-[0.7rem]">{r.category}</span>
                    )}
                    <h3 className="font-display mt-2.5 text-[1.35rem] font-bold leading-snug text-navy transition-colors group-hover:text-pink-600">
                      {r.title}
                    </h3>
                    <p className="mt-2 text-[0.8125rem] font-bold text-ink-faint">
                      {tf('{n} min read', { n: r.readTime })}
                    </p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      )}

      {/* CTA final */}
      <div className="mx-auto mt-24 max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-navy px-8 py-14 text-cream sm:px-14">
          <Star className="anim-float-a absolute right-[8%] top-8 h-10 w-10 text-yellow-400" aria-hidden />
          <Rainbow size={72} className="absolute -left-1 bottom-2 opacity-60" aria-hidden />
          <div className="relative flex flex-wrap items-center justify-between gap-8">
            <h2 className="font-display max-w-[24ch] text-[1.8rem] font-bold leading-snug sm:text-[2.2rem]">
              {t('Enjoyed this? Come see it')} <span className="text-yellow-400">{t('in person.')}</span>
            </h2>
            <div className="flex flex-wrap gap-4">
              <a href="#/contact" className="btn btn-pink justify-between">
                {t('Schedule a visit')}
                <span className="arr" aria-hidden>
                  →
                </span>
              </a>
              <a href={site.phoneHref} className="btn btn-ghost justify-between border-white/30 text-cream hover:bg-white/10 hover:border-white/60">
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

function setMetaByName(name: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}
