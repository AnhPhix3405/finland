"use client";

import { User, Camera, Bell } from "lucide-react";

export default function ProfileSection() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800">
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">Thông tin cá nhân</h1>
        <p className="text-sm text-slate-500 mt-1">Quản lý thông tin hồ sơ của bạn để cá nhân hóa trải nghiệm.</p>
      </div>

      <div className="p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 lg:mb-10">
          <div className="relative shrink-0">
            <div className="size-24 md:size-32 rounded-lg bg-emerald-50 dark:bg-emerald-900/10 text-emerald-500 flex items-center justify-center overflow-hidden border border-emerald-100 dark:border-slate-700">
              <User className="size-10 md:size-16 opacity-50" />
            </div>
            <button
              type="button"
              className="absolute -bottom-3 -right-3 bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 rounded-full p-2 hover:text-emerald-600 transition-colors"
              aria-label="Đổi ảnh đại diện"
            >
              <Camera className="size-4 md:size-5" />
            </button>
          </div>
          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-slate-900 dark:text-white">Ảnh hồ sơ</h4>
            <p className="text-sm text-slate-500 mb-3">Định dạng JPG, PNG hoặc GIF. Tối đa 5MB.</p>
            <div className="flex justify-center sm:justify-start gap-2">
              <button
                type="button"
                className="px-4 py-1.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Tải ảnh lên
              </button>
              <button
                type="button"
                className="px-4 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded transition-colors"
              >
                Xóa ảnh
              </button>
            </div>
          </div>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Họ và Tên <span className="text-red-500">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                defaultValue="Long"
                className="w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500 transition-all text-sm h-10 px-3 shadow-sm"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phoneNumber" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="phoneNumber"
                  type="tel"
                  defaultValue="0987 654 321"
                  readOnly
                  className="w-full rounded-md bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 text-sm cursor-not-allowed pr-20 h-10 px-3 shadow-sm"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-wider text-emerald-600 hover:underline"
                >
                  Thay đổi
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="emailAddress" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Email
              </label>
              <input
                id="emailAddress"
                type="email"
                defaultValue="long@example.com"
                className="w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500 transition-all text-sm h-10 px-3 shadow-sm"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="interestedArea" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Khu vực quan tâm
              </label>
              <select
                id="interestedArea"
                defaultValue="hn"
                className="w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500 transition-all text-sm h-10 px-3 shadow-sm"
              >
                <option value="hn">Hà Nội</option>
                <option value="hcm">TP. Hồ Chí Minh</option>
                <option value="dn">Đà Nẵng</option>
                <option value="other">Khác</option>
              </select>
            </div>

            <div className="space-y-3 md:col-span-2 pt-2 pb-4">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Bell className="size-4" /> Cài đặt thông báo
              </h3>
              <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-lg border border-slate-100 dark:border-slate-800">
                <input
                  id="emailNotifications"
                  type="checkbox"
                  defaultChecked
                  className="size-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600 dark:border-slate-600 dark:bg-slate-700"
                />
                <label
                  htmlFor="emailNotifications"
                  className="text-sm text-slate-600 dark:text-slate-400 font-medium cursor-pointer select-none"
                >
                  Nhận tin tức dự án mới, ưu đãi qua email
                </label>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-4 border-t border-slate-100 dark:border-slate-800 mt-8">
            <button
              type="button"
              className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md shadow-sm transition-all active:scale-95"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
