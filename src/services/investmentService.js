import api from './api';

export const investmentService = {
  create: async (data) => {
    const response = await api.post('/investments', data);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/investments');
    return response.data;
  },

  getByYear: async (year) => {
    const response = await api.get(`/investments/year/${year}`);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/investments/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/investments/${id}`);
    return response.data;
  }
};
