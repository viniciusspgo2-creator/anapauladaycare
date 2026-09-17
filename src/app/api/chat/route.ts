import { NextRequest, NextResponse } from 'next/server'
import { askGemini } from '@/lib/gemini'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const message = String(body?.message || '').slice(0, 2000).trim()
    const lang = body?.lang === 'es' || body?.lang === 'pt' ? (body.lang as 'es' | 'pt') : 'en'
    const history = Array.isArray(body?.history)
      ? body.history.slice(-8).map((h: { role?: string; text?: string }) => ({
          role: h.role === 'model' ? ('model' as const) : ('user' as const),
          text: String(h.text || '').slice(0, 1500),
        }))
      : []

    if (!message) {
      return NextResponse.json({ error: 'Mensagem vazia' }, { status: 400 })
    }

    const result = await askGemini(message, history, lang)
    return NextResponse.json({ reply: result.text, source: result.source })
  } catch (e) {
    console.error('chat api error', e)
    return NextResponse.json({ error: 'Erro ao processar mensagem' }, { status: 500 })
  }
}
