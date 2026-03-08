"use client";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="max-w-md w-full bg-white dark:bg-slate-900 p-8 shadow-sm border border-slate-200 dark:border-slate-800 rounded-sm">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Đăng nhập
        </h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm">
          Chào mừng bạn trở lại với finland.vn
        </p>
      </div>
      <form action="#" className="space-y-6">
        <div>
          <label
            htmlFor="identifier"
            className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
          >
            Số điện thoại
          </label>
          <input
            type="tel"
            id="identifier"
            name="identifier"
            placeholder="Nhập số điện thoại của bạn"
            required
            className="block w-full px-4 py-3 border border-slate-300 rounded-sm dark:border-slate-700 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 placeholder-slate-400 dark:placeholder-slate-500"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
            >
              Mật khẩu
            </label>
            <Link
              href="#"
              className="text-sm font-medium text-emerald-600 hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Nhập mật khẩu"
              required
              className="block w-full px-4 py-3 border border-slate-300 rounded-sm dark:border-slate-700 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 placeholder-slate-400 dark:placeholder-slate-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="remember-me"
            name="remember-me"
            className="h-4 w-4 rounded-sm border-slate-300 text-emerald-600 focus:ring-emerald-500"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-slate-600 dark:text-slate-400"
          >
            Ghi nhớ đăng nhập
          </label>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-sm shadow-sm text-base font-bold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all"
        >
          Đăng nhập
        </button>
      </form>
      <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 text-center">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Chưa có tài khoản?
          <Link
            href="/dang-ky"
            className="font-bold text-emerald-600 hover:underline ml-1"
          >
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
}
