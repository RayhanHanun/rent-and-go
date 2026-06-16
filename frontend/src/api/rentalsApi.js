import apiClient, { getData } from './axiosClient';

export const rentalsApi = {
  list: (params) => getData(apiClient.get('/admin/rentals', { params })),
  detail: (id) => getData(apiClient.get(`/admin/rentals/${id}`)),
  create: (payload) => getData(apiClient.post('/admin/rentals', payload)),
  update: (id, payload) => getData(apiClient.put(`/admin/rentals/${id}`, payload)),
  remove: (id) => getData(apiClient.delete(`/admin/rentals/${id}`)),
  addPayment: (id, payload) => getData(apiClient.post(`/admin/rentals/${id}/payments`, payload)),
  removePayment: (id) => getData(apiClient.delete(`/admin/rental-payments/${id}`)),
};
