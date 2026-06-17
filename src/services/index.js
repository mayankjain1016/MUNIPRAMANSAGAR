import apiService from './apiService';
import { API_ENDPOINTS } from '../config/api';

export const locationService = {
  async getActiveLocation() {
    return await apiService.get(API_ENDPOINTS.location.getActive);
  },
};

export const eventService = {
  async getActiveEvents() {
    return await apiService.get(API_ENDPOINTS.events.getActive);
  },

  async getAllEvents() {
    return await apiService.get(API_ENDPOINTS.events.getAll);
  },

  async getEventById(id) {
    return await apiService.get(API_ENDPOINTS.events.getById(id));
  },
};

export const newsService = {
  async getLatestNews(limit = 5) {
    return await apiService.get(`${API_ENDPOINTS.news.getLatest}?limit=${limit}`);
  },

  async getAllNews() {
    return await apiService.get(API_ENDPOINTS.news.getAll);
  },

  async getNewsById(id) {
    return await apiService.get(API_ENDPOINTS.news.getById(id));
  },
};

export const galleryService = {
  async getHomeGalleries(limit = 4) {
    return await apiService.get(`${API_ENDPOINTS.gallery.getHome}?limit=${limit}`);
  },

  async getAllGalleries() {
    return await apiService.get(API_ENDPOINTS.gallery.getAll);
  },

  async getGalleryById(id) {
    return await apiService.get(API_ENDPOINTS.gallery.getById(id));
  },
};

export const shankaSamadhanService = {
  async getHomeQuestions(limit = 6) {
    return await apiService.get(`${API_ENDPOINTS.shankaSamadhan.getHome}?limit=${limit}`);
  },

  async getPopularQuestions() {
    return await apiService.get(API_ENDPOINTS.shankaSamadhan.getPopular);
  },

  async getAllQuestions() {
    return await apiService.get(API_ENDPOINTS.shankaSamadhan.getAll);
  },

  async getQuestionById(id) {
    return await apiService.get(API_ENDPOINTS.shankaSamadhan.getById(id));
  },

  async getQuestionBySlug(slug) {
    return await apiService.get(API_ENDPOINTS.shankaSamadhan.getBySlug(slug));
  },

  async searchQuestions(query) {
    return await apiService.get(`${API_ENDPOINTS.shankaSamadhan.search}?q=${query}`);
  },
};

export const liveVideoService = {
  async getLiveStatus() {
    return await apiService.get(API_ENDPOINTS.liveVideo.get);
  },

  async updateLiveStatus(data) {
    return await apiService.put(API_ENDPOINTS.liveVideo.update, data);
  },
};
