import Link from "next/link";
import React from "react";

export default function AdminBrokerList() {
  return (
    <div className="p-6">
      <div className="w-full space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
              <input
                className="pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-sm text-sm focus:ring-primary focus:border-primary dark:text-white w-full sm:w-80 placeholder-slate-400"
                placeholder="Tìm theo tên, số điện thoại..."
                type="text"
              />
            </div>
          </div>
          <Link href="/admin/moi-gioi/demo" className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-sm text-sm font-medium flex items-center gap-2 transition-colors whitespace-nowrap">
            <span className="material-symbols-outlined text-sm">add</span>
            <span>Thêm môi giới</span>
          </Link>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-sm border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-16">Ảnh</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Họ và Tên</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Số điện thoại</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Khu vực hoạt động</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 bg-cover bg-center border border-slate-300 dark:border-slate-600 flex items-center justify-center text-slate-500 font-bold overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img alt="Nguyễn Văn Nam" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9Zy9T23JlMs6clxA8w3_e9InmK4IoD_B1ccL9qigX9BdlKu1MEJhVY9y1W92_DIFZOz8EThzgcltxG8GHT-kRy6n9VE0eel7fivwcJiihAlcT3RTBtVBUQ5HjVIqOEyXpSuYyDRfGEEYRkmc8dWuYf-0yyZVZQEVKDaKe0F0YVL62xslVUaQPIwi6wlCrd7KT4HQOid7McvEcgYkDx94BVAAlIAvTTKifktrK7OGhX8t_KodLEtyYBeYhhos9DPwTRfP0aXy9e8pg"/>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-900 dark:text-slate-100 font-bold">Nguyễn Văn Nam</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                    0901 234 567
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                    Quận 2, TP.HCM
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <Link href="/admin/moi-gioi/demo" className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1" title="Chỉnh sửa">
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </Link>
                    <button className="text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors p-1 ml-1" title="Xóa">
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 bg-cover bg-center border border-slate-300 dark:border-slate-600 flex items-center justify-center text-slate-500 font-bold overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img alt="Trần Thị Minh" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjN8HsIdKsWlAC3e5UUEnQD2WwioKW11PCwPmSYJT-g9P19TjDZihMTA6ZpvrLuEdsv2baeNt_WUcfGWg8TVETZLR2kVyolnu44DYAxJ2b0jR6ONxGO9BtjG0fTzCffoNX9jv0sKjsdfWH9TySDCGUUNssHAp790t7Fvrxt6ITCO1Zo93ZPexfyFF_9QlWqIZI5bbu_8JzRHlIUkXi0FT9_80yWpFSovPVPeQdGKEDRHX_1J3_BKJ8O983CYn0ejvHFnJ3gGOBnkyo"/>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-900 dark:text-slate-100 font-bold">Trần Thị Minh</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                    0912 345 678
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                    Thanh Xuân, Hà Nội
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <Link href="/admin/moi-gioi/demo" className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1" title="Chỉnh sửa">
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </Link>
                    <button className="text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors p-1 ml-1" title="Xóa">
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 bg-cover bg-center border border-slate-300 dark:border-slate-600 flex items-center justify-center text-slate-500 font-bold overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img alt="Lê Hoàng Long" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCF7_a9QO3ZTe9AiE0RaqZHk4WWVdF8JV_exc_ZElD2Fa5J2xHahPnCEuHsk91hG_7UTXvzhgjeVzkw696xse4o5FTbNDEDYlyxRAX5diyLuzRi47pYS4sfljywyqy7iuHKx2DTu0wj0-flpf2Ty4FTv5cwMaXclLpXUR0ix-DICxoMjwNBPBFerF2eXQXOljYKsWq4-ZC6VnWib1MRPnTERY-0rWX5tKD3yNdpfJft8EbbihGoZSdPaYO0_oRIjKYeaoibejKbesXn"/>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-900 dark:text-slate-100 font-bold">Lê Hoàng Long</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                    0988 777 999
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                    Sơn Trà, Đà Nẵng
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <Link href="/admin/moi-gioi/demo" className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1" title="Chỉnh sửa">
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
