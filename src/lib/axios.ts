import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://172.20.10.2:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
