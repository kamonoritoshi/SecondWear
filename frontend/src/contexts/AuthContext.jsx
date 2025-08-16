import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from "../apiConfig";
// import { authFetch } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("jwtToken"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          if (
            decodedToken.exp > currentTime &&
            decodedToken.sub &&
            decodedToken.role
          ) {
            const email = decodedToken.sub;
            const role = decodedToken.role;
            // Lấy name từ localStorage (nếu có) hoặc chỉ lấy email
            const name = localStorage.getItem("userName");
            const res = await fetch(`${API_BASE_URL}/api/accounts/me`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (res.ok) {
              const data = await res.json();
              const accountId = data.accountId;

              setCurrentUser({
                email,
                name: name || data.name,
                role,
                accountId, // ✅ thêm id vào đây
              });
            } else {
              logout();
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
  // Nhận thêm rememberMe từ form
  const login = async (
    email,
    password,
    roleName,
    rememberMe = false,
    tokenFromGoogle = null
  ) => {
    let token = tokenFromGoogle;
    let data = {};

    if (!token) {
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

      data = await response.json();
      token = data.token;
    } else {
      // 🔹 Login bằng Google => backend đã trả { token, email, name, role }
      data = {
        token,
        email: email, // truyền từ Google
        role: roleName, // truyền từ Google
        name: tokenFromGoogle?.name || "", // lấy name đúng từ response
      };
    }

    // ✅ Lưu token vào localStorage
    localStorage.setItem("jwtToken", token);

    if (data.name) {
      localStorage.setItem("userName", data.name);
    } else {
      localStorage.removeItem("userName");
    }

    setToken(token);

    // ✅ Decode token để lấy thông tin cơ bản
    const decodedToken = jwtDecode(token);
    const emailRaw = decodedToken.sub || "";
    let role = decodedToken.role || "";

    if (emailRaw.includes("|")) {
      const [emailPart, rolePart] = emailRaw.split("|");
      email = emailPart;
      if (!role && rolePart) role = rolePart;
    }

    // ✅ Gọi API lấy thông tin account hiện tại
    const res = await fetch(`${API_BASE_URL}/api/accounts/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Không lấy được thông tin người dùng");

    const userData = await res.json();
    console.log("userData: ", userData);

    const accountId = userData.accountId;
    localStorage.setItem("accountId", accountId);

    // ✅ Cập nhật currentUser chính xác
    setCurrentUser({
      email,
      name: name || data.user?.name || data.name,
      role,
      accountId,
    });

    return data;
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
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
