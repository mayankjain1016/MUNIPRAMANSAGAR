import API_BASE_URL from '../config/api';

class ApiService {
  getHeaders() {
    return {
      'Content-Type': 'application/json',
    };
  }

  async get(url) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include', // Cookies are automatically sent
        headers: this.getHeaders(),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API GET Error:', error);
      throw error;
    }
  }

  async post(url, data) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include', // Cookies are automatically sent
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API POST Error:', error);
      throw error;
    }
  }

  async put(url, data) {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        credentials: 'include', // Cookies are automatically sent
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API PUT Error:', error);
      throw error;
    }
  }

  async delete(url) {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        credentials: 'include', // Cookies are automatically sent
        headers: this.getHeaders(),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API DELETE Error:', error);
      throw error;
    }
  }

  async patch(url, data = {}) {
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        credentials: 'include', // Cookies are automatically sent
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API PATCH Error:', error);
      throw error;
    }
  }
}

export default new ApiService();
