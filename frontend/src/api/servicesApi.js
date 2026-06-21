import apiClient, { getData } from './axiosClient';
import { cachedRequest, publicCacheKey } from './requestCache';

export const servicesApi = {
  publicList: () =>
    cachedRequest(publicCacheKey('public.services'), () => getData(apiClient.get('/public/services')), 120_000),
  publicDetail: (slug) =>
    cachedRequest(publicCacheKey('public.services.detail', { slug }), () => getData(apiClient.get(`/public/services/${slug}`)), 120_000),
  list: (params) => getData(apiClient.get('/admin/services', { params })),
  detail: (id) => getData(apiClient.get(`/admin/services/${id}`)),
  create: (payload) => getData(apiClient.post('/admin/services', payload)),
  update: (id, payload) => getData(apiClient.put(`/admin/services/${id}`, payload)),
  remove: (id) => getData(apiClient.delete(`/admin/services/${id}`)),
};
