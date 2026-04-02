"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface FloatingCTAProps {
  whatsapp: string;
  phone: string;
}

export default function FloatingCTA({ whatsapp, phone }: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const whatsappRef = useRef<HTMLAnchorElement>(null);
  const callRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 200;
      setIsVisible(show);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isVisible && containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "expo.out" }
      );
    }
  }, [isVisible]);

  const handleMouseEnter = (element: HTMLAnchorElement | null) => {
    if (element) {
      gsap.to(element, { scale: 1.1, duration: 0.3, ease: "back.out(1.2)" });
    }
  };

  const handleMouseLeave = (element: HTMLAnchorElement | null) => {
    if (element) {
      gsap.to(element, { scale: 1, duration: 0.3, ease: "expo.out" });
    }
  };

  const whatsappUrl = `https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}?text=Hi%20MAAC%20Jaipur`;
  const callUrl = `tel:${phone.replace(/[^0-9+]/g, "")}`;

  return (
    <div
      ref={containerRef}
      className={`fixed bottom-6 right-6 z-[9000] flex flex-col items-center gap-3 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      } transition-opacity duration-300`}
    >
      {/* WhatsApp Button */}
      <a
        ref={whatsappRef}
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fab-pulse relative flex items-center justify-center w-[52px] h-[52px] rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Chat on WhatsApp"
        onMouseEnter={() => handleMouseEnter(whatsappRef.current)}
        onMouseLeave={() => handleMouseLeave(whatsappRef.current)}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382C17.119 14.205 15.397 13.351 15.073 13.234C14.749 13.117 14.514 13.058 14.279 13.409C14.044 13.76 13.367 14.555 13.161 14.789C12.956 15.023 12.751 15.052 12.398 14.876C12.045 14.7 10.917 14.328 9.57399 13.131C8.51599 12.188 7.80599 11.028 7.60099 10.677C7.39599 10.326 7.58699 10.138 7.76499 9.961C7.92299 9.803 8.11999 9.549 8.29799 9.343C8.47599 9.137 8.53499 8.989 8.65299 8.754C8.77099 8.519 8.71199 8.314 8.62299 8.137C8.53399 7.96 7.82199 6.216 7.52799 5.514C7.23999 4.834 6.94499 4.929 6.72199 4.929C6.52499 4.929 6.28999 4.928 6.05499 4.928C5.81999 4.928 5.43799 5.016 5.11399 5.369C4.78999 5.722 3.84699 6.607 3.84699 8.439C3.84699 10.271 5.17299 12.044 5.37799 12.307C5.58299 12.57 7.94499 16.345 11.659 17.843C14.836 19.123 15.219 18.987 15.661 18.945C16.522 18.863 18.344 17.917 18.726 16.845C19.108 15.773 19.108 14.885 18.99 14.679C18.872 14.473 18.637 14.414 18.284 14.238H17.472V14.382ZM12.045 20.929C12.045 20.929 12.044 20.929 12.043 20.929C12.043 20.929 12.042 20.929 12.041 20.929C12.041 20.929 12.04 20.929 12.039 20.929C11.952 20.929 11.865 20.928 11.778 20.926C9.84999 20.878 7.98899 20.251 6.31899 19.126C4.72599 18.052 3.40899 16.593 2.47299 14.885C1.56299 13.225 1.08999 11.366 1.08999 9.44999C1.09099 7.53399 1.56499 5.67499 2.47699 4.01499C3.41399 2.30699 4.73199 0.847992 6.32599 -0.226992C7.99699 -1.35299 9.85899 -1.98099 11.787 -2.02899C11.874 -2.03099 11.961 -2.03199 12.048 -2.03199C12.135 -2.03199 12.222 -2.03099 12.309 -2.02899C14.237 -1.98099 16.099 -1.35299 17.77 -0.226992C19.364 0.847992 20.682 2.30699 21.619 4.01499C22.531 5.67499 23.005 7.53399 23.006 9.44999C23.006 11.366 22.532 13.225 21.621 14.885C20.685 16.593 19.368 18.052 17.775 19.126C16.105 20.251 14.244 20.878 12.316 20.926C12.229 20.928 12.142 20.929 12.055 20.929H12.045V20.929Z" />
        </svg>
        <span className="absolute left-full ml-3 px-3 py-1.5 bg-white text-gray-900 text-sm font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          WhatsApp Us
        </span>
      </a>

      {/* Call Button */}
      <a
        ref={callRef}
        href={callUrl}
        className="fab-pulse relative flex items-center justify-center w-[52px] h-[52px] rounded-full bg-[#E31837] text-white shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Call us"
        onMouseEnter={() => handleMouseEnter(callRef.current)}
        onMouseLeave={() => handleMouseLeave(callRef.current)}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M22 16.92V19.92C22.0011 20.1986 21.9441 20.4742 21.8325 20.7294C21.7209 20.9846 21.5573 21.2137 21.3511 21.4038C21.1449 21.5939 20.9003 21.7414 20.6319 21.8378C20.3634 21.9342 20.0767 21.9775 19.79 21.965C16.7428 21.6407 13.8319 20.5924 11.29 18.905C8.91239 17.3259 6.91999 15.3335 5.34099 12.956C3.65197 10.4116 2.60361 7.49859 2.27999 4.45C2.26876 4.16375 2.31269 3.8773 2.40903 3.60915C2.50536 3.34101 2.65204 3.09689 2.84075 2.8906C3.02946 2.68431 3.25656 2.52004 3.50904 2.40718C3.76151 2.29432 4.03432 2.23513 4.31 2.233H7.31C7.80433 2.23086 8.28251 2.40573 8.65621 2.72565C9.02992 3.04557 9.27424 3.48926 9.34 3.98C9.43716 4.72089 9.62368 5.44915 9.89599 6.146C10.0528 6.53901 10.0007 6.98599 9.75699 7.336L8.36999 8.723C9.74875 11.1374 11.7626 13.1512 14.177 14.53L15.564 13.143C15.9141 12.8993 16.3611 12.8472 16.754 13.004C17.4509 13.2763 18.1791 13.4628 18.92 13.56C19.4146 13.629 19.8613 13.8777 20.1809 14.2563C20.5005 14.6349 20.6729 15.1184 20.67 15.616V16.92Z" />
        </svg>
        <span className="absolute left-full ml-3 px-3 py-1.5 bg-white text-gray-900 text-sm font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Call Now
        </span>
      </a>
    </div>
  );
}
