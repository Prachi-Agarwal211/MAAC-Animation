"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap";

interface CountUpStatProps {
  number: number;
  suffix: string;
  label: string;
}

export default function CountUpStat({ number, suffix, label }: CountUpStatProps) {
  const countRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const obj = { value: 0 };
    gsap.to(obj, {
      value: number,
      duration: 2.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: countRef.current,
        start: "top 90%",
      },
      onUpdate: () => {
        if (countRef.current) {
          countRef.current.innerText = Math.round(obj.value).toString();
        }
      },
    });
  }, { scope: countRef });

  return (
    <div className="text-center px-4 group">
      <div className="font-display text-[clamp(1.5rem,3.5vw,2.5rem)] text-white tabular-nums flex items-center justify-center font-bold uppercase leading-[1.1] tracking-[0.1em]">
        <span ref={countRef}>0</span>
        <span className="metallic-gold-text ml-1">{suffix}</span>
      </div>
      <div className="text-[#6B6560] text-[9px] mt-3 font-bold tracking-[0.3em] uppercase transition-colors group-hover:text-white">{label}</div>
    </div>
  );
}
