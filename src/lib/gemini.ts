import { getSetting, SETTING_KEYS } from '@/lib/settings'
import { SITE_CONTEXT } from '@/data/site-context'

export type GeminiResult = { text: string; source: 'gemini' | 'fallback' }

/**
 * Calls Google Gemini API (REST) with the API key configured in the admin panel.
 * Falls back to the built-in FAQ knowledge base when no key is configured or on error.
 */
export async function askGemini(
  userMessage: string,
  history: { role: 'user' | 'model'; text: string }[] = [],
  lang: 'en' | 'es' | 'pt' = 'en',
): Promise<GeminiResult> {
  const apiKey = await getSetting(SETTING_KEYS.GEMINI_API_KEY)
  const model = (await getSetting(SETTING_KEYS.GEMINI_MODEL)) || 'gemini-2.0-flash'
  const systemPrompt = `${SYSTEM_PROMPT}\n\nLANGUAGE: Always reply in ${LANG_NAME[lang]}${lang !== 'en' ? ' (the parent\'s selected language on the website)' : ''}.`

  if (apiKey) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${apiKey}`
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemPrompt }],
          },
          contents: [
            ...history.slice(-8).map((h) => ({ role: h.role, parts: [{ text: h.text }] })),
            { role: 'user', parts: [{ text: userMessage }] },
          ],
          generationConfig: { temperature: 0.6, maxOutputTokens: 512 },
        }),
        signal: AbortSignal.timeout(20000),
      })
      if (res.ok) {
        const data = await res.json()
        const text = data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text || '').join('')?.trim()
        if (text) return { text, source: 'gemini' }
      }
      console.error('Gemini API error:', res.status, await res.text().catch(() => ''))
    } catch (e) {
      console.error('Gemini request failed:', e)
    }
  }

  // Intermediate fallback: local LLM via z-ai-web-dev-sdk (backend only)
  try {
    const ZAI = (await import('z-ai-web-dev-sdk')).default
    const zai = await ZAI.create()
    const completion = await zai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        ...history.slice(-6).map((h) => ({ role: h.role as 'user' | 'assistant', content: h.text })),
        { role: 'user', content: userMessage },
      ],
    })
    const text = completion.choices[0]?.message?.content?.trim()
    if (text) return { text, source: 'fallback' }
  } catch (e) {
    console.error('Local LLM fallback failed:', e)
  }

  return { text: fallbackAnswer(userMessage), source: 'fallback' }
}

const LANG_NAME = { en: 'English', es: 'Spanish', pt: 'Brazilian Portuguese' } as const

const SYSTEM_PROMPT = `You are "Sunny", the friendly virtual assistant of Ana Paula Daycare, a home-based daycare in San Francisco, CA.
Your job: help parents with questions about schedules, age groups (Infants, Toddlers, Preschool), enrollment, location, safety and daily routine.

RULES:
- Warm, professional and concise (max 120 words). Use simple English.
- Only use the KNOWLEDGE below about the daycare. Never invent prices, hours, license numbers or policies that are not there.
- If the answer is not in the KNOWLEDGE, say you will connect the parent with the team and suggest calling +1 415 912 0300 or emailing anapauladaycare@gmail.com.
- Always end with a helpful next step (e.g., book a visit, use the quiz, or the contact page).

KNOWLEDGE:
${SITE_CONTEXT}`

/** Keyword-based answer using the real site FAQ — used when Gemini key is not configured. */
function fallbackAnswer(message: string): string {
  const q = message.toLowerCase()
  const has = (...words: string[]) => words.some((w) => q.includes(w))

  if (has('hour', 'open', 'close', 'schedule', 'time')) {
    return "Our daily routine includes play-based learning, meals or snacks, rest time, creative activities, and supervised indoor and outdoor play. For our current hours of operation, please call us at +1 415 912 0300 — we'd love to tell you all about our day! 😊"
  }
  if (has('age', 'infant', 'baby', 'toddler', 'preschool', 'accept')) {
    return 'We welcome young children in a nurturing, home-like environment with three programs: Infants, Toddlers and Preschool. For exact age availability, please contact us at +1 415 912 0300 or anapauladaycare@gmail.com.'
  }
  if (has('price', 'cost', 'tuition', 'rate', 'fee')) {
    return 'Rates depend on the program and schedule that fits your family. The best way to get current pricing is to contact us at +1 415 912 0300 or anapauladaycare@gmail.com — we are happy to help!'
  }
  if (has('where', 'address', 'location', 'located')) {
    return 'We are located at 431 Paris St., San Francisco, CA 94112. Come visit us — call +1 415 912 0300 or email anapauladaycare@gmail.com to schedule a tour! 😊'
  }
  if (has('enroll', 'register', 'spot', 'availability', 'waitlist', 'join')) {
    return "We'd love to welcome your family! You can pre-register on our Enrollment page, take our 2-minute quiz, or call +1 415 912 0300 to check availability and schedule a visit."
  }
  if (has('meal', 'food', 'eat', 'lunch', 'snack')) {
    return 'Meal and snack arrangements may vary, so we recommend contacting us directly for the most current details. We always aim to support children’s daily routines in a caring and organized way.'
  }
  if (has('outdoor', 'play', 'outside', 'park')) {
    return 'Yes! Children have opportunities for supervised outdoor play and active time as part of their daily routine whenever appropriate.'
  }
  if (has('safe', 'safety', 'security', 'license')) {
    return 'Safety comes first: we keep a secure, supervised, home-like environment with caring attention to every child. Visit our Safety & Protocols page or contact us for more details.'
  }
  if (has('visit', 'tour', 'see')) {
    return 'We would love to meet you and your little one! Call +1 415 912 0300 or email anapauladaycare@gmail.com to schedule a visit — you can also use the "Book a Visit" button on our website. 😊'
  }
  return "Great question! For details about that, our team is happy to help personally: call +1 415 912 0300 or email anapauladaycare@gmail.com. Meanwhile, feel free to explore our Programs and FAQ pages, or take our fun 2-minute quiz! 😊"
}
