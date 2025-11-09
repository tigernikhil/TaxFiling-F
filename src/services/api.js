import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(`${API_URL}/auth/refresh-token`, {
          refreshToken
        });
        
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        
        return api(originalRequest);
      } catch (err) {
        localStorage.clear();
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  refreshToken: (refreshToken) => api.post('/auth/refresh-token', { refreshToken })
};

// Returns endpoints
export const returnsAPI = {
  create: (data) => api.post('/returns/create', data),
  getAll: () => api.get('/returns/user/all'),
  getOne: (id) => api.get(`/returns/${id}`),
  update: (id, data) => api.put(`/returns/${id}`, data),
  calculateTax: (id) => api.post(`/returns/${id}/calculate-tax`),
  generateJSON: (id) => api.post(`/returns/${id}/generate-json`),
  delete: (id) => api.delete(`/returns/${id}`)
};

// Upload endpoints
export const uploadAPI = {
  uploadForm16: (returnId, formData) => api.post(`/upload/${returnId}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  uploadCapitalGains: (returnId, formData) => api.post(`/upload/${returnId}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  importJSON: (returnId, formData) => api.post(`/upload/${returnId}/import-json`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  // Generic document upload
  uploadDocument: (returnId, formData) => api.post(`/upload/${returnId}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

export default api;
