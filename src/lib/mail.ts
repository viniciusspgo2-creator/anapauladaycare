import { getSetting, SETTING_KEYS } from '@/lib/settings'

export type MailPayload = {
  subject: string
  html: string
  to?: string
}

export type MailResult = { sent: boolean; provider: string; error?: string }

/**
 * Transactional email abstraction.
 * - Uses Resend if RESEND_API_KEY is set
 * - Uses SendGrid if SENDGRID_API_KEY is set
 * - Otherwise logs and returns sent:false (lead is still persisted in DB and visible in admin)
 */
export async function sendMail(payload: MailPayload): Promise<MailResult> {
  const notifyTo = (await getSetting(SETTING_KEYS.NOTIFY_EMAIL)) || 'anapauladaycare@gmail.com'
  const to = payload.to || notifyTo
  const from = process.env.MAIL_FROM || 'Ana Paula Daycare <onboarding@resend.dev>'

  const resendKey = process.env.RESEND_API_KEY
  if (resendKey) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, to: [to], subject: payload.subject, html: payload.html }),
        signal: AbortSignal.timeout(15000),
      })
      if (res.ok) return { sent: true, provider: 'resend' }
      return { sent: false, provider: 'resend', error: `HTTP ${res.status}` }
    } catch (e) {
      return { sent: false, provider: 'resend', error: String(e) }
    }
  }

  const sendgridKey = process.env.SENDGRID_API_KEY
  if (sendgridKey) {
    try {
      const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: { Authorization: `Bearer ${sendgridKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: to }] }],
          from: { email: from.match(/<(.+)>/)?.[1] || from, name: 'Ana Paula Daycare' },
          subject: payload.subject,
          content: [{ type: 'text/html', value: payload.html }],
        }),
        signal: AbortSignal.timeout(15000),
      })
      if (res.ok || res.status === 202) return { sent: true, provider: 'sendgrid' }
      return { sent: false, provider: 'sendgrid', error: `HTTP ${res.status}` }
    } catch (e) {
      return { sent: false, provider: 'sendgrid', error: String(e) }
    }
  }

  console.log(`[mail] RESEND_API_KEY/SENDGRID_API_KEY not configured. Email "${payload.subject}" to ${to} skipped (lead stored in DB).`)
  return { sent: false, provider: 'none', error: 'no provider configured' }
}

export function leadEmailHtml(data: {
  source: string
  name: string
  email: string
  phone?: string | null
  childAge?: string | null
  priorities?: string | null
  schedule?: string | null
  visitedOthers?: string | null
  resultSummary?: string | null
  message?: string | null
}): string {
  const row = (label: string, value?: string | null) =>
    value ? `<tr><td style="padding:6px 12px;font-weight:700;color:#1d4e9e;white-space:nowrap">${label}</td><td style="padding:6px 12px">${value}</td></tr>` : ''
  return `<div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;border:2px solid #ee4d9b;border-radius:16px;overflow:hidden">
    <div style="background:#ee4d9b;color:#fff;padding:16px 24px;font-size:20px;font-weight:bold">🌟 New ${data.source === 'quiz' ? 'Quiz Lead' : data.source === 'enroll' ? 'Enrollment Pre-Registration' : 'Contact Message'}</div>
    <table style="width:100%;border-collapse:collapse;font-size:15px">
      ${row('Name', data.name)}
      ${row('Email', data.email)}
      ${row('Phone', data.phone)}
      ${row('Child age', data.childAge)}
      ${row('Priorities', data.priorities)}
      ${row('Schedule', data.schedule)}
      ${row('Visited others', data.visitedOthers)}
      ${row('Message', data.message)}
      ${row('Quiz result', data.resultSummary)}
    </table>
    <div style="background:#fff8e6;padding:12px 24px;color:#8a6d1a;font-size:13px">Sent automatically by anapauladaycare.com — manage leads in the admin panel.</div>
  </div>`
}
