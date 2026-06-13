import { useEffect, useRef } from 'react';
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
    github: null,
    live: 'https://home-service-web-five.vercel.app/',
    accent: '#6C63FF',
    gradient: 'linear-gradient(135deg, rgba(108,99,255,0.10) 0%, rgba(108,99,255,0.02) 100%)',
  },
  {
    number: '02',
    title: 'LabadaGo',
    description:
      'A laundry pickup and delivery booking platform for the Philippines. Features shop browsing with live filters, multi-role dashboards for merchants and riders, real-time order status tracking, and an admin panel with analytics.',
    tags: ['React Vite', 'Firebase', 'Tailwind CSS', 'React Router', 'Vercel'],
    github: null,
    live: 'https://labada-go.vercel.app/',
    accent: '#00b4a6',
    gradient: 'linear-gradient(135deg, rgba(0,180,166,0.10) 0%, rgba(0,180,166,0.02) 100%)',
  },
  {
    number: '03',
    title: 'Karlo Map',
    description:
      'An interactive Philippine history explorer spanning 900 AD to 2026. Features a year-based timeline with animated map markers, era mode for pre-colonial periods with live trade route visualizations, and atmospheric particle effects tied to historical events like wars, typhoons, and volcanic eruptions.',
    tags: ['React Vite', 'Firebase', 'Tailwind CSS', 'MapLibre GL', 'React Router', 'Vercel'],
    github: null,
    live: 'https://karlo-map-sqf6.vercel.app/',
    accent: '#f5a623',
    gradient: 'linear-gradient(135deg, rgba(245,166,35,0.10) 0%, rgba(245,166,35,0.02) 100%)',
  },
  {
    number: '04',
    title: 'Alterline',
    description:
      'A personal worldbuilding and creative writing platform for fiction writers. Features a rich text editor, Wikipedia-style encyclopedia (Carlopedia), force-directed relationship graph, AI writing assistant, and real-time @mention linking between entries.',
    tags: ['React Vite', 'Supabase', 'Tailwind CSS', 'Tiptap', 'Vercel'],
    github: null,
    live: 'https://alterline.vercel.app/',
    accent: '#e05580',
    gradient: 'linear-gradient(135deg, rgba(224,85,128,0.10) 0%, rgba(224,85,128,0.02) 100%)',
  },
  {
    number: '05',
    title: 'Taya!',
    description:
      'A Filipino higher-or-lower guessing game. Features a daily challenge mode, endless mode with streaks, crowd stats via Firebase, bilingual Tagalog/English UI, and synthesized Web Audio sound effects — all styled as a perya carnival booth.',
    tags: ['React Vite', 'Firebase', 'Tailwind CSS', 'Web Audio API', 'Vercel'],
    github: null,
    live: 'https://taya-black.vercel.app/',
    accent: '#ff4757',
    gradient: 'linear-gradient(135deg, rgba(255,71,87,0.10) 0%, rgba(255,71,87,0.02) 100%)',
  },
];

function ProjectCard({ project }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el || window.matchMedia('(pointer: coarse)').matches) return;
    VanillaTilt.init(el, { max: 10, speed: 500, glare: true, 'max-glare': 0.12, perspective: 1200, scale: 1.02 });
    return () => { if (el.vanillaTilt) el.vanillaTilt.destroy(); };
  }, []);

  return (
    <div
      ref={cardRef}
      className="project-card"
      data-hover
      onClick={() => { if (project.live) window.open(project.live, '_blank', 'noopener,noreferrer'); }}
      onMouseEnter={(e) => { e.currentTarget.style.setProperty('border-color', `${project.accent}55`); }}
      onMouseLeave={(e) => { e.currentTarget.style.removeProperty('border-color'); }}
    >

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
      gsap.utils.toArray('.project-card').forEach((card) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 88%' },
          y: 60, opacity: 0, duration: 0.75, ease: 'power3.out',
        });
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
