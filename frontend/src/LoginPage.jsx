import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import hideIcon from "./icons/password-hide.png";
import viewIcon from "./icons/password-view.png";

const LoginPage = ({ t }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // THÊM STATE ĐỂ LƯU VAI TRÒ VÀ REMEMBER ME
  const [role, setRole] = useState("customer"); // Mặc định là khách hàng
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const remembered = localStorage.getItem("rememberedLogin");
    if (remembered) {
      const data = JSON.parse(remembered);
      if (Date.now() < data.expiredAt) {
        setEmail(data.email || "");
        setRole(data.role || "customer");
        setRememberMe(true);
      } else {
        localStorage.removeItem("rememberedLogin"); // Hết hạn thì xóa
      }
    }
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // Gửi cả 4 tham số vào hàm login
      await login(email, password, role, rememberMe);
      if (rememberMe) {
        const expiration = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 ngày
        localStorage.setItem(
          "rememberedLogin",
          JSON.stringify({
            email,
            role,
            expiredAt: expiration,
          })
        );
      } else {
        localStorage.removeItem("rememberedLogin"); // Xóa nếu không tick
      }
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      await login(
        null,
        null,
        "customer",
        rememberMe,
        credentialResponse.credential
      );
      navigate(from, { replace: true });
    } catch (err) {
      setError("Google login failed: " + err.message);
    }
  };

  // Hàm xử lý khi Google login thất bại
  const handleGoogleLoginError = () => {
    setError("Google login was unsuccessful. Please try again.");
  };

  return (
    <div className="auth-page" style={{ background: "var(--main-bg)" }}>
      <div
        className="auth-form-container"
        style={{ background: "var(--section-bg)" }}
      >
        <h2 style={{ color: "var(--main-text)" }}>
          {t("login_label") || "Đăng nhập"}
        </h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" style={{ color: "var(--main-text)" }}>
              {t("email_label") || "Email"}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder={t("email_placeholder") || "Nhập email của bạn"}
            />
          </div>
          <div className="form-group" style={{ position: "relative" }}>
            <label htmlFor="password" style={{ color: "var(--main-text)" }}>
              {t("password_label") || "Mật khẩu"}
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"} // 👈 Toggle input type
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder={t("password_placeholder") || "Nhập mật khẩu"}
              style={{ paddingRight: "40px" }} // Để chừa chỗ cho icon
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              style={{
                position: "absolute",
                right: 10,
                top: "60%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "var(--main-text)",
                userSelect: "none",
              }}
              title={
                showPassword
                  ? t("hide_password") || "Ẩn mật khẩu"
                  : t("show_password") || "Hiện mật khẩu"
              }
            >
              {showPassword ? (
                <img
                  src={hideIcon} // Dùng biến đã import
                  alt="Hide password" // Thêm alt text cho accessibility
                  className="password-toggle-icon hide-icon"
                />
              ) : (
                <img
                  src={viewIcon} // Dùng biến đã import
                  alt="Show password" // Thêm alt text cho accessibility
                  className="password-toggle-icon hide-icon"
                />
              )}
              {/* Có thể thay bằng icon SVG nếu muốn */}
            </span>
          </div>

          {/* THÊM TRƯỜNG CHỌN VAI TRÒ */}
          <div className="form-group">
            <label htmlFor="role" style={{ color: "var(--main-text)" }}>
              {t("role_label") || "Vai trò"}
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="customer">
                {t("role_customer") || "Khách hàng"}
              </option>
              <option value="seller">{t("role_seller") || "Người bán"}</option>
              <option value="admin">
                {t("role_admin") || "Quản trị viên"}
              </option>
            </select>
          </div>
          <div
            className="form-group"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <input
              type="checkbox"
              id="rememberMe"
              className="rememberme-checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{ width: 18, height: 18, marginRight: 8 }}
            />
            <label
              htmlFor="rememberMe"
              style={{
                margin: 0,
                cursor: "pointer",
                userSelect: "none",
                color: "var(--main-text)",
              }}
            >
              {t("remember_me_label") || "Ghi nhớ đăng nhập"}
            </label>
          </div>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? (
              <span className="loading-spinner"></span>
            ) : (
              t("login_label") || "Đăng nhập"
            )}
          </button>
          <div style={{ marginTop: "16px", textAlign: "center" }}>
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
            />
          </div>
        </form>
        <div className="auth-switch-link">
          <p>
            {t("dont_have_account_prompt") || "Chưa có tài khoản?"}{" "}
            <Link to="/register">{t("register_label") || "Đăng ký ngay"}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default function WrappedLoginPage(props) {
  return (
    <>
      <LoginPage {...props} />
    </>
  );
}
