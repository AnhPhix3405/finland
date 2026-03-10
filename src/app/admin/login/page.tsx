"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // TODO: Replace with real API call later
      // Simulate API verification
      await new Promise(resolve => setTimeout(resolve, 800));

      if (username === 'admin' && password === 'admin@123') {
        // Set a dummy cookie to simulate session for middleware
        document.cookie = "admin_session=true; path=/; max-age=86400";
        router.push('/admin/dashboard');
        router.refresh();
      } else {
        setError('Tên đăng nhập hoặc mật khẩu không chính xác');
      }
    } catch (err) {
      setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Đăng nhập Admin</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Hệ thống quản trị nội bộ finland.vn</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-md border border-red-100 dark:border-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Tên đăng nhập
            </label>
            <input
              id="username"
              type="text"
              name="username"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 transition-colors dark:text-white"
              placeholder="Nhập tên đăng nhập"
              autoFocus
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 transition-colors dark:text-white"
              placeholder="Nhập mật khẩu"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-600/50 disabled:cursor-wait text-white font-medium py-2.5 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="material-symbols-outlined animate-spin text-sm" aria-hidden="true">progress_activity</span>
                <span>Đang xử lý...</span>
              </>
            ) : (
              'Đăng nhập'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
