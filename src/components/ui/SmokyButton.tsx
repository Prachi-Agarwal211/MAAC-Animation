"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { cn } from "../../lib/utils";

interface SmokyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

const vertexShaderSource = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

// Adapted WebGL Fragment Shader for Red Aesthetic
const fragmentShaderSource = `
  precision mediump float;
  uniform vec2 iResolution;
  uniform float iTime;
  varying vec2 vUv;

  float random(vec2 pos) {
      return fract(sin(dot(pos, vec2(12.9898, 78.233))) * 43758.5453);
  }

  float noise(vec2 pos) {
      vec2 i = floor(pos);
      vec2 f = fract(pos);
      float a = random(i + vec2(0.0, 0.0));
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 pos) {
      float v = 0.0;
      float a = 0.5;
      float t = iTime * 0.45; // Increased speed for better fluid perception
      vec2 shift = vec2(20.0);
      mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
      for (int i = 0; i < 8; i++) {
          v += a * noise(pos);
          pos = rot * pos * 2.0 + shift;
          a *= 0.5;
      }
      return v;
  }

  void main(void) {
      // Use vertex-based UVs and correct for aspect ratio to ensure uniform noise
      vec2 uv = (vUv - 0.5) * vec2(max(iResolution.x / iResolution.y, 1.0), max(iResolution.y / iResolution.x, 1.0));
      uv *= 2.8; // Significantly higher frequency for sharper, 'wispier' smoke

      vec2 q = vec2(
          fbm(uv + 0.20 * iTime),
          fbm(uv + vec2(5.0, 1.0))
      );
      vec2 r = vec2(
          fbm(uv + 3.0 * q + vec2(1.2, 3.2) + 0.2 * iTime),
          fbm(uv + 3.0 * q + vec2(8.8, 2.8) + 0.2 * iTime)
      );
      
      float f = fbm(uv + r);
      
      vec3 color = mix(
          vec3(0.0, 0.0, 0.0),
          vec3(1.0, 0.84, 0.0), // Golden Yellow
          clamp((f * f) * 8.0, 0.0, 6.0)
      );

      color = mix(
          color,
          vec3(0.75, 0.58, 0.2), // Deep Gold / Bronze
          clamp(length(q) * 2.0, 0.0, 1.0)
      );

      color = mix(
          color,
          vec3(1.0, 0.95, 0.7), // Pale Gold Highlight
          clamp(length(r.x) * 1.5, 0.0, 0.2)
      );

      // Sharpen the color edges by using higher powers of f
      float fPower = pow(f, 1.8);
      vec3 finalColor = vec3(0.05, 0.04, 0.0) + (fPower * 1.5 + f * f * 0.8) * color;
      
      // Vignette to keep edges sharp and centered
      // Final darkening for readability; subtle metallic sheen
      finalColor *= 0.95; // Golden pop
      float vig = 1.0 - length(vUv - 0.5) * 1.2;
      finalColor *= clamp(vig, 0.2, 1.0);

      gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

let _webglSupported: boolean | null = null;
function canRunWebGL(): boolean {
  if (_webglSupported !== null) return _webglSupported;
  if (typeof window === "undefined") { _webglSupported = false; return false; }
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  if (isTouch) {
    const nav = navigator as Navigator & { deviceMemory?: number; hardwareConcurrency?: number };
    const ram = nav.deviceMemory ?? 8;
    const cores = nav.hardwareConcurrency ?? 8;
    if (ram < 4 || cores < 4) { _webglSupported = false; return false; }
  }
  const testCanvas = document.createElement("canvas");
  const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
  _webglSupported = Boolean(gl);
  return _webglSupported;
}

export default function SmokyButton({ href, onClick, className, children, ...props }: SmokyButtonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webglSupported = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    if (!canRunWebGL()) return;

    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl") as WebGLRenderingContext | null;
    if (!gl) return;
    webglSupported.current = true;

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const timeLocation = gl.getUniformLocation(program, "iTime");
    const resolutionLocation = gl.getUniformLocation(program, "iResolution");

    let animationFrameId: number;
    let running = false;
    const startTime = Date.now();

    const resize = () => {
      if (!canvas || !canvas.parentElement) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.parentElement.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    resize();

    const render = () => {
      if (!running) return;
      animationFrameId = requestAnimationFrame(render);
      const time = (Date.now() - startTime) * 0.001;
      gl.uniform1f(timeLocation, time);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    // ponytail: start WebGL loop only on hover, stop on leave
    const container = canvas.closest('.group');
    const startRender = () => { running = true; animationFrameId = requestAnimationFrame(render); };
    const stopRender = () => { running = false; cancelAnimationFrame(animationFrameId); };

    container?.addEventListener('mouseenter', startRender);
    container?.addEventListener('mouseleave', stopRender);

    return () => {
      running = false;
      cancelAnimationFrame(animationFrameId);
      container?.removeEventListener('mouseenter', startRender);
      container?.removeEventListener('mouseleave', stopRender);
      resizeObserver.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  const innerHTML = (
    <>
      {/* Default solid white background overlay - Fades out on hover to reveal smoke */}
      <div className="absolute inset-0 bg-white group-hover:opacity-0 transition-opacity duration-700 z-0" />
      
      {/* Smoky Animation Container - Hidden by default, reveals on hover */}
      <div className="absolute -z-[1] -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <canvas 
          ref={canvasRef} 
          className="absolute top-0 left-0 w-full h-full group-hover:scale-[1.15] transition-transform duration-1000 ease-out" 
        />
      </div>

      <div className="relative z-10 flex w-full h-full items-center justify-center px-10 py-4">
        <div className="text-black group-hover:text-white whitespace-nowrap transition-all duration-500 uppercase tracking-[0.3em] text-[11px] font-bold leading-none">
          {children}
        </div>
      </div>
    </>
  );

  const containerClasses = cn(
    "group relative rounded-full text-white/80 font-bold overflow-hidden border border-white/20",
    "shadow-[0_0_0_rgba(255,215,0,0)] hover:shadow-[0_8px_48px_rgba(212,175,55,0.4)] border-white/40 hover:border-white transition-all duration-700 flex",
    className
  );

  if (href) {
    return (
      <Link href={href} className={containerClasses} onClick={onClick}>
        {innerHTML}
      </Link>
    );
  }

  return (
    <button className={containerClasses} onClick={onClick} {...props}>
      {innerHTML}
    </button>
  );
}

