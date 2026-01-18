import axios from 'axios';

// Use relative URL - Vite proxy will forward to backend
const API_URL = '/api';

console.log('API URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('Making request to:', config.url);
  return config;
});

// Add response interceptor for better error logging
api.interceptors.response.use(
  (response) => {
    console.log('API Success:', response.config.url, response.status);
    return response;
  },
  (error) => {
    console.error('API Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url,
    });
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getCurrentUser: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/password', data),
  deleteAccount: (data) => api.delete('/auth/account', { data }),
};

// Pets endpoints
export const petsAPI = {
  getAll: () => api.get('/pets'),
  getById: (id) => api.get(`/pets/${id}`),
  create: (data) => api.post('/pets', data),
  update: (id, data) => api.put(`/pets/${id}`, data),
  delete: (id) => api.delete(`/pets/${id}`),
};

// Health records endpoints
export const healthAPI = {
  getRecords: (petId) => api.get(`/health/pets/${petId}/records`),
  createRecord: (petId, data) => api.post(`/health/pets/${petId}/records`, data),
  updateRecord: (petId, recordId, data) => api.put(`/health/pets/${petId}/records/${recordId}`, data),
  deleteRecord: (petId, recordId) => api.delete(`/health/pets/${petId}/records/${recordId}`),

  getMedications: (petId) => api.get(`/health/pets/${petId}/medications`),
  createMedication: (petId, data) => api.post(`/health/pets/${petId}/medications`, data),

  getVaccinations: (petId) => api.get(`/health/pets/${petId}/vaccinations`),
  createVaccination: (petId, data) => api.post(`/health/pets/${petId}/vaccinations`, data),

  getVetVisits: (petId) => api.get(`/health/pets/${petId}/vet-visits`),
  createVetVisit: (petId, data) => api.post(`/health/pets/${petId}/vet-visits`, data),
};

export default api;
