import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from "../apiConfig";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  // Lấy token từ localStorage làm giá trị khởi tạo
  const [token, setToken] = useState(() => localStorage.getItem("jwtToken"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserOnLoad = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      
      // Kiểm tra token hết hạn
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          logout(); // Token hết hạn, đăng xuất
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error("Token không hợp lệ:", error);
        logout();
        setLoading(false);
        return;
      }

      // Ưu tiên tải từ localStorage để tăng tốc độ
      const cachedUser = localStorage.getItem("currentUser");
      if (cachedUser) {
        setCurrentUser(JSON.parse(cachedUser));
        setLoading(false);
        return;
      }

      // Nếu không có cache, gọi API để lấy thông tin mới nhất
      try {
        const res = await fetch(`${API_BASE_URL}/api/accounts/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          throw new Error("Phiên đăng nhập không hợp lệ");
        }
        
        const accountData = await res.json();
        const userToStore = {
            email: accountData.user.email,
            name: accountData.user.name,
            role: accountData.role.roleName,
            sellerStatus: accountData.sellerStatus,
            accountId: accountData.accountId,
            avatarUrl: accountData.avatarUrl,
        };

        setCurrentUser(userToStore);
        localStorage.setItem("currentUser", JSON.stringify(userToStore));

      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };
    fetchUserOnLoad();
  }, [token]);

  const login = async (
    email,
    password,
    roleName,
    rememberMe = false,
    tokenFromGoogle = null
  ) => {
    let response;
    // ✅ Tạo biến để xác định trạng thái rememberMe cuối cùng
    let effectiveRememberMe = rememberMe;

    if (!tokenFromGoogle) {
      // Login thường
      response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe, roleName }),
      });
    } else {
      // ✅ Nếu đăng nhập bằng Google, tự động đặt rememberMe = true
      effectiveRememberMe = true;
      response = await fetch(`${API_BASE_URL}/api/auth/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: tokenFromGoogle, roleName, rememberMe: effectiveRememberMe }),
      });
    }

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || "Đăng nhập thất bại");
    }

    const data = await response.json(); // data = { token, email, fullName, role, sellerStatus }
    const newToken = data.token;

    // Lưu token mới
    localStorage.setItem("jwtToken", newToken);
    setToken(newToken);

    // Xây dựng đối tượng user để lưu vào state và localStorage
    const userToStore = {
      email: data.email,
      name: data.name, // Sửa lại để khớp với AuthResponse
      role: data.role,
      sellerStatus: data.sellerStatus,
      accountId: data.accountId,
      avatarUrl: data.avatarUrl,
    };
    
    setCurrentUser(userToStore);
    localStorage.setItem("currentUser", JSON.stringify(userToStore));
    
    // ✅ Sử dụng biến effectiveRememberMe để xử lý
    if (effectiveRememberMe) {
        const expiration = Date.now() + 7 * 24 * 60 * 60 * 1000;
        localStorage.setItem(
          "rememberedLogin",
          JSON.stringify({
            email: data.email,
            role: data.role,
            expiredAt: expiration,
          })
        );
    } else {
      localStorage.removeItem("rememberedLogin");
    }

    return data;
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("currentUser");
    // Giữ lại 'rememberedLogin' khi đăng xuất
    setToken(null);
    setCurrentUser(null);
  };

  const updateUserAvatar = (newAvatarUrl) => {
      setCurrentUser(prevUser => {
          if (!prevUser) return null;
          const updatedUser = { ...prevUser, avatarUrl: newAvatarUrl };
          // Cập nhật lại localStorage để thông tin được đồng bộ
          localStorage.setItem("currentUser", JSON.stringify(updatedUser));
          return updatedUser;
      });
  };

  const value = {
    currentUser,
    setCurrentUser,
    token,
    login,
    logout,
    loading,
    isAuthenticated: !!currentUser,
    updateUserAvatar,
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