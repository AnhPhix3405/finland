"use client";

import Link from "next/link";
import { User, List, Heart, Lock, LogOut, Camera, Edit2, Bell } from "lucide-react";

export default function AccountPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/4">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col items-center text-center">
              <div className="relative group cursor-pointer mb-4">
                <div className="size-24 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center overflow-hidden border-4 border-emerald-100 dark:border-emerald-900/50">
                  <User className="size-12" />
                </div>
                <div className="absolute bottom-0 right-0 bg-emerald-600 text-white p-1.5 rounded-full border-2 border-white dark:border-slate-900 shadow-md">
                  <Edit2 className="size-3" />
                </div>
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Long</h3>
              <p className="text-sm text-emerald-600 font-medium">Thành viên</p>
            </div>
            <nav className="p-2 space-y-1">
              <Link className="flex items-center gap-3 px-4 py-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 font-semibold text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500" href="/tai-khoan">
                <User className="size-4" />
                Thông tin cá nhân
              </Link>
              <Link className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500" href="#">
                <List className="size-4" />
                Tin đăng của tôi
              </Link>
              <Link className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500" href="#">
                <Heart className="size-4" />
                Tin đã lưu
              </Link>
              <Link className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500" href="#">
                <Lock className="size-4" />
                Đổi mật khẩu
              </Link>
              <div className="h-px bg-slate-100 dark:bg-slate-800 my-2 mx-4 border-0"></div>
              <button type="button" className="w-full flex items-center justify-start gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500">
                <LogOut className="size-4" />
                Đăng xuất
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <section className="flex-1">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
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
                  <button type="button" className="absolute -bottom-3 -right-3 bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 rounded-full p-2 hover:text-emerald-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500" aria-label="Đổi ảnh đại diện">
                    <Camera className="size-4 md:size-5" />
                  </button>
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="font-semibold text-slate-900 dark:text-white">Ảnh hồ sơ</h4>
                  <p className="text-sm text-slate-500 mb-3">Định dạng JPG, PNG hoặc GIF. Tối đa 5MB.</p>
                  <div className="flex justify-center sm:justify-start gap-2">
                    <button type="button" className="px-4 py-1.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">
                      Tải ảnh lên
                    </button>
                    <button type="button" className="px-4 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500">
                      Xóa ảnh
                    </button>
                  </div>
                </div>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Tên hiển thị */}
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Họ và Tên <span className="text-red-500">*</span>
                    </label>
                    <input 
                      id="fullName"
                      type="text" 
                      defaultValue="Long" 
                      className="w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500 transition-all text-sm h-10 px-3 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    />
                  </div>

                  {/* Số điện thoại (Readonly) */}
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
                        className="w-full rounded-md bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 text-sm cursor-not-allowed pr-20 h-10 px-3 shadow-sm focus:outline-none"
                      />
                      <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-wider text-emerald-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-sm">
                        Thay đổi
                      </button>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="emailAddress" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Email
                    </label>
                    <input 
                      id="emailAddress"
                      type="email" 
                      defaultValue="long@example.com"
                      className="w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500 transition-all text-sm h-10 px-3 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    />
                  </div>

                  {/* Khu vực quan tâm */}
                  <div className="space-y-2">
                    <label htmlFor="interestedArea" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Khu vực quan tâm
                    </label>
                    <select 
                      id="interestedArea"
                      defaultValue="hn"
                      className="w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500 transition-all text-sm h-10 px-3 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    >
                      <option value="hn">Hà Nội</option>
                      <option value="hcm">TP. Hồ Chí Minh</option>
                      <option value="dn">Đà Nẵng</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>

                  {/* Nhận thông báo */}
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
                      <label htmlFor="emailNotifications" className="text-sm text-slate-600 dark:text-slate-400 font-medium cursor-pointer select-none">
                        Nhận tin tức dự án mới, ưu đãi qua email
                      </label>
                    </div>
                  </div>
                </div>

                {/* Submit buttons */}
                <div className="pt-6 flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-4 border-t border-slate-100 dark:border-slate-800 mt-8">
                  <button type="button" className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500">
                    Hủy bỏ
                  </button>
                  <button type="submit" className="w-full sm:w-auto px-8 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900">
                    Lưu thay đổi
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
