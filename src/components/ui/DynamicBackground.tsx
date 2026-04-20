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
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform vec3 uColor1; // Teal (20%)
  uniform vec3 uColor2; // Red (40%)
  uniform vec3 uColor3; // Black (40%)
  varying vec2 vUv;

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    float aspect = uResolution.x / uResolution.y;
    vec2 st = (uv - 0.5);
    st.x *= aspect;

    float t = uTime * 0.15; // Deeper, slower flow
    
    // Deeply shifting motion with multi-frequency sines
    vec2 b1 = vec2(0.8 * sin(t * 0.3 + sin(t * 0.5)), 0.5 * cos(t * 0.4));
    vec2 b2 = vec2(0.9 * cos(t * 0.6 - cos(t * 0.2)), 0.6 * sin(t * 0.5));
    vec2 b3 = vec2(-0.7 * sin(t * 0.25), -0.8 * cos(t * 0.35 + sin(t * 0.15)));
    vec2 b4 = vec2(-0.8 * cos(t * 0.7), 0.4 * sin(t * 0.8));
    vec2 b5 = vec2(0.5 * sin(t * 1.1), -0.5 * cos(t * 1.3)); // Extra center-shifting blob

    // Soft distance fields for color infusion
    float f1 = 1.0 - smoothstep(0.0, 2.2, length(st - b1));
    float f2 = 1.0 - smoothstep(0.0, 2.4, length(st - b2));
    float f3 = 1.0 - smoothstep(0.0, 2.0, length(st - b3));
    float f4 = 1.0 - smoothstep(0.0, 2.1, length(st - b4));
    float f5 = 1.0 - smoothstep(0.0, 1.8, length(st - b5));

    // Interactive mouse glow - enhanced
    float mDist = length(uv - (uMouse * 0.5 + 0.5));
    float mouseGlow = 1.0 - smoothstep(0.0, 0.7, mDist);

    // Cinematic base void
    vec3 color = uColor3; 
    
    // Infuse Dark Blood Red (uColor2) - Main atmospheric driver
    color = mix(color, uColor2, f1 * 0.85 + f3 * 0.45 + f5 * 0.2);
    
    // Infuse Deep Teal (uColor1) - Sophisticated contrast
    color = mix(color, uColor1, f2 * 0.5 + f4 * 0.25 + f5 * 0.15);
    
    // Add interactive teal highlight
    color += uColor1 * mouseGlow * 0.15;

    // Soft focus vignette for depth
    float vignette = smoothstep(2.2, 0.1, length(st));
    color *= vignette;
    
    // Cinematic Grain overlay
    float grain = fract(sin(dot(uv + t*0.0001, vec2(12.9898, 78.233))) * 43758.5453);
    color += (grain - 0.5) * 0.02;

    // Final output - slightly brighter than before but still deep and moody
    gl_FragColor = vec4(clamp(color, 0.0, 0.65), 1.0);
  }
`;

function BackgroundMesh() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { viewport, size } = useThree();
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uColor1: { value: new THREE.Color("#004D4D") }, // Deep Teal (20% weight)
    uColor2: { value: new THREE.Color("#4A0000") }, // Dark Blood Red (40% weight)
    uColor3: { value: new THREE.Color("#000000") }, // Absolute Black (40% weight)
  }), [size]);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.getElapsedTime();
    uniforms.uResolution.value.set(state.size.width, state.size.height);
    uniforms.uMouse.value.lerp(
      new THREE.Vector2(state.mouse.x, state.mouse.y),
      0.02
    );
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

function SoftBokeh({ count = 600 }) {
  const mesh = useRef<THREE.InstancedMesh>(null!);
  const { viewport } = useThree();

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const speed = 0.001 + Math.random() / 800;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -20 + Math.random() * 15;
      const size = 1.0 + Math.random() * 2.5;
      temp.push({ t, speed, xFactor, yFactor, zFactor, size, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    particles.forEach((p, i) => {
      p.t += p.speed;
      const { t, xFactor, yFactor, zFactor, size } = p;
      const s = Math.cos(t) * 0.5 + 0.5;
      
      p.mx += (state.mouse.x * viewport.width - p.mx) * 0.002;
      p.my += (state.mouse.y * viewport.height - p.my) * 0.002;

      dummy.position.set(
        xFactor + Math.cos(t) * 3.0 + p.mx * 0.015,
        yFactor + Math.sin(t) * 3.0 + p.my * 0.015,
        zFactor
      );
      
      dummy.scale.set(size * s, size * s, size * s);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <circleGeometry args={[0.3, 12]} />
      <meshBasicMaterial 
        color="#20B2AA" 
        transparent 
        opacity={0.05} 
        blending={THREE.AdditiveBlending} 
      />
    </instancedMesh>
  );
}

export default function DynamicBackground() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setShouldRender(true);
  }, []);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-black">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: true, stencil: false, depth: false, powerPreference: "high-performance" }}
        dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1}
      >
        <BackgroundMesh />
        <SoftBokeh count={typeof window !== 'undefined' && window.innerWidth < 768 ? 150 : 600} />
      </Canvas>
    </div>
  );
}
