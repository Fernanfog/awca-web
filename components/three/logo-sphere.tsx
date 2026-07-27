"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ===========================================================================
   Esfera de nodos AWCA — limpia y premium. Puntos distribuidos parejo en una
   esfera (fibonacci) + líneas de neón entre vecinos = wireframe luminoso que
   gira suave. El logo real va CRISP en el centro (overlay HTML), como el
   núcleo dentro de su órbita. Sin amontonamientos: malla uniforme.
   =========================================================================== */

const COUNT = 160;
const RADIUS = 2;
const LINK = 0.62;

function Sphere() {
  const group = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const { positions, colors, lines } = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      pts.push(
        new THREE.Vector3(Math.cos(t) * r * RADIUS, y * RADIUS, Math.sin(t) * r * RADIUS)
      );
    }
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const light = new THREE.Color("#aab4ff");
    const brand = new THREE.Color("#2b3bff");
    pts.forEach((p, i) => {
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
      const m = (p.y / RADIUS + 1) / 2; // arriba más claro
      const c = brand.clone().lerp(light, m);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    });
    const seg: number[] = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < LINK) {
          seg.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
        }
      }
    }
    return { positions, colors, lines: new Float32Array(seg) };
  }, []);

  useEffect(() => {
    const on = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", on);
    return () => window.removeEventListener("mousemove", on);
  }, []);

  useFrame((state, dt) => {
    if (!group.current) return;
    group.current.rotation.y += dt * 0.12;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      Math.sin(state.clock.elapsedTime * 0.2) * 0.12 + mouse.current.y * 0.16,
      0.05
    );
  });

  return (
    <group ref={group}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#2b3bff" transparent opacity={0.15} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.07}
          vertexColors
          sizeAttenuation
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function LogoSphere() {
  const container = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  // Cambiar esta key fuerza a React a destruir y recrear el <Canvas> por
  // completo (contexto WebGL nuevo). Ver comentario más abajo: el navegador
  // puede liberar el contexto GL mientras el canvas está en pausa fuera de
  // pantalla, y R3F no lo reanuda solo — hay que remontarlo, no reactivarlo.
  const [canvasKey, setCanvasKey] = useState(0);
  const hasLoadedOnce = useRef(false);
  const wasActive = useRef(false);

  useEffect(() => {
    const el = container.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isNowActive = entry.isIntersecting;
        if (isNowActive) {
          if (hasLoadedOnce.current && !wasActive.current) {
            // Estuvo activo, salió de pantalla y vuelve a entrar: el
            // contexto WebGL puede haberse perdido mientras tanto (pasa al
            // bajar y subir la página). Remontamos el Canvas entero en vez
            // de solo reanudar el frameloop, para garantizar un contexto
            // limpio y evitar el cuadro roto/congelado.
            setCanvasKey((k) => k + 1);
          }
          hasLoadedOnce.current = true;
        }
        wasActive.current = isNowActive;
        setActive(isNowActive);
      },
      { threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={container} className="h-full w-full">
      <Canvas
        key={canvasKey}
        camera={{ position: [0, 0, 5.6], fov: 42 }}
        dpr={[1, 1.35]}
        frameloop={active ? "always" : "never"}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
      >
        <Sphere />
      </Canvas>
    </div>
  );
}
