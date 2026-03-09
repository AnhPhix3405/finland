"use client";

import { useState, useRef } from "react";
import RichTextEditor from "../ui/TipTap";
import { Camera, Plus, X, Check, Video } from "lucide-react";
import { createListingLocal } from "@/src/app/modules/listings.service";
import { uploadListingAttachments } from "@/src/app/modules/upload.service";

interface ListingFormProps {
  onSuccess?: () => void;
}

export function ListingForm({ onSuccess }: ListingFormProps) {
  const [transactionType, setTransactionType] = useState<"mua-ban" | "cho-thue">("mua-ban");
  const [propertyType, setPropertyType] = useState("");
  const [selectedHashTags, setSelectedHashTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [description, setDescription] = useState("");
  
  // Form data states
  const [title, setTitle] = useState("");
  const [province, setProvince] = useState("");
  const [ward, setWard] = useState("");
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [price, setPrice] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [direction, setDirection] = useState("");
  
  // File states
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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
  
  // File handling functions
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Validate file types (only images)
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    const invalidFiles = files.filter(file => !file.type.startsWith('image/'));
    
    if (invalidFiles.length > 0) {
      alert(`${invalidFiles.length} file(s) bị loại bỏ vì không phải là ảnh`);
    }
    
    // Check total file limit
    const newTotalFiles = selectedFiles.length + validFiles.length;
    if (newTotalFiles > 20) {
      const allowedCount = 20 - selectedFiles.length;
      const trimmedFiles = validFiles.slice(0, allowedCount);
      alert(`Chỉ có thể tải lên tối đa 20 ảnh. Đã thêm ${trimmedFiles.length} ảnh.`);
      setSelectedFiles(prev => [...prev, ...trimmedFiles]);
    } else {
      setSelectedFiles(prev => [...prev, ...validFiles]);
    }
    
    // Reset input
    if (e.target) {
      e.target.value = '';
    }
  };
  
  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    try {
      // Create listing locally first
      const listingResult = createListingLocal({
        title,
        description,
        transaction_type: transactionType,
        property_type: propertyType,
        province,
        ward,
        address,
        area: area ? parseFloat(area) : undefined,
        width: width ? parseFloat(width) : undefined,
        length: length ? parseFloat(length) : undefined,
        price: price ? BigInt(price) : undefined,
        direction,
        broker_id: "temp-broker-id" // TODO: Get from auth context
      });
      
      if (!listingResult.success) {
        alert(listingResult.error);
        return;
      }
      
      console.log("Listing created with ID:", listingResult.id);
      
      // Upload files if any
      if (selectedFiles.length > 0) {
        const uploadPromises = selectedFiles.map(file => 
          uploadListingAttachments(file, listingResult.id)
        );
        
        const uploadResults = await Promise.all(uploadPromises);
        console.log("Upload results:", uploadResults);
      }
      
      alert("Đăng bài thành công!");
      onSuccess?.();
      
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Có lỗi xảy ra khi đăng bài");
    } finally {
      setIsUploading(false);
    }
  };

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
            <select 
              required
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
            >
              <option value="">Chọn Tỉnh/Thành</option>
              <option value="Ha Noi">Hà Nội</option>
              <option value="Ho Chi Minh">TP. Hồ Chí Minh</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Quận/Huyện <span className="text-red-500">*</span></label>
            <select 
              required
              value={ward}
              onChange={(e) => setWard(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
            >
              <option value="">Chọn Quận/Huyện</option>
              <option value="District 1">Quận 1</option>
              <option value="District 3">Quận 3</option>
              <option value="Cau Giay">Cầu Giấy</option>
            </select>
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Địa chỉ cụ thể</label>
            <input 
              type="text" 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ví dụ: Bán nhà phố mặt tiền kinh doanh Quận 1, sổ hồng riêng"
            className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
          />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Diện tích (m²) <span className="text-red-500">*</span></label>
            <input 
              type="number" 
              required 
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {transactionType === "cho-thue" ? "Giá thuê/tháng" : "Tổng giá"} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input 
                type="text" 
                required 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white pr-16" 
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">VNĐ</span>
            </div>
          </div>
          
          {showDimensions && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Chiều ngang (m)</label>
                <input 
                  type="number" 
                  step="0.1" 
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Chiều dài (m)</label>
                <input 
                  type="number" 
                  step="0.1" 
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white" 
                />
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
            <select 
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
            >
              <option value="">Chọn hướng</option>
              <option value="Dong">Đông</option>
              <option value="Tay">Tây</option>
              <option value="Nam">Nam</option>
              <option value="Bac">Bắc</option>
              <option value="Dong Bac">Đông Bắc</option>
              <option value="Dong Nam">Đông Nam</option>
              <option value="Tay Bac">Tây Bắc</option>
              <option value="Tay Nam">Tây Nam</option>
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
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Đã chọn: {selectedFiles.length}/20 ảnh
            </span>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-lg text-sm font-medium hover:bg-emerald-200 dark:hover:bg-emerald-800 transition-colors"
            >
              Chọn ảnh
            </button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          {selectedFiles.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
              {selectedFiles.map((file, index) => (
                <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition-colors flex items-center justify-center"
                  >
                    ×
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2 truncate">
                    {file.name}
                  </div>
                </div>
              ))}
              
              {selectedFiles.length < 20 && (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                >
                  <div className="size-8 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800 transition-colors">
                    <span className="text-emerald-600 dark:text-emerald-400 text-lg font-bold">+</span>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 text-center">Thêm ảnh</span>
                </div>
              )}
            </div>
          )}
          
          {selectedFiles.length === 0 && (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="aspect-video rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
            >
              <div className="size-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800 transition-colors">
                <Camera className="size-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-slate-700 dark:text-slate-300">Chọn ảnh để tải lên</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Tối đa 20 ảnh</div>
              </div>
            </div>
          )}
        </div>
        <p className="text-[10px] text-slate-400 italic">Lưu ý: Bạn có thể chọn nhiều ảnh và video cùng lúc. Định dạng hỗ trợ: jpg, png, mp4, mov.</p>
      </section>

      {/* Submit Button */}
      <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex gap-4">
        <button
          type="submit"
          disabled={isUploading}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-black py-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all uppercase tracking-widest text-sm"
        >
          {isUploading ? "Đang xử lý..." : "Đăng bài ngay"}
        </button>
      </div>
    </form>
  );
}