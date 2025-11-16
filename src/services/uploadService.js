import api from './api';

export const uploadService = {
  uploadDocument: async (returnId, formData, onProgress) => {
    const response = await api.post(`/upload/${returnId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        if (onProgress) onProgress(progress);
      }
    });
    return response.data;
  },

  uploadHTML: async (returnId, file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'html');
    const response = await api.post(`/upload/${returnId}/html`, formData);
    return response.data;
  }
};
