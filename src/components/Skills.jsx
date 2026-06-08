import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const coreSkills = [
  { name: 'HTML5',      icon: '🌐', color: '#E34F26', bg: 'rgba(227,79,38,0.08)',   border: 'rgba(227,79,38,0.25)' },
  { name: 'JavaScript', icon: '⚡', color: '#c8a800', bg: 'rgba(200,168,0,0.07)',   border: 'rgba(200,168,0,0.30)'  },
  { name: 'React',      icon: '⚛️', color: '#00a8cc', bg: 'rgba(0,168,204,0.07)',   border: 'rgba(0,168,204,0.25)'  },
  { name: 'Tailwind',   icon: '🌊', color: '#0ea5d4', bg: 'rgba(14,165,212,0.07)',  border: 'rgba(14,165,212,0.25)' },
  { name: 'Supabase',   icon: '🗄️', color: '#3ecf8e', bg: 'rgba(62,207,142,0.07)',  border: 'rgba(62,207,142,0.25)' },
  { name: 'Express.js', icon: '🚂', color: '#8a8a8a', bg: 'rgba(138,138,138,0.07)', border: 'rgba(138,138,138,0.25)' },
  { name: 'Git',        icon: '🔀', color: '#E05030', bg: 'rgba(224,80,48,0.07)',   border: 'rgba(224,80,48,0.25)'  },
  { name: 'GitHub',     icon: '🐙', color: null,      bg: null,                     border: null                    },
  { name: 'Vercel',     icon: '▲',  color: null,      bg: null,                     border: null                    },
];

const familiarSkills = [
  { name: 'CSS3',       icon: '🎨', color: '#1572B6', bg: 'rgba(21,114,182,0.08)',  border: 'rgba(21,114,182,0.25)' },
  { name: 'Node.js',    icon: '🟢', color: '#3d8b40', bg: 'rgba(61,139,64,0.08)',   border: 'rgba(61,139,64,0.25)'  },
  { name: 'Vite',       icon: '⚡', color: '#a259ff', bg: 'rgba(162,89,255,0.07)',  border: 'rgba(162,89,255,0.25)' },
  { name: 'Socket.io',  icon: '🔌', color: null,      bg: null,                     border: null                    },
  { name: 'Claude',     icon: '✦',  color: '#d97706', bg: 'rgba(217,119,6,0.07)',   border: 'rgba(217,119,6,0.25)'  },
  { name: 'Figma',      icon: '✏️', color: '#E0461A', bg: 'rgba(224,70,26,0.07)',   border: 'rgba(224,70,26,0.25)'  },
];

function SkillCard({ skill }) {
  const { isDark } = useTheme();

  const isNeutral = skill.color === null;
  const color  = isNeutral ? (isDark ? '#b0b0cc' : '#2a2a4a') : skill.color;
  const bg     = 'var(--bg-card)';
  const border = isNeutral ? (isDark ? 'rgba(176,176,204,0.18)' : 'rgba(42,42,74,0.18)') : skill.border;

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
      style={{ background: bg, border: `1px solid ${border}` }}
    >
      {/* Glow orb — color is dynamic per skill */}
      <div style={{
        position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)',
        width: '80px', height: '80px', borderRadius: '50%',
        background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <span style={{ fontSize: '2.2rem', lineHeight: 1 }}>{skill.icon}</span>
      <span className="skill-name" style={{ color }}>{skill.name}</span>

      {/* Bottom accent bar — color is dynamic per skill */}
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
    <section id="skills" ref={sectionRef} className="section-primary">
      <div className="section-container" style={{ maxWidth: '1000px' }}>
        <div className="skills-header section-header">
          <h2 className="heading-section">
            Technologies I <span className="gradient-text">Work With</span>
          </h2>
          <p className="subtext">
            A curated set of tools and technologies I use to build modern web experiences.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <div>
            <p className="skills-group-label">Core</p>
            <div className="skills-grid grid-skills">
              {coreSkills.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </div>
          </div>

          <div>
            <p className="skills-group-label">Familiar with</p>
            <div className="skills-grid grid-skills">
              {familiarSkills.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
