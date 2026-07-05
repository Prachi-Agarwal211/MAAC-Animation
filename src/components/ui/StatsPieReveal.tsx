"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";

const RADIUS = 80;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const TARGET_FRAC = 0.95; // 95% placement rate

export default function StatsPieReveal() {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    if (!svgRef.current) return;
    const arc = svgRef.current.querySelector<SVGCircleElement>(".stat-arc");
    if (!arc) return;

    gsap.set(arc, { strokeDashoffset: CIRCUMFERENCE });

    gsap.to(arc, {
      strokeDashoffset: CIRCUMFERENCE * (1 - TARGET_FRAC),
      duration: 1.4,
      ease: "power2.out",
      scrollTrigger: { trigger: svgRef.current, start: "top 75%" },
    });

    // Counter text
    const counter = svgRef.current.querySelector<SVGTextElement>(".stat-value");
    if (counter) {
      gsap.fromTo(counter, { innerText: "0" }, {
        innerText: "95",
        duration: 1.4,
        ease: "power2.out",
        snap: { innerText: 1 },
        scrollTrigger: { trigger: svgRef.current, start: "top 75%" },
      });
    }
  }, { scope: svgRef });

  return (
    <div className="flex flex-col items-center gap-6">
      <svg ref={svgRef} viewBox="0 0 200 200" className="w-full max-w-[280px] mx-auto -rotate-90">
        <circle
          cx="100" cy="100" r={RADIUS}
          fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="14"
        />
        <circle
          className="stat-arc"
          cx="100" cy="100" r={RADIUS}
          fill="none"
          stroke="#E31837"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE}
        />
        <text
          x="100" y="100"
          textAnchor="middle" dominantBaseline="central"
          className="stat-value fill-white font-display text-[2.5rem] font-bold"
          style={{ transform: "rotate(90deg)", transformOrigin: "100px 100px" }}
        >
          0
        </text>
      </svg>
      <div className="text-center">
        <p className="text-white font-display text-xl font-bold uppercase tracking-wider">Placement Rate</p>
        <p className="text-white/50 text-sm mt-1">Across 500+ partner studios</p>
      </div>
    </div>
  );
}
