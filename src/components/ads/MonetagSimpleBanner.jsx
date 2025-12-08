"use client";

import Script from "next/script";

export default function MonetagSimpleBanner({ zone }) {
  return (
    <Script
      src={`https://3nbf4.com/act/files/tag.min.js?z=${zone}`}
      async
    />
  );
}
