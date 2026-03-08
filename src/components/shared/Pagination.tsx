import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
}

export function Pagination({ currentPage = 1, totalPages = 10 }: PaginationProps) {
  return (
    <div className="flex items-center justify-center mt-12 gap-1">
      <button
        className="w-10 h-10 flex items-center justify-center rounded-sm border border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        aria-label="Trang trước"
      >
        <ChevronLeft className="w-5 h-5" aria-hidden="true" />
      </button>
      <button
        className="w-10 h-10 flex items-center justify-center rounded-sm bg-emerald-600 text-white font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
        aria-label="Trang 1, trang hiện tại"
        aria-current="page"
      >
        1
      </button>
      <button
        className="w-10 h-10 flex items-center justify-center rounded-sm border border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        aria-label="Trang 2"
      >
        2
      </button>
      <button
        className="w-10 h-10 flex items-center justify-center rounded-sm border border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        aria-label="Trang 3"
      >
        3
      </button>
      <span className="w-10 h-10 flex items-center justify-center text-slate-500 dark:text-slate-400">
        ...
      </span>
      <button
        className="w-10 h-10 flex items-center justify-center rounded-sm border border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        aria-label="Trang 10"
      >
        10
      </button>
      <button
        className="w-10 h-10 flex items-center justify-center rounded-sm border border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        aria-label="Trang tiếp theo"
      >
        <ChevronRight className="w-5 h-5" aria-hidden="true" />
      </button>
    </div>
  );
}
