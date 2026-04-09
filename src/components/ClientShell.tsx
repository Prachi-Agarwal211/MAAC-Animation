"use client";
import { useState, useEffect } from "react";
import ContactModal from "@/components/ContactModal";
import { useUIStore } from "@/lib/store";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [showModal, setShowModal] = useState(false);
  const setScroll = useUIStore((state) => state.setScroll);

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setScroll]);

  useEffect(() => {
    const shown = sessionStorage.getItem("maac_modal_shown");
    if (shown) return;

    // Show modal AFTER intro sweep completes (not before!)
    const handler = () => {
      // Longer delay on mobile (8s) vs desktop (2s) for better UX
      const delay = window.innerWidth < 768 ? 8000 : 2000;
      setTimeout(() => {
        setShowModal(true);
        sessionStorage.setItem("maac_modal_shown", "1");
      }, delay);
    };
    window.addEventListener("maac:intro_revealed", handler, { once: true });
    return () => window.removeEventListener("maac:intro_revealed", handler);
  }, []);

  return (
    <>
      {children}
      <ContactModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
