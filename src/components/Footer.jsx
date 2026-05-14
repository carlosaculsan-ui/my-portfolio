export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: 'var(--footer-bg)', borderTop: '1px solid var(--footer-border)', padding: '2.5rem 2rem', textAlign: 'center' }}>
      <div className="section-container">
        <p className="footer-logo">CS</p>

        <p className="footer-tagline">
          {'< built with '}
          <span style={{ color: 'var(--accent)' }}>React</span>
          {' & '}
          <span style={{ color: 'var(--teal)' }}>GSAP</span>
          {' />'}
        </p>

        <p className="footer-copyright">
          © {year} Carlo Saculsan. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
