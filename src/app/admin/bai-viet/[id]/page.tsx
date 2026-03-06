import Link from "next/link";
import React from "react";

export default function AdminArticleDetail() {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Thông tin bài viết</h2>
        <div className="bg-white dark:bg-slate-800 rounded-sm border border-slate-200 dark:border-slate-700 p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tiêu đề bài viết</label>
              <input className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-sm text-sm focus:ring-primary focus:border-primary dark:text-white placeholder-slate-400" placeholder="Nhập tiêu đề bài viết..." type="text" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Chuyên mục</label>
                <select className="w-full py-2 px-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-sm text-sm focus:ring-primary focus:border-primary dark:text-white text-slate-700">
                  <option value="tin-tuc">Tin tức thị trường</option>
                  <option value="huong-dan">Hướng dẫn quy hoạch</option>
                  <option value="phan-tich">Phân tích dự án</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Trạng thái</label>
                <div className="flex items-center gap-4 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input defaultChecked className="text-emerald-600 focus:ring-emerald-600 rounded-full" name="status" type="radio" value="published" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Đã xuất bản</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input className="text-emerald-600 focus:ring-emerald-600 rounded-full" name="status" type="radio" value="draft" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Bản nháp</span>
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Ảnh đại diện bài viết</label>
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-sm p-8 text-center bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2">
                <span className="material-symbols-outlined text-4xl text-slate-400">image</span>
                <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">Tải ảnh bìa bài viết lên</span>
                <span className="text-xs text-slate-400">PNG, JPG, GIF up to 5MB</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nội dung bài viết</label>
              <div className="border border-slate-200 dark:border-slate-700 rounded-sm overflow-hidden bg-white dark:bg-slate-900">
                <div className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-3 py-2 flex items-center gap-1 flex-wrap">
                  <button type="button" className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-sm transition-colors" title="Bold">
                    <span className="material-symbols-outlined text-[18px]">format_bold</span>
                  </button>
                  <button type="button" className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-sm transition-colors" title="Italic">
                    <span className="material-symbols-outlined text-[18px]">format_italic</span>
                  </button>
                  <div className="w-px h-5 bg-slate-300 dark:bg-slate-600 mx-1"></div>
                  <button type="button" className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-sm transition-colors" title="Bulleted List">
                    <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
                  </button>
                  <button type="button" className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-sm transition-colors" title="Numbered List">
                    <span className="material-symbols-outlined text-[18px]">format_list_numbered</span>
                  </button>
                  <div className="w-px h-5 bg-slate-300 dark:bg-slate-600 mx-1"></div>
                  <button type="button" className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-sm transition-colors" title="Insert Image">
                    <span className="material-symbols-outlined text-[18px]">image</span>
                  </button>
                  <button type="button" className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-sm transition-colors" title="Insert Link">
                    <span className="material-symbols-outlined text-[18px]">link</span>
                  </button>
                </div>
                <textarea className="w-full h-64 p-4 border-0 focus:ring-0 resize-y bg-transparent text-sm dark:text-white placeholder-slate-400" placeholder="Nhập nội dung bài viết tại đây..."></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link href="/admin/bai-viet" className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-sm text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors inline-block">
            Hủy
          </Link>
          <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-sm text-sm font-medium transition-colors" type="button">
            Lưu bài viết
          </button>
        </div>
      </div>
    </div>
  );
}
