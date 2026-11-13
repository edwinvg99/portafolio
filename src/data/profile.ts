// Datos de perfil compartidos por los archivos para agentes de IA (/llms.txt, /llms-full.txt).
// Si cambias experiencia o formación en los componentes, actualiza también aquí.

export const SITE = 'https://edwin-portafolio.up.railway.app';

export const profile = {
  name: 'Edwin Velásquez Giraldo',
  role: 'Desarrollador Full Stack · Ingeniero de Software',
  location: 'Medellín, Colombia (abierto a remoto)',
  email: 'velasquezgiraldoedwin@gmail.com',
  whatsapp: 'https://wa.me/573042225380',
  github: 'https://github.com/edwinvg99',
  languages: 'Español nativo · Inglés A2 (lectura técnica)',
  summary:
    'Lleva 4 años creando plataformas web, SaaS, puntos de venta y apps de escritorio para clientes reales. ' +
    'Se enfoca en entender el negocio, diseñar bases de datos sólidas y entregar software mantenible que sigue funcionando después del lanzamiento.',
};

export const skills: Record<string, string[]> = {
  Lenguajes: ['TypeScript', 'JavaScript', 'Python', 'PowerShell'],
  'Front-end': ['React', 'Next.js', 'Astro', 'Vite', 'Tailwind CSS', 'Remotion'],
  'Back-end': ['Node.js', 'Express', 'APIs REST', 'Workers 24/7', 'Django', 'Better Auth / JWT', '.NET (WPF)'],
  Datos: ['PostgreSQL', 'Prisma', 'Drizzle', 'MongoDB', 'MySQL', 'Redis'],
  'Cloud y DevOps': ['Railway', 'Cloudflare (Workers, R2)', 'Vercel', 'Docker', 'GitHub Actions', 'Git'],
  'IA aplicada': ['Claude Code', 'Codex / ChatGPT', 'Gemini (API y Antigravity)', 'MCP', 'Skills y agentes en bucle', 'Ollama', 'WhisperX'],
  'Forma de trabajo': ['Scrum', 'Git Flow', 'UX/UI', 'Documentación'],
};

export const experience = [
  {
    role: 'Fundador y desarrollador Full Stack', org: 'CamMetrics (SaaS propio)', period: '2026 — presente',
    points: ['SaaS de analítica en tiempo real: web en Next.js, worker 24/7 y PostgreSQL en Railway.', 'Suscripciones con pasarela de pagos, alertas por Telegram, cifrado de credenciales, Sentry y PostHog.'],
  },
  {
    role: 'Desarrollador Full Stack y Automatización', org: 'El Derecho Para Todos', period: 'jun. 2025 — presente',
    points: ['CodeLegal: e-commerce de cursos con más de 2.000 usuarios y 3.000 matrículas; migración desde la plataforma anterior sin pérdida de datos.', 'Aula Virtual PGN (concurso de la Procuraduría) y Academia GOBERNAR (diplomados, masterclasses y admisiones).', 'Automatización de procesos internos; despliegues en Railway y Cloudflare.'],
  },
  {
    role: 'Desarrollador Full Stack · Campañas políticas', org: 'Consultoría digital', period: '2025 — 2026',
    points: ['Landing pages y sistemas de registro a escala nacional integrados con Google Sheets.', '"El Balón de la Gente": concurso ciudadano para una campaña a la Alcaldía de Itagüí.'],
  },
  {
    role: 'Desarrollador Full Stack freelance', org: 'Proyectos independientes', period: '2022 — presente',
    points: ['Del Campo POS: punto de venta, inventario y tienda online para un restaurante en Bogotá.', 'Sitios, dashboards y automatizaciones para pequeñas empresas.'],
  },
  {
    role: 'Practicante de Soporte TI', org: 'Algar Tech — SAP SURA', period: '2023',
    points: ['Gestión de incidentes de plataformas SAP, documentación y escalamiento.'],
  },
];

export const education = [
  'Ingeniero en Software — Tecnológico de Antioquia, Institución Universitaria (graduado el 13 de agosto de 2026). Proyecto de grado: Energía Clara.',
  'Tecnólogo en Sistemas — Tecnológico de Antioquia (2024).',
  'Técnico Profesional en Sistemas — Tecnológico de Antioquia (2023).',
  'Scrum Foundation Professional Certification (SFPC) — CertiProf (2024).',
  'Oracle Next Education (ONE), formación Full Stack — Oracle + Alura Latam (2022 — 2023).',
  'Ética Profesional (36 h) — COPNIA (2023).',
];
