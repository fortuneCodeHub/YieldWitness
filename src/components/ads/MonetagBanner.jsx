"use client";

import { useEffect, useRef } from 'react';

export default function MonetagBanner({ zone }) {
  // 1. Create a ref to attach to the specific div
  const adContainerRef = useRef(null);

  useEffect(() => {
    // Ensure we are in a browser environment and the ref is attached
    if (adContainerRef.current) {
      // Clear existing content if any (useful for HMR)
      adContainerRef.current.innerHTML = ''; 

      // 2. Create the script element
      const script = document.createElement('script');
      script.dataset.zone = zone;
      // Use the correct Monetag domain, ensure it's standard or provided by Monetag support
      script.src = 'https://al5sm.com/tag.min.js'; 
      script.async = true;

      // 3. Append the script ONLY to the container div
      adContainerRef.current.appendChild(script);

      // Optional: Cleanup function if the component is unmounted
      return () => {
        // You might need a more robust way to remove the ad if it loads its own elements, 
        // but removing the script tag itself is a start.
        if (adContainerRef.current) {
            adContainerRef.current.innerHTML = '';
        }
      };
    }
  }, [zone]); // Re-run if the zone prop changes

  // 4. Attach the ref to the specific div that will hold the ad content
  return (
    <div ref={adContainerRef} className="monetag-banner-container" style={{ minHeight: '100px' }}>
      {/* Optional: Add a loading placeholder */}
      {/* Loading banner ad... */}
    </div>
  );
}
