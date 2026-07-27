"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { cn } from "@/lib/utils";

/* ===========================================================================
   Piezas de motion premium (dirección de arte):
   - TitleReveal: el título entra palabra por palabra desde abajo, cortado por
     máscara — editorial, nada de fade genérico.
   - Counter: cifras que cuentan desde 0 al entrar (tabular-nums: sin saltos).
   - ParallaxVideo: el video de fondo viaja más lento que el marco → capas.
   Easing común del sitio: [0.22, 1, 0.36, 1].
   =========================================================================== */

const EASE = [0.22, 1, 0.36, 1] as const;

export type Segment = { t: string; em?: boolean };

export function TitleReveal({
  segments,
  emClass = "accent-serif text-brand-600",
  className,
}: {
  segments: Segment[];
  emClass?: string;
  className?: string;
}) {
  // divide en palabras conservando el estilo de su segmento
  const words: { w: string; em: boolean }[] = [];
  for (const s of segments) {
    for (const w of s.t.split(" ")) {
      if (w.trim() !== "") words.push({ w, em: !!s.em });
    }
  }
  return (
    <motion.span
      className={cn("inline", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15%" }}
      transition={{ staggerChildren: 0.03 }}
    >
      {words.map((x, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span
            className={cn("inline-block", x.em && emClass)}
            variants={{
              hidden: { y: "110%" },
              show: { y: 0, transition: { duration: 0.52, ease: EASE } },
            }}
          >
            {x.w}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </motion.span>
  );
}

export function Counter({
  to,
  suffix = "",
  thousands = false,
  className,
}: {
  to: number;
  suffix?: string;
  thousands?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => {
    const n = Math.round(v);
    const shown = thousands ? n.toLocaleString("es-EC") : String(n);
    return `${shown}${suffix}`;
  });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration: 1.05, ease: "circOut" });
    return () => controls.stop();
  }, [inView, mv, to]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      <motion.span>{rounded}</motion.span>
    </span>
  );
}

export function ParallaxVideo({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const container = ref.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.01, rootMargin: "160px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("absolute inset-0 overflow-hidden", className)}>
      <video
        ref={videoRef}
        className="h-full w-full scale-[1.06] object-cover"
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      />
    </div>
  );
}
