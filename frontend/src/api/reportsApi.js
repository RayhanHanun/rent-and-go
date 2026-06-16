import apiClient, { getData } from './axiosClient';

export const reportsApi = {
  rentals: (params) => getData(apiClient.get('/admin/reports/rentals', { params })),
  fleetAvailability: () => getData(apiClient.get('/admin/reports/fleet-availability')),
  maintenance: (params) => getData(apiClient.get('/admin/reports/maintenance', { params })),
  downloadRentals: (params) =>
    apiClient.get('/admin/reports/rentals/export', { params, responseType: 'blob' }),
  exportRentalsUrl: () => `${apiClient.defaults.baseURL}/admin/reports/rentals/export`,
};
