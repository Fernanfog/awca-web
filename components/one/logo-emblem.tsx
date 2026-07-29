"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

/* ===========================================================================
   LogoEmblem — el logo real de AWCA (blanco, crisp) con un glow azul suave,
   sobre la foto del equipo. Limpio y premium. Logo real desde archivo, no IA.
   =========================================================================== */

export function LogoEmblem({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none relative", className)}
      aria-label="AWCA"
      role="img"
    >
      {/* glow azul suave detrás del logo */}
      <div className="absolute left-1/2 top-1/2 h-[135%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/25 blur-3xl" />

      <Image
        src="/logo-mark-white.png"
        alt="AWCA"
        width={433}
        height={174}
        sizes="340px"
        className="relative h-auto w-full opacity-95 drop-shadow-[0_0_16px_rgba(90,107,255,0.5)]"
      />
    </div>
  );
}
