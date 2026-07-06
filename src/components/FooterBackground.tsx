"use client";

import { useRef, useEffect } from "react";

export default function FooterBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="absolute inset-0 z-0 opacity-25 max-md:hidden">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          aria-hidden="true"
          preload="none"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/hero-video-compressed.mp4" type="video/mp4" />
          <source src="/hero-video.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <div className="absolute inset-0 z-0 md:hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0c0c0c] to-[#0a0a0a]" />
      </div>
    </>
  );
}
