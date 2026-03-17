export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: '#080810',
        borderTop: '1px solid rgba(108,99,255,0.1)',
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
            background: 'linear-gradient(135deg, #6C63FF, #00F5D4)',
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
            color: '#444460',
            letterSpacing: '0.15em',
            marginBottom: '1.2rem',
          }}
        >
          {'< built with '}
          <span style={{ color: '#6C63FF' }}>React</span>
          {' & '}
          <span style={{ color: '#00F5D4' }}>GSAP</span>
          {' />'}
        </p>

        {/* Copyright */}
        <p
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.78rem',
            color: '#333348',
          }}
        >
          © {year} Your Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
