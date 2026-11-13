// /llms.txt — índice para agentes de IA (formato https://llmstxt.org).
import type { APIRoute } from 'astro';
import { featured, more } from '../data/projects';
import { SITE, profile } from '../data/profile';

export const GET: APIRoute = () => {
  const project = (p: (typeof featured)[number]) =>
    `- [${p.name}](${SITE}/#projects): ${p.kind.es}. ${p.role.es}, ${p.year}. Stack: ${p.stack.join(', ')}.`;

  const body = `# ${profile.name} — Portafolio

> ${profile.role} en ${profile.location}. ${profile.summary}

Este sitio es un portafolio estático en español e inglés (botón ES/EN). Muchos proyectos son de clientes o requieren inicio de sesión, por eso se muestran con capturas reales o con datos de demostración en lugar de enlaces en vivo.

Para el contexto completo en un solo archivo (perfil, cada proyecto con detalles técnicos, experiencia, formación y contacto), lee [llms-full.txt](${SITE}/llms-full.txt).

## Secciones del sitio

- [Inicio](${SITE}/#top): presentación, cifras clave y tecnologías.
- [Sobre mí](${SITE}/#about): perfil y stack agrupado por área.
- [Proyectos](${SITE}/#projects): 6 casos destacados con carrusel de capturas y 6 proyectos más con filtros.
- [Desarrollo con IA](${SITE}/#ai): cómo usa agentes de IA en proyectos reales.
- [Experiencia](${SITE}/#experience): línea de tiempo laboral.
- [Formación](${SITE}/#education): título de Ingeniero en Software y certificaciones.
- [Contacto](${SITE}/#contact): correo y WhatsApp.

## Proyectos destacados

${featured.map(project).join('\n')}

## Más proyectos

${more.map(project).join('\n')}

## Documentos

- [Hoja de vida (PDF)](${SITE}/edwinVelasquezCV.pdf): CV de una página en español.
- [Hoja de vida (HTML)](${SITE}/cv.html): misma información en texto plano, más fácil de leer para una IA.
- [Diploma de Ingeniero en Software](${SITE}/certificados/diploma-ingeniero-software.webp): imagen con el número de documento oculto.

## Contacto

- Correo: ${profile.email}
- WhatsApp: ${profile.whatsapp}
- GitHub: ${profile.github}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
