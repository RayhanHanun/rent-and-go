import apiClient, { getData } from './axiosClient';

export const servicesApi = {
  publicList: () => getData(apiClient.get('/public/services')),
  publicDetail: (slug) => getData(apiClient.get(`/public/services/${slug}`)),
  list: (params) => getData(apiClient.get('/admin/services', { params })),
  detail: (id) => getData(apiClient.get(`/admin/services/${id}`)),
  create: (payload) => getData(apiClient.post('/admin/services', payload)),
  update: (id, payload) => getData(apiClient.put(`/admin/services/${id}`, payload)),
  remove: (id) => getData(apiClient.delete(`/admin/services/${id}`)),
};
