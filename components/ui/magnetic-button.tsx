"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/* ===========================================================================
   MagneticButton — botón "imán" premium POR PROXIMIDAD: el botón siente el
   cursor desde `radius` px de distancia y se inclina hacia él con física de
   resorte, antes de que lo toques; al alejarte regresa suave a su sitio.

   (La versión de referencia solo se movía con el cursor ya encima del botón
   — en un botón chico el efecto era imperceptible. Esta es la variante real
   de los sitios de estudio: atracción con caída suave según la distancia.)

   Notas:
   · pointermove global pero con el trabajo gateado por rAF (una medición por
     frame como mucho) — coherente con la línea de optimización del sitio.
   · Respeta prefers-reduced-motion.
   · El POSICIONAMIENTO va en el className del wrapper. Esto es clave: un
     ancestro con transform rompe `position: fixed` de sus hijos (pasa a
     resolverse contra el ancestro), así que si el botón es flotante el
     `fixed` debe ir aquí, en el wrapper que ya se mueve, no en el hijo.
   =========================================================================== */

const SPRING_CONFIG = { damping: 40, stiffness: 320, mass: 0.8 };

export function MagneticButton({
  children,
  distance = 0.5,
  radius = 150,
  className,
}: {
  children: React.ReactNode;
  /** Fuerza del imán (0–1): cuánto de la distancia al cursor recorre. */
  distance?: number;
  /** Radio de influencia en px alrededor del centro del botón. */
  radius?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING_CONFIG);
  const springY = useSpring(y, SPRING_CONFIG);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let lastX = 0;
    let lastY = 0;

    const measure = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = lastX - (r.left + r.width / 2);
      const dy = lastY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy);
      if (d < radius) {
        // caída suave: máxima atracción cerca, nula en el borde del radio
        const pull = (1 - d / radius) * distance;
        x.set(dx * pull);
        y.set(dy * pull);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const onMove = (e: PointerEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (!raf) raf = requestAnimationFrame(measure);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [distance, radius, x, y]);

  return (
    <motion.div ref={ref} className={className} style={{ x: springX, y: springY }}>
      {children}
    </motion.div>
  );
}
