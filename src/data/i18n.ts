/** i18n — Inglês (padrão) · Español · Português.
 *  Estratégia: dicionário indexado pela string original em inglês.
 *  `t('Schedule a Visit')` devolve a tradução do idioma ativo; se não houver,
 *  devolve o próprio texto (inglês). Zero risco de strings faltando quebrarem a UI. */

export type Lang = 'en' | 'es' | 'pt'

export const LANGS: { code: Lang; label: string; short: string }[] = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'es', label: 'Español', short: 'ES' },
  { code: 'pt', label: 'Português', short: 'PT' },
]

export const LANG_LOCALE: Record<Lang, string> = { en: 'en-US', es: 'es-ES', pt: 'pt-BR' }

const ES: Record<string, string> = {
  // Nav / comuns
  'Home': 'Inicio',
  'About': 'Nosotros',
  'Programs': 'Programas',
  'Gallery': 'Galería',
  'Blog': 'Blog',
  'Contact': 'Contacto',
  'Schedule a Visit': 'Agende una visita',
  'Schedule a visit': 'Agendar una visita',
  'Schedule': 'Agendar',
  'Explore Programs': 'Ver programas',
  'More about us': 'Conózcanos',
  'See our programs': 'Ver nuestros programas',
  'All programs': 'Todos los programas',
  'Learn more': 'Saber más',
  'Learn more about {name}': 'Conozca más sobre {name}',
  'Ask about {name} openings': 'Pregunte por cupos en {name}',
  'Quiz': 'Test',
  'Open the gallery': 'Abrir la galería',
  'Ask about enrollment': 'Consultar inscripción',
  'Get directions': 'Cómo llegar',
  'Admin': 'Admin',
  'Find the right care': 'Encuentre el cuidado ideal',
  'Contact us': 'Contáctenos',
  'Write to us': 'Escríbanos',
  'Call {phone}': 'Llame al {phone}',
  'Call us': 'Llámenos',
  'Back to home': 'Volver al inicio',

  // Hero
  'Home-like daycare · San Francisco': 'Daycare como hogar · San Francisco',
  'A Safe, Happy Place': 'Un Lugar Seguro y Feliz',
  'to Learn and Grow.': 'para Aprender y Crecer.',
  'At Ana Paula Daycare, little ones feel safe, supported, and excited to explore each day — through play, learning, and attentive care.':
    'En Ana Paula Daycare, los pequeños se sienten seguros, acompañados y entusiasmados por explorar cada día — a través del juego, el aprendizaje y una atención atenta.',
  'Morning play · our learning corner': 'Juego de la mañana · nuestro rincón de aprendizaje',

  // Lema
  'Learn': 'Aprender',
  'Play': 'Jugar',
  'Grow': 'Crecer',
  'Shine': 'Brillar',
  'Learn · Play · Grow · Shine': 'Aprender · Jugar · Crecer · Brillar',

  // Conceitos
  "What we're all about": 'Lo que nos inspira',
  'Learn. Play. Grow.': 'Aprender. Jugar. Crecer.',
  'Shine.': 'Brillar.',
  'Curiosity leads the way — every game, story and puzzle is a chance to discover something new.':
    'La curiosidad guía el camino — cada juego, historia y rompecabezas es una oportunidad para descubrir algo nuevo.',
  'Movement, music and hands-on fun keep little bodies busy and growing minds happy.':
    'Movimiento, música y diversión práctica mantienen activos los cuerpecitos y felices las mentes en crecimiento.',
  'Balanced routines and caring guidance help confidence bloom a little more every day.':
    'Rutinas equilibradas y una guía cariñosa ayudan a que la confianza florezca un poco más cada día.',
  'Every child is celebrated for exactly who they are — and encouraged to shine bright.':
    'Cada niño es celebrado tal como es — y animado a brillar con luz propia.',

  // Welcome
  'Welcome to Ana Paula': 'Bienvenidos a Ana Paula',
  'A Nurturing Start': 'Un Comienzo Tierno',
  'for Every Child': 'para Cada Niño',
  'We create a safe, caring space where children can learn, play, and grow with confidence. Our daily routine encourages curiosity, social development, and joyful early learning — every single day.':
    'Creamos un espacio seguro y afectuoso donde los niños pueden aprender, jugar y crecer con confianza. Nuestra rutina diaria fomenta la curiosidad, el desarrollo social y un aprendizaje temprano lleno de alegría — todos los días.',
  'Safe Environment': 'Ambiente seguro',
  'Play-Based Learning': 'Aprendizaje mediante el juego',
  'Daily Routine': 'Rutina diaria',
  'Caring Guidance': 'Guía cariñosa',
  'Social Growth': 'Desarrollo social',
  'Creative Activities': 'Actividades creativas',

  // Programas (sección)
  'Programs · Infants · Toddlers · Preschool': 'Programas · Bebés · Niños pequeños · Preescolar',
  'The right care': 'El cuidado adecuado',
  'for every stage.': 'para cada etapa.',
  'Program': 'Programa',
  'Not sure which one fits?': '¿No sabe cuál es el ideal?',
  'Take our 2-minute quiz and find out.': 'Haga nuestro test de 2 minutos y descúbralo.',
  'Infants': 'Bebés',
  'Toddlers': 'Niños pequeños',
  'Preschool': 'Preescolar',
  'Gentle, attentive care in a calm environment designed for comfort, safety, and early development.':
    'Cuidado atento y suave en un ambiente tranquilo, pensado para la comodidad, la seguridad y el desarrollo temprano.',
  'Gentle, loving care for babies in a safe and comforting environment. We follow your baby\'s own rhythm — cozy naps, feeding, sensory play and lots of bonding.':
    'Cuidado tierno y amoroso para los bebés en un ambiente seguro y reconfortante. Seguimos el ritmo de su bebé — siestas acogedoras, alimentación, juego sensorial y muchos momentos de conexión.',
  'Calm, comforting spaces for naps and feeding': 'Espacios tranquilos y reconfortantes para dormir y alimentarse',
  'Sensory play and early bonding activities': 'Juego sensorial y actividades de conexión temprana',
  'Individualized routines that follow your baby\'s rhythm': 'Rutinas individualizadas que siguen el ritmo de su bebé',
  'Active learning through play, movement, and hands-on activities that support growing minds and bodies.':
    'Aprendizaje activo mediante el juego, el movimiento y actividades prácticas que estimulan mentes y cuerpos en crecimiento.',
  'Active learning, play, and daily routines that support growing independence. Little explorers move, build, sing and discover — with gentle guidance every step of the way.':
    'Aprendizaje activo, juego y rutinas diarias que impulsan la independencia. Los pequeños exploradores se mueven, construyen, cantan y descubren — con una guía suave en cada paso.',
  'Movement, music, and hands-on exploration': 'Movimiento, música y exploración práctica',
  'Early language and social skills through play': 'Lenguaje temprano y habilidades sociales mediante el juego',
  'Gentle support for independence and daily routines': 'Apoyo suave para la independencia y las rutinas diarias',
  'A fun, engaging program that helps children build confidence, social skills, and school readiness.':
    'Un programa divertido y envolvente que ayuda a los niños a desarrollar confianza, habilidades sociales y preparación escolar.',
  'Fun early learning experiences that build confidence, curiosity, and social skills. Pre-literacy, early math, creative arts and role-play — learning disguised as joy.':
    'Experiencias tempranas de aprendizaje que desarrollan confianza, curiosidad y habilidades sociales. Pre-lectura, matemáticas iniciales, artes creativas y juego de roles — aprendizaje disfrazado de alegría.',
  'Pre-literacy and early math through play': 'Pre-lectura y matemáticas iniciales mediante el juego',
  'Creative arts, STEM play, and role-play corners': 'Artes creativas, juego STEM y rincones de juego de roles',
  'Kindergarten-readiness skills and confidence': 'Habilidades y confianza para el kindergarten',
  '[CONTENT REQUIRED: exact age range]': '[CONTENIDO REQUERIDO: rango de edad exacto]',

  // Little Moments
  'A day full of little discoveries': 'Un día lleno de pequeños descubrimientos',
  'Little Moments,': 'Pequeños Momentos,',
  'Big Discoveries.': 'Grandes Descubrimientos.',
  'Every day follows a gentle rhythm — play, meals, rest, and lots of discovery in between. Here is how our days unfold.':
    'Cada día sigue un ritmo suave — juego, comidas, descanso y muchos descubrimientos en medio. Así se desenvuelven nuestros días.',
  'Morning': 'Mañana',
  'Mid-morning': 'Media mañana',
  'Midday': 'Mediodía',
  'Early afternoon': 'Inicio de la tarde',
  'Afternoon': 'Tarde',
  'Late afternoon': 'Final de la tarde',
  'Arrival & hello': 'Llegada y saludo',
  'The day begins with a warm welcome and a gentle transition from home to our care.':
    'El día comienza con una cálida bienvenida y una transición suave del hogar a nuestro cuidado.',
  'Learning through play': 'Aprendizaje mediante el juego',
  'Play-based learning invites curiosity — puzzles, building, stories and early discovery.':
    'El aprendizaje lúdico invita a la curiosidad — rompecabezas, construcción, cuentos y descubrimiento temprano.',
  'Meals & snacks': 'Comidas y meriendas',
  'Children eat together in a calm, supervised setting that supports healthy routines.':
    'Los niños comen juntos en un ambiente tranquilo y supervisado que fomenta rutinas saludables.',
  'Rest time': 'Hora del descanso',
  'Quiet, comfortable spaces allow everyone to recharge with naps or peaceful rest.':
    'Espacios tranquilos y cómodos permiten a todos recargar energías con siestas o descanso apacible.',
  'Creative activities': 'Actividades creativas',
  'Art, music and imaginative play give children new ways to express themselves.':
    'El arte, la música y el juego imaginativo dan a los niños nuevas formas de expresarse.',
  'Indoor & outdoor play': 'Juego bajo techo y al aire libre',
  'Supervised active play — indoors and out — before the goodbyes and going home.':
    'Juego activo supervisado — bajo techo y al aire libre — antes de las despedidas y el regreso a casa.',

  // Galeria (seção)
  'Moments we share every day': 'Momentos que compartimos cada día',
  'Our little wall': 'Nuestro pequeño muro',
  'of happy days.': 'de días felices.',

  // Why Families
  'Peace of mind for parents': 'Tranquilidad para los padres',
  'Why Families Love': 'Por Qué las Familias Amen',
  'Our Daycare': 'Nuestro Daycare',
  'Peace of Mind': 'Tranquilidad',
  'Reliable Daily Care': 'Cuidado diario confiable',
  'Easy Parent Communication': 'Comunicación fácil con los padres',
  'Flexible Support': 'Apoyo flexible',
  'A Welcoming Atmosphere': 'Un ambiente acogedor',
  'Family-Focused Approach': 'Enfoque centrado en la familia',

  // Safety strip
  'Safe hands,': 'Manos seguras,',
  'happy hearts.': 'corazones felices.',
  'Supervised spaces, careful routines and open communication — the everyday details that keep children safe and parents at ease.':
    'Espacios supervisados, rutinas cuidadosas y comunicación abierta — los detalles cotidianos que mantienen a los niños seguros y a los padres tranquilos.',
  'Read our safety approach': 'Conozca nuestro enfoque de seguridad',
  'Secure, Supervised Environment': 'Ambiente seguro y supervisado',
  'Safe Sleep & Rest': 'Sueño y descanso seguros',
  'Hygiene & Healthy Routines': 'Higiene y rutinas saludables',
  'Emergency Preparedness': 'Preparación ante emergencias',
  'Gentle Adjustment Period': 'Período de adaptación suave',
  'Open Communication About Safety': 'Comunicación abierta sobre seguridad',

  // Depoimento
  'Ana Paula Daycare family': 'Familia de Ana Paula Daycare',
  'Ana Paula Daycare has been such a wonderful experience for our family. My child looks forward to going every morning, and I truly appreciate the care, patience, and attention given each day. It gives me peace of mind knowing my child is in a warm and supportive environment.':
    'Ana Paula Daycare ha sido una experiencia maravillosa para nuestra familia. Mi hijo espera con ansias ir cada mañana, y aprecio de verdad el cuidado, la paciencia y la atención de cada día. Me da tranquilidad saber que mi hijo está en un ambiente cálido y apoyador.',

  // FAQ
  'Answers for parents': 'Respuestas para los padres',
  'Ask us anything.': 'Pregúntenos lo que quiera.',
  'Really!': '¡En serio!',
  'If your question isn\'t answered here, call or write — we love talking with families.':
    'Si su pregunta no está respondida aquí, llame o escriba — nos encanta hablar con las familias.',
  'What ages do you accept?': '¿Qué edades aceptan?',
  'We welcome young children in a nurturing, home-like environment designed to support early learning, play, and daily care. For exact age availability, families are encouraged to contact us directly.':
    'Recibimos niños pequeños en un ambiente acogedor, como de hogar, pensado para apoyar el aprendizaje temprano, el juego y el cuidado diario. Para conocer la disponibilidad exacta de edades, les sugerimos contactarnos directamente.',
  'What does a typical day look like?': '¿Cómo es un día típico?',
  'Our daily routine includes play-based learning, meals or snacks, rest time, creative activities, and supervised indoor and outdoor play. We keep a balanced schedule that helps children feel comfortable, engaged, and secure.':
    'Nuestra rutina diaria incluye aprendizaje mediante el juego, comidas o meriendas, tiempo de descanso, actividades creativas y juego supervisado bajo techo y al aire libre. Mantenemos un horario equilibrado que ayuda a los niños a sentirse cómodos, entretenidos y seguros.',
  'How do you communicate with parents?': '¿Cómo se comunican con los padres?',
  'We believe strong parent communication is essential. We stay in touch with families about each child\'s day, routines, and any important updates so parents feel informed and connected.':
    'Creemos que la comunicación con los padres es esencial. Mantenemos contacto con las familias sobre el día de cada niño, sus rutinas y cualquier novedad importante, para que los padres se sientan informados y conectados.',
  'Are meals and snacks provided?': '¿Proporcionan comidas y meriendas?',
  'Meal and snack arrangements may vary, so we recommend contacting us directly for the most current details. We always aim to support children\'s daily routines in a caring and organized way.':
    'Las comidas y meriendas pueden variar, así que recomendamos contactarnos directamente para conocer los detalles actuales. Siempre buscamos apoyar las rutinas diarias de los niños de manera atenta y organizada.',
  'How can we schedule a visit?': '¿Cómo podemos agendar una visita?',
  'Families can contact us directly to ask questions, check availability, and schedule a visit. We\'re happy to help you learn more about our program and see if Ana Paula Daycare is the right fit for your child.':
    'Las familias pueden contactarnos directamente para hacer preguntas, consultar disponibilidad y agendar una visita. Con gusto les ayudamos a conocer nuestro programa y a ver si Ana Paula Daycare es el lugar ideal para su hijo.',
  'What makes Ana Paula Daycare different?': '¿Qué hace diferente a Ana Paula Daycare?',
  'Ana Paula Daycare offers a warm, family-centered environment where children receive loving care, personal attention, and daily opportunities to learn through play. Our goal is to create a place where children feel safe, happy, and at home.':
    'Ana Paula Daycare ofrece un ambiente cálido y centrado en la familia, donde los niños reciben cuidado amoroso, atención personal y oportunidades diarias de aprender jugando. Nuestra meta es crear un lugar donde los niños se sientan seguros, felices y como en casa.',
  'Is your setting home-like?': '¿Su ambiente es como un hogar?',
  'Yes — Ana Paula Daycare offers a warm, home-like setting where children can feel comfortable, safe, and cared for throughout the day.':
    'Sí — Ana Paula Daycare ofrece un ambiente cálido, como de hogar, donde los niños se sienten cómodos, seguros y cuidados durante todo el día.',
  'Do children play outdoors?': '¿Los niños juegan al aire libre?',
  'Yes, children have opportunities for supervised outdoor play and active time as part of their daily routine whenever appropriate.':
    'Sí, los niños tienen oportunidades de juego al aire libre supervisado y tiempo activo como parte de su rutina diaria, siempre que sea apropiado.',
  'How do you help children adjust in the beginning?': '¿Cómo ayudan a los niños a adaptarse al inicio?',
  'We support each child with patience, reassurance, and a gentle routine to help them feel secure, comfortable, and welcomed at their own pace.':
    'Apoyamos a cada niño con paciencia, tranquilidad y una rutina suave para que se sienta seguro, cómodo y bienvenido a su propio ritmo.',

  // Location
  'Find us': 'Encuéntrenos',
  'A quiet street': 'Una calle tranquila',
  'in San Francisco.': 'en San Francisco.',

  // CTA final
  'Ready when you are': 'Listos cuando ustedes lo estén',
  'Give Your Child a Safe, Happy Place to Learn and Grow': 'Dele a su hijo un lugar seguro y feliz para aprender y crecer',

  // Footer
  'Visit us': 'Visítenos',
  'Come play and grow with us — ': 'Vengan a jugar y crecer con nosotros — ',
  'we\'d love to meet your family!': '¡nos encantaría conocer a su familia!',
  'A warm, home-like daycare in San Francisco — a safe, happy place to learn and grow.':
    'Un daycare cálido y como de hogar en San Francisco — un lugar seguro y feliz para aprender y crecer.',
  'Explore': 'Explorar',
  'Safety': 'Seguridad',
  'Enrollment': 'Inscripción',
  'Hours': 'Horarios',
  '[CONTENT REQUIRED: opening days and hours]': '[CONTENIDO REQUERIDO: días y horarios de atención]',
  'Ask about current openings when you': 'Pregunte por los cupos actuales cuando',
  'get in touch': 'se comuniquen',
  '© {year} Ana Paula Daycare · San Francisco, CA': '© {year} Ana Paula Daycare · San Francisco, CA',

  // ---- Parte 2: páginas ----

  // Contact
  'Let\'s meet': 'Vamos conocer',
  'your family.': 'a su familia.',
  'Ask questions, check availability, or schedule a visit — we\'re happy to help and quick to respond.':
    'Hagan preguntas, consulten disponibilidad o agenden una visita — con gusto los atendemos y respondemos rápido.',
  'Call or text': 'Llame o escriba',
  'Write': 'Escriba',
  'Visit': 'Visite',
  'Send us a': 'Envíenos un',
  'message': 'mensaje',
  'Your name *': 'Su nombre *',
  'Email *': 'Correo electrónico *',
  'Phone': 'Teléfono',
  'Message *': 'Mensaje *',
  'Tell us about your child, your needs, or the best days to visit…':
    'Cuéntenos sobre su hijo, sus necesidades o los mejores días para visitar…',
  'Sending…': 'Enviando…',
  'Send message': 'Enviar mensaje',
  'Your details are only used to answer your family — never shared.':
    'Sus datos solo se usan para responder a su familia — nunca se comparten.',
  'Message received —': 'Mensaje recibido —',
  'thank you!': '¡gracias!',
  'We\'ll get back to you shortly at': 'Le responderemos pronto a',
  'If it\'s urgent, call': 'Si es urgente, llame al',
  'Prefer a quick answer?': '¿Prefiere una respuesta rápida?',
  '— we usually reply the same day.': '— normalmente respondemos el mismo día.',
  'Something went wrong.': 'Algo salió mal.',

  // Enroll
  'Begin with a': 'Comience con un',
  'simple hello.': 'simple hola.',
  'Pre-register online and we\'ll reach out about availability, answer your questions, and arrange a visit — no pressure, just a conversation.':
    'Preinscríbase en línea y lo contactaremos sobre disponibilidad, responderemos sus preguntas y coordinaremos una visita — sin presión, solo una conversación.',
  'You write to us': 'Usted nos escribe',
  'Share a little about your child and the care you need.': 'Cuéntenos un poco sobre su hijo y el cuidado que necesita.',
  'We reply personally': 'Respondemos personalmente',
  'Availability, routine, pricing questions — answered honestly.': 'Disponibilidad, rutina, precios — respuestas honestas.',
  'You visit with your child': 'Nos visita con su hijo',
  'See the space, meet us, and see if it feels right.': 'Conozca el espacio, conózcanos y vea si se siente correcto.',
  'Rather talk first?': '¿Prefiere hablar primero?',
  'Pre-registration received,': '¡Preinscripción recibida,',
  'Thank you! Our team will reach out shortly with availability and next steps for your':
    '¡Gracias! Nuestro equipo lo contactará pronto con disponibilidad y próximos pasos para su',
  'For anything urgent, call': 'Para cualquier urgencia, llame al',
  'See our days in photos': 'Vea nuestros días en fotos',
  'Take the care quiz': 'Haga el test de cuidado',
  'Pre-': 'Pre',
  'registration': 'inscripción',
  'Parent/guardian name *': 'Nombre del padre/madre o tutor *',
  'Phone *': 'Teléfono *',
  'Child\'s age *': 'Edad del niño *',
  'Schedule needed *': 'Horario necesario *',
  'Anything else?': '¿Algo más?',
  'Allergies, routines, questions — anything helpful.': 'Alergias, rutinas, preguntas — cualquier dato útil.',
  'Submit pre-registration': 'Enviar preinscripción',
  'No fees, no spam — just a conversation about your family.':
    'Sin costos ni spam — solo una conversación sobre su familia.',
  '0–12 months': '0–12 meses',
  '1–2 years': '1–2 años',
  '3–5 years': '3–5 años',
  'Expecting / soon': 'Embarazada / pronto',
  'Full-time': 'Tiempo completo',
  'Part-time / half days': 'Medio tiempo / medias jornadas',
  'Flexible days': 'Días flexibles',
  'Not sure yet': 'Aún no lo sé',

  // Quiz
  'Step Age': 'Edad',
  'Step Priorities': 'Prioridades',
  'Step Schedule': 'Horario',
  'Step Experience': 'Experiencia',
  'Five questions,': 'Cinco preguntas,',
  'one honest answer.': 'una respuesta honesta.',
  'Tell us about your family and we\'ll point you to the program that fits — plus what to ask when you visit any daycare.':
    'Cuéntenos sobre su familia y le indicaremos el programa ideal — además de qué preguntar cuando visite cualquier daycare.',
  'Who is this care for?': '¿Para quién es este cuidado?',
  'So we suggest the right program.': 'Así sugerimos el programa adecuado.',
  'What matters most to you?': '¿Qué es lo más importante para usted?',
  'Choose everything that applies — we\'ll match it.': 'Elija todo lo que aplique — lo tenemos en cuenta.',
  'What schedule fits your week?': '¿Qué horario encaja con su semana?',
  'You can change this later.': 'Puede cambiarlo después.',
  'Have you visited other daycares yet?': '¿Ya visitaron otras daycares?',
  'There\'s no wrong answer here.': 'No hay respuestas incorrectas aquí.',
  'Multiple answers': 'Varias respuestas',
  'One answer': 'Una respuesta',
  'A baby': 'Un bebé',
  'A toddler': 'Un niño pequeño',
  'Preschool age': 'Edad preescolar',
  'Expecting, or almost': 'Embarazada, o casi',
  'Coming soon': 'Muy pronto',
  'Above everything else': 'Por encima de todo',
  'Safety & security': 'Seguridad y protección',
  'Learning & development': 'Aprendizaje y desarrollo',
  'Curiosity, skills, growth': 'Curiosidad, habilidades, crecimiento',
  'A flexible schedule': 'Un horario flexible',
  'Around real family life': 'Según la vida real de la familia',
  'Nutrition & meals': 'Nutrición y comidas',
  'Healthy routines': 'Rutinas saludables',
  'Warm, loving care': 'Cuidado cálido y amoroso',
  'Like a second home': 'Como un segundo hogar',
  'Friends & social skills': 'Amigos y habilidades sociales',
  'Growing together': 'Creciendo juntos',
  'Full-time care': 'Cuidado de tiempo completo',
  'Every weekday': 'Todos los días de la semana',
  'Part-time': 'Medio tiempo',
  'Half days or a few days': 'Medias jornadas o algunos días',
  'It varies': 'Varía',
  'Still deciding': 'Todavía decidiendo',
  'Yes, we have': 'Sí, ya visitamos',
  'We toured other places': 'Recorrimos otros lugares',
  'Not yet': 'Todavía no',
  'You\'d be one of our firsts': 'Serían de los primeros',
  'Where should we send your result?': '¿Dónde enviamos su resultado?',
  '← Back': '← Atrás',
  'Continue': 'Continuar',
  'See my result': 'Ver mi resultado',
  'Your information is only used to help your family — never shared, never spammed.':
    'Su información solo se usa para ayudar a su familia — nunca se comparte, nunca spam.',
  'Your result': 'Su resultado',
  'Good news,': 'Buenas noticias,',
  'friend': 'amigo',
  'Based on your answers, Ana Paula Daycare is a wonderful match for your family. Here is why — and what we suggest next.':
    'Según sus respuestas, Ana Paula Daycare es una opción maravillosa para su familia. Le contamos por qué — y qué le sugerimos a continuación.',
  'A copy was sent to': 'Enviamos una copia a',
  ', and our team received your answers — we may reach out to say hello.':
    ', y nuestro equipo recibió sus respuestas — puede que lo contactemos para saludar.',
  'Book your visit': 'Reserve su visita',
  'See programs first': 'Ver programas primero',
  'Our Infants program offers gentle, attentive care in a calm environment designed for comfort, safety, and early development.':
    'Nuestro programa de Bebés ofrece cuidado atento y suave en un ambiente tranquilo, pensado para la comodidad, la seguridad y el desarrollo temprano.',
  'Our Toddlers program offers active learning through play, movement, and hands-on activities that support growing minds and bodies.':
    'Nuestro programa de Niños pequeños ofrece aprendizaje activo mediante el juego, el movimiento y actividades prácticas que estimulan mentes y cuerpos en crecimiento.',
  'Our Preschool program is a fun, engaging space that builds confidence, social skills, and school readiness.':
    'Nuestro programa de Preescolar es un espacio divertido y envolvente que desarrolla confianza, habilidades sociales y preparación escolar.',
  'We welcome young children in a warm, home-like environment and will help you find the perfect starting point.':
    'Recibimos niños pequeños en un ambiente cálido, como de hogar, y le ayudaremos a encontrar el punto de partida perfecto.',
  'Safety comes first here: a secure, supervised setting where children can explore freely and parents feel at peace.':
    'Aquí la seguridad va primero: un ambiente seguro y supervisado donde los niños exploran con libertad y los padres están tranquilos.',
  'Play-based learning is our specialty — every game and activity is designed to spark curiosity and growth.':
    'El aprendizaje mediante el juego es nuestra especialidad — cada juego y actividad está diseñado para despertar curiosidad y crecimiento.',
  'Caring attention is at our heart: attentive, loving care so every child feels seen, supported, and valued.':
    'La atención cariñosa está en nuestro corazón: cuidado atento y amoroso para que cada niño se sienta visto, apoyado y valorado.',
  'Daily group play and shared moments help children build friendships and social confidence naturally.':
    'El juego en grupo diario y los momentos compartidos ayudan a los niños a hacer amistades y ganar confianza social de forma natural.',
  'We support children\'s daily routines — including meals and snacks — in a caring, organized way.':
    'Apoyamos las rutinas diarias de los niños — incluyendo comidas y meriendas — de manera atenta y organizada.',
  'We work closely with families on schedules that fit real life — let\'s talk about what works for you.':
    'Trabajamos de la mano con las familias en horarios que encajan con la vida real — conversemos sobre lo que funciona para usted.',
  'Our balanced daily routine — play-based learning, meals, rest, and supervised indoor and outdoor play — fits beautifully with full-time care.':
    'Nuestra rutina diaria equilibrada — aprendizaje mediante el juego, comidas, descanso y juego supervisado bajo techo y al aire libre — encaja perfectamente con el cuidado de tiempo completo.',
  'You\'ve already seen what\'s out there — come compare the warmth, communication, and happy smiles in person. We\'re confident you\'ll feel the difference!':
    'Usted ya vio lo que hay afuera — venga a comparar en persona la calidez, la comunicación y las sonrisas felices. ¡Estamos seguros de que sentirá la diferencia!',
  'Starting your search with us is a great shortcut — book a visit and see firsthand what a warm, family-centered daycare looks like.':
    'Empezar su búsqueda con nosotros es un gran atajo — reserve una visita y vea en persona cómo es una daycare cálida y centrada en la familia.',

  // Safety page
  'Safety & care': 'Seguridad y cuidado',
  'Safety lives in': 'La seguridad vive en',
  'everyday details.': 'los detalles de cada día.',
  'Trust between parents and caregivers is built on the small, consistent things: supervised spaces, careful routines, honest communication. Here is how that looks in our home every day.':
    'La confianza entre padres y cuidadores se construye con cosas pequeñas y constantes: espacios supervisados, rutinas cuidadosas y comunicación honesta. Así se ve eso en nuestro hogar cada día.',
  'Our home-like setting keeps children within sight and sound of caring adults at all times — indoors and out. Entry, pickup and drop-off follow strict family-authorized procedures.':
    'Nuestro ambiente como hogar mantiene a los niños siempre a la vista y al alcance de adultos atentos — dentro y fuera. La entrada, la recogida y la salida siguen procedimientos estrictos autorizados por la familia.',
  'Rest time happens in calm, comfortable spaces with children supervised throughout, following safe-sleep practices for our youngest ones.':
    'El descanso ocurre en espacios tranquilos y cómodos, con los niños supervisados en todo momento, siguiendo prácticas de sueño seguro para los más pequeños.',
  'Handwashing before meals and after play, sanitized toys and surfaces, and clear illness policies keep our little community healthy.':
    'El lavado de manos antes de comer y después de jugar, los juguetes y superficies desinfectados y políticas claras ante enfermedades mantienen sana a nuestra pequeña comunidad.',
  'Caregivers stay prepared with emergency contact plans, first-aid readiness, and practiced procedures so every child knows they are safe here.':
    'Los cuidadores están preparados con planes de contacto de emergencia, primeros auxilios y procedimientos practicados, para que cada niño sepa que está seguro aquí.',
  'New children are supported with patience, reassurance, and a gentle routine to help them feel secure and welcomed at their own pace.':
    'Los niños nuevos reciben apoyo con paciencia, tranquilidad y una rutina suave, para que se sientan seguros y bienvenidos a su propio ritmo.',
  'Questions welcome, always. Families can reach us directly at any time about safety practices, policies and protocols.':
    'Las preguntas son siempre bienvenidas. Las familias pueden contactarnos en cualquier momento sobre prácticas, políticas y protocolos de seguridad.',
  'Questions about a policy or procedure?': '¿Preguntas sobre una política o procedimiento?',
  'Ask us — always welcome.': 'Pregúntenos — siempre son bienvenidas.',

  // Gallery page
  'Moments We': 'Momentos Que',
  'Share': 'Compartimos',
  'Every Day': 'Cada Día',
  'Unposed moments from real days — painting hands, busy puzzles, outdoor air and quiet concentration.':
    'Momentos espontáneos de días reales — manos que pintan, rompecabezas, aire libre y concentración tranquila.',
  'All': 'Todas',
  'Creative Play': 'Juego creativo',
  'Hands-On Learning': 'Aprendizaje práctico',
  'Outdoor Fun': 'Diversión al aire libre',
  'Daily Discovery': 'Descubrimiento diario',
  'Happy Connections': 'Conexiones felices',
  'Growing Confidence': 'Confianza que crece',

  // Blog
  'Notes on raising': 'Notas sobre criar',
  'little humans.': 'pequeños humanos.',
  'Practical guidance on daycare readiness, routines, nutrition and development — written by people who care for little ones every day.':
    'Orientación práctica sobre adaptación a la daycare, rutinas, nutrición y desarrollo — escrita por personas que cuidan pequeños todos los días.',
  'Search the blog…': 'Buscar en el blog…',
  'Nothing found here.': 'No encontramos nada aquí.',
  'Try another search or category.': 'Pruebe otra búsqueda u otra categoría.',
  '{n} min read': '{n} min de lectura',
  'Read the article': 'Leer el artículo',
  'Not found': 'No encontrado',
  'This article isn\'t on our shelf': 'Este artículo no está en nuestra estantería',
  'right now.': 'en este momento.',
  '← Back to the Blog': '← Volver al blog',
  '← Blog': '← Blog',
  'Enjoyed this? Come see it': '¿Le gustó? Venga a verlo',
  'in person.': 'en persona.',

  // Chat
  'Close': 'Cerrar',
  'Hi! How can we help your family today?': '¡Hola! ¿Cómo podemos ayudar a su familia hoy?',
  'Location': 'Ubicación',
  'Write your question…': 'Escriba su pregunta…',
  'Family assistant': 'Asistente de familias',
  'Typing…': 'Escribiendo…',
  'Type your question': 'Escriba su pregunta',
  'Close chat': 'Cerrar chat',
  'Ask Ana': 'Pregunta a Ana',
  'Sorry, I couldn\'t answer that right now. Please call us at +1 415 912 0300 — we\'d love to help!':
    'Perdón, no pude responder eso ahora. ¡Llámenos al +1 415 912 0300 — con gusto los ayudamos!',
  'I couldn\'t connect just now — but our team would love to help! Call +1 415 912 0300 or email anapauladaycare@gmail.com.':
    'No pude conectarme en este momento — ¡pero nuestro equipo con gusto los ayuda! Llamen al +1 415 912 0300 o escriban a anapauladaycare@gmail.com.',

  // Sticky CTA
  'Come visit us!': '¡Ven a conocernos!',
  'New families welcome': 'Familias bienvenidas',

  // Audio player
  'Our little song': 'Nuestra canción',
  'Pause music': 'Pausar música',
  'Play music': 'Reproducir música',
  'Open music player': 'Abrir reproductor de música',
  'Close music player': 'Cerrar reproductor de música',

  // 404
  'Oops — Error 404': 'Ups — Error 404',
  'This page wandered off': 'Esta página se escapó',
  'during playtime.': 'durante el recreo.',
  'The page': 'La página',
  'doesn\'t exist — but there is plenty to discover back home.':
    'no existe — pero hay mucho por descubrir en el inicio.',

  // SEO
  'Ana Paula Daycare | Safe & Nurturing Child Care in San Francisco, CA': 'Ana Paula Daycare | Cuido seguro y afectuoso en San Francisco, CA',
  'Warm, home-like daycare in San Francisco (94112). Infant, toddler & preschool care with play-based learning. Book a visit today!':
    'Daycare cálido y como de hogar en San Francisco (94112). Cuido de bebés, niños pequeños y preescolar con aprendizaje mediante el juego. ¡Agende su visita hoy!',
  'About Us | Ana Paula Daycare — San Francisco, CA': 'Nosotros | Ana Paula Daycare — San Francisco, CA',
  'A place where little ones feel at home. Our family-centered approach, loving care and play-based philosophy.':
    'Un lugar donde los pequeños se sienten en casa. Nuestro enfoque familiar, cuidado amoroso y filosofía de aprendizaje mediante el juego.',
  'Programs: Infants, Toddlers & Preschool | Ana Paula Daycare': 'Programas: Bebés, Niños pequeños y Preescolar | Ana Paula Daycare',
  'Gentle infant care, active toddler learning and engaging preschool programs in San Francisco.':
    'Cuido suave de bebés, aprendizaje activo para niños pequeños y programas de preescolar envolventes en San Francisco.',
  'Gallery | Ana Paula Daycare — Moments We Share Every Day': 'Galería | Ana Paula Daycare — Momentos que compartimos cada día',
  'Creative play, hands-on learning, outdoor fun and daily discovery at Ana Paula Daycare.':
    'Juego creativo, aprendizaje práctico, diversión al aire libre y descubrimiento diario en Ana Paula Daycare.',
  'Parenting & Daycare Blog | Ana Paula Daycare': 'Blog para padres y sobre daycares | Ana Paula Daycare',
  'Practical tips for parents: daycare readiness, routines, nutrition and child development 0-5.':
    'Consejos prácticos para padres: adaptación a la daycare, rutinas, nutrición y desarrollo infantil 0-5.',
  'Contact & Book a Visit | Ana Paula Daycare — San Francisco': 'Contacto y reserva de visitas | Ana Paula Daycare — San Francisco',
  'Call +1 415 912 0300. 431 Paris St, San Francisco, CA 94112. Schedule your visit today!':
    'Llame al +1 415 912 0300. 431 Paris St, San Francisco, CA 94112. ¡Agende su visita hoy!',
  'Is Ana Paula Daycare Right for Your Family? | Fun 2-Minute Quiz': '¿Ana Paula Daycare es ideal para su familia? | Test divertido de 2 minutos',
  'Answer 5 quick questions and get a personalized recommendation for your child care needs.':
    'Responda 5 preguntas rápidas y reciba una recomendación personalizada para el cuido de su hijo.',
  'Safety & Protocols | Ana Paula Daycare — San Francisco': 'Seguridad y protocolos | Ana Paula Daycare — San Francisco',
  'How we keep your child safe: supervision, hygiene routines, secure pickup and emergency preparedness.':
    'Cómo mantenemos seguro a su hijo: supervisión, rutinas de higiene, recogida segura y preparación ante emergencias.',
  'Enrollment Pre-Registration | Ana Paula Daycare': 'Preinscripción | Ana Paula Daycare',
  'Start your child\'s enrollment at Ana Paula Daycare in San Francisco. Pre-register online!':
    'Comience la inscripción de su hijo en Ana Paula Daycare, San Francisco. ¡Preinscríbase en línea!',
  'Admin | Ana Paula Daycare': 'Admin | Ana Paula Daycare',

  // ---- Parte 3: chaves restantes (about, pillars, valores, galeria, programs) ----
  'About us': 'Sobre nosotros',
  'A Place Where': 'Un Lugar Donde',
  'Little Ones': 'los Pequeños',
  'Feel at Home': 'Se Sienten en Casa',
  'Ana Paula Daycare is a {setting} in San Francisco — a real home, with a real family rhythm, where a small group of children spends the day learning through play under attentive, loving care.':
    'Ana Paula Daycare es un {setting} en San Francisco — un hogar real, con un ritmo familiar real, donde un grupo pequeño de niños pasa el día aprendiendo jugando bajo un cuidado atento y amoroso.',
  'How we care': 'Cómo cuidamos',
  'Care is the': 'El cuidado es el',
  'curriculum.': 'currículo.',
  'Nothing about the day feels institutional. Children settle on the mat for stories, gather at the table for meals, explore shelves of open-ended toys, and step outside for fresh air — always within sight and sound of a caring adult.':
    'Nada del día se siente institucional. Los niños se sientan en la alfombra para los cuentos, se reúnen en la mesa para comer, exploran estantes de juguetes abiertos y salen al aire libre — siempre a la vista y al alcance de un adulto atento.',
  'We work closely with parents, sharing the little details of each day. That partnership is what makes an unfamiliar place feel like a second home — for children':
    'Trabajamos de la mano con los padres, compartiendo los pequeños detalles de cada día. Esa alianza es lo que hace que un lugar desconocido se sienta como un segundo hogar — para los niños',
  'and': 'y',
  'for their families.': 'y para sus familias.',
  'Moments': 'Momentos',
  'Little Steps,': 'Pequeños Pasos,',
  'Big Growth': 'Gran Crecimiento',
  'What guides our care': 'Lo que guía nuestro cuidado',
  'What We': 'Lo Que',
  'Value': 'Valoramos',
  'What families can expect': 'Lo que las familias pueden esperar',
  'Sound like the right place': '¿Suena como el lugar indicado',
  'for your child?': 'para su hijo?',
  'Care that grows': 'Un cuidado que crece',
  'with the child.': 'con el niño.',
  'Three programs, one philosophy: gentle attention and play-based learning, matched to each stage of early childhood.':
    'Tres programas, una filosofía: atención suave y aprendizaje mediante el juego, adaptados a cada etapa de la primera infancia.',
  'Not sure which program fits?': '¿No sabe qué programa es el ideal?',
  "We'll figure it out together.": 'Lo descubriremos juntos.',
  'Take the 2-minute quiz': 'Haga el test de 2 minutos',
  'Open photo: {alt}': 'Abrir foto: {alt}',
  'See this moment in the gallery: {alt}': 'Vea este momento en la galería: {alt}',
  'Close gallery': 'Cerrar galería',
  'Previous photo': 'Foto anterior',
  'Next photo': 'Foto siguiente',
  'Search articles': 'Buscar artículos',
  'little one': 'pequeño',
  'Safe & Nurturing Care': 'Cuido seguro y afectuoso',
  'A loving environment where children feel secure, supported, and valued.':
    'Un ambiente amoroso donde los niños se sienten seguros, apoyados y valorados.',
  'Learning Through Play': 'Aprendizaje mediante el juego',
  'Daily activities that encourage curiosity, creativity, and early development.':
    'Actividades diarias que fomentan la curiosidad, la creatividad y el desarrollo temprano.',
  'Daily Routine & Structure': 'Rutina diaria y estructura',
  'A balanced schedule that helps children feel confident and comfortable.':
    'Un horario equilibrado que ayuda a los niños a sentirse seguros y cómodos.',
  'Family-Centered Approach': 'Enfoque centrado en la familia',
  'We work closely with parents to support each child\'s unique needs and growth.':
    'Trabajamos de la mano con los padres para apoyar las necesidades y el crecimiento únicos de cada niño.',
  'Caring Attention': 'Atención cariñosa',
  'A secure, supervised space where children can explore freely and parents feel at peace.':
    'Un espacio seguro y supervisado donde los niños exploran con libertad y los padres están tranquilos.',
  'Curiosity leads the way — every game and activity is designed to spark discovery.':
    'La curiosidad guía el camino — cada juego y actividad está diseñado para despertar el descubrimiento.',
  'Attentive, loving care so every child feels seen, supported, and valued.':
    'Cuidado atento y amoroso para que cada niño se sienta visto, apoyado y valorado.',
  'Daily Growth': 'Crecimiento diario',
  'Balanced routines that nurture social, emotional, and cognitive development.':
    'Rutinas equilibradas que nutren el desarrollo social, emocional y cognitivo.',
  'A Smooth Daily Routine': 'Una rutina diaria fluida',
  'Each day is organized to help children feel comfortable, secure, and ready for each activity.':
    'Cada día está organizado para que los niños se sientan cómodos, seguros y listos para cada actividad.',
  'Open Communication': 'Comunicación abierta',
  'We value clear communication with families so parents always feel informed and connected.':
    'Valoramos la comunicación clara con las familias para que los padres siempre se sientan informados y conectados.',
  'Attentive Daily Care': 'Cuidado diario atento',
  'From meals to playtime and rest, children receive thoughtful care throughout the day.':
    'Desde las comidas hasta el juego y el descanso, los niños reciben cuidado atento durante todo el día.',
}

