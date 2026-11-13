// /llms-full.txt — todo el contexto del portafolio en un solo archivo markdown para agentes de IA.
import type { APIRoute } from 'astro';
import { featured, more, type Project } from '../data/projects';
import { SITE, profile, skills, experience, education } from '../data/profile';

const section = (p: Project) => {
  const lines = [
    `### ${p.name}`,
    '',
    `- Tipo: ${p.kind.es}`,
    `- Rol: ${p.role.es}`,
    `- Año: ${p.year}`,
    `- Stack: ${p.stack.join(', ')}`,
  ];
  if (p.metrics?.length) lines.push(`- Cifras: ${p.metrics.map((m) => `${m.value} ${m.label.es}`).join('; ')}`);
  if (p.github) lines.push(`- Código: ${p.github}`);
  else if (p.privateRepo) lines.push('- Código: repositorio privado; demo disponible en entrevista.');
  lines.push('', p.summary.es);
  if (p.highlights.es.length) lines.push('', 'Aspectos técnicos:', ...p.highlights.es.map((h) => `- ${h}`));
  lines.push('', `Capturas: ${p.images.map((i) => SITE + i).join(', ')}`, '');
  return lines.join('\n');
};

export const GET: APIRoute = () => {
  const body = `# ${profile.name} — contexto completo del portafolio

> ${profile.role} en ${profile.location}. ${profile.summary}

Fuente: ${SITE} (sitio estático en español e inglés). Este archivo resume todo lo que muestra el sitio para que un asistente de IA pueda analizar el perfil sin recorrer cada sección. Muchos proyectos son de clientes o requieren inicio de sesión: por eso se muestran con capturas reales o con datos de demostración, sin enlaces en vivo.

## Datos clave

- Nombre: ${profile.name}
- Rol: ${profile.role}
- Ubicación: ${profile.location}
- Idiomas: ${profile.languages}
- Cifras: 14 proyectos entregados · más de 2.000 usuarios en plataformas que construyó · 4+ años construyendo software.

## Habilidades

${Object.entries(skills).map(([k, v]) => `- ${k}: ${v.join(', ')}`).join('\n')}

## Proyectos destacados

${featured.map(section).join('\n')}
## Más proyectos

${more.map(section).join('\n')}
## Desarrollo con IA

Usa modelos de lenguaje como herramienta aplicada a proyectos reales, siempre con revisión humana:
- Flujo: especificación → plan → el agente construye → pruebas y QA visual → revisión propia → producción.
- Agentes en bucle con verificación (pruebas y capturas del navegador) antes de entregar.
- Skills propias para Claude Code, por ejemplo una que arma shorts completos con las plantillas de TRUJILLO Studio.
- MCP y conectores: navegador, GitHub, documentación actualizada, Notion, Trello.
- Contexto por repositorio (CLAUDE.md / AGENTS.md) y especificaciones antes de escribir código.
- IA dentro de productos: chatbot con Gemini (Energía Clara); transcripción, subtítulos y recortes con IA local (TRUJILLO Studio).
- La arquitectura, la seguridad y la revisión final son responsabilidad suya; nunca ejecuta datos de prueba contra producción.

## Experiencia

${experience.map((e) => `### ${e.role} — ${e.org} (${e.period})\n\n${e.points.map((x) => `- ${x}`).join('\n')}\n`).join('\n')}
## Formación y certificaciones

${education.map((e) => `- ${e}`).join('\n')}

## Documentos

- Hoja de vida PDF: ${SITE}/edwinVelasquezCV.pdf
- Hoja de vida HTML: ${SITE}/cv.html
- Diploma de Ingeniero en Software (número de documento oculto): ${SITE}/certificados/diploma-ingeniero-software.webp

## Contacto

- Correo: ${profile.email}
- WhatsApp: ${profile.whatsapp}
- GitHub: ${profile.github}
- Disponibilidad: empleo remoto o presencial en Medellín, y proyectos freelance.
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
