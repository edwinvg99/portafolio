import { useRef, useEffect } from 'react';
import anime from 'animejs';
import { useLanguage } from '../hooks/useLanguage';

/* ── translations ─────────────────────────────────────────────── */
const T = {
  es: {
    available:    'Ingeniero de software',
    greeting:     'Hola, soy',
    subtitle:     'Desarrollador Full Stack & Programador Creativo',
    desc1:        'Construyo experiencias digitales elegantes y eficientes, desde interfaces pixel-perfect hasta sistemas backend robustos. Actualmente exploro la intersección entre',
    creativity:   'creatividad',
    and:          'e',
    engineering:  'ingeniería',
    viewProjects: 'Ver proyectos',
    contact:      'Contáctame',
    downloadCV:   'Descargar CV',
    findMe:       'ENCUÉNTRAME EN',
    scroll:       'DESLIZA',
  },
  en: {
    available:    'Software Engineer',
    greeting:     "Hi, I'm",
    subtitle:     'Full Stack Developer & Creative Coder',
    desc1:        'I build elegant, performant digital experiences from pixel-perfect UIs to robust back-end systems. Currently exploring the intersection of',
    creativity:   'creativity',
    and:          'and',
    engineering:  'engineering',
    viewProjects: 'View Projects',
    contact:      'Get in Touch',
    downloadCV:   'Download CV',
    findMe:       'FIND ME ON',
    scroll:       'SCROLL',
  },
};

/* ── social icons ─────────────────────────────────────────────── */
function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function GmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
    </svg>
  );
}

/* ── animated greeting ────────────────────────────────────────── */
function AnimatedGreeting({ greeting, name }: { greeting: string; name: string }) {
  const wrapRef    = useRef<HTMLHeadingElement>(null);
  const didAnimate = useRef(false);
  const loopAnim   = useRef<ReturnType<typeof anime> | null>(null);

  useEffect(() => {
    if (didAnimate.current || !wrapRef.current) return;
    didAnimate.current = true;

    const chars = wrapRef.current.querySelectorAll<HTMLElement>('.anim-char');
    if (!chars.length) return;

    anime.set(chars, { opacity: 0, translateY: 60, scaleX: 0.5, scaleY: 0.3 });

    anime({
      targets: Array.from(chars),
      translateY: [{ value: 60, duration: 0 }, { value: 0 }],
      scaleX:     [{ value: 0.5, duration: 0 }, { value: 1 }],
      scaleY: [
        { value: 0.3,  duration: 0 },
        { value: 1.15, duration: 200, easing: 'easeOutQuad' },
        { value: 0.85, duration: 120, easing: 'easeInOutSine' },
        { value: 1,    duration: 500, easing: 'easeOutElastic(1, .6)' },
      ],
      opacity: [{ value: 0, duration: 0 }, { value: 1, duration: 120, easing: 'linear' }],
      duration: 900,
      delay: anime.stagger(55, { from: 'first' }),
      complete: () => {
        loopAnim.current = anime({
          targets: wrapRef.current,
          translateY: [0, -5, 0],
          duration: 2600,
          easing: 'easeInOutSine',
          loop: true,
          delay: 300,
        });
      },
    });

    return () => { loopAnim.current?.pause(); };
  }, []);

  /* Identical technique for both parts: display:inline-block + color.
     No background-clip:text — that causes ink-overflow clipping with
     display/handwriting fonts, making ascenders appear cut. */
  const toChars = (text: string, color: string) =>
    text.split('').map((ch, i) => (
      <span
        key={i}
        className="anim-char"
        style={{
          display: 'inline-block',
          transformOrigin: '50% 100% 0',
          color,
        }}
      >
        {ch === ' ' ? ' ' : ch}
      </span>
    ));

  return (
    <h1
      ref={wrapRef}
      className="reveal"
      style={{
        fontFamily: 'var(--font-art)',
        fontSize: 'clamp(3rem, 7vw, 5.5rem)',
        fontWeight: 700,
        lineHeight: 1.4,
        marginBottom: '8px',
        overflow: 'visible',
        display: 'block',
      }}
    >
      {toChars(greeting + ' ', 'var(--text)')}
      {toChars(name, 'var(--cyan)')}
    </h1>
  );
}

