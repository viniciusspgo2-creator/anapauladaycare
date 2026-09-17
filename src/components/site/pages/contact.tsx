'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Reveal, Words } from '@/components/site/reveal'
import { useLang } from '@/components/site/lang-provider'
import { useContent } from '@/components/site/content-provider'
import { Star, StarSolid, Sun, Rainbow, Sparkle, Flower, SquiggleLine } from '@/components/site/doodles'
import { Phone, Mail, MapPin } from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1] as const

/** CONTACT — mapa + informações + formulário, energia infantil. */
export function ContactPage() {
  const { t } = useLang()
  const { site } = useContent()
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      {/* Abertura */}
      <section className="relative overflow-hidden bg-cream pb-14 pt-32 sm:pt-44" aria-label="Contact">
      <div
        className="bg-dots-navy pointer-events-none absolute inset-x-0 top-0 h-44 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]"
        aria-hidden
      />
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Sun className="anim-spin-slow absolute right-[8%] top-28 h-16 w-16 text-yellow-200" />
          <Star className="anim-float-a absolute right-[20%] top-44 h-8 w-8 text-pink-300" />
          <Rainbow size={64} className="absolute left-[4%] top-36 opacity-70" />
          <Sparkle className="absolute left-[28%] top-32 h-6 w-6 text-blue-300" />
          <Flower className="anim-float-b absolute left-[10%] top-64 h-9 w-9 text-green-300" />
        </div>
        <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <p className="eyebrow">{t('Contact us')}</p>
            <h1 className="font-display mt-5 max-w-[16ch] text-[2.6rem] font-bold leading-[1.08] text-navy sm:text-[3.9rem]">
              {t("Let's meet")} <span className="text-pink-500">{t('your family.')}</span>
            </h1>
            <p className="mt-5 max-w-[48ch] text-[1.05rem] font-semibold leading-relaxed text-ink-soft">
              {t("Ask questions, check availability, or schedule a visit — we're happy to help and quick to respond.")}
            </p>
          </Reveal>

          {/* Informações em cartões coloridos */}
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {[
              { label: t('Call or text'), icon: <Phone className="h-6 w-6" />, chip: 'bg-pink-100 text-pink-600', content: site.phone, href: site.phoneHref },
              { label: t('Write'), icon: <Mail className="h-6 w-6" />, chip: 'bg-blue-100 text-blue-600', content: site.email, href: site.emailHref, break: true },
              { label: t('Visit'), icon: <MapPin className="h-6 w-6" />, chip: 'bg-green-100 text-green-700', content: `${site.addressStreet} ${site.addressCity}`, href: site.mapsUrl },
            ].map((c, i) => (
              <Reveal key={i} delay={0.07 * i}>
                <a
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="hover-wiggle card-fun flex h-full items-start gap-4 p-6 transition-colors hover:border-pink-200"
                >
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${c.chip}`} aria-hidden>
                    {c.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="text-[0.7rem] font-extrabold uppercase tracking-[0.16em] text-ink-faint">
                      {c.label}
                    </span>
                    <span className={`font-display mt-1 block text-[1.1rem] font-bold leading-snug text-navy sm:text-[1.2rem] ${c.break ? 'break-all' : ''}`}>
                      {c.content}
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Formulário + Mapa */}
      <section className="relative overflow-hidden bg-blue-50 py-20 sm:py-24" aria-label="Send a message">
      <div className="bg-dots-white pointer-events-none absolute inset-0 opacity-50" aria-hidden />

        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Formulário */}
            <div className="lg:col-span-5">
              <Reveal>
                <div className="card-fun p-7 sm:p-8">
                  {sent ? (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className="py-6 text-center"
                    >
                      <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100" aria-hidden>
                        <StarSolid className="h-10 w-10 text-green-500" />
                      </span>
                      <p className="font-display mt-5 text-[1.7rem] font-bold text-navy">
                        {t('Message received —')} <span className="text-green-600">{t('thank you!')}</span>
                      </p>
                      <p className="mx-auto mt-3 max-w-[40ch] font-semibold leading-relaxed text-ink-soft">
                        {t("We'll get back to you shortly at")} <strong className="text-navy">{form.email}</strong>.
                        {t("If it's urgent, call")} {site.phone}.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={submit} className="grid gap-5">
                      <h2 className="font-display text-[1.5rem] font-bold text-navy">
                        {t('Send us a')} <span className="text-pink-500">{t('message')}</span>
                      </h2>
                      <div>
                        <label htmlFor="c-name" className="field-label">{t('Your name *')}</label>
                        <input
                          id="c-name"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="field"
                          placeholder="Maria Silva"
                          maxLength={120}
                        />
                      </div>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label htmlFor="c-email" className="field-label">{t('Email *')}</label>
                          <input
                            id="c-email"
                            required
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="field"
                            placeholder="maria@email.com"
                            maxLength={200}
                          />
                        </div>
                        <div>
                          <label htmlFor="c-phone" className="field-label">{t('Phone')}</label>
                          <input
                            id="c-phone"
                            type="tel"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className="field"
                            placeholder="+1 415 000 0000"
                            maxLength={40}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="c-message" className="field-label">{t('Message *')}</label>
                        <textarea
                          id="c-message"
                          required
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          rows={5}
                          className="field resize-none"
                          placeholder={t('Tell us about your child, your needs, or the best days to visit…')}
                          maxLength={2000}
                        />
                      </div>
                      {error && (
                        <p role="alert" className="text-sm font-extrabold text-destructive">
                          {error}
                        </p>
                      )}
                      <div className="flex flex-wrap items-center gap-4">
                        <button type="submit" disabled={sending} className="btn btn-pink justify-between">
                          {sending ? t('Sending…') : t('Send message')}
                          <span className="arr" aria-hidden>
                            →
                          </span>
                        </button>
                        <p className="text-xs font-bold text-ink-faint">
                          {t('Your details are only used to answer your family — never shared.')}
                        </p>
                      </div>
                    </form>
                  )}
                </div>
              </Reveal>
            </div>

            {/* Mapa */}
            <Reveal className="lg:col-span-7" delay={0.12}>
              <div className="relative h-[380px] overflow-hidden rounded-[2rem] border-[5px] border-white shadow-pop sm:h-full sm:min-h-[520px]">
                <iframe
                  title="Map — Ana Paula Daycare, 431 Paris St., San Francisco, CA 94112"
                  src={site.mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full"
                  allowFullScreen
                />
                <div className="card-fun absolute bottom-5 left-5 flex items-center gap-3 p-4 pr-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100" aria-hidden>
                    <MapPin className="h-5 w-5 text-yellow-600" />
                  </span>
                  <div>
                    <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-ink-faint">
                      Ana Paula Daycare
                    </p>
                    <p className="font-display text-[1rem] font-bold text-navy">{site.address}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-12 text-center">
            <p className="font-display text-[1.25rem] font-bold text-navy">
              {t('Prefer a quick answer?')}{' '}
              <a href={site.phoneHref} className="link-draw text-pink-600">
                {t('Call us')}
              </a>{' '}
              {t('— we usually reply the same day.')}
            </p>
            <SquiggleLine className="mx-auto mt-4 w-36 text-yellow-400" />
          </Reveal>
        </div>
      </section>
    </>
  )
}
