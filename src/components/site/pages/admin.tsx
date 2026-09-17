'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import {
  LayoutDashboard, FileText, Search, Bot, Users, LogOut, Plus, Pencil, Trash2, Eye, EyeOff,
  Loader2, Lock, TrendingUp, Globe, Star, SlidersHorizontal,
} from 'lucide-react'
import { ContentTab } from '@/components/site/pages/admin-content'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid,
} from 'recharts'

type Tab = 'overview' | 'content' | 'posts' | 'seo' | 'ai' | 'leads'

type PostRow = {
  id: string; slug: string; title: string; metaTitle: string | null; metaDescription: string | null
  excerpt: string | null; content: string | null; coverImage: string | null; category: string | null
  tags: string | null; readTime: number; published: boolean; createdAt: string
}

type Lead = {
  id: string; name: string; email: string; phone: string | null; childAge: string | null
  priorities: string | null; schedule: string | null; visitedOthers: string | null
  message: string | null; resultSummary: string | null; source: string; emailSent: boolean; createdAt: string
}

type Analytics = {
  totalViews: number
  topPaths: { path: string; views: number }[]
  topRefs: { source: string; views: number }[]
  daily: { date: string; views: number }[]
}

const SEO_PAGES = [
  { key: 'seoHome', label: 'Home' },
  { key: 'seoAbout', label: 'About' },
  { key: 'seoPrograms', label: 'Programs' },
  { key: 'seoGallery', label: 'Gallery' },
  { key: 'seoBlog', label: 'Blog' },
  { key: 'seoContact', label: 'Contact' },
  { key: 'seoQuiz', label: 'Quiz' },
  { key: 'seoSafety', label: 'Safety' },
  { key: 'seoEnroll', label: 'Enroll' },
]

const emptyPost = {
  title: '', slug: '', metaTitle: '', metaDescription: '', excerpt: '', content: '',
  coverImage: '/images/gallery/happy-children-play.webp', category: '', tags: '', readTime: 5, published: true,
}

export function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loggingIn, setLoggingIn] = useState(false)
  const [tab, setTab] = useState<Tab>('overview')

  useEffect(() => {
    fetch('/api/admin/settings').then((r) => setAuthed(r.ok)).catch(() => setAuthed(false))
  }, [])

  const login = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoggingIn(true)
    setLoginError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.error || 'Login failed')
      }
      setAuthed(true)
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoggingIn(false)
    }
  }

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' }).catch(() => {})
    setAuthed(false)
    setPassword('')
  }

  if (authed === null) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center pt-24">
        <Loader2 className="h-8 w-8 animate-spin text-rose" aria-label="Loading" />
      </div>
    )
  }

  if (!authed) {
    return (
      <div className="flex min-h-[85vh] items-center justify-center px-4 pt-24">
        <form onSubmit={login} className="card-panel w-full max-w-sm p-8 text-center">
          <Image src="/images/logo.webp" alt="Ana Paula Daycare" width={72} height={72} className="mx-auto h-18 w-18 object-contain" />
          <h1 className="font-display mt-4 text-2xl font-bold text-ink">Admin Panel</h1>
          <p className="mt-1 text-sm font-semibold text-ink-soft">Ana Paula Daycare management</p>
          <label htmlFor="admin-pass" className="sr-only">Password</label>
          <div className="relative mt-6">
            <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" aria-hidden />
            <input
              id="admin-pass" type="password" value={password} required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              className="h-12 w-full rounded-2xl border border-ink/15 bg-paper-raised pl-11 pr-4 text-sm font-semibold text-ink outline-none focus:border-rose focus:ring-2 focus:ring-rose/20"
            />
          </div>
          {loginError && <p role="alert" className="mt-3 rounded-xl bg-red-50 p-2.5 text-sm font-bold text-red-600">{loginError}</p>}
          <button
            type="submit" disabled={loggingIn}
            className="mt-5 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-rose font-extrabold text-white shadow-panel transition-all hover:bg-rose-deep disabled:opacity-50 active:scale-[0.98]"
          >
            {loggingIn ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : null}
            Sign In
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-24 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink">Admin Panel</h1>
          <p className="text-sm font-semibold text-ink-soft">Manage your website — everything in one place.</p>
        </div>
        <button onClick={logout} className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-white px-5 text-sm font-extrabold text-ink-soft shadow-panel transition-colors hover:text-rose">
          <LogOut className="h-4 w-4" aria-hidden /> Sign out
        </button>
      </div>

      {/* Tabs */}
      <nav className="nice-scroll mt-6 flex gap-2 overflow-x-auto pb-1" aria-label="Admin sections">
        {([
          ['overview', 'Overview', LayoutDashboard],
          ['content', 'Site Content', SlidersHorizontal],
          ['posts', 'Blog CMS', FileText],
          ['seo', 'SEO Manager', Search],
          ['ai', 'AI & Settings', Bot],
          ['leads', 'Leads', Users],
        ] as [Tab, string, typeof LayoutDashboard][]).map(([id, label, Icon]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            aria-current={tab === id ? 'true' : undefined}
            className={`inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full px-5 text-sm font-extrabold transition-all ${
              tab === id ? 'bg-rose text-white shadow-panel' : 'bg-white text-ink-soft hover:text-rose'
            }`}
          >
            <Icon className="h-4 w-4" aria-hidden /> {label}
          </button>
        ))}
      </nav>

      <div className="mt-6">
        {tab === 'overview' && <OverviewTab />}
        {tab === 'content' && <ContentTab />}
        {tab === 'posts' && <PostsTab />}
        {tab === 'seo' && <SeoTab />}
        {tab === 'ai' && <AiTab />}
        {tab === 'leads' && <LeadsTab />}
      </div>
    </div>
  )
}

