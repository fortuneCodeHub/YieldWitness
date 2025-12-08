"use client";

import Script from "next/script";

export default function MonetagBanner({ zone }) {
  return (
    <>
      <div className="monetag-banner-container">
        <Script
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(s){
                s.dataset.zone='${zone}';
                s.src='https://al5sm.com/tag.min.js';
              })(document.body.appendChild(document.createElement('script')))
            `,
          }}
        />
      </div>
    </>
  );
}
