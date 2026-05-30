import api from '../config/api';

export const pravachanService = {
  // Get all pravachans or by category
  getAllPravachans: async (category = null) => {
    const url = category ? `/pravachan?category=${category}` : '/pravachan';
    const response = await api.get(url);
    return response.data;
  },

  // Get single pravachan
  getPravachanById: async (id) => {
    const response = await api.get(`/pravachan/${id}`);
    return response.data;
  },

  // Create pravachan (admin)
  createPravachan: async (data) => {
    const response = await api.post('/pravachan', data);
    return response.data;
  },

  // Update pravachan (admin)
  updatePravachan: async (id, data) => {
    const response = await api.put(`/pravachan/${id}`, data);
    return response.data;
  },

  // Delete pravachan (admin)
  deletePravachan: async (id) => {
    const response = await api.delete(`/pravachan/${id}`);
    return response.data;
  },

  // Increment views
  incrementViews: async (id) => {
    const response = await api.patch(`/pravachan/${id}/views`);
    return response.data;
  }
};
