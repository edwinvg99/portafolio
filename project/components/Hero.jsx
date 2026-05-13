
const Hero = () => {
  const canvasRef = React.useRef(null);

  // Floating blob animation via canvas
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const blobs = [
      { x: 0.15, y: 0.3, r: 200, color: 'rgba(139,92,246,0.13)', speed: 0.0008, phase: 0 },
      { x: 0.8, y: 0.2, r: 170, color: 'rgba(34,211,238,0.10)', speed: 0.001, phase: 2 },
      { x: 0.6, y: 0.75, r: 220, color: 'rgba(99,102,241,0.11)', speed: 0.0007, phase: 4 },
      { x: 0.3, y: 0.7, r: 130, color: 'rgba(236,72,153,0.08)', speed: 0.0012, phase: 1.5 },
    ];

    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      blobs.forEach(b => {
        const x = (b.x + 0.04 * Math.sin(t * b.speed + b.phase)) * canvas.width;
        const y = (b.y + 0.04 * Math.cos(t * b.speed + b.phase + 1)) * canvas.height;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, b.r);
        grad.addColorStop(0, b.color);
        grad.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(x, y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // Subtle grid lines
      ctx.strokeStyle = 'rgba(99,120,180,0.04)';
      ctx.lineWidth = 1;
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

  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', padding: '0' }}>
      <canvas ref={canvasRef} style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0,
      }} />

      {/* Floating sketch deco */}
      <FloatingDeco />

      <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '80px' }}>
        <div style={{ maxWidth: '700px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', borderRadius: '50px',
            border: '1px solid rgba(34,211,238,0.3)',
            background: 'rgba(34,211,238,0.07)',
            marginBottom: '28px',
          }} className="reveal">
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--cyan)', display: 'inline-block', animation: 'pulse-glow 2s infinite' }}></span>
            <span style={{ color: 'var(--cyan)', fontSize: '0.85rem', fontWeight: 500, fontFamily: 'var(--font-art)', fontSize: '1rem' }}>Available for work</span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-art)', fontSize: 'clamp(3rem, 7vw, 5.5rem)',
            fontWeight: 700, lineHeight: 1.1, marginBottom: '8px',
          }} className="reveal">
            <span style={{ color: 'var(--text)' }}>Hi, I'm </span>
            <span style={{
              background: 'var(--grad)', WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Alex Chen</span>
          </h1>

          <h2 style={{
            fontFamily: 'var(--font-art)', fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)',
            fontWeight: 600, color: 'var(--text-muted)', marginBottom: '24px',
          }} className="reveal">
            Full Stack Developer &amp; Creative Coder
          </h2>

          <p style={{
            fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '520px',
            lineHeight: 1.75, marginBottom: '40px',
          }} className="reveal">
            I build elegant, performant digital experiences — from pixel-perfect UIs to robust back-end systems. Currently exploring the intersection of <span style={{ color: 'var(--purple)', fontWeight: 500 }}>creativity</span> and <span style={{ color: 'var(--cyan)', fontWeight: 500 }}>engineering</span>.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }} className="reveal">
            <a href="#projects" className="btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              View Projects
            </a>
            <a href="#contact" className="btn-outline">
              Get in Touch
            </a>
          </div>

          {/* Social row */}
          <div style={{ display: 'flex', gap: '20px', marginTop: '48px', alignItems: 'center' }} className="reveal">
            <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>FIND ME ON</span>
            {[
              { icon: 'github', href: '#', label: 'GitHub' },
              { icon: 'linkedin', href: '#', label: 'LinkedIn' },
              { icon: 'twitter', href: '#', label: 'Twitter' },
            ].map(s => (
              <a key={s.label} href={s.href} title={s.label} style={{
                color: 'var(--text-muted)', textDecoration: 'none',
                fontSize: '0.85rem', transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--purple)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
              >
                <SocialIcon name={s.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        color: 'var(--text-dim)', fontSize: '0.75rem', letterSpacing: '0.1em',
        animation: 'float2 2.5s ease-in-out infinite',
      }}>
        <span>SCROLL</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
    </section>
  );
};

const FloatingDeco = () => (
  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
    {/* Top right blob */}
    <div style={{
      position: 'absolute', top: '8%', right: '5%', width: 300, height: 300,
      background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
      borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
      animation: 'blob-morph 8s ease-in-out infinite, float1 7s ease-in-out infinite',
    }} />
    {/* Bottom left blob */}
    <div style={{
      position: 'absolute', bottom: '10%', left: '3%', width: 250, height: 250,
      background: 'radial-gradient(circle, rgba(34,211,238,0.09) 0%, transparent 70%)',
      borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
      animation: 'blob-morph 10s ease-in-out infinite reverse, float2 9s ease-in-out infinite',
    }} />
    {/* Sketch lines SVG */}
    <svg style={{ position: 'absolute', top: '20%', right: '12%', opacity: 0.18 }} width="120" height="120" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="55" fill="none" stroke="url(#gCircle)" strokeWidth="1.5" strokeDasharray="8 6"
        style={{ animation: 'spin-slow 20s linear infinite' }} />
      <circle cx="60" cy="60" r="38" fill="none" stroke="url(#gCircle2)" strokeWidth="1" strokeDasharray="4 8"
        style={{ animation: 'spin-slow 14s linear infinite reverse' }} />
      <defs>
        <linearGradient id="gCircle" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8b5cf6"/>
          <stop offset="100%" stopColor="#22d3ee"/>
        </linearGradient>
        <linearGradient id="gCircle2" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee"/>
          <stop offset="100%" stopColor="#ec4899"/>
        </linearGradient>
      </defs>
    </svg>
    {/* Plus signs */}
    <svg style={{ position: 'absolute', bottom: '30%', right: '20%', opacity: 0.25, animation: 'float3 5s ease-in-out infinite' }} width="24" height="24" viewBox="0 0 24 24">
      <line x1="12" y1="2" x2="12" y2="22" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round"/>
      <line x1="2" y1="12" x2="22" y2="12" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round"/>
    </svg>
    <svg style={{ position: 'absolute', top: '50%', left: '8%', opacity: 0.2, animation: 'float1 6s ease-in-out infinite' }} width="20" height="20" viewBox="0 0 20 20">
      <line x1="10" y1="1" x2="10" y2="19" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round"/>
      <line x1="1" y1="10" x2="19" y2="10" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  </div>
);

const SocialIcon = ({ name }) => {
  if (name === 'github') return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
  if (name === 'linkedin') return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
    </svg>
  );
};

Object.assign(window, { Hero, FloatingDeco, SocialIcon });
