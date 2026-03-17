import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'HTML5',      icon: '🌐', color: '#E34F26', bg: 'rgba(227,79,38,0.08)',   border: 'rgba(227,79,38,0.25)' },
  { name: 'CSS3',       icon: '🎨', color: '#1572B6', bg: 'rgba(21,114,182,0.08)',  border: 'rgba(21,114,182,0.25)' },
  { name: 'JavaScript', icon: '⚡', color: '#c8a800', bg: 'rgba(200,168,0,0.07)',   border: 'rgba(200,168,0,0.30)'  },
  { name: 'React',      icon: '⚛️', color: '#00a8cc', bg: 'rgba(0,168,204,0.07)',   border: 'rgba(0,168,204,0.25)'  },
  { name: 'Tailwind',   icon: '🌊', color: '#0ea5d4', bg: 'rgba(14,165,212,0.07)',  border: 'rgba(14,165,212,0.25)' },
  { name: 'Node.js',    icon: '🟢', color: '#3d8b40', bg: 'rgba(61,139,64,0.08)',   border: 'rgba(61,139,64,0.25)'  },
  { name: 'Git',        icon: '🔀', color: '#E05030', bg: 'rgba(224,80,48,0.07)',   border: 'rgba(224,80,48,0.25)'  },
  { name: 'GitHub',     icon: '🐙', color: null,      bg: null,                     border: null                    },
  { name: 'Figma',      icon: '✏️', color: '#E0461A', bg: 'rgba(224,70,26,0.07)',   border: 'rgba(224,70,26,0.25)'  },
];

function SkillCard({ skill }) {
  const { isDark } = useTheme();

  // GitHub needs a theme-aware color so it's visible on both backgrounds
  const color  = skill.name === 'GitHub' ? (isDark ? '#b0b0cc' : '#2a2a4a') : skill.color;
  const bg     = skill.name === 'GitHub'
    ? (isDark ? 'rgba(176,176,204,0.06)' : 'rgba(42,42,74,0.06)')
    : (isDark ? skill.bg : 'var(--bg-card)');
  const border = skill.name === 'GitHub'
    ? (isDark ? 'rgba(176,176,204,0.18)' : 'rgba(42,42,74,0.18)')
    : skill.border;

  const onEnter = (e) => {
    gsap.to(e.currentTarget, { y: -8, scale: 1.05, duration: 0.3, ease: 'power2.out' });
    e.currentTarget.style.boxShadow = `0 12px 40px ${color}33, 0 0 0 1px ${border}`;
  };
  const onLeave = (e) => {
    gsap.to(e.currentTarget, { y: 0, scale: 1, duration: 0.4, ease: 'elastic.out(1,0.5)' });
    e.currentTarget.style.removeProperty('box-shadow');
  };

  return (
    <div
      className="skill-card"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: '14px',
        padding: '1.6rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
        transition: 'box-shadow 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow orb */}
      <div style={{
        position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)',
        width: '80px', height: '80px', borderRadius: '50%',
        background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <span style={{ fontSize: '2.2rem', lineHeight: 1 }}>{skill.icon}</span>
      <span style={{
        fontFamily: '"Fira Code", monospace',
        fontSize: '0.78rem',
        fontWeight: 500,
        color: color,
        letterSpacing: '0.05em',
        textAlign: 'center',
      }}>
        {skill.name}
      </span>

      {/* Bottom accent bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: '20%', right: '20%',
        height: '2px', borderRadius: '2px',
        background: `linear-gradient(90deg, transparent, ${color}66, transparent)`,
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
      style={{ padding: '110px 0', background: 'var(--bg-primary)', position: 'relative' }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Header */}
        <div className="skills-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="section-number" style={{ marginBottom: '0.5rem' }}>02. &nbsp;skills</p>
          <h2 style={{
            fontFamily: '"Oswald", sans-serif',
            fontWeight: 600,
            fontSize: 'clamp(2rem, 5vw, 2.8rem)',
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            lineHeight: 1.1,
          }}>
            Technologies I <span className="gradient-text">Work With</span>
          </h2>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            color: 'var(--text-muted)',
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
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1.2rem' }}
        >
          {skills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
