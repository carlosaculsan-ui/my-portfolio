import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'HTML5',       icon: '🌐', color: '#E34F26', bg: 'rgba(227,79,38,0.08)',   border: 'rgba(227,79,38,0.25)' },
  { name: 'CSS3',        icon: '🎨', color: '#1572B6', bg: 'rgba(21,114,182,0.08)',  border: 'rgba(21,114,182,0.25)' },
  { name: 'JavaScript',  icon: '⚡', color: '#F7DF1E', bg: 'rgba(247,223,30,0.07)',  border: 'rgba(247,223,30,0.25)' },
  { name: 'React',       icon: '⚛️', color: '#61DAFB', bg: 'rgba(97,218,251,0.07)',  border: 'rgba(97,218,251,0.25)' },
  { name: 'Tailwind',    icon: '🌊', color: '#38BDF8', bg: 'rgba(56,189,248,0.07)',  border: 'rgba(56,189,248,0.25)' },
  { name: 'Node.js',     icon: '🟢', color: '#68A063', bg: 'rgba(104,160,99,0.08)',  border: 'rgba(104,160,99,0.25)' },
  { name: 'Git',         icon: '🔀', color: '#F05032', bg: 'rgba(240,80,50,0.07)',   border: 'rgba(240,80,50,0.25)' },
  { name: 'GitHub',      icon: '🐙', color: '#e8e8e8', bg: 'rgba(232,232,232,0.05)', border: 'rgba(232,232,232,0.15)' },
  { name: 'Figma',       icon: '✏️', color: '#F24E1E', bg: 'rgba(242,78,30,0.07)',   border: 'rgba(242,78,30,0.25)' },
];

function SkillCard({ skill, index }) {
  const cardRef = useRef(null);

  const onEnter = (e) => {
    gsap.to(e.currentTarget, { y: -8, scale: 1.05, duration: 0.3, ease: 'power2.out' });
    e.currentTarget.style.boxShadow = `0 12px 40px ${skill.color}33, 0 0 0 1px ${skill.border}`;
  };
  const onLeave = (e) => {
    gsap.to(e.currentTarget, { y: 0, scale: 1, duration: 0.4, ease: 'elastic.out(1,0.5)' });
    e.currentTarget.style.boxShadow = `0 0 0 1px ${skill.border}`;
  };

  return (
    <div
      ref={cardRef}
      className="skill-card"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        background: skill.bg,
        border: `1px solid ${skill.border}`,
        borderRadius: '14px',
        padding: '1.6rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
        boxShadow: `0 0 0 1px ${skill.border}`,
        transition: 'box-shadow 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow orb */}
      <div style={{
        position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)',
        width: '80px', height: '80px', borderRadius: '50%',
        background: `radial-gradient(circle, ${skill.color}18 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <span style={{ fontSize: '2.2rem', lineHeight: 1 }}>{skill.icon}</span>
      <span
        style={{
          fontFamily: '"Fira Code", monospace',
          fontSize: '0.78rem',
          fontWeight: 500,
          color: skill.color,
          letterSpacing: '0.05em',
          textAlign: 'center',
        }}
      >
        {skill.name}
      </span>

      {/* Bottom accent bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: '20%', right: '20%',
        height: '2px', borderRadius: '2px',
        background: `linear-gradient(90deg, transparent, ${skill.color}66, transparent)`,
      }} />
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skills-header', {
        scrollTrigger: { trigger: '.skills-header', start: 'top 85%' },
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
      });
      gsap.from('.skill-card', {
        scrollTrigger: { trigger: '.skills-grid', start: 'top 80%' },
        y: 50, opacity: 0, scale: 0.9,
        duration: 0.6, stagger: 0.07, ease: 'back.out(1.5)',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{ padding: '110px 0', background: '#0a0a0f', position: 'relative' }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Header */}
        <div className="skills-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="section-number" style={{ marginBottom: '0.5rem' }}>02. &nbsp;skills</p>
          <h2 style={{
            fontFamily: '"Oswald", sans-serif',
            fontWeight: 600,
            fontSize: 'clamp(2rem, 5vw, 2.8rem)',
            color: '#e8e8e8',
            marginBottom: '1rem',
            lineHeight: 1.1,
          }}>
            Technologies I <span className="gradient-text">Work With</span>
          </h2>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            color: '#666680',
            fontSize: '0.95rem',
            maxWidth: '480px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            A curated set of tools and technologies I use to build modern web experiences.
          </p>
        </div>

        {/* Grid */}
        <div
          className="skills-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: '1.2rem',
          }}
        >
          {skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
