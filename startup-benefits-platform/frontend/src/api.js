import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

export const deals = {
  getAll: (params) => api.get('/deals', { params }),
  getOne: (id) => api.get(`/deals/${id}`),
};

export const claims = {
  create: (dealId) => api.post('/claims', { dealId }),
  getMyClaims: () => api.get('/claims/my-claims'),
};

export const users = {
  getProfile: () => api.get('/users/profile'),
};

export default api;
