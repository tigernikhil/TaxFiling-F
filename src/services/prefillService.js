import api from './api';

export const prefillService = {
  prefillFromForm26AS: async (returnId, data) => {
    const response = await api.post(`/prefill/${returnId}/26as`, data);
    return response.data;
  },

  prefillFromAIS: async (returnId, data) => {
    const response = await api.post(`/prefill/${returnId}/ais`, data);
    return response.data;
  },

  prefillFromHTML: async (returnId, file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post(`/prefill/${returnId}/html`, formData);
    return response.data;
  },

  confirmPrefill: async (returnId, data) => {
    const response = await api.post(`/prefill/${returnId}/confirm`, data);
    return response.data;
  }
};
