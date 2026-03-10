"use client";

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ChevronRight, Share2, Clock, Tag, MessageSquare } from 'lucide-react';

export default function NewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  // Mock content that would normally come from TipTap editor
  const mockContent = `
    <p>Thị trường bất động sản Việt Nam đang chứng kiến những bước chuyển mình mạnh mẽ trong những tháng đầu năm 2026. Sau một thời gian dài tích lũy, dòng vốn từ các nhà đầu tư tổ chức và cá nhân đang có xu hướng quay trở lại, đặc biệt là ở phân khúc trung và cao cấp tại các vùng kinh tế trọng điểm phía Nam.</p>
    
    <h2>1. Hạ tầng là cú hích chính</h2>
    <p>Việc đẩy nhanh tiến độ các dự án giao thông liên vùng như vành đai 3, vành đai 4 TP.HCM cùng với các tuyến cao tốc huyết mạch đã tạo ra một diện mạo mới cho các đô thị vệ tinh. Các chuyên gia nhận định, giá trị bất động sản tại các khu vực này có biên độ tăng trưởng ổn định từ 10-15% mỗi năm nhờ sự hoàn thiện về kết nối hạ tầng.</p>
    
    <blockquote>
      "Hạ tầng giao thông không chỉ mở ra không gian phát triển mới mà còn giúp kéo giãn dân cư, giảm áp lực cho lõi trung tâm, từ đó tạo ra nhu cầu thực ở bền vững tại các quận ven và tỉnh lân cận."
    </blockquote>

    <h2>2. Tâm điểm tại các "Đô thị vệ tinh"</h2>
    <p>Không chỉ dừng lại ở TP.HCM, các khu vực như Đồng Nai, Long An và Bình Dương đang trở thành điểm đến lý tưởng. Các chủ đầu tư lớn đã bắt đầu triển khai những đại đô thị tích hợp đa tiện ích, đáp ứng nhu cầu "all-in-one" của tệp khách hàng trẻ năng động.</p>

    <ul>
      <li><strong>Tiện ích nội khu đa dạng:</strong> Công viên, hồ bơi, trường học quốc tế, bệnh viện...</li>
      <li><strong>Môi trường sống xanh:</strong> Tăng tỷ lệ cây xanh và mặt nước vào thiết kế cảnh quan.</li>
      <li><strong>Công nghệ thông minh:</strong> Tích hợp các giải pháp nhà thông minh smarthome vào từng căn hộ.</li>
    </ul>

    <h2>3. Dự báo xu hướng cuối năm 2026</h2>
    <p>Dự báo từ nay đến cuối năm, thị trường sẽ tiếp tục duy trì nhịp độ ổn định. Người mua nhà hiện nay đã trở nên thông thái hơn, họ không còn chạy theo những cơn "sốt đất" ảo mà tập trung vào các sản phẩm có pháp lý minh bạch, chủ đầu tư uy tín và có khả năng khai thác dòng tiền (cho thuê) tốt.</p>
  `;

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen pt-6 pb-12">
      {/* 1. Integrated Navigation Row */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
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
            <Link href="/" className="hover:text-emerald-600 transition-colors">Trang chủ</Link>
            <ChevronRight className="size-3" />
            <Link href="/tin-tuc" className="hover:text-emerald-600 transition-colors">Tin tức</Link>
            <ChevronRight className="size-3" />
            <span className="text-slate-600 dark:text-slate-200 font-medium">Chi tiết bài viết</span>
          </nav>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4">
        {/* Post Meta */}
        <header className="mb-10 space-y-4">
          <div className="flex items-center gap-3">
            <span className="bg-emerald-600 text-white text-[9px] font-black px-2 py-1 rounded uppercase tracking-[0.1em]">
              Thị trường
            </span>
            <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium">
              <Clock className="size-3.5" />
              <span>Đăng ngày 10/03/2026</span>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
            Thị trường Bất động sản phía Nam sôi động trở lại trong quý 1/2026
          </h1>

          <div className="flex items-center justify-between py-4 border-y border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-bold text-sm">
                BBT
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Ban biên tập finland.vn</p>
                <p className="text-[11px] text-slate-500">Chuyên gia phân tích thị trường</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-600 transition-colors">
                <Share2 className="size-4" />
                <span>Chia sẻ</span>
              </button>
            </div>
          </div>
        </header>

        {/* Post Image */}
        <div className="aspect-video w-full rounded-xl overflow-hidden mb-10 shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=1200"
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Post Content (Rich Text Simulation) */}
        <div
          className="prose prose-slate dark:prose-invert prose-lg max-w-none 
          prose-headings:text-slate-900 dark:prose-headings:text-white 
          prose-p:text-slate-700 dark:prose-p:text-slate-300 
          prose-p:leading-relaxed prose-p:mb-5 
          prose-li:text-slate-700 dark:prose-li:text-slate-300
          prose-blockquote:border-emerald-500 prose-blockquote:bg-emerald-50 dark:prose-blockquote:bg-emerald-900/10 
          prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
          prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: mockContent }}
        />

        {/* Post Tags */}
        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap gap-2">
            <div className="text-[11px] font-bold text-slate-400 mr-2 flex items-center gap-1.5 uppercase tracking-wider">
              <Tag className="size-3.5" />
              <span>Tags:</span>
            </div>
            {['#thitruong', '#batdongsan2026', '#quyhoach', '#dautu'].map(tag => (
              <span key={tag} className="px-3 py-1 bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 rounded-full text-[11px] font-medium hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-900/20 transition-colors cursor-pointer border border-slate-100 dark:border-slate-800">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Post Navigation */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50 dark:bg-slate-800/20 rounded-xl border border-slate-100 dark:border-slate-800">
          <Link href="/tin-tuc/2" className="group">
            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-2">Bài trước</p>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors line-clamp-1">
              7 lưu ý quan trọng khi kiểm tra quy hoạch đất đai
            </h4>
          </Link>
          <div className="text-right border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-700 pt-4 md:pt-0 md:pl-6">
            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-2">Bài tiếp theo</p>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 italic opacity-50">Đang cập nhật...</h4>
          </div>
        </div>
      </article>

      {/* Subscription Section */}
      <section className="bg-slate-900 py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Đăng ký nhận bảng tin thị trường</h2>
          <p className="text-slate-400 mb-8">Chúng tôi sẽ gửi những báo cáo và phân tích mới nhất vào mỗi sáng thứ 2 hàng tuần.</p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Nhập email của bạn..."
              className="flex-1 px-4 py-3 rounded-sm bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
            <button className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-sm transition-colors whitespace-nowrap">
              Đăng ký ngay
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
