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
];

function ProjectCard({ project }) {
  const cardRef = useRef(null);

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
        {/* Browser-chrome preview — replace with <img> once screenshots are ready */}
        <div style={{
          margin: '-2rem -2rem 1.5rem',
          height: '165px',
          background: `linear-gradient(160deg, ${project.accent}20 0%, ${project.accent}06 100%)`,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '26px', display: 'flex', alignItems: 'center', paddingLeft: '12px', gap: '6px',
            background: `${project.accent}12`, borderBottom: `1px solid ${project.accent}18`,
          }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: `${project.accent}45` }} />
            ))}
          </div>
          <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ height: '10px', borderRadius: '3px', background: `${project.accent}28`, width: '55%' }} />
            <div style={{ height: '7px', borderRadius: '3px', background: `${project.accent}18`, width: '80%' }} />
            <div style={{ height: '7px', borderRadius: '3px', background: `${project.accent}18`, width: '65%' }} />
            <div style={{ height: '7px', borderRadius: '3px', background: `${project.accent}18`, width: '42%' }} />
            <div style={{ height: '22px', borderRadius: '5px', background: `${project.accent}22`, width: '88px', marginTop: '6px' }} />
          </div>
        </div>

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
