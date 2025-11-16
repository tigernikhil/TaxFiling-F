import api from './api';

export const calculationService = {
  calculateTax: async (data) => {
    const response = await api.post('/calculation/tax', data);
    return response.data;
  },

  compareTaxRegimes: async (data) => {
    const response = await api.post('/calculation/compare', data);
    return response.data;
  },

  calculateHRA: async (data) => {
    const response = await api.post('/calculation/hra', data);
    return response.data;
  },

  calculateCapitalGains: async (data) => {
    const response = await api.post('/calculation/capital-gains', data);
    return response.data;
  },

  getSummary: async () => {
    const response = await api.get('/calculation/summary');
    return response.data;
  }
};
