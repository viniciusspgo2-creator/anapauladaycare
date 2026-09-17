import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const path = String(body?.path || '/').slice(0, 300)
    const referrer = body?.referrer ? String(body.referrer).slice(0, 500) : null
    const sessionId = body?.sessionId ? String(body.sessionId).slice(0, 64) : null
    await db.pageView.create({ data: { path, referrer, sessionId } })
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('analytics error', e)
    return NextResponse.json({ ok: false }, { status: 200 })
  }
}
