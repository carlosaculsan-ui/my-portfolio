import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const spotRef = useRef(null);
  const mouse   = useRef({ x: -100, y: -100 });
  const ring    = useRef({ x: -100, y: -100 });
  const rafId   = useRef(null);

  useEffect(() => {
    const dot     = dotRef.current;
    const ringEl  = ringRef.current;
    const spotEl  = spotRef.current;

    const lerp = (a, b, t) => a + (b - a) * t;

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      dot.style.left = `${e.clientX}px`;
      dot.style.top  = `${e.clientY}px`;

      // Adjust spotlight intensity for dark vs light mode
      const dark = document.documentElement.classList.contains('dark');
      const [c1, c2] = dark
        ? ['rgba(108,99,255,0.10)', 'rgba(108,99,255,0.03)']   // subtle on dark
        : ['rgba(108,99,255,0.18)', 'rgba(108,99,255,0.06)'];  // stronger on light

      spotEl.style.background =
        `radial-gradient(700px circle at ${e.clientX}px ${e.clientY}px, ${c1} 0%, ${c2} 35%, transparent 65%)`;
    };

    const loop = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.11);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.11);
      ringEl.style.left = `${ring.current.x}px`;
      ringEl.style.top  = `${ring.current.y}px`;
      rafId.current = requestAnimationFrame(loop);
    };

    const onEnter = () => {
      dot.classList.add('hovering');
      ringEl.classList.add('hovering');
    };
    const onLeave = () => {
      dot.classList.remove('hovering');
      ringEl.classList.remove('hovering');
    };

    // Attach hover listeners to all interactive elements
    const attach = () => {
      document.querySelectorAll('a, button, [data-hover]').forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    // Re-attach after DOM settles (components may mount later)
    attach();
    const timer = setTimeout(attach, 800);

    window.addEventListener('mousemove', onMove);
    rafId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId.current);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
      {/* Global spotlight — fixed so it covers the full viewport */}
      <div
        ref={spotRef}
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
    </>
  );
}
