"use client";
import { useState, useEffect } from "react";
import ContactModal from "@/components/ContactModal";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const shown = sessionStorage.getItem("maac_modal_shown");
    if (shown) return;

    // Show modal AFTER intro sweep completes (not before!)
    const handler = () => {
      setTimeout(() => {
        setShowModal(true);
        sessionStorage.setItem("maac_modal_shown", "1");
      }, 2000); // 2 seconds after hero revealed
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
