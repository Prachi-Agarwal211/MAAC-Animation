'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
    // Create spans safely using DOM manipulation instead of innerHTML
    ref.current.textContent = '';
    words.forEach((w, i) => {
      const wrapper = document.createElement('span');
      wrapper.className = 'word-wrapper inline-block overflow-hidden';
      wrapper.setAttribute('aria-hidden', 'true');
      
      const inner = document.createElement('span');
      inner.className = 'word-inner inline-block';
      inner.textContent = w;
      
      wrapper.appendChild(inner);
      ref.current!.appendChild(wrapper);
      
      // Add space after word (except for last)
      if (i < words.length - 1) {
        ref.current!.appendChild(document.createTextNode(' '));
      }
    });

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
