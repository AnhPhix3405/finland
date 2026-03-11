export type ListingStatus = 
  | 'Đang hiển thị' 
  | 'Đang chờ duyệt' 
  | 'Đã ẩn' 
  | 'Hết hạn' 
  | 'Đã bán' 
  | 'Đã xong' 
  | 'Bị từ chối';

export interface Broker {
  id: string;
  full_name: string;
  phone: string;
  email?: string | null;
  avatar_url?: string | null;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface PropertyType {
  id: string;
  name: string;
  hashtag: string;
}

export interface TransactionType {
  id: string;
  name: string;
  hashtag: string;
}

export interface Listing {
  id: string;
  broker_id: string;
  title: string;
  description: string;
  province: string;
  ward: string;
  address?: string | null;
  area?: number | null;
  width?: number | null;
  length?: number | null;
  price?: string | null; // bigint converted to string
  direction?: string | null;
  status?: string | null;
  property_type_id?: string | null;
  transaction_type_id?: string | null;
  created_at?: Date | string;
  
  // Relations
  brokers: Broker;
  tags?: Tag[];
  property_types?: PropertyType | null;
  transaction_types?: TransactionType | null;
}

export interface ListingListResponse {
  success: boolean;
  data?: Listing[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  error?: string;
}

export interface UpdateListingStatusRequest {
  status: ListingStatus;
}

export interface UpdateListingStatusResponse {
  success: boolean;
  data?: Listing;
  message?: string;
  error?: string;
}

/**
 * Get all listings with pagination
 */
export async function getListings(page: number = 1, limit: number = 20): Promise<ListingListResponse> {
  try {
    const response = await fetch(`/api/listings?page=${page}&limit=${limit}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching listings:', error);
    return {
      success: false,
      error: 'Failed to fetch listings'
    };
  }
}

/**
 * Update listing status (approve, reject, etc.)
 */
export async function updateListingStatus(
  listingId: string, 
  status: ListingStatus
): Promise<UpdateListingStatusResponse> {
  try {
    const response = await fetch(`/api/listings/${listingId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    return await response.json();
  } catch (error) {
    console.error('Error updating listing status:', error);
    return {
      success: false,
      error: 'Failed to update listing status'
    };
  }
}

/**
 * Delete a listing permanently
 */
export async function deleteListing(listingId: string): Promise<UpdateListingStatusResponse> {
  try {
    const response = await fetch(`/api/listings/${listingId}`, {
      method: 'DELETE',
    });

    return await response.json();
  } catch (error) {
    console.error('Error deleting listing:', error);
    return {
      success: false,
      error: 'Failed to delete listing'
    };
  }
}