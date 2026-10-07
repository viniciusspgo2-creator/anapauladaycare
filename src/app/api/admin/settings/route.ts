import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated, hashPassword, ensureAdminPassword } from '@/lib/auth'
import { getSetting, setSetting, SETTING_KEYS } from '@/lib/settings'
import { db } from '@/lib/db'

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const out: Record<string, string | null> = {}
  for (const k of [
    SETTING_KEYS.GEMINI_API_KEY,
    SETTING_KEYS.GEMINI_MODEL,
    SETTING_KEYS.NOTIFY_EMAIL,
    SETTING_KEYS.SEO_HOME,
    SETTING_KEYS.SEO_ABOUT,
    SETTING_KEYS.SEO_PROGRAMS,
    SETTING_KEYS.SEO_GALLERY,
    SETTING_KEYS.SEO_BLOG,
    SETTING_KEYS.SEO_CONTACT,
    SETTING_KEYS.SEO_QUIZ,
    SETTING_KEYS.SEO_SAFETY,
    SETTING_KEYS.SEO_ENROLL,
  ]) {
    out[k] = await getSetting(k)
  }
  return NextResponse.json({ settings: out })
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const body = await req.json()

    // Gemini / notify config
    if (body?.geminiApiKey !== undefined) await setSetting(SETTING_KEYS.GEMINI_API_KEY, String(body.geminiApiKey).trim())
    if (body?.geminiModel !== undefined) await setSetting(SETTING_KEYS.GEMINI_MODEL, String(body.geminiModel).trim() || 'gemini-2.0-flash')
    if (body?.notifyEmail !== undefined) await setSetting(SETTING_KEYS.NOTIFY_EMAIL, String(body.notifyEmail).trim())

    // Conteúdo do site (textos) + imagens enviadas pelo admin
    if (body?.siteContent !== undefined) {
      await setSetting('site_content', JSON.stringify(body.siteContent))
    }
    // Galeria: salva SÓ a galeria, preservando os demais textos/imagens já salvos
    if (body?.gallery !== undefined) {
      const g = body.gallery
      const valid =
        Array.isArray(g) &&
        g.every(
          (c: unknown) =>
            c && typeof c === 'object' &&
            typeof (c as { name?: unknown }).name === 'string' &&
            Array.isArray((c as { images?: unknown }).images),
        )
      if (!valid) return NextResponse.json({ error: 'Invalid gallery payload.' }, { status: 400 })
      let current: Record<string, unknown> = {}
      try {
        const raw = await getSetting('site_content')
        if (raw) current = JSON.parse(raw)
      } catch {
        current = {}
      }
      current.gallery = g
      await setSetting('site_content', JSON.stringify(current))
    }
    if (body?.imgKey && typeof body.imgKey === 'string' && body.imgKey.startsWith('img:')) {
      const value = String(body.imgValue ?? '')
      if (!value.startsWith('data:image/')) {
        return NextResponse.json({ error: 'Invalid image payload.' }, { status: 400 })
      }
      await setSetting(body.imgKey, value)
    }
    if (body?.deleteImgKey && typeof body.deleteImgKey === 'string' && body.deleteImgKey.startsWith('img:')) {
      await db.setting.deleteMany({ where: { key: body.deleteImgKey } })
    }

    // SEO per page
    const seoMap: Record<string, string> = {
      seoHome: SETTING_KEYS.SEO_HOME,
      seoAbout: SETTING_KEYS.SEO_ABOUT,
      seoPrograms: SETTING_KEYS.SEO_PROGRAMS,
      seoGallery: SETTING_KEYS.SEO_GALLERY,
      seoBlog: SETTING_KEYS.SEO_BLOG,
      seoContact: SETTING_KEYS.SEO_CONTACT,
      seoQuiz: SETTING_KEYS.SEO_QUIZ,
      seoSafety: SETTING_KEYS.SEO_SAFETY,
      seoEnroll: SETTING_KEYS.SEO_ENROLL,
    }
    for (const [field, key] of Object.entries(seoMap)) {
      const v = body?.[field]
      if (v && typeof v === 'object') {
        await setSetting(key, JSON.stringify({ title: String(v.title || ''), description: String(v.description || ''), keywords: String(v.keywords || '') }))
      }
    }

    // Password change
    if (body?.newPassword) {
      await ensureAdminPassword()
      await setSetting('admin_password_hash', hashPassword(String(body.newPassword)))
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('settings update error', e)
    return NextResponse.json({ error: 'Could not save settings.' }, { status: 500 })
  }
}
