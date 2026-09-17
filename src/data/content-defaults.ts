/** Conteúdo editável pelo painel admin (aba "Site Content").
 *  Estrutura padrão = conteúdo real extraído do site atual.
 *  O admin salva substituições em Setting("site_content") + imagens em Setting("img:*").
 *  Regra mantida: nada inventado — defaults são os dados reais. */

export type EditableContent = {
  brand: { name: string; shortName: string; tagline: string }
  contact: {
    phone: string
    email: string
    addressStreet: string
    addressCity: string
  }
  hero: {
    badge: string
    titleLine1: string
    titleLine2: string
    subtitle: string
    sticker: string
    photoMain: string
    photoMainAlt: string
    photoCircle: string
    photoCircleAlt: string
  }
  concepts: {
    heading: string
    headingAccent: string
    items: { title: string; text: string; photo: string; photoAlt: string }[]
  }
  welcome: {
    eyebrow: string
    heading1: string
    headingAccent: string
    text: string
    points: string[]
    photo1: string
    photo2: string
  }
  programs: {
    eyebrow: string
    heading1: string
    headingAccent: string
    items: { name: string; short: string; long: string; image: string; imageAlt: string }[]
  }
  testimonial: { quote: string; author: string }
  faqs: { q: string; a: string }[]
  finalCta: { eyebrow: string; heading: string }
  gallery: {
    name: string
    images: { src: string; alt: string; ratio: 'portrait' | 'landscape' | 'square' | 'wide' }[]
  }[]
}

