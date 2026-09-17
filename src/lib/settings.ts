import { db } from '@/lib/db'

export const SETTING_KEYS = {
  ADMIN_PASSWORD_HASH: 'admin_password_hash',
  GEMINI_API_KEY: 'gemini_api_key',
  GEMINI_MODEL: 'gemini_model',
  SEO_HOME: 'seo_home',
  SEO_ABOUT: 'seo_about',
  SEO_PROGRAMS: 'seo_programs',
  SEO_GALLERY: 'seo_gallery',
  SEO_BLOG: 'seo_blog',
  SEO_CONTACT: 'seo_contact',
  SEO_QUIZ: 'seo_quiz',
  SEO_SAFETY: 'seo_safety',
  SEO_ENROLL: 'seo_enroll',
  NOTIFY_EMAIL: 'notify_email',
} as const

export async function getSetting(key: string): Promise<string | null> {
  try {
    const row = await db.setting.findUnique({ where: { key } })
    return row?.value ?? null
  } catch {
    return null
  }
}

export async function setSetting(key: string, value: string) {
  await db.setting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  })
}

export type SeoData = { title: string; description: string; keywords?: string }

export async function getSeo(key: string): Promise<SeoData> {
  const raw = await getSetting(key)
  if (raw) {
    try {
      return JSON.parse(raw) as SeoData
    } catch {
      /* fall through to default */
    }
  }
  const defaults: Record<string, SeoData> = {
    [SETTING_KEYS.SEO_HOME]: {
      title: 'Ana Paula Daycare | Safe & Nurturing Child Care in San Francisco, CA',
      description:
        'Warm, home-based daycare in San Francisco (94112). Infant, toddler & preschool care with play-based learning, attentive staff and open parent communication. Book a visit today!',
      keywords: 'daycare san francisco, daycare near me, infant care, preschool 94112, family child care',
    },
    [SETTING_KEYS.SEO_ABOUT]: {
      title: 'About Us | Ana Paula Daycare — San Francisco, CA',
      description:
        'A place where little ones feel at home. Learn about our family-centered approach, loving care, and play-based philosophy at Ana Paula Daycare in San Francisco.',
      keywords: 'about ana paula daycare, home daycare san francisco, family child care',
    },
    [SETTING_KEYS.SEO_PROGRAMS]: {
      title: 'Programs: Infants, Toddlers & Preschool | Ana Paula Daycare',
      description:
        'Gentle infant care, active toddler learning and engaging preschool programs in San Francisco. Play-based curriculum that builds confidence and school readiness.',
      keywords: 'infant care san francisco, toddler program, preschool program sf',
    },
    [SETTING_KEYS.SEO_GALLERY]: {
      title: 'Gallery | Ana Paula Daycare — Moments We Share Every Day',
      description:
        'See our daycare in action: creative play, hands-on learning, outdoor fun and daily discovery moments at Ana Paula Daycare in San Francisco.',
      keywords: 'daycare photos san francisco, daycare gallery',
    },
    [SETTING_KEYS.SEO_BLOG]: {
      title: 'Parenting & Daycare Blog | Ana Paula Daycare',
      description:
        'Practical tips for parents: daycare readiness, choosing the right daycare, healthy routines, nutrition and social-emotional development for children 0-5.',
      keywords: 'daycare tips, parenting blog, child development blog',
    },
    [SETTING_KEYS.SEO_CONTACT]: {
      title: 'Contact & Book a Visit | Ana Paula Daycare — San Francisco',
      description:
        'Call +1 415 912 0300 or send a message. We are located at 431 Paris St, San Francisco, CA 94112. Schedule your visit and check availability today!',
      keywords: 'daycare contact san francisco, schedule daycare visit sf',
    },
    [SETTING_KEYS.SEO_QUIZ]: {
      title: 'Is Ana Paula Daycare Right for Your Family? | Fun 2-Minute Quiz',
      description:
        'Answer 5 quick questions and get a personalized recommendation for your child care needs — plus a free visit booking at Ana Paula Daycare, San Francisco.',
      keywords: 'daycare quiz, find the right daycare, childcare matching',
    },
    [SETTING_KEYS.SEO_SAFETY]: {
      title: 'Safety & Protocols | Ana Paula Daycare — San Francisco',
      description:
        'How we keep your child safe: supervised environments, hygiene routines, secure pickup and emergency preparedness at Ana Paula Daycare.',
      keywords: 'daycare safety, child care protocols san francisco',
    },
    [SETTING_KEYS.SEO_ENROLL]: {
      title: 'Enrollment Pre-Registration | Ana Paula Daycare',
      description:
        'Start your child’s enrollment at Ana Paula Daycare in San Francisco. Pre-register online and we will contact you about availability and next steps.',
      keywords: 'daycare enrollment san francisco, childcare pre-registration',
    },
  }
  return defaults[key] ?? defaults[SETTING_KEYS.SEO_HOME]
}
