
const Navbar = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certificates', href: '#certificates' },
    { label: 'Contact', href: '#contact' },
  ];

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: '0 32px',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'all 0.3s ease',
    background: scrolled ? 'rgba(13,17,23,0.85)' : 'transparent',
    backdropFilter: scrolled ? 'blur(16px)' : 'none',
    borderBottom: scrolled ? '1px solid rgba(99,120,180,0.15)' : '1px solid transparent',
  };

  const logoStyle = {
    fontFamily: 'var(--font-art)',
    fontSize: '1.6rem',
    fontWeight: 700,
    background: 'var(--grad)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textDecoration: 'none',
    cursor: 'pointer',
  };

  const linkStyle = {
    color: 'var(--text-muted)',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: 500,
    padding: '6px 2px',
    position: 'relative',
    transition: 'color 0.2s',
    letterSpacing: '0.02em',
  };

  return (
    <nav style={navStyle}>
      <a href="#hero" style={logoStyle}>{'<AC />'}</a>

      {/* Desktop links */}
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }} className="nav-desktop">
        {links.map(l => (
          <a key={l.label} href={l.href} style={linkStyle}
            onMouseEnter={e => e.target.style.color = 'var(--text)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
          >{l.label}</a>
        ))}
        <a href="#contact" className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
          Hire Me
        </a>
      </div>

      {/* Hamburger */}
      <button onClick={() => setMenuOpen(!menuOpen)} style={{
        display: 'none', background: 'none', border: 'none', cursor: 'pointer',
        color: 'var(--text)', padding: '4px',
      }} className="nav-hamburger">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {menuOpen
            ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
            : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
          }
        </svg>
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: '64px', left: 0, right: 0,
          background: 'rgba(13,17,23,0.97)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(99,120,180,0.15)',
          padding: '20px 32px', display: 'flex', flexDirection: 'column', gap: '16px',
        }}>
          {links.map(l => (
            <a key={l.label} href={l.href} style={{ ...linkStyle, color: 'var(--text)', fontSize: '1.1rem' }}
              onClick={() => setMenuOpen(false)}
            >{l.label}</a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

Object.assign(window, { Navbar });
