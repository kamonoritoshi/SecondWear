// src/ChangePasswordPage.jsx
import React, { useState } from "react";
import axios from "axios";
import "./css/ProfilePage.css";
import { API_BASE_URL } from "./apiConfig";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "./contexts/AuthContext"; // ✅ thêm

const ChangePasswordPage = ({ t }) => {
  // ✅ Lấy từ AuthContext (nếu dùng)
  const { token, currentUser, isAuthenticated } = (typeof useAuth === "function" ? useAuth() : {}) || {};

  // ✅ Fallback từ localStorage
  const authToken =
    token ||
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken");

  const accountId =
    currentUser?.accountId ||
    (() => {
      try {
        const u = JSON.parse(localStorage.getItem("user") || "{}");
        return u?.accountId;
      } catch {
        return undefined;
      }
    })();

  // ✨ state cho đổi mật khẩu
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  // ✨ state ẩn/hiện mật khẩu
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const handlePasswordChange = (e) => {
    setPasswordData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChangePassword = async () => {
    if (!authToken || !accountId) {
      setPasswordError("Bạn chưa đăng nhập. Vui lòng đăng nhập lại.");
      setPasswordSuccess("");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Mật khẩu mới và xác nhận không khớp.");
      setPasswordSuccess("");
      return;
    }

    try {
      const config = { headers: { Authorization: `Bearer ${authToken}` } };
      await axios.put(
        `${API_BASE_URL}/api/accounts/${accountId}/change-password`,
        {
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
        },
        config
      );
      setPasswordSuccess("Đổi mật khẩu thành công!");
      setPasswordError("");
      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        (typeof err?.response?.data === "string" ? err.response.data : "") ||
        err.message;
      setPasswordError(`Đổi mật khẩu thất bại: Sai mật khẩu cũ!`);
      // setPasswordError(`Status: ${msg}`);
      setPasswordSuccess("");
    }
  };

  return (
    <div className="profile-container">
      <h3 className="profile-subtitle">{t ? t("Đổi mật khẩu") : "Đổi mật khẩu"}</h3>

      {/* Mật khẩu cũ */}
      <div className="profile-field password-field">
        <label>Mật khẩu cũ:</label>
        <div className="password-input-wrapper">
          <input
            type={showPassword.old ? "text" : "password"}
            name="oldPassword"
            value={passwordData.oldPassword}
            onChange={handlePasswordChange}
            className="profile-input"
          />
          <span
            className="password-toggle"
            onClick={() =>
              setShowPassword((prev) => ({ ...prev, old: !prev.old }))
            }
          >
            {showPassword.old ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      </div>

      {/* Mật khẩu mới */}
      <div className="profile-field password-field">
        <label>Mật khẩu mới:</label>
        <div className="password-input-wrapper">
          <input
            type={showPassword.new ? "text" : "password"}
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            className="profile-input"
          />
          <span
            className="password-toggle"
            onClick={() =>
              setShowPassword((prev) => ({ ...prev, new: !prev.new }))
            }
          >
            {showPassword.new ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      </div>

      {/* Xác nhận mật khẩu mới */}
      <div className="profile-field password-field">
        <label>Xác nhận mật khẩu mới:</label>
        <div className="password-input-wrapper">
          <input
            type={showPassword.confirm ? "text" : "password"}
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            className="profile-input"
          />
          <span
            className="password-toggle"
            onClick={() =>
              setShowPassword((prev) => ({ ...prev, confirm: !prev.confirm }))
            }
          >
            {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      </div>

      <button onClick={handleChangePassword} className="profile-button edit-button">
        Đổi mật khẩu
      </button>

      {passwordError && <div className="error-text">{passwordError}</div>}
      {passwordSuccess && <div className="success-text">{passwordSuccess}</div>}
    </div>
  );
};

export default ChangePasswordPage;
