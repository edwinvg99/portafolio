import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';

// ── Web3Forms ─────────────────────────────────────────────────
// Configura PUBLIC_WEB3FORMS_KEY en el archivo .env (nunca en el código)
const WEB3FORMS_KEY = import.meta.env.PUBLIC_WEB3FORMS_KEY as string;

const WHATSAPP_NUMBER = '573042225380';
const EMAIL           = 'velasquezgiraldoedwin@gmail.com';
const GITHUB          = 'https://github.com/edwinvg99';

const WA_MSG = {
  es: 'Hola Edwin, vi tu portafolio y me gustaría hablar contigo sobre un proyecto.',
  en: 'Hi Edwin, I saw your portfolio and would like to talk to you about a project.',
};

const T = {
  es: {
    sectionLabel: '// Hablemos',
    title:        'Contáctame',
    subtitle:     '¿Tienes un proyecto en mente? Estoy disponible para colaborar y construir algo increíble.',
    formTitle:    'Envíame un mensaje',
    name:         'Nombre',
    namePh:       'Tu nombre',
    email:        'Correo electrónico',
    emailPh:      'tu@email.com',
    message:      'Mensaje',
    messagePh:    'Cuéntame sobre tu proyecto...',
    send:         'Enviar mensaje',
    sending:      'Enviando...',
    success:      '¡Mensaje enviado! Te respondo pronto.',
    error:        'Algo salió mal. Inténtalo de nuevo.',
    whyTitle:     '¿Por qué trabajar conmigo?',
    reasons: [
      { title: 'Comunicación clara',    desc: 'Te escucho y entiendo tus necesidades' },
      { title: 'Compromiso total',      desc: 'Me involucro al 100% en tu proyecto'   },
      { title: 'Entrega eficiente',     desc: 'Respeto los tiempos y cumplo objetivos'},
      { title: 'Código de calidad',     desc: 'Soluciones limpias y escalables'       },
    ],
    ctaTitle: '¿Listo para empezar?',
    ctaDesc:  'Hagamos algo increíble juntos',
    emailLabel: 'Correo',
    waLabel:    'WhatsApp',
    ghLabel:    'GitHub',
    footerBy:   'Diseñado y construido con',
    footerName: 'Edwin Velasquez',
    footerYear: '© 2025 Todos los derechos reservados',
  },
  en: {
    sectionLabel: "// Let's Talk",
    title:        'Get in Touch',
    subtitle:     'Have a project in mind? I\'m available to collaborate and build something incredible.',
    formTitle:    'Send me a message',
    name:         'Name',
    namePh:       'Your name',
    email:        'Email',
    emailPh:      'you@email.com',
    message:      'Message',
    messagePh:    'Tell me about your project...',
    send:         'Send message',
    sending:      'Sending...',
    success:      'Message sent! I\'ll reply soon.',
    error:        'Something went wrong. Please try again.',
    whyTitle:     'Why work with me?',
    reasons: [
      { title: 'Clear communication', desc: 'I listen and understand your needs'       },
      { title: 'Full commitment',     desc: 'I\'m 100% involved in your project'       },
      { title: 'Efficient delivery',  desc: 'I respect timelines and meet objectives'  },
      { title: 'Quality code',        desc: 'Clean and scalable solutions'             },
    ],
    ctaTitle: 'Ready to start?',
    ctaDesc:  'Let\'s build something amazing together',
    emailLabel: 'Email',
    waLabel:    'WhatsApp',
    ghLabel:    'GitHub',
    footerBy:   'Designed and built with',
    footerName: 'Edwin Velasquez',
    footerYear: '© 2025 All rights reserved',
  },
};

const reasonIcons = [
  // chat bubble
  <svg key="0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  // heart
  <svg key="1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"/></svg>,
  // zap
  <svg key="2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  // code
  <svg key="3" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
];

const COOLDOWN_MS  = 60_000;   // 1 min entre envíos
const MAX_PER_HOUR = 5;        // máximo 5 por hora

function checkRateLimit(): { allowed: boolean; secondsLeft: number } {
  const now      = Date.now();
  const last     = parseInt(localStorage.getItem('cv_last')  || '0');
  const count    = parseInt(localStorage.getItem('cv_count') || '0');
  const reset    = parseInt(localStorage.getItem('cv_reset') || '0');

  // Reinicia el contador cada hora
  if (now - reset > 3_600_000) {
    localStorage.setItem('cv_count', '0');
    localStorage.setItem('cv_reset', String(now));
  }

  const sinceLastMs = now - last;
  if (sinceLastMs < COOLDOWN_MS)
    return { allowed: false, secondsLeft: Math.ceil((COOLDOWN_MS - sinceLastMs) / 1000) };

  const currentCount = parseInt(localStorage.getItem('cv_count') || '0');
  if (currentCount >= MAX_PER_HOUR)
    return { allowed: false, secondsLeft: 0 };

  return { allowed: true, secondsLeft: 0 };
}

