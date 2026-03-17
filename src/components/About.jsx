import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const bullets = [
  { emoji: '🚀', text: 'Passionate about building fast, accessible, pixel-perfect interfaces.' },
  { emoji: '🎨', text: 'Design-driven developer — I care as much about aesthetics as I do about code quality.' },
  { emoji: '🛠️', text: 'Love working across the stack, from RESTful APIs to polished front-end animations.' },
  { emoji: '📚', text: 'Continuous learner — currently exploring Three.js and WebGL for immersive web experiences.' },
  { emoji: '🎮', text: "When I'm not coding, I'm gaming or tinkering with side projects." },
];

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-label',   { scrollTrigger: { trigger: '.about-label',   start: 'top 85%' }, x: -30, opacity: 0, duration: 0.6, ease: 'power3.out' });
      gsap.from('.about-heading', { scrollTrigger: { trigger: '.about-heading', start: 'top 85%' }, y:  40, opacity: 0, duration: 0.8, ease: 'power3.out' });
      gsap.from('.about-line',    { scrollTrigger: { trigger: '.about-line',    start: 'top 88%' }, scaleX: 0, duration: 0.6, ease: 'power3.out', transformOrigin: 'left' });
      gsap.from('.about-bio',     { scrollTrigger: { trigger: '.about-bio',     start: 'top 85%' }, y:  30, opacity: 0, duration: 0.8, ease: 'power3.out' });
      gsap.from('.about-bullet',  { scrollTrigger: { trigger: '.about-bullets', start: 'top 82%' }, x: -40, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out' });
      gsap.from('.about-image',   { scrollTrigger: { trigger: '.about-image',   start: 'top 80%' }, x:  60, opacity: 0, duration: 1.0, ease: 'power3.out' });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ position: 'relative', padding: '120px 0', background: 'var(--bg-secondary)', overflow: 'hidden' }}
    >
      {/* Top wave */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: '60px', display: 'block' }}>
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,0 L0,0 Z" fill="var(--bg-primary)" />
        </svg>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>

          {/* Left: text */}
          <div>
            <p className="about-label section-number" style={{ marginBottom: '0.5rem' }}>
              01. &nbsp;about me
            </p>
            <h2
              className="about-heading"
              style={{
                fontFamily: '"Oswald", sans-serif',
                fontWeight: 600,
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                color: 'var(--text-primary)',
                marginBottom: '1rem',
                lineHeight: 1.1,
              }}
            >
              A Little About <span className="gradient-text">Me</span>
            </h2>
            <div
              className="about-line"
              style={{ height: '2px', width: '60px', background: 'linear-gradient(90deg, #6C63FF, var(--teal))', borderRadius: '2px', marginBottom: '1.8rem' }}
            />
            <p
              className="about-bio"
              style={{ fontFamily: '"Inter", sans-serif', fontSize: '1.0rem', lineHeight: 1.85, color: 'var(--text-secondary)', marginBottom: '2rem' }}
            >
              I'm a front-end focused developer who loves crafting beautiful, responsive
              web experiences. With a solid foundation in React and modern CSS, I blend
              clean code with thoughtful design to build products that users actually
              enjoy interacting with.
              <br /><br />
              I thrive at the intersection of design and engineering — where a well-placed
              animation or a perfectly chosen font weight makes all the difference.
            </p>

            <ul className="about-bullets" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {bullets.map((b, i) => (
                <li key={i} className="about-bullet" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: '2px' }}>{b.emoji}</span>
                  <span style={{ fontFamily: '"Inter", sans-serif', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {b.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: visual card */}
          <div className="about-image" style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                width: '280px',
                height: '340px',
                borderRadius: '16px',
                position: 'relative',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                boxShadow: '0 0 60px rgba(108,99,255,0.10)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              {/* Corner accents */}
              {[
                { top: -1,    left:  -1, borderTop:    '2px solid #6C63FF', borderLeft:   '2px solid #6C63FF' },
                { top: -1,    right: -1, borderTop:    '2px solid #6C63FF', borderRight:  '2px solid #6C63FF' },
                { bottom: -1, left:  -1, borderBottom: '2px solid var(--teal)', borderLeft:  '2px solid var(--teal)' },
                { bottom: -1, right: -1, borderBottom: '2px solid var(--teal)', borderRight: '2px solid var(--teal)' },
              ].map((s, i) => (
                <div key={i} style={{ position: 'absolute', width: '20px', height: '20px', borderRadius: '2px', ...s }} />
              ))}

              {/* Avatar */}
              <div style={{
                width: '100px', height: '100px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #6C63FF 0%, var(--teal) 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2.5rem', fontFamily: '"Oswald", sans-serif', fontWeight: 700,
                color: '#fff', boxShadow: '0 0 30px rgba(108,99,255,0.35)',
              }}>
                YN
              </div>

              <div style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: '"Oswald", sans-serif', fontWeight: 600, fontSize: '1.15rem', color: 'var(--text-primary)' }}>
                  Your Name
                </p>
                <p style={{ fontFamily: '"Fira Code", monospace', fontSize: '0.75rem', color: '#6C63FF', marginTop: '4px' }}>
                  &lt; Frontend Developer /&gt;
                </p>
              </div>

              {/* Status badge */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '6px 14px', borderRadius: '20px',
                background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.2)',
              }}>
                <span style={{
                  width: '7px', height: '7px', borderRadius: '50%',
                  background: 'var(--teal)', boxShadow: '0 0 8px var(--teal)',
                  animation: 'blink 2s ease-in-out infinite',
                }} />
                <span style={{ fontFamily: '"Fira Code", monospace', fontSize: '0.7rem', color: 'var(--teal)' }}>
                  Open to work
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: '60px', display: 'block' }}>
          <path d="M0,20 C360,60 1080,-20 1440,20 L1440,60 L0,60 Z" fill="var(--bg-primary)" />
        </svg>
      </div>
    </section>
  );
}
