'use client';
import React, { useState, useEffect } from 'react';

export const provinces = [
    "Tuyên Quang", "Lào Cai", "Thái Nguyên", "Phú Thọ", "Bắc Ninh", "Hưng Yên", "Hải Phòng", "Ninh Bình",
    "Quảng Trị", "Đà Nẵng", "Quảng Ngãi", "Gia Lai", "Khánh Hoà", "Lâm Đồng", "Đắk Lắk", "Hồ Chí Minh",
    "Đồng Nai", "Tây Ninh", "Cần Thơ", "Vĩnh Long", "Đồng Tháp", "Cà Mau", "An Giang", "Hà Nội", "Huế",
    "Lai Châu", "Điện Biên", "Sơn La", "Lạng Sơn", "Quảng Ninh", "Thanh Hoá", "Nghệ An", "Hà Tĩnh", "Cao Bằng"
];

interface LocationSelectorProps {
    selectedProvince: string;
    onProvinceChange: (value: string) => void;
    selectedWard: string;
    onWardChange: (value: string) => void;
}

export default function LocationSelector({
    selectedProvince,
    onProvinceChange,
    selectedWard,
    onWardChange
}: LocationSelectorProps) {
    const [wardsList, setWardsList] = useState<{ name: string }[]>([]);

    useEffect(() => {
        if (!selectedProvince) {
            setWardsList([]);
            return;
        }
        const fetchWards = async () => {
            try {
                const url = `https://vietnamlabs.com/api/vietnamprovince?province=${encodeURIComponent(selectedProvince)}`;
                const res = await fetch(url);
                const data = await res.json();
                if (data?.success && data?.data?.wards) {
                    setWardsList(data.data.wards);
                } else {
                    setWardsList([]);
                }
            } catch (err) {
                console.error('Error fetching wards:', err);
            }
        };
        fetchWards();
    }, [selectedProvince]);

    return (
        <>
            <div className="col-span-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="projectCity">
                    Tỉnh / Thành phố <span className="text-red-500">*</span>
                </label>
                <select
                    value={selectedProvince}
                    onChange={(e) => {
                        onProvinceChange(e.target.value);
                        onWardChange('');
                    }}
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
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="projectDistrict">
                    Phường / Xã <span className="text-red-500">*</span>
                </label>
                <select
                    value={selectedWard}
                    onChange={(e) => onWardChange(e.target.value)}
                    disabled={!selectedProvince || wardsList.length === 0}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-sm text-sm focus:ring-primary focus:border-primary dark:text-white text-slate-700 disabled:opacity-50 disabled:bg-slate-100 dark:disabled:bg-slate-900"
                    id="projectDistrict"
                >
                    <option value="">Chọn Phường/Xã</option>
                    {wardsList.map((ward, idx) => (
                        <option key={idx} value={ward.name}>{ward.name}</option>
                    ))}
                </select>
            </div>
        </>
    );
}