function recordSubmit() {
  const count = parseInt(localStorage.getItem('cv_count') || '0');
  localStorage.setItem('cv_last',  String(Date.now()));
  localStorage.setItem('cv_count', String(count + 1));
  if (!localStorage.getItem('cv_reset'))
    localStorage.setItem('cv_reset', String(Date.now()));
}

export default function Contact() {
  const { lang } = useLanguage();
  const tx       = T[lang];
  const [status,    setStatus]    = useState<'idle' | 'loading' | 'success' | 'error' | 'rate_limited'>('idle');
  const [cooldown,  setCooldown]  = useState(0);

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WA_MSG[lang])}`;

  const quickLinks = [
    { label: tx.emailLabel, value: 'vg.edwin@gmail.com', href: `mailto:${EMAIL}`, color: '#22d3ee',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
    { label: tx.waLabel,    value: '+57 304 222 5380', href: waHref,              color: '#25d366',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
    { label: tx.ghLabel,    value: '@edwinvg99',         href: GITHUB,            color: '#a78bfa',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg> },
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // ── Rate limiting ──────────────────────────────────────────
    const { allowed, secondsLeft } = checkRateLimit();
    if (!allowed) {
      setCooldown(secondsLeft);
      setStatus('rate_limited');
      return;
    }

    setStatus('loading');

    // ── FormData (patrón oficial Web3Forms) ────────────────────
    const formData = new FormData(e.currentTarget);
    formData.append('access_key', WEB3FORMS_KEY);
    formData.append('subject',    `Nuevo mensaje del portfolio — ${formData.get('name')}`);
    formData.append('from_name',  'Portfolio Contact Form');

    try {
      const res  = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        recordSubmit();
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '11px 14px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(99,120,180,0.22)',
    borderRadius: '10px',
    color: 'var(--text)', fontSize: '0.9rem',
    outline: 'none', transition: 'border-color 0.2s',
    fontFamily: 'var(--font-body)',
  };

  return (
    <section
      id="contact"
      style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, var(--bg2) 0%, var(--bg) 100%)', borderTop: '1px solid rgba(34,211,238,0.12)' }}
    >
      {/* ── Grid texture background ──────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {/* dot grid */}
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.18 }}>
          <defs>
            <pattern id="dotgrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="rgba(34,211,238,0.55)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotgrid)" />
        </svg>
        {/* circuit traces */}
        <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.07 }}>
          <g stroke="#22d3ee" strokeWidth="1" fill="none">
            <polyline points="0,80 120,80 160,120 340,120 380,80 600,80"/>
            <polyline points="600,80 640,40 800,40 840,80 1200,80"/>
            <polyline points="0,300 80,300 120,260 280,260 320,300 480,300 520,340 700,340 740,300 900,300"/>
            <polyline points="200,0 200,120 240,160 240,260"/>
            <polyline points="700,0 700,40 740,80 740,300"/>
            <polyline points="1000,80 1000,200 960,240 960,400 1000,440 1200,440"/>
            <polyline points="0,480 160,480 200,440 400,440 440,480 560,480"/>
            <circle cx="120" cy="80"  r="4" fill="#22d3ee"/>
            <circle cx="380" cy="80"  r="4" fill="#22d3ee"/>
            <circle cx="640" cy="40"  r="4" fill="#22d3ee"/>
            <circle cx="840" cy="80"  r="4" fill="#22d3ee"/>
            <circle cx="320" cy="300" r="4" fill="#22d3ee"/>
            <circle cx="520" cy="340" r="4" fill="#22d3ee"/>
            <circle cx="740" cy="300" r="4" fill="#22d3ee"/>
            <circle cx="960" cy="240" r="4" fill="#22d3ee"/>
            <circle cx="200" cy="120" r="4" fill="#22d3ee"/>
            <circle cx="700" cy="40"  r="4" fill="#22d3ee"/>
          </g>
        </svg>
        {/* glow orbs */}
        <div style={{ position: 'absolute', top: '10%', right: '8%', width: 320, height: 320, background: 'radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '15%', left: '5%', width: 260, height: 260, background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)', borderRadius: '50%' }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Header ──────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: '52px' }} className="reveal">
          <p className="section-label">
            <span className="es-only">{T.es.sectionLabel}</span>
            <span className="en-only">{T.en.sectionLabel}</span>
          </p>
          <h2 className="section-title">
            <span className="es-only">{T.es.title}</span>
            <span className="en-only">{T.en.title}</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '460px', margin: '0 auto', fontSize: '0.97rem', lineHeight: 1.7 }}>
            <span className="es-only">{T.es.subtitle}</span>
            <span className="en-only">{T.en.subtitle}</span>
          </p>
        </div>

        {/* ── Quick links ──────────────────────────────────────── */}
        <div className="cq-links reveal">
          {quickLinks.map((q) => (
            <a key={q.label} href={q.href} target="_blank" rel="noopener noreferrer"
               className="cq-link" style={{ '--qc': q.color } as React.CSSProperties}>
              <span className="cq-icon" style={{ color: q.color }}>{q.icon}</span>
              <div>
                <p className="cq-label">{q.label}</p>
                <p className="cq-value">{q.value}</p>
              </div>
              <svg className="cq-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          ))}
        </div>

        {/* ── Main grid ────────────────────────────────────────── */}
        <div className="cq-grid">

          {/* Form */}
          <div className="cq-form-wrap sketch-card reveal">
            <h3 style={{ fontFamily: 'var(--font-art)', fontSize: '1.4rem', color: 'var(--text)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
              <span className="es-only">{T.es.formTitle}</span>
              <span className="en-only">{T.en.formTitle}</span>
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Honeypot — bots lo rellenan, Web3Forms lo rechaza automáticamente */}
              <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }} className="cq-form-row">
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '6px' }}>
                    <span className="es-only">{T.es.name}</span>
                    <span className="en-only">{T.en.name}</span>
                  </label>
                  <input name="name" required style={inputStyle}
                    onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(34,211,238,0.55)'}
                    onBlur={(e)  => e.currentTarget.style.borderColor = 'rgba(99,120,180,0.22)'}
                    placeholder={lang === 'es' ? T.es.namePh : T.en.namePh} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '6px' }}>
                    <span className="es-only">{T.es.email}</span>
                    <span className="en-only">{T.en.email}</span>
                  </label>
                  <input name="email" type="email" required style={inputStyle}
                    onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(34,211,238,0.55)'}
                    onBlur={(e)  => e.currentTarget.style.borderColor = 'rgba(99,120,180,0.22)'}
                    placeholder={lang === 'es' ? T.es.emailPh : T.en.emailPh} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '6px' }}>
                  <span className="es-only">{T.es.message}</span>
                  <span className="en-only">{T.en.message}</span>
                </label>
                <textarea name="message" required rows={5} style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(34,211,238,0.55)'}
                  onBlur={(e)  => e.currentTarget.style.borderColor = 'rgba(99,120,180,0.22)'}
                  placeholder={lang === 'es' ? T.es.messagePh : T.en.messagePh} />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  padding: '12px 28px', borderRadius: '50px', border: 'none', cursor: status === 'loading' ? 'wait' : 'pointer',
                  background: 'linear-gradient(135deg, #0ea5e9, #22d3ee)',
                  color: '#fff', fontWeight: 600, fontSize: '0.95rem',
                  boxShadow: '0 4px 20px rgba(34,211,238,0.3)',
                  transition: 'transform 0.2s, box-shadow 0.2s, opacity 0.2s',
                  opacity: status === 'loading' ? 0.7 : 1,
                  fontFamily: 'var(--font-body)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                }}
                onMouseEnter={(e) => { if (status !== 'loading') { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(34,211,238,0.45)'; }}}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(34,211,238,0.3)'; }}
              >
                {status === 'loading' ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 1s linear infinite' }}>
                      <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.25"/>
                      <path d="M21 12a9 9 0 00-9-9"/>
                    </svg>
                    <span className="es-only">{T.es.sending}</span>
                    <span className="en-only">{T.en.sending}</span>
                  </>
                ) : (
                  <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                    <span className="es-only">{T.es.send}</span>
                    <span className="en-only">{T.en.send}</span>
                  </>
                )}
              </button>

              {status === 'rate_limited' && (
                <div style={{ padding: '12px 16px', borderRadius: '10px', background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', color: '#fbbf24', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  {cooldown > 0
                    ? `Espera ${cooldown}s antes de enviar otro mensaje.`
                    : 'Límite de mensajes alcanzado. Inténtalo más tarde.'}
                </div>
              )}
              {status === 'success' && (
                <div style={{ padding: '12px 16px', borderRadius: '10px', background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.3)', color: 'var(--cyan)', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span className="es-only">{T.es.success}</span>
                  <span className="en-only">{T.en.success}</span>
                </div>
              )}
              {status === 'error' && (
                <div style={{ padding: '12px 16px', borderRadius: '10px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                  <span className="es-only">{T.es.error}</span>
                  <span className="en-only">{T.en.error}</span>
                </div>
              )}
            </form>
          </div>

          {/* Info panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="sketch-card reveal" style={{ padding: '28px' }}>
              <h3 style={{ fontFamily: 'var(--font-art)', fontSize: '1.25rem', color: 'var(--text)', marginBottom: '20px' }}>
                <span className="es-only">{T.es.whyTitle}</span>
                <span className="en-only">{T.en.whyTitle}</span>
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {tx.reasons.map((r, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '10px', background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--cyan)' }}>
                      {reasonIcons[i]}
                    </div>
                    <div>
                      <p style={{ color: 'var(--text)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '2px' }}>{r.title}</p>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{r.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA card */}
            <div className="reveal" style={{ padding: '24px', borderRadius: 'var(--radius)', background: 'linear-gradient(135deg, rgba(14,165,233,0.15), rgba(34,211,238,0.08))', border: '1px solid rgba(34,211,238,0.25)', textAlign: 'center' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(34,211,238,0.15)', border: '1px solid rgba(34,211,238,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', color: 'var(--cyan)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <p style={{ fontFamily: 'var(--font-art)', fontSize: '1.1rem', color: 'var(--text)', marginBottom: '6px' }}>
                <span className="es-only">{T.es.ctaTitle}</span>
                <span className="en-only">{T.en.ctaTitle}</span>
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <span className="es-only">{T.es.ctaDesc} 🚀</span>
                <span className="en-only">{T.en.ctaDesc} 🚀</span>
              </p>
            </div>
          </div>
        </div>

        {/* ── Footer ───────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginTop: '72px', paddingTop: '32px', borderTop: '1px solid var(--card-border)' }}>
          <p style={{ fontFamily: 'var(--font-art)', fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
            <span className="es-only">{T.es.footerBy} ❤️ por {T.es.footerName}</span>
            <span className="en-only">{T.en.footerBy} ❤️ by {T.en.footerName}</span>
          </p>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>
            <span className="es-only">{T.es.footerYear}</span>
            <span className="en-only">{T.en.footerYear}</span>
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '20px' }}>
            {[
              { href: GITHUB, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg> },
              { href: 'https://linkedin.com/in/edwinvg99', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
              { href: 'https://twitter.com/edwinvg99', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                 style={{ color: 'var(--text-dim)', transition: 'color 0.2s' }}
                 onMouseEnter={(e) => e.currentTarget.style.color = 'var(--cyan)'}
                 onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-dim)'}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .cq-links {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 40px;
        }
        .cq-link {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 18px 20px;
          background: var(--card);
          border: 1.5px solid var(--card-border);
          border-radius: var(--radius-sm);
          text-decoration: none;
          transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
          position: relative;
          overflow: hidden;
        }
        .cq-link::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, color-mix(in srgb, var(--qc) 8%, transparent), transparent);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .cq-link:hover { border-color: var(--qc); transform: translateY(-3px); box-shadow: 0 8px 28px color-mix(in srgb, var(--qc) 20%, transparent); }
        .cq-link:hover::before { opacity: 1; }
        .cq-icon { display: flex; flex-shrink: 0; }
        .cq-label { color: var(--text-dim); font-size: 0.7rem; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 2px; }
        .cq-value { color: var(--text); font-size: 0.85rem; font-weight: 500; }
        .cq-arrow { color: var(--text-dim); margin-left: auto; flex-shrink: 0; opacity: 0; transition: opacity 0.2s, transform 0.2s; }
        .cq-link:hover .cq-arrow { opacity: 1; transform: translateX(3px); }

        .cq-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 28px;
          align-items: start;
        }
        .cq-form-wrap { padding: 32px; }

        @keyframes spin { to { transform: rotate(360deg); } }

        @media (max-width: 900px) {
          .cq-links { grid-template-columns: 1fr; }
          .cq-grid  { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .cq-form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
