import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

const LoginPage = ({ t }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // THÊM STATE ĐỂ LƯU VAI TRÒ VÀ REMEMBER ME
    const [role, setRole] = useState('customer'); // Mặc định là khách hàng
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const from = location.state?.from?.pathname || "/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            // Gửi cả 4 tham số vào hàm login
            await login(email, password, role, rememberMe);
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-form-container">
                <h2>{t('login_label') || "Đăng nhập"}</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Nhập email của bạn"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Nhập mật khẩu"
                        />
                    </div>
                    {/* THÊM TRƯỜNG CHỌN VAI TRÒ */}
                    <div className="form-group">
                        <label htmlFor="role">Vai trò</label>
                        <select id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
                            <option value="customer">Khách hàng</option>
                            <option value="seller">Người bán</option>
                        </select>
                    </div>
                    <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                        <input
                            type="checkbox"
                            id="rememberMe"
                            className="rememberme-checkbox"
                            checked={rememberMe}
                            onChange={e => setRememberMe(e.target.checked)}
                            style={{ width: 18, height: 18, marginRight: 8 }}
                        />
                        <label htmlFor="rememberMe" style={{ margin: 0, cursor: 'pointer', userSelect: 'none' }}>Ghi nhớ đăng nhập</label>
                    </div>
                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? "Đang xử lý..." : (t('login_label') || "Đăng nhập")}
                    </button>
                </form>
                 <div className="auth-switch-link">
                    <p>
                        {t('dont_have_account_prompt') || "Chưa có tài khoản?"} <Link to="/register">{t('register_label') || "Đăng ký ngay"}</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;