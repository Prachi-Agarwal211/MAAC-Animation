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

  float fastNoise(vec2 p) {
    return sin(p.x * 1.5 + uTime * 0.4) * sin(p.y * 1.2 + uTime * 0.45);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= uResolution.x / uResolution.y;

    float t = uTime * 0.22;

    float n  = 0.6 * fastNoise(p * 1.0 + t);
    n += 0.3 * fastNoise(p * 2.2 - t * 0.5);

    vec2 mouseOffset = (uMouse - 0.5) * 0.15;
    n += sin(p.x * 2.0 + mouseOffset.x) * sin(p.y * 2.0 + mouseOffset.y) * 0.08;

    float intensity = clamp(n * 0.5 + 0.5, 0.0, 1.0);
    intensity = smoothstep(0.2, 0.8, intensity);

    vec3 baseBlack = vec3(0.06, 0.0, 0.005);
    vec3 deepRed   = vec3(0.28, 0.015, 0.022);
    vec3 bloodGlow = vec3(0.48, 0.025, 0.035);

    vec3 color = mix(baseBlack, deepRed, intensity * 0.75);
    color = mix(color, bloodGlow, intensity * intensity * 0.4);

    vec2 pNorm = p * 0.3;
    float vignette = 1.0 - dot(pNorm, pNorm);
    color *= clamp(vignette, 0.7, 1.0);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function FluidMesh() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { viewport, size } = useThree();
  const mouseRef = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.set(
        e.clientX / window.innerWidth,
        1.0 - e.clientY / window.innerHeight
      );
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.getElapsedTime();
    uniforms.uResolution.value.set(state.size.width, state.size.height);
    uniforms.uMouse.value.lerp(mouseRef.current, 0.03);
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

function BaseBackground() {
  return (
    <div
      className="fixed inset-0 z-[-20] pointer-events-none"
      style={{
        background: 'radial-gradient(circle at 15% 50%, #2a0102 0%, #050000 100%)',
        backgroundColor: '#050000'
      }}
    />
  );
}

export default function DynamicBackground() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    setIsMobile(!mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(!e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  if (isMobile === null) return <BaseBackground />;

  if (isMobile) {
    return (
      <>
        <BaseBackground />
        <div className="fixed inset-0 z-[-10] animated-bg opacity-30" />
      </>
    );
  }

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
            alpha: true,
          }}
          dpr={1}
          frameloop="always"
        >
          <FluidMesh />
        </Canvas>
      </div>
    </>
  );
}
