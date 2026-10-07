'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import {
  Loader2, Trash2, ImagePlus, Check, ArrowLeft, ArrowRight, UploadCloud, AlertCircle, Plus,
} from 'lucide-react'
import { DEFAULT_CONTENT, mergeContent, type EditableContent } from '@/data/content-defaults'
import { useContent } from '@/components/site/content-provider'

type Ratio = 'portrait' | 'landscape' | 'square' | 'wide'
type Cat = EditableContent['gallery'][number]

const input =
  'h-11 w-full rounded-xl border border-ink/15 bg-paper-raised px-3.5 text-sm font-semibold text-ink outline-none transition-all focus:border-rose focus:bg-white focus:ring-2 focus:ring-rose/20'

/** Comprime no navegador (canvas) para a foto caber na request e carregar rápido no site. */
async function compressImage(file: File, maxDim = 1600, quality = 0.82) {
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height))
  const w = Math.round(bitmap.width * scale)
  const h = Math.round(bitmap.height * scale)
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  canvas.getContext('2d')!.drawImage(bitmap, 0, 0, w, h)
  bitmap.close()
  return { dataUrl: canvas.toDataURL('image/jpeg', quality), w, h }
}

function guessRatio(w: number, h: number): Ratio {
  const r = w / h
  if (r >= 1.9) return 'wide'
  if (r > 1.2) return 'landscape'
  if (r < 0.83) return 'portrait'
  return 'square'
}

async function uploadFile(file: File): Promise<{ ref: string; ratio: Ratio }> {
  const { dataUrl, w, h } = await compressImage(file)
  const key = `img:${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`
  const res = await fetch('/api/admin/settings', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imgKey: key, imgValue: dataUrl }),
  })
  if (!res.ok) throw new Error('upload')
  return { ref: `ref:${key}`, ratio: guessRatio(w, h) }
}

function Thumb({ src, alt }: { src: string; alt: string }) {
  const { resolveImage } = useContent()
  const resolved = resolveImage(src)
  return (
    <Image
      src={resolved}
      alt={alt}
      fill
      sizes="(max-width: 640px) 50vw, 240px"
      className="object-cover"
      unoptimized={resolved.startsWith('/api/img/')}
    />
  )
}

