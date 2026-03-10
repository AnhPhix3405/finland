"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import TipTap from '@/src/components/ui/TipTap';

export default function AdminAddNewsPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API saving
      await new Promise(resolve => setTimeout(resolve, 800));
      // In reality, we would send { title, category, summary, content, coverImage } to /api/articles
      router.push('/admin/bai-viet'); // Redirect back to articles list
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-1">
            <Link href="/admin/tin-tuc" className="hover:text-emerald-600 transition-colors">Quản lý Tin tức</Link>
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">chevron_right</span>
            <span className="text-slate-900 dark:text-slate-100 font-medium">Viết bài mới</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Soạn thảo Tin Tức</h1>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/tin-tuc" className="px-4 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-sm text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">
            Hủy
          </Link>
          <button 
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || !title || !content}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-600/50 text-white rounded-sm text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 flex items-center gap-2"
          >
            {isSubmitting ? (
              <span className="material-symbols-outlined text-[18px] animate-spin" aria-hidden="true">progress_activity</span>
            ) : (
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">publish</span>
            )}
            Xuất bản ngay
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-sm border border-slate-200 dark:border-slate-700 shadow-sm space-y-5">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Tiêu đề bài viết <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nhập tiêu đề hấp dẫn..."
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-sm text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="summary" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Tóm tắt nội dung
              </label>
              <textarea
                id="summary"
                rows={3}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Đoạn văn ngắn tóm lược ý chính hiển thị ở danh sách bài viết..."
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-sm text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-white resize-y"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Nội dung chi tiết <span className="text-red-500">*</span>
              </label>
              {/* Rich Text Editor */}
              <div className="prose-container">
                <TipTap 
                  value={content} 
                  onChange={setContent} 
                  placeholder="Bắt đầu viết nội dung tại đây..." 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Settings Column */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-sm border border-slate-200 dark:border-slate-700 shadow-sm space-y-5">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-3">Hiển thị nội dung</h3>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Ảnh đại diện (Cover)
              </label>
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-sm p-6 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                <span className="material-symbols-outlined text-4xl text-slate-400 group-hover:text-emerald-500 transition-colors mb-2 block" aria-hidden="true">add_photo_alternate</span>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">Nhấp để tải lên</span> hoặc kéo thả file
                </p>
                <p className="text-xs text-slate-500 mt-1">PNG, JPG, WEBP (Tối đa 5MB)</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Tags (Hashtag)
              </label>
              <button 
                type="button"
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 rounded-sm text-sm text-left text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <span>Nhấn để chọn tags...</span>
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">label</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
