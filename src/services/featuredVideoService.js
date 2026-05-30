import apiService from './apiService';
import API_BASE_URL from '../config/api';

export const featuredVideoService = {
  // Get all featured videos (public)
  getAllFeaturedVideos: async () => {
    const url = `${API_BASE_URL}/featured-videos`;
    return await apiService.get(url);
  },

  // Get featured video by position (public)
  getFeaturedVideoByPosition: async (position) => {
    const url = `${API_BASE_URL}/featured-videos/${position}`;
    return await apiService.get(url);
  },

  // Upsert (create/update) featured video (admin)
  upsertFeaturedVideo: async (position, data) => {
    const url = `${API_BASE_URL}/featured-videos/${position}`;
    return await apiService.put(url, data);
  },

  // Toggle featured video active status (admin)
  toggleFeaturedVideo: async (position) => {
    const url = `${API_BASE_URL}/featured-videos/${position}/toggle`;
    return await apiService.patch(url);
  }
};

export default featuredVideoService;
