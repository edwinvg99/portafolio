import { useState, useEffect } from 'react';

const WHATSAPP_NUMBER = '573042225380';
const EMAIL           = 'velasquezgiraldoedwin@gmail.com';
const WA_MSG          = 'Hola Edwin, vi tu portafolio y me gustaría hablar contigo sobre un proyecto.';

export default function FloatingButtons() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen]       = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    onResize();
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WA_MSG)}`;

  const size      = isMobile ? 42 : 52;
  const iconSize  = isMobile ? 20 : 24;
  const iconSmall = isMobile ? 18 : 22;

  const base: React.CSSProperties = {
    width: size, height: size,
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease, opacity 0.25s ease',
    textDecoration: 'none',
  };

  const actionButtons = (
    <>
      {/* WhatsApp */}
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        title="WhatsApp"
        aria-label="Contactar por WhatsApp"
        style={{
          ...base,
          background: 'linear-gradient(135deg, #25d366, #128c7e)',
          boxShadow: '0 4px 20px rgba(37,211,102,0.5)',
          opacity: !isMobile || open ? 1 : 0,
          transform: !isMobile || open ? 'scale(1)' : 'scale(0.5)',
          pointerEvents: !isMobile || open ? 'auto' : 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform  = 'scale(1.15)';
          e.currentTarget.style.boxShadow  = '0 6px 30px rgba(37,211,102,0.7)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform  = 'scale(1)';
          e.currentTarget.style.boxShadow  = '0 4px 20px rgba(37,211,102,0.5)';
        }}
      >
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* Email */}
      <a
        href={`mailto:${EMAIL}`}
        title="Enviar correo"
        aria-label="Enviar correo electrónico"
        style={{
          ...base,
          background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
          boxShadow: '0 4px 20px rgba(139,92,246,0.5)',
          opacity: !isMobile || open ? 1 : 0,
          transform: !isMobile || open ? 'scale(1)' : 'scale(0.5)',
          pointerEvents: !isMobile || open ? 'auto' : 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform  = 'scale(1.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform  = 'scale(1)';
        }}
      >
        <svg width={iconSmall} height={iconSmall} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      </a>
    </>
  );

  const backToTop = (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      title="Volver al inicio"
      aria-label="Volver al inicio"
      style={{
        ...base,
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
        backdropFilter: 'blur(8px)',
        color: 'white',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform   = 'scale(1.15)';
        e.currentTarget.style.background  = 'rgba(139,92,246,0.2)';
        e.currentTarget.style.borderColor = 'rgba(139,92,246,0.5)';
        e.currentTarget.style.boxShadow   = '0 6px 24px rgba(139,92,246,0.35)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform   = 'scale(1)';
        e.currentTarget.style.background  = 'rgba(255,255,255,0.06)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
        e.currentTarget.style.boxShadow   = '0 4px 16px rgba(0,0,0,0.3)';
      }}
    >
      <svg width={iconSize - 2} height={iconSize - 2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );

  /* Mobile FAB toggle */
  const fabToggle = (
    <button
      onClick={() => setOpen((v) => !v)}
      aria-label={open ? 'Cerrar menú de contacto' : 'Abrir menú de contacto'}
      style={{
        ...base,
        background: open
          ? 'rgba(255,255,255,0.1)'
          : 'linear-gradient(135deg, #8b5cf6, #6366f1)',
        boxShadow: open
          ? '0 4px 16px rgba(0,0,0,0.3)'
          : '0 4px 20px rgba(139,92,246,0.5)',
        color: 'white',
        border: open ? '1px solid rgba(255,255,255,0.15)' : 'none',
        backdropFilter: open ? 'blur(8px)' : 'none',
      }}
    >
      <svg
        width={iconSize - 2}
        height={iconSize - 2}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{
          transition: 'transform 0.3s ease',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
        }}
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </button>
  );

  return (
    <div
      style={{
        position: 'fixed',
        bottom: isMobile ? '20px' : '28px',
        right: isMobile ? '16px' : '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? '10px' : '12px',
        zIndex: 500,
        opacity:   visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        pointerEvents: visible ? 'auto' : 'none',
        alignItems: 'center',
      }}
    >
      {actionButtons}

      {/* Desktop: back to top | Mobile: FAB toggle */}
      {isMobile ? fabToggle : backToTop}
    </div>
  );
}
