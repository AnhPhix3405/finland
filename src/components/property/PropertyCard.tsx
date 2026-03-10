"use client";

import { MapPin, Heart } from "lucide-react";
import Link from "next/link";

export interface PropertyCardProps {
  id: string;
  image: string;
  price: string;
  area: string;
  title: string;
  location: string;
  tags: string[];
  isPriority?: boolean;
  href?: string;
}

export function PropertyCard({
  id,
  image,
  price,
  area,
  title,
  location,
  tags,
  isPriority = false,
  href = "#",
}: PropertyCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden rounded-sm hover:shadow-lg transition-shadow flex flex-col h-full group/card">
      {/* Target Link Wrapper for Image */}
      <Link href={href} className="relative aspect-video block overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center rounded-t-sm transition-transform duration-500 group-hover/card:scale-105"
          style={{ backgroundImage: `url('${image}')` }}
          role="img"
          aria-label={title}
        />
        {isPriority && (
          <div className="absolute bottom-2 left-2 bg-slate-900/70 text-white text-[10px] px-2 py-0.5 rounded-sm uppercase tracking-wide z-10">
            Tin ưu tiên
          </div>
        )}
      </Link>

      <div className="relative">
        <button
          className="absolute -top-12 right-3 bg-white/90 dark:bg-slate-900/80 p-2 rounded-full hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-all group shadow-sm z-20 active:scale-90"
          aria-label="Lưu tin bất động sản"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Heart className="w-5 h-5 text-slate-400 group-hover:text-red-500 transition-colors" aria-hidden="true" />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-xl font-black text-red-600 tracking-tighter">{price}</span>
          <span className="text-slate-500 font-bold text-sm">
            • {area}
          </span>
        </div>

        <Link href={href}>
          <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug mb-2 hover:text-emerald-600 transition-colors">
            {title}
          </h3>
        </Link>

        <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs mb-3 font-medium">
          <MapPin className="w-4 h-4 mr-1 text-emerald-600" aria-hidden="true" />
          {location}
        </div>

        <div className="flex flex-wrap gap-2 mb-4 mt-auto">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded-sm border border-slate-200 dark:border-slate-600"
            >
              #{tag}
            </span>
          ))}
        </div>

        <Link 
          href={href}
          className="w-full mt-auto py-2.5 border border-slate-200 dark:border-slate-700 text-[10px] font-black hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-all rounded-sm uppercase tracking-[0.2em] text-center"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
}
