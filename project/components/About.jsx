
const About = () => {
  const stacks = [
    { label: 'React', color: '#61dafb', bg: 'rgba(97,218,251,0.1)', border: 'rgba(97,218,251,0.3)' },
    { label: 'TypeScript', color: '#3178c6', bg: 'rgba(49,120,198,0.1)', border: 'rgba(49,120,198,0.3)' },
    { label: 'Node.js', color: '#68a063', bg: 'rgba(104,160,99,0.1)', border: 'rgba(104,160,99,0.3)' },
    { label: 'Python', color: '#ffd43b', bg: 'rgba(255,212,59,0.1)', border: 'rgba(255,212,59,0.3)' },
    { label: 'PostgreSQL', color: '#336791', bg: 'rgba(51,103,145,0.12)', border: 'rgba(51,103,145,0.4)' },
    { label: 'Docker', color: '#2496ed', bg: 'rgba(36,150,237,0.1)', border: 'rgba(36,150,237,0.3)' },
    { label: 'AWS', color: '#ff9900', bg: 'rgba(255,153,0,0.1)', border: 'rgba(255,153,0,0.3)' },
    { label: 'GraphQL', color: '#e535ab', bg: 'rgba(229,53,171,0.1)', border: 'rgba(229,53,171,0.3)' },
    { label: 'Next.js', color: '#fff', bg: 'rgba(255,255,255,0.07)', border: 'rgba(255,255,255,0.2)' },
    { label: 'Tailwind', color: '#38bdf8', bg: 'rgba(56,189,248,0.1)', border: 'rgba(56,189,248,0.3)' },
    { label: 'Redis', color: '#ff4438', bg: 'rgba(255,68,56,0.1)', border: 'rgba(255,68,56,0.3)' },
    { label: 'Rust', color: '#f74c00', bg: 'rgba(247,76,0,0.1)', border: 'rgba(247,76,0,0.3)' },
  ];

  const stats = [
    { value: '2+', label: 'Years Experience' },
    { value: '40+', label: 'Projects Shipped' },
    { value: '10+', label: 'Happy Clients' },
    { value: '∞', label: 'Cups of Coffee' },
  ];

  return (
    <section id="about" style={{ background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
          {/* Left: text */}
          <div className="reveal-left">
            <p className="section-label">// about me</p>
            <h2 className="section-title">The human behind<br/>the keyboard</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '20px', fontSize: '1.02rem' }}>
              I'm a full-stack developer with a passion for crafting clean, performant, and beautiful digital products. I thrive at the intersection of design and engineering — obsessing over both the user experience and the code quality underneath.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '36px', fontSize: '1.02rem' }}>
              When I'm not pushing commits, you'll find me sketching UI concepts, contributing to open source, or exploring generative art with code. I believe great software is a form of craft.
            </p>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {stats.map(s => (
                <div key={s.label} style={{
                  padding: '16px 20px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--card-border)',
                  borderRadius: 'var(--radius-sm)',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-art)', fontSize: '2rem', fontWeight: 700,
                    background: 'var(--grad)', WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>{s.value}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '2px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: avatar + skills */}
          <div className="reveal-right" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* Avatar placeholder */}
            <div style={{
              width: '100%', aspectRatio: '4/3', borderRadius: 'var(--radius)',
              background: 'var(--card)', border: '1.5px solid var(--card-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Decorative bg blobs */}
              <div style={{
                position: 'absolute', width: 200, height: 200, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(139,92,246,0.15), transparent)',
                top: '10%', left: '10%',
              }}/>
              <div style={{
                position: 'absolute', width: 160, height: 160, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(34,211,238,0.12), transparent)',
                bottom: '10%', right: '10%',
              }}/>
              <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                {/* Simple person sketch */}
                <svg width="100" height="120" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="32" r="22" stroke="url(#gAvatar)" strokeWidth="2" fill="rgba(139,92,246,0.08)"/>
                  <path d="M14 110 C14 80 86 80 86 110" stroke="url(#gAvatar)" strokeWidth="2" fill="rgba(139,92,246,0.08)" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="gAvatar" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6"/>
                      <stop offset="100%" stopColor="#22d3ee"/>
                    </linearGradient>
                  </defs>
                </svg>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.75rem', marginTop: '8px', fontFamily: 'monospace' }}>[ profile photo ]</p>
              </div>
            </div>

            {/* Tech stack */}
            <div className="sketch-card" style={{ padding: '24px' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '14px', letterSpacing: '0.08em' }}>TECH STACK</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {stacks.map(s => (
                  <span key={s.label} className="tech-badge" style={{
                    color: s.color, background: s.bg, borderColor: s.border,
                  }}>{s.label}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .container > div { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
};

Object.assign(window, { About });
