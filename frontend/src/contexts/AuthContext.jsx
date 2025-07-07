import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { API_BASE_URL } from '../apiConfig';
// import { authFetch } from '../services/api'; 

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
                        // Tách email và role từ sub (dạng email|role)
                        const [email, roleName] = decodedToken.sub.split('|');
                        // Lấy name từ localStorage (nếu có) hoặc chỉ lấy email
                        const name = localStorage.getItem('userName');
                        setCurrentUser({
                            email,
                            name: name || undefined,
                            role: { roleName },
                        });
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
    // Nhận thêm rememberMe từ form
    const login = async (email, password, roleName, rememberMe = false) => {
        const payload = { email, password, rememberMe, roleName };
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('jwtToken', data.token);
            if (data.name) {
                localStorage.setItem('userName', data.name);
            } else {
                localStorage.removeItem('userName');
            }
            setToken(data.token);
            // Cập nhật ngay thông tin người dùng từ token và response
            const decodedToken = jwtDecode(data.token);
            // Tách email và role từ sub (dạng email|role)
            const [userEmail, userRole] = decodedToken.sub.split('|');
            setCurrentUser({
                email: userEmail,
                name: data.name,
                role: { roleName: userRole },
            });
            return data;
        } else {
            const text = await response.text();
            throw new Error(text || 'Đăng nhập thất bại');
        }
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