"use client";

import { useState } from "react";
import { HeartOff, MapPin, Eye } from "lucide-react";
import Link from "next/link";

interface SavedListing {
  id: string;
  title: string;
  price: string;
  address: string;
  image: string;
  type: string;
}

export default function SavedListingsSection() {
  const [savedItems, setSavedItems] = useState<SavedListing[]>([
    {
      id: "1",
      title: "Căn hộ cao cấp Masteri Thảo Điền",
      price: "4.5 tỷ",
      address: "Quận 2, TP. Hồ Chí Minh",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80",
      type: "Căn hộ",
    },
    {
      id: "2",
      title: "Biệt thự đơn lập Khu đô thị Ciputra",
      price: "45 tỷ",
      address: "Tây Hồ, Hà Nội",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=400&q=80",
      type: "Biệt thự",
    },
    {
      id: "3",
      title: "Đất nền sổ đỏ Long Thành",
      price: "2.1 tỷ",
      address: "Long Thành, Đồng Nai",
      image: "https://images.unsplash.com/photo-1500382017468-9049fee74a62?auto=format&fit=crop&w=400&q=80",
      type: "Đất nền",
    },
  ]);

  const removeSaved = (id: string) => {
    setSavedItems(savedItems.filter((i) => i.id !== id));
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800">
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">Tin đã lưu</h1>
        <p className="text-sm text-slate-500 mt-1">Danh sách bất động sản bạn đã bookmark quan tâm.</p>
      </div>

      <div className="p-6">
        {savedItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedItems.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" title={item.title} />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full text-[10px] font-black text-emerald-600 uppercase tracking-wider shadow-sm">
                    {item.type}
                  </div>
                  <button
                    onClick={() => removeSaved(item.id)}
                    className="absolute top-3 right-3 p-2.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-red-500 hover:bg-red-500 hover:text-white rounded-full transition-all shadow-sm"
                    title="Bỏ lưu"
                  >
                    <HeartOff className="size-4" />
                  </button>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors line-clamp-1">{item.title}</h4>
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-2">
                    <MapPin className="size-3.5 text-emerald-500" />
                    {item.address}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-emerald-600 font-black text-lg">{item.price}</span>
                    <Link
                      href="#"
                      className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-emerald-600 transition-colors"
                    >
                      Chi tiết <Eye className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 flex flex-col items-center text-center">
            <div className="size-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 mb-6">
              <HeartOff className="size-10" />
            </div>
            <h5 className="font-bold text-slate-900 dark:text-white text-lg">Chưa có tin lưu nào</h5>
            <p className="text-sm text-slate-500 mt-2 max-w-xs">Hãy lưu lại những bất động sản bạn quan tâm để xem lại sau nhé.</p>
            <Link
              href="/"
              className="mt-8 px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 transition-all active:scale-95"
            >
              Khám phá ngay
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
