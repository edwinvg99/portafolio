
const Certificates = () => {
  const certs = [
    {
      title: 'AWS Certified Solutions Architect',
      institution: 'Amazon Web Services',
      date: 'Jan 2024',
      color: '#ff9900',
      glow: 'rgba(255,153,0,0.25)',
      icon: '☁️',
      level: 'Professional',
    },
    {
      title: 'Google Cloud Professional Data Engineer',
      institution: 'Google Cloud',
      date: 'Mar 2023',
      color: '#22d3ee',
      glow: 'rgba(34,211,238,0.25)',
      icon: '📊',
      level: 'Professional',
    },
    {
      title: 'Meta React Advanced Developer',
      institution: 'Meta / Coursera',
      date: 'Aug 2022',
      color: '#6366f1',
      glow: 'rgba(99,102,241,0.25)',
      icon: '⚛️',
      level: 'Advanced',
    },
    {
      title: 'Certified Kubernetes Administrator',
      institution: 'Cloud Native Foundation',
      date: 'Nov 2023',
      color: '#3b82f6',
      glow: 'rgba(59,130,246,0.25)',
      icon: '🚢',
      level: 'Expert',
    },
    {
      title: 'B.Sc. Computer Science',
      institution: 'MIT — Massachusetts Institute of Technology',
      date: '2018',
      color: '#8b5cf6',
      glow: 'rgba(139,92,246,0.25)',
      icon: '🎓',
      level: 'Degree',
    },
    {
      title: 'Certified Ethical Hacker (CEH)',
      institution: 'EC-Council',
      date: 'Jul 2022',
      color: '#ec4899',
      glow: 'rgba(236,72,153,0.25)',
      icon: '🔐',
      level: 'Expert',
    },
  ];

  return (
    <section id="certificates" style={{ background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }} className="reveal">
          <p className="section-label">// credentials</p>
          <h2 className="section-title">Certificates &amp; Education</h2>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px',
        }}>
          {certs.map((c, i) => (
            <CertCard key={i} cert={c} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CertCard = ({ cert: c, delay }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div className="sketch-card reveal" style={{
      transitionDelay: `${delay}ms`,
      padding: '26px',
      boxShadow: hovered ? `0 16px 50px rgba(0,0,0,0.4), 0 0 30px ${c.glow}` : '0 4px 20px rgba(0,0,0,0.15)',
      borderColor: hovered ? c.color + '60' : 'var(--card-border)',
      transform: hovered ? 'translateY(-6px) rotate(0.5deg)' : 'translateY(0) rotate(0deg)',
      transition: 'all 0.3s ease',
      position: 'relative', overflow: 'hidden',
    }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top gradient strip */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${c.color}, transparent)`,
        opacity: hovered ? 1 : 0.6, transition: 'opacity 0.3s',
      }} />

      {/* Decorative seal circle */}
      <div style={{
        position: 'absolute', bottom: -20, right: -20, width: 80, height: 80,
        borderRadius: '50%', border: `2px dashed ${c.color}30`,
        opacity: hovered ? 0.6 : 0.2, transition: 'opacity 0.3s',
      }} />
      <div style={{
        position: 'absolute', bottom: -10, right: -10, width: 50, height: 50,
        borderRadius: '50%', border: `2px solid ${c.color}20`,
        opacity: hovered ? 0.5 : 0.15, transition: 'opacity 0.3s',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '14px' }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: c.color + '18', border: `1.5px solid ${c.color}40`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.4rem', flexShrink: 0,
        }}>
          {c.icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{
              padding: '2px 10px', borderRadius: '50px', fontSize: '0.7rem',
              background: c.color + '20', color: c.color, border: `1px solid ${c.color}40`,
              fontWeight: 600, letterSpacing: '0.04em', whiteSpace: 'nowrap',
            }}>{c.level}</span>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem', fontFamily: 'var(--font-art)', whiteSpace: 'nowrap' }}>{c.date}</span>
          </div>
        </div>
      </div>

      <h3 style={{
        fontFamily: 'var(--font-art)', fontSize: '1.15rem', fontWeight: 700,
        color: 'var(--text)', lineHeight: 1.35, marginBottom: '8px',
      }}>{c.title}</h3>

      <p style={{
        color: c.color, fontSize: '0.82rem', fontWeight: 500, opacity: 0.85,
      }}>{c.institution}</p>

      {/* Verified badge */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '6px', marginTop: '16px',
        paddingTop: '14px', borderTop: '1px solid var(--card-border)',
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill={c.color}>
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke={c.color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span style={{ color: 'var(--text-dim)', fontSize: '0.76rem' }}>Verified credential</span>
      </div>
    </div>
  );
};

Object.assign(window, { Certificates, CertCard });
