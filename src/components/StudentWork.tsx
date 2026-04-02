"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const workItems = [
  { 
    title: "ANANDI", 
    category: "Animation",
    video: "/student work/ANANDI.mp4",
    description: "A beautiful animated story",
    duration: "2:34"
  },
  { 
    title: "FAST LIFE", 
    category: "Short Film",
    video: "/student work/FAST LIFE.mp4",
    description: "Fast-paced urban storytelling",
    duration: "3:12"
  },
  { 
    title: "KARMA", 
    category: "Visual Effects",
    video: "/student work/KARMA.mp4",
    description: "VFX-heavy narrative piece",
    duration: "4:05"
  },
  { 
    title: "THE PLASTIC PLAGUE", 
    category: "Documentary",
    video: "/student work/THE PLASTIC PLAGUE.mp4",
    description: "Environmental awareness film",
    duration: "5:20"
  },
];

interface VideoModalProps {
  video: string;
  title: string;
  category: string;
  onClose: () => void;
}

function VideoModal({ video, title, category, onClose }: VideoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<Element | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  // Focus trap: focus close button when modal opens
  useEffect(() => {
    if (video) {
      previousActiveElement.current = document.activeElement;
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    } else {
      previousActiveElement.current = null;
    }
  }, [video]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
      gsap.fromTo(".modal-content",
        { scale: 0.92, y: 60, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.6, ease: "expo.out" }
      );
      gsap.fromTo(".modal-glow",
        { scale: 0.8, opacity: 0 },
        { scale: 1.2, opacity: 0.5, duration: 1.2, ease: "power1.out" }
      );
    }, modalRef);

    document.body.style.overflow = "hidden";

    // Keyboard handler for focus trap
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      
      if (e.key === "Tab") {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements && focusableElements.length > 0) {
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
          
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      ctx.revert();
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKeyDown);
      // Restore focus
      if (previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus();
      }
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [isMuted, isPlaying]);

  useEffect(() => {
    const resetControls = () => {
      setShowControls(true);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) setShowControls(false);
      }, 3000);
    };

    resetControls();
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
      onClick={handleBackdropClick}
    >
      {/* Ambient Glow */}
      <div className="modal-glow absolute w-[600px] h-[600px] bg-[#E31837]/30 rounded-full blur-[200px] pointer-events-none" />
      
      <button
        ref={closeButtonRef}
        onClick={onClose}
        className={`absolute top-4 md:top-6 right-4 md:right-6 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-[#E31837]/80 transition-all duration-300 ${!showControls ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}
        aria-label="Close modal"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div 
        className="modal-content relative w-full max-w-6xl mx-4 md:mx-8"
        onMouseMove={() => setShowControls(true)}
        onTouchStart={() => setShowControls(true)}
      >
        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-[#E31837]/40 ring-1 ring-white/10">
          <video
            ref={videoRef}
            src={video}
            className="w-full h-full object-cover"
            controls={false}
            autoPlay
            loop
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
          
          {/* Custom Controls Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 transition-opacity duration-500 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[#E31837] text-xs font-bold uppercase tracking-wider">{category}</span>
                  <h3 className="text-white font-display font-bold text-lg md:text-xl mt-1">{title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white/60 text-xs font-mono bg-white/10 px-2 py-1 rounded-full">HD</span>
                </div>
              </div>
            </div>

            {/* Center Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (videoRef.current) {
                    if (isPlaying) {
                      videoRef.current.pause();
                    } else {
                      videoRef.current.play();
                    }
                  }
                  setIsPlaying(!isPlaying);
                }}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#E31837]/90 backdrop-blur-md flex items-center justify-center transform hover:scale-110 transition-all duration-300 shadow-2xl shadow-[#E31837]/50 ring-4 ring-white/20"
              >
                {isPlaying ? (
                  <svg className="w-10 h-10 md:w-12 md:h-12 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                  </svg>
                ) : (
                  <svg className="w-10 h-10 md:w-12 md:h-12 text-white ml-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              {/* Progress Bar */}
              <div className="w-full h-1 bg-white/20 rounded-full mb-4 overflow-hidden">
                <div className="h-full bg-[#E31837] rounded-full animate-pulse" style={{ width: '35%' }} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 md:gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (videoRef.current) {
                        if (isPlaying) {
                          videoRef.current.pause();
                        } else {
                          videoRef.current.play();
                        }
                      }
                      setIsPlaying(!isPlaying);
                    }}
                    className="text-white hover:text-[#E31837] transition-colors"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMuted(!isMuted);
                    }}
                    className="text-white hover:text-[#E31837] transition-colors"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? (
                      <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                      </svg>
                    )}
                  </button>

                  <span className="text-white/60 text-xs font-mono">0:42 / {workItems.find(i => i.title === title)?.duration || '0:00'}</span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (videoRef.current?.requestFullscreen) {
                      videoRef.current.requestFullscreen();
                    }
                  }}
                  className="text-white hover:text-[#E31837] transition-colors"
                  aria-label="Fullscreen"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StudentWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedVideo, setSelectedVideo] = useState<typeof workItems[0] | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [loadedVideos, setLoadedVideos] = useState<boolean[]>(new Array(workItems.length).fill(false));

  // IntersectionObserver for lazy loading videos
  useEffect(() => {
    const observerRef = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const video = entry.target as HTMLVideoElement;
            if (video.preload === "none") {
              video.preload = "metadata";
            }
            observerRef.unobserve(video);
          }
        });
      },
      { rootMargin: "200px" } // Start loading 200px before entering viewport
    );

    videoRefs.current.forEach((v) => v && observerRef.observe(v));

    return () => observerRef.disconnect();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".sw-heading", { opacity: 0, y: 80 }, {
        opacity: 1, y: 0, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      gsap.fromTo(".sw-card", { opacity: 0, scale: 0.8, y: 60 }, {
        opacity: 1, scale: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "expo.out",
        scrollTrigger: { trigger: ".sw-grid", start: "top 80%" },
      });
      gsap.fromTo(".sw-tagline", { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    }, sectionRef);
    return () => {
      ctx.revert();
    };
  }, []);

  const handleCardHover = (index: number, isHovering: boolean) => {
    const video = videoRefs.current[index];
    if (video) {
      if (isHovering) {
        video.muted = true;
        video.playbackRate = 1.5;
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }
  };

  const handleVideoLoad = (index: number) => {
    setLoadedVideos(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  return (
    <>
      <section ref={sectionRef} className="relative py-20 md:py-32 overflow-hidden bg-[#111111]">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0C0C] via-[#111111] to-[#0C0C0C]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E31837]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FF6B35]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="sw-heading text-center mb-12 md:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E31837]/10 border border-[#E31837]/20 mb-6">
              <span className="w-2 h-2 bg-[#E31837] rounded-full animate-pulse" />
              <p className="text-[#E31837] text-xs font-bold tracking-[0.2em] uppercase">Student Showcase</p>
            </div>
            <h2 className="font-display font-bold text-[clamp(2rem,5vw,4rem)] text-[#F0EBE1] leading-[1.05] tracking-tight mb-6">
              Student <span className="gradient-text">Work</span>
            </h2>
            <p className="sw-tagline text-[#A8A29C] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Explore the incredible creations by our students
            </p>
          </div>

          {/* Video Grid */}
          <div className="sw-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {workItems.map((item, index) => (
              <div 
                key={index} 
                className="sw-card group relative rounded-xl md:rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-[#E31837]/30"
                onMouseEnter={() => handleCardHover(index, true)}
                onMouseLeave={() => handleCardHover(index, false)}
                onClick={() => setSelectedVideo(item)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedVideo(item);
                  }
                }}
              >
                {/* Video Preview */}
                <div className="relative aspect-[4/3] bg-[#0a0a0a]">
                  {/* Loading State */}
                  {!loadedVideos[index] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]">
                      <div className="w-8 h-8 border-2 border-[#E31837]/30 border-t-[#E31837] rounded-full animate-spin" />
                    </div>
                  )}

                  <video
                    ref={(el) => { videoRefs.current[index] = el }}
                    src={item.video}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    preload="none"
                    onLoadedData={() => handleVideoLoad(index)}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#E31837]/80 backdrop-blur-sm flex items-center justify-center transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 shadow-lg shadow-[#E31837]/40 ring-2 ring-white/20">
                      <svg className="w-6 h-6 md:w-7 md:h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-md">
                    <span className="text-white text-xs font-mono">{item.duration}</span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1.5 bg-[#E31837]/90 backdrop-blur-sm rounded-full transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-white text-xs font-bold uppercase tracking-wider">{item.category}</span>
                  </div>
                </div>

                {/* Info Section */}
                <div className="relative bg-gradient-to-t from-[#0C0C0C] to-[#0C0C0C]/50 p-4 md:p-5">
                  <div className="transform translate-y-0 group-hover:translate-y-[-4px] transition-transform duration-500">
                    <h3 className="text-[#F0EBE1] font-display font-bold text-lg md:text-xl mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-[#6B6560] text-sm line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                    
                    {/* Watch CTA */}
                    <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="text-[#E31837] text-xs font-bold uppercase tracking-wider">Watch Now</span>
                      <svg className="w-4 h-4 text-[#E31837] transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Border Glow Effect */}
                <div className="absolute inset-0 rounded-xl md:rounded-2xl border-2 border-[#E31837]/0 group-hover:border-[#E31837]/40 transition-colors duration-500 pointer-events-none" />
                
                {/* Hover Gradient */}
                <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#E31837]/0 via-transparent to-[#FF6B35]/0 group-hover:from-[#E31837]/10 group-hover:to-[#FF6B35]/10 transition-all duration-700 pointer-events-none" />
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16 md:mt-20">
            <div className="inline-flex flex-col items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#6B6560]" />
                <p className="text-[#6B6560] text-sm">Want to see more student work?</p>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#6B6560]" />
              </div>
              <button className="group inline-flex items-center gap-3 px-8 py-4 bg-[#E31837] hover:bg-[#c41430] text-white font-bold rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-[#E31837]/50 hover:scale-105">
                <span>Visit Our Gallery</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal 
          video={selectedVideo.video}
          title={selectedVideo.title}
          category={selectedVideo.category}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </>
  );
}
