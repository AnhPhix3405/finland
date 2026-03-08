import { MapPin, Heart } from "lucide-react";

export interface PropertyCardProps {
  id: string;
  image: string;
  price: string;
  area: string;
  title: string;
  location: string;
  tags: string[];
  isPriority?: boolean;
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
}: PropertyCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden rounded-sm hover:shadow-lg transition-shadow flex flex-col h-full">
      <div className="relative aspect-video">
        <div
          className="w-full h-full bg-cover bg-center rounded-t-sm"
          style={{ backgroundImage: `url('${image}')` }}
          role="img"
          aria-label={title}
        />
        <button
          className="absolute top-3 right-3 bg-white/80 dark:bg-slate-900/50 p-1.5 rounded-full hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors group"
          aria-label="Lưu tin bất động sản"
        >
          <Heart className="w-5 h-5 text-slate-400 group-hover:text-red-500 transition-colors" aria-hidden="true" />
        </button>
        {isPriority && (
          <div className="absolute bottom-2 left-2 bg-slate-900/70 text-white text-[10px] px-2 py-0.5 rounded-sm uppercase tracking-wide">
            Tin ưu tiên
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-xl font-black text-red-600">{price}</span>
          <span className="text-slate-500 font-semibold text-sm">
            • {area}
          </span>
        </div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug mb-2 hover:text-emerald-600 cursor-pointer transition-colors">
          {title}
        </h3>
        <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs mb-3">
          <MapPin className="w-4 h-4 mr-1" aria-hidden="true" />
          {location}
        </div>
        <div className="flex flex-wrap gap-2 mb-4 mt-auto">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300 text-[10px] font-bold px-2 py-0.5 rounded-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
        <button className="w-full mt-auto py-2 border border-slate-300 dark:border-slate-600 text-sm font-semibold hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 dark:hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors rounded-sm uppercase tracking-tight">
          Xem chi tiết
        </button>
      </div>
    </div>
  );
}
