"use client";

import { useState } from "react";
import { Edit2, EyeOff, CheckCircle2, Trash2, Filter, ChevronDown, List as ListIcon } from "lucide-react";

type ListingStatus = "public" | "hidden" | "expired" | "sold" | "rejected" | "pending";

interface PropertyListing {
  id: string;
  title: string;
  price: string;
  address: string;
  image: string;
  status: ListingStatus;
  date: string;
  views: number;
}

const statusConfig: Record<ListingStatus, { label: string; color: string; bg: string }> = {
  public: { label: "Đang hiển thị", color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
  hidden: { label: "Đã ẩn", color: "text-slate-500", bg: "bg-slate-100 dark:bg-slate-800" },
  expired: { label: "Hết hạn", color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20" },
  sold: { label: "Đã bán/xong", color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
  rejected: { label: "Bị từ chối", color: "text-red-600", bg: "bg-red-50 dark:bg-red-900/20" },
  pending: { label: "Chờ phê duyệt", color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-900/20" },
};

export default function MyListingsSection() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filter, setFilter] = useState<ListingStatus | "all">("all");

  const [listings, setListings] = useState<PropertyListing[]>([
    {
      id: "FIN26001",
      title: "Căn hộ Vinhomes Grand Park phân khu The Beverly",
      price: "5.2 tỷ",
      address: "Quận 9, TP. Hồ Chí Minh",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80",
      status: "public",
      date: "10/03/2026",
      views: 124,
    },
    {
      id: "FIN26002",
      title: "Nhà phố liên kế Lavila Nam Sài Gòn",
      price: "12.5 tỷ",
      address: "Nhà Bè, TP. Hồ Chí Minh",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80",
      status: "pending",
      date: "11/03/2026",
      views: 0,
    },
    {
      id: "FIN26003",
      title: "Đất nền khu dân cư Him Lam Tân Hưng",
      price: "18 tỷ",
      address: "Quận 7, TP. Hồ Chí Minh",
      image: "https://images.unsplash.com/photo-1500382017468-9049fee74a62?auto=format&fit=crop&w=400&q=80",
      status: "sold",
      date: "01/03/2026",
      views: 256,
    },
  ]);

  const filteredListings = filter === "all" ? listings : listings.filter((l) => l.status === filter);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-visible relative">
      {/* Synchronized Header */}
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4 rounded-t-xl z-20 relative bg-white dark:bg-slate-900">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">Tin đăng của tôi</h1>
          <p className="text-sm text-slate-500 mt-1">Quản lý các bất động sản bạn đã đăng tin.</p>
        </div>

        {/* Ultra-compact Filter Button */}
        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-black border transition-all duration-200 ${
              isFilterOpen 
                ? "bg-emerald-600 text-white border-emerald-600 shadow-md" 
                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-white border-slate-200 dark:border-slate-700 hover:border-emerald-500"
            }`}
          >
            <Filter className="size-3" />
            <span className="uppercase tracking-lighter">
              {filter === 'all' ? 'Tất cả' : statusConfig[filter].label}
            </span>
            <ChevronDown className={`size-3 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
          </button>

          {isFilterOpen && (
            <>
              <div 
                className="fixed inset-0 z-[60]" 
                onClick={() => setIsFilterOpen(false)}
              ></div>
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg shadow-2xl z-[70] overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right ring-1 ring-black/5">
                <div className="p-1 space-y-0.5">
                  <button
                    onClick={() => { setFilter("all"); setIsFilterOpen(false); }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-md text-[11px] font-bold transition-all ${
                      filter === "all" 
                        ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400" 
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span>Tất cả trạng thái</span>
                    {filter === "all" && <CheckCircle2 className="size-3" />}
                  </button>
                  <div className="h-px bg-slate-50 dark:bg-slate-800 my-1 mx-1"></div>
                  {(Object.keys(statusConfig) as ListingStatus[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => { setFilter(s); setIsFilterOpen(false); }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-md text-[11px] font-bold transition-all ${
                        filter === s 
                          ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400" 
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className={`size-1.5 rounded-full ${statusConfig[s].bg.replace('bg-', 'bg-')}`}></span>
                        {statusConfig[s].label}
                      </span>
                      {filter === s && <CheckCircle2 className="size-3" />}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Listing Content */}
      <div className="p-4 md:p-6 overflow-visible relative z-10 min-h-[400px]">
        <div className="space-y-4">
          {filteredListings.length > 0 ? (
            filteredListings.map((property) => (
              <div
                key={property.id}
                className="group flex flex-col sm:flex-row gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:border-emerald-200 dark:hover:border-emerald-900/30 hover:shadow-md transition-all"
              >
                {/* Image */}
                <div className="relative w-full sm:w-32 h-24 shrink-0 rounded-md overflow-hidden bg-slate-100">
                  <img src={property.image} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className={`absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[9px] font-black uppercase ${statusConfig[property.status].bg} ${statusConfig[property.status].color} backdrop-blur-md`}>
                    {statusConfig[property.status].label}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-1">
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors line-clamp-1 text-xs md:text-sm">{property.title}</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1 line-clamp-1">{property.address}</p>
                    </div>
                    <span className="text-emerald-600 font-black text-xs whitespace-nowrap">{property.price}</span>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3 text-[9px] text-slate-400">
                      <span>Mã: <span className="text-slate-600 dark:text-white font-bold">{property.id}</span></span>
                      <span className="max-sm:hidden">Xem: <span className="text-slate-600 dark:text-white font-bold">{property.views}</span></span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-md transition-all" title="Sửa">
                        <Edit2 className="size-3.5" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-md transition-all" title="Ẩn tin">
                        <EyeOff className="size-3.5" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-all" title="Đã bán">
                        <CheckCircle2 className="size-3.5" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-all" title="Xóa">
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-24 flex flex-col items-center text-center">
              <div className="size-12 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 mb-4">
                <ListIcon className="size-6" />
              </div>
              <h5 className="font-bold text-slate-900 dark:text-white text-sm">Không tìm thấy tin đăng</h5>
              <p className="text-[11px] text-slate-500 mt-1 uppercase tracking-wider">Trạng thái này chưa có dữ liệu</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
