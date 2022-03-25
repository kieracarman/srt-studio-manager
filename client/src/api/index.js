import axios from 'axios';

axios.interceptors.request.use((req) => {
  if (localStorage.jwtToken) {
    req.headers.Authorization = localStorage.jwtToken;
  }

  return req;
});

export const logIn = (formData) => axios.post('/api/auth/login', formData);
export const fetchUsers = () => axios.get('/api/auth');

export const fetchAssets = () => axios.get('/api/assets');
export const createAsset = (newAsset) => axios.post('/api/assets', newAsset);
export const fetchAsset = (id) => axios.get(`/api/assets${id}`);
export const updateAsset = (id, updatedAsset) => axios.patch(`/api/assets${id}`, updatedAsset);
export const deleteAsset = (id) => axios.delete(`/api/assets${id}`);