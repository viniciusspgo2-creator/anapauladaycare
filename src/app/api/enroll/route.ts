import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { sendMail, leadEmailHtml } from '@/lib/mail'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const name = String(body?.name || '').trim().slice(0, 120)
    const email = String(body?.email || '').trim().slice(0, 200)
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid name and email.' }, { status: 400 })
    }

    const lead = await db.lead.create({
      data: {
        name,
        email,
        phone: body?.phone ? String(body.phone).slice(0, 40) : null,
        childAge: body?.childAge ? String(body.childAge).slice(0, 80) : null,
        schedule: body?.schedule ? String(body.schedule).slice(0, 120) : null,
        message: body?.message ? String(body.message).slice(0, 2000) : null,
        source: 'enroll',
      },
    })

    const mail = await sendMail({
      subject: `📝 New Enrollment Pre-Registration: ${name}`,
      html: leadEmailHtml({ source: 'enroll', name, email, ...body }),
    })
    await db.lead.update({ where: { id: lead.id }, data: { emailSent: mail.sent } }).catch(() => {})

    return NextResponse.json({ ok: true, leadId: lead.id })
  } catch (e) {
    console.error('enroll api error', e)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
