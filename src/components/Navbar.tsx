import { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';

const NAV_LINKS = {
  es: [
    { label: 'Sobre mí',    href: '#about',        id: 'about'        },
    { label: 'Experiencia', href: '#experience',   id: 'experience'   },
    { label: 'Proyectos',   href: '#projects',     id: 'projects'     },
    { label: 'Certificados',href: '#certificates', id: 'certificates' },
    { label: 'Contacto',    href: '#contact',      id: 'contact'      },
  ],
  en: [
    { label: 'About',        href: '#about',        id: 'about'        },
    { label: 'Experience',   href: '#experience',   id: 'experience'   },
    { label: 'Projects',     href: '#projects',     id: 'projects'     },
    { label: 'Certificates', href: '#certificates', id: 'certificates' },
    { label: 'Contact',      href: '#contact',      id: 'contact'      },
  ],
};

export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false);
  const [menuOpen, setMenuOpen]         = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { lang, setLang }               = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = ['about', 'experience', 'projects', 'certificates', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const links = NAV_LINKS[lang];

  const linkStyle = (id: string): React.CSSProperties => ({
    color: activeSection === id ? 'var(--text)' : 'var(--text-muted)',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: activeSection === id ? 600 : 500,
    letterSpacing: '0.02em',
    paddingBottom: '2px',
    borderBottom: activeSection === id ? '2px solid var(--purple)' : '2px solid transparent',
    transition: 'all 0.2s ease',
  });

  const langToggle = (
    <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(99,120,180,0.25)', borderRadius: '50px', padding: '3px' }}>
      {(['es', 'en'] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          title={l === 'es' ? 'Español' : 'English'}
          style={{
            background: lang === l ? 'rgba(139,92,246,0.25)' : 'transparent',
            border: lang === l ? '1px solid rgba(139,92,246,0.5)' : '1px solid transparent',
            borderRadius: '50px',
            padding: '3px 8px',
            cursor: lang === l ? 'default' : 'pointer',
            fontSize: '1.1rem',
            lineHeight: 1,
            transition: 'all 0.2s ease',
            opacity: lang === l ? 1 : 0.55,
          }}
          onMouseEnter={(e) => { if (lang !== l) e.currentTarget.style.opacity = '0.85'; }}
          onMouseLeave={(e) => { if (lang !== l) e.currentTarget.style.opacity = '0.55'; }}
          aria-pressed={lang === l}
        >
          {l === 'es' ? '🇨🇴' : '🇺🇸'}
        </button>
      ))}
    </div>
  );

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        padding: '0 32px',
        height: '64px',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(13,17,23,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(99,120,180,0.15)' : '1px solid transparent',
      }}
    >
      {/* Logo — left */}
      <a
        href="#hero"
        style={{
          fontFamily: 'var(--font-art)',
          fontSize: '1.6rem',
          fontWeight: 700,
          background: 'var(--grad)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textDecoration: 'none',
          justifySelf: 'start',
        }}
      >
        {'<EV />'}
      </a>

      {/* Nav links — center */}
      <div className="nav-desktop" style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            style={linkStyle(l.id)}
            onMouseEnter={(e) => { if (activeSection !== l.id) e.currentTarget.style.color = 'var(--text)'; }}
            onMouseLeave={(e) => { if (activeSection !== l.id) e.currentTarget.style.color = 'var(--text-muted)'; }}
          >
            {l.label}
          </a>
        ))}
      </div>

      {/* Language toggle — right */}
      <div className="nav-desktop" style={{ justifySelf: 'end' }}>
        {langToggle}
      </div>

      {/* Mobile: lang toggle — center (col 2) */}
      <div className="nav-mobile-lang" style={{ display: 'none', justifySelf: 'center', gridColumn: 2, gridRow: 1 }}>
        {(['es', 'en'] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            style={{
              background: lang === l ? 'rgba(139,92,246,0.2)' : 'none',
              border: 'none',
              borderRadius: '50%',
              cursor: lang === l ? 'default' : 'pointer',
              fontSize: '1.2rem',
              padding: '3px',
              opacity: lang === l ? 1 : 0.45,
              transition: 'all 0.2s ease',
            }}
            aria-label={l === 'es' ? 'Español' : 'English'}
          >
            {l === 'es' ? '🇨🇴' : '🇺🇸'}
          </button>
        ))}
      </div>

      {/* Mobile: hamburger — right (col 3) */}
      <button
        className="nav-hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: 'none',
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--text)', padding: '4px',
          justifySelf: 'end', gridColumn: 3, gridRow: 1,
        }}
        aria-label="Toggle menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {menuOpen ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '64px', left: 0, right: 0,
            background: 'rgba(13,17,23,0.97)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(99,120,180,0.15)',
            padding: '20px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            gridColumn: '1 / -1',
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: activeSection === l.id ? 'var(--purple)' : 'var(--text)',
                textDecoration: 'none',
                fontSize: '1.1rem',
                fontWeight: activeSection === l.id ? 600 : 500,
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-lang { display: flex !important; align-items: center; gap: 2px; }
          .nav-hamburger { display: flex !important; align-items: center; }
        }
        @media (min-width: 769px) {
          .nav-mobile-lang { display: none !important; }
          .nav-hamburger { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
