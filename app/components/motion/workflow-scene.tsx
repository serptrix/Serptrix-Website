"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useMotionCapabilities } from "./use-motion-capabilities";

function Field({ active, count }: { active: number; count: number }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  const positions = useMemo(() => {
    const data = new Float32Array(count * 3);
    const seeded = (seed: number) => {
      const value = Math.sin(seed * 19.173) * 9173.137;
      return value - Math.floor(value);
    };
    for (let i = 0; i < count; i++) {
      data[i * 3] = (seeded(i * 3 + 1) - 0.5) * 13;
      data[i * 3 + 1] = (seeded(i * 3 + 2) - 0.5) * 8;
      data[i * 3 + 2] = (seeded(i * 3 + 3) - 0.5) * 6;
    }
    return data;
  }, [count]);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.08, 0.03);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * 0.05, 0.03);
    group.current.position.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.18;
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.025} color="#FBBC03" transparent opacity={0.45} />
      </points>
      {[0, 1, 2, 3, 4].map((n) => (
        <mesh key={n} position={[-4 + n * 2, Math.sin(n + active) * 0.5, -1 - n * 0.1]}>
          <sphereGeometry args={[n === active ? 0.22 : 0.1, 12, 12]} />
          <meshBasicMaterial color={n <= active ? "#FBBC03" : "#4450a5"} transparent opacity={n <= active ? 0.85 : 0.3} />
        </mesh>
      ))}
    </group>
  );
}

export default function WorkflowScene({ active }: { active: number }) {
  const caps = useMotionCapabilities();
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: "100px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [caps.ready, caps.webgl]);

  if (!caps.ready || !caps.webgl || caps.canvasFailed || caps.reducedMotion || caps.lowPower || caps.mobile || caps.touch) {
    return (
      <div className="srx-ai3d-fallback" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
    );
  }

  return (
    <div ref={wrapper} className="s6-webgl" aria-hidden="true">
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, Math.min(caps.devicePixelRatio, 1.5)]}
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
      >
        <Field active={active} count={110} />
      </Canvas>
    </div>
  );
}
