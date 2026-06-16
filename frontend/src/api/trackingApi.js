import apiClient, { getData } from './axiosClient';

export const trackingApi = {
  list: (params) => getData(apiClient.get('/admin/tracking', { params })),
  detail: (id) => getData(apiClient.get(`/admin/tracking/${id}`)),
  create: (payload) => getData(apiClient.post('/admin/tracking', payload)),
  update: (id, payload) => getData(apiClient.put(`/admin/tracking/${id}`, payload)),
  remove: (id) => getData(apiClient.delete(`/admin/tracking/${id}`)),
  refreshDemo: (id) => getData(apiClient.post(`/admin/tracking/${id}/refresh-demo`)),
};
