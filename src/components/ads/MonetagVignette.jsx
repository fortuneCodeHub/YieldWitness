"use client";

import { useEffect, useRef } from "react";

export default function MonetagVignette({ zone }) {
  const vignetteContainerRef = useRef(null);

  useEffect(() => {
    if (!vignetteContainerRef.current) return;

    // Clear previous content if any
    vignetteContainerRef.current.innerHTML = "";

    // Create the Vignette script
    const script = document.createElement("script");
    script.dataset.zone = zone;
    // Choose the correct Monetag Vignette source
    script.src =
      zone === "10292653"
        ? "https://groleegni.net/vignette.min.js"
        : "https://gizokraijaw.net/vignette.min.js";
    script.async = true;

    // Append only to this container
    vignetteContainerRef.current.appendChild(script);

    // Cleanup on unmount
    return () => {
      if (vignetteContainerRef.current) {
        vignetteContainerRef.current.innerHTML = "";
      }
    };
  }, [zone]);

  return (
    <div
      ref={vignetteContainerRef}
      className="monetag-vignette-container"
      style={{ minHeight: "1px" }} // Vignette ads overlay, so height can be small
    >
      {/* Optional placeholder */}
      {/* Vignette ad will appear here on public URL */}
    </div>
  );
}
