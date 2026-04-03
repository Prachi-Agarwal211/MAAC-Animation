"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Color stops that slowly shift
    const colors = [
      { r: 12, g: 12, b: 12 },      // deep black
      { r: 28, g: 5, b: 8 },        // very dark red
      { r: 12, g: 10, b: 8 },       // warm dark
      { r: 18, g: 12, b: 5 },       // dark amber
    ];

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const render = () => {
      time += 0.0008;
      const w = canvas.width;
      const h = canvas.height;

      // Create a gradient that slowly rotates and shifts
      const cx = w / 2 + Math.sin(time * 0.7) * w * 0.15;
      const cy = h / 2 + Math.cos(time * 0.5) * h * 0.12;

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.8);

      const t = (Math.sin(time) + 1) / 2;
      const ci = Math.floor(t * (colors.length - 1));
      const cn = Math.min(ci + 1, colors.length - 1);
      const ct = (t * (colors.length - 1)) % 1;

      const r = Math.round(lerp(colors[ci].r, colors[cn].r, ct));
      const g = Math.round(lerp(colors[ci].g, colors[cn].g, ct));
      const b = Math.round(lerp(colors[ci].b, colors[cn].b, ct));

      grad.addColorStop(0, `rgba(${r + 8},${g + 3},${b + 3},0.6)`);
      grad.addColorStop(0.4, `rgba(${r},${g},${b},0.3)`);
      grad.addColorStop(1, "rgba(8,8,8,0)");

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Secondary orb
      const cx2 = w * 0.75 + Math.cos(time * 0.6 + 2) * w * 0.12;
      const cy2 = h * 0.3 + Math.sin(time * 0.4 + 1) * h * 0.15;
      const grad2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, Math.max(w, h) * 0.4);
      grad2.addColorStop(0, "rgba(227,24,55,0.04)");
      grad2.addColorStop(1, "rgba(227,24,55,0)");
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, w, h);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ mixBlendMode: "screen", opacity: 0.6 }}
      aria-hidden="true"
    />
  );
}
