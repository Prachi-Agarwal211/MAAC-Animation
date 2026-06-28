"use client";

export default function FooterBackground() {
  return (
    <>
      <div className="absolute inset-0 z-0 opacity-45 max-md:hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/hero-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/hero-video-compressed.mp4" type="video/mp4" />
          <source src="/hero-video.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="absolute inset-0 z-0 opacity-60 md:hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
      </div>
    </>
  );
}
