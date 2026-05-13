
const Projects = () => {
  const projects = [
    {
      name: 'NovaDash',
      desc: 'Real-time analytics dashboard with live data streaming, custom chart library, and team collaboration features.',
      tags: ['Next.js', 'D3.js', 'WebSockets', 'PostgreSQL'],
      color: '#8b5cf6',
      glow: 'rgba(139,92,246,0.3)',
      accent: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
      url: 'novadash.app',
    },
    {
      name: 'Orbit CMS',
      desc: 'Headless CMS with a visual block editor, multi-tenant architecture, and a CDN-first delivery pipeline.',
      tags: ['React', 'Node.js', 'MongoDB', 'AWS S3'],
      color: '#22d3ee',
      glow: 'rgba(34,211,238,0.3)',
      accent: 'linear-gradient(135deg, #22d3ee, #0ea5e9)',
      url: 'orbitcms.io',
    },
    {
      name: 'SketchSync',
      desc: 'Collaborative whiteboard with infinite canvas, real-time presence, and offline-first sync powered by CRDTs.',
      tags: ['TypeScript', 'Canvas API', 'Yjs', 'Redis'],
      color: '#ec4899',
      glow: 'rgba(236,72,153,0.3)',
      accent: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
      url: 'sketchsync.dev',
    },
    {
      name: 'Ledger',
      desc: 'Personal finance tracker with AI-powered categorization, budget forecasting, and bank-level encryption.',
      tags: ['React Native', 'Python', 'FastAPI', 'Plaid'],
      color: '#f59e0b',
      glow: 'rgba(245,158,11,0.3)',
      accent: 'linear-gradient(135deg, #f59e0b, #ef4444)',
      url: 'useledger.app',
    },
    // {
    //   name: 'Pulsar API',
    //   desc: 'High-performance REST & GraphQL API gateway with rate limiting, auth middleware, and OpenAPI auto-docs.',
    //   tags: ['Go', 'GraphQL', 'Docker', 'Kubernetes'],
    //   color: '#10b981',
    //   glow: 'rgba(16,185,129,0.3)',
    //   accent: 'linear-gradient(135deg, #10b981, #22d3ee)',
    //   url: 'pulsarapi.dev',
    // },
    {
      name: 'CodeReview AI',
      desc: 'AI-powered GitHub bot that reviews pull requests, suggests improvements, and enforces team code standards.',
      tags: ['Python', 'OpenAI', 'GitHub API', 'Redis'],
      color: '#6366f1',
      glow: 'rgba(99,102,241,0.3)',
      accent: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
      url: 'codereview.ai',
    },
  ];

  return (
    <section id="projects" style={{ background: 'linear-gradient(180deg, var(--bg2) 0%, var(--bg) 100%)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }} className="reveal">
          <p className="section-label">// what I've built</p>
          <h2 className="section-title">Projects</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto', fontSize: '1rem' }}>
            A selection of things I've shipped — from side projects to production systems.
          </p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px',
        }}>
          {projects.map((p, i) => (
            <ProjectCard key={i} project={p} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project: p, delay }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div className={`sketch-card reveal`} style={{
      transitionDelay: `${delay}ms`,
      display: 'flex', flexDirection: 'column',
      boxShadow: hovered ? `0 24px 60px rgba(0,0,0,0.5), 0 0 40px ${p.glow}` : '0 4px 20px rgba(0,0,0,0.2)',
      borderColor: hovered ? p.color + '60' : 'var(--card-border)',
      transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
      transition: 'all 0.3s ease',
    }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Browser mockup */}
      <div style={{
        background: 'var(--bg)', borderRadius: 'var(--radius) var(--radius) 0 0',
        overflow: 'hidden', borderBottom: '1px solid var(--card-border)',
      }}>
        {/* Browser chrome */}
        <div style={{
          padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px',
          background: 'rgba(255,255,255,0.03)',
        }}>
          <div style={{ display: 'flex', gap: '5px' }}>
            {['#ff5f57','#febc2e','#28c840'].map(c => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.8 }} />
            ))}
          </div>
          <div style={{
            flex: 1, background: 'rgba(255,255,255,0.06)', borderRadius: '6px',
            padding: '4px 10px', fontSize: '0.72rem', color: 'var(--text-dim)',
            fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.5 }}>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            {p.url}
          </div>
        </div>

        {/* Page preview */}
        <div style={{
          height: 160, background: p.accent, position: 'relative', overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* Sketch elements inside preview */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.15 }}>
            <div style={{ position: 'absolute', top: 20, left: 20, right: 80, height: 12, background: 'rgba(255,255,255,0.6)', borderRadius: 4 }} />
            <div style={{ position: 'absolute', top: 44, left: 20, width: '45%', height: 8, background: 'rgba(255,255,255,0.4)', borderRadius: 4 }} />
            <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20, height: 60, background: 'rgba(255,255,255,0.08)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)' }} />
            <div style={{ position: 'absolute', top: 20, right: 20, width: 50, height: 50, background: 'rgba(255,255,255,0.08)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)' }} />
          </div>
          <span style={{
            fontFamily: 'var(--font-art)', fontSize: '1.8rem', fontWeight: 700,
            color: 'rgba(255,255,255,0.9)', letterSpacing: '-0.02em',
            textShadow: '0 2px 20px rgba(0,0,0,0.3)',
          }}>{p.name}</span>
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flex: 1, gap: '14px' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-art)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--text)', marginBottom: '6px' }}>
            {p.name}
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>{p.desc}</p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {p.tags.map(t => (
            <span key={t} style={{
              padding: '3px 10px', borderRadius: '50px', fontSize: '0.75rem',
              background: p.color + '18', border: `1px solid ${p.color}40`,
              color: p.color, fontWeight: 500,
            }}>{t}</span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
          <a href="#" className="btn-primary" style={{
            padding: '9px 18px', fontSize: '0.82rem', flex: 1, justifyContent: 'center',
            background: p.accent,
          }}>
            Live Demo
          </a>
          <a href="#" className="btn-outline" style={{
            padding: '9px 18px', fontSize: '0.82rem', flex: 1, justifyContent: 'center',
            borderColor: p.color + '60',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            Code
          </a>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { Projects, ProjectCard });
