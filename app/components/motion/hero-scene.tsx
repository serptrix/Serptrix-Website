"use client";
/* eslint-disable react-hooks/immutability -- R3F animation frames intentionally mutate scene refs and the Three camera. */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { MotionValue } from "framer-motion";
import { Component, ReactNode, Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useMotionCapabilities } from "./use-motion-capabilities";

function WebGLFallback() {
  return (
    <div className="srx-webgl-fallback" aria-label="Serptrix connected growth ecosystem">
      <i />
      <i />
      <i />
      <b>S</b>
    </div>
  );
}

class CanvasBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {}
  render() {
    return this.state.failed ? <WebGLFallback /> : this.props.children;
  }
}

function BrandObject({ scrollProgress, particleCount }: { scrollProgress: MotionValue<number>; particleCount: number }) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const systems = useRef<THREE.Group>(null);
  const paths = useRef<THREE.Group>(null);
  const { pointer, camera } = useThree();
  const systemPositions = useMemo(
    () => [new THREE.Vector3(-2.65, 1.55, 0.25), new THREE.Vector3(2.7, 1.25, -0.35), new THREE.Vector3(0.35, -2.65, 0.45)],
    [],
  );
  const lineArrays = useMemo(
    () => systemPositions.map((point) => new Float32Array([0, 0, 0, point.x, point.y, point.z])),
    [systemPositions],
  );
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const seeded = (seed: number) => {
      const value = Math.sin(seed * 12.9898) * 43758.5453;
      return value - Math.floor(value);
    };
    for (let i = 0; i < particleCount; i++) {
      const radius = 2.2 + seeded(i * 3 + 1) * 2.8;
      const angle = seeded(i * 3 + 2) * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (seeded(i * 3 + 3) - 0.5) * 4.8;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return positions;
  }, [particleCount]);

  useFrame((state, delta) => {
    if (!group.current || !core.current) return;
    const scroll = scrollProgress.get();
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, 0.82 + Math.min(1, state.clock.elapsedTime) * 0.18, 0.05));
    group.current.rotation.y += delta * 0.11;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.y * 0.2 + scroll * 0.42, 0.04);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -pointer.x * 0.16, 0.04);
    core.current.rotation.x += delta * 0.18;
    core.current.rotation.y -= delta * 0.12;
    systems.current?.children.forEach((child, i) => {
      const base = systemPositions[i];
      const separation = 1 + scroll * 0.38;
      child.position.x = THREE.MathUtils.lerp(child.position.x, base.x * separation, 0.04);
      child.position.y = THREE.MathUtils.lerp(child.position.y, base.y * separation + Math.sin(state.clock.elapsedTime * 0.7 + i) * 0.08, 0.04);
      child.rotation.y += delta * (0.18 + i * 0.04);
    });
    paths.current?.children.forEach((child, i) => {
      child.rotation.z = Math.sin(state.clock.elapsedTime * 0.35 + i) * 0.025;
    });
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 7.2 - scroll * 1.55 + pointer.y * 0.18, 0.035);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.42, 0.04);
  });

  return (
    <group ref={group} scale={0.82}>
      <mesh ref={core}>
        <icosahedronGeometry args={[1.25, 2]} />
        <meshStandardMaterial color="#101b84" emissive="#09105F" emissiveIntensity={0.4} roughness={0.2} metalness={0.62} flatShading />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.65, 0.018, 12, 160]} />
        <meshBasicMaterial color="#FBBC03" />
      </mesh>
      <group ref={paths}>
        {lineArrays.map((array, i) => (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[array, 3]} />
            </bufferGeometry>
            <lineBasicMaterial color={i === 0 ? "#FBBC03" : "#8c94d5"} transparent opacity={0.55} />
          </line>
        ))}
      </group>
      <group ref={systems}>
        {systemPositions.map((position, i) => (
          <group position={position} key={i}>
            <mesh>
              {i === 0 ? <octahedronGeometry args={[0.45, 0]} /> : i === 1 ? <boxGeometry args={[0.7, 0.7, 0.7]} /> : <dodecahedronGeometry args={[0.45, 0]} />}
              <meshStandardMaterial
                color={i === 0 ? "#FBBC03" : "#ffffff"}
                emissive={i === 0 ? "#FBBC03" : "#09105F"}
                emissiveIntensity={0.15}
                roughness={0.35}
                metalness={0.45}
              />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.72, 0.012, 8, 80]} />
              <meshBasicMaterial color="#FBBC03" transparent opacity={0.65} />
            </mesh>
          </group>
        ))}
      </group>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#FBBC03" size={0.032} sizeAttenuation transparent opacity={0.68} />
      </points>
      <pointLight color="#FBBC03" position={[2.5, 2, 3]} intensity={35} distance={9} />
    </group>
  );
}

export default function HeroScene({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const capabilities = useMotionCapabilities();
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [contextLost, setContextLost] = useState(false);

  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "150px" });
    observer.observe(el);
    return () => observer.disconnect();
  }, [capabilities.ready, capabilities.webgl]);

  useEffect(() => {
    setContextLost(false);
  }, [capabilities.ready, capabilities.webgl]);

  if (!capabilities.ready) return <div className="srx-canvas-loading" aria-hidden="true" />;

  if (!capabilities.webgl || capabilities.canvasFailed || capabilities.reducedMotion || contextLost) {
    return <WebGLFallback />;
  }

  const compact = capabilities.mobile || capabilities.touch || capabilities.lowPower;
  const count = compact ? 48 : 160;
  const maxDpr = compact ? 1.15 : Math.min(capabilities.devicePixelRatio, 1.5);

  return (
    <div
      ref={wrapper}
      className="srx-webgl-wrap"
      role="img"
      aria-label="Interactive Serptrix ecosystem connecting Marketing, Development, and AI around a central digital core"
    >
      <CanvasBoundary>
        <Canvas
          frameloop={visible ? "always" : "never"}
          dpr={[1, maxDpr]}
          camera={{ position: [0, 0, compact ? 8.1 : 7.2], fov: compact ? 50 : 46 }}
          gl={{ antialias: false, alpha: true, powerPreference: compact ? "default" : "high-performance", stencil: false, depth: true }}
          fallback={<WebGLFallback />}
          onCreated={({ gl }) => {
            const canvas = gl.domElement;
            const onLost = (event: Event) => {
              event.preventDefault();
              setContextLost(true);
            };
            canvas.addEventListener("webglcontextlost", onLost, false);
          }}
        >
          <ambientLight intensity={1.4} />
          <directionalLight position={[-3, 4, 5]} intensity={3.2} color="#ffffff" />
          <Suspense fallback={null}>
            <Float speed={0.45} rotationIntensity={0.06} floatIntensity={0.14}>
              <BrandObject scrollProgress={scrollProgress} particleCount={count} />
            </Float>
          </Suspense>
        </Canvas>
      </CanvasBoundary>
    </div>
  );
}
