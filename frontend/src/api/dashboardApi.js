import apiClient, { getData } from './axiosClient';

export const dashboardApi = {
  stats: () => getData(apiClient.get('/admin/dashboard/stats')),
  charts: () => getData(apiClient.get('/admin/dashboard/charts')),
};
