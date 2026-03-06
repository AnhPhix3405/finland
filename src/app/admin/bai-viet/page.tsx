import Link from "next/link";
import React from "react";

export default function AdminArticleList() {
  return (
    <div className="p-6">
      <div className="w-full space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
              <input
                className="pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-sm text-sm focus:ring-primary focus:border-primary dark:text-white w-full sm:w-64 placeholder-slate-400"
                placeholder="Tìm kiếm bài viết..."
                type="text"
              />
            </div>
            <select className="py-2 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-sm text-sm focus:ring-primary focus:border-primary dark:text-white text-slate-700 min-w-[140px]">
              <option value="">Chuyên mục</option>
              <option value="tin-tuc">Tin tức thị trường</option>
              <option value="huong-dan">Hướng dẫn quy hoạch</option>
            </select>
          </div>
          <Link href="/admin/bai-viet/demo" className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-sm text-sm font-medium flex items-center gap-2 transition-colors whitespace-nowrap">
            <span className="material-symbols-outlined text-sm">add</span>
            <span>Viết bài mới</span>
          </Link>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-sm border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-1/3">Tiêu đề bài viết</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Chuyên mục</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Ngày đăng</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Lượt xem</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Trạng thái</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-900 dark:text-slate-100 font-medium line-clamp-2">Xu hướng giá bất động sản ven đô năm 2026</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs font-medium border border-blue-200 dark:border-blue-800">
                      Tin tức thị trường
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                    24/10/2024
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                    1,250
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 text-xs font-medium">
                      Đã xuất bản
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <Link href="/admin/bai-viet/demo" className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1" title="Chỉnh sửa">
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </Link>
                    <button className="text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors p-1 ml-1" title="Xóa">
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-900 dark:text-slate-100 font-medium line-clamp-2">Hướng dẫn tra cứu bản đồ quy hoạch chi tiết</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 text-xs font-medium border border-purple-200 dark:border-purple-800">
                      Hướng dẫn quy hoạch
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                    22/10/2024
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                    850
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 text-xs font-medium">
                      Đã xuất bản
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <Link href="/admin/bai-viet/demo" className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1" title="Chỉnh sửa">
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </Link>
                    <button className="text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors p-1 ml-1" title="Xóa">
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-900 dark:text-slate-100 font-medium line-clamp-2">Phân tích dự án khu đô thị mới tại Long An</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs font-medium border border-blue-200 dark:border-blue-800">
                      Tin tức thị trường
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                    20/10/2024
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                    420
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 text-xs font-medium">
                      Bản nháp
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <Link href="/admin/bai-viet/demo" className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1" title="Chỉnh sửa">
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </Link>
                    <button className="text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors p-1 ml-1" title="Xóa">
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-900 dark:text-slate-100 font-medium line-clamp-2">Quy trình kiểm tra tính pháp lý của sổ đỏ</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 text-xs font-medium border border-purple-200 dark:border-purple-800">
                      Hướng dẫn quy hoạch
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                    18/10/2024
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                    2,100
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 text-xs font-medium">
                      Đã xuất bản
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <Link href="/admin/bai-viet/demo" className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1" title="Chỉnh sửa">
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </Link>
                    <button className="text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors p-1 ml-1" title="Xóa">
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

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
