"use client";

import React, { useState, useRef } from "react";
import { X, UploadCloud, HelpCircle } from "lucide-react";

interface MediaPickerProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (images: string[]) => void;
}

const MOCK_IMAGES = [
    "https://placehold.co/150x150/1e293b/ffffff?text=Img+1",
    "https://placehold.co/150x150/334155/ffffff?text=Img+2",
    "https://placehold.co/150x150/475569/ffffff?text=Img+3",
    "https://placehold.co/150x150/64748b/ffffff?text=Img+4",
    "https://placehold.co/150x150/94a3b8/ffffff?text=Img+5",
    "https://placehold.co/150x150/cbd5e1/1e293b?text=Img+6",
];

export default function MediaPicker({ isOpen, onClose, onSelect }: MediaPickerProps) {
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [uploadedImages, setUploadedImages] = useState<string[]>(MOCK_IMAGES);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!isOpen) return null;

    const toggleImageSelection = (imageUrl: string) => {
        setSelectedImages((prev) =>
            prev.includes(imageUrl)
                ? prev.filter((url) => url !== imageUrl)
                : [...prev, imageUrl]
        );
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            handleFiles(Array.from(files));
        }
    };

    const handleFiles = (files: File[]) => {
        // Mock upload process
        const newImageUrls = files.map((file) => URL.createObjectURL(file));
        setUploadedImages((prev) => [...newImageUrls, ...prev]);
        setSelectedImages((prev) => [...prev, ...newImageUrls]);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files) {
            handleFiles(Array.from(e.dataTransfer.files));
        }
    };

    const handleConfirm = () => {
        onSelect(selectedImages);
        onClose();
        // Reset selection for next open
        setSelectedImages([]);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 overflow-y-auto">
            <div className="bg-white rounded shadow-xl w-full max-w-3xl mx-4 relative flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-slate-100">
                    <h2 className="text-[22px] text-slate-700">Thêm hình ảnh thu nhỏ</h2>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto flex-1">
                    {/* Upload Zone */}
                    <div
                        className={`border-2 border-dashed rounded bg-slate-50/50 p-12 flex flex-col items-center justify-center cursor-pointer transition-colors ${isDragging
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 hover:bg-slate-50"
                            }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                        <div className="text-slate-500 mb-3">
                            <UploadCloud className="w-12 h-12 fill-slate-500 text-white" />
                        </div>
                        <p className="text-slate-500 text-[15px]">
                            Kéo và thả tập tin ở đây hoặc nhấp chuột để tải tập tin lên
                        </p>
                    </div>

                    {/* Image Gallery */}
                    <div>
                        <h3 className="mt-2 text-xl text-slate-400 mb-4">Ảnh của bạn</h3>
                        <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                            {uploadedImages.map((img, index) => {
                                const isSelected = selectedImages.includes(img);
                                return (
                                    <div
                                        key={index}
                                        className={`relative aspect-square cursor-pointer rounded-sm overflow-hidden box-border border-2 transition-all ${isSelected ? "border-blue-500" : "border-transparent"
                                            }`}
                                        onClick={() => toggleImageSelection(img)}
                                    >
                                        <img
                                            src={img}
                                            alt={`Img ${index}`}
                                            className="w-full h-full object-cover"
                                        />
                                        {isSelected && (
                                            <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                                                <div className="bg-blue-500 text-white rounded-full p-1 border-2 border-white shadow-sm">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-3 w-3"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth={3}
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 flex items-center justify-end gap-3 bg-white">
                    <button
                        onClick={onClose}
                        className="px-6 py-[6px] border border-slate-200 rounded text-slate-600 hover:bg-slate-50 transition-colors text-[15px]"
                    >
                        Hủy
                    </button>
                    {selectedImages.length > 0 && (
                        <button
                            onClick={handleConfirm}
                            className="px-6 py-[6px] bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-[15px]"
                        >
                            Áp dụng ({selectedImages.length})
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
