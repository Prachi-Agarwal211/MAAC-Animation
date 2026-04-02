"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function FreeDemoBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("maac-demo-bar-dismissed");
    if (!dismissed) {
      setVisible(true);
      document.body.classList.add("demo-bar-visible");
    }
    return () => {
      document.body.classList.remove("demo-bar-visible");
    };
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    localStorage.setItem("maac-demo-bar-dismissed", "true");
    document.body.classList.remove("demo-bar-visible");
  };

  if (!visible) return null;

  return (
    <div className="demo-bar" role="banner">
      <span className="hidden sm:inline">🎓 Free Demo Class This Weekend — Limited Seats! </span>
      <span className="sm:hidden">🎓 Free Demo Class! </span>
      <a
        href="#apply"
        className="ml-1 underline underline-offset-2 hover:no-underline font-bold"
      >
        Book Now →
      </a>
      <button
        onClick={handleDismiss}
        className="demo-bar__dismiss"
        aria-label="Dismiss announcement"
      >
        <X size={16} />
      </button>
    </div>
  );
}