/* ── main component ───────────────────────────────────────────── */
export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { lang }  = useLanguage();
  const tx        = T[lang];

  /* canvas blobs */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let raf: number;
    let t = 0;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const blobs = [
      { x: 0.15, y: 0.3,  r: 200, color: 'rgba(139,92,246,0.13)', speed: 0.0008, phase: 0   },
      { x: 0.8,  y: 0.2,  r: 170, color: 'rgba(34,211,238,0.10)', speed: 0.001,  phase: 2   },
      { x: 0.6,  y: 0.75, r: 220, color: 'rgba(99,102,241,0.11)', speed: 0.0007, phase: 4   },
      { x: 0.3,  y: 0.7,  r: 130, color: 'rgba(236,72,153,0.08)', speed: 0.0012, phase: 1.5 },
    ];

    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      blobs.forEach((b) => {
        const x    = (b.x + 0.04 * Math.sin(t * b.speed + b.phase)) * canvas.width;
        const y    = (b.y + 0.04 * Math.cos(t * b.speed + b.phase + 1)) * canvas.height;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, b.r);
        grad.addColorStop(0, b.color);
        grad.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(x, y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });
      ctx.strokeStyle = 'rgba(99,120,180,0.04)';
      ctx.lineWidth   = 1;
      const step = 60;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  const socials = [
    { icon: 'github',   href: 'https://github.com/edwinvg99',          label: 'GitHub'   },
    { icon: 'whatsapp', href: 'https://wa.me/573042225380',             label: 'WhatsApp' },
    { icon: 'gmail',    href: 'mailto:velasquezgiraldoedwin@gmail.com', label: 'Gmail'    },
  ];

  const SocialIcon = ({ name }: { name: string }) => {
    if (name === 'github')   return <GithubIcon />;
    if (name === 'whatsapp') return <WhatsAppIcon />;
    return <GmailIcon />;
  };

  const iconColor: Record<string, string> = {
    github:   'var(--purple)',
    whatsapp: '#25d366',
    gmail:    '#ea4335',
  };

  return (
    <section
      id="hero"
      style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', padding: 0, overflow: 'visible' }}
    >
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }} />

      {/* Floating decorations */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '8%', right: '5%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)', borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%', animation: 'blob-morph 8s ease-in-out infinite, float1 7s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '3%', width: 250, height: 250, background: 'radial-gradient(circle, rgba(34,211,238,0.09) 0%, transparent 70%)', borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%', animation: 'blob-morph 10s ease-in-out infinite reverse, float2 9s ease-in-out infinite' }} />
        <svg style={{ position: 'absolute', top: '20%', right: '12%', opacity: 0.18 }} width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="55" fill="none" stroke="url(#gCircleH)" strokeWidth="1.5" strokeDasharray="8 6" style={{ animation: 'spin-slow 20s linear infinite' }} />
          <circle cx="60" cy="60" r="38" fill="none" stroke="url(#gCircle2H)" strokeWidth="1" strokeDasharray="4 8" style={{ animation: 'spin-slow 14s linear infinite reverse' }} />
          <defs>
            <linearGradient id="gCircleH"  x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#8b5cf6" /><stop offset="100%" stopColor="#22d3ee" /></linearGradient>
            <linearGradient id="gCircle2H" x1="1" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#22d3ee" /><stop offset="100%" stopColor="#ec4899" /></linearGradient>
          </defs>
        </svg>
        <svg style={{ position: 'absolute', bottom: '30%', right: '20%', opacity: 0.25, animation: 'float3 5s ease-in-out infinite' }} width="24" height="24" viewBox="0 0 24 24">
          <line x1="12" y1="2" x2="12" y2="22" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" />
          <line x1="2" y1="12" x2="22" y2="12" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <svg style={{ position: 'absolute', top: '50%', left: '8%', opacity: 0.2, animation: 'float1 6s ease-in-out infinite' }} width="20" height="20" viewBox="0 0 20 20">
          <line x1="10" y1="1" x2="10" y2="19" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
          <line x1="1" y1="10" x2="19" y2="10" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '80px', overflow: 'visible' }}>
        <div style={{ maxWidth: '700px', overflow: 'visible' }}>

          {/* Available badge */}
          <div className="reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '50px', border: '1px solid rgba(34,211,238,0.3)', background: 'rgba(34,211,238,0.07)', marginBottom: '28px' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--cyan)', display: 'inline-block', animation: 'pulse-glow 2s infinite' }} />
            <span style={{ color: 'var(--cyan)', fontFamily: 'var(--font-art)', fontSize: '1rem', fontWeight: 500 }}>{tx.available}</span>
          </div>

          {/* Animated greeting */}
          <AnimatedGreeting greeting={tx.greeting} name="Edwin" />

          {/* Subtitle with gradient underline */}
          <h2 className="reveal" style={{ fontFamily: 'var(--font-art)', fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '24px' }}>
            <span style={{ position: 'relative', display: 'inline-block', paddingBottom: '8px' }}>
              {tx.subtitle}
              <span style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, var(--purple), var(--cyan))',
                borderRadius: '2px',
                opacity: 0.85,
              }} />
            </span>
          </h2>

          <p className="reveal" style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '520px', lineHeight: 1.75, marginBottom: '40px' }}>
            {tx.desc1}{' '}
            <span style={{ color: 'var(--cyan)', fontWeight: 500 }}>{tx.creativity}</span>{' '}
            {tx.and}{' '}
            <span style={{ color: 'var(--cyan)', fontWeight: 500 }}>{tx.engineering}</span>.
          </p>

          {/* CTA buttons */}
          <div className="reveal" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="#projects" className="btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
              </svg>
              {tx.viewProjects}
            </a>

            <a href="#contact" className="btn-outline">{tx.contact}</a>

            {/* Download CV */}
            <a
              href="/edwinVelasquezCV.pdf"
              download
              className="btn-outline"
              style={{ borderColor: 'rgba(34,211,238,0.4)', gap: '8px' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--cyan)';
                e.currentTarget.style.color = 'var(--cyan)';
                e.currentTarget.style.background = 'rgba(34,211,238,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(34,211,238,0.4)';
                e.currentTarget.style.color = '';
                e.currentTarget.style.background = '';
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {tx.downloadCV}
            </a>
          </div>

          {/* Social links */}
          <div className="reveal" style={{ display: 'flex', gap: '20px', marginTop: '48px', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>{tx.findMe}</span>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                title={s.label}
                aria-label={s.label}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = iconColor[s.icon])}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                <SocialIcon name={s.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: 'var(--text-dim)', fontSize: '0.75rem', letterSpacing: '0.1em', animation: 'float2 2.5s ease-in-out infinite' }}>
        <span>{tx.scroll}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
