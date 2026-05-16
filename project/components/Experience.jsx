
const Experience = () => {
  const jobs = [
    {
      role: 'Senior Full Stack Engineer',
      company: 'Vercel Inc.',
      period: '2023 — Present',
      desc: 'Led development of core platform features serving 1M+ developers. Built real-time collaboration tools and improved build pipeline performance by 40%.',
      tags: ['Next.js', 'Go', 'PostgreSQL', 'Kubernetes'],
      color: 'var(--purple)',
    },
    {
      role: 'Full Stack Developer',
      company: 'Stripe',
      period: '2021 — 2023',
      desc: 'Developed payment dashboard features and internal tooling. Owned the merchant analytics pipeline, processing $2B+ in transactions monthly.',
      tags: ['React', 'Ruby', 'Redis', 'AWS'],
      color: 'var(--cyan)',
    },
    {
      role: 'Frontend Engineer',
      company: 'Figma',
      period: '2020 — 2021',
      desc: 'Built interactive canvas UI features and component libraries. Contributed to the plugin API and performance improvements for large design files.',
      tags: ['TypeScript', 'WebGL', 'WASM', 'React'],
      color: 'var(--blue)',
    },
    {
      role: 'Junior Developer',
      company: 'Startup Studio',
      period: '2018 — 2020',
      desc: 'Worked across 6 product launches — from MVPs to production — wearing many hats: frontend, backend, DevOps, and sometimes designer.',
      tags: ['Vue', 'Node.js', 'MongoDB', 'Docker'],
      color: 'var(--pink)',
    },
  ];

  return (
    <section id="experience">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }} className="reveal">
          <p className="section-label">// where I've been</p>
          <h2 className="section-title">Experience</h2>
        </div>

        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px',
            background: 'linear-gradient(180deg, transparent, var(--purple), var(--cyan), transparent)',
            transform: 'translateX(-50%)', opacity: 0.4,
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {jobs.map((job, i) => (
              <div key={i} className={`reveal`} style={{
                display: 'grid',
                gridTemplateColumns: i % 2 === 0 ? '1fr 48px 1fr' : '1fr 48px 1fr',
                gap: '0',
                alignItems: 'center',
              }}>
                {/* Left side */}
                <div style={{ paddingRight: '32px', textAlign: i % 2 === 0 ? 'right' : 'left', order: i % 2 === 0 ? 0 : 2 }}>
                  {i % 2 === 0 && <ExperienceCard job={job} />}
                  {i % 2 !== 0 && (
                    <div style={{ color: 'var(--text-dim)', fontSize: '0.85rem', fontFamily: 'var(--font-art)', fontSize: '1rem' }}>
                      {job.period}
                    </div>
                  )}
                </div>

                {/* Center dot */}
                <div style={{ display: 'flex', justifyContent: 'center', order: 1 }}>
                  <div style={{
                    width: 16, height: 16, borderRadius: '50%',
                    background: job.color,
                    boxShadow: `0 0 12px ${job.color}, 0 0 24px ${job.color}40`,
                    border: '3px solid var(--bg2)',
                    flexShrink: 0,
                  }} />
                </div>

                {/* Right side */}
                <div style={{ paddingLeft: '32px', order: i % 2 === 0 ? 2 : 0 }}>
                  {i % 2 !== 0 && <ExperienceCard job={job} />}
                  {i % 2 === 0 && (
                    <div style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-art)', fontSize: '1rem' }}>
                      {job.period}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #experience .container > div > div > div {
            grid-template-columns: 24px 1fr !important;
          }
          #experience .container > div > div > div > div {
            order: unset !important;
            padding-left: 16px !important;
            padding-right: 0 !important;
            text-align: left !important;
          }
          #experience .exp-period-mobile {
            display: none !important;
          }
          #experience .exp-card-wrapper {
            display: block !important;
          }
        }
      `}</style>
    </section>
  );
};

const ExperienceCard = ({ job }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div className="sketch-card" style={{
      padding: '24px', textAlign: 'left',
      borderColor: hovered ? job.color + '50' : 'var(--card-border)',
      boxShadow: hovered ? `0 12px 40px rgba(0,0,0,0.3), 0 0 20px ${job.color}25` : 'none',
      transition: 'all 0.3s ease',
    }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Corner accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: 3, height: '100%',
        background: job.color, borderRadius: '16px 0 0 16px', opacity: 0.8,
      }} />
      <div style={{ paddingLeft: '8px' }}>
        <h3 style={{ fontFamily: 'var(--font-art)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '2px' }}>
          {job.role}
        </h3>
        <p style={{ color: job.color, fontWeight: 600, fontSize: '0.9rem', marginBottom: '10px' }}>{job.company}</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '14px' }}>{job.desc}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {job.tags.map(t => (
            <span key={t} style={{
              padding: '3px 10px', borderRadius: '50px', fontSize: '0.75rem',
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              color: 'var(--text-muted)',
            }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { Experience, ExperienceCard });
