"use client";

import { useEffect } from "react";

export default function ScrollToTop() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      // Respect anchor links: scroll to the element instead of forcing top
      const id = decodeURIComponent(hash.slice(1));
      const el = document.getElementById(id);
      if (el) {
        // Delay to ensure layout is ready
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
        return;
      }
    }
    // If no hash, scroll to top on initial load
    window.scrollTo(0, 0);
  }, []);

  return null; // This component doesn't render anything
} 