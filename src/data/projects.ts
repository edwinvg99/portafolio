export type L = { es: string; en: string };

export interface Project {
  slug: string;
  name: string;
  kind: L;          // short category line
  year: string;
  role: L;
  summary: L;
  highlights: { es: string[]; en: string[] };
  stack: string[];
  images: string[];
  accent: string;
  live?: string;
  liveNote?: L;     // e.g. "requiere cuenta"
  github?: string;
  privateRepo?: boolean;
  metrics?: { value: string; label: L }[];
  tags: ('web' | 'saas' | 'client' | 'desktop' | 'ai' | 'personal')[];
}

const imgs = (slug: string, n: number) => Array.from({ length: n }, (_, i) => `/projects/${slug}/0${i + 1}.webp`);

export const featured: Project[] = [
  {
    slug: 'educativas',
    name: 'Plataformas educativas',
    kind: { es: 'E-learning en producción · 3 plataformas', en: 'E-learning in production · 3 platforms' },
    year: '2025 — 2026',
    role: { es: 'Desarrollador Full Stack · El Derecho Para Todos', en: 'Full Stack Developer · El Derecho Para Todos' },
    summary: {
      es: 'Tres plataformas de formación que construí y mantengo: CodeLegal, para vender y tomar cursos de derecho; el Aula Virtual PGN, para preparar el concurso de méritos de la Procuraduría General de la Nación; y la Academia GOBERNAR, con diplomados y masterclasses de liderazgo político.',
      en: 'Three learning platforms I built and maintain: CodeLegal, to sell and take law courses; the PGN Virtual Classroom, to prepare for the Inspector General’s Office merit exam; and the GOBERNAR Academy, with political-leadership programs and masterclasses.',
    },
    highlights: {
      es: [
        'CodeLegal: matrículas, combos, exámenes, progreso por módulo y reportes de ingresos; migración de todos los usuarios desde la plataforma anterior sin pérdida de datos.',
        'Aula Virtual PGN: clases grabadas por ciclos, simulacros calificados, material de estudio y un panel que alerta sobre estudiantes inactivos.',
        'Academia GOBERNAR: diplomados con clases integradas, masterclasses y perfil del estudiante, más el proceso de admisión de 200 cupos.',
        'Base común: roles, archivos en Cloudflare R2, correos con Resend, colas con Redis, importación masiva y exportación a Excel.',
      ],
      en: [
        'CodeLegal: enrollments, bundles, exams, per-module progress and revenue reports; migrated every user from the previous platform with zero data loss.',
        'PGN Virtual Classroom: recorded classes by cycle, graded mock exams, study material and a dashboard that flags inactive students.',
        'GOBERNAR Academy: programs with built-in classes, masterclasses and student profiles, plus a 200-seat admission process.',
        'Shared foundation: roles, files on Cloudflare R2, email with Resend, Redis queues, bulk import and Excel export.',
      ],
    },
    stack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Cloudflare R2', 'Redis'],
    images: imgs('educativas', 4),
    accent: '#2dd4bf',
    metrics: [
      { value: '2.000+', label: { es: 'usuarios en CodeLegal', en: 'CodeLegal users' } },
      { value: '3.000+', label: { es: 'matrículas', en: 'enrollments' } },
      { value: '780+', label: { es: 'simulacros presentados', en: 'mock exams taken' } },
    ],
    tags: ['client', 'web'],
  },
  {
    slug: 'cammetrics',
    name: 'CamMetrics',
    kind: { es: 'SaaS de analítica en tiempo real', en: 'Real-time analytics SaaS' },
    year: '2026',
    role: { es: 'Fundador · Full Stack', en: 'Founder · Full Stack' },
    summary: {
      es: 'Plataforma SaaS de analítica y estrategia para creadores de contenido en streaming y sus estudios. Un worker escucha eventos 24/7, los guarda y los convierte en ingresos, horarios rentables, fans clave y comparativas entre cuentas.',
      en: 'Analytics & strategy SaaS for live-streaming creators and studios. A 24/7 worker listens to platform events, stores them and turns them into revenue, best time slots, key fans and account comparisons.',
    },
    highlights: {
      es: [
        'Worker Node.js 24/7 con long-polling a una API de eventos: construye el histórico que la API no ofrece.',
        'Mapas de calor por hora/día, sesiones, ranking de fans y recomendaciones accionables.',
        'Tokens de terceros cifrados con AES-256-GCM; multi-cuenta y roles para estudios.',
        'Pagos recurrentes (Wompi), alertas por bot de Telegram, Sentry y PostHog.',
      ],
      en: [
        '24/7 Node.js worker long-polling an events API to build the history the API does not provide.',
        'Hour/day heatmaps, sessions, fan ranking and actionable recommendations.',
        'Third-party tokens encrypted with AES-256-GCM; multi-account and roles for studios.',
        'Recurring payments (Wompi), Telegram bot alerts, Sentry and PostHog.',
      ],
    },
    stack: ['Next.js', 'TypeScript', 'Node.js worker', 'PostgreSQL', 'Prisma', 'Railway', 'Telegram Bot', 'Wompi'],
    images: imgs('cammetrics', 4),
    accent: '#4ade80',
    privateRepo: true,
    metrics: [
      { value: '24/7', label: { es: 'ingesta de eventos', en: 'event ingestion' } },
      { value: '3', label: { es: 'servicios (web, worker, DB)', en: 'services (web, worker, DB)' } },
    ],
    tags: ['saas', 'web'],
  },
  {
    slug: 'delcampo',
    name: 'Del Campo POS',
    kind: { es: 'Punto de venta + tienda online para un restaurante', en: 'POS + online store for a restaurant' },
    year: '2026',
    role: { es: 'Desarrollador Full Stack · Cliente', en: 'Full Stack Developer · Client' },
    summary: {
      es: 'Sistema a medida para la operación diaria de un restaurante en Bogotá: ventas en caja, inventario, cierres de caja, cuentas por cobrar, pedidos a domicilio y una tienda online conectada al mismo inventario.',
      en: 'Custom system for the day-to-day operation of a restaurant in Bogotá: checkout, inventory, cash closings, receivables, delivery orders and an online store connected to the same inventory.',
    },
    highlights: {
      es: [
        'Venta rápida con lector de código de barras, variantes, lotes y alertas de stock bajo.',
        'Un único punto de mutación de inventario (moveStock) con trazabilidad de cada movimiento.',
        'Roles propietario/admin/vendedor con Better Auth; cierres de caja y reportes en Excel.',
        'Tienda pública con carrito y pedido por WhatsApp; diseño mobile-first instalable (PWA).',
      ],
      en: [
        'Fast checkout with barcode scanner, variants, lots and low-stock alerts.',
        'Single inventory mutation point (moveStock) with full movement traceability.',
        'Owner/admin/seller roles with Better Auth; cash closings and Excel reports.',
        'Public store with cart and WhatsApp checkout; installable mobile-first design (PWA).',
      ],
    },
    stack: ['Next.js 16', 'TypeScript', 'PostgreSQL', 'Drizzle ORM', 'Better Auth', 'Tailwind CSS', 'Railway'],
    images: imgs('delcampo', 5),
    accent: '#facc15',
    privateRepo: true,
    metrics: [
      { value: '17', label: { es: 'módulos de negocio', en: 'business modules' } },
      { value: 'PWA', label: { es: 'instalable en el celular', en: 'installable on mobile' } },
    ],
    tags: ['client', 'web'],
  },
  {
    slug: 'trujillo-studio',
    name: 'TRUJILLO Studio',
    kind: { es: 'Editor de video y motion graphics a medida', en: 'Custom video & motion-graphics editor' },
    year: '2026',
    role: { es: 'Producto interno · Full Stack', en: 'Internal product · Full Stack' },
    summary: {
      es: 'Aplicación tipo “paquete de After Effects” para un canal de finanzas: más de 300 plantillas animadas editables, editor de escenas 2.5D, procesamiento de clips y exportación a MP4 o video con transparencia.',
      en: 'An “After Effects pack”-style app for a finance channel: 300+ editable animated templates, a 2.5D scene editor, clip processing and export to MP4 or video with alpha.',
    },
    highlights: {
      es: [
        'Sistema de diseño de motion (curvas, layouts seguros 9:16/16:9/1:1) sobre Remotion.',
        'Clips: elimina silencios, transcribe con WhisperX y genera subtítulos tipo TikTok.',
        'Editor Parallax propio: capas, texto detrás de la persona, cambio de foco y foto 3D.',
        'Exportación MP4, MOV y WebM con canal alfa; quitar fondo y siluetas con IA local.',
      ],
      en: [
        'Motion design system (easings, safe layouts 9:16/16:9/1:1) built on Remotion.',
        'Clips: removes silences, transcribes with WhisperX and creates TikTok-style captions.',
        'Custom Parallax editor: layers, text behind the subject, focus pulls and 3D photo.',
        'MP4, MOV and WebM export with alpha; background removal and cut-outs with local AI.',
      ],
    },
    stack: ['React', 'TypeScript', 'Remotion', 'Vite', 'FFmpeg', 'Python', 'WhisperX'],
    images: imgs('trujillo-studio', 3),
    accent: '#f5b301',
    privateRepo: true,
    metrics: [{ value: '320', label: { es: 'plantillas animadas', en: 'animated templates' } }],
    tags: ['ai', 'personal'],
  },
  {
    slug: 'energia-clara',
    name: 'Energía Clara',
    kind: { es: 'Tesis · datos abiertos del mercado eléctrico + IA', en: 'Thesis · open energy-market data + AI' },
    year: '2025 — 2026',
    role: { es: 'Proyecto de grado · Full Stack', en: 'Capstone · Full Stack' },
    summary: {
      es: 'Plataforma educativa sobre energías renovables en Colombia con indicadores en tiempo real de XM y SIMEM, documentos CREG, noticias del sector, módulos con certificado en PDF y un chatbot con Gemini.',
      en: 'Educational platform about renewable energy in Colombia with real-time XM and SIMEM indicators, CREG documents, sector news, modules with PDF certificates and a Gemini chatbot.',
    },
    highlights: {
      es: [
        'Funciones serverless (Cloudflare Workers) para sortear la geo-restricción de las APIs oficiales.',
        'Scraping y caché de documentos CREG y noticias con actualización automática.',
        'Chatbot con Gemini acotado al dominio regulatorio para evitar alucinaciones.',
        'Evaluaciones tipo examen y generación de certificados PDF.',
      ],
      en: [
        'Serverless functions (Cloudflare Workers) to bypass geo-restrictions on official APIs.',
        'Scraping and caching of CREG documents and news with automatic refresh.',
        'Gemini chatbot constrained to the regulatory domain to avoid hallucinations.',
        'Quiz-style assessments and PDF certificate generation.',
      ],
    },
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Gemini API', 'Cloudflare Workers', 'Playwright'],
    images: imgs('energia-clara', 5),
    accent: '#10b981',
    github: 'https://github.com/edwinvg99/energia-clara',
    tags: ['ai', 'web'],
  },
  {
    slug: 'enviaya',
    name: 'EnvíaYa',
    kind: { es: 'E-commerce con rastreo de envíos', en: 'E-commerce with shipment tracking' },
    year: '2023 — 2024',
    role: { es: 'Proyecto académico · Full Stack', en: 'Academic project · Full Stack' },
    summary: {
      es: 'Tienda de tecnología con carrito, checkout, órdenes y envíos con número de guía. Los clientes siguen su pedido en tiempo real y el equipo administra inventario, órdenes y entregas desde un panel con indicadores.',
      en: 'Tech store with cart, checkout, orders and shipments with tracking numbers. Customers follow their order in real time and the team manages inventory, orders and deliveries from a dashboard with KPIs.',
    },
    highlights: {
      es: [
        'Arquitectura por capas (dominio, casos de uso, infraestructura) en Node.js + TypeScript, con API REST documentada en Swagger.',
        'Máquinas de estado para órdenes y envíos: transiciones validadas y sincronizadas, y la entrega exige confirmación con firma o foto.',
        'Stock reservado al agregar al carrito y cancelación automática de órdenes pendientes para evitar sobreventa.',
        'Seguridad con JWT y roles (cliente, vendedor, administrador), validación con Joi, rate limiting y Helmet.',
      ],
      en: [
        'Layered architecture (domain, use cases, infrastructure) in Node.js + TypeScript, with a Swagger-documented REST API.',
        'State machines for orders and shipments: validated, synchronized transitions, and delivery requires signature or photo confirmation.',
        'Stock reserved when added to cart and automatic cancellation of stale orders to prevent overselling.',
        'Security with JWT and roles (customer, vendor, admin), Joi validation, rate limiting and Helmet.',
      ],
    },
    stack: ['React 19', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'Swagger', 'Tailwind CSS'],
    images: imgs('enviaya', 5),
    accent: '#f59e0b',
    github: 'https://github.com/edwinvg99/enviaYa',
    metrics: [
      { value: '8', label: { es: 'estados de envío con historial', en: 'shipment states with history' } },
      { value: '3', label: { es: 'roles con permisos', en: 'permission roles' } },
    ],
    tags: ['web'],
  },
];

