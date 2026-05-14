import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail, ArrowRight, Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { label: 'GitHub',                  href: 'https://github.com/carlosaculsan-ui',                                                icon: Github,   hover: '#6C63FF' },
  { label: 'LinkedIn',                href: 'https://www.linkedin.com/in/carlo-saculsan-63664240a/',                              icon: Linkedin, hover: '#0077B5' },
  { label: 'carlosaculsan@gmail.com', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=carlosaculsan@gmail.com',              icon: Mail,     hover: '#00b4a6' },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const [primaryHover, setPrimaryHover] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-header',  { scrollTrigger: { trigger: '.contact-header',  start: 'top 85%' }, y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' });
      gsap.from('.contact-body',    { scrollTrigger: { trigger: '.contact-body',    start: 'top 82%' }, y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' });
      gsap.from('.contact-social',  { scrollTrigger: { trigger: '.contact-socials', start: 'top 82%' }, x: -30, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out' });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="section-secondary">
      {/* Top wave */}
      <div className="wave-top">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,20 C360,60 1080,-20 1440,20 L1440,0 L0,0 Z" fill="var(--bg-primary)" />
        </svg>
      </div>

      {/* Background orbs */}
      <div className="orbs-layer">
        <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', bottom: '-200px', left: '-150px', background: 'radial-gradient(circle, rgba(108,99,255,0.07) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', top: '-100px',   right: '-100px', background: 'radial-gradient(circle, rgba(108,99,255,0.04) 0%, transparent 70%)' }} />
      </div>

      <div className="section-container text-center relative z-[1]" style={{ maxWidth: '760px' }}>

        {/* Header */}
        <div className="contact-header">
          <p className="section-number" style={{ marginBottom: '0.5rem' }}>04. &nbsp;contact</p>
          <h2 className="heading-contact">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="gradient-divider" style={{ margin: '0 auto 2rem' }} />
        </div>

        {/* Body */}
        <div className="contact-body">
          <p className="contact-body-text">
            I'm currently open to new opportunities — whether it's a full-time role,
            freelance project, or just a chat about web development. My inbox is
            always open. Let's build something great together.
          </p>

          {/* CTAs row */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
            {/* Say Hello — onMouseEnter/Leave needed to sync with social card highlight */}
            <div
              onMouseEnter={() => setPrimaryHover(true)}
              onMouseLeave={() => setPrimaryHover(false)}
            >
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=carlosaculsan@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                  textDecoration: 'none', letterSpacing: '0.08em',
                  opacity: primaryHover ? 0.7 : 1,
                  transition: 'box-shadow 0.25s, transform 0.2s, opacity 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 55px rgba(108,99,255,0.6)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.transform = ''; }}
              >
                <Mail size={16} />
                Say Hello
                <ArrowRight size={16} />
              </a>
            </div>

            {/* Download CV */}
            <a
              href="/Carlo_Saculsan_Resume.pdf"
              download
              className="btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none', letterSpacing: '0.08em' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(108,99,255,0.08)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(108,99,255,0.25)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = ''; }}
            >
              <Download size={16} />
              Download CV
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="contact-divider" />

        {/* Social links */}
        <div className="contact-socials contact-socials-row flex justify-center gap-6 flex-wrap">
          {socials.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="contact-social"
                style={primaryHover ? {
                  color: s.hover,
                  borderColor: `${s.hover}44`,
                  boxShadow: `0 0 20px ${s.hover}22`,
                  transform: 'translateY(-2px)',
                } : {}}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = s.hover;
                  e.currentTarget.style.borderColor = `${s.hover}44`;
                  e.currentTarget.style.boxShadow = `0 0 20px ${s.hover}22`;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '';
                  e.currentTarget.style.borderColor = '';
                  e.currentTarget.style.boxShadow = '';
                  e.currentTarget.style.transform = '';
                }}
              >
                <Icon size={15} />
                {s.label}
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
