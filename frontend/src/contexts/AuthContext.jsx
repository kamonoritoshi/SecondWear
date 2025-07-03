import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { API_BASE_URL } from '../apiConfig';
import { authFetch } from '../services/api'; 

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('jwtToken'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    const currentTime = Date.now() / 1000;

                    if (decodedToken.exp > currentTime) {
                        // Lấy thông tin chi tiết của account từ token
                        // Giả định backend có API để lấy account bằng email
                        const response = await authFetch(`/api/accounts/email/${decodedToken.sub}`);
                        if (response.ok) {
                            const accountData = await response.json();
                            setCurrentUser(accountData); 
                        } else {
                            throw new Error("Phiên đăng nhập không hợp lệ.");
                        }
                    } else {
                        logout();
                    }
                } catch (error) {
                    console.error("Lỗi khi xác thực token:", error);
                    logout();
                }
            }
            setLoading(false);
        };
        fetchUser();
    }, [token]);

    // SỬA LẠI HÀM LOGIN ĐỂ NHẬN 3 THAM SỐ
    const login = async (email, password, roleName) => {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // GỬI ĐI ĐỦ 3 THAM SỐ
            body: JSON.stringify({ email, password, roleName, rememberMe: true }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            try {
                // Backend mới trả về lỗi dạng text, không phải JSON
                // nên chúng ta sẽ hiển thị trực tiếp text đó
                throw new Error(errorText || 'Đăng nhập thất bại');
            } catch (e) {
                throw new Error(errorText || 'Đăng nhập thất bại');
            }
        }

        const data = await response.json();
        localStorage.setItem('jwtToken', data.token);
        setToken(data.token);
        
        // Cập nhật ngay thông tin người dùng
        const decodedToken = jwtDecode(data.token);
        setCurrentUser({
             email: decodedToken.sub,
             accountId: data.accountId, // Lấy từ response login
             role: { roleName: data.role }, // Lấy từ response login
             // các thông tin khác có thể được cập nhật sau
        });
        
        return data;
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
        setToken(null);
        setCurrentUser(null);
    };

    const value = {
        currentUser,
        setCurrentUser,
        token,
        login,
        logout,
        isAuthenticated: !!currentUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};