"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MotionValue } from "framer-motion";
import { Component, ErrorInfo, ReactNode, Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { useMotionCapabilities } from "./use-motion-capabilities";

function WebGLFallback() { return <div className="srx-webgl-fallback" aria-label="Serptrix connected growth ecosystem"><i /><i /><i /><b>S</b></div>; }
class CanvasBoundary extends Component<{ children: ReactNode }, { failed: boolean }> { state = { failed: false }; static getDerivedStateFromError() { return { failed: true }; } componentDidCatch(_error: Error, _info: ErrorInfo) {} render() { return this.state.failed ? <WebGLFallback /> : this.props.children; } }

function BrandObject({ scrollProgress, particleCount }: { scrollProgress: MotionValue<number>; particleCount: number }) {
  const group = useRef<THREE.Group>(null); const core = useRef<THREE.Mesh>(null); const { pointer, camera } = useThree();
  const particles = useMemo(() => { const positions = new Float32Array(particleCount * 3); for (let i = 0; i < particleCount; i++) { const radius = 2.2 + Math.random() * 2.8; const angle = Math.random() * Math.PI * 2; positions[i * 3] = Math.cos(angle) * radius; positions[i * 3 + 1] = (Math.random() - .5) * 4.8; positions[i * 3 + 2] = Math.sin(angle) * radius; } return positions; }, [particleCount]);
  useFrame((_state, delta) => { if (!group.current || !core.current) return; const scroll = scrollProgress.get(); group.current.rotation.y += delta * .13; group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.y * .24 + scroll * .5, .045); group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -pointer.x * .18, .045); core.current.rotation.x += delta * .18; core.current.rotation.y -= delta * .12; camera.position.z = THREE.MathUtils.lerp(camera.position.z, 7.2 - scroll * 1.4, .035); camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * .35, .04); });
  return <group ref={group}><mesh ref={core}><icosahedronGeometry args={[1.35, 2]} /><meshStandardMaterial color="#09105F" roughness={.22} metalness={.58} flatShading /></mesh><mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[2.05, .025, 12, 160]} /><meshBasicMaterial color="#FBBC03" /></mesh><mesh rotation={[.4, .2, .85]}><torusGeometry args={[2.65, .012, 10, 160]} /><meshBasicMaterial color="#ffffff" transparent opacity={.6} /></mesh><points><bufferGeometry><bufferAttribute attach="attributes-position" args={[particles, 3]} /></bufferGeometry><pointsMaterial color="#FBBC03" size={.035} sizeAttenuation transparent opacity={.68} /></points><pointLight color="#FBBC03" position={[2.5, 2, 3]} intensity={35} distance={9} /></group>;
}

export default function HeroScene({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const capabilities = useMotionCapabilities();
  if (!capabilities.ready) return <div className="srx-canvas-loading" aria-hidden="true" />;
  if (!capabilities.webgl || capabilities.canvasFailed || capabilities.reducedMotion || capabilities.lowPower) return <WebGLFallback />;
  const count = capabilities.mobile || capabilities.touch ? 90 : 260;
  return <CanvasBoundary><Canvas dpr={[1, capabilities.devicePixelRatio]} camera={{ position: [0, 0, 7.2], fov: 46 }} gl={{ antialias: !capabilities.mobile, alpha: true, powerPreference: "high-performance" }} fallback={<WebGLFallback />}><ambientLight intensity={1.4} /><directionalLight position={[-3, 4, 5]} intensity={3.2} color="#ffffff" /><Suspense fallback={null}><BrandObject scrollProgress={scrollProgress} particleCount={count} /></Suspense></Canvas></CanvasBoundary>;
}
