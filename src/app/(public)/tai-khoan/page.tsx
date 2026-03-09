"use client";

import Link from "next/link";
import { User, List, Heart, Lock, LogOut, Camera, Edit2, Bell, Loader2 } from "lucide-react";
import { useAuthStore } from "@/src/store/authStore";
import { useUserStore } from "@/src/store/userStore";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { updateBroker, UpdateBrokerData } from "@/src/app/modules/broker.service";
import { uploadBrokerAvatar } from "@/src/app/modules/upload.service";

export default function AccountPage() {
  const router = useRouter();
  const { isAuthenticated, clearAuth } = useAuthStore();
  const { user, clearUser } = useUserStore();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form data state
  const [formData, setFormData] = useState<UpdateBrokerData>({
    full_name: '',
    email: '',
    province: '',
  });

  // Initialize form data when user is loaded
  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || '',
        email: user.email || '',
        province: user.province || '',
      });
    }
  }, [user]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push("/dang-nhap");
    }
  }, [mounted, isAuthenticated, router]);

  const handleLogout = () => {
    clearAuth();
    clearUser();
    router.push("/dang-nhap");
    router.refresh();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear message when user types
    if (message.text) setMessage({ type: '', text: '' });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Chỉ chấp nhận file ảnh (JPG, PNG, GIF)' });
      return;
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB
      setMessage({ type: 'error', text: 'Kích thước file không được vượt quá 5MB' });
      return;
    }

    // Store file in state and create preview
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setMessage({ type: '', text: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.slug) return;

    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      let updateData = { ...formData };
      
      // Upload avatar first if there's a selected file
      if (selectedFile) {
        const uploadResult = await uploadBrokerAvatar(selectedFile, user.slug);
        if (uploadResult && uploadResult.brokerUpdate?.success) {
          // Avatar already updated in database by uploadBrokerAvatar
          updateData.avatar_url = uploadResult.secure_url;
        } else {
          throw new Error('Failed to upload avatar');
        }
      }
      
      // Update other broker info if form data changed
      const hasFormChanges = (
        formData.full_name !== user.full_name ||
        formData.email !== (user.email || '') ||
        formData.province !== (user.province || '')
      );
      
      if (hasFormChanges || selectedFile) {
        const result = await updateBroker(user.slug, updateData);
        
        if (result.success) {
          // Clear selected file and preview after successful update
          setSelectedFile(null);
          setPreviewUrl(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
          
          setMessage({ type: 'success', text: 'Cập nhật thông tin thành công!' });
        } else {
          setMessage({ type: 'error', text: result.error || 'Có lỗi xảy ra khi cập nhật thông tin' });
        }
      } else {
        setMessage({ type: 'info', text: 'Không có thay đổi nào để lưu' });
      }
    } catch (error) {
      console.error('Update profile error:', error);
      setMessage({ type: 'error', text: 'Lỗi kết nối. Vui lòng thử lại.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted || !isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-500">Đang tải...</div>
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/4">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col items-center text-center">
              <div className="relative group cursor-pointer mb-4">
                <div className="size-24 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center overflow-hidden border-4 border-emerald-100 dark:border-emerald-900/50">
                  {user?.avatar_url ? (
                    <img 
                      src={user.avatar_url} 
                      alt={user.full_name} 
                      className="size-full rounded-full object-cover" 
                    />
                  ) : (
                    <User className="size-12" />
                  )}
                </div>
                <div className="absolute bottom-0 right-0 bg-emerald-600 text-white p-1.5 rounded-full border-2 border-white dark:border-slate-900 shadow-md">
                  <Edit2 className="size-3" />
                </div>
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">{user.full_name}</h3>
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
              <button 
                type="button" 
                onClick={handleLogout}
                className="w-full flex items-center justify-start gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              >
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
                    {previewUrl ? (
                      <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="size-full rounded-lg object-cover" 
                      />
                    ) : user?.avatar_url ? (
                      <img 
                        src={user.avatar_url} 
                        alt={user.full_name} 
                        className="size-full rounded-lg object-cover" 
                      />
                    ) : (
                      <User className="size-10 md:size-16 opacity-50" />
                    )}
                  </div>
                  <button 
                    type="button" 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isSubmitting}
                    className="absolute -bottom-3 -right-3 bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 rounded-full p-2 hover:text-emerald-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed" 
                    aria-label="Đổi ảnh đại diện"
                  >
                    <Camera className="size-4 md:size-5" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="font-semibold text-slate-900 dark:text-white">Ảnh hồ sơ</h4>
                  <p className="text-sm text-slate-500 mb-3">Định dạng JPG, PNG hoặc GIF. Tối đa 5MB.</p>
                  {selectedFile && (
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 mb-2">
                      Đã chọn: {selectedFile.name}
                    </p>
                  )}
                  <div className="flex justify-center sm:justify-start gap-2">
                    <button 
                      type="button" 
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isSubmitting}
                      className="px-4 py-1.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Chọn ảnh
                    </button>
                    {(selectedFile || user?.avatar_url) && (
                      <button 
                        type="button" 
                        onClick={() => {
                          setSelectedFile(null);
                          setPreviewUrl(null);
                          if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                          }
                        }}
                        disabled={isSubmitting}
                        className="px-4 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {selectedFile ? 'Bỏ chọn' : 'Xóa ảnh'}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {message.text && (
                <div className={`mb-6 p-3 rounded-sm text-sm ${
                  message.type === 'success' 
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400'
                    : message.type === 'info'
                    ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400'
                    : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400'
                }`}>
                  {message.text}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Tên hiển thị */}
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Họ và Tên <span className="text-red-500">*</span>
                    </label>
                    <input 
                      id="fullName"
                      name="full_name"
                      type="text" 
                      value={formData.full_name}
                      onChange={handleInputChange}
                      className="w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500 transition-all text-sm h-10 px-3 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                      required
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
                        defaultValue={user.phone} 
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
                      name="email"
                      type="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Nhập email của bạn"
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
                      name="province"
                      value={formData.province}
                      onChange={handleInputChange}
                      className="w-full rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500 transition-all text-sm h-10 px-3 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    >
                      <option value="">Chọn khu vực</option>
                      <option value="Hà Nội">Hà Nội</option>
                      <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                      <option value="Đà Nẵng">Đà Nẵng</option>
                      <option value="Khác">Khác</option>
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
                  <button 
                    type="button" 
                    onClick={() => {
                      // Reset form to original values
                      if (user) {
                        setFormData({
                          full_name: user.full_name || '',
                          email: user.email || '',
                          province: user.province || '',
                        });
                      }
                      // Clear selected file and preview
                      setSelectedFile(null);
                      setPreviewUrl(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                      }
                      setMessage({ type: '', text: '' });
                    }}
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Hủy bỏ
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting && <Loader2 className="size-4 animate-spin" />}
                    {isSubmitting ? 'Đang lưu...' : 'Lưu thay đổi'}
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
