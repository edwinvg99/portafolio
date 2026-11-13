# Edwin Velasquez — Personal Portfolio

Personal portfolio built with Astro and Tailwind CSS. Bilingual (Spanish / English), static, with no client framework: small inline scripts handle the language toggle, project carousels, lightbox and scroll reveals.

## Tech Stack

| Layer      | Technology                              |
|------------|-----------------------------------------|
| Framework  | Astro 5                                 |
| Styling    | Tailwind CSS v4                         |
| Language   | TypeScript                              |
| Animations | CSS + IntersectionObserver |
| Build tool | Vite (via Astro)                        |

## Sections

- **Hero** — headline, availability, CV download, key stats
- **About** — profile and grouped tech stack
- **Projects** — 6 case studies with screenshot carousels + filterable grid of more projects (data in `src/data/projects.ts`, images in `public/projects/<slug>/`)
- **AI** — AI-assisted engineering workflow
- **Experience** — timeline
- **Education** — degree (diploma with ID masked), certifications
- **Contact** — email (copy / mailto) and WhatsApp; no form

The CV lives in `public/cv.html`; export it to `public/edwinVelasquezCV.pdf` (A4, one page) after editing.

## Getting Started

**Prerequisites:** Node.js 18 or higher.

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server runs at `http://localhost:4321` by default.

## Project Structure

```
src/
  components/   # UI components (Astro + React)
  hooks/        # Custom React hooks (language toggle)
  layouts/      # Base page layout
  pages/        # Astro file-based routes
  styles/       # Global CSS
public/         # Static assets (images, CV PDF, favicon)
```

## Contact

- GitHub: [github.com/edwinvg99](https://github.com/edwinvg99)
- Email: velasquezgiraldoedwin@gmail.com
- WhatsApp: +57 304 222 5380
