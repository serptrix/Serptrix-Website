"use client";

import { useEffect, useRef } from "react";
import { useMotionCapabilities } from "./use-motion-capabilities";

type Particle = { x:number;y:number;vx:number;vy:number;r:number };

export default function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null); const caps = useMotionCapabilities();
  useEffect(() => { const canvas=ref.current; if(!canvas||!caps.ready||caps.reducedMotion)return; const ctx=canvas.getContext("2d"); if(!ctx)return; let frame=0; let width=0; let height=0; let mx=.5; let my=.5; const count=caps.mobile||caps.lowPower?28:76; const particles:Particle[]=Array.from({length:count},()=>({x:Math.random(),y:Math.random(),vx:(Math.random()-.5)*.00018,vy:(Math.random()-.5)*.00018,r:.7+Math.random()*1.4}));
    const resize=()=>{const box=canvas.getBoundingClientRect(); const dpr=Math.min(caps.devicePixelRatio,1.5); width=box.width;height=box.height;canvas.width=Math.max(1,Math.floor(width*dpr));canvas.height=Math.max(1,Math.floor(height*dpr));ctx.setTransform(dpr,0,0,dpr,0,0);}; const observer=new ResizeObserver(resize);observer.observe(canvas);resize();
    const move=(e:PointerEvent)=>{const box=canvas.getBoundingClientRect();mx=(e.clientX-box.left)/box.width;my=(e.clientY-box.top)/box.height;};canvas.addEventListener("pointermove",move,{passive:true});
    const draw=()=>{ctx.clearRect(0,0,width,height);particles.forEach((p,i)=>{p.x+=p.vx+(mx-.5)*.000025;p.y+=p.vy+(my-.5)*.000018;if(p.x<0)p.x=1;if(p.x>1)p.x=0;if(p.y<0)p.y=1;if(p.y>1)p.y=0;ctx.beginPath();ctx.fillStyle="rgba(251,188,3,.72)";ctx.arc(p.x*width,p.y*height,p.r,0,Math.PI*2);ctx.fill();if(!caps.mobile){for(let j=i+1;j<Math.min(particles.length,i+8);j++){const q=particles[j];const dx=(p.x-q.x)*width;const dy=(p.y-q.y)*height;const dist=Math.hypot(dx,dy);if(dist<150){ctx.beginPath();ctx.strokeStyle=`rgba(251,188,3,${(1-dist/150)*.12})`;ctx.moveTo(p.x*width,p.y*height);ctx.lineTo(q.x*width,q.y*height);ctx.stroke();}}}});frame=requestAnimationFrame(draw);};frame=requestAnimationFrame(draw);return()=>{cancelAnimationFrame(frame);observer.disconnect();canvas.removeEventListener("pointermove",move);};
  },[caps.devicePixelRatio,caps.lowPower,caps.mobile,caps.ready,caps.reducedMotion]);
  if(caps.reducedMotion)return null; return <canvas ref={ref} className="s12-particles" aria-hidden="true"/>;
}
