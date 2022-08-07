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

export const fetchTickets = () => axios.get('/api/tickets');
export const createTicket = (newTicket) => axios.post('/api/tickets', newTicket);
export const fetchTicket = (id) => axios.get(`/api/tickets/${id}`);
export const updateTicket = (id, updatedTicket) => axios.put(`/api/tickets/${id}`, updatedTicket);
export const deleteTicket = (id) => axios.delete(`/api/tickets/${id}`);

export const fetchBookings = () => axios.get('/api/bookings');
export const createBooking = (newBooking) => axios.post('/api/bookings', newBooking);
export const fetchBooking = (id) => axios.get(`/api/bookings/${id}`);
export const updateBooking = (id, updatedBooking) => axios.put(`/api/bookings/${id}`, updatedBooking);
export const deleteBooking = (id) => axios.delete(`/api/bookings/${id}`);