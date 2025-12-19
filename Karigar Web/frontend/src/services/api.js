import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
});

// Add a request interceptor to attach the token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const authService = {
    login: (credentials) => api.post('/auth/login', credentials), // Assuming auth routes are under /api/auth
    register: (data) => api.post('/auth/register', data),
};

export const customerService = {
    getProviders: (query) => api.get('/customer/providers', { params: query }),
    getProviderById: (id) => api.get(`/customer/providers/${id}`),
    createBooking: (data) => api.post('/customer/book', data),
    getBookings: () => api.get('/customer/bookings'),
    postReview: (data) => api.post('/customer/review', data),
};

export const providerService = {
    getProfile: () => api.get('/provider/profile'),
    updateProfile: (data) => api.put('/provider/profile', data),
    getRequests: () => api.get('/provider/requests'),
    updateRequestStatus: (id, status) => api.put(`/provider/requests/${id}`, { status }),
    getHistory: () => api.get('/provider/history'),
};

export const adminService = {
    getUsers: () => api.get('/admin/users'),
    deleteUser: (id) => api.delete(`/admin/users/${id}`),
    getReviews: () => api.get('/admin/reviews'),
    deleteReview: (id) => api.delete(`/admin/reviews/${id}`),
    getStats: () => api.get('/admin/stats'),
};

export default api;
