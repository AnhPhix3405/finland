"use client";

import { useState } from "react";
import RichTextEditor from "../ui/TipTap";
import { Camera, Plus, X, Check, Video } from "lucide-react";

interface ListingFormProps {
  onSuccess?: () => void;
}

export function ListingForm({ onSuccess }: ListingFormProps) {
  const [transactionType, setTransactionType] = useState<"mua-ban" | "cho-thue">("mua-ban");
  const [propertyType, setPropertyType] = useState("");
  const [selectedHashTags, setSelectedHashTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [description, setDescription] = useState("");
  
  const propertyTypes = [
    { id: "nha-pho", label: "Nhà phố" },
    { id: "chung-cu", label: "Chung cư" },
    { id: "dat-nen", label: "Đất nền" },
    { id: "biet-thu", label: "Biệt thự" },
    { id: "kho-xuong", label: "Kho xưởng" },
    { id: "van-phong", label: "Văn phòng" },
    { id: "nha-tro", label: "Nhà trọ" },
    { id: "shophouse", label: "Shophouse" },
  ];

  const isApartment = propertyType === "chung-cu";
  const isLand = propertyType === "dat-nen";
  const isHouse = ["nha-pho", "biet-thu", "shophouse", "nha-tro"].includes(propertyType);
  const isOffice = ["van-phong", "kho-xuong"].includes(propertyType);

  const showBedrooms = isHouse || isApartment;
  const showFloors = isHouse || isOffice;
  const showDimensions = !isApartment;

  const addTag = () => {
    const tag = tagInput.trim().replace(/^#/, "");
    if (tag && !selectedHashTags.includes(tag)) {
      setSelectedHashTags([...selectedHashTags, tag]);
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setSelectedHashTags(selectedHashTags.filter(t => t !== tag));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); onSuccess?.(); }}>
      {/* 1. Loại giao dịch & Loại BĐS */}
      <section className="space-y-6">
        <h4 className="text-sm font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-2">
          <span className="size-2 bg-emerald-600 rounded-full"></span>
          Thông tin cơ bản
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              Loại giao dịch <span className="text-red-500">*</span>
            </label>
            <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <button
                type="button"
                onClick={() => setTransactionType("mua-ban")}
                className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${
                  transactionType === "mua-ban" 
                    ? "bg-white dark:bg-slate-700 text-emerald-600 shadow-sm" 
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                Mua bán
              </button>
              <button
                type="button"
                onClick={() => setTransactionType("cho-thue")}
                className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${
                  transactionType === "cho-thue" 
                    ? "bg-white dark:bg-slate-700 text-emerald-600 shadow-sm" 
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                Cho thuê
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="propertyType" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Loại bất động sản <span className="text-red-500">*</span>
            </label>
            <select
              id="propertyType"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              required
              className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-slate-900 dark:text-white"
            >
              <option value="">Chọn loại hình</option>
              {propertyTypes.map(type => (
                <option key={type.id} value={type.id}>{type.label}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* 2. Vị trí */}
      <section className="space-y-6">
        <h4 className="text-sm font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-2">
          <span className="size-2 bg-emerald-600 rounded-full"></span>
          Vị trí
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Tỉnh/Thành <span className="text-red-500">*</span></label>
            <select className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white">
              <option>Chọn Tỉnh/Thành</option>
              <option>Hà Nội</option>
              <option>TP. Hồ Chí Minh</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Quận/Huyện <span className="text-red-500">*</span></label>
            <select className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white">
              <option>Chọn Quận/Huyện</option>
            </select>
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Địa chỉ cụ thể</label>
            <input 
              type="text" 
              placeholder="Ví dụ: 123 Nguyễn Huệ, Phường Bến Nghé"
              className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
            />
          </div>
        </div>
      </section>

      {/* 3. Chi tiết bài đăng */}
      <section className="space-y-6">
        <h4 className="text-sm font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-2">
          <span className="size-2 bg-emerald-600 rounded-full"></span>
          Chi tiết bài đăng
        </h4>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Tiêu đề <span className="text-red-500">*</span></label>
          <input 
            type="text" 
            required
            placeholder="Ví dụ: Bán nhà phố mặt tiền kinh doanh Quận 1, sổ hồng riêng"
            className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
          />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Diện tích (m²) <span className="text-red-500">*</span></label>
            <input type="number" required className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {transactionType === "cho-thue" ? "Giá thuê/tháng" : "Tổng giá"} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input type="text" required className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white pr-16" />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">VNĐ</span>
            </div>
          </div>
          
          {showDimensions && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Chiều ngang (m)</label>
                <input type="number" step="0.1" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Chiều dài (m)</label>
                <input type="number" step="0.1" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white" />
              </div>
            </>
          )}

          {showFloors && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Số tầng</label>
              <input type="number" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white" />
            </div>
          )}

          {showBedrooms && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Số phòng ngủ</label>
              <input type="number" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white" />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Hướng cửa</label>
            <select className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white">
              <option>Chọn hướng</option>
              <option>Đông</option>
              <option>Tây</option>
              <option>Nam</option>
              <option>Bắc</option>
              <option>Đông Bắc</option>
              <option>Đông Nam</option>
              <option>Tây Bắc</option>
              <option>Tây Nam</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Hashtags (Đặc điểm nổi bật)</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {selectedHashTags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold border border-emerald-200 dark:border-emerald-800"
              >
                #{tag}
                <button 
                  type="button" 
                  onClick={() => removeTag(tag)}
                  className="hover:text-emerald-900 dark:hover:text-emerald-200 p-0.5"
                >
                  <X className="size-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">#</span>
              <input 
                type="text" 
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ví dụ: chính-chủ, mặt-tiền..."
                className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2 px-7 text-sm focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
              />
            </div>
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-slate-900 dark:bg-slate-800 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors flex items-center gap-2"
            >
              <Plus className="size-4" />
              Thêm
            </button>
          </div>
          <p className="text-[10px] text-slate-400 font-medium">Ấn Enter để thêm hashtag nhanh</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Mô tả chi tiết <span className="text-red-500">*</span></label>
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
            <RichTextEditor 
              value={description} 
              onChange={setDescription} 
              placeholder="Mô tả chi tiết về bất động sản, tiện ích xung quanh, pháp lý..."
            />
          </div>
        </div>
      </section>

      {/* 4. Hình ảnh & Video */}
      <section className="space-y-6">
        <h4 className="text-sm font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-2">
          <span className="size-2 bg-emerald-600 rounded-full"></span>
          Ảnh & Video thực tế (Tối đa 20 file)
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
          {/* Upload Image Button */}
          <div className="aspect-square rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
            <div className="p-2 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 group-hover:scale-110 transition-transform">
              <Camera className="size-6" />
            </div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Thêm ảnh</span>
          </div>

          {/* Upload Video Button */}
          <div className="aspect-square rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
            <div className="p-2 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 group-hover:scale-110 transition-transform">
              <Video className="size-6" />
            </div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Thêm video</span>
          </div>
        </div>
        <p className="text-[10px] text-slate-400 italic">Lưu ý: Bạn có thể chọn nhiều ảnh và video cùng lúc. Định dạng hỗ trợ: jpg, png, mp4, mov.</p>
      </section>

      {/* Submit Button */}
      <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex gap-4">
        <button
          type="submit"
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all uppercase tracking-widest text-sm"
        >
          Đăng bài ngay
        </button>
      </div>
    </form>
  );
}
