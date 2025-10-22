import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (userData) => api.put('/auth/profile', userData),
};

// User endpoints
export const userAPI = {
  getAll: (params) => api.get('/users', { params }),
  getById: (id) => api.get(`/users/${id}`),
  addRating: (id, ratingData) => api.post(`/users/${id}/rating`, ratingData),
};

// Skill endpoints
export const skillAPI = {
  getAll: (params) => api.get('/skills', { params }),
  getPopular: (params) => api.get('/skills/popular', { params }),
  create: (skillData) => api.post('/skills', skillData),
};

// Booking endpoints
export const bookingAPI = {
  create: (bookingData) => api.post('/bookings', bookingData),
  getUserBookings: () => api.get('/bookings'),
  getById: (id) => api.get(`/bookings/${id}`),
  updateStatus: (id, statusData) => api.put(`/bookings/${id}/status`, statusData),
};

// Chat endpoints
export const chatAPI = {
  sendMessage: (messageData) => api.post('/chat/send', messageData),
  getConversation: (userId) => api.get(`/chat/conversation/${userId}`),
  getUnreadCount: () => api.get('/chat/unread-count'),
};

// Review endpoints
export const reviewAPI = {
  create: (reviewData) => api.post('/reviews', reviewData),
  getUserReviews: (userId) => api.get(`/reviews/user/${userId}`),
};

export default api;