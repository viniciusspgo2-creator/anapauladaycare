'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Star } from '@/components/site/doodles'
import { useLang } from '@/components/site/lang-provider'

const EASE = [0.22, 1, 0.36, 1] as const

/* Lógica preservada do fluxo original — apenas a apresentação mudou. */

type Answers = {
  childAge: string
  priorities: string[]
  schedule: string
  visitedOthers: string
  name: string
  email: string
}

const STEPS = ['Age', 'Priorities', 'Schedule', 'Experience', 'Contact']

/** Exibição traduzida dos passos (a lógica continua usando os valores canônicos). */
const STEP_LABEL_KEYS: Record<string, string> = {
  Age: 'Step Age',
  Priorities: 'Step Priorities',
  Schedule: 'Step Schedule',
  Experience: 'Step Experience',
  Contact: 'Contact',
}

const AGE_OPTIONS = [
  { value: '0-12 months', label: 'A baby', detail: '0–12 months' },
  { value: '1-2 years', label: 'A toddler', detail: '1–2 years' },
  { value: '3-5 years', label: 'Preschool age', detail: '3–5 years' },
  { value: 'expecting', label: 'Expecting, or almost', detail: 'Coming soon' },
]

const PRIORITY_OPTIONS = [
  { value: 'Safety & security', label: 'Safety & security', detail: 'Above everything else' },
  { value: 'Learning & development', label: 'Learning & development', detail: 'Curiosity, skills, growth' },
  { value: 'Flexible schedule', label: 'A flexible schedule', detail: 'Around real family life' },
  { value: 'Nutrition & meals', label: 'Nutrition & meals', detail: 'Healthy routines' },
  { value: 'Warm, loving care', label: 'Warm, loving care', detail: 'Like a second home' },
  { value: 'Social skills & friends', label: 'Friends & social skills', detail: 'Growing together' },
]

const SCHEDULE_OPTIONS = [
  { value: 'Full-time', label: 'Full-time care', detail: 'Every weekday' },
  { value: 'Part-time', label: 'Part-time', detail: 'Half days or a few days' },
  { value: 'Flexible days', label: 'Flexible days', detail: 'It varies' },
  { value: 'Not sure yet', label: 'Not sure yet', detail: 'Still deciding' },
]

const VISITED_OPTIONS = [
  { value: 'Yes', label: 'Yes, we have', detail: 'We toured other places' },
  { value: 'Not yet', label: 'Not yet', detail: "You'd be one of our firsts" },
]

