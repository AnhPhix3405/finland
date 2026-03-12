"use client";

import { MapPin, ChevronDown, ArrowUpDown, Filter } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface PropertyFilterProps {
  hidePrice?: boolean;
  onFilterChange?: (filters: FilterState) => void;
}

export interface FilterState {
  province?: string;
  ward?: string;
  propertyType?: string;
  priceMin?: string;
  priceMax?: string;
  sortBy?: string;
}

interface PropertyType {
  id: string;
  name: string;
  hashtag: string;
}

const provinces = [
  { id: "all", name: "Toàn quốc" },
  { id: "tp-ho-chi-minh", name: "TP. Hồ Chí Minh" },
  { id: "ha-noi", name: "Hà Nội" },
  { id: "hai-phong", name: "Hải Phòng" },
  { id: "da-nang", name: "Đà Nẵng" },
  { id: "can-tho", name: "Cần Thơ" },
  { id: "binh-duong", name: "Bình Dương" },
  { id: "dong-nai", name: "Đồng Nai" },
];

const wardsByProvince: Record<string, Array<{ id: string; name: string }>> = {
  "tp-ho-chi-minh": [
    { id: "q1", name: "Quận 1" },
    { id: "q2", name: "Quận 2" },
    { id: "q3", name: "Quận 3" },
    { id: "q4", name: "Quận 4" },
    { id: "q5", name: "Quận 5" },
    { id: "q6", name: "Quận 6" },
    { id: "q7", name: "Quận 7" },
    { id: "q8", name: "Quận 8" },
    { id: "q9", name: "Quận 9" },
    { id: "q10", name: "Quận 10" },
  ],
  "ha-noi": [
    { id: "ba-dinh", name: "Ba Đình" },
    { id: "hoang-mai", name: "Hoàng Mai" },
    { id: "long-bien", name: "Long Biên" },
    { id: "dong-da", name: "Đống Đa" },
    { id: "hai-ba-trung", name: "Hai Bà Trưng" },
  ],
};

const sortOptions = [
  { id: "newest", name: "Mới nhất", value: "newest" },
  { id: "price-asc", name: "Giá: Thấp → Cao", value: "price_asc" },
  { id: "price-desc", name: "Giá: Cao → Thấp", value: "price_desc" },
];

