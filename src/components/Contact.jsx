import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Download, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { label: 'GitHub',   href: 'https://github.com/carlosaculsan-ui',                  icon: Github,   hover: '#6C63FF' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/carlo-saculsan-63664240a/', icon: Linkedin, hover: '#6C63FF' },
];

const btnHover = (e) => {
  e.currentTarget.style.background  = 'rgba(108,99,255,0.08)';
  e.currentTarget.style.boxShadow   = '0 0 30px rgba(108,99,255,0.25)';
  e.currentTarget.style.transform   = 'translateY(-2px)';
};
const btnLeave = (e) => {
  e.currentTarget.style.background  = 'transparent';
  e.currentTarget.style.boxShadow   = 'none';
  e.currentTarget.style.transform   = '';
};

export default function Contact() {
  const sectionRef = useRef(null);
  const [form, setForm]     = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-header', { scrollTrigger: { trigger: '.contact-header', start: 'top 85%' }, y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' });
      gsap.from('.contact-info',   { scrollTrigger: { trigger: '.contact-grid',   start: 'top 82%' }, x: -40, opacity: 0, duration: 0.8, ease: 'power3.out' });
      gsap.from('.contact-form',   { scrollTrigger: { trigger: '.contact-grid',   start: 'top 82%' }, x:  40, opacity: 0, duration: 0.8, ease: 'power3.out' });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_key: import.meta.env.VITE_WEB3FORMS_KEY, ...form }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

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

      <div className="section-container relative z-[1]" style={{ maxWidth: '1000px' }}>

        {/* Header */}
        <div className="contact-header text-center" style={{ marginBottom: '3rem' }}>
          <h2 className="heading-contact">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="gradient-divider" style={{ margin: '0 auto' }} />
        </div>

        {/* Two-column layout */}
        <div className="contact-grid">

          {/* Left: copy + socials */}
          <div className="contact-info">
            <p className="contact-body-text">
              I'm currently open to new opportunities — whether it's an OJT internship,
              full-time role, freelance project, or just a chat about web development.
              Let's build something great together.
            </p>

            <a
              href="/Carlo_Saculsan_Resume.pdf"
              download
              className="btn-secondary contact-resume-btn"
              onMouseEnter={btnHover}
              onMouseLeave={btnLeave}
            >
              <Download size={16} />
              Download Resume
            </a>

            <div className="contact-socials-row" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary contact-social"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background  = `${s.hover}15`;
                      e.currentTarget.style.borderColor = `${s.hover}88`;
                      e.currentTarget.style.color       = s.hover;
                      e.currentTarget.style.boxShadow   = `0 0 30px ${s.hover}33`;
                      e.currentTarget.style.transform   = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background  = 'transparent';
                      e.currentTarget.style.borderColor = '';
                      e.currentTarget.style.color       = '';
                      e.currentTarget.style.boxShadow   = 'none';
                      e.currentTarget.style.transform   = '';
                    }}
                  >
                    <Icon size={15} />
                    {s.label}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right: form */}
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label className="form-label" htmlFor="cf-name">Name</label>
              <input
                id="cf-name"
                className="form-input"
                type="text"
                name="name"
                required
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="cf-email">Email</label>
              <input
                id="cf-email"
                className="form-input"
                type="email"
                name="email"
                required
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="cf-message">Message</label>
              <textarea
                id="cf-message"
                className="form-input form-textarea"
                name="message"
                required
                placeholder="What's on your mind?"
                value={form.message}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn-primary form-submit" disabled={status === 'sending'}>
              {status === 'sending'
                ? 'Sending...'
                : <><Send size={15} strokeWidth={2} /> Send Message</>
              }
            </button>

            {status === 'success' && (
              <p className="form-feedback form-success">Message sent! I'll get back to you soon.</p>
            )}
            {status === 'error' && (
              <p className="form-feedback form-error">Something went wrong. Try emailing me directly.</p>
            )}
          </form>

        </div>
      </div>
    </section>
  );
}
