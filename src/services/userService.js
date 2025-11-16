import api from './api';

export const userService = {
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await api.put('/users/profile', data);
    return response.data;
  },

  updatePassword: async (oldPassword, newPassword) => {
    const response = await api.put('/users/password', { oldPassword, newPassword });
    return response.data;
  }
};
