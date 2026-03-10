"use client";

import React from "react";
import { ProjectDetail } from "../../../../components/property/ProjectDetail";

export default function ProjectDemoPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-6 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProjectDetail isDemo={true} />
      </div>
    </div>
  );
}
