"use client";

import { useMemo } from "react";
import { 
  MapPin, 
  Ruler, 
  Bed, 
  Layers, 
  Maximize2, 
  Compass, 
  Calendar, 
  User, 
  Phone, 
  Share2, 
  Heart,
  ChevronRight,
  Info,
  Clock,
  ShieldCheck,
  Star,
  Eye,
  FileText,
  ArrowLeft
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PropertyDetailProps {
  type: "mua-ban" | "cho-thue";
  isDemo?: boolean;
}

export function PropertyDetail({ type, isDemo = false }: PropertyDetailProps) {
  const router = useRouter();
  // Mock data for the demo property
  const property = useMemo(() => ({
    id: isDemo ? "DEMO-V3-2026" : "FIN26123456",
    title: type === "mua-ban" 
      ? "Bán nhà mặt phố Nguyễn Trãi, Quận 1 - Vị trí kim cương, kinh doanh đa ngành" 
      : "Cho thuê Kho xưởng KCN Tân Bình - Diện tích lớn, xe Container vào tận nơi",
    price: type === "mua-ban" ? "42.5 Tỷ" : "120 Triệu/tháng",
    address: type === "mua-ban" 
      ? "Nguyễn Trãi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh"
      : "Đường số 1, KCN Tân Bình, Quận Tân Phú, TP. Hồ Chí Minh",
    area: type === "mua-ban" ? 120 : 1500,
    bedrooms: type === "mua-ban" ? 5 : 0,
    floors: type === "mua-ban" ? 5 : 0,
    dimensions: type === "mua-ban" ? "6m x 20m" : "30m x 50m",
    direction: "Đông Nam",
    description: type === "mua-ban" ? `
      <div class="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
        <p><strong>Vị trí đắc địa nhất khu vực Quận 1</strong>, nằm trên tuyến đường thương mại sầm uất bậc nhất Sài Thành. Phù hợp làm Văn phòng công ty, Showroom, Thẩm mỹ viện hoặc cho thuê giá cao.</p>
        <p><strong>Thông tin chi tiết:</strong></p>
        <ul class="list-disc pl-5 space-y-1">
          <li>Diện tích đất: 6m x 20m (120m2), vuông vức không lỗi phong thủy.</li>
          <li>Kết cấu: 1 trệt, 4 lầu, thang máy tốc độ cao. Tổng diện tích sàn hơn 500m2.</li>
          <li>Hiện trạng: Nhà mới 95%, nội thất cao cấp nhập khẩu trực tiếp từ Ý.</li>
          <li>Pháp lý: Sổ hồng chính chủ, hoàn công đầy đủ, sang tên ngay trong ngày.</li>
        </ul>
        <p>Giá bán có thương lượng cho khách thiện chí giao dịch nhanh.</p>
      </div>
    ` : `
      <div class="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
        <p><strong>Cho thuê kho xưởng tiêu chuẩn tại KCN Tân Bình.</strong> Hệ thống PCCC tự động, mái tôn lạnh, nền bê tông chịu lực 5 tấn/m2. Vị trí thuận tiện kết nối Quốc lộ 1A và các quận trung tâm.</p>
        <p><strong>Thông tin chi tiết:</strong></p>
        <ul class="list-disc pl-5 space-y-1">
          <li>Diện tích xưởng: 1500m2 xây dựng tự do.</li>
          <li>Hệ thống điện 3 pha công suất lớn.</li>
          <li>Trạm cân 80 tấn ngay cửa.</li>
          <li>Hợp đồng dài hạn, pháp lý đầy đủ cho doanh nghiệp FDI.</li>
        </ul>
        <p>Liên hệ xem xưởng trực tiếp, giá còn thương lượng.</p>
      </div>
    `,
    hashtags: type === "mua-ban" 
      ? ["mat-pho", "chinh-chu", "gia-tot", "quan-1", "kinh-doanh"]
      : ["kho-xuong", "kcn-tan-binh", "xe-container", "gia-re"],
    images: type === "mua-ban" ? [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&q=80&w=1200",
    ] : [
      "https://images.unsplash.com/photo-1586528116311-ad861f18fc4a?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1590633355030-cf85a5a153c3?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1587293852726-70eeb5933682?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=1200",
    ],
    postedAt: "11/03/2026",
    views: 1245,
    broker: {
      name: "Trần Anh Hưng",
      phone: "0987.654.321",
      avatar: "https://i.pravatar.cc/150?u=anhhung",
      rating: 5.0,
      totalListed: 124
    }
  }), [type, isDemo]);

  return (
    <div className="space-y-6">
      {/* 1. Header Section - Clean & Informative */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-slate-500 hover:text-emerald-600 transition-colors text-[11px] font-bold group"
          >
            <ArrowLeft className="size-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Quay lại</span>
          </button>
          
          <div className="w-px h-2.5 bg-slate-200 dark:bg-slate-800" />

          <nav className="flex items-center gap-2 text-[11px] text-slate-400">
            <span>Trang chủ</span>
            <ChevronRight className="size-3" />
            <span>{type === "mua-ban" ? "Mua bán" : "Cho thuê"}</span>
            <ChevronRight className="size-3" />
            <span className="text-slate-600 dark:text-slate-200 font-medium">Chi tiết tin đăng</span>
          </nav>
        </div>

        <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-[1.3] uppercase tracking-tight">
          {property.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 py-2 text-xs text-slate-500 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1">
            <MapPin className="size-4" />
            <span>{property.address}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="size-4" />
            <span>Đăng ngày {property.postedAt}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Media & Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* 2. Media Showcase */}
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-200">
            <Image 
              src={property.images[0]} 
              alt={property.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 backdrop-blur-sm">
              <Maximize2 className="size-3" />
              1/{property.images.length} Ảnh
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {property.images.slice(1, 4).map((img, idx) => (
              <div key={idx} className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group">
                <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover group-hover:scale-105 transition-transform" />
              </div>
            ))}
          </div>

          {/* 3. Core Specs */}
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-slate-100 dark:border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 mb-1 font-medium">Mức giá</span>
                <span className="text-2xl font-bold text-red-600 tracking-tight">{property.price}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 mb-1 font-medium">Diện tích</span>
                <span className="text-xl font-bold text-slate-900 dark:text-white">{property.area} m²</span>
              </div>
              {property.bedrooms > 0 && (
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 mb-1 font-medium">Phòng ngủ</span>
                  <span className="text-xl font-bold text-slate-900 dark:text-white">{property.bedrooms} PN</span>
                </div>
              )}
              {property.floors > 0 && (
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 mb-1 font-medium">Số tầng</span>
                  <span className="text-xl font-bold text-slate-900 dark:text-white">{property.floors} Tầng</span>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                <button className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-colors">
                  <Share2 className="size-5 text-slate-600" />
                </button>
                <button className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-colors">
                  <Heart className="size-5 text-slate-600" />
                </button>
              </div>
            </div>
          </div>

          {/* 4. Description */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white border-l-4 border-emerald-600 pl-3">Thông tin mô tả</h3>
            <div 
              className="text-sm md:text-base"
              dangerouslySetInnerHTML={{ __html: property.description }}
            />
          </div>

          {/* 5. Feature List - Standard VN Style */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white border-l-4 border-emerald-600 pl-3">Đặc điểm bất động sản</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-12 py-2">
              <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-800 py-2">
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <Ruler className="size-4" /> Diện tích
                </div>
                <span className="text-sm font-semibold">{property.area} m² ({property.dimensions})</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-800 py-2">
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <Compass className="size-4" /> Hướng nhà
                </div>
                <span className="text-sm font-semibold">{property.direction}</span>
              </div>
              {property.floors > 0 && (
                <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-800 py-2">
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <Layers className="size-4" /> Số tầng
                  </div>
                  <span className="text-sm font-semibold">{property.floors} tầng</span>
                </div>
              )}
              {property.bedrooms > 0 && (
                <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-800 py-2">
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <Bed className="size-4" /> Số phòng ngủ
                  </div>
                  <span className="text-sm font-semibold">{property.bedrooms} phòng</span>
                </div>
              )}
              <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-800 py-2">
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <FileText className="size-4" /> Pháp lý
                </div>
                <span className="text-sm font-semibold">Sổ hồng/ Sổ đỏ</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-800 py-2">
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <MapPin className="size-4" /> Mặt tiền
                </div>
                <span className="text-sm font-semibold">6m</span>
              </div>
            </div>
          </div>

          {/* 6. Tags */}
          <div className="flex flex-wrap gap-2 pt-4">
            {property.hashtags.map(tag => (
              <span 
                key={tag}
                className="px-3 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-medium cursor-default hover:text-emerald-600 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Broker Sidebar */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sticky top-24 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative size-14 rounded-full overflow-hidden flex-shrink-0">
                <Image src={property.broker.avatar} alt={property.broker.name} fill className="object-cover" />
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-0.5">Được đăng bởi</p>
                <h4 className="font-bold text-slate-900 dark:text-white leading-tight">{property.broker.name}</h4>
                <div className="flex items-center gap-1 mt-1">
                  <ShieldCheck className="size-3 text-emerald-500" />
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Môi giới uy tín</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-lg transition-all flex items-center justify-center gap-3 active:scale-95 shadow-lg shadow-emerald-500/20">
                <Phone className="size-5" />
                {property.broker.phone}
              </button>
              <button className="w-full border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 font-bold py-3 rounded-lg transition-all active:scale-95">
                Gửi yêu cầu liên hệ
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-amber-700 dark:text-amber-400">
                    <Info className="size-4 shrink-0 mt-0.5" />
                    <p className="text-[11px] leading-relaxed font-medium">
                        Khi giao dịch, hãy yêu cầu xem giấy tờ gốc và tuyệt đối không chuyển khoản trước khi xem nhà.
                    </p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
