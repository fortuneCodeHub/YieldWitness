"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { pageview } from "@/utils/gtag";

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    pageview(pathname);
  }, [pathname]);

  return null;
}
