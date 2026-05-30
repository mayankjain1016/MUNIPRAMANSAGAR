const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  // Location endpoints
  location: {
    getActive: `${API_BASE_URL}/location/active`,
    getAll: `${API_BASE_URL}/location`,
  },
  
  // Event endpoints
  events: {
    getActive: `${API_BASE_URL}/events/active`,
    getAll: `${API_BASE_URL}/events`,
    getById: (id) => `${API_BASE_URL}/events/${id}`,
  },
  
  // News endpoints
  news: {
    latest: `${API_BASE_URL}/news/latest`,
    published: `${API_BASE_URL}/news/published`,
    getAll: `${API_BASE_URL}/news/all`,
    getById: (id) => `${API_BASE_URL}/news/${id}`,
  },
  
  // Gallery endpoints
  gallery: {
    getHome: `${API_BASE_URL}/gallery/home`,
    getAll: `${API_BASE_URL}/gallery`,
    getById: (id) => `${API_BASE_URL}/gallery/${id}`,
  },
  
  // Shanka Samadhan endpoints
  shankaSamadhan: {
    getHome: `${API_BASE_URL}/shanka-samadhan/home`,
    getPopular: `${API_BASE_URL}/shanka-samadhan/popular`,
    getAll: `${API_BASE_URL}/shanka-samadhan`,
    getById: (id) => `${API_BASE_URL}/shanka-samadhan/${id}`,
    getBySlug: (slug) => `${API_BASE_URL}/shanka-samadhan/slug/${slug}`,
    search: `${API_BASE_URL}/shanka-samadhan/search`,
    clips: {
      getAll: `${API_BASE_URL}/shanka-samadhan/clips/all`,
      getPopular: `${API_BASE_URL}/shanka-samadhan/clips/popular`,
      getById: (id) => `${API_BASE_URL}/shanka-samadhan/clips/${id}`,
    },
  },
};

export default API_BASE_URL;