export function QuizPage() {
  const { t } = useLang()
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [answers, setAnswers] = useState<Answers>({
    childAge: '',
    priorities: [],
    schedule: '',
    visitedOthers: '',
    name: '',
    email: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const canAdvance = useMemo(() => {
    switch (step) {
      case 0: return answers.childAge !== ''
      case 1: return answers.priorities.length > 0
      case 2: return answers.schedule !== ''
      case 3: return answers.visitedOthers !== ''
      case 4: return answers.name.trim().length > 1 && /.+@.+\..+/.test(answers.email)
      default: return false
    }
  }, [step, answers])

  const next = () => {
    if (!canAdvance) return
    setDirection(1)
    setStep((s) => Math.min(s + 1, STEPS.length))
  }
  const back = () => {
    setDirection(-1)
    setStep((s) => Math.max(s - 1, 0))
  }

  const result = useMemo(() => buildResult(answers), [answers])

  const submit = async () => {
    if (!canAdvance) return
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: answers.name,
          email: answers.email,
          childAge: answers.childAge,
          priorities: answers.priorities,
          schedule: answers.schedule,
          visitedOthers: answers.visitedOthers,
          resultSummary: result,
        }),
      })
      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.error || 'Something went wrong.')
      }
      setDone(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="relative overflow-hidden bg-blue-50" aria-label="Find the right care quiz">
      <div className="bg-dots-white pointer-events-none absolute inset-0 opacity-50" aria-hidden />

      <Star className="anim-float-a pointer-events-none absolute right-[6%] top-32 h-10 w-10 text-yellow-300" aria-hidden />
      <Star className="anim-float-b pointer-events-none absolute left-[8%] bottom-24 h-7 w-7 text-pink-300" aria-hidden />
      <div className="relative mx-auto max-w-[1440px] px-5 pb-28 pt-32 sm:px-8 sm:pt-40 lg:px-12">
        {done ? (
          <ResultView answers={answers} bullets={resultBullets(answers).map((b) => t(b))} />
        ) : (
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Cabeçalho lateral */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <p className="eyebrow">{t('Find the right care')}</p>
                <h1 className="font-display mt-6 text-[2rem] font-bold leading-[1.1] text-navy sm:text-[2.6rem]">
                  {t('Five questions,')} <span className="text-pink-500">{t('one honest answer.')}</span>
                </h1>
                <p className="mt-5 max-w-[38ch] text-[0.9375rem] font-semibold leading-relaxed text-ink-soft">
                  {t("Tell us about your family and we'll point you to the program that fits — plus what to ask when you visit any daycare.")}
                </p>
                {/* Indicador 01 / 05 */}
                <div className="mt-10 flex items-center gap-3">
                  <span className="font-display flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-xl font-bold text-yellow-400 shadow-pop-sm">
                    {String(Math.min(step + 1, 5)).padStart(2, '0')}
                  </span>
                  <span className="text-[0.72rem] font-extrabold uppercase tracking-[0.2em] text-ink-faint">
                    / {String(STEPS.length).padStart(2, '0')} · {t(STEP_LABEL_KEYS[STEPS[step]] ?? STEPS[step])}
                  </span>
                </div>
                <div className="mt-4 flex gap-1.5" aria-hidden>
                  {STEPS.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                        i <= step
                          ? ['bg-pink-500', 'bg-yellow-400', 'bg-blue-500', 'bg-green-500', 'bg-orange-500'][i]
                          : 'bg-white'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Pergunta */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step}
                  custom={direction}
                  initial={{ opacity: 0, x: 36 * direction }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 * direction }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  {step === 0 && (
                    <QuestionBlock
                      index="01"
                      question={t('Who is this care for?')}
                      hint={t('So we suggest the right program.')}
                      selected={answers.childAge}
                      onSelect={(v) => setAnswers({ ...answers, childAge: v })}
                      options={AGE_OPTIONS}
                      multi={false}
                    />
                  )}
                  {step === 1 && (
                    <QuestionBlock
                      index="02"
                      question={t('What matters most to you?')}
                      hint={t("Choose everything that applies — we'll match it.")}
                      selected={answers.priorities}
                      onSelect={(v) =>
                        setAnswers((a) => ({
                          ...a,
                          priorities: a.priorities.includes(v)
                            ? a.priorities.filter((p) => p !== v)
                            : [...a.priorities, v],
                        }))
                      }
                      options={PRIORITY_OPTIONS}
                      multi
                    />
                  )}
                  {step === 2 && (
                    <QuestionBlock
                      index="03"
                      question={t('What schedule fits your week?')}
                      hint={t('You can change this later.')}
                      selected={answers.schedule}
                      onSelect={(v) => setAnswers({ ...answers, schedule: v })}
                      options={SCHEDULE_OPTIONS}
                      multi={false}
                    />
                  )}
                  {step === 3 && (
                    <QuestionBlock
                      index="04"
                      question={t('Have you visited other daycares yet?')}
                      hint={t("There's no wrong answer here.")}
                      selected={answers.visitedOthers}
                      onSelect={(v) => setAnswers({ ...answers, visitedOthers: v })}
                      options={VISITED_OPTIONS}
                      multi={false}
                    />
                  )}
                  {step === 4 && (
                    <div>
                      <p className="chip bg-pink-100 text-pink-600 text-[0.7rem]">05 · {t('Contact')}</p>
                      <h2 className="font-display mt-4 text-[1.7rem] font-bold leading-snug text-navy sm:text-[2.1rem]">
                        {t('Where should we send your result?')}
                      </h2>
                      <div className="mt-8 grid max-w-lg gap-8">
                        <div>
                          <label htmlFor="q-name" className="field-label">{t('Your name *')}</label>
                          <input
                            id="q-name"
                            value={answers.name}
                            maxLength={120}
                            onChange={(e) => setAnswers({ ...answers, name: e.target.value })}
                            placeholder="Maria Silva"
                            className="field"
                          />
                        </div>
                        <div>
                          <label htmlFor="q-email" className="field-label">{t('Email *')}</label>
                          <input
                            id="q-email"
                            type="email"
                            value={answers.email}
                            maxLength={200}
                            onChange={(e) => setAnswers({ ...answers, email: e.target.value })}
                            placeholder="maria@email.com"
                            className="field"
                          />
                        </div>
                      </div>
                      {error && (
                        <p role="alert" className="mt-5 text-sm font-semibold text-destructive">{error}</p>
                      )}
                    </div>
                  )}

                  {/* Navegação */}
                  <div className="mt-12 flex items-center justify-between border-t-2 border-navy/10 pt-6">
                    <button
                      onClick={back}
                      disabled={step === 0}
                      className="btn btn-white btn-sm disabled:invisible"
                    >
                      {t('← Back')}
                    </button>
                    {step < 4 ? (
                      <button onClick={next} disabled={!canAdvance} className="btn btn-navy justify-between">
                        {t('Continue')}
                        <span className="arr" aria-hidden>
                          →
                        </span>
                      </button>
                    ) : (
                      <button onClick={submit} disabled={!canAdvance || submitting} className="btn btn-pink justify-between">
                        {submitting ? t('Sending…') : t('See my result')}
                        <span className="arr" aria-hidden>
                          →
                        </span>
                      </button>
                    )}
                  </div>
                  <p className="mt-5 text-xs font-bold text-ink-faint">
                    {t('Your information is only used to help your family — never shared, never spammed.')}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function QuestionBlock({
  index,
  question,
  hint,
  options,
  selected,
  onSelect,
  multi,
}: {
  index: string
  question: string
  hint: string
  options: { value: string; label: string; detail: string }[]
  selected: string | string[]
  onSelect: (v: string) => void
  multi: boolean
}) {
  const { t } = useLang()
  const isSel = (v: string) => (multi ? (selected as string[]).includes(v) : selected === v)
  const circles = ['bg-pink-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500', 'bg-orange-500', 'bg-pink-500']
  return (
    <div>
      <p className="chip bg-white text-navy text-[0.7rem]">
        {index} · {multi ? t('Multiple answers') : t('One answer')}
      </p>
      <h2 className="font-display mt-5 max-w-[24ch] text-[1.7rem] font-bold leading-snug text-navy sm:text-[2.1rem]">
        {question}
      </h2>
      <p className="mt-3 text-[0.9375rem] font-semibold text-ink-soft">{hint}</p>
      <ul className="mt-8 grid gap-3">
        {options.map((o, i) => {
          const sel = isSel(o.value)
          return (
            <li key={o.value}>
              <button
                type="button"
                onClick={() => onSelect(o.value)}
                aria-pressed={sel}
                className={`group flex w-full items-center justify-between gap-6 rounded-2xl border-2 px-5 py-4 text-left transition-all duration-300 sm:px-6 ${
                  sel
                    ? 'border-pink-300 bg-white shadow-pop-sm'
                    : 'border-transparent bg-white/70 hover:border-blue-200 hover:bg-white'
                }`}
              >
                <span className="flex items-center gap-4">
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[0.8rem] font-black text-white transition-all duration-300 ${
                      sel ? 'bg-pink-500' : circles[i % circles.length] + ' opacity-70 group-hover:opacity-100'
                    }`}
                    aria-hidden
                  >
                    {sel ? '✓' : String(i + 1)}
                  </span>
                  <span
                    className={`font-display text-[1.3rem] font-bold transition-all duration-300 sm:text-[1.6rem] ${
                      sel ? 'text-navy' : 'text-navy/70 group-hover:text-navy'
                    }`}
                  >
                    {t(o.label)}
                  </span>
                </span>
                <span
                  className={`hidden text-[0.8125rem] font-bold text-ink-faint transition-opacity duration-300 sm:block ${
                    sel ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {t(o.detail)}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function ResultView({ answers, bullets }: { answers: Answers; bullets: string[] }) {
  const { t } = useLang()
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="grid gap-12 lg:grid-cols-12"
    >
      <div className="lg:col-span-5">
        <p className="eyebrow">{t('Your result')}</p>
        <h1 className="font-display mt-6 text-[2.2rem] font-bold leading-[1.08] text-navy sm:text-[2.9rem]">
          {t('Good news,')}{' '}
          <span className="text-pink-500">{answers.name.split(' ')[0] || t('friend')}!</span>
        </h1>
        <p className="mt-5 max-w-[42ch] font-semibold leading-relaxed text-ink-soft">
          {t('Based on your answers, Ana Paula Daycare is a wonderful match for your family. Here is why — and what we suggest next.')}
        </p>
        <p className="mt-6 max-w-[42ch] text-[0.875rem] font-bold text-ink-faint">
          {t('A copy was sent to')} <strong className="text-navy">{answers.email}</strong>
          {t(', and our team received your answers — we may reach out to say hello.')}
        </p>
        <div className="mt-9 flex flex-col gap-4 sm:flex-row">
          <a href="#/contact" className="btn btn-pink justify-between">
            {t('Book your visit')}
            <span className="arr" aria-hidden>
              →
            </span>
          </a>
          <a href="#/programs" className="btn btn-white justify-between">
            {t('See programs first')}
            <span className="arr" aria-hidden>
              →
            </span>
          </a>
        </div>
      </div>
      <div className="lg:col-span-7">
        <ul className="grid gap-3.5">
          {bullets.map((b, i) => (
            <motion.li
              key={b}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.55, ease: EASE }}
              className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-pop-sm"
            >
              <span
                className={`font-display flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[0.8rem] font-bold text-white ${
                  ['bg-pink-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500', 'bg-orange-500'][i % 5]
                }`}
                aria-hidden
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-[1rem] font-semibold leading-relaxed text-ink">{b}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

function resultBullets(a: Answers): string[] {
  const bullets: string[] = []
  switch (a.childAge) {
    case '0-12 months':
      bullets.push('Our Infants program offers gentle, attentive care in a calm environment designed for comfort, safety, and early development.')
      break
    case '1-2 years':
      bullets.push('Our Toddlers program offers active learning through play, movement, and hands-on activities that support growing minds and bodies.')
      break
    case '3-5 years':
      bullets.push('Our Preschool program is a fun, engaging space that builds confidence, social skills, and school readiness.')
      break
    default:
      bullets.push('We welcome young children in a warm, home-like environment and will help you find the perfect starting point.')
  }
  if (a.priorities.includes('Safety & security')) bullets.push('Safety comes first here: a secure, supervised setting where children can explore freely and parents feel at peace.')
  if (a.priorities.includes('Learning & development')) bullets.push('Play-based learning is our specialty — every game and activity is designed to spark curiosity and growth.')
  if (a.priorities.includes('Warm, loving care')) bullets.push('Caring attention is at our heart: attentive, loving care so every child feels seen, supported, and valued.')
  if (a.priorities.includes('Social skills & friends')) bullets.push('Daily group play and shared moments help children build friendships and social confidence naturally.')
  if (a.priorities.includes('Nutrition & meals')) bullets.push("We support children's daily routines — including meals and snacks — in a caring, organized way.")
  if (a.priorities.includes('Flexible schedule')) bullets.push("We work closely with families on schedules that fit real life — let's talk about what works for you.")
  if (a.schedule === 'Full-time') bullets.push('Our balanced daily routine — play-based learning, meals, rest, and supervised indoor and outdoor play — fits beautifully with full-time care.')
  if (a.visitedOthers === 'Yes') bullets.push("You've already seen what's out there — come compare the warmth, communication, and happy smiles in person. We're confident you'll feel the difference!")
  if (a.visitedOthers === 'Not yet') bullets.push('Starting your search with us is a great shortcut — book a visit and see firsthand what a warm, family-centered daycare looks like.')
  return bullets.slice(0, 5)
}

function buildResult(a: Answers): string {
  return `Age: ${a.childAge} | Priorities: ${a.priorities.join(', ')} | Schedule: ${a.schedule} | Visited others: ${a.visitedOthers}`
}
