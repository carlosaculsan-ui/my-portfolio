import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { label: 'GitHub',              href: 'https://github.com/',       icon: Github,   hover: '#6C63FF' },
  { label: 'LinkedIn',            href: 'https://linkedin.com/in/',  icon: Linkedin, hover: '#0077B5' },
  { label: 'yourname@email.com',  href: 'mailto:yourname@email.com', icon: Mail,     hover: '#00b4a6' },
];

export default function Contact() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-header', { scrollTrigger: { trigger: '.contact-header', start: 'top 85%' }, y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' });
      gsap.from('.contact-body',   { scrollTrigger: { trigger: '.contact-body',   start: 'top 82%' }, y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' });
      gsap.from('.contact-social', { scrollTrigger: { trigger: '.contact-socials', start: 'top 82%' }, x: -30, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out' });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ padding: '120px 0 100px', background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Top wave */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: '60px', display: 'block' }}>
          <path d="M0,20 C360,60 1080,-20 1440,20 L1440,0 L0,0 Z" fill="var(--bg-primary)" />
        </svg>
      </div>

      {/* Background orbs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', bottom: '-200px', left: '-150px', background: 'radial-gradient(circle, rgba(108,99,255,0.07) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', top: '-100px',   right: '-100px', background: 'radial-gradient(circle, rgba(108,99,255,0.04) 0%, transparent 70%)' }} />
      </div>

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 2rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div className="contact-header">
          <p className="section-number" style={{ marginBottom: '0.5rem' }}>04. &nbsp;contact</p>
          <h2 style={{ fontFamily: '"Oswald", sans-serif', fontWeight: 600, fontSize: 'clamp(2rem, 6vw, 3.5rem)', color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.1 }}>
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div style={{ width: '60px', height: '2px', margin: '0 auto 2rem', background: 'linear-gradient(90deg, #6C63FF, var(--teal))', borderRadius: '2px' }} />
        </div>

        {/* Body */}
        <div className="contact-body">
          <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto 2.5rem' }}>
            I'm currently open to new opportunities — whether it's a full-time role,
            freelance project, or just a chat about web development. My inbox is
            always open. Let's build something great together.
          </p>

          {/* Primary CTA — always purple, works on both backgrounds */}
          <a
            href="mailto:yourname@email.com"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              fontFamily: '"Fira Code", monospace', fontSize: '0.9rem',
              letterSpacing: '0.08em', padding: '15px 36px', borderRadius: '8px',
              border: 'none', background: 'linear-gradient(135deg, #6C63FF, #5651d4)',
              color: '#fff', textDecoration: 'none', fontWeight: 500,
              boxShadow: '0 0 30px rgba(108,99,255,0.35)',
              transition: 'box-shadow 0.25s, transform 0.2s',
              marginBottom: '3.5rem',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 55px rgba(108,99,255,0.6)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 30px rgba(108,99,255,0.35)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <Mail size={16} />
            Say Hello
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Divider */}
        <div style={{ width: '1px', height: '60px', background: 'rgba(108,99,255,0.2)', margin: '0 auto 2.5rem' }} />

        {/* Social links */}
        <div className="contact-socials" style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          {socials.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="contact-social"
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  fontFamily: '"Fira Code", monospace', fontSize: '0.82rem',
                  color: 'var(--text-muted)', textDecoration: 'none',
                  padding: '10px 20px', borderRadius: '8px',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-card)',
                  transition: 'color 0.25s, border-color 0.25s, box-shadow 0.25s, transform 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = s.hover;
                  e.currentTarget.style.borderColor = `${s.hover}44`;
                  e.currentTarget.style.boxShadow = `0 0 20px ${s.hover}22`;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-muted)';
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
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
