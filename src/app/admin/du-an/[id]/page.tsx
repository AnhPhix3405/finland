import Link from "next/link";
import React from "react";

export default function AdminProjectDetail() {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Thông tin dự án</h2>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-sm border border-slate-200 dark:border-slate-700 shadow-sm p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="projectName">Tên dự án <span className="text-red-500">*</span></label>
                <input className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-sm text-sm focus:ring-primary focus:border-primary dark:text-white placeholder-slate-400" id="projectName" placeholder="Nhập tên dự án..." type="text" />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="projectType">Loại hình <span className="text-red-500">*</span></label>
                <select className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-sm text-sm focus:ring-primary focus:border-primary dark:text-white text-slate-700" id="projectType">
                  <option value="">Chọn loại hình</option>
                  <option value="canho">Căn hộ</option>
                  <option value="datnen">Đất nền</option>
                  <option value="bietthu">Biệt thự</option>
                  <option value="nhapho">Nhà phố</option>
                  <option value="shophouse">Shophouse</option>
                </select>
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="projectArea">Diện tích (m2)</label>
                <div className="flex flex-row gap-1">
                  <input className="inline-block min-w-10 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-sm text-sm focus:ring-primary focus:border-primary dark:text-white placeholder-slate-400" id="projectArea" placeholder="Từ" type="number" />
                  <input className="inline-block min-w-10 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-sm text-sm focus:ring-primary focus:border-primary dark:text-white placeholder-slate-400" id="projectArea" placeholder="Đến" type="number" />
                </div>
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="projectCity">Tỉnh / Thành phố <span className="text-red-500">*</span></label>
                <select className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-sm text-sm focus:ring-primary focus:border-primary dark:text-white text-slate-700" id="projectCity">
                  <option value="">Chọn Tỉnh / Thành phố</option>
                  <option value="hcm">TP. Hồ Chí Minh</option>
                  <option value="hn">Hà Nội</option>
                  <option value="dn">Đà Nẵng</option>
                </select>
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="projectDistrict">Quận / Huyện <span className="text-red-500">*</span></label>
                <select className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-sm text-sm focus:ring-primary focus:border-primary dark:text-white text-slate-700" disabled id="projectDistrict">
                  <option value="">Chọn Quận / Huyện</option>
                </select>
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Mô tả dự án</label>
                <div className="border border-slate-300 dark:border-slate-600 rounded-sm overflow-hidden bg-white dark:bg-slate-800">
                  <div className="bg-slate-50 dark:bg-slate-800 border-b border-slate-300 dark:border-slate-600 px-3 py-2 flex items-center gap-1 flex-wrap">
                    <button type="button" className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-sm transition-colors" title="Bold">
                      <span className="material-symbols-outlined text-[18px]">format_bold</span>
                    </button>
                    <button type="button" className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-sm transition-colors" title="Italic">
                      <span className="material-symbols-outlined text-[18px]">format_italic</span>
                    </button>
                    <button type="button" className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-sm transition-colors" title="Heading">
                      <span className="material-symbols-outlined text-[18px]">title</span>
                    </button>
                    <div className="w-px h-5 bg-slate-300 dark:bg-slate-600 mx-1"></div>
                    <button type="button" className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-sm transition-colors" title="Bulleted List">
                      <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
                    </button>
                    <button type="button" className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-sm transition-colors" title="Numbered List">
                      <span className="material-symbols-outlined text-[18px]">format_list_numbered</span>
                    </button>
                    <div className="w-px h-5 bg-slate-300 dark:bg-slate-600 mx-1"></div>
                    <button type="button" className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-sm transition-colors" title="Insert Image">
                      <span className="material-symbols-outlined text-[18px]">image</span>
                    </button>
                    <button type="button" className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-sm transition-colors" title="Insert Link">
                      <span className="material-symbols-outlined text-[18px]">link</span>
                    </button>
                  </div>
                  <textarea className="w-full h-48 p-4 border-0 focus:ring-0 resize-y bg-transparent text-sm dark:text-white placeholder-slate-400" id="projectDescription" placeholder="Nhập mô tả chi tiết về dự án..."></textarea>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Hình ảnh dự án</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 dark:border-slate-600 border-dashed rounded-sm hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer">
                  <div className="space-y-1 text-center">
                    <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">cloud_upload</span>
                    <div className="flex text-sm text-slate-600 dark:text-slate-400 justify-center">
                      <label htmlFor="file-upload" className="relative cursor-pointer rounded-sm bg-transparent font-medium text-primary hover:text-emerald-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
                        <span>Tải ảnh lên</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                      </label>
                      <p className="pl-1">hoặc kéo thả vào đây</p>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">PNG, JPG, GIF tối đa 10MB</p>
                  </div>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 flex items-center justify-between py-3 border-t border-slate-200 dark:border-slate-700 mt-2">
                <div>
                  <h3 className="text-sm font-medium text-slate-900 dark:text-white">Trạng thái hiển thị</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Hiển thị dự án này trên website công khai.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-600"></div>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-200 dark:border-slate-700">
              <Link href="/admin/du-an" className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-sm text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors inline-block">
                Hủy
              </Link>
              <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-sm text-sm font-medium transition-colors">
                Lưu dự án
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
