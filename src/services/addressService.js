import api from './api';

export const addressService = {
  create: async (data) => {
    const response = await api.post('/addresses', data);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/addresses');
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/addresses/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/addresses/${id}`);
    return response.data;
  }
};
