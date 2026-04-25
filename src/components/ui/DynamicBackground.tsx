"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;

  // Simple pseudo-noise for fluid motion
  float noise(vec2 p) {
    return sin(p.x * 1.2 + uTime * 0.4) * sin(p.y * 1.0 + uTime * 0.5) +
           sin(p.x * 0.6 - uTime * 0.3) * sin(p.y * 0.9 + uTime * 0.45);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= uResolution.x / uResolution.y;

    // Slow, but clearly perceptible fluid shifting
    float t = uTime * 0.15; 
    
    float n = 0.0;
    n += 0.5 * noise(p * 1.0 + t);
    n += 0.25 * noise(p * 2.0 - t * 0.6);
    n += 0.125 * noise(p * 4.0 + t * 0.4);
    
    // Mouse influence: subtle "pull" on the fluid
    float distToMouse = length(p - (uMouse * 2.0 - 1.0) * vec2(uResolution.x / uResolution.y, 1.0));
    float mouseEffect = 1.0 / (distToMouse * 1.5 + 0.8);
    n += mouseEffect * 0.2;

    // Normalize and shape the intensity - Reduced power for brightness
    float intensity = clamp(n * 0.5 + 0.5, 0.0, 1.0);
    intensity = pow(intensity, 1.6); // Less aggressive shadows (was 2.5)

    // Deep Blood Red Palette - Brightened by ~10-15%
    vec3 baseBlack = vec3(0.06, 0.0, 0.005); // More visible dark red base
    vec3 deepRed = vec3(0.4, 0.02, 0.03);    // Brighter crimson (was 0.25)
    vec3 bloodGlow = vec3(0.65, 0.04, 0.06); // Stronger highlight (was 0.45)

    vec3 color = mix(baseBlack, deepRed, intensity);
    color = mix(color, bloodGlow, pow(intensity, 2.5) * 0.6);
    
    // Smoother vignette
    float vignette = 1.0 - length(p * 0.3);
    color *= clamp(vignette, 0.7, 1.0);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function FluidMesh() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { viewport, size } = useThree();
  const [mouse, setMouse] = useState(new THREE.Vector2(0.5, 0.5));
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
  }), [size]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse(new THREE.Vector2(e.clientX / window.innerWidth, 1.0 - (e.clientY / window.innerHeight)));
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.getElapsedTime();
    uniforms.uResolution.value.set(state.size.width, state.size.height);
    uniforms.uMouse.value.lerp(mouse, 0.05);
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function DynamicBackground() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      // 1024px is a safer threshold for "laptop" vs "mobile/tablet"
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Simple CSS Background Base - Always present to prevent white flashes
  const BaseBackground = () => (
    <div 
      className="fixed inset-0 z-[-20] pointer-events-none"
      style={{
        background: 'radial-gradient(circle at 15% 50%, #2a0102 0%, #050000 100%)',
        backgroundColor: '#050000'
      }}
    />
  );

  if (isMobile === null) return <BaseBackground />;

  // Mobile/Tablet: Lightweight Drifting Background
  if (isMobile) {
    return (
      <>
        <BaseBackground />
        <div className="fixed inset-0 z-[-10] animated-bg opacity-30" />
      </>
    );
  }

  // Laptop/Desktop: WebGL + CSS Base
  return (
    <>
      <BaseBackground />
      <div className="fixed inset-0 z-[-10] pointer-events-none overflow-hidden">
        <Canvas
          camera={{ position: [0, 0, 1] }}
          gl={{ 
            antialias: false, 
            depth: false, 
            stencil: false,
            powerPreference: "high-performance",
            alpha: true // Allow CSS background to show through
          }}
          dpr={1} 
        >
          <FluidMesh />
        </Canvas>
      </div>
    </>
  );
}
