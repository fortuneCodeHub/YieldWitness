"use client";

import { useEffect, useRef } from "react";

export default function MonetagBanner({ zone }) {
  const adContainerRef = useRef(null);

  useEffect(() => {
    if (!adContainerRef.current) return;

    adContainerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.dataset.zone = zone;
    script.src = "https://al5sm.com/tag.min.js";
    script.async = true;

    adContainerRef.current.appendChild(script);

    return () => {
      if (adContainerRef.current) adContainerRef.current.innerHTML = "";
    };
  }, [zone]);

//   return (
//     <div
//       ref={adContainerRef}
//       className="monetag-banner-container"
//       style={{ minHeight: "100px", color: "red" }}
//     >
//       {/* Optional: placeholder */}
//     </div>
//   );
}
