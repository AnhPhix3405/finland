"use client";

import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight, ChevronRight, Clock } from 'lucide-react';

const MOCK_NEWS_ARTICLES = [
  {
    id: '1',
    title: 'Thị trường Bất động sản phía Nam sôi động trở lại trong quý 1/2026',
    summary: 'Dòng vốn lớn đang đổ vào các dự án hạ tầng trọng điểm, thúc đẩy thị trường BĐS các tỉnh lân cận TP.HCM tăng trưởng mạnh mẽ.',
    coverImage: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=800',
    date: '10/03/2026',
    views: '1.2k',
    author: 'Admin'
  },
  {
    id: '2',
    title: '7 lưu ý quan trọng khi kiểm tra quy hoạch đất đai tại TP.HCM',
    summary: 'Tra cứu quy hoạch là bước tối quan trọng để tránh rủi ro pháp lý. Dưới đây là những hướng dẫn chi tiết dành cho nhà đầu tư.',
    coverImage: 'https://images.unsplash.com/photo-1541888941295-1e8fbc7966e9?auto=format&fit=crop&q=80&w=800',
    date: '08/03/2026',
    views: '850',
    author: 'Admin'
  },
  {
    id: '3',
    title: 'Giải pháp tài chính cho người mua nhà lần đầu năm 2026',
    summary: 'Với lãi suất ổn định và nhiều gói ưu đãi từ ngân hàng, đây là thời điểm vàng để người trẻ sở hữu căn nhà đầu tiên.',
    coverImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
    date: '05/03/2026',
    views: '2.4k',
    author: 'Admin'
  },
  {
    id: '4',
    title: 'Xu hướng căn hộ xanh và thông minh thống trị thị trường năm 2026',
    summary: 'Người mua nhà ngày càng chú trọng đến không gian sống trong lành và tích hợp công nghệ hiện đại vào đời sống thường nhật.',
    coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
    date: '02/03/2026',
    views: '1.1k',
    author: 'Admin'
  },
  {
    id: '5',
    title: 'Cần trọng với các dự án "ma" đang rao bán rầm rộ tại vùng ven',
    summary: 'Nhiều môi giới sử dụng chiêu trò hứa hẹn lợi nhuận cao để lừa đảo khách hàng tại các vùng chưa có quy hoạch cụ thể.',
    coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    date: '01/03/2026',
    views: '3.2k',
    author: 'Admin'
  },
  {
    id: '6',
    title: 'Góc nhìn chuyên gia: BĐS nghỉ dưỡng sẽ hồi phục mạnh mẽ sau đại dịch',
    summary: 'Các chuyên gia dự báo phân khúc nghỉ dưỡng cao cấp sẽ là kênh trú ẩn dòng tiền an toàn nhất trong năm tới.',
    coverImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800',
    date: '28/02/2026',
    views: '1.5k',
    author: 'Admin'
  }
];

export default function NewsPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-emerald-700 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Tin Tức Bất Động Sản</h1>
          <p className="text-emerald-50 text-lg max-w-2xl mx-auto opacity-90">
            Cập nhật những thông tin mới nhất về thị trường, quy hoạch và kiến thức đầu tư bất động sản tại Việt Nam.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* News Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {MOCK_NEWS_ARTICLES.map((article) => (
                <Link 
                  key={article.id}
                  href={`/tin-tuc/${article.id}`}
                  className="group bg-white dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <img 
                      src={article.coverImage} 
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        Tin tức
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-xs mb-3">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Calendar className="size-3.5" />
                        {article.date}
                      </span>
                    </div>
                    
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors leading-snug">
                      {article.title}
                    </h2>
                    
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed opacity-80">
                      {article.summary}
                    </p>
                    
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-emerald-600 dark:text-emerald-400 text-sm font-bold flex items-center gap-1 group/link">
                        Đọc tiếp
                        <ArrowRight className="size-3.5 transition-transform group-hover/link:translate-x-1" />
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">BY {article.author}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-16 flex justify-center gap-2">
              <button className="h-10 w-10 flex items-center justify-center rounded-sm bg-emerald-600 text-white font-bold shadow-md shadow-emerald-200/50">1</button>
              <button className="h-10 w-10 flex items-center justify-center rounded-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 font-bold transition-colors">2</button>
              <button className="h-10 w-10 flex items-center justify-center rounded-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 font-bold transition-colors">3</button>
              <button className="px-4 h-10 flex items-center justify-center rounded-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 font-bold transition-colors">Tiếp</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
