"use client";

import { useState, useEffect } from "react";
import { PropertyDetail } from "@/src/components/property/PropertyDetail";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface Listing {
  id: string;
  title: string;
  description: string;
  province: string;
  ward: string;
  address?: string | null;
  area?: number | null;
  width?: number | null;
  length?: number | null;
  price?: string | null;
  direction?: string | null;
  status?: string | null;
  slug?: string | null;
  contact_name?: string | null;
  contact_phone?: string | null;
  brokers: {
    id: string;
    full_name: string;
    phone: string;
    email?: string | null;
    avatar_url?: string | null;
    specialization?: string | null;
    bio?: string | null;
  };
  tags?: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  property_types?: {
    id: string;
    name: string;
    hashtag: string;
  } | null;
  transaction_types?: {
    id: string;
    name: string;
    hashtag: string;
  } | null;
  listing_code?: string | null;
}

export default function MuaBanDetailPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    
    const fetchListingDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/listings/${slug}`);
        const result = await response.json();
        
        if (result.success) {
          setListing(result.data);
        } else {
          setError(result.error || 'Không tìm thấy bài đăng');
        }
      } catch (err) {
        console.error('Error fetching listing detail:', err);
        setError('Có lỗi xảy ra khi tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    fetchListingDetail();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            <span className="ml-3 text-slate-600 dark:text-slate-400">Đang tải...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              {error || 'Không tìm thấy bài đăng'}
            </h1>
            <button 
              onClick={() => router.push('/mua-ban')}
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              ← Quay lại danh sách
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <title>{listing ? `${listing.title} | ${listing.listing_code || ''} | Finland.vn` : 'Chi tiết bất động sản | Finland.vn'}</title>
      <div className="min-h-screen bg-white dark:bg-slate-950 py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="mb-12">
          <button 
            onClick={() => router.back()}
            className="group inline-flex items-center gap-3 text-slate-400 hover:text-emerald-600 transition-all text-[10px] font-black uppercase tracking-[0.3em] w-fit"
          >
            <div className="p-2 rounded-full border border-slate-100 dark:border-slate-800 group-hover:border-emerald-500/30 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/10">
              <ArrowLeft className="size-4 shrink-0" />
            </div>
            Quay lại danh sách
          </button>
        </div>

        <PropertyDetail 
          type="mua-ban" 
          listing={listing}
          isDemo={false} 
        />
        </div>
      </div>
    </>
  );
}