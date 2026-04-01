'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  accent: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: 'Work',
    subtitle: 'Featured Projects',
    description: 'Explore our motion-first digital experiences that command attention',
    image: '/gallery/work.svg',
    accent: '#c8ff00',
  },
  {
    id: 2,
    title: 'Studio',
    subtitle: 'Our Process',
    description: 'Behind the scenes of our creative excellence and predatory approach',
    image: '/gallery/studio.svg',
    accent: '#E31837',
  },
  {
    id: 3,
    title: 'Contact',
    subtitle: 'Get In Touch',
    description: 'Ready to unleash wild? Let us craft your digital experience',
    image: '/gallery/contact.svg',
    accent: '#FF6B35',
  },
];

export default function InteractiveGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Scroll animations for cards
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards on scroll
      gsap.fromTo(
        '.gallery-card',
        {
          opacity: 0,
          y: 100,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.25,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.gallery-section',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate header elements
      gsap.fromTo(
        '.gallery-eyebrow',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.gallery-section',
            start: 'top 80%',
          },
        }
      );

      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.gallery-section',
          start: 'top 80%',
        },
      });

      headerTl.fromTo(
        '.gallery-title',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'expo.out',
        },
        '-=0.6'
      ).fromTo(
        '.gallery-subtitle',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'expo.out',
        },
        '-=0.8'
      ).fromTo(
        '.gallery-description',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'expo.out',
        },
        '-=0.9'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCardClick = (item: GalleryItem) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveItem(item);

    // Wait for React to render the modal
    setTimeout(() => {
      const tl = gsap.timeline();

      // Backdrop fade in
      tl.to('.modal-backdrop', {
        opacity: 1,
        duration: 0.5,
        ease: 'expo.out',
      });

      // Modal content scale and fade in
      tl.to('.modal-content', {
        scale: 1,
        opacity: 1,
        duration: 0.7,
        ease: 'expo.out',
      }, '-=0.3');

      // Image scale down to normal
      tl.fromTo(
        '.modal-image-inner',
        { scale: 1.15 },
        {
          scale: 1,
          duration: 1.5,
          ease: 'expo.out',
        },
        '-=0.5'
      );

      // Stagger text elements reveal
      tl.fromTo(
        ['.modal-number', '.modal-title', '.modal-subtitle', '.modal-description', '.modal-cta'],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'expo.out',
        },
        '-=0.8'
      );
    }, 50);
  };

  const handleCloseModal = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setActiveItem(null);
        setIsAnimating(false);
      },
    });

    // Animate modal exit
    tl.to('.modal-backdrop', {
      opacity: 0,
      duration: 0.4,
      ease: 'expo.in',
    });

    tl.to('.modal-content', {
      scale: 0.92,
      opacity: 0,
      duration: 0.4,
      ease: 'expo.in',
    }, '<');
  };

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeItem) {
        handleCloseModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [activeItem]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (activeItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeItem]);

  return (
    <div ref={containerRef} className="gallery-section relative bg-[#080808] py-24 md:py-32 overflow-hidden">
      {/* Container */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="mb-20 md:mb-28">
          <p className="gallery-eyebrow text-[#c8ff00] text-xs md:text-sm font-semibold tracking-[0.2em] uppercase mb-6">
            Interactive Gallery
          </p>
          <h2 className="gallery-title text-white font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight">
            Creative Careers That Click
          </h2>
          <h2 className="gallery-title text-[#c8ff00] font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight mt-2 mb-6 md:mb-8">
            Think MAAC
          </h2>
          <p className="gallery-description text-gray-400 text-sm md:text-base leading-relaxed max-w-3xl">
            Train in animation, VFX, gaming, and digital content creation with expert-led courses that prepare you for real industry success.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="gallery-card group relative h-[500px] md:h-[600px] cursor-pointer overflow-hidden rounded-xl"
              onClick={() => handleCardClick(item)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(item);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Open ${item.title} gallery`}
            >
              {/* Background Image Container */}
              <div className="absolute inset-0 w-full h-full">
                {/* Image */}
                <div
                  className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${item.image})`,
                  }}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700" />
              </div>

              {/* Curtain Effect */}
              <div
                className="curtain absolute inset-0 bg-[#080808] transition-transform duration-700 ease-in-out group-hover:scale-y-0"
                style={{ transformOrigin: 'top' }}
              />

              {/* Content */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-10">
                {/* Number */}
                <span
                  className="text-white/50 text-sm font-semibold mb-4 group-hover:text-white/80 transition-colors duration-300"
                  style={{ color: item.accent }}
                >
                  0{item.id}
                </span>

                {/* Title */}
                <h3 className="text-white font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-3 group-hover:translate-y-[-8px] transition-transform duration-500 ease-out">
                  {item.title}
                </h3>

                {/* Subtitle */}
                <p className="text-gray-300 text-sm md:text-base font-medium tracking-wide mb-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out">
                  {item.subtitle}
                </p>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out delay-75">
                  {item.description}
                </p>

                {/* CTA Arrow */}
                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out delay-100">
                  <span
                    className="text-sm font-semibold tracking-wide uppercase"
                    style={{ color: item.accent }}
                  >
                    Explore
                  </span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300"
                    style={{ color: item.accent }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>

              {/* Border */}
              <div className="absolute inset-0 border border-white/10 rounded-xl group-hover:border-white/20 transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {activeItem && (
        <div
          className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-6 md:p-12 opacity-0"
          style={{ backgroundColor: 'rgba(8, 8, 8, 0.98)', backdropFilter: 'blur(8px)' }}
          onClick={handleCloseModal}
        >
          {/* Close Button */}
          <button
            onClick={handleCloseModal}
            className="absolute top-6 right-6 md:top-10 md:right-10 z-50 p-3 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300 group"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Modal Content */}
          <div
            ref={modalContentRef}
            className="modal-content relative w-full max-w-6xl max-h-full overflow-hidden rounded-2xl opacity-0 scale-92"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Container */}
            <div className="modal-image relative h-[55vh] md:h-[65vh] w-full overflow-hidden bg-[#0a0a0a]">
              <div
                className="modal-image-inner absolute inset-0 w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${activeItem.image})`,
                }}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/30 to-transparent" />
            </div>

            {/* Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
              {/* Number */}
              <span
                className="modal-number inline-block text-sm font-semibold mb-4"
                style={{ color: activeItem.accent }}
              >
                0{activeItem.id}
              </span>

              {/* Title */}
              <h3 className="modal-title text-white font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-3">
                {activeItem.title}
              </h3>

              {/* Subtitle */}
              <p className="modal-subtitle text-gray-300 text-base md:text-lg font-medium tracking-wide mb-4">
                {activeItem.subtitle}
              </p>

              {/* Description */}
              <p className="modal-description text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl mb-8">
                {activeItem.description}
              </p>

              {/* CTA Button */}
              <a
                href={`/${activeItem.title.toLowerCase()}`}
                className="modal-cta group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
              >
                <span className="text-white text-sm font-semibold tracking-wide uppercase">
                  Discover More
                </span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300"
                  style={{ color: activeItem.accent }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
