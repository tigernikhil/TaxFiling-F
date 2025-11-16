import api from './api';

export const bankService = {
  create: async (data) => {
    const response = await api.post('/banks', data);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/banks');
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/banks/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/banks/${id}`);
    return response.data;
  },

  setPrimary: async (id) => {
    const response = await api.patch(`/banks/${id}/set-primary`);
    return response.data;
  }
};
