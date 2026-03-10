"use client";

import React, { useState } from "react";
import Link from "next/link"; // Keep just in case, though currently unused in Actions
import HashtagManagerModal from "@/src/components/admin/HashtagManagerModal";

type ArticleStatus = 'published' | 'hidden' | 'expired' | 'sold' | 'rejected';

interface Article {
  id: string;
  title: string;
  category: string;
  publishedAt: string;
  views: number;
  status: ArticleStatus;
}

const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Xu hướng giá bất động sản ven đô năm 2026',
    category: 'Tin tức thị trường',
    publishedAt: '24/10/2024',
    views: 1250,
    status: 'published'
  },
  {
    id: '2',
    title: 'Hướng dẫn tra cứu bản đồ quy hoạch chi tiết',
    category: 'Hướng dẫn quy hoạch',
    publishedAt: '22/10/2024',
    views: 850,
    status: 'hidden'
  },
  {
    id: '3',
    title: 'Căn hộ chung cư quận 9 giá tốt',
    category: 'Tin tức thị trường',
    publishedAt: '15/09/2024',
    views: 420,
    status: 'expired'
  },
  {
    id: '4',
    title: 'Bán nhà mặt phố Nguyễn Trãi gấp',
    category: 'Tin tức thị trường',
    publishedAt: '10/10/2024',
    views: 2100,
    status: 'sold'
  },
  {
    id: '5',
    title: 'Lừa đảo mua bán đất nền ven biển',
    category: 'Cảnh báo',
    publishedAt: '18/10/2024',
    views: 150,
    status: 'rejected'
  }
];

export default function AdminArticleList() {
  const [isHashtagModalOpen, setIsHashtagModalOpen] = useState(false);

  const getStatusBadge = (status: ArticleStatus) => {
    switch (status) {
      case 'published':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 text-xs font-medium">
            Đang hiển thị
          </span>
        );
      case 'hidden':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 text-xs font-medium">
            Đã ẩn
          </span>
        );
      case 'expired':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-800/50 text-xs font-medium">
            Hết hạn
          </span>
        );
      case 'sold':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50 text-xs font-medium">
            Đã bán/xong
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800/50 text-xs font-medium">
            Bị từ chối
          </span>
        );
      default:
        return null;
    }
  };

  const renderRow = (article: Article) => (
    <tr key={article.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
      <td className="px-6 py-4">
        <p className="text-sm text-slate-900 dark:text-slate-100 font-medium line-clamp-2">{article.title}</p>
      </td>
      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
        {article.publishedAt}
      </td>
      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
        {article.views.toLocaleString('vi-VN')}
      </td>
      <td className="px-6 py-4">
        {getStatusBadge(article.status)}
      </td>
      <td className="px-6 py-4 text-right whitespace-nowrap">
        {/* Approve Button */}
        <button 
          aria-label="Duyệt bài viết đang hiển thị"
          className="text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors p-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500" 
          title="Duyệt bài / Đang hiển thị"
        >
          <span className="material-symbols-outlined text-lg" aria-hidden="true">check_circle</span>
        </button>
        {/* Reject Button */}
        <button 
          aria-label="Từ chối bài viết"
          className="text-orange-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors p-1 ml-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500" 
          title="Từ chối"
        >
          <span className="material-symbols-outlined text-lg" aria-hidden="true">cancel</span>
        </button>
        {/* Delete Button */}
        <button 
          aria-label="Xóa vĩnh viễn bài viết"
          className="text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors p-1 ml-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500" 
          title="Xóa vĩnh viễn"
        >
          <span className="material-symbols-outlined text-lg" aria-hidden="true">delete</span>
        </button>
      </td>
    </tr>
  );

  return (
    <div className="p-6">
      <div className="w-full space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative">
              <label htmlFor="search-article" className="sr-only">Tìm kiếm bài viết</label>
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" aria-hidden="true">search</span>
              <input
                id="search-article"
                name="search"
                autoComplete="off"
                className="pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-sm text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 dark:text-white w-full sm:w-64 placeholder-slate-400"
                placeholder="Tìm kiếm bài viết..."
                type="text"
              />
            </div>
          </div>
          <button
            onClick={() => setIsHashtagModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-sm text-sm font-medium flex items-center gap-2 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-1"
          >
            <span className="material-symbols-outlined text-sm" aria-hidden="true">tag</span>
            <span>Quản lý Hashtag</span>
          </button>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-sm border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-1/3">Tiêu đề bài viết</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Ngày đăng</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Lượt xem</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Trạng thái</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {MOCK_ARTICLES.map(article => renderRow(article))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Quản lý Hashtag */}
        <HashtagManagerModal 
          isOpen={isHashtagModalOpen} 
          onClose={() => setIsHashtagModalOpen(false)} 
        />

        <div className="flex justify-end items-center gap-2 mt-4">
          <button className="px-3 py-1.5 min-w-[32px] rounded-sm bg-emerald-600 text-white text-sm font-medium flex items-center justify-center">1</button>
          <button className="px-3 py-1.5 min-w-[32px] rounded-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium transition-colors flex items-center justify-center">2</button>
          <button className="px-3 py-1.5 min-w-[32px] rounded-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium transition-colors flex items-center justify-center">3</button>
          <span className="text-slate-400 dark:text-slate-500 mx-1">...</span>
          <button className="px-3 py-1.5 rounded-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium transition-colors flex items-center justify-center">Tiếp</button>
        </div>
      </div>
    </div>
  );
}
