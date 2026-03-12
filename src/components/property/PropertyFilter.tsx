"use client";

import { MapPin, ChevronDown, ArrowUpDown, Filter } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface PropertyFilterProps {
  hidePrice?: boolean;
  onFilterChange?: (filters: FilterState) => void;
}

export interface FilterState {
  location?: string;
  propertyType?: string;
  priceRange?: string;
  sortBy?: string;
}

const propertyTypes = [
  { id: "all", name: "Tất cả", hashtag: "" },
  { id: "nha-pho", name: "Nhà phố", hashtag: "nha-pho" },
  { id: "can-ho", name: "Căn hộ", hashtag: "can-ho" },
  { id: "dat-nen", name: "Đất nền", hashtag: "dat-nen" },
  { id: "biet-thu", name: "Biệt thự", hashtag: "biet-thu" },
  { id: "van-phong", name: "Văn phông", hashtag: "van-phong" }
];

export function PropertyFilter({ hidePrice = false, onFilterChange }: PropertyFilterProps) {
  const [filters, setFilters] = useState<FilterState>({});
  const [showPropertyTypes, setShowPropertyTypes] = useState(false);
  const propertyTypeRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (propertyTypeRef.current && !propertyTypeRef.current.contains(event.target as Node)) {
        setShowPropertyTypes(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handlePropertyTypeChange = (propertyType: string, hashtag: string) => {
    const newFilters = { ...filters, propertyType };
    setFilters(newFilters);
    setShowPropertyTypes(false);
    
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
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
    
    return value || defaultText;
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-sm shadow-sm border border-slate-200 dark:border-slate-800 flex flex-wrap gap-4 items-center mb-8">
      <div className="flex-1 min-w-[200px]">
        <div className="relative">
          <button className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 border border-slate-300 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700 rounded-sm text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">
            <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <MapPin className="text-emerald-600 w-5 h-5" aria-hidden="true" />
              Toàn quốc
            </span>
            <ChevronDown className="text-slate-400 w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 min-w-[200px] relative" ref={propertyTypeRef}>
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
                onClick={() => handlePropertyTypeChange(type.hashtag, type.hashtag)}
                className="w-full px-4 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-700 text-sm text-slate-700 dark:text-slate-300 transition-colors first:rounded-t-sm last:rounded-b-sm"
              >
                {type.name}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {!hidePrice && (
        <div className="flex-1 min-w-[200px]">
          <button className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 border border-slate-300 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700 rounded-sm text-sm font-medium transition-colors text-slate-700 dark:text-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">
            {getDisplayText('priceRange', 'Mức giá')}
            <ChevronDown className="text-slate-400 w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      )}
      
      <div className="flex-1 min-w-[150px]">
        <button className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 border border-slate-300 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700 rounded-sm text-sm font-medium transition-colors text-slate-700 dark:text-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">
          {getDisplayText('sortBy', 'Sắp xếp')}
          <ArrowUpDown className="text-slate-400 w-4 h-4" aria-hidden="true" />
        </button>
      </div>
      
      <button 
        onClick={handleSearch}
        className="bg-emerald-600 text-white font-bold px-8 py-2.5 rounded-sm hover:bg-emerald-700 transition-colors flex items-center gap-2 text-sm shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
      >
        <Filter className="w-4 h-4" aria-hidden="true" />
        Lọc
      </button>
    </div>
  );
}
