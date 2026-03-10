"use client";

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function NewsDetailPage() {
  const params = useParams();
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
    <div className="bg-white dark:bg-slate-900 min-h-screen">
      {/* Breadcrumb Header */}
      <div className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 py-4">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-emerald-600 transition-colors">Trang chủ</Link>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <Link href="/tin-tuc" className="hover:text-emerald-600 transition-colors">Tin tức</Link>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-slate-900 dark:text-slate-100 font-medium line-clamp-1 truncate">Chi tiết bài viết</span>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Post Meta */}
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
              Thị trường
            </span>
            <span className="text-slate-400 text-sm">•</span>
            <span className="text-slate-500 dark:text-slate-400 text-sm italic">Đăng ngày 10/03/2026</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
            Thị trường Bất động sản phía Nam sôi động trở lại trong quý 1/2026
          </h1>

          <div className="flex items-center justify-between py-6 border-y border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">
                A
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Ban biên tập finland.vn</p>
                <p className="text-xs text-slate-500">Chuyên gia phân tích thị trường</p>
              </div>
            </div>
            <div className="flex gap-4 text-slate-500">
              <span className="flex items-center gap-1.5 text-sm">
                <span className="material-symbols-outlined text-[18px]">visibility</span>
                1.2k lượt xem
              </span>
              <button className="flex items-center gap-1.5 text-sm hover:text-emerald-600 transition-colors">
                <span className="material-symbols-outlined text-[18px]">share</span>
                Chia sẻ
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
            <span className="text-sm text-slate-500 mr-2 flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-[18px]">label</span>
              Tags:
            </span>
            {['#thitruong', '#batdongsan2026', '#quyhoach', '#dautu'].map(tag => (
              <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full text-xs hover:bg-emerald-50 hover:text-emerald-600 transition-colors cursor-pointer">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Post Navigation */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-100 dark:border-slate-800">
          <Link href="/tin-tuc/2" className="group">
            <p className="text-xs text-slate-500 uppercase font-bold mb-2">Bài trước</p>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors line-clamp-1">
              7 lưu ý quan trọng khi kiểm tra quy hoạch đất đai
            </h4>
          </Link>
          <div className="text-right border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-700 pt-4 md:pt-0 md:pl-6">
            <p className="text-xs text-slate-500 uppercase font-bold mb-2">Bài tiếp theo</p>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 italic">Đang cập nhật...</h4>
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
