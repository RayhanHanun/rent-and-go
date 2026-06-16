import apiClient, { getData } from './axiosClient';

export const maintenanceApi = {
  list: (params) => getData(apiClient.get('/admin/maintenance', { params })),
  detail: (id) => getData(apiClient.get(`/admin/maintenance/${id}`)),
  create: (payload) => getData(apiClient.post('/admin/maintenance', payload)),
  update: (id, payload) => getData(apiClient.put(`/admin/maintenance/${id}`, payload)),
  remove: (id) => getData(apiClient.delete(`/admin/maintenance/${id}`)),
};
