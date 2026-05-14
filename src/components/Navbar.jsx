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
      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}
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
      {/* Sliding knob — left position and colors are JS-driven (prevents FOUC) */}
      <span
        style={{
          position: 'absolute',
          top: '3px',
          left: isDark ? 'calc(100% - 25px)' : '3px',
          width: '22px',
          height: '22px',
          borderRadius: '50%',
          backgroundColor: isDark ? '#6C63FF' : '#ffffff',
          boxShadow: isDark ? '0 2px 8px rgba(108,99,255,0.5)' : '0 2px 6px rgba(0,0,0,0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isDark ? '#ffffff' : '#f0a500',
          transition: 'left 0.35s cubic-bezier(0.34,1.28,0.64,1), background-color 0.35s ease, box-shadow 0.35s ease',
          pointerEvents: 'none',
        }}
      >
        {isDark ? <Moon size={11} strokeWidth={2.5} /> : <Sun size={12} strokeWidth={2.5} />}
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
    const ctx = gsap.context(() => {
      gsap.fromTo(navRef.current, { y: -80 }, { y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 });
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

  // Background/border/shadow are JS-driven to prevent flash of unstyled content —
  // isDark is read synchronously from the DOM class set by the inline script in index.html.
  const bgColor = isDark ? '#0d0d1a' : '#f4f4ff';
  const border  = isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)';
  const shadow  = scrolled
    ? isDark ? '0 4px 24px rgba(0,0,0,0.5)' : '0 4px 24px rgba(108,99,255,0.10)'
    : 'none';

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        height: '64px', display: 'flex', alignItems: 'center',
        backgroundColor: bgColor, borderBottom: border, boxShadow: shadow,
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
      }}
    >
      {/* Inner container — 3-col: logo | links (true center) | controls */}
      <div className="flex items-center w-full h-full px-5 md:px-8 mx-auto max-w-[1200px]">

        {/* Left: Logo */}
        <div className="flex-1">
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}
            className="flex items-center no-underline"
            aria-label="Home"
          >
            <svg width="38" height="42" viewBox="-4 -2 66 72" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1"  y="1"  width="36" height="36" stroke="#5b7ea8" strokeWidth="2.6" fill="none" transform="rotate(13 19 19)" />
              <rect x="21" y="31" width="36" height="36" stroke="#c07858" strokeWidth="2.6" fill="none" transform="rotate(13 39 49)" />
            </svg>
          </a>
        </div>

        {/* Center: Desktop nav links */}
        <div className="hidden md:flex items-center gap-14">
          {links.map((l) => <MagneticLink key={l} label={l} />)}
        </div>

        {/* Right: controls (desktop + mobile) */}
        <div className="flex-1 flex items-center justify-end gap-4">
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}
            className="btn-hire hidden md:block"
          >
            Hire Me
          </a>
          <ThemeToggle />
          {/* Mobile-only hamburger */}
          <button
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            style={{ background: 'none', border: 'none', padding: '8px' }}
            aria-label="Toggle menu"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display: 'block', width: '22px', height: '2px', borderRadius: '2px',
                    backgroundColor: isDark ? '#e8e8e8' : '#1a1a2e',
                    transition: 'transform 0.3s, opacity 0.3s',
                    transform:
                      open && i === 0 ? 'translateY(7px) rotate(45deg)'
                      : open && i === 2 ? 'translateY(-7px) rotate(-45deg)'
                      : open && i === 1 ? 'scaleX(0)' : 'none',
                    opacity: open && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        style={{
          position: 'absolute', top: '64px', left: 0, right: 0,
          backgroundColor: isDark ? '#0d0d1a' : '#f4f4ff',
          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          overflow: 'hidden',
          maxHeight: open ? '300px' : '0',
          transition: 'max-height 0.4s ease',
          borderBottom: open ? border : 'none',
          zIndex: 999,
        }}
      >
        <div className="flex flex-col gap-5 px-8 py-6">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={(e) => { e.preventDefault(); scrollTo(l.toLowerCase()); }}
              className="mobile-nav-link"
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
