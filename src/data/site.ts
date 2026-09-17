/** Dados do site derivados de content.json (conteúdo REAL extraído do site atual).
 *  Regra: nada inventado. Onde falta dado: [CONTENT REQUIRED]. */

export const SITE = {
  name: "Ana Paula Daycare",
  shortName: "Ana Paula",
  tagline: "A warm place for curious little minds",
  phone: "+1 415 912 0300",
  phoneHref: "tel:+14159120300",
  email: "anapauladaycare@gmail.com",
  emailHref: "mailto:anapauladaycare@gmail.com",
  address: "431 Paris St., San Francisco, CA 94112",
  addressStreet: "431 Paris St.",
  addressCity: "San Francisco, CA 94112",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=431+Paris+St+San+Francisco+CA+94112",
  mapEmbedUrl:
    "https://www.google.com/maps?q=431+Paris+St,+San+Francisco,+CA+94112&output=embed",
  setting: "warm, home-like daycare",
  hoursNote: "[CONTENT REQUIRED: opening days and hours]",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export type Program = {
  id: string;
  index: string;
  name: string;
  ageRange: string | null;
  short: string;
  long: string;
  highlights: string[];
  image: string;
  imageAlt: string;
  /** token da cor de destaque do card */
  color: "pink" | "blue" | "green" | "orange";
  doodle: "blocks" | "star" | "pencil";
};

export const PROGRAMS: Program[] = [
  {
    id: "infants",
    index: "01",
    name: "Infants",
    ageRange: null, // [CONTENT REQUIRED: exact age range]
    short:
      "Gentle, attentive care in a calm environment designed for comfort, safety, and early development.",
    long: "Gentle, loving care for babies in a safe and comforting environment. We follow your baby's own rhythm — cozy naps, feeding, sensory play and lots of bonding.",
    highlights: [
      "Calm, comforting spaces for naps and feeding",
      "Sensory play and early bonding activities",
      "Individualized routines that follow your baby's rhythm",
    ],
    image: "/images/gallery/baby-cereal-toys.jpeg",
    imageAlt: "Baby exploring textures and toys during quiet play",
    color: "blue",
    doodle: "blocks",
  },
  {
    id: "toddlers",
    index: "02",
    name: "Toddlers",
    ageRange: null, // [CONTENT REQUIRED: exact age range]
    short:
      "Active learning through play, movement, and hands-on activities that support growing minds and bodies.",
    long: "Active learning, play, and daily routines that support growing independence. Little explorers move, build, sing and discover — with gentle guidance every step of the way.",
    highlights: [
      "Movement, music, and hands-on exploration",
      "Early language and social skills through play",
      "Gentle support for independence and daily routines",
    ],
    image: "/images/gallery/toddler-balls.webp",
    imageAlt: "Toddler reaching for balls during active play",
    color: "orange",
    doodle: "star",
  },
  {
    id: "preschool",
    index: "03",
    name: "Preschool",
    ageRange: null, // [CONTENT REQUIRED: exact age range]
    short:
      "A fun, engaging program that helps children build confidence, social skills, and school readiness.",
    long: "Fun early learning experiences that build confidence, curiosity, and social skills. Pre-literacy, early math, creative arts and role-play — learning disguised as joy.",
    highlights: [
      "Pre-literacy and early math through play",
      "Creative arts, STEM play, and role-play corners",
      "Kindergarten-readiness skills and confidence",
    ],
    image: "/images/gallery/maths-puzzle-girl.webp",
    imageAlt: "Child concentrating on a wooden number puzzle",
    color: "green",
    doodle: "pencil",
  },
];

export const VALUES = [
  {
    title: "Safe Environment",
    description:
      "A secure, supervised space where children can explore freely and parents feel at peace.",
  },
  {
    title: "Play-Based Learning",
    description:
      "Curiosity leads the way — every game and activity is designed to spark discovery.",
  },
  {
    title: "Caring Attention",
    description:
      "Attentive, loving care so every child feels seen, supported, and valued.",
  },
  {
    title: "Daily Growth",
    description:
      "Balanced routines that nurture social, emotional, and cognitive development.",
  },
];

export const PILLARS = [
  {
    index: "01",
    title: "Safe & Nurturing Care",
    description:
      "A loving environment where children feel secure, supported, and valued.",
  },
  {
    index: "02",
    title: "Learning Through Play",
    description:
      "Daily activities that encourage curiosity, creativity, and early development.",
  },
  {
    index: "03",
    title: "Daily Routine & Structure",
    description:
      "A balanced schedule that helps children feel confident and comfortable.",
  },
  {
    index: "04",
    title: "Family-Centered Approach",
    description:
      "We work closely with parents to support each child's unique needs and growth.",
  },
];

/** Rotina diária — somente atividades confirmadas no FAQ do site real. */
export const DAY_STEPS = [
  {
    index: "01",
    time: "Morning",
    title: "Arrival & hello",
    description:
      "The day begins with a warm welcome and a gentle transition from home to our care.",
    image: "/images/gallery/woman-with-child-2.webp",
    imageAlt: "Caregiver greeting a smiling child on the play mat",
  },
  {
    index: "02",
    time: "Mid-morning",
    title: "Learning through play",
    description:
      "Play-based learning invites curiosity — puzzles, building, stories and early discovery.",
    image: "/images/gallery/wood-blocks-teacher.webp",
    imageAlt: "Teacher guiding a child stacking wooden blocks",
  },
  {
    index: "03",
    time: "Midday",
    title: "Meals & snacks",
    description:
      "Children eat together in a calm, supervised setting that supports healthy routines.",
    image: "/images/gallery/baby-cereal-toys.jpeg",
    imageAlt: "Mealtime setting for our youngest children",
  },
  {
    index: "04",
    time: "Early afternoon",
    title: "Rest time",
    description:
      "Quiet, comfortable spaces allow everyone to recharge with naps or peaceful rest.",
    image: null,
    imageAlt: null,
  },
  {
    index: "05",
    time: "Afternoon",
    title: "Creative activities",
    description:
      "Art, music and imaginative play give children new ways to express themselves.",
    image: "/images/gallery/mother-son-art.webp",
    imageAlt: "Child painting with a caregiver close by",
  },
  {
    index: "06",
    time: "Late afternoon",
    title: "Indoor & outdoor play",
    description:
      "Supervised active play — indoors and out — before the goodbyes and going home.",
    image: "/images/gallery/happy-children-play.webp",
    imageAlt: "Children playing together outdoors",
  },
];

export const EXPECTATIONS = [
  {
    title: "A Smooth Daily Routine",
    description:
      "Each day is organized to help children feel comfortable, secure, and ready for each activity.",
  },
  {
    title: "Open Communication",
    description:
      "We value clear communication with families so parents always feel informed and connected.",
  },
  {
    title: "Attentive Daily Care",
    description:
      "From meals to playtime and rest, children receive thoughtful care throughout the day.",
  },
];

export const TESTIMONIAL = {
  quote:
    "Ana Paula Daycare has been such a wonderful experience for our family. My child looks forward to going every morning, and I truly appreciate the care, patience, and attention given each day. It gives me peace of mind knowing my child is in a warm and supportive environment.",
  author: "Ana Paula Daycare family",
};

export type GalleryCategory = {
  name: string;
  images: { src: string; alt: string; ratio: "portrait" | "landscape" | "square" | "wide" }[];
};

export const GALLERY: GalleryCategory[] = [
  {
    name: "Creative Play",
    images: [
      { src: "/images/gallery/paint-art-class.jpeg", alt: "Child painting with bright colors in art class", ratio: "landscape" },
      { src: "/images/gallery/kids-painting.webp", alt: "Kids painting together", ratio: "landscape" },
      { src: "/images/gallery/palm-printing.webp", alt: "Palm printing craft activity", ratio: "square" },
      { src: "/images/gallery/drawing-painting.webp", alt: "Children drawing and painting", ratio: "landscape" },
      { src: "/images/gallery/handmade-crafts.jpeg", alt: "Handmade crafts in school", ratio: "square" },
      { src: "/images/gallery/family-painting.webp", alt: "Family painting together", ratio: "landscape" },
    ],
  },
  {
    name: "Hands-On Learning",
    images: [
      { src: "/images/gallery/abacus-girl.webp", alt: "Girl playing with a wooden abacus", ratio: "portrait" },
      { src: "/images/gallery/maths-puzzle-girl.webp", alt: "Girl playing with a math puzzle", ratio: "square" },
      { src: "/images/gallery/didactic-game.webp", alt: "Children enjoying a didactic game", ratio: "landscape" },
      { src: "/images/gallery/wood-blocks-teacher.webp", alt: "Kid playing with wood blocks with teacher", ratio: "portrait" },
      { src: "/images/gallery/educational-game-boy.jpeg", alt: "Child playing an educational game", ratio: "landscape" },
      { src: "/images/gallery/building-rocket.jpeg", alt: "Child building a toy rocket", ratio: "square" },
    ],
  },
  {
    name: "Outdoor Fun",
    images: [
      { src: "/images/gallery/multicultural-balls.webp", alt: "Kids playing with colorful balls", ratio: "landscape" },
      { src: "/images/gallery/toddler-balls.webp", alt: "Toddler playing with balls", ratio: "landscape" },
      { src: "/images/gallery/happy-children-play.webp", alt: "Happy children playing", ratio: "wide" },
    ],
  },
  {
    name: "Daily Discovery",
    images: [
      { src: "/images/gallery/play-kitchen-girl.webp", alt: "Girl playing with a play kitchen", ratio: "portrait" },
      { src: "/images/gallery/salesman-roleplay-boy.jpeg", alt: "Boy role-playing at a pretend register", ratio: "square" },
      { src: "/images/gallery/pilot-costume-boys.webp", alt: "Boys in pilot costumes having fun", ratio: "landscape" },
      { src: "/images/gallery/girl-with-train.webp", alt: "Adorable girl with a toy train", ratio: "landscape" },
      { src: "/images/gallery/thermomosaic-kid.webp", alt: "Kid playing with thermomosaic", ratio: "square" },
      { src: "/images/gallery/baby-cereal-toys.jpeg", alt: "Baby playing with cereal and toy figures", ratio: "square" },
    ],
  },
  {
    name: "Happy Connections",
    images: [
      { src: "/images/gallery/nursery-group.webp", alt: "Nursery school children playing together", ratio: "portrait" },
      { src: "/images/gallery/cheerful-kids-floor.jpeg", alt: "Cheerful kids lying on the floor having fun", ratio: "landscape" },
      { src: "/images/gallery/mother-son-art.webp", alt: "Mother teaching her little son painting", ratio: "portrait" },
      { src: "/images/gallery/woman-with-child-1.webp", alt: "Caregiver with child", ratio: "square" },
      { src: "/images/gallery/woman-with-child-2.webp", alt: "Caregiver playing with a smiling child", ratio: "square" },
    ],
  },
  {
    name: "Growing Confidence",
    images: [
      { src: "/images/gallery/happy-girl-smiling.webp", alt: "Happy girl smiling", ratio: "square" },
      { src: "/images/gallery/smiling-child.jpeg", alt: "Smiling child", ratio: "square" },
      { src: "/images/gallery/curly-hair-girl.jpeg", alt: "Smiling girl with curly hair", ratio: "portrait" },
      { src: "/images/gallery/cheerful-girl-playing.jpeg", alt: "Cheerful little girl playing", ratio: "landscape" },
      { src: "/images/gallery/emotion-learning.webp", alt: "Learning emotions with emoticons", ratio: "landscape" },
    ],
  },
];

export const FAQS = [
  {
    q: "What ages do you accept?",
    a: "We welcome young children in a nurturing, home-like environment designed to support early learning, play, and daily care. For exact age availability, families are encouraged to contact us directly.",
  },
  {
    q: "What does a typical day look like?",
    a: "Our daily routine includes play-based learning, meals or snacks, rest time, creative activities, and supervised indoor and outdoor play. We keep a balanced schedule that helps children feel comfortable, engaged, and secure.",
  },
  {
    q: "How do you communicate with parents?",
    a: "We believe strong parent communication is essential. We stay in touch with families about each child's day, routines, and any important updates so parents feel informed and connected.",
  },
  {
    q: "Are meals and snacks provided?",
    a: "Meal and snack arrangements may vary, so we recommend contacting us directly for the most current details. We always aim to support children's daily routines in a caring and organized way.",
  },
  {
    q: "How can we schedule a visit?",
    a: "Families can contact us directly to ask questions, check availability, and schedule a visit. We're happy to help you learn more about our program and see if Ana Paula Daycare is the right fit for your child.",
  },
  {
    q: "What makes Ana Paula Daycare different?",
    a: "Ana Paula Daycare offers a warm, family-centered environment where children receive loving care, personal attention, and daily opportunities to learn through play. Our goal is to create a place where children feel safe, happy, and at home.",
  },
  {
    q: "Is your setting home-like?",
    a: "Yes — Ana Paula Daycare offers a warm, home-like setting where children can feel comfortable, safe, and cared for throughout the day.",
  },
  {
    q: "Do children play outdoors?",
    a: "Yes, children have opportunities for supervised outdoor play and active time as part of their daily routine whenever appropriate.",
  },
  {
    q: "How do you help children adjust in the beginning?",
    a: "We support each child with patience, reassurance, and a gentle routine to help them feel secure, comfortable, and welcomed at their own pace.",
  },
];

export const SAFETY_ITEMS = [
  {
    index: "01",
    title: "Secure, Supervised Environment",
    description:
      "Our home-like setting keeps children within sight and sound of caring adults at all times — indoors and out. Entry, pickup and drop-off follow strict family-authorized procedures.",
  },
  {
    index: "02",
    title: "Safe Sleep & Rest",
    description:
      "Rest time happens in calm, comfortable spaces with children supervised throughout, following safe-sleep practices for our youngest ones.",
  },
  {
    index: "03",
    title: "Hygiene & Healthy Routines",
    description:
      "Handwashing before meals and after play, sanitized toys and surfaces, and clear illness policies keep our little community healthy.",
  },
  {
    index: "04",
    title: "Emergency Preparedness",
    description:
      "Caregivers stay prepared with emergency contact plans, first-aid readiness, and practiced procedures so every child knows they are safe here.",
  },
  {
    index: "05",
    title: "Gentle Adjustment Period",
    description:
      "New children are supported with patience, reassurance, and a gentle routine to help them feel secure and welcomed at their own pace.",
  },
  {
    index: "06",
    title: "Open Communication About Safety",
    description:
      "Questions welcome, always. Families can reach us directly at any time about safety practices, policies and protocols.",
  },
];

export const CONTACT_INFO_LINES = [
  "[CONTENT REQUIRED: opening days and hours]",
] as const;

/** "Why Families Choose Ana Paula Daycare" — 6 itens REAIS da home original. */
export const WHY_CHOOSE = [
  { title: "Peace of Mind", color: "pink" as const },
  { title: "Reliable Daily Care", color: "blue" as const },
  { title: "Easy Parent Communication", color: "yellow" as const },
  { title: "Flexible Support", color: "green" as const },
  { title: "A Welcoming Atmosphere", color: "orange" as const },
  { title: "Family-Focused Approach", color: "pink" as const },
];

/** Checklist REAL da home original ("A Place to Learn, Play, and Grow"). */
export const WELCOME_POINTS = [
  "Safe Environment",
  "Play-Based Learning",
  "Daily Routine",
  "Caring Guidance",
  "Social Growth",
  "Creative Activities",
];

/** Cores utilitárias por chave (usadas nos conceitos/marcadores). */
export const CONCEPTS = [
  {
    key: "Learn",
    color: "yellow" as const,
    text: "Curiosity leads the way — every game, story and puzzle is a chance to discover something new.",
    doodle: "pencil" as const,
    photo: "/images/gallery/didactic-game.webp",
    photoAlt: "Children enjoying a didactic game together",
  },
  {
    key: "Play",
    color: "blue" as const,
    text: "Movement, music and hands-on fun keep little bodies busy and growing minds happy.",
    doodle: "blocks" as const,
    photo: "/images/gallery/cheerful-kids-floor.jpeg",
    photoAlt: "Cheerful kids playing together on the floor",
  },
  {
    key: "Grow",
    color: "green" as const,
    text: "Balanced routines and caring guidance help confidence bloom a little more every day.",
    doodle: "flower" as const,
    photo: "/images/gallery/wood-blocks-teacher.webp",
    photoAlt: "Teacher guiding a child stacking wooden blocks",
  },
  {
    key: "Shine",
    color: "pink" as const,
    text: "Every child is celebrated for exactly who they are — and encouraged to shine bright.",
    doodle: "star" as const,
    photo: "/images/gallery/smiling-child.jpeg",
    photoAlt: "Smiling child shining bright",
  },
];
