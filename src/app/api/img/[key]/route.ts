import { NextRequest, NextResponse } from 'next/server'
import { getSetting } from '@/lib/settings'

export const dynamic = 'force-dynamic'

/** Serve imagens enviadas pelo admin (Setting "img:<id>" com data URL).
 *  Cache imutável: o conteúdo de cada key nunca muda (novos uploads = nova key). */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ key: string }> },
) {
  const { key } = await params
  if (!key.startsWith('img:')) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  try {
    const dataUrl = await getSetting(key)
    if (!dataUrl || !dataUrl.startsWith('data:image/')) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    const match = /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/.exec(dataUrl)
    if (!match) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    const [, mime, b64] = match
    const bytes = Buffer.from(b64, 'base64')
    return new NextResponse(new Uint8Array(bytes), {
      status: 200,
      headers: {
        'Content-Type': mime,
        'Content-Length': String(bytes.length),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}
