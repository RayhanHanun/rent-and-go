import apiClient, { getData } from './axiosClient';

export const settingsApi = {
  publicSettings: () => getData(apiClient.get('/public/settings')),
  list: () => getData(apiClient.get('/admin/settings')),
  update: (settings) => getData(apiClient.put('/admin/settings', { settings })),
  uploadLogo: (payload) => getData(apiClient.post('/admin/settings/logo', payload)),
};
