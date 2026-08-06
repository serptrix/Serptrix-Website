"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useMotionCapabilities } from "./use-motion-capabilities";

function Field({ active, count }: { active: number; count: number }) {
  const group = useRef<THREE.Group>(null); const { pointer } = useThree();
  const positions = useMemo(() => { const data = new Float32Array(count * 3); const seeded = (seed:number) => { const value = Math.sin(seed * 19.173) * 9173.137; return value - Math.floor(value); }; for (let i=0;i<count;i++){data[i*3]=(seeded(i*3+1)-.5)*13;data[i*3+1]=(seeded(i*3+2)-.5)*8;data[i*3+2]=(seeded(i*3+3)-.5)*6;} return data; }, [count]);
  useFrame((state) => { if (!group.current) return; group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * .08, .03); group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * .05, .03); group.current.position.z = Math.sin(state.clock.elapsedTime * .3) * .18; });
  return <group ref={group}><points><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions,3]}/></bufferGeometry><pointsMaterial size={.025} color="#FBBC03" transparent opacity={.45}/></points>{[0,1,2,3,4].map((n)=><mesh key={n} position={[-4+n*2,Math.sin(n+active)*.5,-1-n*.1]}><sphereGeometry args={[n === active ? .22 : .1,16,16]}/><meshBasicMaterial color={n<=active?"#FBBC03":"#4450a5"} transparent opacity={n <= active ? .85 : .3}/></mesh>)}</group>;
}

export default function WorkflowScene({ active }: { active: number }) {
  const caps = useMotionCapabilities(); const wrapper=useRef<HTMLDivElement>(null); const [visible,setVisible]=useState(false);
  useEffect(()=>{const el=wrapper.current;if(!el)return;const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{rootMargin:"120px"});observer.observe(el);return()=>observer.disconnect();},[caps.ready,caps.webgl]);
  if (!caps.ready || !caps.webgl || caps.canvasFailed || caps.reducedMotion || caps.lowPower) return <div className="srx-ai3d-fallback" aria-hidden="true"><i/><i/><i/></div>;
  return <div ref={wrapper} className="s6-webgl" aria-hidden="true"><Canvas frameloop={visible?"always":"never"} dpr={[1,caps.devicePixelRatio]} camera={{position:[0,0,8],fov:45}} gl={{alpha:true,antialias:!caps.mobile,powerPreference:"high-performance"}}><Field active={active} count={caps.mobile?70:190}/></Canvas></div>;
}
