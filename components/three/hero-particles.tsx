"use client";

import dynamic from "next/dynamic";

// Three.js solo se descarga en cliente, después del contenido principal.
const ParticleScene = dynamic(() => import("./particle-logo"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-48 w-48 animate-pulse rounded-full bg-brand-600/15 blur-3xl" />
    </div>
  ),
});

export function HeroParticles({ className }: { className?: string }) {
  return (
    <div className={className}>
      <ParticleScene />
    </div>
  );
}
