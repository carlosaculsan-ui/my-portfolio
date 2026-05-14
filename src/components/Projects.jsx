import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VanillaTilt from 'vanilla-tilt';
import { Github, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: '01',
    title: 'Hanap.ph',
    description:
      'A full-stack home services booking platform for the Philippines. Features tasker vetting, live GPS tracking, in-app payments via GCash and PayMaya, e-wallet system, and an admin panel with real-time analytics.',
    tags: ['React Vite', 'Supabase', 'Tailwind CSS', 'PayMongo', 'Groq AI', 'React Router', 'Vercel'],
    github: '#',
    live: 'https://home-service-web-five.vercel.app/',
    accent: '#6C63FF',
    gradient: 'linear-gradient(135deg, rgba(108,99,255,0.10) 0%, rgba(108,99,255,0.02) 100%)',
  },
  {
    number: '02',
    title: 'NestPH',
    description:
      'A two-sided rental marketplace for the Philippines connecting renters and landlords. Features real-time messaging, listing management, AI-powered search assistant, and an admin moderation dashboard.',
    tags: ['React Vite', 'Supabase', 'Tailwind CSS', 'Express.js', 'Socket.io', 'Groq AI', 'Render', 'Vercel'],
    github: '#',
    live: 'https://nestph.vercel.app/',
    accent: '#00b4a6',
    gradient: 'linear-gradient(135deg, rgba(0,180,166,0.10) 0%, rgba(0,180,166,0.02) 100%)',
  },
  {
    number: '03',
    title: 'Coming Soon',
    description: 'Something new is in the works. Stay tuned.',
    tags: [],
    github: null,
    live: null,
    accent: '#e05580',
    gradient: 'linear-gradient(135deg, rgba(224,85,128,0.10) 0%, rgba(224,85,128,0.02) 100%)',
  },
];

function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    VanillaTilt.init(el, { max: 10, speed: 500, glare: true, 'max-glare': 0.12, perspective: 1200, scale: 1.02 });
    return () => { if (el.vanillaTilt) el.vanillaTilt.destroy(); };
  }, []);

  return (
    <div
      ref={cardRef}
      className="project-card"
      onClick={() => { if (project.live) window.open(project.live, '_blank', 'noopener,noreferrer'); }}
      onMouseEnter={(e) => { e.currentTarget.style.setProperty('border-color', `${project.accent}55`); if (project.live) setHovered(true); }}
      onMouseLeave={(e) => { e.currentTarget.style.removeProperty('border-color'); setHovered(false); }}
    >
      {/* Corner badge — signals the card is clickable on hover */}
      {project.live && (
        <div style={{
          position: 'absolute', top: '14px', right: '14px', zIndex: 2,
          display: 'flex', alignItems: 'center', gap: '5px',
          padding: '5px 10px', borderRadius: '999px',
          background: `${project.accent}22`,
          border: `1px solid ${project.accent}55`,
          color: project.accent,
          fontFamily: '"Fira Code", monospace', fontSize: '0.7rem', letterSpacing: '0.1em',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(-6px)',
          transition: 'opacity 0.25s ease, transform 0.25s ease',
          pointerEvents: 'none',
        }}>
          <ExternalLink size={11} strokeWidth={2} />
          Visit Site
        </div>
      )}

      {/* Background gradient — dynamic per project */}
      <div style={{ position: 'absolute', inset: 0, background: project.gradient, pointerEvents: 'none', borderRadius: '16px' }} />

      {/* Glow orb — dynamic per project */}
      <div style={{
        position: 'absolute', top: '-40px', right: '-40px',
        width: '150px', height: '150px', borderRadius: '50%',
        background: `radial-gradient(circle, ${project.accent}18 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* accent color is per-project, so it stays inline */}
        <p className="project-number" style={{ color: project.accent }}>{project.number}</p>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>

        {project.tags.length > 0 && (
          <div className="project-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="tech-tag">{tag}</span>
            ))}
          </div>
        )}

        {(project.github || project.live) && (
          <div className="project-links">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={(e) => { e.currentTarget.style.color = project.accent; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}
              >
                <Github size={15} />
                GitHub
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={(e) => { e.currentTarget.style.color = project.accent; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = ''; }}
              >
                <ExternalLink size={15} />
                Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.projects-header', {
        scrollTrigger: { trigger: '.projects-header', start: 'top 85%' },
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
      });
      gsap.from('.project-card', {
        scrollTrigger: { trigger: '.projects-grid', start: 'top 78%' },
        y: 60, opacity: 0, duration: 0.75, stagger: 0.15, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="section-primary">
      {/* Top wave */}
      <div className="wave-top">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,30 C480,70 960,0 1440,30 L1440,0 L0,0 Z" fill="var(--bg-secondary)" />
        </svg>
      </div>

      <div className="section-container">
        <div className="projects-header section-header">
          <h2 className="heading-section">
            Things I've <span className="gradient-text">Built</span>
          </h2>
          <p className="subtext">
            A selection of projects I'm proud of. Each one taught me something new.
          </p>
        </div>

        <div className="projects-grid grid-projects">
          {projects.map((p) => (
            <ProjectCard key={p.number} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
