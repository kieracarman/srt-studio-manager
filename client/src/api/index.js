import axios from 'axios';

axios.interceptors.request.use((req) => {
  if (localStorage.jwtToken) {
    req.headers.Authorization = localStorage.jwtToken;
  }

  return req;
});

export const logIn = (formData) => axios.post('/api/auth/login', formData);

export const fetchUsers = () => axios.get('/api/users');
export const createUser = (newUser) => axios.post('/api/users', newUser);
export const fetchUser = (id) => axios.get(`/api/users/${id}`);
export const updateUser = (id, updatedUser) => axios.put(`/api/users/${id}`, updatedUser);
export const deleteUser = (id) => axios.delete(`/api/users/${id}`);

export const fetchAssets = () => axios.get('/api/assets');
export const createAsset = (newAsset) => axios.post('/api/assets', newAsset);
export const fetchAsset = (id) => axios.get(`/api/assets/${id}`);
export const updateAsset = (id, updatedAsset) => axios.put(`/api/assets/${id}`, updatedAsset);
export const deleteAsset = (id) => axios.delete(`/api/assets/${id}`);