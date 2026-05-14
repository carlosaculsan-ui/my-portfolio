import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Download } from 'lucide-react';

const SUBTITLE_TEXTS = [
  'I build things that people actually use.',
  'I bring ideas to life.',
  "I'm always learning, always building.",
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
        gsap.to(el, { x: (e.clientX - cx) * 0.3, y: (e.clientY - cy) * 0.3, duration: 0.4, ease: 'power2.out' });
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
  const sectionRef      = useRef(null);
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [displayed,     setDisplayed]     = useState('');
  const [phase,         setPhase]         = useState('typing');
  const btn1Ref = useMagnetic();
  const btn2Ref = useMagnetic();
  const btn3Ref = useMagnetic();

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

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" ref={sectionRef} className="hero-section">
      {/* Grid dots */}
      <div className="grid-bg absolute inset-0 opacity-[0.45] pointer-events-none" />

      {/* Gradient orbs */}
      <div className="orbs-layer">
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

      {/* Content */}
      <div className="hero-content">
        <p className="hero-greeting">Hi, my name is</p>

        <h1 className="hero-name">Carlo Saculsan</h1>

        <p className="hero-sub">
          {displayed}
          <span className="typewriter-cursor" />
        </p>

        <div className="flex flex-wrap gap-5 justify-center">
          <button
            ref={btn1Ref}
            className="hero-cta magnetic btn-primary"
            onClick={() => scrollTo('projects')}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 50px rgba(108,99,255,0.65)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 30px rgba(108,99,255,0.4)'; }}
          >
            View Projects
          </button>

          <button
            ref={btn2Ref}
            className="hero-cta magnetic btn-secondary"
            onClick={() => scrollTo('contact')}
            onMouseEnter={(e) => {
              e.currentTarget.style.background  = 'rgba(108,99,255,0.08)';
              e.currentTarget.style.boxShadow   = '0 0 30px rgba(108,99,255,0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background  = 'transparent';
              e.currentTarget.style.boxShadow   = 'none';
            }}
          >
            Contact Me
          </button>

          <a
            ref={btn3Ref}
            href="/Carlo_Saculsan_Resume.pdf"
            download
            className="hero-cta magnetic btn-secondary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(108,99,255,0.08)';
              e.currentTarget.style.boxShadow  = '0 0 30px rgba(108,99,255,0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.boxShadow  = 'none';
            }}
          >
            <Download size={15} />
            Download CV
          </a>
        </div>
      </div>

    </section>
  );
}