export const DEFAULT_CONTENT: EditableContent = {
  brand: {
    name: 'Ana Paula Daycare',
    shortName: 'Ana Paula',
    tagline: 'A warm place for curious little minds',
  },
  contact: {
    phone: '+1 415 912 0300',
    email: 'anapauladaycare@gmail.com',
    addressStreet: '431 Paris St.',
    addressCity: 'San Francisco, CA 94112',
  },
  hero: {
    badge: 'Home-like daycare · San Francisco',
    titleLine1: 'A Safe, Happy Place',
    titleLine2: 'to Learn and Grow.',
    subtitle:
      'At Ana Paula Daycare, little ones feel safe, supported, and excited to explore each day — through play, learning, and attentive care.',
    sticker: 'Morning play · our learning corner',
    photoMain: '/images/gallery/woman-with-child-2.webp',
    photoMainAlt: 'Caregiver and a laughing child playing with wooden toys',
    photoCircle: '/images/gallery/happy-girl-smiling.webp',
    photoCircleAlt: 'Smiling girl playing at day care',
  },
  concepts: {
    heading: 'Learn. Play. Grow.',
    headingAccent: 'Shine.',
    items: [
      {
        title: 'Learn',
        text: 'Curiosity leads the way — every game, story and puzzle is a chance to discover something new.',
        photo: '/images/gallery/didactic-game.webp',
        photoAlt: 'Children enjoying a didactic game together',
      },
      {
        title: 'Play',
        text: 'Movement, music and hands-on fun keep little bodies busy and growing minds happy.',
        photo: '/images/gallery/cheerful-kids-floor.jpeg',
        photoAlt: 'Cheerful kids playing together on the floor',
      },
      {
        title: 'Grow',
        text: 'Balanced routines and caring guidance help confidence bloom a little more every day.',
        photo: '/images/gallery/wood-blocks-teacher.webp',
        photoAlt: 'Teacher guiding a child stacking wooden blocks',
      },
      {
        title: 'Shine',
        text: 'Every child is celebrated for exactly who they are — and encouraged to shine bright.',
        photo: '/images/gallery/smiling-child.jpeg',
        photoAlt: 'Smiling child shining bright',
      },
    ],
  },
  welcome: {
    eyebrow: 'Welcome to Ana Paula',
    heading1: 'A Nurturing Start',
    headingAccent: 'for Every Child',
    text: 'We create a safe, caring space where children can learn, play, and grow with confidence. Our daily routine encourages curiosity, social development, and joyful early learning — every single day.',
    points: [
      'Safe Environment',
      'Play-Based Learning',
      'Daily Routine',
      'Caring Guidance',
      'Social Growth',
      'Creative Activities',
    ],
    photo1: '/images/gallery/kids-painting.webp',
    photo2: '/images/gallery/multicultural-balls.webp',
  },
  programs: {
    eyebrow: 'Programs · Infants · Toddlers · Preschool',
    heading1: 'The right care',
    headingAccent: 'for every stage.',
    items: [
      {
        name: 'Infants',
        short:
          'Gentle, attentive care in a calm environment designed for comfort, safety, and early development.',
        long: "Gentle, loving care for babies in a safe and comforting environment. We follow your baby's own rhythm — cozy naps, feeding, sensory play and lots of bonding.",
        image: '/images/gallery/baby-cereal-toys.jpeg',
        imageAlt: 'Baby exploring textures and toys during quiet play',
      },
      {
        name: 'Toddlers',
        short:
          'Active learning through play, movement, and hands-on activities that support growing minds and bodies.',
        long: 'Active learning, play, and daily routines that support growing independence. Little explorers move, build, sing and discover — with gentle guidance every step of the way.',
        image: '/images/gallery/toddler-balls.webp',
        imageAlt: 'Toddler reaching for balls during active play',
      },
      {
        name: 'Preschool',
        short:
          'A fun, engaging program that helps children build confidence, social skills, and school readiness.',
        long: 'Fun early learning experiences that build confidence, curiosity, and social skills. Pre-literacy, early math, creative arts and role-play — learning disguised as joy.',
        image: '/images/gallery/maths-puzzle-girl.webp',
        imageAlt: 'Child concentrating on a wooden number puzzle',
      },
    ],
  },
  testimonial: {
    quote:
      'Ana Paula Daycare has been such a wonderful experience for our family. My child looks forward to going every morning, and I truly appreciate the care, patience, and attention given each day. It gives me peace of mind knowing my child is in a warm and supportive environment.',
    author: 'Ana Paula Daycare family',
  },
  faqs: [
    {
      q: 'What ages do you accept?',
      a: 'We welcome young children in a nurturing, home-like environment designed to support early learning, play, and daily care. For exact age availability, families are encouraged to contact us directly.',
    },
    {
      q: 'What does a typical day look like?',
      a: 'Our daily routine includes play-based learning, meals or snacks, rest time, creative activities, and supervised indoor and outdoor play. We keep a balanced schedule that helps children feel comfortable, engaged, and secure.',
    },
    {
      q: 'How do you communicate with parents?',
      a: "We believe strong parent communication is essential. We stay in touch with families about each child's day, routines, and any important updates so parents feel informed and connected.",
    },
    {
      q: 'Are meals and snacks provided?',
      a: "Meal and snack arrangements may vary, so we recommend contacting us directly for the most current details. We always aim to support children's daily routines in a caring and organized way.",
    },
    {
      q: 'How can we schedule a visit?',
      a: "Families can contact us directly to ask questions, check availability, and schedule a visit. We're happy to help you learn more about our program and see if Ana Paula Daycare is the right fit for your child.",
    },
    {
      q: 'What makes Ana Paula Daycare different?',
      a: 'Ana Paula Daycare offers a warm, family-centered environment where children receive loving care, personal attention, and daily opportunities to learn through play. Our goal is to create a place where children feel safe, happy, and at home.',
    },
    {
      q: 'Is your setting home-like?',
      a: 'Yes — Ana Paula Daycare offers a warm, home-like setting where children can feel comfortable, safe, and cared for throughout the day.',
    },
    {
      q: 'Do children play outdoors?',
      a: 'Yes, children have opportunities for supervised outdoor play and active time as part of their daily routine whenever appropriate.',
    },
    {
      q: 'How do you help children adjust in the beginning?',
      a: 'We support each child with patience, reassurance, and a gentle routine to help them feel secure, comfortable, and welcomed at their own pace.',
    },
  ],
  finalCta: {
    eyebrow: 'Ready when you are',
    heading: 'Give Your Child a Safe, Happy Place to Learn and Grow',
  },
  gallery: [
    {
      name: 'Creative Play',
      images: [
        { src: '/images/gallery/paint-art-class.jpeg', alt: 'Child painting with bright colors in art class', ratio: 'landscape' },
        { src: '/images/gallery/kids-painting.webp', alt: 'Kids painting together', ratio: 'landscape' },
        { src: '/images/gallery/palm-printing.webp', alt: 'Palm printing craft activity', ratio: 'square' },
        { src: '/images/gallery/drawing-painting.webp', alt: 'Children drawing and painting', ratio: 'landscape' },
        { src: '/images/gallery/handmade-crafts.jpeg', alt: 'Handmade crafts in school', ratio: 'square' },
        { src: '/images/gallery/family-painting.webp', alt: 'Family painting together', ratio: 'landscape' },
      ],
    },
    {
      name: 'Hands-On Learning',
      images: [
        { src: '/images/gallery/abacus-girl.webp', alt: 'Girl playing with a wooden abacus', ratio: 'portrait' },
        { src: '/images/gallery/maths-puzzle-girl.webp', alt: 'Girl playing with a math puzzle', ratio: 'square' },
        { src: '/images/gallery/didactic-game.webp', alt: 'Children enjoying a didactic game', ratio: 'landscape' },
        { src: '/images/gallery/wood-blocks-teacher.webp', alt: 'Kid playing with wood blocks with teacher', ratio: 'portrait' },
        { src: '/images/gallery/educational-game-boy.jpeg', alt: 'Child playing an educational game', ratio: 'landscape' },
        { src: '/images/gallery/building-rocket.jpeg', alt: 'Child building a toy rocket', ratio: 'square' },
      ],
    },
    {
      name: 'Outdoor Fun',
      images: [
        { src: '/images/gallery/multicultural-balls.webp', alt: 'Kids playing with colorful balls', ratio: 'landscape' },
        { src: '/images/gallery/toddler-balls.webp', alt: 'Toddler playing with balls', ratio: 'landscape' },
        { src: '/images/gallery/happy-children-play.webp', alt: 'Happy children playing', ratio: 'wide' },
      ],
    },
    {
      name: 'Daily Discovery',
      images: [
        { src: '/images/gallery/play-kitchen-girl.webp', alt: 'Girl playing with a play kitchen', ratio: 'portrait' },
        { src: '/images/gallery/salesman-roleplay-boy.jpeg', alt: 'Boy role-playing at a pretend register', ratio: 'square' },
        { src: '/images/gallery/pilot-costume-boys.webp', alt: 'Boys in pilot costumes having fun', ratio: 'landscape' },
        { src: '/images/gallery/girl-with-train.webp', alt: 'Adorable girl with a toy train', ratio: 'landscape' },
        { src: '/images/gallery/thermomosaic-kid.webp', alt: 'Kid playing with thermomosaic', ratio: 'square' },
        { src: '/images/gallery/baby-cereal-toys.jpeg', alt: 'Baby playing with cereal and toy figures', ratio: 'square' },
      ],
    },
    {
      name: 'Happy Connections',
      images: [
        { src: '/images/gallery/nursery-group.webp', alt: 'Nursery school children playing together', ratio: 'portrait' },
        { src: '/images/gallery/cheerful-kids-floor.jpeg', alt: 'Cheerful kids lying on the floor having fun', ratio: 'landscape' },
        { src: '/images/gallery/mother-son-art.webp', alt: 'Mother teaching her little son painting', ratio: 'portrait' },
        { src: '/images/gallery/woman-with-child-1.webp', alt: 'Caregiver with child', ratio: 'square' },
        { src: '/images/gallery/woman-with-child-2.webp', alt: 'Caregiver playing with a smiling child', ratio: 'square' },
      ],
    },
    {
      name: 'Growing Confidence',
      images: [
        { src: '/images/gallery/happy-girl-smiling.webp', alt: 'Happy girl smiling', ratio: 'square' },
        { src: '/images/gallery/smiling-child.jpeg', alt: 'Smiling child', ratio: 'square' },
        { src: '/images/gallery/curly-hair-girl.jpeg', alt: 'Smiling girl with curly hair', ratio: 'portrait' },
        { src: '/images/gallery/cheerful-girl-playing.jpeg', alt: 'Cheerful little girl playing', ratio: 'landscape' },
        { src: '/images/gallery/emotion-learning.webp', alt: 'Learning emotions with emoticons', ratio: 'landscape' },
      ],
    },
  ],
}

