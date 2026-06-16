import apiClient, { getData } from './axiosClient';

export const categoriesApi = {
  publicList: () => getData(apiClient.get('/public/categories')),
  list: (params) => getData(apiClient.get('/admin/car-categories', { params })),
  detail: (id) => getData(apiClient.get(`/admin/car-categories/${id}`)),
  create: (payload) => getData(apiClient.post('/admin/car-categories', payload)),
  update: (id, payload) => getData(apiClient.put(`/admin/car-categories/${id}`, payload)),
  remove: (id) => getData(apiClient.delete(`/admin/car-categories/${id}`)),
};
