// Client-side tags service - only calls API endpoints, no direct prisma usage

export interface Tag {
  id: string;
  name: string;
  slug: string;
  created_at?: Date | null;
  listing_id?: string | null;
}

export interface CreateTagData {
  name: string;
  slug: string;
  listing_id?: string;
}

/**
 * Get all unique tag names for autocomplete/suggestions - API call only
 */
export async function getAllTagNamesAPI(query?: string): Promise<string[]> {
  try {
    const searchParams = query ? `?q=${encodeURIComponent(query)}` : '';
    const response = await fetch(`/api/tags${searchParams}`);
    const result = await response.json();
    
    if (result.success) {
      return result.data || [];
    } else {
      console.error('Error fetching tag names from API:', result.error);
      return [];
    }
  } catch (error) {
    console.error('Error calling getAllTagNamesAPI:', error);
    return [];
  }
}