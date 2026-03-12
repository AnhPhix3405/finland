"use client";

import { useState, useEffect } from "react";
import { PropertyCard } from "../../../components/property/PropertyCard";
import { PropertyFilter, FilterState } from "../../../components/property/PropertyFilter";
import { Pagination } from "../../../components/shared/Pagination";
import { getListingsByHashtags } from "../../modules/listings.service";

export default function MuaBanPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentFilters, setCurrentFilters] = useState<FilterState>({});
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0
  });

  const buildHashtags = (filters: FilterState) => {
    const hashtags = ['mua-ban']; // Always include base hashtag
    
    // Add property type hashtag if selected
    if (filters.propertyType && filters.propertyType !== '') {
      hashtags.push(filters.propertyType);
    }
    
    return hashtags;
  };

  const formatPrice = (price: string | number) => {
    if (!price) return "Thỏa thuận";
    const numPrice = Number(price);
    
    if (numPrice >= 1000000000) {
      const billions = numPrice / 1000000000;
      return `${billions.toFixed(1)} Tỷ`;
    } else if (numPrice >= 1000000) {
      const millions = numPrice / 1000000;
      return `${millions.toFixed(0)} Triệu`;
    } else if (numPrice >= 1000) {
      const thousands = numPrice / 1000;
      return `${thousands.toFixed(0)} Nghìn`;
    } else {
      return `${numPrice.toLocaleString('vi-VN')} VND`;
    }
  };

  const loadListings = async (filters: FilterState, page: number = 1) => {
    try {
      setLoading(true);
      const hashtags = buildHashtags(filters);
      const result = await getListingsByHashtags(hashtags, {
        page,
        limit: pagination.limit
      });
      
      // Map API data to component expected format
      const mappedProperties = result.data.map((listing: any) => ({
        id: listing.id,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAH-qH24_KE8TIFtAOlg2VMxFw51PbmagHsDz-fp6Y_o13wCplh0YpY5tUVGtFy_1YJB66cE-ffhS1bk0Khp5Id5HsZm2Vn7isAq4e3dgAm2smw-oxIc6ZJMRAczbqKi_kj0UIofIfDnHxU34GvPlK-Og0xGinm9wGIfWLsRQ9fqzoYOYfmBA-cQ32_dFeyQ0cYN5hgai2CsH15n0rd3N0dVC5HbLBDzPaUbpyyq_mUnWXQDljSIAPURnziqfdaHPhnGT183UxhHGub", // Default image for now
        price: listing.price ? formatPrice(listing.price) : "Thỏa thuận",
        area: listing.area ? `${listing.area} m²` : "N/A",
        title: listing.title,
        location: `${listing.ward}, ${listing.province}`,
        tags: listing.tags?.map((tag: any) => tag.slug) || [],
        isPriority: false, // Can add logic later
        slug: listing.slug,
        broker: listing.brokers
      }));
      
      setProperties(mappedProperties);
      setPagination({...result.pagination});
    } catch (error) {
      console.error('Error loading listings:', error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  // Load initial listings with "muaban" hashtag
  useEffect(() => {
    const initialFilters = {};
    setCurrentFilters(initialFilters);
    loadListings(initialFilters);
  }, []);

  const handleFilterChange = (filters: FilterState) => {
    setCurrentFilters(filters);
    loadListings(filters, 1); // Reset to page 1 when filtering
  };

  const handlePageChange = (page: number) => {
    loadListings(currentFilters, page);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Title */}
      <div className="mb-6">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">
          Bất động sản Mua Bán toàn quốc
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Tìm kiếm ngôi nhà mơ ước của bạn tại Finland.vn
        </p>
      </div>

      <PropertyFilter onFilterChange={handleFilterChange} />

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          <span className="ml-3 text-slate-600 dark:text-slate-400">Đang tải...</span>
        </div>
      )}

      {/* Property Grid */}
      {!loading && (
        <>
          {properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500 dark:text-slate-400">
                Không tìm thấy bất động sản nào phù hợp với tiêu chí lọc.
              </p>
            </div>
          )}
          
          {properties.length > 0 && (
            <Pagination 
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}
