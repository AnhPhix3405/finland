'use client';
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { uploadProjectFile, deleteAttachment } from "@/src/app/modules/upload.service";
import RichTextEditor from "@/src/components/ui/RichTextEditor";
const provinces = [
  "Tuyên Quang",
  "Lào Cai",
  "Thái Nguyên",
  "Phú Thọ",
  "Bắc Ninh",
  "Hưng Yên",
  "Hải Phòng",
  "Ninh Bình",
  "Quảng Trị",
  "Đà Nẵng",
  "Quảng Ngãi",
  "Gia Lai",
  "Khánh Hoà",
  "Lâm Đồng",
  "Đắk Lắk",
  "Hồ Chí Minh",
  "Đồng Nai",
  "Tây Ninh",
  "Cần Thơ",
  "Vĩnh Long",
  "Đồng Tháp",
  "Cà Mau",
  "An Giang",
  "Hà Nội",
  "Huế",
  "Lai Châu",
  "Điện Biên",
  "Sơn La",
  "Lạng Sơn",
  "Quảng Ninh",
  "Thanh Hoá",
  "Nghệ An",
  "Hà Tĩnh",
  "Cao Bằng"
];
interface Attachment {
  id: string;
  url: string;
  secure_url: string;
  public_id: string | null;
  original_name: string | null;
  size_bytes: string | null;
  project_id: string;
  created_at: string;
}

