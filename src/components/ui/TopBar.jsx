"use client";

import { useEffect, useState } from "react";
import LiveTicker from "./LiveTicker";

export default function TopBar() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const now = new Date();
    setDate(
      now.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    );
  }, []);

  return (
    <div className="bg-gray-100 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-8 text-xs text-[#64748B]">
          {/* Left: ticker */}
          <div className="overflow-hidden relative w-full max-w-[250px] sm:max-w-xs md:max-w-sm">
            <div className="whitespace-nowrap animate-marquee">
              {/* <LiveTicker /> */}
              <span className="mr-6">S&amp;P 500 +0.6%</span> 
              <span className="mr-6">BTC -1.2%</span> 
              <span className="mr-6">NASDAQ +0.9%</span> 
              <span className="mr-6">ETH +0.5%</span>
            </div>
          </div>

          {/* Right: date + links */}
          <div className="flex items-center gap-4">
            <span className="hidden sm:block">{date}</span>
            <a href="/access" className="hover:text-[#0EA5A4]">
              Access
            </a>
            <a
              href="/"
              className="text-[#0EA5A4] font-medium hover:underline"
            >
              Latest Post
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
