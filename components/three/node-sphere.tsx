"use client";

import { useMemo, useRef, useLayoutEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 130;
const RADIUS = 2;
const LINK = 0.95;

function Sphere() {
  const group = useRef<THREE.Group>(null);
  const inst = useRef<THREE.InstancedMesh>(null);

  const pts = useMemo(() => {
    const arr: THREE.Vector3[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      arr.push(
        new THREE.Vector3(Math.cos(t) * r * RADIUS, y * RADIUS, Math.sin(t) * r * RADIUS)
      );
    }
    return arr;
  }, []);

  const linePos = useMemo(() => {
    const a: number[] = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < LINK) {
          a.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
        }
      }
    }
    return new Float32Array(a);
  }, [pts]);

  useLayoutEffect(() => {
    if (!inst.current) return;
    const d = new THREE.Object3D();
    pts.forEach((p, i) => {
      d.position.copy(p);
      d.scale.setScalar(1);
      d.updateMatrix();
      inst.current!.setMatrixAt(i, d.matrix);
    });
    inst.current.instanceMatrix.needsUpdate = true;
  }, [pts]);

  useFrame((s, dt) => {
    if (!group.current) return;
    group.current.rotation.y += dt * 0.35;
    group.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.25) * 0.18;
    const intro = Math.min(1, s.clock.elapsedTime * 1.4);
    group.current.scale.setScalar(0.6 + intro * 0.4);
  });

  return (
    <group ref={group} scale={0.6}>
      <instancedMesh ref={inst} args={[undefined, undefined, COUNT]}>
        <sphereGeometry args={[0.036, 8, 8]} />
        <meshBasicMaterial color="#7d8cff" toneMapped={false} />
      </instancedMesh>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePos, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#2b3bff" transparent opacity={0.3} />
      </lineSegments>
    </group>
  );
}

export default function NodeSphereScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
    >
      <Sphere />
    </Canvas>
  );
}
