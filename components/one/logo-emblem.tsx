"use client";

import { cn } from "@/lib/utils";
import { LOGO_NODES, LOGO_VBW, LOGO_VBH } from "./logo-nodes-data";

/* ===========================================================================
   LogoEmblem — el mark de AWCA DIBUJADO con nodos: los puntos siguen el
   contorno real del logo (muestreado de public/logo-app.png) y se conectan
   solo con sus vecinos inmediatos → trazo limpio, se lee el logo. Movimiento
   premium: una onda de luz barre de izquierda a derecha (los nodos se
   encienden en orden de X) + halo que respira. SVG puro, ligero, respeta
   reduced-motion. No es imagen generada por IA: sale del logo real.
   =========================================================================== */

// Solo vecinos inmediatos del contorno → sin telaraña.
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
      <div className="emblem-breathe absolute left-1/2 top-1/2 h-[150%] w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/45 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-[85%] w-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-400/35 blur-2xl" />

      <svg
        viewBox={`0 0 ${LOGO_VBW} ${LOGO_VBH}`}
        className="relative h-auto w-full overflow-visible"
      >
        <defs>
          <filter id="emblemGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="emblemNode" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f4f6ff" />
            <stop offset="55%" stopColor="#aeb9ff" />
            <stop offset="100%" stopColor="#5a6bff" />
          </radialGradient>
        </defs>

        {/* trazo del contorno (con glow) */}
        <g
          stroke="rgba(140,158,255,0.55)"
          strokeWidth="0.9"
          strokeLinecap="round"
          filter="url(#emblemGlow)"
        >
          {LINES.map((l, i) => (
            <line key={i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} />
          ))}
        </g>

        {/* nodos del contorno — la luz barre de izquierda a derecha
            (animation-delay proporcional a X → onda continua) */}
        <g filter="url(#emblemGlow)">
          {LOGO_NODES.map((n, i) => (
            <circle
              key={i}
              cx={n[0]}
              cy={n[1]}
              r={1.9}
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
