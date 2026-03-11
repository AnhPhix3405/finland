import { v4 as uuidv4 } from 'uuid';
import { Tag } from './tags.service.client';

export interface CreateListingData {
  broker_id: string;
  title: string;
  slug?: string; // Add slug field
  description: string;
  transaction_type_id?: string; // Changed from transaction_type to transaction_type_id  
  property_type_id?: string; // Changed from property_type to property_type_id
  province: string;
  ward: string;
  address?: string;
  area?: number;
  width?: number;
  length?: number;
  price?: string | number;
  direction?: string;
  visibility?: boolean;
  status?: string;
  tags?: string[]; // Array of tag names
}

export interface ListingResponse {
  id: string;
  success: boolean;
  message?: string;
  error?: string;
  tags?: Tag[]; // Include processed tags in response
}

// Temporary method to create listing with UUID (không call API thật)
export function createListingLocal(data: Partial<CreateListingData>): ListingResponse {
  const listingId = uuidv4();

  // Validate required fields if needed
  if (!data.title || !data.description) {
    return {
      id: "",
      success: false,
      error: "Title and description are required"
    };
  }

  console.log("Created listing locally with ID:", listingId);
  console.log("Listing data:", data);

  return {
    id: listingId,
    success: true,
    message: "Listing created successfully"
  };
}

export async function createListing(data: CreateListingData): Promise<ListingResponse> {
  try {
    const response = await fetch('/api/listings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (result.success) {
      return {
        id: result.data.id,
        success: true,
        message: result.message,
        tags: result.tags || [] // Include tags in response
      };
    } else {
      return {
        id: "",
        success: false,
        error: result.error || 'Failed to create listing'
      };
    }
  } catch (error) {
    console.error('Error creating listing:', error);
    return {
      id: "",
      success: false,
      error: 'Failed to create listing'
    };
  }
}

export async function getListings(params?: {
  page?: number;
  limit?: number;
  hashtags?: string[];
}): Promise<{data: any[], pagination: any}> {
  try {
    const { page = 1, limit = 10, hashtags } = params || {};
    
    // Build URL with query parameters
    const searchParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    });
    
    if (hashtags && hashtags.length > 0) {
      searchParams.set('hashtags', hashtags.join(','));
    }
    
    const response = await fetch(`/api/listings?${searchParams.toString()}`);
    const result = await response.json();
    
    return {
      data: result.data || [],
      pagination: result.pagination || {}
    };
  } catch (error) {
    console.error('Error fetching listings:', error);
    return {
      data: [],
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
      }
    };
  }
}

export async function getListingsByHashtags(hashtags: string[], params?: {
  page?: number;
  limit?: number;
}): Promise<{data: any[], pagination: any}> {
  return getListings({
    ...params,
    hashtags
  });
}
