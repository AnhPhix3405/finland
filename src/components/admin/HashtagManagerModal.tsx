"use client";

import React, { useState } from "react";

interface Hashtag {
  id: string;
  name: string;
  type: 'giao-dich' | 'loai-bds' | 'dac-diem';
  postCount: number;
}

const MOCK_HASHTAGS: Hashtag[] = [
  { id: '1', name: '#muaban', type: 'giao-dich', postCount: 1250 },
  { id: '2', name: '#chotue', type: 'giao-dich', postCount: 850 },
  { id: '3', name: '#nha-pho', type: 'loai-bds', postCount: 420 },
  { id: '4', name: '#chung-cu', type: 'loai-bds', postCount: 2100 },
  { id: '5', name: '#mat-pho', type: 'dac-diem', postCount: 154 },
  { id: '6', name: '#chinh-chu', type: 'dac-diem', postCount: 890 },
];

interface HashtagManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HashtagManagerModal({ isOpen, onClose }: HashtagManagerModalProps) {
  const [hashtags] = useState<Hashtag[]>(MOCK_HASHTAGS);

  if (!isOpen) return null;

  const getHashtagTypeLabel = (type: string) => {
    switch (type) {
      case 'giao-dich': return <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-blue-50 text-blue-700 border border-blue-200 text-xs font-medium">Giao dịch</span>;
      case 'loai-bds': return <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium">Loại BĐS</span>;
      case 'dac-diem': return <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-purple-50 text-purple-700 border border-purple-200 text-xs font-medium">Đặc điểm</span>;
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-sm shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col border border-slate-200 dark:border-slate-800">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-600">tag</span>
            Quản lý Hashtag Hệ thống
          </h3>
          <button
            onClick={onClose}
            aria-label="Đóng modal"
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <span className="material-symbols-outlined" aria-hidden="true">close</span>
          </button>
        </div>

        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex gap-3">
          <label htmlFor="hashtag-name" className="sr-only">Tên hashtag mới</label>
          <input
            id="hashtag-name"
            name="hashtagName"
            type="text"
            autoComplete="off"
            placeholder="Nhập tên hashtag (VD: duan_hot)..."
            className="flex-1 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-sm text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 dark:text-white"
          />
          <label htmlFor="hashtag-type" className="sr-only">Loại hashtag</label>
          <select 
            id="hashtag-type"
            name="hashtagType"
            className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-sm text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-white"
          >
            <option value="dac-diem">Đặc điểm (Nhà mới, Mua gấp...)</option>
            <option value="loai-bds">Loại BĐS (Chung cư, Đất nền...)</option>
            <option value="giao-dich">Giao dịch (Mua bán, Cho thuê)</option>
          </select>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-sm text-sm font-medium transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-1">
            Thêm mới
          </button>
        </div>

        <div className="p-0 overflow-y-auto flex-1 overscroll-contain">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 sticky top-0">
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tên Hashtag</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Phân loại</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tin đăng dùng</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Lựa chọn</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {hashtags.map((tag) => (
                <tr key={tag.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-4 py-3 text-sm font-bold text-slate-900 dark:text-slate-100">
                    {tag.name}
                  </td>
                  <td className="px-4 py-3">
                    {getHashtagTypeLabel(tag.type)}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                    {tag.postCount.toLocaleString()} tin
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button 
                      aria-label="Sửa hashtag"
                      title="Sửa"
                      className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 p-1 transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    >
                      <span className="material-symbols-outlined text-[18px]" aria-hidden="true">edit</span>
                    </button>
                    <button 
                      aria-label="Xóa hashtag"
                      title="Xóa"
                      className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 p-1 ml-1 transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500" 
                    >
                      <span className="material-symbols-outlined text-[18px]" aria-hidden="true">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
