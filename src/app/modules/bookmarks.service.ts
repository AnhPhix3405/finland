import { useAuthStore } from '@/src/store/authStore';

export const toggleBookmark = async (listing_id: string) => {
  try {
    const accessToken = useAuthStore.getState().accessToken;

    if (!accessToken) {
      return {
        success: false,
        error: 'Bạn cần đăng nhập để lưu bài đăng'
      };
    }

    const response = await fetch('/api/bookmarks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ listing_id })
    });

    const result = await response.json();
    
    console.log('toggleBookmark response:', {
      status: response.status,
      result: result
    });

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Lỗi khi thao tác bookmark'
      };
    }

    return result;
  } catch (error) {
    console.error('Error toggling bookmark:', error);
    return {
      success: false,
      error: 'Không thể kết nối đến máy chủ'
    };
  }
};
