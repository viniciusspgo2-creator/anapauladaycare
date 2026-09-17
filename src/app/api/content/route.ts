import { NextResponse } from 'next/server'
import { getSetting } from '@/lib/settings'
import type { EditableContent } from '@/data/content-defaults'

export const dynamic = 'force-dynamic'

/** Público: conteúdo editável do site (mesclado com os defaults no cliente). */
export async function GET() {
  try {
    const raw = await getSetting('site_content')
    if (!raw) return NextResponse.json({ content: null })
    const content = JSON.parse(raw) as Partial<EditableContent>
    return NextResponse.json({ content })
  } catch {
    return NextResponse.json({ content: null })
  }
}
