import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { sendMail, leadEmailHtml } from '@/lib/mail'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const name = String(body?.name || '').trim().slice(0, 120)
    const email = String(body?.email || '').trim().slice(0, 200)
    const message = String(body?.message || '').trim().slice(0, 3000)
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message) {
      return NextResponse.json({ error: 'Please fill in your name, a valid email and a message.' }, { status: 400 })
    }

    await db.contactMessage.create({
      data: {
        name,
        email,
        phone: body?.phone ? String(body.phone).slice(0, 40) : null,
        message,
      },
    })

    const mail = await sendMail({
      subject: `📩 New Contact Message from ${name}`,
      html: leadEmailHtml({ source: 'contact', name, email, phone: body?.phone, message }),
    })

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('contact api error', e)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
