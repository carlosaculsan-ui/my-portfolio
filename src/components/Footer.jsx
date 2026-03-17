export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'var(--footer-bg)',
        borderTop: '1px solid var(--footer-border)',
        padding: '2.5rem 2rem',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Logo */}
        <p
          style={{
            fontFamily: '"Oswald", sans-serif',
            fontWeight: 700,
            fontSize: '1.4rem',
            letterSpacing: '0.1em',
            background: 'linear-gradient(135deg, #6C63FF, var(--teal))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.75rem',
          }}
        >
          YN
        </p>

        {/* Tagline */}
        <p
          style={{
            fontFamily: '"Fira Code", monospace',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.15em',
            marginBottom: '1.2rem',
          }}
        >
          {'< built with '}
          <span style={{ color: '#6C63FF' }}>React</span>
          {' & '}
          <span style={{ color: 'var(--teal)' }}>GSAP</span>
          {' />'}
        </p>

        {/* Copyright */}
        <p
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            opacity: 0.6,
          }}
        >
          © {year} Your Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
