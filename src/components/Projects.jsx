import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VanillaTilt from 'vanilla-tilt';
import { Github, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: '01',
    title: 'Real Estate Website',
    description:
      'A sleek frontend UI for a modern property listing platform. Features advanced search filters, an interactive map view, and smooth CSS clip-path transitions between property cards.',
    tags: ['React', 'Tailwind CSS', 'CSS Clip-path', 'Framer Motion'],
    github: '#',
    live: '#',
    accent: '#6C63FF',
    gradient: 'linear-gradient(135deg, rgba(108,99,255,0.10) 0%, rgba(108,99,255,0.02) 100%)',
  },
  {
    number: '02',
    title: 'Project Two',
    description:
      'A full-stack web application with real-time data synchronization, user authentication, and a polished dashboard interface. Built with a focus on performance and scalability.',
    tags: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    github: '#',
    live: '#',
    accent: '#00b4a6',
    gradient: 'linear-gradient(135deg, rgba(0,180,166,0.10) 0%, rgba(0,180,166,0.02) 100%)',
  },
  {
    number: '03',
    title: 'Project Three',
    description:
      'An e-commerce frontend with animated product cards, a responsive checkout flow, and smooth page transitions. Optimized for Lighthouse scores of 95+ across all categories.',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Stripe'],
    github: '#',
    live: '#',
    accent: '#e05580',
    gradient: 'linear-gradient(135deg, rgba(224,85,128,0.10) 0%, rgba(224,85,128,0.02) 100%)',
  },
];

function ProjectCard({ project }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    VanillaTilt.init(el, {
      max: 10,
      speed: 500,
      glare: true,
      'max-glare': 0.12,
      perspective: 1200,
      scale: 1.02,
    });
    return () => { if (el.vanillaTilt) el.vanillaTilt.destroy(); };
  }, []);

  return (
    <div
      ref={cardRef}
      className="project-card"
      style={{
        background: 'var(--bg-card)',
        borderRadius: '16px',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
        transformStyle: 'preserve-3d',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.setProperty('border-color', `${project.accent}55`);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.removeProperty('border-color');
      }}
    >
      {/* Background gradient */}
      <div style={{ position: 'absolute', inset: 0, background: project.gradient, pointerEvents: 'none', borderRadius: '16px' }} />

      {/* Glow orb */}
      <div style={{
        position: 'absolute', top: '-40px', right: '-40px',
        width: '150px', height: '150px', borderRadius: '50%',
        background: `radial-gradient(circle, ${project.accent}18 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{ fontFamily: '"Fira Code", monospace', fontSize: '0.75rem', color: project.accent, letterSpacing: '0.15em', marginBottom: '1rem', opacity: 0.75 }}>
          {project.number}
        </p>

        <h3 style={{ fontFamily: '"Oswald", sans-serif', fontWeight: 600, fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '0.9rem', lineHeight: 1.2 }}>
          {project.title}
        </h3>

        <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
          {project.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.8rem' }}>
          {project.tags.map((tag) => (
            <span key={tag} className="tech-tag">{tag}</span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: '"Fira Code", monospace', fontSize: '0.78rem', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.color = project.accent}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <Github size={15} />
            GitHub
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: '"Fira Code", monospace', fontSize: '0.78rem', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.color = project.accent}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <ExternalLink size={15} />
            Live Demo
          </a>
        </div>
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
    <section
      id="projects"
      ref={sectionRef}
      style={{ padding: '110px 0', background: 'var(--bg-primary)', position: 'relative' }}
    >
      {/* Top wave */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: '60px', display: 'block' }}>
          <path d="M0,30 C480,70 960,0 1440,30 L1440,0 L0,0 Z" fill="var(--bg-secondary)" />
        </svg>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
        <div className="projects-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="section-number" style={{ marginBottom: '0.5rem' }}>03. &nbsp;projects</p>
          <h2 style={{ fontFamily: '"Oswald", sans-serif', fontWeight: 600, fontSize: 'clamp(2rem, 5vw, 2.8rem)', color: 'var(--text-primary)', marginBottom: '1rem' }}>
            Things I've <span className="gradient-text">Built</span>
          </h2>
          <p style={{ fontFamily: '"Inter", sans-serif', color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
            A selection of projects I'm proud of. Each one taught me something new.
          </p>
        </div>

        <div
          className="projects-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.8rem' }}
        >
          {projects.map((p) => (
            <ProjectCard key={p.number} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
