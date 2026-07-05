"use client";
import { useState, useEffect, useRef } from "react";
import ContactModal from "@/components/ContactModal";
import { useScroll } from "@/hooks/useScroll";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [showModal, setShowModal] = useState(false);
  const modalTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Use centralized scroll hook
  useScroll();

  useEffect(() => {
    const shown = sessionStorage.getItem("maac_modal_shown");
    if (shown) return;

    let triggered = false;

    const triggerModal = () => {
      if (triggered) return;
      triggered = true;
      const delay = window.innerWidth < 768 ? 1400 : 900;
      modalTimerRef.current = setTimeout(() => {
        setShowModal(true);
        sessionStorage.setItem("maac_modal_shown", "1");
      }, delay);
    };

    window.addEventListener("maac:intro_revealed", triggerModal, { once: true });
    
    // Fallback if not on homepage (where intro_revealed might not fire)
    const fallbackTimer = setTimeout(triggerModal, 3000);

    return () => {
      window.removeEventListener("maac:intro_revealed", triggerModal);
      clearTimeout(fallbackTimer);
      if (modalTimerRef.current) clearTimeout(modalTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const openModal = () => setShowModal(true);
    window.addEventListener("maac:open_contact_modal", openModal);
    return () => {
      window.removeEventListener("maac:open_contact_modal", openModal);
    };
  }, []);

  return (
    <>
      {children}
      <ContactModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
