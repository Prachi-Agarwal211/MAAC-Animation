'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from '@/lib/gsap';

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
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const words = containerRef.current.querySelectorAll('.word-inner');
    if (!words.length) return;

    gsap.fromTo(words,
      { y: '110%', rotateZ: 2 },
      {
        y: '0%',
        rotateZ: 0,
        duration: 1,
        stagger: 0.05,
        ease: 'expo.out',
        delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, { dependencies: [children, delay], scope: containerRef });

  return (
    <Tag ref={containerRef as any} className={`${className} flex flex-wrap gap-x-[0.3em]`}>
      {children.split(' ').map((word, i) => (
        <span key={i} className="word-wrapper inline-block overflow-hidden py-1">
          <span className="word-inner inline-block will-change-transform origin-left">
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}
