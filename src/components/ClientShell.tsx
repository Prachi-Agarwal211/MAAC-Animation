"use client";
import { useState, useEffect } from "react";
import ContactModal from "@/components/ContactModal";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Only show once per session
    const shown = sessionStorage.getItem("maac_modal_shown");
    if (shown) return;

    // Listen for preloader completion signal
    const handler = () => {
      setTimeout(() => {
        setShowModal(true);
        sessionStorage.setItem("maac_modal_shown", "1");
      }, 1500);
    };
    window.addEventListener("maac:preloader_done", handler, { once: true });
    return () => window.removeEventListener("maac:preloader_done", handler);
  }, []);

  return (
    <>
      {children}
      <ContactModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
