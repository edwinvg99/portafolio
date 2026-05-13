import { useLanguage } from '../hooks/useLanguage';

const WHATSAPP_NUMBER = '573042225380';
const EMAIL           = 'velasquezgiraldoedwin@gmail.com';
const GITHUB          = 'https://github.com/edwinvg99';

const WA_MSG = {
  es: 'Hola Edwin, vi tu portafolio y me gustaría hablar contigo sobre un proyecto.',
  en: 'Hi Edwin, I saw your portfolio and would like to talk to you about a project.',
};

const T = {
  es: {
    label:       '// hablemos',
    title:       'Contáctame',
    subtitle:    '¿Tienes un proyecto en mente? ¿Quieres colaborar? ¿O simplemente saludar? Estoy disponible.',
    quote:       '«Construyamos algo\nincreíble juntos.»',
    quoteByline: '— Siempre abierto a nuevas oportunidades',
    footerBy:    'Diseñado y construido con ❤️ por Edwin Velasquez',
    emailLabel:  'Correo',
    waLabel:     'WhatsApp',
    ghLabel:     'GitHub',
  },
  en: {
    label:       "// let's talk",
    title:       'Get in Touch',
    subtitle:    'Have a project in mind? Want to collaborate? Or just say hi? I\'m available.',
    quote:       '"Let\'s build something\namazing together."',
    quoteByline: '— Always open to new opportunities',
    footerBy:    'Designed & built with ❤️ by Edwin Velasquez',
    emailLabel:  'Email',
    waLabel:     'WhatsApp',
    ghLabel:     'GitHub',
  },
};

const svgEmail = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const svgWhatsapp = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const svgGithub = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

export default function Contact() {
  const { lang } = useLanguage();
  const tx = T[lang];

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WA_MSG[lang])}`;

  const items = [
    { label: tx.emailLabel, href: `mailto:${EMAIL}`,        value: EMAIL,        icon: svgEmail,    color: '#8b5cf6', glow: 'rgba(139,92,246,0.3)'  },
    { label: tx.waLabel,    href: waHref,                   value: '+57 304 222 5380', icon: svgWhatsapp, color: '#25d366', glow: 'rgba(37,211,102,0.3)'  },
    { label: tx.ghLabel,    href: GITHUB,                   value: '@edwinvg99', icon: svgGithub,   color: '#22d3ee', glow: 'rgba(34,211,238,0.3)'  },
  ];

  return (
    <section id="contact" style={{ background: 'linear-gradient(180deg, var(--bg2) 0%, var(--bg) 100%)', borderTop: '1px solid rgba(34,211,238,0.15)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }} className="reveal">
          <p className="section-label">{tx.label}</p>
          <h2 className="section-title">{tx.title}</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto', fontSize: '1rem' }}>
            {tx.subtitle}
          </p>
        </div>

        {/* Contact buttons */}
        <div className="contact-btns reveal">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('http') || item.href.startsWith('mailto') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="contact-btn"
              style={{ '--btn-color': item.color, '--btn-glow': item.glow } as React.CSSProperties}
            >
              <span className="contact-btn-icon" style={{ color: item.color }}>
                {item.icon}
              </span>
              <div className="contact-btn-text">
                <span className="contact-btn-label">{item.label}</span>
                <span className="contact-btn-value">{item.value}</span>
              </div>
            </a>
          ))}
        </div>

        {/* Quote */}
        <div className="contact-quote reveal" style={{ marginTop: '56px' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.06, pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 200, height: 200, borderRadius: '50%', border: '1px solid var(--purple)' }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 140, height: 140, borderRadius: '50%', border: '1px solid var(--cyan)' }} />
          </div>
          <p style={{ fontFamily: 'var(--font-art)', fontSize: '1.5rem', color: 'var(--text)', marginBottom: '8px', position: 'relative', whiteSpace: 'pre-line' }}>
            {tx.quote}
          </p>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.82rem', position: 'relative' }}>
            {tx.quoteByline}
          </p>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '80px', paddingTop: '32px', borderTop: '1px solid var(--card-border)', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
          <p style={{ fontFamily: 'var(--font-art)', fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
            {tx.footerBy}
          </p>
        </div>
      </div>

      <style>{`
        .contact-btns {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 20px;
          max-width: 760px;
          margin: 0 auto;
        }
        .contact-btn {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 18px 28px;
          background: var(--card);
          border: 1.5px solid var(--card-border);
          border-radius: var(--radius-sm);
          text-decoration: none;
          transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
          min-width: 210px;
          flex: 1;
          max-width: 280px;
        }
        .contact-btn:hover {
          border-color: var(--btn-color);
          transform: translateY(-4px);
          box-shadow: 0 8px 30px var(--btn-glow);
        }
        .contact-btn-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .contact-btn-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .contact-btn-label {
          color: var(--text-dim);
          font-size: 0.73rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .contact-btn-value {
          color: var(--text);
          font-size: 0.88rem;
          font-weight: 500;
          word-break: break-all;
        }
        .contact-quote {
          padding: 28px;
          background: var(--card);
          border: 1.5px solid var(--card-border);
          border-radius: var(--radius);
          text-align: center;
          position: relative;
          overflow: hidden;
          max-width: 480px;
          margin-left: auto;
          margin-right: auto;
        }
        @media (max-width: 600px) {
          .contact-btn { max-width: 100%; }
        }
      `}</style>
    </section>
  );
}
