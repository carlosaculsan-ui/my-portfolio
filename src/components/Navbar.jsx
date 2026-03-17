import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const links = ['About', 'Skills', 'Projects', 'Contact'];

function MagneticLink({ label }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
      if (dist < 90) {
        const dx = (e.clientX - cx) * 0.28;
        const dy = (e.clientY - cy) * 0.28;
        gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' });
      } else {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' });
      }
    };

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' });
    };

    window.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const scroll = (e) => {
    e.preventDefault();
    document.getElementById(label.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <a
      ref={ref}
      href={`#${label.toLowerCase()}`}
      onClick={scroll}
      className="nav-link magnetic text-sm tracking-widest uppercase"
      style={{ fontFamily: '"Fira Code", monospace', color: '#c8c8d8' }}
    >
      {label}
    </a>
  );
}

export default function Navbar() {
  const navRef     = useRef(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Entrance animation
    gsap.from(navRef.current, {
      y: -70, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.3,
    });

    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled
          ? 'rgba(10,10,15,0.88)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(18px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(108,99,255,0.12)' : 'none',
        transition: 'background 0.4s ease, border-bottom 0.4s ease',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}
          style={{
            fontFamily: '"Oswald", sans-serif',
            fontWeight: 700,
            fontSize: '1.5rem',
            letterSpacing: '0.08em',
            background: 'linear-gradient(135deg, #6C63FF, #00F5D4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textDecoration: 'none',
          }}
        >
          YN
        </a>

        {/* Desktop links */}
        <div
          className="hidden md:flex"
          style={{ gap: '2.5rem', alignItems: 'center' }}
        >
          {links.map((l) => <MagneticLink key={l} label={l} />)}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: '0.8rem',
              padding: '8px 22px',
              borderRadius: '6px',
              border: '1.5px solid #6C63FF',
              color: '#6C63FF',
              textDecoration: 'none',
              letterSpacing: '0.08em',
              transition: 'background 0.25s, color 0.25s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#6C63FF';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#6C63FF';
            }}
          >
            Hire Me
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          style={{
            background: 'none',
            border: 'none',
            color: '#e8e8e8',
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: '24px',
                height: '2px',
                background: '#6C63FF',
                borderRadius: '2px',
                transition: 'transform 0.3s, opacity 0.3s',
                transform:
                  open && i === 0 ? 'translateY(7px) rotate(45deg)'
                  : open && i === 2 ? 'translateY(-7px) rotate(-45deg)'
                  : open && i === 1 ? 'scaleX(0)'
                  : 'none',
                opacity: open && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        style={{
          background: 'rgba(10,10,15,0.96)',
          backdropFilter: 'blur(18px)',
          overflow: 'hidden',
          maxHeight: open ? '300px' : '0',
          transition: 'max-height 0.4s ease',
          borderBottom: open ? '1px solid rgba(108,99,255,0.15)' : 'none',
        }}
      >
        <div style={{ padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={(e) => { e.preventDefault(); scrollTo(l.toLowerCase()); }}
              style={{
                fontFamily: '"Fira Code", monospace',
                fontSize: '0.9rem',
                color: '#c8c8d8',
                textDecoration: 'none',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
