"use client";

import { cn } from "@/lib/utils";
import { LOGO_NODES, LOGO_VBW, LOGO_VBH } from "./logo-nodes-data";

/* ===========================================================================
   LogoEmblem — el mark de AWCA CONSTRUIDO con nodos: los puntos (muestreados
   del logo real) dibujan la forma, conectados en malla y con iluminación
   premium (glow + nodos que titilan + halo que respira). SVG puro, ligero,
   respeta reduced-motion. No es una imagen generada por IA: los nodos salen
   del logo real (public/logo-app.png).
   =========================================================================== */

const LINK = 26;
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

export function LogoEmblem({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none relative", className)}
      aria-label="AWCA"
      role="img"
    >
      {/* halo de brillo que respira */}
      <div className="emblem-breathe absolute left-1/2 top-1/2 h-[150%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/45 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-[80%] w-[45%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-400/40 blur-2xl" />

      <svg
        viewBox={`0 0 ${LOGO_VBW} ${LOGO_VBH}`}
        className="relative h-auto w-full overflow-visible"
      >
        <defs>
          <filter
            id="emblemGlow"
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
          >
            <feGaussianBlur stdDeviation="1.7" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="emblemNode" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f2f4ff" />
            <stop offset="55%" stopColor="#aab6ff" />
            <stop offset="100%" stopColor="#5a6bff" />
          </radialGradient>
        </defs>

        {/* malla de conexiones (con glow) */}
        <g
          stroke="rgba(130,150,255,0.5)"
          strokeWidth="0.8"
          strokeLinecap="round"
          filter="url(#emblemGlow)"
        >
          {LINES.map((l, i) => (
            <line key={i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} />
          ))}
        </g>

        {/* nodos que forman el logo — titilan con fases distintas */}
        <g filter="url(#emblemGlow)">
          {LOGO_NODES.map((n, i) => (
            <circle
              key={i}
              cx={n[0]}
              cy={n[1]}
              r={i % 4 === 0 ? 2.6 : 2}
              fill="url(#emblemNode)"
              className="emblem-node"
              style={{ animationDelay: `${(i % 9) * 0.3}s` }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
