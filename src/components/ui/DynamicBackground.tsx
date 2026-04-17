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
  uniform vec3 uColor1; // Royal Blue
  uniform vec3 uColor2; // Deep Red
  uniform vec3 uColor3; // Teal Green
  varying vec2 vUv;

  float random (vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  float noise (vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      vec2 u = f*f*(3.0-2.0*f);
      return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 st) {
      float value = 0.0;
      float amplitude = 0.5;
      for (int i = 0; i < 4; i++) {
          value += amplitude * noise(st);
          st *= 2.2;
          amplitude *= 0.5;
      }
      return value;
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.4;
    
    // Create organic flowing movement
    vec2 p = uv * 2.5;
    float n = fbm(p + t * 0.2 + uMouse * 0.1);
    
    // Plasma-like color interference
    float c1 = sin(uv.x * 3.0 + t + n);
    float c2 = cos(uv.y * 2.0 - t * 0.5 + n);
    float c3 = sin((uv.x + uv.y) * 1.5 + t + n);

    // Dynamic Color Palette
    vec3 blue = uColor1 * (c1 * 0.5 + 0.5);
    vec3 red = uColor2 * (c2 * 0.5 + 0.5);
    vec3 teal = uColor3 * (c3 * 0.5 + 0.5);

    // Blend layers with high contrast
    vec3 finalColor = blue;
    finalColor = mix(finalColor, red, smoothstep(0.2, 0.8, n));
    finalColor = mix(finalColor, teal, smoothstep(0.4, 0.9, sin(t * 0.3 + n)));

    // Add glowing "energy" veins
    float veins = pow(1.0 - abs(n - 0.5), 12.0);
    finalColor += (uColor1 + uColor3) * veins * 0.6;

    // Darken but keep visible
    finalColor *= 0.8; // Lower intensity overall
    
    // Shifting dark voids
    float mask = fbm(uv * 1.5 - t * 0.1);
    finalColor *= smoothstep(0.1, 1.0, mask);

    // Soft Vignette
    float vignette = 1.0 - distance(uv, vec2(0.5)) * 1.2;
    gl_FragColor = vec4(finalColor * clamp(vignette, 0.2, 1.0), 1.0);
  }
`;

function BackgroundMesh() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { viewport } = useThree();
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uColor1: { value: new THREE.Color("#0f0203") }, // Very dark crimson void
    uColor2: { value: new THREE.Color("#8c0f20") }, // Deep MAAC Red
    uColor3: { value: new THREE.Color("#181412") }, // Charcoal with slight warmth
  }), []);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.getElapsedTime();
    uniforms.uMouse.value.lerp(
      new THREE.Vector2(state.mouse.x, state.mouse.y),
      0.05 // Smoother, subtler mouse interaction
    );
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

export default function DynamicBackground() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    console.log("DynamicBackground: Checking device...");
    // Enable for all devices
    setShouldRender(true);
    console.log("DynamicBackground: Rendering enabled.");
  }, []);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: false, stencil: false, depth: false }}
        // Optimization: Cap DPR at 1.2 for mobile to keep frame rate high
        dpr={typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : [1, 1.5]}
        onCreated={() => console.log("WebGL Canvas Created successfully")}
      >
        <BackgroundMesh />
      </Canvas>
    </div>
  );
}