export const more: Project[] = [
  {
    slug: 'calculadoras',
    name: 'Calculadoras TRUJILLO',
    kind: { es: 'Herramientas financieras para Colombia', en: 'Personal-finance tools for Colombia' },
    year: '2026',
    role: { es: 'Desarrollador · canal TRUJILLO', en: 'Developer · TRUJILLO channel' },
    summary: {
      es: 'Cuatro calculadoras educativas para el canal de finanzas TRUJILLO: cuánto vale tu hora de trabajo, cuánto aguantas sin sueldo, cuánto rinde de verdad un CDT y cuánto se lleva el 4×1000. Usan las cifras oficiales de Colombia y se publican solas con cada cambio.',
      en: 'Four educational calculators for the TRUJILLO finance channel: what your hour of work is worth, how long you can last without a salary, what a CDT really returns and how much the 4×1000 tax takes. They use official Colombian figures and deploy automatically on every change.',
    },
    highlights: {
      es: [
        'Cifras oficiales centralizadas (salario mínimo, UVT, retención, cupo GMF) y fuentes documentadas.',
        'Lógica financiera en funciones puras con pruebas unitarias (Vitest) y validación de entradas extremas.',
        'Registro de leads hacia Google Sheets con Apps Script, política de datos versionada y reintentos.',
        'Presupuesto de rendimiento y auditoría Lighthouse en CI; despliegue con GitHub Actions a GitHub Pages.',
      ],
      en: [
        'Centralized official figures (minimum wage, UVT, withholding, GMF allowance) with documented sources.',
        'Financial logic as pure functions with unit tests (Vitest) and validation of extreme inputs.',
        'Lead capture to Google Sheets via Apps Script, versioned privacy policy and retries.',
        'Performance budget and Lighthouse audit in CI; GitHub Actions deploy to GitHub Pages.',
      ],
    },
    stack: ['React', 'TypeScript strict', 'Vite', 'Tailwind CSS 4', 'Vitest', 'GitHub Actions', 'Apps Script'],
    images: imgs('calculadoras', 3),
    accent: '#eab308',
    tags: ['web', 'personal'],
  },
  {
    slug: 'balon',
    name: 'El Balón de la Gente',
    kind: { es: 'Campaña digital · concurso ciudadano', en: 'Digital campaign · citizen contest' },
    year: '2026',
    role: { es: 'Full Stack · campaña Alcaldía de Itagüí', en: 'Full Stack · Itagüí mayoral campaign' },
    summary: {
      es: 'Landing y sistema de inscripción para un concurso de videos de una campaña a la alcaldía de Itagüí: reglas, mecánica, registro con carga de archivos y panel con exportación.',
      en: 'Landing page and registration system for a video contest run by a mayoral campaign in Itagüí: rules, mechanics, sign-up with file uploads and an admin panel with export.',
    },
    highlights: { es: [], en: [] },
    stack: ['HTML/CSS/JS', 'Node.js', 'Express', 'PostgreSQL', 'Multer', 'ExcelJS'],
    images: imgs('balon', 4),
    accent: '#16a34a',
    tags: ['client', 'web'],
  },
  {
    slug: 'vortice',
    name: 'Vórtice',
    kind: { es: 'App de escritorio · remapeo de mandos', en: 'Desktop app · controller remapping' },
    year: '2026',
    role: { es: 'Proyecto personal · .NET', en: 'Personal project · .NET' },
    summary: {
      es: 'Mi propio reemplazo de DS4Windows: lee el mando físico, aplica perfiles (botones, macros, combos, curvas de sticks) y lo expone como mando virtual Xbox 360 o DualShock 4 a 250–4000 Hz.',
      en: 'My own DS4Windows replacement: reads the physical controller, applies profiles (buttons, macros, combos, stick curves) and exposes it as a virtual Xbox 360 or DualShock 4 at 250–4000 Hz.',
    },
    highlights: { es: [], en: [] },
    stack: ['.NET 10', 'WPF', 'XInput', 'ViGEmBus', 'HidHide'],
    images: imgs('vortice', 4),
    accent: '#818cf8',
    tags: ['desktop', 'personal'],
  },
  {
    slug: 'optimizador',
    name: 'Optimizador de PC',
    kind: { es: 'App de escritorio · rendimiento', en: 'Desktop app · performance' },
    year: '2026',
    role: { es: 'Proyecto personal · PowerShell + WPF', en: 'Personal project · PowerShell + WPF' },
    summary: {
      es: '23 ajustes reversibles con estado real del sistema, “modo juego” y medición de FPS (1% / 0.1% lows, latencia, cuello de botella CPU/GPU) con historial comparativo.',
      en: '23 reversible tweaks showing real system state, a “game mode” and FPS benchmarking (1% / 0.1% lows, latency, CPU/GPU bottleneck) with comparative history.',
    },
    highlights: { es: [], en: [] },
    stack: ['PowerShell', 'WPF', 'PresentMon', 'Windows Registry'],
    images: imgs('optimizador', 4),
    accent: '#f97316',
    tags: ['desktop', 'personal'],
  },
  {
    slug: 'beatlog',
    name: 'BeatLog',
    kind: { es: 'Integración con Spotify', en: 'Spotify integration' },
    year: '2025',
    role: { es: 'Proyecto personal · Front-end', en: 'Personal project · Front-end' },
    summary: {
      es: 'App conectada al SDK de Spotify: reproductor integrado, historial, estadísticas de artistas y eventos musicales con visualizaciones animadas.',
      en: 'App connected to the Spotify SDK: embedded player, listening history, artist stats and music events with animated visualizations.',
    },
    highlights: { es: [], en: [] },
    stack: ['React', 'Spotify Web API', 'Firebase', 'Anime.js'],
    images: imgs('beatlog', 2),
    accent: '#22c55e',
    github: 'https://github.com/edwinvg99/beatlog-spotify',
    tags: ['web', 'personal'],
  },
  {
    slug: 'spectrum',
    name: 'Spectrum',
    kind: { es: 'Web de clan de Valorant', en: 'Valorant clan website' },
    year: '2025',
    role: { es: 'Proyecto personal · Full Stack', en: 'Personal project · Full Stack' },
    summary: {
      es: 'Estadísticas de jugadores con API no oficial, caché por tipo de dato con TTL distinto, refresco en segundo plano y degradación elegante cuando la API externa falla.',
      en: 'Player stats from an unofficial API, per-data-type caching with different TTLs, background refresh and graceful degradation when the external API fails.',
    },
    highlights: { es: [], en: [] },
    stack: ['React 19', 'Vite', 'Tailwind 4', 'Node.js', 'Express'],
    images: imgs('spectrum', 3),
    accent: '#a5b4fc',
    github: 'https://github.com/edwinvg99/spectrum',
    tags: ['web', 'personal'],
  },
];
