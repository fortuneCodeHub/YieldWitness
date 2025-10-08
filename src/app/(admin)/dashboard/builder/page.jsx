"use client";

import { Suspense } from "react";
import ElementorPage from "@/components/ui/BuilderContent";

export default function ElementorPageWrapper() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <ElementorPage />
      </Suspense>
    );
}


