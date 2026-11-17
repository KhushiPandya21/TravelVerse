import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Create the axios instance with baseURL
const API = axios.create({
  baseURL: API_URL,
});

// Attach token to requests if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Auth API calls & Aliases
export const registerUser = (userData) => API.post('/auth/register', userData);
export const loginUser = (userData) => API.post('/auth/login', userData);
export const register = registerUser;
export const login = loginUser;

// Destinations API calls
export const fetchDestinations = async () => {
  const response = await API.get('/api/destinations');
  return response.data;
};

// Trips API calls
export const createTrip = async (tripData) => {
  const response = await API.post('/api/trips', tripData);
  return response.data;
};

export const getUserTrips = async (userId) => {
  const response = await API.get(`/api/trips/user/${userId}`);
  return response;
};

export const updateTrip = async (tripId, tripData) => {
  const response = await API.put(`/api/trips/${tripId}`, tripData);
  return response.data;
};

export const deleteTrip = async (tripId) => {
  const response = await API.delete(`/api/trips/${tripId}`);
  return response.data;
};

// Bookings API calls
export const createBooking = async (bookingData) => {
  const response = await API.post('/api/bookings', bookingData);
  return response.data;
};

export const getUserBookings = async (userId) => {
  const response = await API.get(`/api/bookings/user/${userId}`);
  return response;
};

// Expenses API calls
export const createExpense = async (expenseData) => {
  const response = await API.post('/api/expenses', expenseData);
  return response.data;
};

export const getTripExpenses = async (tripId) => {
  const response = await API.get(`/api/expenses/trip/${tripId}`);
  return response;
};

export const deleteExpense = async (expenseId) => {
  const response = await API.delete(`/api/expenses/${expenseId}`);
  return response.data;
};

// AI Itinerary & Estimation API calls
export const generateAiItinerary = async (tripData) => {
  const response = await API.post('/api/ai/generate-itinerary', tripData);
  return response;
};

export const getAiTripEstimate = async (estimateData) => {
  const response = await API.post('/api/ai/estimate-estimate', estimateData);
  return response;
};

export default API;