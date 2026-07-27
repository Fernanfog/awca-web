"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/* ===========================================================================
   Beams — haces de luz animados sobre fondo oscuro (técnica de canvas del
   componente de referencia, pero: sin el paquete `motion` extra, con los tonos
   afinados al AZUL DE MARCA (no el cian genérico), dimensionado al contenedor
   padre (no a toda la ventana), gateado por IntersectionObserver para no gastar
   GPU fuera de vista, y respetando reduced-motion.
   Se coloca dentro de una sección `relative` como capa de fondo (absolute).
   =========================================================================== */

interface Beam {
  x: number;
  y: number;
  width: number;
  length: number;
  angle: number;
  speed: number;
  opacity: number;
  hue: number;
  pulse: number;
  pulseSpeed: number;
}

function createBeam(w: number, h: number): Beam {
  return {
    x: Math.random() * w * 1.4 - w * 0.2,
    y: Math.random() * h * 1.5 - h * 0.25,
    width: 40 + Math.random() * 80,
    length: h * 2.5,
    angle: -35 + Math.random() * 10,
    speed: 0.35 + Math.random() * 0.8,
    opacity: 0.1 + Math.random() * 0.14,
    // 224–252 = azul eléctrico de marca → índigo (no cian)
    hue: 224 + Math.random() * 28,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.02 + Math.random() * 0.03,
  };
}

export function Beams({
  className,
  count = 18,
}: {
  className?: string;
  count?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let beams: Beam[] = [];
    let cssW = 0;
    let cssH = 0;
    let raf = 0;
    let running = false;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const r = parent.getBoundingClientRect();
      cssW = r.width;
      cssH = r.height;
      canvas.width = Math.max(1, Math.round(cssW * dpr));
      canvas.height = Math.max(1, Math.round(cssH * dpr));
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      beams = Array.from({ length: count }, () => createBeam(cssW, cssH));
    };

    const drawBeam = (b: Beam) => {
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate((b.angle * Math.PI) / 180);
      const op = b.opacity * (0.8 + Math.sin(b.pulse) * 0.2);
      const g = ctx.createLinearGradient(0, 0, 0, b.length);
      g.addColorStop(0, `hsla(${b.hue},85%,62%,0)`);
      g.addColorStop(0.1, `hsla(${b.hue},85%,62%,${op * 0.5})`);
      g.addColorStop(0.5, `hsla(${b.hue},85%,62%,${op})`);
      g.addColorStop(0.9, `hsla(${b.hue},85%,62%,${op * 0.5})`);
      g.addColorStop(1, `hsla(${b.hue},85%,62%,0)`);
      ctx.fillStyle = g;
      ctx.fillRect(-b.width / 2, 0, b.width, b.length);
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, cssW, cssH);
      for (const b of beams) {
        b.y -= b.speed;
        b.pulse += b.pulseSpeed;
        if (b.y + b.length < -100) {
          b.y = cssH + 100;
          b.x = Math.random() * cssW;
        }
        drawBeam(b);
      }
    };

    const tick = () => {
      render();
      raf = requestAnimationFrame(tick);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    if (reduced) {
      render();
      return () => ro.disconnect();
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(tick);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { rootMargin: "120px" }
    );
    io.observe(parent);

    return () => {
      ro.disconnect();
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [count]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        className
      )}
      style={{ filter: "blur(18px)" }}
    />
  );
}
