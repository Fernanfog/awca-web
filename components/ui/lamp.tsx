"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/* ===========================================================================
   LampGlow — adaptación AWCA del efecto "Lamp" (Aceternity): una línea de luz
   que se enciende y ensancha al entrar en vista, con dos alas cónicas de luz
   cayendo hacia abajo y un bloom suave — como un tubo de neón de techo.

   Diferencias con el componente de referencia (a propósito):
   · ADITIVA: el original recorta el derrame de los conos con parches SÓLIDOS
     del color del fondo (bg-slate-950), lo que exige fondo liso y taparía
     nuestros videos/fotos de fondo. Aquí el recorte se hace con mask-image
     (fundido a transparente), así la luz se SUMA sobre cualquier fondo noche.
   · AZUL DE MARCA (#3a44ff / brand) en vez del cian genérico.
   · Respeta prefers-reduced-motion (muestra el estado final sin animar).

   Uso: dentro de una sección `relative` oscura, como capa de fondo:
     <LampGlow />                      ← lámpara completa
     <LampGlow className="opacity-60" width={34} />  ← versión sutil
   =========================================================================== */

const EASE = [0.22, 1, 0.36, 1] as const;

export function LampGlow({
  className,
  width = 30,
}: {
  className?: string;
  /** Ancho final de la línea de neón, en rem. */
  width?: number;
}) {
  const reduced = useReducedMotion();

  /** Props de animación de encendido (ancho + opacidad) o estado final fijo.
      Igual de teatral que el demo: arranca angosta y tenue, y se expande. */
  const ignite = (finalWidth: string, initialWidth: string) =>
    reduced
      ? { style: { width: finalWidth } }
      : {
          initial: { opacity: 0.3, width: initialWidth },
          whileInView: { opacity: 1, width: finalWidth },
          viewport: { once: true, margin: "-10%" },
          transition: { delay: 0.3, duration: 1.1, ease: EASE },
        };

  const w = `${width}rem`;
  const wHalf = `${width * 0.4}rem`;

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 z-0 h-[17rem] overflow-hidden",
        className
      )}
    >
      <div className="relative mx-auto h-full max-w-full">
        {/* Ala izquierda: cono de luz cayendo hacia abajo-izquierda.
            Todo cuelga del FILO SUPERIOR (top ~0): la línea es el tubo de
            neón pegado al techo y la luz cae desde ahí. */}
        <motion.div
          {...ignite(w, wHalf)}
          className="absolute right-1/2 top-[0.35rem] h-64"
          style={{
            backgroundImage:
              "conic-gradient(from 70deg at center top, rgba(90,107,255,0.7), transparent 36%)",
            maskImage:
              "linear-gradient(to top, transparent 4%, white 42%), linear-gradient(to right, transparent, white 22%)",
            WebkitMaskImage:
              "linear-gradient(to top, transparent 4%, white 42%), linear-gradient(to right, transparent, white 22%)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
            ...(reduced ? { width: w } : {}),
          }}
        />
        {/* Ala derecha: espejo */}
        <motion.div
          {...ignite(w, wHalf)}
          className="absolute left-1/2 top-[0.35rem] h-64"
          style={{
            backgroundImage:
              "conic-gradient(from 290deg at center top, transparent 64%, rgba(90,107,255,0.7))",
            maskImage:
              "linear-gradient(to top, transparent 4%, white 42%), linear-gradient(to left, transparent, white 22%)",
            WebkitMaskImage:
              "linear-gradient(to top, transparent 4%, white 42%), linear-gradient(to left, transparent, white 22%)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
            ...(reduced ? { width: w } : {}),
          }}
        />

        {/* Bloom ancho y suave: centrado en la línea, la mitad superior la
            recorta el overflow-hidden del contenedor (luz saliendo del techo) */}
        <div
          className="absolute left-1/2 top-[-4.2rem] h-44 -translate-x-1/2 rounded-full bg-brand-500 opacity-50 blur-3xl"
          style={{ width: `${width * 1.1}rem` }}
        />
        {/* Núcleo de luz más concentrado */}
        <motion.div
          {...ignite(`${width * 0.55}rem`, `${width * 0.25}rem`)}
          className="absolute left-1/2 top-[-3.2rem] h-32 -translate-x-1/2 rounded-full bg-brand-400 opacity-60 blur-2xl"
        />
        {/* La línea de neón — el tubo, pegado al filo superior */}
        <motion.div
          {...ignite(w, wHalf)}
          className="absolute left-1/2 top-[0.35rem] h-0.5 -translate-x-1/2 rounded-full bg-brand-300 shadow-[0_0_18px_2px_rgba(90,107,255,0.9),0_0_50px_10px_rgba(58,68,255,0.5)]"
        />
      </div>
    </div>
  );
}
