import { v4 as uuidv4 } from 'uuid';
import { Tag } from './tags.service.client';

export interface CreateListingData {
  broker_id: string;
  title: string;
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

export async function getListings(): Promise<any[]> {
  try {
    const response = await fetch('/api/listings');
    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('Error fetching listings:', error);
    return [];
  }
}
