import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

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
        gsap.to(el, { x: (e.clientX - cx) * 0.28, y: (e.clientY - cy) * 0.28, duration: 0.4, ease: 'power2.out' });
      } else {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' });
      }
    };
    const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' });
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
      className="nav-link magnetic"
      style={{
        fontFamily: '"Fira Code", monospace',
        fontSize: '0.8rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        color: 'var(--text-primary)',
        transition: 'color 0.2s ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.color = '#6C63FF'; }}
      onMouseLeave={(e)  => { e.currentTarget.style.color = 'var(--text-primary)'; }}
    >
      {label}
    </a>
  );
}

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        position: 'relative',
        width: '56px',
        height: '28px',
        borderRadius: '999px',
        border: 'none',
        padding: 0,
        flexShrink: 0,
        cursor: 'none',
        backgroundColor: isDark ? '#1a1a2e' : '#e8e8f4',
        boxShadow: isDark
          ? 'inset 0 0 0 1.5px rgba(255,255,255,0.1)'
          : 'inset 0 0 0 1.5px rgba(0,0,0,0.1)',
        transition: 'background-color 0.35s ease, box-shadow 0.35s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = isDark
          ? 'inset 0 0 0 1.5px rgba(108,99,255,0.6), 0 0 12px rgba(108,99,255,0.3)'
          : 'inset 0 0 0 1.5px rgba(108,99,255,0.5), 0 0 10px rgba(108,99,255,0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = isDark
          ? 'inset 0 0 0 1.5px rgba(255,255,255,0.1)'
          : 'inset 0 0 0 1.5px rgba(0,0,0,0.1)';
      }}
    >
      {/* Sliding knob */}
      <span
        style={{
          position: 'absolute',
          top: '3px',
          left: isDark ? 'calc(100% - 25px)' : '3px',
          width: '22px',
          height: '22px',
          borderRadius: '50%',
          backgroundColor: isDark ? '#6C63FF' : '#ffffff',
          boxShadow: isDark
            ? '0 2px 8px rgba(108,99,255,0.5)'
            : '0 2px 6px rgba(0,0,0,0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isDark ? '#ffffff' : '#f0a500',
          transition: 'left 0.35s cubic-bezier(0.34,1.28,0.64,1), background-color 0.35s ease, box-shadow 0.35s ease',
          pointerEvents: 'none',
        }}
      >
        {isDark
          ? <Moon size={11} strokeWidth={2.5} />
          : <Sun size={12} strokeWidth={2.5} />
        }
      </span>
    </button>
  );
}

export default function Navbar() {
  const navRef = useRef(null);
  const { isDark } = useTheme();
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Use a GSAP context so StrictMode double-invocation is handled cleanly.
    // Animate only `y` (slide in from above) — never animate opacity, which
    // would leave the navbar invisible if the tween is interrupted.
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -80 },
        { y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );
    });

    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);

    return () => {
      ctx.revert();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  // Inline styles for background — never rely on Tailwind dark: for mission-critical
  // visibility. isDark is read synchronously from context which reads the DOM class
  // set by the inline script in index.html before React even loads.
  const bgColor  = isDark ? '#0d0d1a' : '#f4f4ff';
  const border   = isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)';
  const shadow   = scrolled
    ? isDark
      ? '0 4px 24px rgba(0,0,0,0.5)'
      : '0 4px 24px rgba(108,99,255,0.10)'
    : 'none';

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: bgColor,
        borderBottom: border,
        boxShadow: shadow,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
      }}
    >
      {/* Inner container */}
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
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
            background: 'linear-gradient(135deg, #6C63FF 0%, #00c4b4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          YN
        </a>

        {/* Desktop links + controls */}
        <div className="hidden md:flex" style={{ gap: '2.5rem', alignItems: 'center' }}>
          {links.map((l) => <MagneticLink key={l} label={l} />)}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: '0.78rem',
              padding: '7px 20px',
              borderRadius: '6px',
              border: '1.5px solid #6C63FF',
              color: '#6C63FF',
              textDecoration: 'none',
              letterSpacing: '0.08em',
              transition: 'background 0.25s, color 0.25s',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#6C63FF'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#6C63FF'; }}
          >
            Hire Me
          </a>
        </div>

        {/* Mobile: toggle + hamburger */}
        <div className="md:hidden" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            style={{ background: 'none', border: 'none', padding: '8px', display: 'flex', flexDirection: 'column', gap: '5px' }}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '22px',
                  height: '2px',
                  borderRadius: '2px',
                  backgroundColor: isDark ? '#e8e8e8' : '#1a1a2e',
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
      </div>

      {/* Mobile dropdown menu */}
      <div
        style={{
          position: 'absolute',
          top: '64px',
          left: 0,
          right: 0,
          backgroundColor: isDark ? '#0d0d1a' : '#f4f4ff',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          overflow: 'hidden',
          maxHeight: open ? '300px' : '0',
          transition: 'max-height 0.4s ease',
          borderBottom: open ? (isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)') : 'none',
          zIndex: 999,
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
                color: 'var(--text-primary)',
                textDecoration: 'none',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#6C63FF'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; }}
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