export function GalleryTab() {
  const [gallery, setGallery] = useState<Cat[] | null>(null)
  const [dirty, setDirty] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [targetCat, setTargetCat] = useState(0)
  const [newCatName, setNewCatName] = useState('')
  const [uploading, setUploading] = useState<{ total: number; done: number } | null>(null)
  const [failed, setFailed] = useState<string[]>([])
  const [dragging, setDragging] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  // imagens enviadas (ref:img:*) que foram removidas/trocadas — apagadas do banco após salvar
  const removedRefs = useRef<Set<string>>(new Set())

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((d) => setGallery(mergeContent(DEFAULT_CONTENT, d?.content ?? null).gallery))
      .catch(() => setGallery(DEFAULT_CONTENT.gallery))
  }, [])

  const total = useMemo(() => gallery?.reduce((n, c) => n + c.images.length, 0) ?? 0, [gallery])

  const update = useCallback((fn: (g: Cat[]) => Cat[]) => {
    setGallery((g) => (g ? fn(g.map((c) => ({ ...c, images: [...c.images] }))) : g))
    setDirty(true)
    setSaved(false)
  }, [])

  const markRemoved = (src: string) => {
    if (src.startsWith('ref:img:')) removedRefs.current.add(src.slice(4))
  }

  const addFiles = async (files: FileList | File[]) => {
    const list = Array.from(files).filter((f) => f.type.startsWith('image/'))
    if (!list.length || !gallery) return
    setFailed([])
    setUploading({ total: list.length, done: 0 })
    const bad: string[] = []
    for (const file of list) {
      try {
        const { ref, ratio } = await uploadFile(file)
        const alt = file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').trim() || 'New photo'
        update((g) => {
          const idx = Math.min(targetCat, g.length - 1)
          g[idx].images.push({ src: ref, alt, ratio })
          return g
        })
      } catch {
        bad.push(file.name)
      }
      setUploading((u) => (u ? { ...u, done: u.done + 1 } : u))
    }
    setUploading(null)
    setFailed(bad)
  }

  const replaceImage = async (ci: number, ii: number, file: File) => {
    try {
      const { ref, ratio } = await uploadFile(file)
      update((g) => {
        markRemoved(g[ci].images[ii].src)
        g[ci].images[ii] = { ...g[ci].images[ii], src: ref, ratio }
        return g
      })
    } catch {
      setFailed([file.name])
    }
  }

  const save = async () => {
    if (!gallery) return
    setSaving(true)
    setSaveError('')
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gallery }),
      })
      if (!res.ok) throw new Error()
      // limpa do banco as fotos removidas (best-effort)
      for (const key of Array.from(removedRefs.current)) {
        await fetch('/api/admin/settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ deleteImgKey: key }),
        }).catch(() => {})
      }
      removedRefs.current.clear()
      setDirty(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {
      setSaveError('Could not save. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (!gallery) {
    return (
      <div className="card-panel flex items-center justify-center gap-3 p-12 text-ink-soft">
        <Loader2 className="h-6 w-6 animate-spin text-rose" aria-hidden />
        <span className="font-bold">Loading gallery…</span>
      </div>
    )
  }

  return (
    <div className="grid gap-5 pb-24">
      {/* ── INSERIR FOTOS (destaque) ── */}
      <section className="card-panel p-5 sm:p-6" aria-label="Add photos to the gallery">
        <h2 className="font-display text-xl font-bold text-ink">Add photos to the Gallery page</h2>
        <p className="mt-1 text-sm font-semibold text-ink-soft">
          Pick the category, then choose or drag in as many photos as you want. They appear on the
          public Gallery page after you click <strong>Save gallery</strong>.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-[minmax(0,260px)_1fr] sm:items-end">
          <label className="block">
            <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-wider text-ink-soft">
              Category
            </span>
            <select
              value={targetCat}
              onChange={(e) => setTargetCat(Number(e.target.value))}
              className={input}
            >
              {gallery.map((c, i) => (
                <option key={i} value={i}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <div className="flex gap-2">
            <input
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              placeholder="Or create a new category…"
              className={input}
              aria-label="New category name"
            />
            <button
              type="button"
              disabled={!newCatName.trim()}
              onClick={() => {
                const name = newCatName.trim()
                update((g) => [...g, { name, images: [] }])
                setTargetCat(gallery.length)
                setNewCatName('')
              }}
              className="inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-full bg-sand px-4 text-xs font-extrabold text-forest disabled:opacity-40"
            >
              <Plus className="h-4 w-4" /> Create
            </button>
          </div>
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) addFiles(e.target.files)
            e.target.value = ''
          }}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragging(false)
            addFiles(e.dataTransfer.files)
          }}
          disabled={uploading !== null}
          className={`mt-4 flex w-full flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
            dragging ? 'border-rose bg-rose/10' : 'border-ink/20 bg-sand/50 hover:border-rose hover:bg-rose/5'
          } disabled:opacity-60`}
        >
          {uploading ? (
            <>
              <Loader2 className="h-9 w-9 animate-spin text-rose" aria-hidden />
              <span className="font-extrabold text-ink">
                Uploading {uploading.done} / {uploading.total}…
              </span>
            </>
          ) : (
            <>
              <UploadCloud className="h-9 w-9 text-rose" aria-hidden />
              <span className="text-base font-extrabold text-ink">Click to choose photos, or drag them here</span>
              <span className="text-xs font-semibold text-ink-soft">
                JPG, PNG, WEBP · several at once · optimized automatically
              </span>
            </>
          )}
        </button>

        {failed.length > 0 && (
          <p className="mt-3 flex items-start gap-2 text-sm font-bold text-red-500">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            Could not upload: {failed.join(', ')}. Try again or use a smaller JPG/PNG.
          </p>
        )}
      </section>

      {/* ── FOTOS ATUAIS ── */}
      <p className="text-sm font-extrabold text-ink-soft">{total} photos on the Gallery page</p>

      {gallery.map((cat, ci) => (
        <section key={ci} className="card-panel p-5" aria-label={cat.name}>
          <div className="flex flex-wrap items-center gap-3">
            <input
              value={cat.name}
              aria-label={`Category ${ci + 1} name`}
              onChange={(e) =>
                update((g) => {
                  g[ci].name = e.target.value
                  return g
                })
              }
              className={`${input} max-w-xs font-display text-base font-bold`}
            />
            <span className="text-xs font-bold text-ink-soft">{cat.images.length} photos</span>
            {cat.images.length === 0 && (
              <button
                type="button"
                onClick={() => {
                  if (!confirm('Remove this empty category?')) return
                  update((g) => g.filter((_, x) => x !== ci))
                  setTargetCat(0)
                }}
                className="ml-auto text-xs font-extrabold text-red-500"
              >
                Delete empty category
              </button>
            )}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {cat.images.map((img, ii) => (
              <PhotoCard
                key={img.src + ii}
                img={img}
                categories={gallery.map((c) => c.name)}
                catIndex={ci}
                canLeft={ii > 0}
                canRight={ii < cat.images.length - 1}
                onAlt={(alt) =>
                  update((g) => {
                    g[ci].images[ii].alt = alt
                    return g
                  })
                }
                onMove={(dir) =>
                  update((g) => {
                    const arr = g[ci].images
                    const j = ii + dir
                    ;[arr[ii], arr[j]] = [arr[j], arr[ii]]
                    return g
                  })
                }
                onChangeCat={(to) =>
                  update((g) => {
                    const [item] = g[ci].images.splice(ii, 1)
                    g[to].images.push(item)
                    return g
                  })
                }
                onReplace={(file) => replaceImage(ci, ii, file)}
                onRemove={() => {
                  if (!confirm('Remove this photo from the gallery?')) return
                  update((g) => {
                    markRemoved(g[ci].images[ii].src)
                    g[ci].images.splice(ii, 1)
                    return g
                  })
                }}
              />
            ))}
            {cat.images.length === 0 && (
              <p className="col-span-full text-sm font-semibold text-ink-soft">
                No photos here yet — select this category above and add some.
              </p>
            )}
          </div>
        </section>
      ))}

      {/* ── BARRA DE SALVAR ── */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-white/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-end gap-3">
          {saveError && <span className="text-sm font-bold text-red-500">{saveError}</span>}
          {saved && (
            <span className="inline-flex items-center gap-1 font-extrabold text-forest">
              <Check className="h-4 w-4" /> Saved! Live on the Gallery page.
            </span>
          )}
          {dirty && !saved && <span className="text-xs font-extrabold text-orange-500">Unsaved changes</span>}
          <button
            onClick={save}
            disabled={saving || !dirty || uploading !== null}
            className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-rose px-7 text-sm font-extrabold text-white shadow-panel transition-transform active:scale-95 disabled:opacity-40"
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" />} Save gallery
          </button>
        </div>
      </div>
    </div>
  )
}

