"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Muestrea los píxeles claros del logo y los convierte en posiciones de partículas. */
function useLogoPositions(src: string) {
  const [pos, setPos] = useState<Float32Array | null>(null);
  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      const S = 140;
      const c = document.createElement("canvas");
      c.width = S;
      c.height = S;
      const ctx = c.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, S, S);
      const { data } = ctx.getImageData(0, 0, S, S);
      const pts: number[] = [];
      for (let y = 0; y < S; y++) {
        for (let x = 0; x < S; x++) {
          const i = (y * S + x) * 4;
          const lum = (data[i] + data[i + 1] + data[i + 2]) / 3;
          if (data[i + 3] > 128 && lum > 135) {
            pts.push((x / S - 0.5) * 4.4, -(y / S - 0.5) * 4.4, 0);
          }
        }
      }
      setPos(new Float32Array(pts));
    };
  }, [src]);
  return pos;
}

function ParticleLogo() {
  const base = useLogoPositions("/logo-app.png");
  const live = useMemo(() => (base ? base.slice() : null), [base]);
  const ref = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const on = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", on);
    return () => window.removeEventListener("mousemove", on);
  }, []);

  useFrame((state) => {
    if (!ref.current || !base) return;
    const t = state.clock.elapsedTime;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < base.length; i += 3) {
      const x = base[i];
      const y = base[i + 1];
      arr[i + 2] =
        Math.sin(x * 1.3 + t) * 0.2 + Math.cos(y * 1.5 + t * 0.7) * 0.2;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      mouse.current.x * 0.5,
      0.05
    );
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      mouse.current.y * 0.3,
      0.05
    );
  });

  if (!live) return null;
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[live, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#0000ff"
        sizeAttenuation
        transparent
        opacity={0.9}
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ParticleLogo />
    </Canvas>
  );
}
