import { NextRequest, NextResponse } from 'next/server'
import { login } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const password = String(body?.password || '')
    const ok = await login(password)
    if (!ok) {
      return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 })
    }
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('login error', e)
    return NextResponse.json({ error: 'Login failed.' }, { status: 500 })
  }
}
