import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from "../apiConfig";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("jwtToken"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          logout();
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_BASE_URL}/api/accounts/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          logout();
        } else {
          const data = await res.json();
          setCurrentUser({
            email: data.email,
            name: data.name,
            role: data.roleName, // cần chắc API trả về roleName
            accountId: data.accountId,
          });
        }
      } catch (error) {
        console.error("Lỗi xác thực token:", error);
        logout();
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = async (
    email,
    password,
    roleName,
    rememberMe = false,
    tokenFromGoogle = null // credential từ Google (chính là credentialResponse.credential)
  ) => {
    let token;
    let data;

    if (!tokenFromGoogle) {
      // 🔹 Login thường (email + password)
      const payload = { email, password, rememberMe, roleName };
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Đăng nhập thất bại");
      }

      data = await response.json(); // { token, email, name, role }
      token = data.token;
    } else {
      // 🔹 Login bằng Google (FE chỉ truyền credential vào đây)
      const response = await fetch(`${API_BASE_URL}/api/auth/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          credential: tokenFromGoogle, // credential từ Google
          roleName,
          rememberMe,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Google login failed");
      }

      data = await response.json(); // { token, email, name, role }
      token = data.token;
    }

    // ✅ Lưu token vào localStorage
    localStorage.setItem("jwtToken", token);
    setToken(token);

    // ✅ Kiểm tra hạn token
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      throw new Error("Token hết hạn");
    }

    // ✅ Gọi API lấy account hiện tại
    const res = await fetch(`${API_BASE_URL}/api/accounts/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Không lấy được thông tin người dùng");
    const userData = await res.json();

    const accountId = userData.accountId;
    localStorage.setItem("accountId", accountId);

    setCurrentUser({
      email: userData.email ?? data.email,
      name: userData.name ?? data.name,
      role: userData.role?.roleName || data.role,
      accountId,
    });

    // ✅ Remember Me
    if (rememberMe) {
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
    localStorage.removeItem("accountId");
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
