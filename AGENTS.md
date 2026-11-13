# AGENTS.md — guía para agentes de IA que trabajen en este repositorio

Portafolio personal de **Edwin Velásquez Giraldo** (Desarrollador Full Stack, Medellín). Sitio estático hecho con **Astro 5 + Tailwind CSS 4**, sin framework de cliente: el comportamiento (idioma, carruseles, visor de imágenes, animaciones) son scripts pequeños dentro de los componentes `.astro`.

> ¿Quieres **analizar el perfil** y no modificar el código? Lee `/llms.txt` o `/llms-full.txt` del sitio publicado: tienen todo el contexto en texto plano.

## Estructura

| Ruta | Qué contiene |
|---|---|
| `src/pages/index.astro` | Página única; orden de secciones. |
| `src/components/*.astro` | Navbar, Hero, About, Projects, AI, Experience, Education, Contact, FloatingButtons. |
| `src/data/projects.ts` | **Fuente de verdad de los proyectos** (`featured` y `more`), en español e inglés. |
| `src/data/profile.ts` | Perfil, habilidades, experiencia y formación para `/llms.txt` y `/llms-full.txt`. |
| `src/data/tech-logos.json`, `ai-logos.json` | Íconos (simple-icons) de los carruseles. |
| `src/pages/llms.txt.ts`, `llms-full.txt.ts` | Generan los archivos para agentes a partir de los datos. |
| `src/layouts/Layout.astro` | `<head>`, SEO, script de idioma, revelado al hacer scroll y carruseles. |
| `src/styles/global.css` | Tokens de color y tipografía, utilidades e i18n (`.es-only` / `.en-only`). |
| `public/projects/<slug>/0N.webp` | Capturas de cada proyecto (1440 px de ancho, WebP). |
| `public/certificados/` | Diplomas y certificados **con datos sensibles ocultos**. |
| `public/cv.html` → `public/edwinVelasquezCV.pdf` | CV editable en HTML; exportar a PDF A4 de una página tras editarlo. |

## Cómo agregar o editar un proyecto

1. Copia las capturas a `public/projects/<slug>/01.webp`, `02.webp`… (WebP, ~1440 px).
2. Agrega una entrada en `featured` o `more` en `src/data/projects.ts` con textos `es` y `en`.
3. `npm run build` para validar. `/llms.txt` y `/llms-full.txt` se actualizan solos.

## Reglas del proyecto

- **Privacidad:** nunca publiques números de cédula, códigos QR de verificación ni nombres reales de usuarios de clientes. Pixela o recorta antes de subir capturas.
- **Sin enlaces en vivo** a proyectos: muchos requieren inicio de sesión o listas blancas. Solo se enlaza código público de GitHub.
- No nombres plataformas de terceros a las que reemplazó un proyecto.
- Paleta: negro neutro, blanco cálido y un único acento naranja (`--accent`). Sin degradados azul/morado.
- Todo texto visible va en los dos idiomas (`<span class="es-only">…</span><span class="en-only">…</span>`).
- El despliegue es automático en Railway al hacer push a `main`: no hagas push sin aprobación del dueño.

## Comandos

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
```
