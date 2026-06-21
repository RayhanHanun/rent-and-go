import apiClient, { getData } from './axiosClient';
import { cachedRequest, publicCacheKey } from './requestCache';

export const settingsApi = {
  publicSettings: () =>
    cachedRequest(publicCacheKey('public.settings'), () => getData(apiClient.get('/public/settings')), 120_000),
  list: () => getData(apiClient.get('/admin/settings')),
  update: (settings) => getData(apiClient.put('/admin/settings', { settings })),
  uploadLogo: (payload) => getData(apiClient.post('/admin/settings/logo', payload)),
};