/* ============ OVERVIEW ============ */
function OverviewTab() {
  const [data, setData] = useState<Analytics | null>(null)
  useEffect(() => {
    fetch('/api/admin/analytics').then((r) => r.json()).then(setData).catch(() => {})
  }, [])

  if (!data) return <Loading />

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={<Eye className="h-6 w-6" />} label="Views (30 days)" value={data.totalViews} bg="bg-rose-soft" color="text-rose-deep" />
        <StatCard icon={<Globe className="h-6 w-6" />} label="Top page" value={data.topPaths[0]?.path ?? '—'} small bg="bg-sand" color="text-forest" />
        <StatCard icon={<TrendingUp className="h-6 w-6" />} label="Main traffic source" value={data.topRefs[0]?.source ?? 'Direct'} bg="bg-sand" color="text-forest" />
      </div>

      <div className="card-panel p-6">
        <h3 className="font-display text-lg font-bold text-ink">Daily views (last 30 days)</h3>
        <div className="mt-4 h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.daily} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3e8dc" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#6b6680' }} tickFormatter={(v: string) => v.slice(5)} />
              <YAxis tick={{ fontSize: 11, fill: '#6b6680' }} allowDecimals={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,.12)', fontSize: 13 }} />
              <Line type="monotone" dataKey="views" stroke="#EE4D9B" strokeWidth={3} dot={false} activeDot={{ r: 5, fill: '#FFC613' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="card-panel p-6">
          <h3 className="font-display text-lg font-bold text-ink">Most visited pages</h3>
          <div className="mt-4 h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.topPaths} layout="vertical" margin={{ top: 0, right: 16, left: 30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3e8dc" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#6b6680' }} allowDecimals={false} />
                <YAxis type="category" dataKey="path" tick={{ fontSize: 11, fill: '#6b6680' }} width={110} />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,.12)', fontSize: 13 }} />
                <Bar dataKey="views" fill="#1D4E9E" radius={[0, 8, 8, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card-panel p-6">
          <h3 className="font-display text-lg font-bold text-ink">Traffic sources</h3>
          <div className="mt-4 h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.topRefs} layout="vertical" margin={{ top: 0, right: 16, left: 30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3e8dc" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#6b6680' }} allowDecimals={false} />
                <YAxis type="category" dataKey="source" tick={{ fontSize: 11, fill: '#6b6680' }} width={110} />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,.12)', fontSize: 13 }} />
                <Bar dataKey="views" fill="#7DC242" radius={[0, 8, 8, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, bg, color, small }: { icon: React.ReactNode; label: string; value: string | number; bg: string; color: string; small?: boolean }) {
  return (
    <div className="card-panel flex items-center gap-4 p-5">
      <span className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl p-3.5 ${bg} ${color}`} aria-hidden>{icon}</span>
      <div className="min-w-0">
        <p className="text-xs font-extrabold uppercase tracking-wider text-ink-soft">{label}</p>
        <p className={`font-display font-bold text-ink ${small ? 'truncate text-base' : 'text-3xl'}`}>{value}</p>
      </div>
    </div>
  )
}

/* ============ BLOG CMS ============ */
function PostsTab() {
  const [posts, setPosts] = useState<PostRow[] | null>(null)
  const [editing, setEditing] = useState<Partial<PostRow> | null>(null)
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const load = useCallback(() => {
    fetch('/api/admin/posts').then((r) => r.json()).then((d) => setPosts(d.posts ?? [])).catch(() => setPosts([]))
  }, [])
  useEffect(load, [load])

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editing) return
    setSaving(true)
    try {
      const isNew = !editing.id
      const res = await fetch(isNew ? '/api/admin/posts' : `/api/admin/posts/${editing.id}`, {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing),
      })
      if (!res.ok) throw new Error('Save failed')
      setEditing(null)
      setShowForm(false)
      load()
    } catch {
      alert('Could not save the post. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id: string) => {
    if (!confirm('Delete this post permanently?')) return
    await fetch(`/api/admin/posts/${id}`, { method: 'DELETE' })
    load()
  }

  if (!posts) return <Loading />

  return (
    <div>
      <div className="flex justify-end">
        <button
          onClick={() => { setEditing({ ...emptyPost }); setShowForm(true) }}
          className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-rose px-6 font-extrabold text-white shadow-panel transition-transform hover:scale-105 active:scale-95"
        >
          <Plus className="h-5 w-5" aria-hidden /> New Post
        </button>
      </div>

      {/* Lista */}
      <div className="mt-5 grid gap-3">
        {posts.map((p) => (
          <div key={p.id} className="card-panel flex flex-wrap items-center gap-4 p-4 sm:p-5">
            {p.coverImage && (
              <Image src={p.coverImage} alt="" width={72} height={72} className="h-16 w-16 shrink-0 rounded-2xl object-cover" />
            )}
            <div className="min-w-0 flex-1">
              <p className="font-display truncate text-base font-bold text-ink">{p.title}</p>
              <p className="mt-0.5 truncate text-xs font-semibold text-ink-soft">
                /{p.slug} · {p.category ?? 'Uncategorized'} · {p.readTime} min
              </p>
            </div>
            <span className={`rounded-full px-3 py-1 text-[11px] font-extrabold uppercase ${p.published ? 'bg-sand text-forest' : 'bg-sand text-yellow-700'}`}>
              {p.published ? 'Published' : 'Draft'}
            </span>
            <div className="flex gap-2">
              <button onClick={() => { setEditing(p); setShowForm(true) }} aria-label={`Edit ${p.title}`} className="flex h-11 w-11 items-center justify-center rounded-full bg-sand text-forest transition-transform active:scale-90">
                <Pencil className="h-4 w-4" />
              </button>
              <button onClick={() => remove(p.id)} aria-label={`Delete ${p.title}`} className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-500 transition-transform active:scale-90">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {posts.length === 0 && <p className="card-panel p-8 text-center font-bold text-ink-soft">No posts yet — create your first one!</p>}
      </div>

      {/* Editor */}
      {showForm && editing && (
        <form onSubmit={save} className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-20 backdrop-blur-sm">
          <div className="card-panel w-full max-w-2xl p-6 sm:p-8">
            <h3 className="font-display text-2xl font-bold text-ink">{editing.id ? 'Edit Post' : 'New Post'}</h3>
            <div className="mt-5 grid gap-4">
              <AdminField label="Title *"><input required value={editing.title ?? ''} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className={adminInput} /></AdminField>
              <div className="grid gap-4 sm:grid-cols-2">
                <AdminField label="Slug (URL)"><input value={editing.slug ?? ''} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} placeholder="auto-from-title" className={adminInput} /></AdminField>
                <AdminField label="Category"><input value={editing.category ?? ''} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className={adminInput} /></AdminField>
              </div>
              <AdminField label="SEO title"><input value={editing.metaTitle ?? ''} onChange={(e) => setEditing({ ...editing, metaTitle: e.target.value })} className={adminInput} /></AdminField>
              <AdminField label="SEO description"><textarea rows={2} value={editing.metaDescription ?? ''} onChange={(e) => setEditing({ ...editing, metaDescription: e.target.value })} className={`${adminInput} resize-none`} /></AdminField>
              <AdminField label="Excerpt"><textarea rows={2} value={editing.excerpt ?? ''} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} className={`${adminInput} resize-none`} /></AdminField>
              <div className="grid gap-4 sm:grid-cols-3">
                <AdminField label="Cover image (path)"><input value={editing.coverImage ?? ''} onChange={(e) => setEditing({ ...editing, coverImage: e.target.value })} className={adminInput} /></AdminField>
                <AdminField label="Tags (comma separated)"><input value={editing.tags ?? ''} onChange={(e) => setEditing({ ...editing, tags: e.target.value })} className={adminInput} /></AdminField>
                <AdminField label="Read time (min)"><input type="number" min={1} max={60} value={editing.readTime ?? 5} onChange={(e) => setEditing({ ...editing, readTime: Number(e.target.value) })} className={adminInput} /></AdminField>
              </div>
              <AdminField label="Content (HTML: h2, p, ul, li, strong…)">
                <textarea rows={12} value={editing.content ?? ''} onChange={(e) => setEditing({ ...editing, content: e.target.value })} className={`${adminInput} font-mono text-xs resize-y`} />
              </AdminField>
              <label className="flex cursor-pointer items-center gap-3 text-sm font-extrabold text-ink">
                <input type="checkbox" checked={editing.published ?? false} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} className="h-5 w-5 accent-rose" />
                Published (visible on the blog)
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => { setShowForm(false); setEditing(null) }} className="min-h-[48px] rounded-full bg-paper-raised px-6 font-extrabold text-ink-soft hover:text-ink">
                Cancel
              </button>
              <button type="submit" disabled={saving} className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-rose px-7 font-extrabold text-white shadow-panel disabled:opacity-50 active:scale-95">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null} Save Post
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

/* ============ SEO ============ */
function SeoTab() {
  const [pages, setPages] = useState<Record<string, { title: string; description: string; keywords: string }>>({})
  const [loaded, setLoaded] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => r.json())
      .then((d) => {
        const next: typeof pages = {}
        for (const p of SEO_PAGES) {
          let val = { title: '', description: '', keywords: '' }
          try { if (d.settings?.[p.key]) val = JSON.parse(d.settings[p.key]) } catch { /* default */ }
          next[p.key] = val
        }
        setPages(next)
        setLoaded(true)
      })
      .catch(() => setLoaded(true))
  }, [])

  const save = async () => {
    setSaving(true)
    setSaved(false)
    await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(SEO_PAGES.map((p) => [p.key, pages[p.key]]))),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  if (!loaded) return <Loading />

  return (
    <div className="grid gap-4">
      <p className="rounded-2xl bg-sand p-4 text-sm font-semibold text-forest">
        💡 Edit the SEO title and description for each page of the site. These values are applied instantly to the
        browser tab, Google results (meta tags) and social shares.
      </p>
      {SEO_PAGES.map((p) => (
        <div key={p.key} className="card-panel p-5">
          <h3 className="font-display text-lg font-bold text-rose">{p.label}</h3>
          <div className="mt-3 grid gap-3">
            <AdminField label="Title"><input value={pages[p.key]?.title ?? ''} onChange={(e) => setPages({ ...pages, [p.key]: { ...pages[p.key], title: e.target.value } })} className={adminInput} maxLength={120} /></AdminField>
            <AdminField label="Description"><textarea rows={2} value={pages[p.key]?.description ?? ''} onChange={(e) => setPages({ ...pages, [p.key]: { ...pages[p.key], description: e.target.value } })} className={`${adminInput} resize-none`} maxLength={320} /></AdminField>
            <AdminField label="Keywords (comma separated)"><input value={pages[p.key]?.keywords ?? ''} onChange={(e) => setPages({ ...pages, [p.key]: { ...pages[p.key], keywords: e.target.value } })} className={adminInput} /></AdminField>
          </div>
        </div>
      ))}
      <div className="sticky bottom-4 flex items-center justify-end gap-3">
        {saved && <span className="font-extrabold text-forest">Saved! ✓</span>}
        <button onClick={save} disabled={saving} className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-rose px-8 font-extrabold text-white shadow-panel disabled:opacity-50 active:scale-95">
          {saving ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : null} Save SEO
        </button>
      </div>
    </div>
  )
}

/* ============ AI & SETTINGS ============ */
function AiTab() {
  const [settings, setSettings] = useState<{ geminiApiKey: string; geminiModel: string; notifyEmail: string }>({
    geminiApiKey: '', geminiModel: 'gemini-2.0-flash', notifyEmail: '',
  })
  const [showKey, setShowKey] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [newPassword, setNewPassword] = useState('')

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => r.json())
      .then((d) => {
        setSettings({
          geminiApiKey: d.settings?.gemini_api_key ?? '',
          geminiModel: d.settings?.gemini_model ?? 'gemini-2.0-flash',
          notifyEmail: d.settings?.notify_email ?? '',
        })
        setLoaded(true)
      })
      .catch(() => setLoaded(true))
  }, [])

  const save = async () => {
    setSaving(true)
    setSaved(false)
    await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...settings, newPassword: newPassword || undefined }),
    })
    setSaving(false)
    setSaved(true)
    setNewPassword('')
    setTimeout(() => setSaved(false), 2500)
  }

  if (!loaded) return <Loading />

  return (
    <div className="grid max-w-2xl gap-4">
      <div className="card-panel p-6">
        <h3 className="font-display flex items-center gap-2 text-lg font-bold text-ink">
          <Bot className="h-5 w-5 text-rose" aria-hidden /> Google Gemini API (Chatbot)
        </h3>
        <p className="mt-2 text-sm font-semibold leading-relaxed text-ink-soft">
          Paste your API key from <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="text-rose underline">Google AI Studio</a> to
          power the site chatbot. Without a key, the chatbot still answers using the built-in knowledge base.
        </p>
        <div className="mt-4 grid gap-4">
          <AdminField label="Gemini API key">
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={settings.geminiApiKey}
                onChange={(e) => setSettings({ ...settings, geminiApiKey: e.target.value })}
                placeholder="AIza…"
                className={`${adminInput} pr-12`}
              />
              <button type="button" onClick={() => setShowKey((v) => !v)} aria-label={showKey ? 'Hide API key' : 'Show API key'} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-soft">
                {showKey ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </AdminField>
          <AdminField label="Model">
            <select value={settings.geminiModel} onChange={(e) => setSettings({ ...settings, geminiModel: e.target.value })} className={adminInput}>
              <option value="gemini-2.0-flash">gemini-2.0-flash (recommended)</option>
              <option value="gemini-2.5-flash">gemini-2.5-flash</option>
              <option value="gemini-2.0-flash-lite">gemini-2.0-flash-lite</option>
              <option value="gemini-1.5-pro">gemini-1.5-pro</option>
            </select>
          </AdminField>
          <AdminField label="Email for lead notifications">
            <input type="email" value={settings.notifyEmail} onChange={(e) => setSettings({ ...settings, notifyEmail: e.target.value })} placeholder="anapauladaycare@gmail.com" className={adminInput} />
          </AdminField>
        </div>
      </div>

      <div className="card-panel p-6">
        <h3 className="font-display flex items-center gap-2 text-lg font-bold text-ink">
          <Lock className="h-5 w-5 text-forest" aria-hidden /> Change admin password
        </h3>
        <AdminField label="New password (leave empty to keep current)">
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" className={adminInput} minLength={8} />
        </AdminField>
      </div>

      <div className="flex items-center justify-end gap-3">
        {saved && <span className="font-extrabold text-forest">Saved! ✓</span>}
        <button onClick={save} disabled={saving} className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-rose px-8 font-extrabold text-white shadow-panel disabled:opacity-50 active:scale-95">
          {saving ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : <Star className="h-5 w-5" aria-hidden />} Save Settings
        </button>
      </div>
    </div>
  )
}

/* ============ LEADS ============ */
function LeadsTab() {
  const [data, setData] = useState<{ leads: Lead[]; contacts: { id: string; name: string; email: string; phone: string | null; message: string; createdAt: string }[] } | null>(null)

  useEffect(() => {
    fetch('/api/admin/leads').then((r) => r.json()).then(setData).catch(() => setData({ leads: [], contacts: [] }))
  }, [])

  if (!data) return <Loading />

  return (
    <div className="grid gap-6">
      <div>
        <h3 className="font-display text-xl font-bold text-ink">Quiz & Enrollment leads ({data.leads.length})</h3>
        <div className="mt-3 grid gap-3">
          {data.leads.map((l) => (
            <details key={l.id} className="card-panel p-0">
              <summary className="flex cursor-pointer list-none flex-wrap items-center gap-3 p-4 [&::-webkit-details-marker]:hidden">
                <span className={`rounded-full px-3 py-1 text-[11px] font-extrabold uppercase ${l.source === 'quiz' ? 'bg-rose-soft text-rose-deep' : 'bg-sand text-forest'}`}>
                  {l.source}
                </span>
                <span className="font-display min-w-0 flex-1 truncate text-base font-bold text-ink">{l.name}</span>
                <a href={`mailto:${l.email}`} className="text-sm font-bold text-forest hover:underline">{l.email}</a>
                {l.phone && <span className="text-sm font-bold text-ink-soft">{l.phone}</span>}
                {l.emailSent ? (
                  <span className="rounded-full bg-sand px-2.5 py-0.5 text-[10px] font-extrabold uppercase text-forest">Emailed</span>
                ) : (
                  <span className="rounded-full bg-sand px-2.5 py-0.5 text-[10px] font-extrabold uppercase text-yellow-700">Stored</span>
                )}
                <span className="text-xs font-semibold text-ink-soft">{new Date(l.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </summary>
              <div className="border-t border-ink/10 p-4 text-sm font-semibold text-ink-soft">
                <p><strong className="text-ink">Child age:</strong> {l.childAge ?? '—'}</p>
                <p className="mt-1"><strong className="text-ink">Priorities:</strong> {l.priorities ?? '—'}</p>
                <p className="mt-1"><strong className="text-ink">Schedule:</strong> {l.schedule ?? '—'}</p>
                <p className="mt-1"><strong className="text-ink">Visited others:</strong> {l.visitedOthers ?? '—'}</p>
                {l.message && <p className="mt-1"><strong className="text-ink">Message:</strong> {l.message}</p>}
                {l.resultSummary && <p className="mt-2 rounded-xl bg-paper-raised p-3 text-xs">{l.resultSummary}</p>}
              </div>
            </details>
          ))}
          {data.leads.length === 0 && <p className="card-panel p-6 text-center font-bold text-ink-soft">No leads yet — they will appear here when parents complete the quiz or pre-register.</p>}
        </div>
      </div>

      <div>
        <h3 className="font-display text-xl font-bold text-ink">Contact messages ({data.contacts.length})</h3>
        <div className="mt-3 grid gap-3">
          {data.contacts.map((c) => (
            <div key={c.id} className="card-panel p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-display text-base font-bold text-ink">{c.name}</span>
                <a href={`mailto:${c.email}`} className="text-sm font-bold text-forest hover:underline">{c.email}</a>
                {c.phone && <span className="text-sm font-bold text-ink-soft">{c.phone}</span>}
                <span className="ml-auto text-xs font-semibold text-ink-soft">{new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
              <p className="mt-2 text-sm font-semibold text-ink-soft">{c.message}</p>
            </div>
          ))}
          {data.contacts.length === 0 && <p className="card-panel p-6 text-center font-bold text-ink-soft">No contact messages yet.</p>}
        </div>
      </div>
    </div>
  )
}

/* ============ helpers ============ */
function Loading() {
  return (
    <div className="card-panel flex items-center justify-center gap-3 p-12 text-ink-soft">
      <Loader2 className="h-6 w-6 animate-spin text-rose" aria-hidden />
      <span className="font-bold">Loading…</span>
    </div>
  )
}

function AdminField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-wider text-ink-soft">{label}</span>
      {children}
    </label>
  )
}

const adminInput =
  'h-11 w-full rounded-xl border border-ink/15 bg-paper-raised px-3.5 text-sm font-semibold text-ink outline-none transition-all focus:border-rose focus:bg-white focus:ring-2 focus:ring-rose/20'
