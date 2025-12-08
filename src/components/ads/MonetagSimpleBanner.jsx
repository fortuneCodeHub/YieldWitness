"use client";

import { useEffect, useRef } from "react";

export default function MonetagSimpleBanner({ zone }) {
  const adContainerRef = useRef(null);

  useEffect(() => {
    if (!adContainerRef.current) return;

    // Clear previous content (useful during HMR or re-renders)
    adContainerRef.current.innerHTML = "";

    // Create the script element
    const script = document.createElement("script");
    script.src = `https://3nbf4.com/act/files/tag.min.js?z=${zone}`;
    script.async = true;

    // Append only to this container
    adContainerRef.current.appendChild(script);

    // Optional cleanup
    return () => {
      if (adContainerRef.current) {
        adContainerRef.current.innerHTML = "";
      }
    };
  }, [zone]);

  return (
    <div
      ref={adContainerRef}
      className="monetag-simple-banner-container"
      style={{ minHeight: "100px" }}
    >
      {/* Optional placeholder during local development */}
      {/* Loading banner ad... */}
    </div>
  );
}
