"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Environment, Float } from "@react-three/drei";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";

function DragonTrail() {
  const count = 15;
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  
  useFrame((state) => {
    const { mouse } = state;
    const time = state.clock.getElapsedTime();

    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const targetX = mouse.x * 5;
      const targetY = mouse.y * 3;
      const delay = i * 0.05;
      
      mesh.position.x = THREE.MathUtils.lerp(mesh.position.x, targetX, 0.1 - delay);
      mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, targetY, 0.1 - delay);
      mesh.position.z = Math.sin(time + i * 0.5) * 0.5;
      
      const s = 1 - (i / count);
      mesh.scale.set(s, s, s);
    });
  });

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <mesh 
          key={i} 
          ref={el => { meshRefs.current[i] = el; }}
          position={[0, 0, 0]}
        >
          <sphereGeometry args={[0.5, 32, 32]} />
          <MeshDistortMaterial
            color={i === 0 ? "#E31837" : "#111111"}
            speed={2}
            distort={0.3}
            metalness={0.9}
            roughness={0.1}
            opacity={1 - (i/count)}
            transparent
          />
        </mesh>
      ))}
    </>
  );
}

export default function BeyondReality() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".br-content", 
      { opacity: 0, scale: 0.9 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 1.5, 
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-[120vh] bg-[#080808] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#E31837" />
          <DragonTrail />
          <Environment preset="night" />
        </Canvas>
      </div>

      <div className="relative z-10 text-center br-content pointer-events-none">
        <h2 className="font-display font-black text-[clamp(4rem,15vw,12rem)] text-white leading-none tracking-tighter mix-blend-difference">
          FLUID<br />
          <span className="text-[#E31837]">MOTION</span>
        </h2>
        <p className="mt-8 text-white/40 text-xs font-bold tracking-[0.5em] uppercase">
          Move your mouse to interact with the void
        </p>
      </div>

      <div className="absolute top-20 left-20 z-10 hidden lg:block">
         <div className="flex flex-col gap-2">
            <div className="w-12 h-[1px] bg-[#E31837]" />
            <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Procedural Physics v1.0</span>
         </div>
      </div>
    </section>
  );
}
