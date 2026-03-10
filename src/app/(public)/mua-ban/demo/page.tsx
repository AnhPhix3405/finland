"use client";

import { PropertyDetail } from "@/src/components/property/PropertyDetail";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function MuaBanDemoPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-6 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Premium Detail Content */}
        <PropertyDetail type="mua-ban" isDemo={true} />
      </div>
    </div>
  );
}
