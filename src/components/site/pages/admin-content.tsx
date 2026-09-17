'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Loader2, Upload, Trash2, Plus, ImagePlus, Check } from 'lucide-react'
import {
  DEFAULT_CONTENT,
  mergeContent,
  type EditableContent,
} from '@/data/content-defaults'
import { useContent } from '@/components/site/content-provider'

/* ============ helpers ============ */

const input =
  'h-11 w-full rounded-xl border border-ink/15 bg-paper-raised px-3.5 text-sm font-semibold text-ink outline-none transition-all focus:border-rose focus:bg-white focus:ring-2 focus:ring-rose/20'
const inputArea =
  'w-full rounded-xl border border-ink/15 bg-paper-raised px-3.5 py-2.5 text-sm font-semibold text-ink outline-none transition-all focus:border-rose focus:bg-white focus:ring-2 focus:ring-rose/20 resize-none'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-wider text-ink-soft">{label}</span>
      {children}
    </label>
  )
}

function SectionCard({ title, hint, children, defaultOpen = false }: { title: string; hint?: string; children: React.ReactNode; defaultOpen?: boolean }) {
  return (
    <details open={defaultOpen} className="card-panel overflow-hidden p-0">
      <summary className="flex cursor-pointer list-none flex-wrap items-center gap-3 p-5 [&::-webkit-details-marker]:hidden">
        <h3 className="font-display flex-1 text-lg font-bold text-ink">{title}</h3>
        {hint && <span className="hidden text-xs font-semibold text-ink-soft sm:block">{hint}</span>}
      </summary>
      <div className="border-t border-ink/10 p-5">{children}</div>
    </details>
  )
}

/** Comprime a imagem no cliente (canvas) para caber tranquilo na request. */
async function compressImage(file: File, maxDim = 1600, quality = 0.85): Promise<{ dataUrl: string; w: number; h: number }> {
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height))
  const w = Math.round(bitmap.width * scale)
  const h = Math.round(bitmap.height * scale)
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(bitmap, 0, 0, w, h)
  bitmap.close()
  const dataUrl = canvas.toDataURL('image/jpeg', quality)
  return { dataUrl, w, h }
}

function guessRatio(w: number, h: number): 'portrait' | 'landscape' | 'square' | 'wide' {
  const r = w / h
  if (r >= 1.9) return 'wide'
  if (r > 1.2) return 'landscape'
  if (r < 0.83) return 'portrait'
  return 'square'
}

