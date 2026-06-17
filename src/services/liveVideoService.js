import apiService from './apiService';
import { API_ENDPOINTS } from '../config/api';

const liveVideoService = {
  getLiveStatus: async () => {
    return await apiService.get(API_ENDPOINTS.liveVideo.get);
  },
  
  updateLiveStatus: async (data) => {
    return await apiService.put(API_ENDPOINTS.liveVideo.update, data);
  },
};

export default liveVideoService;