export default function AdminProjectDetail() {
  const params = useParams();
  const slug = params?.id as string;

  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [description, setDescription] = useState<string>('');

  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [districtsList, setDistrictsList] = useState<{ name: string }[]>([]);

  useEffect(() => {
    if (!selectedProvince) {
      setDistrictsList([]);
      return;
    }
    const fetchDistricts = async () => {
      try {
        const url = `https://vietnamlabs.com/api/vietnamprovince?province=${encodeURIComponent(selectedProvince)}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data?.success && data?.data?.wards) {
          setDistrictsList(data.data.wards);
        } else {
          setDistrictsList([]);
        }
      } catch (err) {
        console.error('Error fetching districts/wards:', err);
      }
    };
    fetchDistricts();
  }, [selectedProvince]);

  // Reset selected district when province changes
  useEffect(() => {
    setSelectedDistrict('');
  }, [selectedProvince]);


  // Mock initial images
  const [initialImages] = useState([
    { public_id: 'mock_1', url: 'https://placehold.co/400x300/1e293b/ffffff?text=Image+1' },
    { public_id: 'mock_2', url: 'https://placehold.co/400x300/334155/ffffff?text=Image+2' },
    { public_id: 'mock_3', url: 'https://placehold.co/400x300/475569/ffffff?text=Image+3' }
  ]);

  // Images fetched from API
  const [images, setImages] = useState<Attachment[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [deletedApiImages, setDeletedApiImages] = useState<string[]>([]);
  const [projectId, setProjectId] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const fetchImages = async () => {
      setLoadingImages(true);
      try {
        const res = await fetch(`/api/attachments?slug=${encodeURIComponent(slug)}&limit=100`);
        const json = await res.json();
        if (json.success) {
          setImages(json.data);
          if (json.data.length > 0) {
            setProjectId(json.data[0].project_id);
          }
        }
      } catch (err) {
        console.error('Lỗi khi tải ảnh từ API:', err);
      } finally {
        setLoadingImages(false);
      }
    };
    fetchImages();
  }, [slug]);

  const handleRemoveApiImage = (id: string) => {
    setDeletedApiImages(prev => [...prev, id]);
  };

  const handleRemoveMockImage = (public_id: string) => {
    setDeletedImages(prev => [...prev, public_id]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setNewFiles(prev => [...prev, ...filesArray]);
    }
  };

  const handleRemoveNewFile = (index: number) => {
    setNewFiles(prev => prev.filter((_, i) => i !== index));
  };

  const currentMockImages = initialImages.filter(img => !deletedImages.includes(img.public_id));

  const handleSave = async () => {
    if (!projectId) {
      alert('Không tìm thấy project ID!');
      return;
    }

    setIsUploading(true);
    try {
      // Upload tất cả file mới song song
      if (newFiles.length > 0) {
        const results = await Promise.all(
          newFiles.map((file) => uploadProjectFile(file, projectId))
        );
        console.log('Upload results:', results);
      }

      // Fire and forget: xóa các attachment API đã đánh dấu xóa
      if (deletedApiImages.length > 0) {
        deletedApiImages.forEach((public_id) => {
          deleteAttachment(public_id)
            .then((res) => console.log('Deleted:', public_id, res))
            .catch((err) => console.error('Delete failed:', public_id, err));
        });
      }

      alert('Lưu dự án thành công!');
    } catch (error) {
      console.error('Lỗi khi lưu dự án:', error);
      alert('Có lỗi xảy ra khi lưu dự án!');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Thông tin dự án</h2>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-sm border border-slate-200 dark:border-slate-700 shadow-sm p-6">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
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
                  <input className="inline-block min-w-10 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-sm text-sm focus:ring-primary focus:border-primary dark:text-white placeholder-slate-400" id="projectAreaMin" placeholder="Từ" type="number" />
                  <input className="inline-block min-w-10 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-sm text-sm focus:ring-primary focus:border-primary dark:text-white placeholder-slate-400" id="projectAreaMax" placeholder="Đến" type="number" />
                </div>
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="projectCity">Tỉnh / Thành phố <span className="text-red-500">*</span></label>
                <select
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-sm text-sm focus:ring-primary focus:border-primary dark:text-white text-slate-700"
                  id="projectCity"
                >
                  <option value="">Chọn Tỉnh / Thành phố</option>
                  {provinces.map((prov) => (
                    <option key={prov} value={prov}>{prov}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="projectDistrict">Phường / Xã <span className="text-red-500">*</span></label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  disabled={!selectedProvince || districtsList.length === 0}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-sm text-sm focus:ring-primary focus:border-primary dark:text-white text-slate-700 disabled:opacity-50 disabled:bg-slate-100 dark:disabled:bg-slate-900"
                  id="projectDistrict"
                >
                  <option value="">Chọn Phường/Xã</option>
                  {districtsList.map((district, idx) => (
                    <option key={idx} value={district.name}>{district.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Mô tả dự án</label>
                <div className="border border-slate-300 dark:border-slate-600 rounded-[3px] overflow-hidden bg-white dark:bg-slate-800">
                  <RichTextEditor value={description} onChange={setDescription} />
                </div>
              </div>

              {/* Images section */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Hình ảnh dự án</label>

                {/* Danh sách ảnh từ API */}
                {loadingImages ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="rounded-sm overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-700 h-32 animate-pulse" />
                    ))}
                  </div>
                ) : images.filter(img => !deletedApiImages.includes(img.id)).length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {images
                      .filter(img => !deletedApiImages.includes(img.id))
                      .map((img) => (
                        <div key={img.id} className="relative group rounded-sm overflow-hidden border border-slate-200 dark:border-slate-700">
                          <img src={img.secure_url || img.url} alt={img.original_name ?? 'Project Image'} className="w-full h-32 object-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemoveApiImage(img.id)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex items-center justify-center w-6 h-6"
                          >
                            <span className="material-symbols-outlined text-[16px]">close</span>
                          </button>
                        </div>
                      ))}
                  </div>
                )}

                {/* Danh sách ảnh cũ (Mock) */}
                {currentMockImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {currentMockImages.map((img) => (
                      <div key={img.public_id} className="relative group rounded-sm overflow-hidden border border-slate-200 dark:border-slate-700">
                        <img src={img.url} alt="Project Image" className="w-full h-32 object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveMockImage(img.public_id)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex items-center justify-center w-6 h-6"
                        >
                          <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* State list showing deleted images (for testing/debugging visually) */}
                {deletedImages.length > 0 && (
                  <div className="mb-4 p-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs rounded-sm border border-red-100 dark:border-red-800/30">
                    <strong>Đã xóa (public_ids):</strong> {deletedImages.join(', ')}
                  </div>
                )}

                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 dark:border-slate-600 border-dashed rounded-sm hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer relative overflow-hidden">
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    multiple
                    onChange={handleFileChange}
                    accept="image/png, image/jpeg, image/gif, image/webp"
                  />
                  <div className="space-y-1 text-center pointer-events-none">
                    <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">cloud_upload</span>
                    <div className="flex text-sm text-slate-600 dark:text-slate-400 justify-center items-center">
                      <span className="font-medium text-primary bg-transparent text-emerald-600">Tải ảnh lên</span>
                      <p className="pl-1">hoặc kéo thả vào đây</p>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">PNG, JPG, GIF tối đa 10MB</p>
                  </div>
                </div>

                {/* Hiển thị các file mới chọn — dạng grid preview */}
                {newFiles.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wide">
                      {newFiles.length} file mới chờ tải lên
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {newFiles.map((file, idx) => {
                        const previewUrl = URL.createObjectURL(file);
                        const sizeMB = (file.size / 1024 / 1024).toFixed(2);
                        return (
                          <div
                            key={idx}
                            className="relative group rounded-sm overflow-hidden border-2 border-dashed border-emerald-400 dark:border-emerald-600 bg-slate-50 dark:bg-slate-800/60"
                          >
                            {/* Thumbnail */}
                            <img
                              src={previewUrl}
                              alt={file.name}
                              className="w-full h-32 object-cover"
                              onLoad={() => URL.revokeObjectURL(previewUrl)}
                            />
                            {/* Overlay info */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-1.5">
                              <p className="text-white text-[11px] font-medium truncate leading-tight">{file.name}</p>
                              <p className="text-white/70 text-[10px]">{sizeMB} MB</p>
                            </div>
                            {/* Badge mới */}
                            <span className="absolute top-2 left-2 bg-emerald-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-sm uppercase tracking-wide">
                              Mới
                            </span>
                            {/* Nút xóa */}
                            <button
                              type="button"
                              onClick={() => handleRemoveNewFile(idx)}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex items-center justify-center w-6 h-6"
                            >
                              <span className="material-symbols-outlined text-[16px]">close</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
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
              <button
                type="button"
                disabled={isUploading}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-sm text-sm font-medium transition-colors"
                onClick={handleSave}
              >
                {isUploading ? 'Đang lưu...' : 'Lưu dự án'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
