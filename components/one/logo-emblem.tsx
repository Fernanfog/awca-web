"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

/* ===========================================================================
   LogoEmblem — el logo REAL de AWCA (crisp, desde archivo, nunca generado por
   IA) rodeado de una constelación de nodos que orbita despacio, con halo de
   brillo azul de marca. Mismo lenguaje que la esfera del hero, pero ligero
   (SVG + CSS, sin WebGL). Se superpone sobre fotos oscuras como sello premium.
   =========================================================================== */

const CENTER = 120;

/** Nodos repartidos en dos anillos alrededor del centro (que queda libre para
    el logo). Determinista → mismo dibujo siempre. */
function buildNodes(): [number, number][] {
  const nodes: [number, number][] = [];
  const rings = [
    { r: 54, n: 6, off: 0.35 },
    { r: 101, n: 10, off: 0 },
  ];
  for (const { r, n, off } of rings) {
    for (let i = 0; i < n; i++) {
      const a = off + (i / n) * Math.PI * 2;
      nodes.push([CENTER + Math.cos(a) * r, CENTER + Math.sin(a) * r]);
    }
  }
  return nodes;
}

const NODES = buildNodes();
const LINK = 80;
const LINES: [number, number, number, number][] = [];
for (let i = 0; i < NODES.length; i++) {
  for (let j = i + 1; j < NODES.length; j++) {
    const dx = NODES[i][0] - NODES[j][0];
    const dy = NODES[i][1] - NODES[j][1];
    if (Math.hypot(dx, dy) < LINK) {
      LINES.push([NODES[i][0], NODES[i][1], NODES[j][0], NODES[j][1]]);
    }
  }
}

export function LogoEmblem({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none relative grid place-items-center",
        className
      )}
      aria-hidden
    >
      {/* halo de brillo de marca */}
      <div className="absolute h-[72%] w-[72%] rounded-full bg-brand-500/40 blur-2xl" />
      <div className="absolute h-[45%] w-[45%] rounded-full bg-brand-400/40 blur-xl" />

      {/* constelación de nodos — orbita muy despacio (respeta reduced-motion) */}
      <svg
        viewBox="0 0 240 240"
        className="emblem-orbit absolute inset-0 h-full w-full"
      >
        <g stroke="rgba(140,158,255,0.30)" strokeWidth="0.7">
          {LINES.map((l, i) => (
            <line key={i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} />
          ))}
        </g>
        <g>
          {NODES.map((n, i) => (
            <circle
              key={i}
              cx={n[0]}
              cy={n[1]}
              r={i % 3 === 0 ? 2.6 : 1.6}
              fill="#aab6ff"
              opacity={0.92}
            />
          ))}
        </g>
      </svg>

      {/* logo REAL crisp, quieto en el centro, con brillo */}
      <Image
        src="/logo-mark.png"
        alt="AWCA"
        width={228}
        height={92}
        className="relative w-[44%] drop-shadow-[0_0_16px_rgba(90,107,255,0.95)]"
      />
    </div>
  );
}
