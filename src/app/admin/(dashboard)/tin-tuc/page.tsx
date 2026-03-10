"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface NewsArticle {
  id: string;
  title: string;
  views: number;
  createdAt: string;
  status: 'published' | 'draft' | 'hidden';
}

const MOCK_NEWS: NewsArticle[] = [
  {
    id: 'news_1',
    title: 'Thị trường Bất động sản phía Nam sôi động trở lại trong quý 1/2026',
    views: 1250,
    createdAt: '2026-03-01',
    status: 'published'
  },
  {
    id: 'news_2',
    title: '7 lưu ý quan trọng khi kiểm tra quy hoạch đất đai tại TP.HCM',
    views: 840,
    createdAt: '2026-03-05',
    status: 'published'
  },
  {
    id: 'news_3',
    title: 'Cần trọng với các dự án "ma" đang rao bán rầm rộ tại vùng ven',
    views: 2100,
    createdAt: '2026-03-08',
    status: 'published'
  },
  {
    id: 'news_4',
    title: 'Giải pháp tài chính cho người mua nhà lần đầu năm 2026',
    views: 450,
    createdAt: '2026-03-10',
    status: 'draft'
  }
];

export default function AdminNewsListPage() {
  const [news, setNews] = useState<NewsArticle[]>(MOCK_NEWS);

  const getStatusBadge = (status: NewsArticle['status']) => {
    switch (status) {
      case 'published':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Đã xuất bản
          </span>
        );
      case 'draft':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-slate-50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
            Bản nháp
          </span>
        );
      case 'hidden':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800/50 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            Đã ẩn
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Quản lý Tin tức</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Quản lý các bài viết blog, tin tức thị trường và kiến thức BĐS</p>
          </div>
          <Link
            href="/admin/tin-tuc/them"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-sm text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">add</span>
            Viết tin mới
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white dark:bg-slate-800 p-4 rounded-sm border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
              <input
                className="pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-sm text-sm focus:ring-emerald-500 focus:border-emerald-500 dark:text-white w-full sm:w-80 placeholder-slate-400 outline-none transition-all"
                placeholder="Tìm tiêu đề tin tức..."
                type="text"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-800 rounded-sm border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tiêu đề</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-32">Lượt xem</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-36">Ngày đăng</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-36">Trạng thái</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right w-28">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {news.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-900 dark:text-slate-100 font-bold line-clamp-1">{item.title}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600 dark:text-slate-300 font-mono">
                        {item.views.toLocaleString('vi-VN')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {new Date(item.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <button 
                        aria-label="Sửa tin tức"
                        className="text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors p-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500" 
                        title="Sửa"
                      >
                        <span className="material-symbols-outlined text-lg" aria-hidden="true">edit</span>
                      </button>
                      <button 
                        aria-label="Xóa tin tức"
                        className="text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors p-1 ml-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500" 
                        title="Xóa"
                      >
                        <span className="material-symbols-outlined text-lg" aria-hidden="true">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination placeholder */}
        <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-sm border border-slate-200 dark:border-slate-700 shadow-sm mt-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">Đang hiển thị {news.length} tin tức</p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 rounded-sm bg-emerald-600 text-white text-xs font-medium">1</button>
          </div>
        </div>
      </div>
    </div>
  );
}