function PhotoCard({
  img, categories, catIndex, canLeft, canRight, onAlt, onMove, onChangeCat, onReplace, onRemove,
}: {
  img: Cat['images'][number]
  categories: string[]
  catIndex: number
  canLeft: boolean
  canRight: boolean
  onAlt: (alt: string) => void
  onMove: (dir: -1 | 1) => void
  onChangeCat: (to: number) => void
  onReplace: (file: File) => Promise<void>
  onRemove: () => void
}) {
  const ref = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const btn =
    'flex h-9 w-9 items-center justify-center rounded-full bg-white text-forest shadow-panel transition-transform active:scale-90 disabled:opacity-30'

  return (
    <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white">
      <div className="relative aspect-[4/3] bg-sand">
        <Thumb src={img.src} alt={img.alt} />
        {busy && (
          <span className="absolute inset-0 flex items-center justify-center bg-white/70">
            <Loader2 className="h-6 w-6 animate-spin text-rose" />
          </span>
        )}
      </div>
      <div className="grid gap-2 p-2.5">
        <input
          value={img.alt}
          onChange={(e) => onAlt(e.target.value)}
          aria-label="Photo description"
          className="h-9 w-full rounded-lg border border-ink/15 bg-paper-raised px-2.5 text-xs font-semibold text-ink outline-none focus:border-rose"
        />
        <select
          value={catIndex}
          onChange={(e) => onChangeCat(Number(e.target.value))}
          aria-label="Move to category"
          className="h-9 w-full rounded-lg border border-ink/15 bg-paper-raised px-2 text-xs font-semibold text-ink outline-none focus:border-rose"
        >
          {categories.map((c, i) => (
            <option key={i} value={i}>
              {c}
            </option>
          ))}
        </select>
        <input
          ref={ref}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={async (e) => {
            const f = e.target.files?.[0]
            e.target.value = ''
            if (!f) return
            setBusy(true)
            await onReplace(f)
            setBusy(false)
          }}
        />
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            <button type="button" className={btn} disabled={!canLeft} onClick={() => onMove(-1)} aria-label="Move earlier">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button type="button" className={btn} disabled={!canRight} onClick={() => onMove(1)} aria-label="Move later">
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="flex gap-1.5">
            <button type="button" className={btn} onClick={() => ref.current?.click()} aria-label="Replace this photo" title="Replace photo">
              <ImagePlus className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onRemove}
              aria-label="Remove this photo"
              title="Remove photo"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-500 transition-transform active:scale-90"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
