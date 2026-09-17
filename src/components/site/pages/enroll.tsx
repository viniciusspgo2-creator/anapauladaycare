'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Reveal } from '@/components/site/reveal'
import { useLang } from '@/components/site/lang-provider'
import { useContent } from '@/components/site/content-provider'
import { Star, StarSolid, Sun, Rainbow, Flower, Sparkle } from '@/components/site/doodles'

const EASE = [0.22, 1, 0.36, 1] as const

const CHILD_AGES = ['0–12 months', '1–2 years', '3–5 years', 'Expecting / soon']
const SCHEDULES = ['Full-time', 'Part-time / half days', 'Flexible days', 'Not sure yet']

/** ENROLL — pré-matrícula com passos divertidos + formulário. */
export function EnrollPage() {
  const { t, tf } = useLang()
  const { site } = useContent()
  const [form, setForm] = useState({ name: '', email: '', phone: '', childAge: '', schedule: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError('')
    try {
      const res = await fetch('/api/enroll', {
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

  const pill = (active: boolean) =>
    `min-h-[44px] rounded-full border-2 px-4 text-[0.875rem] font-extrabold transition-all duration-300 ${
      active
        ? 'border-pink-500 bg-pink-500 text-white shadow-pop-sm'
        : 'border-ink/15 bg-white text-ink-soft hover:border-pink-300 hover:text-navy'
    }`

  return (
    <section className="relative overflow-hidden bg-cream pb-24 pt-32 sm:pt-44" aria-label="Enrollment">
      <div
        className="bg-dots-navy pointer-events-none absolute inset-x-0 top-0 h-44 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Sun className="anim-spin-slow absolute right-[6%] top-32 h-16 w-16 text-yellow-200" />
        <Star className="anim-float-a absolute right-[18%] top-56 h-8 w-8 text-pink-300" />
        <Rainbow size={64} className="absolute left-[3%] top-40 opacity-60" />
        <Flower className="anim-float-b absolute left-[14%] bottom-24 h-9 w-9 text-pink-300" />
        <Sparkle className="absolute left-[30%] top-28 h-6 w-6 text-blue-300" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Coluna informativa */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow">{t('Enrollment')}</p>
              <h1 className="font-display mt-5 text-[2.4rem] font-bold leading-[1.08] text-navy sm:text-[3.3rem]">
                {t('Begin with a')} <span className="text-pink-500">{t('simple hello.')}</span>
              </h1>
              <p className="mt-5 max-w-[42ch] text-[1.02rem] font-semibold leading-relaxed text-ink-soft">
                {t("Pre-register online and we'll reach out about availability, answer your questions, and arrange a visit — no pressure, just a conversation.")}
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <ol className="mt-9 grid gap-4">
                {[
                  ['01', t('You write to us'), t('Share a little about your child and the care you need.'), 'bg-pink-100 text-pink-600'],
                  ['02', t('We reply personally'), t('Availability, routine, pricing questions — answered honestly.'), 'bg-blue-100 text-blue-600'],
                  ['03', t('You visit with your child'), t('See the space, meet us, and see if it feels right.'), 'bg-green-100 text-green-700'],
                ].map(([n, ttl, d, c]) => (
                  <li key={n} className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-pop-sm">
                    <span className={`font-display flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${c} text-[1rem] font-bold`} aria-hidden>
                      {n}
                    </span>
                    <div>
                      <h2 className="font-display text-[1.1rem] font-bold text-navy">{ttl}</h2>
                      <p className="mt-1 text-[0.9rem] font-semibold leading-relaxed text-ink-soft">{d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="mt-8 text-[0.95rem] font-bold text-ink-soft">
                {t('Rather talk first?')}{' '}
                <a href={site.phoneHref} className="link-draw text-pink-600">
                  {site.phone}
                </a>
              </p>
            </Reveal>
          </div>

          {/* Formulário */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="card-fun p-7 sm:p-9">
                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="flex h-full flex-col items-center justify-center py-10 text-center"
                  >
                    <span className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100" aria-hidden>
                      <StarSolid className="h-10 w-10 text-yellow-500" />
                    </span>
                    <p className="font-display mt-5 text-[1.8rem] font-bold text-navy">
                      {t('Pre-registration received,')} <span className="text-pink-500">{form.name.split(' ')[0]}!</span>
                    </p>
                    <p className="mt-3 max-w-[46ch] font-semibold leading-relaxed text-ink-soft">
                      {t('Thank you! Our team will reach out shortly with availability and next steps for your')}{' '}
                      {form.childAge ? <strong className="text-navy">{t(form.childAge)}</strong> : t('little one')}.
                      {' '}{t('For anything urgent, call')} {site.phone}.
                    </p>
                    <div className="mt-7 flex flex-wrap justify-center gap-4">
                      <a href="#/gallery" className="btn btn-blue">
                        {t('See our days in photos')}
                        <span className="arr" aria-hidden>
                          →
                        </span>
                      </a>
                      <a href="#/quiz" className="btn btn-white">
                        {t('Take the care quiz')}
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={submit} className="grid gap-5">
                    <h2 className="font-display text-[1.5rem] font-bold text-navy">
                      {t('Pre-')}<span className="text-pink-500">{t('registration')}</span>
                    </h2>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="e-name" className="field-label">{t('Parent/guardian name *')}</label>
                        <input
                          id="e-name"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="field"
                          placeholder="Maria Silva"
                          maxLength={120}
                        />
                      </div>
                      <div>
                        <label htmlFor="e-phone" className="field-label">{t('Phone *')}</label>
                        <input
                          id="e-phone"
                          required
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
                      <label htmlFor="e-email" className="field-label">{t('Email *')}</label>
                      <input
                        id="e-email"
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="field"
                        placeholder="maria@email.com"
                        maxLength={200}
                      />
                    </div>
                    <fieldset className="grid gap-2.5">
                      <legend className="field-label">{t("Child's age *")}</legend>
                      <div className="flex flex-wrap gap-2.5">
                        {CHILD_AGES.map((a) => (
                          <button
                            key={a}
                            type="button"
                            aria-pressed={form.childAge === a}
                            onClick={() => setForm({ ...form, childAge: a })}
                            className={pill(form.childAge === a)}
                          >
                            {t(a)}
                          </button>
                        ))}
                      </div>
                    </fieldset>
                    <fieldset className="grid gap-2.5">
                      <legend className="field-label">{t('Schedule needed *')}</legend>
                      <div className="flex flex-wrap gap-2.5">
                        {SCHEDULES.map((s) => (
                          <button
                            key={s}
                            type="button"
                            aria-pressed={form.schedule === s}
                            onClick={() => setForm({ ...form, schedule: s })}
                            className={pill(form.schedule === s)}
                          >
                            {t(s)}
                          </button>
                        ))}
                      </div>
                    </fieldset>
                    <div>
                      <label htmlFor="e-message" className="field-label">{t('Anything else?')}</label>
                      <textarea
                        id="e-message"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        rows={4}
                        className="field resize-none"
                        placeholder={t('Allergies, routines, questions — anything helpful.')}
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
                        {sending ? t('Sending…') : t('Submit pre-registration')}
                        <span className="arr" aria-hidden>
                          →
                        </span>
                      </button>
                      <p className="text-xs font-bold text-ink-faint">
                        {t('No fees, no spam — just a conversation about your family.')}
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
