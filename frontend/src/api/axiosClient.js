import axios from 'axios';
import { clearAdminSession, getAdminToken } from './authStorage';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api',
  headers: {
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getAdminToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAdminSession();
    }

    return Promise.reject(error);
  },
);

export const getData = async (request) => {
  const response = await request;
  return response.data;
};

export default apiClient;
