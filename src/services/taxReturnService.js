import api from './api';

export const taxReturnService = {
  create: async (data) => {
    const response = await api.post('/returns', data);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/returns');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/returns/${id}`);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/returns/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/returns/${id}`);
    return response.data;
  },

  submit: async (id) => {
    const response = await api.post(`/returns/${id}/submit`);
    return response.data;
  }
};
