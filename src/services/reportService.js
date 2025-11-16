import api from './api';

export const reportService = {
  generatePDF: async (returnId) => {
    const response = await api.get(`/reports/${returnId}/pdf`, {
      responseType: 'blob'
    });
    return response.data;
  },

  generateXML: async (returnId) => {
    const response = await api.get(`/reports/${returnId}/xml`, {
      responseType: 'blob'
    });
    return response.data;
  },

  generateJSON: async (returnId) => {
    const response = await api.get(`/reports/${returnId}/json`);
    return response.data;
  },

  getTaxSummary: async (returnId) => {
    const response = await api.get(`/reports/${returnId}/summary`);
    return response.data;
  }
};
