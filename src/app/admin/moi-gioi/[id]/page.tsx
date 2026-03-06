import Link from "next/link";
import React from "react";

export default function AdminBrokerDetail() {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Thông tin Môi giới</h2>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-sm border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
          <form className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-full md:w-1/3 flex flex-col items-center gap-3">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 w-full text-center">Ảnh đại diện</label>
                <div className="w-32 h-32 rounded-full border-2 border-dashed border-slate-300 dark:border-slate-600 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors relative overflow-hidden group">
                  <span className="material-symbols-outlined text-slate-400 text-3xl group-hover:text-primary transition-colors">add_a_photo</span>
                  <span className="text-xs text-slate-500 mt-2 text-center px-2">Tải ảnh đại diện lên</span>
                  <input accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" type="file" />
                </div>
              </div>
              <div className="w-full md:w-2/3 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Họ và Tên <span className="text-red-500">*</span></label>
                  <input className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm text-sm focus:ring-1 focus:ring-primary focus:border-primary dark:text-white placeholder-slate-400" placeholder="Nhập họ và tên môi giới..." type="text" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Số điện thoại <span className="text-red-500">*</span></label>
                    <input className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm text-sm focus:ring-1 focus:ring-primary focus:border-primary dark:text-white placeholder-slate-400" placeholder="Nhập số điện thoại..." type="tel" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                    <input className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm text-sm focus:ring-1 focus:ring-primary focus:border-primary dark:text-white placeholder-slate-400" placeholder="Nhập địa chỉ email..." type="email" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Chuyên môn</label>
                  <select className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm text-sm focus:ring-1 focus:ring-primary focus:border-primary dark:text-white">
                    <option value="">Chọn chuyên môn...</option>
                    <option value="canho">Căn hộ</option>
                    <option value="datnen">Đất nền</option>
                    <option value="bietthu">Biệt thự</option>
                    <option value="nhapho">Nhà phố</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Khu vực hoạt động</label>
                  <div className="flex flex-row gap-2">
                    <select className="min-w-10 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm text-sm focus:ring-1 focus:ring-primary focus:border-primary dark:text-white">
                      <option value="">Chọn Tỉnh/Thành Phố...</option>
                      <option value="q2">TP.HCM</option>
                      <option value="tx">Hà Nội</option>
                    </select>
                    <select className="min-w-10 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm text-sm focus:ring-1 focus:ring-primary focus:border-primary dark:text-white">
                      <option value="">Chọn Quận/Huyện...</option>
                      <option value="q2">Quận 2</option>
                      <option value="q9">Quận 9</option>
                      <option value="tx">Thanh Xuân</option>
                      <option value="cg">Cầu Giấy</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Giới thiệu bản thân</label>
              <textarea className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-sm text-sm focus:ring-1 focus:ring-primary focus:border-primary dark:text-white placeholder-slate-400" placeholder="Nhập thông tin giới thiệu, kinh nghiệm làm việc..." rows={4}></textarea>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
              <Link href="/admin/moi-gioi" className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-sm text-sm font-medium transition-colors inline-block">
                Hủy
              </Link>
              <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-sm text-sm font-medium transition-colors" type="button">
                Lưu thông tin
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
