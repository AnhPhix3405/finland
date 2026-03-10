"use client";

import React, { useMemo } from "react";
import { 
  MapPin, 
  Building2, 
  Tag, 
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
  ArrowLeft,
  LayoutGrid,
  Map as MapIcon,
  CheckCircle2,
  Construction
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProjectDetailProps {
  isDemo?: boolean;
}

export function ProjectDetail({ isDemo = false }: ProjectDetailProps) {
  const router = useRouter();
  
  // Mock data for the demo project
  const project = useMemo(() => ({
    id: isDemo ? "PROJ-DEMO-2026" : "FIN-PJ-12345",
    title: "VINHOMES OCEAN PARK 3 - THE CROWN",
    developer: "Vinhomes (Vingroup)",
    location: "Văn Giang & Văn Lâm, Hưng Yên",
    scale: "294 ha",
    totalUnits: "Khoảng 8.500 căn thấp tầng",
    type: "Biệt thự, Liền kề, Shophouse",
    status: "Đang mở bán & Bàn giao cuốn chiếu",
    handoverTime: "Quý 3/2023",
    legal: "Sổ hồng lâu dài",
    priceRange: "Từ 6 - 30 tỷ/căn",
    description: `
      <div class="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
        <p><strong>Vinhomes Ocean Park 3 (The Crown)</strong> là "mảnh ghép" cuối cùng của siêu quần thể đô thị biển 1.200ha vùng Đông Hà Nội. Dự án sở hữu phong cách kiến trúc độc bản từ những thành phố ven biển đẹp nhất thế giới.</p>
        <p><strong>Tại sao nên chọn Vinhomes Ocean Park 3:</strong></p>
        <ul class="list-disc pl-5 space-y-1 text-sm md:text-base">
          <li><strong>Vịnh biển kỳ quan bốn mùa:</strong> Quy mô lên tới 12.3ha với hồ nước mặn Lagoon, công viên nước mini.</li>
          <li><strong>Giao thông hạ tầng:</strong> Kết nối trực tiếp đường vành đai 3.5 và cao tốc Hà Nội - Hải Phòng.</li>
          <li><strong>Hệ sinh thái All-in-one:</strong> Thừa hưởng toàn bộ tiện ích từ Ocean Park 1 và 2 (Vincom, Vinmec, Vinschool).</li>
          <li><strong>Tiềm năng tăng giá:</strong> Nằm trong lõi phát triển phía Đông Thủ đô, hạ tầng đang hoàn thiện thần tốc.</li>
        </ul>
        <p>Hiện dự án đang có chính sách bán hàng cực kỳ ưu đãi, hỗ trợ lãi suất 0% lên tới 24 tháng.</p>
      </div>
    `,
    amenities: [
      "Hồ bơi nước mặn 12.3ha",
      "Công viên nước mini",
      "Khu vui chơi trẻ em",
      "Vườn Picnic, BBQ",
      "Hệ thống an ninh 24/7",
      "Phòng Gym & Spa",
      "Bệnh viện Vinmec",
      "Trường học Vinschool"
    ],
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200",
    ],
    postedAt: "11/03/2026",
  }), [isDemo]);

  return (
    <div className="space-y-6">
      {/* 1. Header Section */}
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
            <span>Dự án</span>
            <ChevronRight className="size-3" />
            <span className="text-slate-600 dark:text-slate-200 font-medium">Chi tiết dự án</span>
          </nav>
        </div>

        <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-[1.3] uppercase tracking-tight">
          {project.title}
        </h1>

        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-[11px] md:text-xs text-slate-500 font-medium pb-2 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-sm">
            <Building2 className="size-3.5" />
            <span className="font-bold uppercase tracking-wider">{project.developer}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="size-3.5" />
            <span>{project.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="size-3.5" />
            <span>Cập nhật {project.postedAt}</span>
          </div>
        </div>
      </div>

      {/* 2. Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Content */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Gallery Section */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden shadow-2xl ring-1 ring-slate-200 dark:ring-slate-800">
              <Image 
                src={project.images[0]} 
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-emerald-600 text-white text-[10px] font-black px-2.5 py-1 rounded-sm uppercase tracking-widest shadow-lg">
                  {project.status}
                </span>
              </div>
              <button className="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-900 backdrop-blur-md text-slate-900 dark:text-white px-4 py-2 rounded-lg text-xs font-bold border border-white/20 shadow-xl transition-all flex items-center gap-2">
                <Maximize2 className="size-4" /> Xem tất cả ảnh
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {project.images.slice(1, 4).map((img, idx) => (
                <div key={idx} className="relative aspect-[4/3] rounded-lg overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm cursor-pointer hover:opacity-90 transition-opacity">
                  <Image src={img} alt={`${project.title} ${idx + 2}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Core Specs Grid */}
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-slate-100 dark:border-slate-800">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 mb-1 font-black uppercase tracking-wider">Giá từ</span>
                <span className="text-lg font-bold text-red-600 tracking-tight">{project.priceRange.split('Từ ')[1]}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 mb-1 font-black uppercase tracking-wider">Quy mô</span>
                <span className="text-lg font-bold text-slate-900 dark:text-white">{project.scale}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 mb-1 font-black uppercase tracking-wider">Loại hình</span>
                <span className="text-base font-bold text-slate-900 dark:text-white leading-tight">{project.type}</span>
              </div>
              <div className="flex items-center justify-end gap-2">
                <button className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-colors shadow-sm bg-white dark:bg-slate-900">
                  <Share2 className="size-4.5 text-slate-600" />
                </button>
                <button className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-colors shadow-sm bg-white dark:bg-slate-900">
                  <Heart className="size-4.5 text-slate-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Project Details Grid */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white border-l-4 border-emerald-600 pl-3">Thông tin tổng quan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-12 py-2">
              <DetailItem icon={<User className="size-4" />} label="Chủ đầu tư" value={project.developer} />
              <DetailItem icon={<LayoutGrid className="size-4" />} label="Tổng số căn" value={project.totalUnits} />
              <DetailItem icon={<Calendar className="size-4" />} label="Khởi công" value="Quý 4/2022" />
              <DetailItem icon={<CheckCircle2 className="size-4" />} label="Bàn giao" value={project.handoverTime} />
              <DetailItem icon={<ShieldCheck className="size-4" />} label="Pháp lý" value={project.legal} />
              <DetailItem icon={<Construction className="size-4" />} label="Mật độ xây dựng" value="Khoảng 19.3%" />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white border-l-4 border-emerald-600 pl-3">Mô tả dự án</h3>
            <div 
              className="text-sm md:text-base"
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
          </div>

          {/* Amenities */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white border-l-4 border-emerald-600 pl-3">Tiện ích nội khu</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {project.amenities.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-100 dark:border-slate-800">
                  <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                  <span className="text-[13px] font-medium text-slate-700 dark:text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Sidebar */}
        <div className="space-y-6">
          <div className="sticky top-6">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 space-y-6">
              <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-1">Tư vấn dự án</p>
                <p className="text-xl font-bold text-emerald-600">Ban quản lý kinh doanh</p>
              </div>

              <div className="space-y-3">
                <button className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-sm shadow-lg shadow-emerald-200/50 dark:shadow-none transition-all flex items-center justify-center gap-2">
                  <Phone className="size-4" /> 0988 123 456
                </button>
                <button className="w-full py-3.5 bg-white dark:bg-slate-800 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2">
                  Nhận bảng giá mới nhất
                </button>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-full bg-slate-200 animate-pulse" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-4 w-24 bg-slate-100 rounded animate-pulse" />
                    <div className="h-3 w-32 bg-slate-50 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Project Map Thumbnail */}
            <div className="mt-6 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 h-48 relative overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all"></div>
              <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-all"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white dark:bg-slate-900 p-3 rounded-full shadow-2xl">
                  <MapIcon className="size-6 text-emerald-600" />
                </div>
              </div>
              <div className="absolute bottom-3 left-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-2 rounded text-[10px] font-bold text-center border border-white/20">
                XEM VỊ TRÍ TRÊN BẢN ĐỒ
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-800 py-2.5">
      <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
        {icon} {label}
      </div>
      <span className="text-[13px] font-bold text-slate-900 dark:text-white">{value}</span>
    </div>
  );
}

function Maximize2(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <polyline points="15 3 21 3 21 9" />
      <polyline points="9 21 3 21 3 15" />
      <line x1="21" y1="3" x2="14" y2="10" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  );
}
