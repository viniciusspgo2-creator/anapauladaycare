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
        childAge: body?.childAge ? String(body.childAge).slice(0, 80) : null,
        priorities: Array.isArray(body?.priorities) ? body.priorities.join(', ').slice(0, 300) : null,
        schedule: body?.schedule ? String(body.schedule).slice(0, 80) : null,
        visitedOthers: body?.visitedOthers ? String(body.visitedOthers).slice(0, 200) : null,
        resultSummary: body?.resultSummary ? String(body.resultSummary).slice(0, 1200) : null,
        source: 'quiz',
      },
    })

    const mail = await sendMail({
      subject: `🌟 New Quiz Lead: ${name} (${email})`,
      html: leadEmailHtml({ source: 'quiz', name, email, ...body }),
    })

    await db.lead.update({ where: { id: lead.id }, data: { emailSent: mail.sent } }).catch(() => {})

    return NextResponse.json({ ok: true, leadId: lead.id })
  } catch (e) {
    console.error('quiz api error', e)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
