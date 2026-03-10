"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, LogIn, UserPlus } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu on navigation
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: "Trang Chủ" },
    { href: "#", label: "Bản Đồ Quy Hoạch" },
    { href: "/du-an", label: "Dự Án" },
    { href: "/tin-tuc", label: "Tin Tức" },
    { href: "/mua-ban", label: "Mua Bán" },
    { href: "/cho-thue", label: "Cho Thuê" },
    { href: "/moi-gioi", label: "Môi Giới" },
  ];

  const getLinkClass = (href: string) => {
    // Exact match for home, startsWith for others to highlight subpages
    const isActive = href === "/" ? pathname === "/" : pathname?.startsWith(href) && href !== "#";

    return isActive
      ? "text-primary font-medium border-b-2 border-primary py-4.5 h-14 flex items-center"
      : "text-gray-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary font-medium py-4.5 h-14 flex items-center transition-colors";
  };

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <div className="flex-shrink-0 flex items-center">
            <Link className="text-2xl font-bold text-emerald-700 tracking-tight" href="/">
              finland.vn
            </Link>
          </div>
          <nav className="hidden md:flex space-x-6 text-sm">
            {navLinks.map((link, index) => (
              <Link key={index} className={getLinkClass(link.href)} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/dang-nhap"
              className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-sm hover:text-primary dark:hover:text-primary hover:border-primary dark:hover:border-primary transition-colors"
            >
              Đăng nhập
            </Link>
            <Link
              href="/dang-ky"
              className="px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-sm transition-colors"
            >
              Đăng ký
            </Link>
          </div>
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 p-2" 
              type="button"
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Drawer Content */}
          <div className="absolute top-0 right-0 bottom-0 w-[280px] bg-white dark:bg-slate-900 shadow-xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-4 border-b dark:border-slate-800">
              <span className="font-bold text-emerald-700">finland.vn</span>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
              >
                <X className="size-6 text-slate-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
              <nav className="flex flex-col">
                {navLinks.map((link, index) => {
                  const isActive = link.href === "/" ? pathname === "/" : pathname?.startsWith(link.href) && link.href !== "#";
                  return (
                    <Link 
                      key={index} 
                      href={link.href}
                      className={`px-6 py-4 text-sm font-semibold transition-colors ${
                        isActive 
                          ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20" 
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="p-6 border-t dark:border-slate-800 space-y-3">
              <Link 
                href="/dang-nhap"
                className="flex items-center justify-center gap-2 w-full py-3 text-sm font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg"
              >
                <LogIn className="size-4" />
                Đăng nhập
              </Link>
              <Link 
                href="/dang-ky"
                className="flex items-center justify-center gap-2 w-full py-3 text-sm font-bold text-white bg-emerald-600 rounded-lg text-center"
              >
                <UserPlus className="size-4" />
                Đăng ký
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