export const DICT_ES = ES

const PT: Record<string, string> = {
  // Nav / comuns
  'Home': 'Início',
  'About': 'Sobre nós',
  'Programs': 'Programas',
  'Gallery': 'Galeria',
  'Blog': 'Blog',
  'Contact': 'Contato',
  'Schedule a Visit': 'Agende uma visita',
  'Schedule a visit': 'Agendar uma visita',
  'Schedule': 'Agendar',
  'Explore Programs': 'Ver programas',
  'More about us': 'Conheça mais sobre nós',
  'See our programs': 'Ver nossos programas',
  'All programs': 'Todos os programas',
  'Learn more': 'Saiba mais',
  'Learn more about {name}': 'Saiba mais sobre {name}',
  'Ask about {name} openings': 'Pergunte sobre vagas no {name}',
  'Quiz': 'Quiz',
  'Open the gallery': 'Abrir a galeria',
  'Ask about enrollment': 'Perguntar sobre matrícula',
  'Get directions': 'Como chegar',
  'Admin': 'Admin',
  'Find the right care': 'Encontre o cuidado ideal',
  'Contact us': 'Fale conosco',
  'Write to us': 'Escreva para nós',
  'Call {phone}': 'Ligue {phone}',
  'Call us': 'Ligue para nós',
  'Back to home': 'Voltar para o início',

  // Hero
  'Home-like daycare · San Francisco': 'Daycare como casa · San Francisco',
  'A Safe, Happy Place': 'Um Lugar Seguro e Feliz',
  'to Learn and Grow.': 'para Aprender e Crescer.',
  'At Ana Paula Daycare, little ones feel safe, supported, and excited to explore each day — through play, learning, and attentive care.':
    'Na Ana Paula Daycare, os pequenos se sentem seguros, acolhidos e animados para explorar cada dia — por meio de brincadeiras, aprendizado e cuidados atenciosos.',
  'Morning play · our learning corner': 'Brincadeira da manhã · nosso cantinho de aprendizado',

  // Lema
  'Learn': 'Aprender',
  'Play': 'Brincar',
  'Grow': 'Crescer',
  'Shine': 'Brilhar',
  'Learn · Play · Grow · Shine': 'Aprender · Brincar · Crescer · Brilhar',

  // Conceitos
  "What we're all about": 'O que nos inspira',
  'Learn. Play. Grow.': 'Aprender. Brincar. Crescer.',
  'Shine.': 'Brilhar.',
  'Curiosity leads the way — every game, story and puzzle is a chance to discover something new.':
    'A curiosidade lidera o caminho — cada jogo, história e quebra-cabeça é uma chance de descobrir algo novo.',
  'Movement, music and hands-on fun keep little bodies busy and growing minds happy.':
    'Movimento, música e diversão prática mantêm os corpinhos ativos e as mentes em crescimento felizes.',
  'Balanced routines and caring guidance help confidence bloom a little more every day.':
    'Rotinas equilibradas e orientação carinhosa ajudam a confiança a florescer um pouco mais a cada dia.',
  'Every child is celebrated for exactly who they are — and encouraged to shine bright.':
    'Cada criança é celebrada exatamente como é — e incentivada a brilhar.',

  // Welcome
  'Welcome to Ana Paula': 'Bem-vindos à Ana Paula',
  'A Nurturing Start': 'Um Começo Cheio de Carinho',
  'for Every Child': 'para Cada Criança',
  'We create a safe, caring space where children can learn, play, and grow with confidence. Our daily routine encourages curiosity, social development, and joyful early learning — every single day.':
    'Criamos um espaço seguro e acolhedor onde as crianças podem aprender, brincar e crescer com confiança. Nossa rotina diária estimula a curiosidade, o desenvolvimento social e um aprendizado precoce cheio de alegria — todos os dias.',
  'Safe Environment': 'Ambiente seguro',
  'Play-Based Learning': 'Aprendizado pela brincadeira',
  'Daily Routine': 'Rotina diária',
  'Caring Guidance': 'Orientação carinhosa',
  'Social Growth': 'Desenvolvimento social',
  'Creative Activities': 'Atividades criativas',

  // Programas (seção)
  'Programs · Infants · Toddlers · Preschool': 'Programas · Bebês · Toddlers · Pré-escola',
  'The right care': 'O cuidado certo',
  'for every stage.': 'para cada fase.',
  'Program': 'Programa',
  'Not sure which one fits?': 'Não sabe qual é o ideal?',
  'Take our 2-minute quiz and find out.': 'Faça nosso quiz de 2 minutos e descubra.',
  'Infants': 'Bebês',
  'Toddlers': 'Toddlers',
  'Preschool': 'Pré-escola',
  'Gentle, attentive care in a calm environment designed for comfort, safety, and early development.':
    'Cuidado atencioso e gentil em um ambiente tranquilo, pensado para o conforto, a segurança e o desenvolvimento inicial.',
  'Gentle, loving care for babies in a safe and comforting environment. We follow your baby\'s own rhythm — cozy naps, feeding, sensory play and lots of bonding.':
    'Cuidado gentil e amoroso para os bebês em um ambiente seguro e acolhedor. Seguimos o ritmo do seu bebê — soneiras confortáveis, alimentação, brincadeiras sensoriais e muitos momentos de conexão.',
  'Calm, comforting spaces for naps and feeding': 'Espaços tranquilos e acolhedores para soneiras e alimentação',
  'Sensory play and early bonding activities': 'Brincadeiras sensoriais e atividades de conexão',
  'Individualized routines that follow your baby\'s rhythm': 'Rotinas individualizadas que seguem o ritmo do seu bebê',
  'Active learning through play, movement, and hands-on activities that support growing minds and bodies.':
    'Aprendizado ativo por meio de brincadeiras, movimento e atividades práticas que estimulam mentes e corpos em crescimento.',
  'Active learning, play, and daily routines that support growing independence. Little explorers move, build, sing and discover — with gentle guidance every step of the way.':
    'Aprendizado ativo, brincadeiras e rotinas diárias que fortalecem a independência. Os pequenos exploradores se movem, constroem, cantam e descobrem — com orientação gentil a cada passo.',
  'Movement, music, and hands-on exploration': 'Movimento, música e exploração prática',
  'Early language and social skills through play': 'Linguagem inicial e habilidades sociais pela brincadeira',
  'Gentle support for independence and daily routines': 'Apoio gentil para a independência e as rotinas diárias',
  'A fun, engaging program that helps children build confidence, social skills, and school readiness.':
    'Um programa divertido e envolvente que ajuda as crianças a desenvolver confiança, habilidades sociais e prontidão escolar.',
  'Fun early learning experiences that build confidence, curiosity, and social skills. Pre-literacy, early math, creative arts and role-play — learning disguised as joy.':
    'Experiências iniciais de aprendizado que desenvolvem confiança, curiosidade e habilidades sociais. Pré-leitura, matemática inicial, artes criativas e faz de conta — aprendizado disfarçado de alegria.',
  'Pre-literacy and early math through play': 'Pré-leitura e matemática inicial pela brincadeira',
  'Creative arts, STEM play, and role-play corners': 'Artes criativas, jogos STEM e cantinhos de faz de conta',
  'Kindergarten-readiness skills and confidence': 'Habilidades e confiança para o kindergarten',
  '[CONTENT REQUIRED: exact age range]': '[CONTEÚDO NECESSÁRIO: faixa etária exata]',

  // Little Moments
  'A day full of little discoveries': 'Um dia cheio de pequenas descobertas',
  'Little Moments,': 'Pequenos Momentos,',
  'Big Discoveries.': 'Grandes Descobertas.',
  'Every day follows a gentle rhythm — play, meals, rest, and lots of discovery in between. Here is how our days unfold.':
    'Cada dia segue um ritmo suave — brincadeiras, refeições, descanso e muitas descobertas no meio. É assim que os nossos dias acontecem.',
  'Morning': 'Manhã',
  'Mid-morning': 'Meio da manhã',
  'Midday': 'Meio-dia',
  'Early afternoon': 'Início da tarde',
  'Afternoon': 'Tarde',
  'Late afternoon': 'Fim da tarde',
  'Arrival & hello': 'Chegada e oi',
  'The day begins with a warm welcome and a gentle transition from home to our care.':
    'O dia começa com uma recepção calorosa e uma transição suave de casa para os nossos cuidados.',
  'Learning through play': 'Aprendizado pela brincadeira',
  'Play-based learning invites curiosity — puzzles, building, stories and early discovery.':
    'O aprendizado lúdico convida à curiosidade — quebra-cabeças, construção, histórias e descobertas.',
  'Meals & snacks': 'Refeições e lanchinhos',
  'Children eat together in a calm, supervised setting that supports healthy routines.':
    'As crianças comem juntas em um ambiente tranquilo e supervisionado que apoia rotinas saudáveis.',
  'Rest time': 'Hora do descanso',
  'Quiet, comfortable spaces allow everyone to recharge with naps or peaceful rest.':
    'Espaços tranquilos e confortáveis permitem que todos recarreguem as energias com soneiras ou descanso tranquilo.',
  'Creative activities': 'Atividades criativas',
  'Art, music and imaginative play give children new ways to express themselves.':
    'Arte, música e brincadeiras imaginativas dão às crianças novas formas de se expressar.',
  'Indoor & outdoor play': 'Brincadeiras dentro e fora de casa',
  'Supervised active play — indoors and out — before the goodbyes and going home.':
    'Brincadeiras ativas supervisionadas — dentro e fora — antes das despedidas e da volta para casa.',

  // Galeria (seção)
  'Moments we share every day': 'Momentos que vivemos todos os dias',
  'Our little wall': 'Nosso pequeno mural',
  'of happy days.': 'de dias felizes.',

  // Why Families
  'Peace of mind for parents': 'Tranquilidade para os pais',
  'Why Families Love': 'Por Que as Famílias Amam',
  'Our Daycare': 'a Nossa Daycare',
  'Peace of Mind': 'Tranquilidade',
  'Reliable Daily Care': 'Cuidado diário confiável',
  'Easy Parent Communication': 'Comunicação fácil com os pais',
  'Flexible Support': 'Apoio flexível',
  'A Welcoming Atmosphere': 'Um ambiente acolhedor',
  'Family-Focused Approach': 'Abordagem centrada na família',

  // Safety strip
  'Safe hands,': 'Mãos seguras,',
  'happy hearts.': 'corações felizes.',
  'Supervised spaces, careful routines and open communication — the everyday details that keep children safe and parents at ease.':
    'Espaços supervisionados, rotinas cuidadosas e comunicação aberta — os detalhes do dia a dia que mantêm as crianças seguras e os pais tranquilos.',
  'Read our safety approach': 'Conheça nosso cuidado com a segurança',
  'Secure, Supervised Environment': 'Ambiente seguro e supervisionado',
  'Safe Sleep & Rest': 'Sono e descanso seguros',
  'Hygiene & Healthy Routines': 'Higiene e rotinas saudáveis',
  'Emergency Preparedness': 'Preparação para emergências',
  'Gentle Adjustment Period': 'Período de adaptação suave',
  'Open Communication About Safety': 'Comunicação aberta sobre segurança',

  // Depoimento
  'Ana Paula Daycare family': 'Família Ana Paula Daycare',
  'Ana Paula Daycare has been such a wonderful experience for our family. My child looks forward to going every morning, and I truly appreciate the care, patience, and attention given each day. It gives me peace of mind knowing my child is in a warm and supportive environment.':
    'A Ana Paula Daycare tem sido uma experiência maravilhosa para a nossa família. Meu filho já acorda querendo ir todos os dias, e eu valorizo muito o cuidado, a paciência e a atenção de cada dia. Fico tranquila sabendo que meu filho está em um ambiente acolhedor e cheio de apoio.',

  // FAQ
  'Answers for parents': 'Respostas para os pais',
  'Ask us anything.': 'Perguntem o que quiserem.',
  'Really!': 'Sério!',
  'If your question isn\'t answered here, call or write — we love talking with families.':
    'Se a sua pergunta não estiver respondida aqui, ligue ou escreva — adoramos conversar com as famílias.',
  'What ages do you accept?': 'Quais idades vocês aceitam?',
  'We welcome young children in a nurturing, home-like environment designed to support early learning, play, and daily care. For exact age availability, families are encouraged to contact us directly.':
    'Recebemos crianças pequenas em um ambiente acolhedor, como casa, pensado para apoiar o aprendizado inicial, as brincadeiras e o cuidado diário. Para saber a disponibilidade exata de idades, recomendamos falar diretamente conosco.',
  'What does a typical day look like?': 'Como é um dia típico?',
  'Our daily routine includes play-based learning, meals or snacks, rest time, creative activities, and supervised indoor and outdoor play. We keep a balanced schedule that helps children feel comfortable, engaged, and secure.':
    'Nossa rotina diária inclui aprendizado pela brincadeira, refeições ou lanchinhos, hora do descanso, atividades criativas e brincadeiras supervisionadas dentro e fora de casa. Mantemos uma agenda equilibrada que ajuda as crianças a se sentirem confortáveis, envolvidas e seguras.',
  'How do you communicate with parents?': 'Como vocês se comunicam com os pais?',
  'We believe strong parent communication is essential. We stay in touch with families about each child\'s day, routines, and any important updates so parents feel informed and connected.':
    'Acreditamos que a comunicação com os pais é essencial. Mantemos contato com as famílias sobre o dia de cada criança, as rotinas e qualquer novidade importante, para que os pais se sintam informados e conectados.',
  'Are meals and snacks provided?': 'Vocês oferecem refeições e lanches?',
  'Meal and snack arrangements may vary, so we recommend contacting us directly for the most current details. We always aim to support children\'s daily routines in a caring and organized way.':
    'As refeições e os lanches podem variar, então recomendamos falar diretamente conosco para saber os detalhes atuais. Buscamos sempre apoiar as rotinas diárias das crianças de forma carinhosa e organizada.',
  'How can we schedule a visit?': 'Como podemos agendar uma visita?',
  'Families can contact us directly to ask questions, check availability, and schedule a visit. We\'re happy to help you learn more about our program and see if Ana Paula Daycare is the right fit for your child.':
    'As famílias podem falar diretamente conosco para tirar dúvidas, verificar a disponibilidade e agendar uma visita. Teremos prazer em ajudar vocês a conhecerem nosso programa e a descobrirem se a Ana Paula Daycare é o lugar ideal para o seu filho.',
  'What makes Ana Paula Daycare different?': 'O que faz a Ana Paula Daycare ser diferente?',
  'Ana Paula Daycare offers a warm, family-centered environment where children receive loving care, personal attention, and daily opportunities to learn through play. Our goal is to create a place where children feel safe, happy, and at home.':
    'A Ana Paula Daycare oferece um ambiente acolhedor e centrado na família, onde as crianças recebem cuidado amoroso, atenção pessoal e oportunidades diárias de aprender brincando. Nosso objetivo é criar um lugar onde as crianças se sintam seguras, felizes e em casa.',
  'Is your setting home-like?': 'O ambiente de vocês é como casa?',
  'Yes — Ana Paula Daycare offers a warm, home-like setting where children can feel comfortable, safe, and cared for throughout the day.':
    'Sim — a Ana Paula Daycare oferece um ambiente caloroso, como casa, onde as crianças se sentem confortáveis, seguras e cuidadas durante todo o dia.',
  'Do children play outdoors?': 'As crianças brincam ao ar livre?',
  'Yes, children have opportunities for supervised outdoor play and active time as part of their daily routine whenever appropriate.':
    'Sim, as crianças têm oportunidades de brincadeiras ao ar livre supervisionadas e tempo ativo como parte da rotina diária, sempre que for apropriado.',
  'How do you help children adjust in the beginning?': 'Como vocês ajudam as crianças na adaptação?',
  'We support each child with patience, reassurance, and a gentle routine to help them feel secure, comfortable, and welcomed at their own pace.':
    'Apoiamos cada criança com paciência, tranquilidade e uma rotina suave para que se sinta segura, confortável e bem-vinda no seu próprio ritmo.',

  // Location
  'Find us': 'Encontre-nos',
  'A quiet street': 'Uma rua tranquila',
  'in San Francisco.': 'em San Francisco.',

  // CTA final
  'Ready when you are': 'Prontos quando vocês estiverem',
  'Give Your Child a Safe, Happy Place to Learn and Grow': 'Dê ao seu filho um lugar seguro e feliz para aprender e crescer',

  // Footer
  'Visit us': 'Visite-nos',
  'Come play and grow with us — ': 'Venha brincar e crescer com a gente — ',
  'we\'d love to meet your family!': 'adoraríamos conhecer a sua família!',
  'A warm, home-like daycare in San Francisco — a safe, happy place to learn and grow.':
    'Uma daycare acolhedora, como casa, em San Francisco — um lugar seguro e feliz para aprender e crescer.',
  'Explore': 'Explorar',
  'Safety': 'Segurança',
  'Enrollment': 'Matrícula',
  'Hours': 'Horários',
  '[CONTENT REQUIRED: opening days and hours]': '[CONTEÚDO NECESSÁRIO: dias e horários de atendimento]',
  'Ask about current openings when you': 'Pergunte sobre as vagas atuais quando',
  'get in touch': 'entrar em contato',
  '© {year} Ana Paula Daycare · San Francisco, CA': '© {year} Ana Paula Daycare · San Francisco, CA',

  // ---- Parte 2: páginas ----

  // Contact
  'Let\'s meet': 'Vamos conhecer',
  'your family.': 'a sua família.',
  'Ask questions, check availability, or schedule a visit — we\'re happy to help and quick to respond.':
    'Tire dúvidas, confira a disponibilidade ou agende uma visita — ficamos felizes em ajudar e respondemos rápido.',
  'Call or text': 'Ligue ou mande mensagem',
  'Write': 'Escreva',
  'Visit': 'Visite',
  'Send us a': 'Envie-nos uma',
  'message': 'mensagem',
  'Your name *': 'Seu nome *',
  'Email *': 'E-mail *',
  'Phone': 'Telefone',
  'Message *': 'Mensagem *',
  'Tell us about your child, your needs, or the best days to visit…':
    'Conte sobre seu filho, suas necessidades ou os melhores dias para visitar…',
  'Sending…': 'Enviando…',
  'Send message': 'Enviar mensagem',
  'Your details are only used to answer your family — never shared.':
    'Seus dados são usados apenas para responder à sua família — nunca compartilhados.',
  'Message received —': 'Mensagem recebida —',
  'thank you!': 'obrigada!',
  'We\'ll get back to you shortly at': 'Respondemos em breve para',
  'If it\'s urgent, call': 'Se for urgente, ligue para',
  'Prefer a quick answer?': 'Prefere uma resposta rápida?',
  '— we usually reply the same day.': '— normalmente respondemos no mesmo dia.',
  'Something went wrong.': 'Algo deu errado.',

  // Enroll
  'Begin with a': 'Comece com um',
  'simple hello.': 'simples oi.',
  'Pre-register online and we\'ll reach out about availability, answer your questions, and arrange a visit — no pressure, just a conversation.':
    'Faça o pré-cadastro online e entraremos em contato sobre disponibilidade, responderemos suas perguntas e combinaremos uma visita — sem pressão, só uma conversa.',
  'You write to us': 'Você escreve para a gente',
  'Share a little about your child and the care you need.': 'Conte um pouco sobre seu filho e o cuidado que você precisa.',
  'We reply personally': 'Respondemos pessoalmente',
  'Availability, routine, pricing questions — answered honestly.': 'Disponibilidade, rotina, valores — respostas honestas.',
  'You visit with your child': 'Você visita com seu filho',
  'See the space, meet us, and see if it feels right.': 'Conheça o espaço, nos conheça e veja se combina.',
  'Rather talk first?': 'Prefere falar primeiro?',
  'Pre-registration received,': 'Pré-cadastro recebido,',
  'Thank you! Our team will reach out shortly with availability and next steps for your':
    'Obrigada! Nossa equipe entrará em contato em breve com disponibilidade e próximos passos para o seu',
  'For anything urgent, call': 'Para qualquer urgência, ligue para',
  'See our days in photos': 'Veja nossos dias em fotos',
  'Take the care quiz': 'Faça o quiz de cuidados',
  'Pre-': 'Pré-',
  'registration': 'cadastro',
  'Parent/guardian name *': 'Nome do pai/mãe ou responsável *',
  'Phone *': 'Telefone *',
  'Child\'s age *': 'Idade da criança *',
  'Schedule needed *': 'Horário necessário *',
  'Anything else?': 'Algo mais?',
  'Allergies, routines, questions — anything helpful.': 'Alergias, rotinas, perguntas — qualquer informação útil.',
  'Submit pre-registration': 'Enviar pré-cadastro',
  'No fees, no spam — just a conversation about your family.':
    'Sem taxas, sem spam — só uma conversa sobre a sua família.',
  '0–12 months': '0–12 meses',
  '1–2 years': '1–2 anos',
  '3–5 years': '3–5 anos',
  'Expecting / soon': 'Grávida / em breve',
  'Full-time': 'Tempo integral',
  'Part-time / half days': 'Meio período / meio dias',
  'Flexible days': 'Dias flexíveis',
  'Not sure yet': 'Ainda não sei',

  // Quiz
  'Step Age': 'Idade',
  'Step Priorities': 'Prioridades',
  'Step Schedule': 'Horário',
  'Step Experience': 'Experiência',
  'Five questions,': 'Cinco perguntas,',
  'one honest answer.': 'uma resposta sincera.',
  'Tell us about your family and we\'ll point you to the program that fits — plus what to ask when you visit any daycare.':
    'Conte sobre a sua família e indicaremos o programa ideal — além do que perguntar ao visitar qualquer daycare.',
  'Who is this care for?': 'Para quem é esse cuidado?',
  'So we suggest the right program.': 'Assim sugerimos o programa certo.',
  'What matters most to you?': 'O que é mais importante para você?',
  'Choose everything that applies — we\'ll match it.': 'Escolha tudo que se aplica — a gente considera tudo.',
  'What schedule fits your week?': 'Qual horário combina com a sua semana?',
  'You can change this later.': 'Você pode mudar isso depois.',
  'Have you visited other daycares yet?': 'Você já visitou outras daycares?',
  'There\'s no wrong answer here.': 'Não existe resposta errada aqui.',
  'Multiple answers': 'Várias respostas',
  'One answer': 'Uma resposta',
  'A baby': 'Um bebê',
  'A toddler': 'Uma criança pequena',
  'Preschool age': 'Idade de pré-escola',
  'Expecting, or almost': 'Grávida, ou quase',
  'Coming soon': 'Em breve',
  'Above everything else': 'Acima de tudo',
  'Safety & security': 'Segurança e proteção',
  'Learning & development': 'Aprendizado e desenvolvimento',
  'Curiosity, skills, growth': 'Curiosidade, habilidades, crescimento',
  'A flexible schedule': 'Um horário flexível',
  'Around real family life': 'De acordo com a vida real da família',
  'Nutrition & meals': 'Nutrição e refeições',
  'Healthy routines': 'Rotinas saudáveis',
  'Warm, loving care': 'Cuidado carinhoso e amoroso',
  'Like a second home': 'Como uma segunda casa',
  'Friends & social skills': 'Amigos e habilidades sociais',
  'Growing together': 'Crescendo juntos',
  'Full-time care': 'Cuidado em tempo integral',
  'Every weekday': 'Todos os dias úteis',
  'Part-time': 'Meio período',
  'Half days or a few days': 'Meios dias ou alguns dias',
  'It varies': 'Varia',
  'Still deciding': 'Ainda decidindo',
  'Yes, we have': 'Sim, já visitamos',
  'We toured other places': 'Conhecemos outros lugares',
  'Not yet': 'Ainda não',
  'You\'d be one of our firsts': 'Você seria um dos primeiros',
  'Where should we send your result?': 'Para onde enviamos o seu resultado?',
  '← Back': '← Voltar',
  'Continue': 'Continuar',
  'See my result': 'Ver meu resultado',
  'Your information is only used to help your family — never shared, never spammed.':
    'Suas informações são usadas apenas para ajudar a sua família — nunca compartilhadas, nunca spam.',
  'Your result': 'Seu resultado',
  'Good news,': 'Boas notícias,',
  'friend': 'amigo',
  'Based on your answers, Ana Paula Daycare is a wonderful match for your family. Here is why — and what we suggest next.':
    'Pelas suas respostas, a Ana Paula Daycare combina muito bem com a sua família. Veja o porquê — e o que sugerimos a seguir.',
  'A copy was sent to': 'Enviamos uma cópia para',
  ', and our team received your answers — we may reach out to say hello.':
    ', e nossa equipe recebeu suas respostas — podemos entrar em contato para dizer oi.',
  'Book your visit': 'Agende sua visita',
  'See programs first': 'Ver os programas primeiro',
  'Our Infants program offers gentle, attentive care in a calm environment designed for comfort, safety, and early development.':
    'Nosso programa de Bebês oferece cuidado atencioso e gentil em um ambiente tranquilo, pensado para o conforto, a segurança e o desenvolvimento inicial.',
  'Our Toddlers program offers active learning through play, movement, and hands-on activities that support growing minds and bodies.':
    'Nosso programa de Toddlers oferece aprendizado ativo por meio de brincadeiras, movimento e atividades práticas que estimulam mentes e corpos em crescimento.',
  'Our Preschool program is a fun, engaging space that builds confidence, social skills, and school readiness.':
    'Nosso programa de Pré-escola é um espaço divertido e envolvente que desenvolve confiança, habilidades sociais e prontidão escolar.',
  'We welcome young children in a warm, home-like environment and will help you find the perfect starting point.':
    'Recebemos crianças pequenas em um ambiente acolhedor, como casa, e vamos ajudar você a encontrar o ponto de partida perfeito.',
  'Safety comes first here: a secure, supervised setting where children can explore freely and parents feel at peace.':
    'Aqui a segurança vem primeiro: um ambiente seguro e supervisionado onde as crianças exploram livremente e os pais ficam tranquilos.',
  'Play-based learning is our specialty — every game and activity is designed to spark curiosity and growth.':
    'O aprendizado pela brincadeira é a nossa especialidade — cada jogo e atividade é pensado para despertar curiosidade e crescimento.',
  'Caring attention is at our heart: attentive, loving care so every child feels seen, supported, and valued.':
    'A atenção carinhosa está no nosso coração: cuidado atencioso e amoroso para que cada criança se sinta vista, apoiada e valorizada.',
  'Daily group play and shared moments help children build friendships and social confidence naturally.':
    'As brincadeiras em grupo e os momentos compartilhados ajudam as crianças a fazer amizades e ganhar confiança social naturalmente.',
  'We support children\'s daily routines — including meals and snacks — in a caring, organized way.':
    'Apoiamos as rotinas diárias das crianças — incluindo refeições e lanches — de forma carinhosa e organizada.',
  'We work closely with families on schedules that fit real life — let\'s talk about what works for you.':
    'Trabalhamos junto com as famílias em horários que cabem na vida real — vamos conversar sobre o que funciona para você.',
  'Our balanced daily routine — play-based learning, meals, rest, and supervised indoor and outdoor play — fits beautifully with full-time care.':
    'Nossa rotina diária equilibrada — aprendizado pela brincadeira, refeições, descanso e brincadeiras supervisionadas dentro e fora — combina perfeitamente com o cuidado em tempo integral.',
  'You\'ve already seen what\'s out there — come compare the warmth, communication, and happy smiles in person. We\'re confident you\'ll feel the difference!':
    'Você já viu o que existe por aí — venha comparar pessoalmente o carinho, a comunicação e os sorrisos felizes. Temos certeza de que você vai sentir a diferença!',
  'Starting your search with us is a great shortcut — book a visit and see firsthand what a warm, family-centered daycare looks like.':
    'Começar a sua busca com a gente é um ótimo atalho — agende uma visita e veja de perto como é uma daycare acolhedora e centrada na família.',

  // Safety page
  'Safety & care': 'Segurança e cuidado',
  'Safety lives in': 'A segurança mora nos',
  'everyday details.': 'detalhes de todo dia.',
  'Trust between parents and caregivers is built on the small, consistent things: supervised spaces, careful routines, honest communication. Here is how that looks in our home every day.':
    'A confiança entre pais e cuidadores se constrói nas coisas pequenas e constantes: espaços supervisionados, rotinas cuidadosas e comunicação honesta. É assim que isso se vê na nossa casa todos os dias.',
  'Our home-like setting keeps children within sight and sound of caring adults at all times — indoors and out. Entry, pickup and drop-off follow strict family-authorized procedures.':
    'Nosso ambiente como casa mantém as crianças sempre à vista e ao alcance de adultos atenciosos — dentro e fora. Entrada, saída e busca seguem procedimentos rígidos autorizados pela família.',
  'Rest time happens in calm, comfortable spaces with children supervised throughout, following safe-sleep practices for our youngest ones.':
    'O descanso acontece em espaços tranquilos e confortáveis, com as crianças supervisionadas o tempo todo, seguindo práticas de sono seguro para os menores.',
  'Handwashing before meals and after play, sanitized toys and surfaces, and clear illness policies keep our little community healthy.':
    'A lavagem das mãos antes das refeições e depois das brincadeiras, brinquedos e superfícies higienizados e políticas claras sobre doenças mantêm a nossa pequena comunidade saudável.',
  'Caregivers stay prepared with emergency contact plans, first-aid readiness, and practiced procedures so every child knows they are safe here.':
    'Os cuidadores estão preparados com planos de contato de emergência, primeiros socorros e procedimentos praticados, para que cada criança saiba que está segura aqui.',
  'New children are supported with patience, reassurance, and a gentle routine to help them feel secure and welcomed at their own pace.':
    'As crianças novas recebem apoio com paciência, tranquilidade e uma rotina suave, para que se sintam seguras e bem-vindas no seu próprio ritmo.',
  'Questions welcome, always. Families can reach us directly at any time about safety practices, policies and protocols.':
    'Perguntas são sempre bem-vindas. As famílias podem falar conosco a qualquer momento sobre práticas, políticas e protocolos de segurança.',
  'Questions about a policy or procedure?': 'Perguntas sobre uma política ou procedimento?',
  'Ask us — always welcome.': 'Pergunte — sempre somos abertos.',

  // Gallery page
  'Moments We': 'Momentos Que',
  'Share': 'Vivemos',
  'Every Day': 'Todos os Dias',
  'Unposed moments from real days — painting hands, busy puzzles, outdoor air and quiet concentration.':
    'Momentos espontâneos de dias reais — mãos que pintam, quebra-cabeças, ar livre e concentração tranquila.',
  'All': 'Todas',
  'Creative Play': 'Brincadeira criativa',
  'Hands-On Learning': 'Aprendizado prático',
  'Outdoor Fun': 'Diversão ao ar livre',
  'Daily Discovery': 'Descoberta diária',
  'Happy Connections': 'Conexões felizes',
  'Growing Confidence': 'Confiança que cresce',

  // Blog
  'Notes on raising': 'Notas sobre criar',
  'little humans.': 'pequenos humanos.',
  'Practical guidance on daycare readiness, routines, nutrition and development — written by people who care for little ones every day.':
    'Orientação prática sobre adaptação à daycare, rotinas, alimentação e desenvolvimento — escrita por quem cuida de pequenos todos os dias.',
  'Search the blog…': 'Buscar no blog…',
  'Nothing found here.': 'Nada encontrado por aqui.',
  'Try another search or category.': 'Tente outra busca ou outra categoria.',
  '{n} min read': 'leitura de {n} min',
  'Read the article': 'Ler o artigo',
  'Not found': 'Não encontrado',
  'This article isn\'t on our shelf': 'Este artigo não está na nossa estante',
  'right now.': 'neste momento.',
  '← Back to the Blog': '← Voltar para o blog',
  '← Blog': '← Blog',
  'Enjoyed this? Come see it': 'Gostou? Venha ver tudo isso',
  'in person.': 'pessoalmente.',

  // Chat
  'Close': 'Fechar',
  'Hi! How can we help your family today?': 'Olá! Como podemos ajudar a sua família hoje?',
  'Location': 'Localização',
  'Write your question…': 'Escreva sua pergunta…',
  'Family assistant': 'Assistente das famílias',
  'Typing…': 'Digitando…',
  'Type your question': 'Digite sua pergunta',
  'Close chat': 'Fechar chat',
  'Ask Ana': 'Pergunte à Ana',
  'Sorry, I couldn\'t answer that right now. Please call us at +1 415 912 0300 — we\'d love to help!':
    'Desculpe, não consegui responder isso agora. Ligue para +1 415 912 0300 — adoraríamos ajudar!',
  'I couldn\'t connect just now — but our team would love to help! Call +1 415 912 0300 or email anapauladaycare@gmail.com.':
    'Não consegui conectar agora — mas nossa equipe adora ajudar! Ligue para +1 415 912 0300 ou escreva para anapauladaycare@gmail.com.',

  // Sticky CTA
  'Come visit us!': 'Venha nos visitar!',
  'New families welcome': 'Famílias são bem-vindas',

  // Audio player
  'Our little song': 'Nossa musiquinha',
  'Pause music': 'Pausar música',
  'Play music': 'Tocar música',
  'Open music player': 'Abrir player de música',
  'Close music player': 'Fechar player de música',

  // 404
  'Oops — Error 404': 'Ops — Erro 404',
  'This page wandered off': 'Esta página saiu para brincar',
  'during playtime.': 'e não voltou ainda.',
  'The page': 'A página',
  'doesn\'t exist — but there is plenty to discover back home.':
    'não existe — mas há muito o que descobrir no início.',

  // SEO
  'Ana Paula Daycare | Safe & Nurturing Child Care in San Francisco, CA': 'Ana Paula Daycare | Cuidado infantil seguro e acolhedor em San Francisco, CA',
  'Warm, home-like daycare in San Francisco (94112). Infant, toddler & preschool care with play-based learning. Book a visit today!':
    'Daycare acolhedora, como casa, em San Francisco (94112). Cuidado de bebês, toddlers e pré-escola com aprendizado pela brincadeira. Agende sua visita hoje!',
  'About Us | Ana Paula Daycare — San Francisco, CA': 'Sobre nós | Ana Paula Daycare — San Francisco, CA',
  'A place where little ones feel at home. Our family-centered approach, loving care and play-based philosophy.':
    'Um lugar onde os pequenos se sentem em casa. Nossa abordagem centrada na família, cuidado amoroso e filosofia de aprender brincando.',
  'Programs: Infants, Toddlers & Preschool | Ana Paula Daycare': 'Programas: Bebês, Toddlers e Pré-escola | Ana Paula Daycare',
  'Gentle infant care, active toddler learning and engaging preschool programs in San Francisco.':
    'Cuidado gentil de bebês, aprendizado ativo para toddlers e programas de pré-escola envolventes em San Francisco.',
  'Gallery | Ana Paula Daycare — Moments We Share Every Day': 'Galeria | Ana Paula Daycare — Momentos que vivemos todos os dias',
  'Creative play, hands-on learning, outdoor fun and daily discovery at Ana Paula Daycare.':
    'Brincadeiras criativas, aprendizado prático, diversão ao ar livre e descobertas diárias na Ana Paula Daycare.',
  'Parenting & Daycare Blog | Ana Paula Daycare': 'Blog para pais e sobre daycares | Ana Paula Daycare',
  'Practical tips for parents: daycare readiness, routines, nutrition and child development 0-5.':
    'Dicas práticas para pais: adaptação à daycare, rotinas, alimentação e desenvolvimento infantil 0-5.',
  'Contact & Book a Visit | Ana Paula Daycare — San Francisco': 'Contato e agendamento de visitas | Ana Paula Daycare — San Francisco',
  'Call +1 415 912 0300. 431 Paris St, San Francisco, CA 94112. Schedule your visit today!':
    'Ligue +1 415 912 0300. 431 Paris St, San Francisco, CA 94112. Agende sua visita hoje!',
  'Is Ana Paula Daycare Right for Your Family? | Fun 2-Minute Quiz': 'A Ana Paula Daycare combina com a sua família? | Quiz divertido de 2 minutos',
  'Answer 5 quick questions and get a personalized recommendation for your child care needs.':
    'Responda 5 perguntas rápidas e receba uma recomendação personalizada para o cuidado do seu filho.',
  'Safety & Protocols | Ana Paula Daycare — San Francisco': 'Segurança e protocolos | Ana Paula Daycare — San Francisco',
  'How we keep your child safe: supervision, hygiene routines, secure pickup and emergency preparedness.':
    'Como mantemos seu filho seguro: supervisão, rotinas de higiene, busca segura e preparação para emergências.',
  'Enrollment Pre-Registration | Ana Paula Daycare': 'Pré-cadastro para matrícula | Ana Paula Daycare',
  'Start your child\'s enrollment at Ana Paula Daycare in San Francisco. Pre-register online!':
    'Comece a matrícula do seu filho na Ana Paula Daycare em San Francisco. Faça o pré-cadastro online!',
  'Admin | Ana Paula Daycare': 'Admin | Ana Paula Daycare',

  // ---- Parte 3: chaves restantes (about, pillars, valores, galeria, programs) ----
  'About us': 'Sobre nós',
  'A Place Where': 'Um Lugar Onde',
  'Little Ones': 'os Pequenos',
  'Feel at Home': 'Se Sentem em Casa',
  'Ana Paula Daycare is a {setting} in San Francisco — a real home, with a real family rhythm, where a small group of children spends the day learning through play under attentive, loving care.':
    'A Ana Paula Daycare é um {setting} em San Francisco — uma casa de verdade, com um ritmo de família de verdade, onde um pequeno grupo de crianças passa o dia aprendendo brincando, com cuidado atencioso e amoroso.',
  'How we care': 'Como cuidamos',
  'Care is the': 'O cuidado é o',
  'curriculum.': 'currículo.',
  'Nothing about the day feels institutional. Children settle on the mat for stories, gather at the table for meals, explore shelves of open-ended toys, and step outside for fresh air — always within sight and sound of a caring adult.':
    'Nada no dia parece institucional. As crianças se acomodam no tapete para as histórias, se reúnem à mesa para as refeições, exploram prateleiras de brinquedos abertos e saem para tomar ar — sempre à vista e ao alcance de um adulto atencioso.',
  'We work closely with parents, sharing the little details of each day. That partnership is what makes an unfamiliar place feel like a second home — for children':
    'Trabalhamos junto com os pais, compartilhando os pequenos detalhes de cada dia. Essa parceria é o que faz um lugar desconhecido parecer uma segunda casa — para as crianças',
  'and': 'e',
  'for their families.': 'e para as suas famílias.',
  'Moments': 'Momentos',
  'Little Steps,': 'Pequenos Passos,',
  'Big Growth': 'Grande Crescimento',
  'What guides our care': 'O que guia o nosso cuidado',
  'What We': 'O Que',
  'Value': 'Valorizamos',
  'What families can expect': 'O que as famílias podem esperar',
  'Sound like the right place': 'Parece o lugar certo',
  'for your child?': 'para o seu filho?',
  'Care that grows': 'Um cuidado que cresce',
  'with the child.': 'com a criança.',
  'Three programs, one philosophy: gentle attention and play-based learning, matched to each stage of early childhood.':
    'Três programas, uma filosofia: atenção gentil e aprendizado pela brincadeira, na medida certa para cada fase da primeira infância.',
  'Not sure which program fits?': 'Não sabe qual programa combina?',
  "We'll figure it out together.": 'A gente descobre junto.',
  'Take the 2-minute quiz': 'Faça o quiz de 2 minutos',
  'Open photo: {alt}': 'Abrir foto: {alt}',
  'See this moment in the gallery: {alt}': 'Veja este momento na galeria: {alt}',
  'Close gallery': 'Fechar galeria',
  'Previous photo': 'Foto anterior',
  'Next photo': 'Próxima foto',
  'Search articles': 'Buscar artigos',
  'little one': 'pequeno',
  'Safe & Nurturing Care': 'Cuidado seguro e acolhedor',
  'A loving environment where children feel secure, supported, and valued.':
    'Um ambiente amoroso onde as crianças se sentem seguras, apoiadas e valorizadas.',
  'Learning Through Play': 'Aprendizado pela brincadeira',
  'Daily activities that encourage curiosity, creativity, and early development.':
    'Atividades diárias que estimulam a curiosidade, a criatividade e o desenvolvimento inicial.',
  'Daily Routine & Structure': 'Rotina diária e estrutura',
  'A balanced schedule that helps children feel confident and comfortable.':
    'Uma agenda equilibrada que ajuda as crianças a se sentirem confiantes e confortáveis.',
  'Family-Centered Approach': 'Abordagem centrada na família',
  'We work closely with parents to support each child\'s unique needs and growth.':
    'Trabalhamos junto com os pais para apoiar as necessidades e o crescimento únicos de cada criança.',
  'Caring Attention': 'Atenção carinhosa',
  'A secure, supervised space where children can explore freely and parents feel at peace.':
    'Um espaço seguro e supervisionado onde as crianças exploram livremente e os pais ficam tranquilos.',
  'Curiosity leads the way — every game and activity is designed to spark discovery.':
    'A curiosidade lidera o caminho — cada jogo e atividade é pensado para despertar a descoberta.',
  'Attentive, loving care so every child feels seen, supported, and valued.':
    'Cuidado atencioso e amoroso para que cada criança se sinta vista, apoiada e valorizada.',
  'Daily Growth': 'Crescimento diário',
  'Balanced routines that nurture social, emotional, and cognitive development.':
    'Rotinas equilibradas que nutrem o desenvolvimento social, emocional e cognitivo.',
  'A Smooth Daily Routine': 'Uma rotina diária tranquila',
  'Each day is organized to help children feel comfortable, secure, and ready for each activity.':
    'Cada dia é organizado para que as crianças se sintam confortáveis, seguras e prontas para cada atividade.',
  'Open Communication': 'Comunicação aberta',
  'We value clear communication with families so parents always feel informed and connected.':
    'Valorizamos a comunicação clara com as famílias para que os pais sempre se sintam informados e conectados.',
  'Attentive Daily Care': 'Cuidado diário atencioso',
  'From meals to playtime and rest, children receive thoughtful care throughout the day.':
    'Das refeições às brincadeiras e ao descanso, as crianças recebem cuidado atencioso durante todo o dia.',
}

export const DICT_PT = PT

/** Dicionário por idioma — 'en' fica fora (identidade: a chave já é o texto). */
export const DICTS: Partial<Record<Lang, Record<string, string>>> = {
  es: DICT_ES,
  pt: DICT_PT,
}
