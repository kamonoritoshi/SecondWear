// File: frontend/src/apiConfig.js

// Đọc URL từ biến môi trường VITE_API_BASE_URL của Vercel.
// Nếu biến này không tồn tại (khi chạy local), nó sẽ dùng địa chỉ localhost.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';