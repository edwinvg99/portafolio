
const Contact = () => {
  const [form, setForm] = React.useState({ name: '', email: '', message: '' });
  const [sent, setSent] = React.useState(false);
  const [focused, setFocused] = React.useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', message: '' });
  };

  const inputStyle = (field) => ({
    width: '100%', padding: '14px 16px',
    background: focused === field ? 'rgba(139,92,246,0.08)' : 'rgba(255,255,255,0.03)',
    border: `1.5px solid ${focused === field ? 'rgba(139,92,246,0.6)' : 'var(--card-border)'}`,
    borderRadius: 'var(--radius-sm)', color: 'var(--text)',
    fontFamily: 'var(--font-body)', fontSize: '0.95rem',
    outline: 'none', transition: 'all 0.2s ease',
    boxShadow: focused === field ? '0 0 20px rgba(139,92,246,0.15)' : 'none',
  });

  return (
    <section id="contact" style={{ background: 'linear-gradient(180deg, var(--bg2) 0%, var(--bg) 100%)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }} className="reveal">
          <p className="section-label">// let's talk</p>
          <h2 className="section-title">Get in Touch</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '440px', margin: '0 auto', fontSize: '1rem' }}>
            Have a project in mind? Want to collaborate? Or just want to say hi? My inbox is always open.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'start' }}>
          {/* Left: info */}
          <div className="reveal-left">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '40px' }}>
              {[
                { icon: '✉️', label: 'Email', value: 'alex@example.com', href: 'mailto:alex@example.com', color: 'var(--purple)' },
                { icon: '💼', label: 'LinkedIn', value: '/in/alexchen', href: '#', color: 'var(--blue)' },
                { icon: '🐙', label: 'GitHub', value: '@alexchen', href: '#', color: 'var(--cyan)' },
              ].map(item => (
                <a key={item.label} href={item.href} style={{
                  display: 'flex', alignItems: 'center', gap: '16px',
                  padding: '18px 22px', textDecoration: 'none',
                  background: 'var(--card)', border: '1.5px solid var(--card-border)',
                  borderRadius: 'var(--radius-sm)',
                  transition: 'all 0.2s ease',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = item.color;
                    e.currentTarget.style.transform = 'translateX(6px)';
                    e.currentTarget.style.boxShadow = `0 8px 30px rgba(0,0,0,0.3)`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--card-border)';
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <span style={{ fontSize: '1.4rem' }}>{item.icon}</span>
                  <div>
                    <div style={{ color: 'var(--text-dim)', fontSize: '0.75rem', marginBottom: '2px' }}>{item.label}</div>
                    <div style={{ color: 'var(--text)', fontWeight: 500, fontSize: '0.95rem' }}>{item.value}</div>
                  </div>
                  <svg style={{ marginLeft: 'auto', color: 'var(--text-dim)' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                </a>
              ))}
            </div>

            {/* Decorative sketch art */}
            <div style={{
              padding: '28px', background: 'var(--card)', border: '1.5px solid var(--card-border)',
              borderRadius: 'var(--radius)', textAlign: 'center', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', inset: 0, opacity: 0.06 }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 200, height: 200, borderRadius: '50%', border: '1px solid var(--purple)' }} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 140, height: 140, borderRadius: '50%', border: '1px solid var(--cyan)' }} />
              </div>
              <p style={{ fontFamily: 'var(--font-art)', fontSize: '1.5rem', color: 'var(--text)', marginBottom: '8px', position: 'relative' }}>
                "Let's build something<br/>amazing together."
              </p>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.82rem', position: 'relative' }}>— Always open to new opportunities</p>
            </div>
          </div>

          {/* Right: form */}
          <div className="reveal-right">
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '8px', letterSpacing: '0.05em' }}>NAME</label>
                <input
                  type="text" required value={form.name}
                  onChange={e => setForm(f => ({...f, name: e.target.value}))}
                  onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                  style={inputStyle('name')} placeholder="Your name"
                />
              </div>
              <div>
                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '8px', letterSpacing: '0.05em' }}>EMAIL</label>
                <input
                  type="email" required value={form.email}
                  onChange={e => setForm(f => ({...f, email: e.target.value}))}
                  onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                  style={inputStyle('email')} placeholder="your@email.com"
                />
              </div>
              <div>
                <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '8px', letterSpacing: '0.05em' }}>MESSAGE</label>
                <textarea
                  required value={form.message} rows={5}
                  onChange={e => setForm(f => ({...f, message: e.target.value}))}
                  onFocus={() => setFocused('msg')} onBlur={() => setFocused(null)}
                  style={{ ...inputStyle('msg'), resize: 'vertical', minHeight: '130px', lineHeight: 1.6 }}
                  placeholder="Tell me about your project..."
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
                {sent ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    Message Sent!
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center', marginTop: '80px', paddingTop: '32px',
          borderTop: '1px solid var(--card-border)',
          color: 'var(--text-dim)', fontSize: '0.85rem',
        }}>
          <p style={{ fontFamily: 'var(--font-art)', fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
            Designed &amp; built with ❤️ by Alex Chen
          </p>
          <p>© 2026 · All rights reserved</p>
        </div>
      </div>

      <style>{`
        #contact .container > div > div { grid-template-columns: 1fr 1fr; }
        @media (max-width: 768px) {
          #contact .container > div > div { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        input::placeholder, textarea::placeholder { color: var(--text-dim); }
      `}</style>
    </section>
  );
};

const FloatingButtons = () => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const btnBase = {
    width: 52, height: 52, borderRadius: '50%', border: 'none', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
    textDecoration: 'none',
  };

  return (
    <div style={{
      position: 'fixed', bottom: '28px', right: '28px',
      display: 'flex', flexDirection: 'column', gap: '12px',
      zIndex: 500,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity 0.3s ease, transform 0.3s ease',
      pointerEvents: visible ? 'auto' : 'none',
    }}>
      {/* WhatsApp */}
      <a href="https://wa.me/1234567890" target="_blank" rel="noopener" title="WhatsApp"
        style={{
          ...btnBase,
          background: 'linear-gradient(135deg, #25d366, #128c7e)',
          boxShadow: '0 4px 20px rgba(37,211,102,0.5)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.15)';
          e.currentTarget.style.boxShadow = '0 6px 30px rgba(37,211,102,0.7)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,211,102,0.5)';
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Email */}
      <a href="mailto:alex@example.com" title="Email"
        style={{
          ...btnBase,
          background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
          boxShadow: '0 4px 20px rgba(139,92,246,0.5)',
          animation: 'pulse-glow 3s infinite',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.15)';
          e.currentTarget.style.animation = 'none';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.animation = 'pulse-glow 3s infinite';
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      </a>
    </div>
  );
};

Object.assign(window, { Contact, FloatingButtons });
