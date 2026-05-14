import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import passportPic from '../assets/Passport pic.jpg';

gsap.registerPlugin(ScrollTrigger);

const bullets = [
  { emoji: '🚀', text: 'Passionate about building fast, accessible, pixel-perfect interfaces.' },
  { emoji: '🎨', text: 'Design-driven developer — I care as much about aesthetics as I do about code quality.' },
  { emoji: '🛠️', text: 'Love working across the stack, from RESTful APIs to polished front-end animations.' },
  { emoji: '📚', text: 'Continuous learner — currently exploring Three.js and WebGL for immersive web experiences.' },
  { emoji: '🎮', text: "When I'm not coding, I'm gaming or tinkering with side projects." },
];

// Corner accent positions — only the directional border values change per corner
const cornerAccents = [
  { top: -1,    left:  -1, borderTop:    '2px solid var(--accent)', borderLeft:   '2px solid var(--accent)' },
  { top: -1,    right: -1, borderTop:    '2px solid var(--accent)', borderRight:  '2px solid var(--accent)' },
  { bottom: -1, left:  -1, borderBottom: '2px solid var(--teal)',   borderLeft:   '2px solid var(--teal)' },
  { bottom: -1, right: -1, borderBottom: '2px solid var(--teal)',   borderRight:  '2px solid var(--teal)' },
];

export default function About() {
  const sectionRef  = useRef(null);
  const [imgFailed, setImgFailed] = useState(false);

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
    <section id="about" ref={sectionRef} className="section-secondary">
      {/* Top wave */}
      <div className="wave-top">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,0 L0,0 Z" fill="var(--bg-primary)" />
        </svg>
      </div>

      <div className="section-container">
        <div className="grid-about">

          {/* Left: text */}
          <div>
            <h2 className="about-heading">
              A Little About <span className="gradient-text">Me</span>
            </h2>
            <div className="about-line" />
            <p className="about-bio">
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
                  <span className="about-bullet-text">{b.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: visual card */}
          <div className="about-image flex justify-center">
            <div className="about-card">
              {/* Corner accents */}
              {cornerAccents.map((s, i) => (
                <div key={i} style={{ position: 'absolute', width: '20px', height: '20px', borderRadius: '2px', ...s }} />
              ))}

              {/* Avatar */}
              <div className="about-avatar">
                {imgFailed ? (
                  <div style={{
                    width: '100%', height: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'linear-gradient(135deg, var(--accent), var(--teal))',
                    fontFamily: '"Oswald", sans-serif', fontWeight: 700,
                    fontSize: '1.8rem', color: '#fff', letterSpacing: '0.05em',
                  }}>
                    CS
                  </div>
                ) : (
                  <img
                    src={passportPic}
                    alt="Carlo Saculsan"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={() => setImgFailed(true)}
                  />
                )}
              </div>

              <div className="text-center">
                <p className="about-name">Carlo Saculsan</p>
                <p className="about-role">Quezon City, Philippines 🇵🇭</p>
              </div>

              {/* Status badge */}
              <div className="about-status">
                <span className="about-status-dot" />
                <span className="about-status-text">Open to work</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom wave */}
      <div className="wave-bottom">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,20 C360,60 1080,-20 1440,20 L1440,60 L0,60 Z" fill="var(--bg-primary)" />
        </svg>
      </div>
    </section>
  );
}
