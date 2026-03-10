"use client";

import { PropertyDetail } from "@/src/components/property/PropertyDetail";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function ChoThueDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="mb-12">
          <button 
            onClick={() => router.back()}
            className="group inline-flex items-center gap-3 text-slate-400 hover:text-emerald-600 transition-all text-[10px] font-black uppercase tracking-[0.3em] w-fit"
          >
            <div className="p-2 rounded-full border border-slate-100 dark:border-slate-800 group-hover:border-emerald-500/30 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/10">
              <ArrowLeft className="size-4 shrink-0" />
            </div>
            Quay lại danh sách
          </button>
        </div>

        <PropertyDetail type="cho-thue" isDemo={id === "demo"} />
      </div>
    </div>
  );
}
