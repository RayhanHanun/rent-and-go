import apiClient, { getData } from './axiosClient';

export const messagesApi = {
  createPublic: (payload) => getData(apiClient.post('/public/contact-messages', payload)),
  list: (params) => getData(apiClient.get('/admin/contact-messages', { params })),
  detail: (id) => getData(apiClient.get(`/admin/contact-messages/${id}`)),
  updateStatus: (id, status) => getData(apiClient.patch(`/admin/contact-messages/${id}/status`, { status })),
  remove: (id) => getData(apiClient.delete(`/admin/contact-messages/${id}`)),
};
