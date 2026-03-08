"use client";

import { Camera, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="max-w-md w-full bg-white dark:bg-slate-900 p-8 shadow-sm border border-slate-200 dark:border-slate-800 rounded-none">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Đăng ký tài khoản
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Tham gia cộng đồng bất động sản finland.vn
        </p>
      </div>
      <form className="space-y-4">
        {/* Profile Picture Upload */}
        <div>
          <label
            htmlFor="profile-pic"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Ảnh đại diện <span className="text-slate-400 font-normal">(không bắt buộc)</span>
          </label>
          <div className="mt-1 flex items-center gap-4">
            <div className="size-12 rounded-none bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-dashed border-slate-300 dark:border-slate-700">
              <Camera className="text-slate-400 h-6 w-6" />
            </div>
            <input
              type="file"
              id="profile-pic"
              className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-xs file:font-semibold file:bg-emerald-600 file:text-white hover:file:opacity-90 cursor-pointer"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Số điện thoại <span className="text-red-500 font-bold">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Nhập số điện thoại (tài khoản đăng nhập)"
            required
            className="block w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
          />
        </div>

        {/* Full Name */}
        <div>
          <label
            htmlFor="full-name"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Họ tên <span className="text-red-500 font-bold">*</span>
          </label>
          <input
            type="text"
            id="full-name"
            name="full-name"
            placeholder="Nhập họ và tên"
            required
            className="block w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Province/City */}
          <div>
            <label
              htmlFor="province"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >
              Tỉnh/Thành <span className="text-red-500 font-bold">*</span>
            </label>
            <select
              id="province"
              name="province"
              required
              className="block w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
            >
              <option value="">Chọn Tỉnh/Thành</option>
              <option value="hanoi">Hà Nội</option>
              <option value="hcm">TP. Hồ Chí Minh</option>
            </select>
          </div>
          {/* District */}
          <div>
            <label
              htmlFor="district"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >
              Quận/Huyện <span className="text-red-500 font-bold">*</span>
            </label>
            <select
              id="district"
              name="district"
              required
              className="block w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
            >
              <option value="">Chọn Quận/Huyện</option>
            </select>
          </div>
        </div>

        {/* Referral Phone Number */}
        <div>
          <label
            htmlFor="referral-phone"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Số điện thoại người giới thiệu <span className="text-slate-400 font-normal">(không bắt buộc)</span>
          </label>
          <input
            type="tel"
            id="referral-phone"
            name="referral-phone"
            placeholder="Nhập số điện thoại người giới thiệu"
            className="block w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Email <span className="text-slate-400 font-normal">(không bắt buộc)</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@gmail.com"
            className="block w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
          />
        </div>

        {/* Mật khẩu */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Mật khẩu <span className="text-red-500 font-bold">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="••••••••"
              required
              className="block w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Xác nhận mật khẩu */}
        <div>
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Xác nhận mật khẩu <span className="text-red-500 font-bold">*</span>
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirm-password"
              name="confirm-password"
              placeholder="••••••••"
              required
              className="block w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Điều khoản */}
        <div className="flex items-start gap-2 py-2">
          <input
            type="checkbox"
            id="terms"
            required
            className="mt-1 h-4 w-4 rounded-none border-slate-300 dark:border-slate-700 text-emerald-600 focus:ring-emerald-500"
          />
          <label
            htmlFor="terms"
            className="text-xs text-slate-600 dark:text-slate-400"
          >
            Tôi đồng ý với{" "}
            <Link href="#" className="text-emerald-600 hover:underline">
              Điều khoản dịch vụ
            </Link>{" "}
            và{" "}
            <Link href="#" className="text-emerald-600 hover:underline">
              Chính sách bảo mật
            </Link>
            .
          </label>
        </div>

        {/* Nút Đăng ký */}
        <button
          type="submit"
          className="w-full flex justify-center items-center px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-sm transition-colors"
        >
          Đăng ký
        </button>

        {/* Liên kết Đăng nhập */}
        <div className="text-center pt-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Đã có tài khoản?{" "}
            <Link
              href="/dang-nhap"
              className="text-emerald-600 font-semibold hover:underline"
            >
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