export function PropertyFilter({ hidePrice = false, onFilterChange }: PropertyFilterProps) {
  const [filters, setFilters] = useState<FilterState>({});
  const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>([]);
  const [showProvinces, setShowProvinces] = useState(false);
  const [showWards, setShowWards] = useState(false);
  const [showPropertyTypes, setShowPropertyTypes] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const provinceRef = useRef<HTMLDivElement>(null);
  const wardRef = useRef<HTMLDivElement>(null);
  const propertyTypeRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  // Fetch property types from API
  useEffect(() => {
    const fetchPropertyTypes = async () => {
      try {
        const response = await fetch('/api/property_types?limit=100');
        const data = await response.json();
        if (data.success) {
          setPropertyTypes(data.data);
        }
      } catch (error) {
        console.error('Error fetching property types:', error);
      }
    };
    fetchPropertyTypes();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (provinceRef.current && !provinceRef.current.contains(event.target as Node)) {
        setShowProvinces(false);
      }
      if (wardRef.current && !wardRef.current.contains(event.target as Node)) {
        setShowWards(false);
      }
      if (propertyTypeRef.current && !propertyTypeRef.current.contains(event.target as Node)) {
        setShowPropertyTypes(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setShowSort(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProvinceChange = (provinceId: string, provinceName: string) => {
    const newFilters = { ...filters, province: provinceId, ward: undefined };
    setFilters(newFilters);
    setShowProvinces(false);
    if (onFilterChange) onFilterChange(newFilters);
  };

  const handleWardChange = (wardId: string) => {
    const newFilters = { ...filters, ward: wardId };
    setFilters(newFilters);
    setShowWards(false);
    if (onFilterChange) onFilterChange(newFilters);
  };

  const handlePropertyTypeChange = (hashtag: string) => {
    const newFilters = { ...filters, propertyType: hashtag };
    setFilters(newFilters);
    setShowPropertyTypes(false);
    if (onFilterChange) onFilterChange(newFilters);
  };

  const handleSortChange = (sortValue: string) => {
    const newFilters = { ...filters, sortBy: sortValue };
    setFilters(newFilters);
    setShowSort(false);
    if (onFilterChange) onFilterChange(newFilters);
  };

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const newFilters = { ...filters, [type === 'min' ? 'priceMin' : 'priceMax']: value };
    setFilters(newFilters);
    if (onFilterChange) onFilterChange(newFilters);
  };

  const handleSearch = () => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
  };

  const getDisplayText = (key: keyof FilterState, defaultText: string) => {
    const value = filters[key];
    if (!value) return defaultText;
    
    if (key === 'propertyType') {
      const type = propertyTypes.find(t => t.hashtag === value);
      return type ? type.name : defaultText;
    }

    if (key === 'province') {
      const province = provinces.find(p => p.id === value);
      return province ? province.name : defaultText;
    }

    if (key === 'ward') {
      const currentProvince = filters.province || '';
      const wards = wardsByProvince[currentProvince] || [];
      const ward = wards.find(w => w.id === value);
      return ward ? ward.name : defaultText;
    }

    if (key === 'sortBy') {
      const sort = sortOptions.find(s => s.value === value);
      return sort ? sort.name : defaultText;
    }
    
    return value || defaultText;
  };

  const currentProvinceId = filters.province || '';
  const availableWards = wardsByProvince[currentProvinceId] || [];

  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-sm shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col gap-4 mb-8">
      {/* First Row - Location & Property Type */}
      <div className="flex flex-wrap gap-4 items-center">
        {/* Province Dropdown */}
        <div className="flex-1 min-w-[180px] relative" ref={provinceRef}>
          <button 
            onClick={() => setShowProvinces(!showProvinces)}
            className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 border border-slate-300 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700 rounded-sm text-sm font-medium transition-colors text-slate-700 dark:text-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <span className="flex items-center gap-2">
              <MapPin className="text-emerald-600 w-4 h-4" aria-hidden="true" />
              {getDisplayText('province', 'Tỉnh/Thành phố')}
            </span>
            <ChevronDown className="text-slate-400 w-4 h-4" aria-hidden="true" />
          </button>
          
          {showProvinces && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-sm shadow-lg z-50 max-h-60 overflow-y-auto">
              {provinces.map((province) => (
                <button
                  key={province.id}
                  onClick={() => handleProvinceChange(province.id, province.name)}
                  className="w-full px-4 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-700 text-sm text-slate-700 dark:text-slate-300 transition-colors"
                >
                  {province.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Ward Dropdown */}
        {currentProvinceId && currentProvinceId !== 'all' && availableWards.length > 0 && (
          <div className="flex-1 min-w-[180px] relative" ref={wardRef}>
            <button 
              onClick={() => setShowWards(!showWards)}
              className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 border border-slate-300 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700 rounded-sm text-sm font-medium transition-colors text-slate-700 dark:text-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              {getDisplayText('ward', 'Phường/Xã')}
              <ChevronDown className="text-slate-400 w-4 h-4" aria-hidden="true" />
            </button>
            
            {showWards && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-sm shadow-lg z-50 max-h-60 overflow-y-auto">
                {availableWards.map((ward) => (
                  <button
                    key={ward.id}
                    onClick={() => handleWardChange(ward.id)}
                    className="w-full px-4 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-700 text-sm text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    {ward.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Property Type Dropdown */}
        <div className="flex-1 min-w-[180px] relative" ref={propertyTypeRef}>
          <button 
            onClick={() => setShowPropertyTypes(!showPropertyTypes)}
            className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 border border-slate-300 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700 rounded-sm text-sm font-medium transition-colors text-slate-700 dark:text-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            {getDisplayText('propertyType', 'Loại hình')}
            <ChevronDown className="text-slate-400 w-4 h-4" aria-hidden="true" />
          </button>
          
          {showPropertyTypes && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-sm shadow-lg z-50 max-h-60 overflow-y-auto">
              {propertyTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handlePropertyTypeChange(type.hashtag)}
                  className="w-full px-4 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-700 text-sm text-slate-700 dark:text-slate-300 transition-colors"
                >
                  {type.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Second Row - Price & Sort */}
      <div className="flex flex-wrap gap-4 items-center">
        {!hidePrice && (
          <>
            {/* Min Price */}
            <div className="flex-1 min-w-[150px]">
              <input
                type="number"
                placeholder="Giá tối thiểu"
                value={filters.priceMin || ''}
                onChange={(e) => handlePriceChange('min', e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700 rounded-sm text-sm font-medium transition-colors text-slate-700 dark:text-slate-300 placeholder-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              />
            </div>

            {/* Max Price */}
            <div className="flex-1 min-w-[150px]">
              <input
                type="number"
                placeholder="Giá tối đa"
                value={filters.priceMax || ''}
                onChange={(e) => handlePriceChange('max', e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700 rounded-sm text-sm font-medium transition-colors text-slate-700 dark:text-slate-300 placeholder-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              />
            </div>
          </>
        )}

        {/* Sort Dropdown */}
        <div className="flex-1 min-w-[180px] relative" ref={sortRef}>
          <button 
            onClick={() => setShowSort(!showSort)}
            className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 border border-slate-300 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700 rounded-sm text-sm font-medium transition-colors text-slate-700 dark:text-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <span className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4" aria-hidden="true" />
              {getDisplayText('sortBy', 'Sắp xếp')}
            </span>
            <ChevronDown className="text-slate-400 w-4 h-4" aria-hidden="true" />
          </button>
          
          {showSort && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-sm shadow-lg z-50 max-h-60 overflow-y-auto">
              {sortOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSortChange(option.value)}
                  className="w-full px-4 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-700 text-sm text-slate-700 dark:text-slate-300 transition-colors"
                >
                  {option.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Button */}
        <button 
          onClick={handleSearch}
          className="bg-emerald-600 text-white font-bold px-8 py-2.5 rounded-sm hover:bg-emerald-700 transition-colors flex items-center gap-2 text-sm shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
        >
          <Filter className="w-4 h-4" aria-hidden="true" />
          Lọc
        </button>
      </div>
    </div>
  );
}
