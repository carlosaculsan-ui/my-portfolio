import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const SUBTITLE_TEXTS = [
  'I build things for the web.',
  'I craft immersive UI experiences.',
  'I turn ideas into reality.',
];

function useMagnetic() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
      if (dist < 110) {
        gsap.to(el, {
          x: (e.clientX - cx) * 0.3,
          y: (e.clientY - cy) * 0.3,
          duration: 0.4, ease: 'power2.out',
        });
      } else {
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.5)' });
      }
    };
    const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.5)' });
    window.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);
  return ref;
}

export default function Hero() {
  const sectionRef  = useRef(null);
  const spotRef     = useRef(null);
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [displayed,     setDisplayed]     = useState('');
  const [phase,         setPhase]         = useState('typing');
  const btn1Ref = useMagnetic();
  const btn2Ref = useMagnetic();

  // Typewriter effect
  useEffect(() => {
    const full = SUBTITLE_TEXTS[subtitleIndex];
    let timer;
    if (phase === 'typing') {
      if (displayed.length < full.length) {
        timer = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 65);
      } else {
        timer = setTimeout(() => setPhase('pausing'), 1800);
      }
    } else if (phase === 'pausing') {
      timer = setTimeout(() => setPhase('erasing'), 200);
    } else if (phase === 'erasing') {
      if (displayed.length > 0) {
        timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      } else {
        setSubtitleIndex((i) => (i + 1) % SUBTITLE_TEXTS.length);
        setPhase('typing');
      }
    }
    return () => clearTimeout(timer);
  }, [displayed, phase, subtitleIndex]);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-greeting', { y: 30, opacity: 0, duration: 0.8, delay: 0.5,  ease: 'power3.out' });
      gsap.from('.hero-name',     { y: 40, opacity: 0, duration: 0.9, delay: 0.75, ease: 'power3.out' });
      gsap.from('.hero-sub',      { y: 30, opacity: 0, duration: 0.8, delay: 1.0,  ease: 'power3.out' });
      gsap.from('.hero-cta',      { y: 25, opacity: 0, duration: 0.7, delay: 1.3,  ease: 'power3.out', stagger: 0.15 });
      gsap.from('.hero-scroll',   { y: 15, opacity: 0, duration: 0.6, delay: 2.0,  ease: 'power3.out' });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Spotlight effect
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const onMove = (e) => {
      const rect = section.getBoundingClientRect();
      if (spotRef.current) {
        spotRef.current.style.background =
          `radial-gradient(650px circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(108,99,255,0.10) 0%, rgba(108,99,255,0.03) 35%, transparent 65%)`;
      }
    };
    section.addEventListener('mousemove', onMove);
    return () => section.removeEventListener('mousemove', onMove);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        paddingTop: '7rem',   /* 112px — clears the 64px fixed navbar with breathing room */
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'var(--bg-primary)',
      }}
    >
      {/* Grid dots */}
      <div
        className="grid-bg"
        style={{ position: 'absolute', inset: 0, opacity: 0.45, pointerEvents: 'none' }}
      />

      {/* Gradient orbs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', width: '600px', height: '600px',
          borderRadius: '50%', top: '-200px', left: '-200px',
          background: 'radial-gradient(circle, rgba(108,99,255,0.10) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', width: '500px', height: '500px',
          borderRadius: '50%', bottom: '-150px', right: '-150px',
          background: 'radial-gradient(circle, rgba(108,99,255,0.06) 0%, transparent 70%)',
        }} />
      </div>

      {/* Spotlight overlay */}
      <div
        ref={spotRef}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', transition: 'background 0.1s ease' }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 1.5rem', maxWidth: '860px' }}>
        <p
          className="hero-greeting"
          style={{
            fontFamily: '"Fira Code", monospace',
            color: '#6C63FF',
            fontSize: '1.1rem',
            letterSpacing: '0.2em',
            marginBottom: '1.2rem',
          }}
        >
          Hi, my name is
        </p>

        <h1
          className="hero-name"
          style={{
            fontFamily: '"Oswald", sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(3.2rem, 10vw, 7rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.01em',
            background: 'linear-gradient(135deg, var(--text-primary) 20%, #a89fff 60%, var(--teal) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1.5rem',
          }}
        >
          Your Name.
        </h1>

        <p
          className="hero-sub"
          style={{
            fontFamily: '"Fira Code", monospace',
            fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
            color: 'var(--text-muted)',
            marginBottom: '2.8rem',
            minHeight: '2em',
          }}
        >
          {displayed}
          <span className="typewriter-cursor" />
        </p>

        <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {/* Primary button */}
          <button
            ref={btn1Ref}
            className="hero-cta magnetic"
            onClick={() => scrollTo('projects')}
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: '0.875rem',
              letterSpacing: '0.1em',
              padding: '14px 34px',
              borderRadius: '8px',
              border: 'none',
              background: 'linear-gradient(135deg, #6C63FF, #5651d4)',
              color: '#fff',
              fontWeight: 500,
              boxShadow: '0 0 30px rgba(108,99,255,0.4)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 50px rgba(108,99,255,0.65)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 30px rgba(108,99,255,0.4)'; }}
          >
            View Projects
          </button>

          {/* Secondary button */}
          <button
            ref={btn2Ref}
            className="hero-cta magnetic"
            onClick={() => scrollTo('contact')}
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: '0.875rem',
              letterSpacing: '0.1em',
              padding: '13px 34px',
              borderRadius: '8px',
              border: '1.5px solid rgba(108,99,255,0.5)',
              background: 'transparent',
              color: '#6C63FF',
              fontWeight: 500,
              transition: 'background 0.25s, box-shadow 0.25s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(108,99,255,0.08)';
              e.currentTarget.style.boxShadow  = '0 0 30px rgba(108,99,255,0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.boxShadow  = 'none';
            }}
          >
            Contact Me
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hero-scroll"
        style={{
          position: 'absolute', bottom: '2.5rem', left: '50%',
          transform: 'translateX(-50%)', display: 'flex',
          flexDirection: 'column', alignItems: 'center', gap: '8px',
        }}
      >
        <span style={{ fontFamily: '"Fira Code", monospace', fontSize: '0.7rem', color: 'var(--scroll-label)', letterSpacing: '0.2em' }}>
          SCROLL
        </span>
        <div style={{
          width: '1.5px', height: '50px',
          background: 'linear-gradient(to bottom, #6C63FF, transparent)',
          animation: 'float 2s ease-in-out infinite',
        }} />
      </div>
    </section>
  );
}
