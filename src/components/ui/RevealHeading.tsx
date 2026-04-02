'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealHeadingProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  delay?: number;
}

export default function RevealHeading({ 
  children, 
  className = '', 
  as: Tag = 'h2',
  delay = 0 
}: RevealHeadingProps) {
  const ref = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const words = children.split(' ');
    ref.current.innerHTML = words.map(w => 
      `<span class="word-wrapper inline-block overflow-hidden"><span class="word-inner inline-block">${w}</span></span>`
    ).join(' ');
    
    const ctx = gsap.context(() => {
      gsap.fromTo('.word-inner', 
        { y: '100%' },
        {
          y: '0%', 
          duration: 0.7, 
          stagger: 0.05, 
          ease: 'power3.out',
          delay,
          scrollTrigger: { 
            trigger: ref.current as Element, 
            start: 'top 82%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, ref);
    
    return () => ctx.revert();
  }, [children, delay]);
  
  return <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={className}>{children}</Tag>;
}
