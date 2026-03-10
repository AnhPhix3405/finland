"use client";

import { Metadata } from "next";
import Link from "next/link";
import { PropertyFilter } from "../../../components/property/PropertyFilter";
import { Pagination } from "../../../components/shared/Pagination";
import { MapPin, ChevronRight, Building2, ArrowRight } from "lucide-react";

export default function ProjectList() {
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen pt-6 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Optimized Navigation */}
        <div className="flex items-center gap-3 mb-6">
          <Link 
            href="/"
            className="flex items-center gap-1.5 text-slate-500 hover:text-emerald-600 transition-colors text-[11px] font-bold group"
          >
            <span>Trang chủ</span>
          </Link>
          
          <div className="w-px h-2.5 bg-slate-200 dark:bg-slate-800" />

          <nav className="flex items-center gap-2 text-[11px] text-slate-400">
            <span>Dự án</span>
            <ChevronRight className="size-3" />
            <span className="text-slate-600 dark:text-slate-200 font-medium whitespace-nowrap">Danh sách dự án</span>
          </nav>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none mb-2">
              DANH SÁCH DỰ ÁN
            </h1>
            <p className="text-sm text-slate-500 font-medium">Khám phá không gian sống đẳng cấp từ các dự án hàng đầu</p>
          </div>
          <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800 hidden md:block mb-4 mx-8" />
        </div>
        
        <div className="mb-10">
          <PropertyFilter hidePrice={true} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_PROJECTS.map((project, idx) => (
            <Link 
              key={idx}
              href="/du-an/demo"
              className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex flex-col hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 rounded-xl overflow-hidden"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  src={project.image}
                />
                <div className="absolute top-4 left-4">
                  <span className={`text-[9px] font-black px-2.5 py-1.5 rounded uppercase tracking-widest text-white shadow-lg ${project.statusColor}`}>
                    {project.status}
                  </span>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors leading-snug">
                  {project.title}
                </h3>
                <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mb-4 font-medium">
                  <MapPin className="size-3.5 mr-1.5 text-emerald-500" />
                  {project.location}
                </div>
                
                <div className="mt-auto flex items-center justify-between pt-5 border-t border-slate-50 dark:border-slate-800">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Quy mô</span>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{project.area}</span>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-black text-emerald-600 group-hover:translate-x-1 transition-transform">
                    XEM CHI TIẾT
                    <ArrowRight className="size-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16">
          <Pagination />
        </div>
      </div>
    </div>
  );
}

const MOCK_PROJECTS = [
  {
    title: "Vinhomes Ocean Park 3",
    location: "Văn Giang, Hưng Yên",
    area: "294 ha",
    status: "Đang mở bán",
    statusColor: "bg-emerald-600",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDegODUZ6REUfZ6wkYPWzTvrGzNKwi9JzombB3Jm48DAIJ6gU_Hcip9JPHZawF2rOio2uMXLrU1OxdeQEccJN8BVYW3aLazAcmZuCXbn17s81oYARqRzA-VpwhKIjoRnPYKUdiVh2LRe0G7cZ-0UnMSkC8uZokSoX-EuTpK-RoVvRFwTlG0oEnHn3JFa5oYq9rSfn0VyqzW2enpvmLRt07e7y42Ow2L-dFD6LKIXCOG6f-ZQ2E3R6496POzsn00YuELKLh2o2H1XF1O"
  },
  {
    title: "Khu đô thị sinh thái Aqua City",
    location: "Biên Hòa, Đồng Nai",
    area: "1000 ha",
    status: "Sắp bàn giao",
    statusColor: "bg-blue-600",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsMeEiB-shjejI2MZohhnY1E4ZqZviwN4BtQM5XyfoKFguCaoH4EIbZMQhQGIDbelvkQNbHOY7ok5w3aKy5kDO-GK9fwG32LrAi64RwxkqKX31C8IvFMjpwS6DuzYPfUJ9DkoeXM7dgN5aPywVa8Oaz0vzCZ7w5zzNzU50GzO_gJdjiajPHmAVDuygloybiE3FCYNujYDXPICxDdTh0rs4ZxLWLVqsy3L7PfTtoXfL_9-5QMKrut-C2w0YkFBF1IDkxczDnFMBsPTX"
  },
  {
    title: "Masteri Centre Point",
    location: "Quận 9, TP.HCM",
    area: "7.07 ha",
    status: "Đã bàn giao",
    statusColor: "bg-slate-600",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9b2hFSFxaOuDlxVhafP7OzZUSTbxay9I4hadpxI_oHuHGJcdagL-ls1TQ57H7kADtmWdGELHQWeDxwJN0LEpJw2evOuCDRd1VyhAxpg0B3pZDd0SKPM4Z9a_72kjBO46KWmTzCh0ceySePMso8k_Gs3fxJy9TWc80-HIKCfNRugpvfUXiyTQM5TcdjVlHj-Q8GIuvoFEvAJvK6k5j44g-lRwsbnA2ILZutTVtyEtB67anekCfI14HlaogL0PbtR9mgdgf1dGYoTbY"
  },
  {
    title: "The Global City",
    location: "TP. Thủ Đức, TP.HCM",
    area: "117 ha",
    status: "Đang mở bán",
    statusColor: "bg-emerald-600",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDegODUZ6REUfZ6wkYPWzTvrGzNKwi9JzombB3Jm48DAIJ6gU_Hcip9JPHZawF2rOio2uMXLrU1OxdeQEccJN8BVYW3aLazAcmZuCXbn17s81oYARqRzA-VpwhKIjoRnPYKUdiVh2LRe0G7cZ-0UnMSkC8uZokSoX-EuTpK-RoVvRFwTlG0oEnHn3JFa5oYq9rSfn0VyqzW2enpvmLRt07e7y42Ow2L-dFD6LKIXCOG6f-ZQ2E3R6496POzsn00YuELKLh2o2H1XF1O"
  },
  {
    title: "Vinhomes Smart City",
    location: "Nam Từ Liêm, Hà Nội",
    area: "280 ha",
    status: "Đã bàn giao",
    statusColor: "bg-slate-600",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsMeEiB-shjejI2MZohhnY1E4ZqZviwN4BtQM5XyfoKFguCaoH4EIbZMQhQGIDbelvkQNbHOY7ok5w3aKy5kDO-GK9fwG32LrAi64RwxkqKX31C8IvFMjpwS6DuzYPfUJ9DkoeXM7dgN5aPywVa8Oaz0vzCZ7w5zzNzU50GzO_gJdjiajPHmAVDuygloybiE3FCYNujYDXPICxDdTh0rs4ZxLWLVqsy3L7PfTtoXfL_9-5QMKrut-C2w0YkFBF1IDkxczDnFMBsPTX"
  },
  {
    title: "Khu đô thị sinh thái Ecopark",
    location: "Văn Giang, Hưng Yên",
    area: "500 ha",
    status: "Đang mở bán",
    statusColor: "bg-emerald-600",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9b2hFSFxaOuDlxVhafP7OzZUSTbxay9I4hadpxI_oHuHGJcdagL-ls1TQ57H7kADtmWdGELHQWeDxwJN0LEpJw2evOuCDRd1VyhAxpg0B3pZDd0SKPM4Z9a_72kjBO46KWmTzCh0ceySePMso8k_Gs3fxJy9TWc80-HIKCfNRugpvfUXiyTQM5TcdjVlHj-Q8GIuvoFEvAJvK6k5j44g-lRwsbnA2ILZutTVtyEtB67anekCfI14HlaogL0PbtR9mgdgf1dGYoTbY"
  },
];
