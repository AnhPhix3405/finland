import { MapPin, ChevronDown, ArrowUpDown, Filter } from "lucide-react";

interface PropertyFilterProps {
  hidePrice?: boolean;
}

export function PropertyFilter({ hidePrice = false }: PropertyFilterProps) {
  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-sm shadow-sm border border-slate-200 dark:border-slate-800 flex flex-wrap gap-4 items-center mb-8">
      <div className="flex-1 min-w-[200px]">
        <div className="relative">
          <button className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 border border-slate-300 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700 rounded-sm text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">
            <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <MapPin className="text-emerald-600 w-5 h-5" aria-hidden="true" />
              Toàn quốc
            </span>
            <ChevronDown className="text-slate-400 w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="flex-1 min-w-[200px]">
        <button className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 border border-slate-300 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700 rounded-sm text-sm font-medium transition-colors text-slate-700 dark:text-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">
          Loại hình
          <ChevronDown className="text-slate-400 w-4 h-4" aria-hidden="true" />
        </button>
      </div>
      {!hidePrice && (
        <div className="flex-1 min-w-[200px]">
          <button className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 border border-slate-300 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700 rounded-sm text-sm font-medium transition-colors text-slate-700 dark:text-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">
            Mức giá
            <ChevronDown className="text-slate-400 w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      )}
      <div className="flex-1 min-w-[150px]">
        <button className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 border border-slate-300 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700 rounded-sm text-sm font-medium transition-colors text-slate-700 dark:text-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">
          Sắp xếp
          <ArrowUpDown className="text-slate-400 w-4 h-4" aria-hidden="true" />
        </button>
      </div>
      <button className="bg-emerald-600 text-white font-bold px-8 py-2.5 rounded-sm hover:bg-emerald-700 transition-colors flex items-center gap-2 text-sm shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2">
        <Filter className="w-4 h-4" aria-hidden="true" />
        Lọc
      </button>
    </div>
  );
}
