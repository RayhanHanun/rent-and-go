import apiClient, { getData } from './axiosClient';

export const carsApi = {
  publicList: (params) => getData(apiClient.get('/public/cars', { params })),
  publicFeatured: () => getData(apiClient.get('/public/cars/featured')),
  publicDetail: (slug) => getData(apiClient.get(`/public/cars/${slug}`)),
  list: (params) => getData(apiClient.get('/admin/cars', { params })),
  detail: (id) => getData(apiClient.get(`/admin/cars/${id}`)),
  create: (payload) => getData(apiClient.post('/admin/cars', payload)),
  update: (id, payload) => getData(apiClient.put(`/admin/cars/${id}`, payload)),
  remove: (id) => getData(apiClient.delete(`/admin/cars/${id}`)),
  uploadImage: (id, payload) => getData(apiClient.post(`/admin/cars/${id}/images`, payload)),
  deleteImage: (imageId) => getData(apiClient.delete(`/admin/car-images/${imageId}`)),
  setPrimaryImage: (imageId) => getData(apiClient.patch(`/admin/car-images/${imageId}/set-primary`)),
};
