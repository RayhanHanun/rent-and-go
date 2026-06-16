import apiClient, { getData } from './axiosClient';

export const authApi = {
  login: (payload) => getData(apiClient.post('/admin/login', payload)),
  me: () => getData(apiClient.get('/admin/me')),
  logout: () => getData(apiClient.post('/admin/logout')),
};