/** Merge profundo: o que o admin salvou sobrepõe os defaults; o resto usa o padrão. */
export function mergeContent(
  base: unknown,
  override: unknown,
): EditableContent {
  if (!override || typeof override !== 'object') return base as EditableContent
  const baseObj = (base && typeof base === 'object' ? base : {}) as Record<string, unknown>
  const out: Record<string, unknown> = { ...baseObj }
  for (const [k, v] of Object.entries(override as Record<string, unknown>)) {
    const b = out[k]
    if (Array.isArray(v)) {
      out[k] = v
    } else if (v && typeof v === 'object' && b && typeof b === 'object' && !Array.isArray(b)) {
      out[k] = mergeContent(b, v)
    } else if (v !== undefined) {
      out[k] = v
    }
  }
  return out as EditableContent
}

/** Deriva o objeto no formato SITE a partir do conteúdo editável. */
export function siteFromContent(c: EditableContent) {
  const addr = `${c.contact.addressStreet}, ${c.contact.addressCity}`
  const query = encodeURIComponent(`${c.contact.addressStreet} ${c.contact.addressCity}`)
  return {
    name: c.brand.name,
    shortName: c.brand.shortName,
    tagline: c.brand.tagline,
    setting: 'warm, home-like daycare',
    phone: c.contact.phone,
    phoneHref: `tel:${c.contact.phone.replace(/[^+\d]/g, '')}`,
    email: c.contact.email,
    emailHref: `mailto:${c.contact.email}`,
    address: addr,
    addressStreet: c.contact.addressStreet,
    addressCity: c.contact.addressCity,
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${query}`,
    mapEmbedUrl: `https://www.google.com/maps?q=${query}&output=embed`,
  }
}

export type SiteInfo = ReturnType<typeof siteFromContent>
