"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

/* ===========================================================================
   TiltReveal — "pantalla" que empieza inclinada hacia atrás y se endereza al
   entrar en pantalla (técnica del componente de Aceternity, pero rediseñada:
   marco con nuestros tokens y sin bezel gris genérico).

   El progreso se actualiza solo cuando hay scroll o resize y el componente
   está cerca del viewport. Así conserva la profundidad sin mantener un rAF
   permanente mientras la página está quieta. Respeta reduced-motion.
   =========================================================================== */
export function TiltReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const p = useMotionValue(0);
  const rotateX = useTransform(p, [0, 1], [18, 0]);
  const scale = useTransform(p, [0, 1], [0.92, 1]);
  const y = useTransform(p, [0, 1], [36, 0]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      p.set(1);
      return;
    }

    let raf = 0;
    let active = false;

    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 cuando el borde superior está al pie de la pantalla (recién asoma),
      // 1 cuando ya subió ~15% del viewport (queda plano).
      const prog = (vh - r.top) / (vh * 0.85);
      p.set(Math.max(0, Math.min(1, prog)));
    };

    const schedule = () => {
      if (!active || raf) return;
      raf = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        if (active) {
          schedule();
          window.addEventListener("scroll", schedule, { passive: true });
          window.addEventListener("resize", schedule);
        } else {
          cancelAnimationFrame(raf);
          raf = 0;
          window.removeEventListener("scroll", schedule);
          window.removeEventListener("resize", schedule);
        }
      },
      { rootMargin: "240px 0px" }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [p]);

  return (
    <div ref={ref} className={className} style={{ perspective: "1200px" }}>
      <motion.div
        style={{ rotateX, scale, y, transformOrigin: "center center" }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