/* ============ image slot ============ */
function ImageSlot({
  label,
  value,
  onUploaded,
}: {
  label: string
  value: string
  onUploaded: (ref: string) => void
}) {
  const { resolveImage } = useContent()
  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const resolved = resolveImage(value)

  const upload = async (file: File) => {
    setBusy(true)
    setError('')
    try {
      const { dataUrl } = await compressImage(file)
      const key = `img:${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imgKey: key, imgValue: dataUrl }),
      })
      if (!res.ok) throw new Error()
      onUploaded(`ref:${key}`)
    } catch {
      setError('Upload failed — try a smaller image.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-wider text-ink-soft">{label}</span>
      <div className="flex items-center gap-3">
        <span className="relative block h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-ink/10 bg-sand">
          {resolved ? <Image src={resolved} alt="" fill sizes="96px" className="object-cover" unoptimized={resolved.startsWith('/api/img/')} /> : null}
        </span>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) upload(f)
            e.target.value = ''
          }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="inline-flex min-h-[40px] items-center gap-2 rounded-full bg-sand px-4 text-xs font-extrabold text-forest transition-transform active:scale-95 disabled:opacity-50"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />} Replace image
        </button>
      </div>
      {error && <p className="mt-1 text-xs font-bold text-red-500">{error}</p>}
    </div>
  )
}

/* ============ main tab ============ */
export function ContentTab() {
  const [content, setContent] = useState<EditableContent | null>(null)
  const [saving, setSaving] = useState<string | null>(null)
  const [savedFlash, setSavedFlash] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((d) => setContent(mergeContent(DEFAULT_CONTENT, d?.content ?? null)))
      .catch(() => setContent(mergeContent(DEFAULT_CONTENT, null)))
  }, [])

  const save = useCallback(async (label: string) => {
    if (!content) return
    setSaving(label)
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteContent: content }),
      })
      if (!res.ok) throw new Error()
      setSavedFlash(label)
      setTimeout(() => setSavedFlash(null), 2500)
    } catch {
      alert('Could not save. Please try again.')
    } finally {
      setSaving(null)
    }
  }, [content])

  if (!content) {
    return (
      <div className="card-panel flex items-center justify-center gap-3 p-12 text-ink-soft">
        <Loader2 className="h-6 w-6 animate-spin text-rose" aria-hidden />
        <span className="font-bold">Loading content…</span>
      </div>
    )
  }

  const set = <K extends keyof EditableContent>(key: K, value: EditableContent[K]) =>
    setContent({ ...content, [key]: value })

  const SaveBar = ({ label }: { label: string }) => (
    <div className="mt-4 flex items-center justify-end gap-3">
      {savedFlash === label && (
        <span className="inline-flex items-center gap-1 font-extrabold text-forest">
          <Check className="h-4 w-4" /> Saved!
        </span>
      )}
      <button
        onClick={() => save(label)}
        disabled={saving !== null}
        className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-rose px-6 text-sm font-extrabold text-white shadow-panel disabled:opacity-50 active:scale-95"
      >
        {saving === label ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Save {label}
      </button>
    </div>
  )

  return (
    <div className="grid gap-4">
      <p className="rounded-2xl bg-sand p-4 text-sm font-semibold leading-relaxed text-forest">
        Edit the texts and images of the site. Changes go live after each section&apos;s <strong>Save</strong>.
        Uploaded images are optimized automatically and stored in the database.
      </p>

      {/* ── Marca & Contato ── */}
      <SectionCard title="Brand & Contact" hint="Phone, email and address used across the site" defaultOpen>
        <div className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Site name">
              <input value={content.brand.name} onChange={(e) => set('brand', { ...content.brand, name: e.target.value })} className={input} />
            </Field>
            <Field label="Short name">
              <input value={content.brand.shortName} onChange={(e) => set('brand', { ...content.brand, shortName: e.target.value })} className={input} />
            </Field>
          </div>
          <Field label="Tagline">
            <input value={content.brand.tagline} onChange={(e) => set('brand', { ...content.brand, tagline: e.target.value })} className={input} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Phone">
              <input value={content.contact.phone} onChange={(e) => set('contact', { ...content.contact, phone: e.target.value })} className={input} />
            </Field>
            <Field label="Email">
              <input type="email" value={content.contact.email} onChange={(e) => set('contact', { ...content.contact, email: e.target.value })} className={input} />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Street address">
              <input value={content.contact.addressStreet} onChange={(e) => set('contact', { ...content.contact, addressStreet: e.target.value })} className={input} />
            </Field>
            <Field label="City / State / ZIP">
              <input value={content.contact.addressCity} onChange={(e) => set('contact', { ...content.contact, addressCity: e.target.value })} className={input} />
            </Field>
          </div>
        </div>
        <SaveBar label="Brand & Contact" />
      </SectionCard>

      {/* ── Hero ── */}
      <SectionCard title="Hero (top of the home page)" hint="Badge, headline, subtitle and photos">
        <div className="grid gap-4">
          <Field label="Badge">
            <input value={content.hero.badge} onChange={(e) => set('hero', { ...content.hero, badge: e.target.value })} className={input} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Headline — line 1">
              <input value={content.hero.titleLine1} onChange={(e) => set('hero', { ...content.hero, titleLine1: e.target.value })} className={input} />
            </Field>
            <Field label="Headline — line 2">
              <input value={content.hero.titleLine2} onChange={(e) => set('hero', { ...content.hero, titleLine2: e.target.value })} className={input} />
            </Field>
          </div>
          <Field label="Subtitle">
            <textarea rows={3} value={content.hero.subtitle} onChange={(e) => set('hero', { ...content.hero, subtitle: e.target.value })} className={inputArea} />
          </Field>
          <Field label="Photo sticker caption">
            <input value={content.hero.sticker} onChange={(e) => set('hero', { ...content.hero, sticker: e.target.value })} className={input} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <ImageSlot label="Main photo (arch)" value={content.hero.photoMain} onUploaded={(ref) => set('hero', { ...content.hero, photoMain: ref })} />
            <ImageSlot label="Round photo" value={content.hero.photoCircle} onUploaded={(ref) => set('hero', { ...content.hero, photoCircle: ref })} />
          </div>
        </div>
        <SaveBar label="Hero" />
      </SectionCard>

      {/* ── Conceitos ── */}
      <SectionCard title="Learn · Play · Grow · Shine" hint="The 4 concept cards">
        <div className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Heading">
              <input value={content.concepts.heading} onChange={(e) => set('concepts', { ...content.concepts, heading: e.target.value })} className={input} />
            </Field>
            <Field label="Highlighted word">
              <input value={content.concepts.headingAccent} onChange={(e) => set('concepts', { ...content.concepts, headingAccent: e.target.value })} className={input} />
            </Field>
          </div>
          {content.concepts.items.map((item, i) => (
            <div key={i} className="grid gap-3 rounded-2xl border border-ink/10 p-4">
              <div className="grid gap-3 sm:grid-cols-[1fr_1fr]">
                <Field label={`Title ${i + 1}`}>
                  <input
                    value={item.title}
                    onChange={(e) => {
                      const items = [...content.concepts.items]
                      items[i] = { ...items[i], title: e.target.value }
                      set('concepts', { ...content.concepts, items })
                    }}
                    className={input}
                  />
                </Field>
                <Field label={`Text ${i + 1}`}>
                  <input
                    value={item.text}
                    onChange={(e) => {
                      const items = [...content.concepts.items]
                      items[i] = { ...items[i], text: e.target.value }
                      set('concepts', { ...content.concepts, items })
                    }}
                    className={input}
                  />
                </Field>
              </div>
              <ImageSlot
                label={`Photo ${i + 1}`}
                value={item.photo}
                onUploaded={(ref) => {
                  const items = [...content.concepts.items]
                  items[i] = { ...items[i], photo: ref }
                  set('concepts', { ...content.concepts, items })
                }}
              />
            </div>
          ))}
        </div>
        <SaveBar label="Concepts" />
      </SectionCard>

      {/* ── Welcome ── */}
      <SectionCard title="Welcome section" hint="Texts, checklist and photos">
        <div className="grid gap-4">
          <Field label="Eyebrow">
            <input value={content.welcome.eyebrow} onChange={(e) => set('welcome', { ...content.welcome, eyebrow: e.target.value })} className={input} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Heading">
              <input value={content.welcome.heading1} onChange={(e) => set('welcome', { ...content.welcome, heading1: e.target.value })} className={input} />
            </Field>
            <Field label="Highlighted part">
              <input value={content.welcome.headingAccent} onChange={(e) => set('welcome', { ...content.welcome, headingAccent: e.target.value })} className={input} />
            </Field>
          </div>
          <Field label="Paragraph">
            <textarea rows={3} value={content.welcome.text} onChange={(e) => set('welcome', { ...content.welcome, text: e.target.value })} className={inputArea} />
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            {content.welcome.points.map((p, i) => (
              <Field key={i} label={`Checklist ${i + 1}`}>
                <input
                  value={p}
                  onChange={(e) => {
                    const points = [...content.welcome.points]
                    points[i] = e.target.value
                    set('welcome', { ...content.welcome, points })
                  }}
                  className={input}
                />
              </Field>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <ImageSlot label="Photo 1 (tall)" value={content.welcome.photo1} onUploaded={(ref) => set('welcome', { ...content.welcome, photo1: ref })} />
            <ImageSlot label="Photo 2 (square)" value={content.welcome.photo2} onUploaded={(ref) => set('welcome', { ...content.welcome, photo2: ref })} />
          </div>
        </div>
        <SaveBar label="Welcome" />
      </SectionCard>

      {/* ── Programas ── */}
      <SectionCard title="Programs" hint="Cards on the home page and the Programs page">
        <div className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Eyebrow">
              <input value={content.programs.eyebrow} onChange={(e) => set('programs', { ...content.programs, eyebrow: e.target.value })} className={input} />
            </Field>
            <Field label="Heading highlight">
              <input value={content.programs.headingAccent} onChange={(e) => set('programs', { ...content.programs, headingAccent: e.target.value })} className={input} />
            </Field>
          </div>
          <Field label="Heading">
            <input value={content.programs.heading1} onChange={(e) => set('programs', { ...content.programs, heading1: e.target.value })} className={input} />
          </Field>
          {content.programs.items.map((item, i) => (
            <div key={i} className="grid gap-3 rounded-2xl border border-ink/10 p-4">
              <Field label={`Program ${i + 1} — name`}>
                <input
                  value={item.name}
                  onChange={(e) => {
                    const items = [...content.programs.items]
                    items[i] = { ...items[i], name: e.target.value }
                    set('programs', { ...content.programs, items })
                  }}
                  className={input}
                />
              </Field>
              <Field label="Short text (small cards)">
                <textarea rows={2} value={item.short} onChange={(e) => {
                  const items = [...content.programs.items]
                  items[i] = { ...items[i], short: e.target.value }
                  set('programs', { ...content.programs, items })
                }} className={inputArea} />
              </Field>
              <Field label="Long text (big card + page)">
                <textarea rows={3} value={item.long} onChange={(e) => {
                  const items = [...content.programs.items]
                  items[i] = { ...items[i], long: e.target.value }
                  set('programs', { ...content.programs, items })
                }} className={inputArea} />
              </Field>
              <ImageSlot
                label="Photo"
                value={item.image}
                onUploaded={(ref) => {
                  const items = [...content.programs.items]
                  items[i] = { ...items[i], image: ref }
                  set('programs', { ...content.programs, items })
                }}
              />
            </div>
          ))}
        </div>
        <SaveBar label="Programs" />
      </SectionCard>

      {/* ── Galeria ── */}
      <SectionCard title="Gallery" hint="Replace, add or remove photos of the wall">
        <div className="grid gap-5">
          {content.gallery.map((cat, ci) => (
            <div key={ci} className="grid gap-3 rounded-2xl border border-ink/10 p-4">
              <Field label={`Category ${ci + 1} name`}>
                <input
                  value={cat.name}
                  onChange={(e) => {
                    const gallery = [...content.gallery]
                    gallery[ci] = { ...gallery[ci], name: e.target.value }
                    set('gallery', gallery)
                  }}
                  className={input}
                />
              </Field>
              <div className="grid gap-2">
                {cat.images.map((img, ii) => (
                  <div key={ii} className="flex flex-wrap items-center gap-2 rounded-xl bg-sand/60 p-2">
                    <span className="relative block h-12 w-16 shrink-0 overflow-hidden rounded-lg border border-ink/10 bg-white">
                      <GalleryThumb src={img.src} alt="" />
                    </span>
                    <input
                      value={img.alt}
                      aria-label={`Alt text for image ${ii + 1} of ${cat.name}`}
                      onChange={(e) => {
                        const gallery = [...content.gallery]
                        gallery[ci].images[ii] = { ...img, alt: e.target.value }
                        set('gallery', gallery)
                      }}
                      className={`${input} h-10 min-w-[160px] flex-1`}
                    />
                    <ReplaceGalleryImage
                      onDone={(ref, ratio) => {
                        const gallery = [...content.gallery]
                        gallery[ci].images[ii] = { ...img, src: ref, ratio }
                        set('gallery', gallery)
                      }}
                    />
                    <button
                      type="button"
                      aria-label={`Remove image ${ii + 1}`}
                      onClick={() => {
                        if (!confirm('Remove this image from the gallery?')) return
                        const gallery = [...content.gallery]
                        gallery[ci].images = gallery[ci].images.filter((_, x) => x !== ii)
                        set('gallery', gallery)
                      }}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-500 transition-transform active:scale-90"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <AddGalleryImage
                onDone={(ref, ratio) => {
                  const gallery = [...content.gallery]
                  gallery[ci].images = [...gallery[ci].images, { src: ref, alt: 'New photo', ratio }]
                  set('gallery', gallery)
                }}
              />
            </div>
          ))}
        </div>
        <SaveBar label="Gallery" />
      </SectionCard>

      {/* ── Depoimento ── */}
      <SectionCard title="Testimonial" hint="The quote shown on the home page">
        <div className="grid gap-4">
          <Field label="Quote">
            <textarea rows={5} value={content.testimonial.quote} onChange={(e) => set('testimonial', { ...content.testimonial, quote: e.target.value })} className={inputArea} />
          </Field>
          <Field label="Author">
            <input value={content.testimonial.author} onChange={(e) => set('testimonial', { ...content.testimonial, author: e.target.value })} className={input} />
          </Field>
        </div>
        <SaveBar label="Testimonial" />
      </SectionCard>

      {/* ── FAQ ── */}
      <SectionCard title="FAQ" hint="Questions shown on the home page">
        <div className="grid gap-3">
          {content.faqs.map((f, i) => (
            <div key={i} className="grid gap-2 rounded-2xl border border-ink/10 p-3">
              <Field label={`Question ${i + 1}`}>
                <input
                  value={f.q}
                  onChange={(e) => {
                    const faqs = [...content.faqs]
                    faqs[i] = { ...faqs[i], q: e.target.value }
                    set('faqs', faqs)
                  }}
                  className={input}
                />
              </Field>
              <Field label="Answer">
                <textarea
                  rows={2}
                  value={f.a}
                  onChange={(e) => {
                    const faqs = [...content.faqs]
                    faqs[i] = { ...faqs[i], a: e.target.value }
                    set('faqs', faqs)
                  }}
                  className={inputArea}
                />
              </Field>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    if (!confirm('Remove this question?')) return
                    set('faqs', content.faqs.filter((_, x) => x !== i))
                  }}
                  className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full bg-red-50 px-3 text-xs font-extrabold text-red-500"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Remove
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => set('faqs', [...content.faqs, { q: 'New question', a: 'Answer here.' }])}
            className="inline-flex min-h-[44px] w-fit items-center gap-2 rounded-full bg-sand px-5 text-sm font-extrabold text-forest"
          >
            <Plus className="h-4 w-4" /> Add question
          </button>
        </div>
        <SaveBar label="FAQ" />
      </SectionCard>

      {/* ── CTA final ── */}
      <SectionCard title="Final call-to-action" hint="Big gradient card at the end">
        <div className="grid gap-4">
          <Field label="Eyebrow">
            <input value={content.finalCta.eyebrow} onChange={(e) => set('finalCta', { ...content.finalCta, eyebrow: e.target.value })} className={input} />
          </Field>
          <Field label="Heading">
            <textarea rows={2} value={content.finalCta.heading} onChange={(e) => set('finalCta', { ...content.finalCta, heading: e.target.value })} className={inputArea} />
          </Field>
        </div>
        <SaveBar label="Final CTA" />
      </SectionCard>
    </div>
  )
}

/* ============ galeria: thumbs / replace / add ============ */
function GalleryThumb({ src, alt }: { src: string; alt: string }) {
  const { resolveImage } = useContent()
  const resolved = resolveImage(src)
  return <Image src={resolved} alt={alt} fill sizes="64px" className="object-cover" unoptimized={resolved.startsWith('/api/img/')} />
}

function ReplaceGalleryImage({ onDone }: { onDone: (ref: string, ratio: 'portrait' | 'landscape' | 'square' | 'wide') => void }) {
  const ref = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const upload = async (file: File) => {
    setBusy(true)
    try {
      const { dataUrl, w, h } = await compressImage(file)
      const key = `img:${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imgKey: key, imgValue: dataUrl }),
      })
      if (!res.ok) throw new Error()
      onDone(`ref:${key}`, guessRatio(w, h))
    } catch {
      alert('Upload failed — try a smaller image.')
    } finally {
      setBusy(false)
    }
  }
  return (
    <>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) upload(f)
          e.target.value = ''
        }}
      />
      <button
        type="button"
        onClick={() => ref.current?.click()}
        disabled={busy}
        aria-label="Replace this image"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-forest shadow-panel transition-transform active:scale-90"
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
      </button>
    </>
  )
}

function AddGalleryImage({ onDone }: { onDone: (ref: string, ratio: 'portrait' | 'landscape' | 'square' | 'wide') => void }) {
  const ref = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const upload = async (file: File) => {
    setBusy(true)
    try {
      const { dataUrl, w, h } = await compressImage(file)
      const key = `img:${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imgKey: key, imgValue: dataUrl }),
      })
      if (!res.ok) throw new Error()
      onDone(`ref:${key}`, guessRatio(w, h))
    } catch {
      alert('Upload failed — try a smaller image.')
    } finally {
      setBusy(false)
    }
  }
  return (
    <>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) upload(f)
          e.target.value = ''
        }}
      />
      <button
        type="button"
        onClick={() => ref.current?.click()}
        disabled={busy}
        className="inline-flex min-h-[40px] w-fit items-center gap-2 rounded-full bg-sand px-4 text-xs font-extrabold text-forest"
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />} Add photo
      </button>
    </>
  )
}
