import apiService from './apiService';
import API_BASE_URL from '../config/api';

export const pravachanService = {
  // Get all pravachans or by category
  getAllPravachans: async (category = null) => {
    const url = category ? `${API_BASE_URL}/pravachan?category=${category}` : `${API_BASE_URL}/pravachan`;
    return await apiService.get(url);
  },

  // Get single pravachan
  getPravachanById: async (id) => {
    const url = `${API_BASE_URL}/pravachan/${id}`;
    return await apiService.get(url);
  },

  // Create pravachan (admin)
  createPravachan: async (data) => {
    const url = `${API_BASE_URL}/pravachan`;
    return await apiService.post(url, data);
  },

  // Update pravachan (admin)
  updatePravachan: async (id, data) => {
    const url = `${API_BASE_URL}/pravachan/${id}`;
    return await apiService.put(url, data);
  },

  // Delete pravachan (admin)
  deletePravachan: async (id) => {
    const url = `${API_BASE_URL}/pravachan/${id}`;
    return await apiService.delete(url);
  },

  // Increment views
  incrementViews: async (id) => {
    const url = `${API_BASE_URL}/pravachan/${id}/views`;
    return await apiService.patch(url, {});
  },

  // Get live video
  getLiveVideo: async () => {
    const url = `${API_BASE_URL}/pravachan/live/current`;
    return await apiService.get(url);
  },

  // Set live video (admin)
  setLiveVideo: async (id, liveVideoUrl) => {
    const url = `${API_BASE_URL}/pravachan/${id}/live`;
    return await apiService.patch(url, { liveVideoUrl });
  },

  // Unset live video (admin)
  unsetLiveVideo: async (id) => {
    const url = `${API_BASE_URL}/pravachan/${id}/unlive`;
    return await apiService.patch(url, {});
  }
};
