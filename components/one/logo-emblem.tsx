"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { LOGO_NODES, LOGO_VBW, LOGO_VBH } from "./logo-nodes-data";

/* ===========================================================================
   LogoEmblem — el logo REAL de AWCA en blanco como base (se lee claro) y, por
   encima, los nodos del contorno con luz que barre de izquierda a derecha.
   Todo alineado (blanco y nodos salen del mismo mark). SVG + PNG, ligero,
   respeta reduced-motion. No es imagen generada por IA.
   =========================================================================== */

const LINK = 13;
const LINES: [number, number, number, number][] = [];
for (let i = 0; i < LOGO_NODES.length; i++) {
  for (let j = i + 1; j < LOGO_NODES.length; j++) {
    const dx = LOGO_NODES[i][0] - LOGO_NODES[j][0];
    const dy = LOGO_NODES[i][1] - LOGO_NODES[j][1];
    if (Math.hypot(dx, dy) < LINK) {
      LINES.push([
        LOGO_NODES[i][0],
        LOGO_NODES[i][1],
        LOGO_NODES[j][0],
        LOGO_NODES[j][1],
      ]);
    }
  }
}

const SWEEP = 3.2; // seg que tarda la onda de luz en cruzar el logo

export function LogoEmblem({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none relative", className)}
      aria-label="AWCA"
      role="img"
    >
      {/* halo de brillo que respira */}
      <div className="emblem-breathe absolute left-1/2 top-1/2 h-[160%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/40 blur-3xl" />

      {/* BASE (en flujo → define el tamaño del bloque): logo real en blanco */}
      <Image
        src="/logo-mark-white.png"
        alt="AWCA"
        width={433}
        height={174}
        sizes="340px"
        className="relative h-auto w-full opacity-95 drop-shadow-[0_0_14px_rgba(90,107,255,0.65)]"
      />

      {/* ENCIMA (absoluto, mismo aspecto): nodos del contorno + luz que barre */}
      <svg
        viewBox={`0 0 ${LOGO_VBW} ${LOGO_VBH}`}
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        <defs>
          <filter id="emblemGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="emblemNode" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#b6c0ff" />
            <stop offset="100%" stopColor="#5a6bff" />
          </radialGradient>
        </defs>

        {/* red de conexiones muy sutil (identidad "hecho de nodos") */}
        <g
          stroke="rgba(150,165,255,0.32)"
          strokeWidth="0.7"
          strokeLinecap="round"
        >
          {LINES.map((l, i) => (
            <line key={i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} />
          ))}
        </g>

        {/* nodos — la luz barre de izquierda a derecha (delay por X) */}
        <g filter="url(#emblemGlow)">
          {LOGO_NODES.map((n, i) => (
            <circle
              key={i}
              cx={n[0]}
              cy={n[1]}
              r={1.8}
              fill="url(#emblemNode)"
              className="emblem-node"
              style={{ animationDelay: `${-(n[0] / LOGO_VBW) * SWEEP}s` }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
