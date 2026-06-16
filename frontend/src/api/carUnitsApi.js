import apiClient, { getData } from './axiosClient';

export const carUnitsApi = {
  list: (params) => getData(apiClient.get('/admin/car-units', { params })),
  detail: (id) => getData(apiClient.get(`/admin/car-units/${id}`)),
  create: (payload) => getData(apiClient.post('/admin/car-units', payload)),
  update: (id, payload) => getData(apiClient.put(`/admin/car-units/${id}`, payload)),
  remove: (id) => getData(apiClient.delete(`/admin/car-units/${id}`)),
};
