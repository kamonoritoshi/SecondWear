import { API_BASE_URL } from '../apiConfig';

const getAuthToken = () => localStorage.getItem('jwtToken');

export const authFetch = async (url, options = {}) => {
    const token = getAuthToken();

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        // Có thể xử lý tự động logout ở đây
        console.error("Unauthorized access - logging out");
        localStorage.removeItem('jwtToken');
        window.location.href = '/login'; // Chuyển hướng về trang đăng nhập
    }

    return response;
};