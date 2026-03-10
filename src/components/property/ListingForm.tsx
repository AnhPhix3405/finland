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

  const presetTags = [
    "mat-pho", "chinh-chu", "nha-moi", "noi-that", "gia-tot", "can-ban-gap", "hem-xe-hoi", "no-hau"
  ];

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

  const togglePresetTag = (tag: string) => {
    if (selectedHashTags.includes(tag)) {
      removeTag(tag);
    } else {
      setSelectedHashTags([...selectedHashTags, tag]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const [showSuccess, setShowSuccess] = useState(false);
  const [generatedId, setGeneratedId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate ID generation: FIN + Year(26) + 6 digits
    const randomId = `FIN26${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedId(randomId);
    setShowSuccess(true);
  };

  if (showSuccess) {
    return (
      <div className="text-center py-12 px-4 animate-in fade-in zoom-in duration-300">
        <div className="size-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="size-10 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase mb-2">Đăng tin thành công!</h2>
        <p className="text-slate-500 mb-8">Bài viết của bạn đã được hệ thống ghi nhận và đang chờ duyệt.</p>
        
        <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 mb-8 max-w-sm mx-auto">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Mã tin của bạn</span>
          <span className="text-3xl font-mono font-black text-emerald-600 tracking-tighter">{generatedId}</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white font-bold rounded-xl hover:bg-slate-50 transition-all"
          >
            Đăng tin tiếp
          </button>
          <button 
            onClick={() => onSuccess?.()}
            className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 transition-all"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      {/* 1. Loại giao dịch & Loại BĐS */}
      <section className="space-y-6">
        <h4 className="text-sm font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-2">
          <span className="size-2 bg-emerald-600 rounded-full"></span>
          Thông tin cơ bản
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              Loại giao dịch <span className="text-red-500 font-bold">*</span>
            </label>
            <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <button
                type="button"
                onClick={() => setTransactionType("mua-ban")}
                className={`flex-1 py-2.5 text-sm font-bold rounded-md transition-all ${
                  transactionType === "mua-ban" 
                    ? "bg-white dark:bg-slate-700 text-emerald-600 shadow-sm" 
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                Mua bán (#muaban)
              </button>
              <button
                type="button"
                onClick={() => setTransactionType("cho-thue")}
                className={`flex-1 py-2.5 text-sm font-bold rounded-md transition-all ${
                  transactionType === "cho-thue" 
                    ? "bg-white dark:bg-slate-700 text-emerald-600 shadow-sm" 
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                Cho thuê (#chotue)
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="propertyType" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Loại bất động sản <span className="text-red-500 font-bold">*</span>
            </label>
            <select
              id="propertyType"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              required
              className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-slate-900 dark:text-white outline-none"
            >
              <option value="">Chọn loại hình (Hashtag)</option>
              {propertyTypes.map(type => (
                <option key={type.id} value={type.id}>{type.label} (#{type.id})</option>
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
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Tỉnh/Thành <span className="text-red-500 font-bold">*</span></label>
            <select className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white outline-none">
              <option>Chọn Tỉnh/Thành</option>
              <option>Hà Nội</option>
              <option>TP. Hồ Chí Minh</option>
              <option>Đồng Nai</option>
              <option>Bình Dương</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Quận/Huyện <span className="text-red-500 font-bold">*</span></label>
            <select className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white outline-none">
              <option>Chọn Quận/Huyện</option>
            </select>
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Địa chỉ cụ thể</label>
            <input 
              type="text" 
              placeholder="Ví dụ: 123 Nguyễn Huệ, Phường Bến Nghé"
              className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white outline-none"
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
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Tiêu đề <span className="text-red-500 font-bold">*</span></label>
          <input 
            type="text" 
            required
            placeholder="Ví dụ: Bán nhà phố mặt tiền kinh doanh Quận 1, sổ hồng riêng"
            className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white outline-none font-bold"
          />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Diện tích (m²) <span className="text-red-500 font-bold">*</span></label>
            <input type="number" required className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {transactionType === "cho-thue" ? "Giá thuê/tháng" : "Tổng giá"} <span className="text-red-500 font-bold">*</span>
            </label>
            <div className="relative">
              <input type="text" required className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white pr-16 outline-none font-bold" />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">VNĐ</span>
            </div>
          </div>
          
          {showDimensions && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Chiều ngang (m)</label>
                <input type="number" step="0.1" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Chiều dài (m)</label>
                <input type="number" step="0.1" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white outline-none" />
              </div>
            </>
          )}

          {showFloors && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Số tầng</label>
              <input type="number" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white outline-none" />
            </div>
          )}

          {showBedrooms && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Số phòng ngủ</label>
              <input type="number" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white outline-none" />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Hướng cửa</label>
            <select className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white outline-none">
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
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Hashtags Đặc điểm (Multi-select)</label>
          
          {/* Preset Hashtag Chips */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest self-center mr-2">Gợi ý:</span>
            {presetTags.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => togglePresetTag(tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  selectedHashTags.includes(tag)
                    ? "bg-emerald-600 border-emerald-600 text-white"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-emerald-500 hover:text-emerald-600"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {selectedHashTags.filter(t => !presetTags.includes(t)).map(tag => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-slate-700"
              >
                #{tag}
                <button 
                  type="button" 
                  onClick={() => removeTag(tag)}
                  className="hover:text-red-500 p-0.5"
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
                placeholder="Nhập hashtag tự do..."
                className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-7 text-sm focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white outline-none"
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
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Mô tả chi tiết <span className="text-red-500 font-bold">*</span></label>
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-emerald-500 transition-all">
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
        <div className="flex justify-between items-end">
          <h4 className="text-sm font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-2">
            <span className="size-2 bg-emerald-600 rounded-full"></span>
            Ảnh & Video thực tế
          </h4>
          <span className="text-[10px] font-bold text-slate-400 uppercase">Tối đa 20 file</span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
          {/* Upload Image Button */}
          <div className="aspect-square rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/10 hover:border-emerald-500 transition-all group">
            <div className="p-2 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 group-hover:scale-110 transition-transform">
              <Camera className="size-6" />
            </div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Thêm ảnh</span>
          </div>

          {/* Upload Video Button */}
          <div className="aspect-square rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/10 hover:border-emerald-500 transition-all group">
            <div className="p-2 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 group-hover:scale-110 transition-transform">
              <Video className="size-6" />
            </div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Thêm video</span>
          </div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-100 dark:border-slate-800">
          <p className="text-[10px] text-slate-400 leading-relaxed">
            <span className="font-bold text-slate-500 uppercase">Lưu ý:</span> Bạn có thể chọn nhiều ảnh và video cùng lúc. Tin đăng có ảnh thật, rõ nét luôn có lượt xem cao hơn gấp 5 lần. Định dạng hỗ trợ: jpg, png, mp4, mov.
          </p>
        </div>
      </section>

      {/* Submit Button */}
      <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex gap-4">
        <button
          type="submit"
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-xl shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all uppercase tracking-widest text-sm"
        >
          Đăng bài ngay
        </button>
      </div>
    </form>
  );
}
