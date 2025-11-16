import api from './api';

export const documentService = {
  getAll: async () => {
    const response = await api.get('/documents');
    return response.data;
  },

  upload: async (formData) => {
    const response = await api.post('/documents/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/documents/${id}`);
    return response.data;
  },

  download: async (id) => {
    const response = await api.get(`/documents/${id}/download`, {
      responseType: 'blob'
    });
    return response.data;
  }
};
