import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from './apiConfig';
import hideIcon from "./icons/password-hide.png";
import viewIcon from "./icons/password-view.png";

const RegisterPage = ({ t }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: 'TP. Hồ Chí Minh',
        password: '',
        confirmPassword: '',
        role: 'customer'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (formData.password !== formData.confirmPassword) {
            setError("Mật khẩu và xác nhận mật khẩu không khớp.");
            setLoading(false);
            return;
        }

        try {
            const payload = {
                email: formData.email,
                fullName: formData.fullName,
                phone: formData.phone,
                city: formData.city,
                address: formData.address,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
                roleName: formData.role
            };

            const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const responseText = await response.text();

            if (!response.ok) {
                throw new Error(responseText || 'Đăng ký thất bại.');
            }

            alert("Mã xác thực đã được gửi đến email của bạn!");
            navigate('/verify', { state: { email: formData.email } });

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page" style={{ background: 'var(--main-bg)' }}>
            <div className="auth-form-container" style={{ background: 'var(--section-bg)' }}>
                <h2 style={{ color: 'var(--main-text)' }}>{t('register_label') || "Đăng Ký"}</h2>
                <form onSubmit={handleSubmit}>
                    {error && <p className="error-message">{error}</p>}
                    
                    <div className="form-group">
                        <label htmlFor="fullName" style={{ color: 'var(--main-text)' }}>{t('fullname_placeholder') || "Họ và tên"}</label>
                        <input id="fullName" name="fullName" type="text" placeholder={t('fullname_placeholder') || "Họ và tên"} onChange={handleChange} required />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email" style={{ color: 'var(--main-text)' }}>{t('email_placeholder') || "Email"}</label>
                        <input id="email" name="email" type="email" placeholder={t('email_placeholder') || "Nhập email"} onChange={handleChange} required />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="phone" style={{ color: 'var(--main-text)' }}>{t('phone_placeholder') || "Số điện thoại"}</label>
                        <input id="phone" name="phone" type="tel" placeholder={t('phone_placeholder') || "Nhập số điện thoại"} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="address" style={{ color: 'var(--main-text)' }}>{t('address_placeholder') || "Địa chỉ"}</label>
                        <input id="address" name="address" type="text" placeholder={t('address_placeholder') || "Nhập địa chỉ cụ thể"} onChange={handleChange} required />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="role" style={{ color: 'var(--main-text)' }}>{t('role_label') || "Bạn muốn đăng ký với vai trò?"}</label>
                        <select id="role" name="role" value={formData.role} onChange={handleChange} required>
                            <option value="customer">{t('role_customer') || "Người mua"}</option>
                        </select>
                    </div>

                    <div className="form-group password-group">
                        <label htmlFor="password" style={{ color: 'var(--main-text)' }}>{t('password_label') || "Mật khẩu"}</label>
                        <div className="password-wrapper">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder={t('password_placeholder') || "Ít nhất 6 ký tự"}
                                onChange={handleChange}
                                required
                            />
                            <span
                                className="toggle-password-icon"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <img
                                    src={showPassword ? hideIcon : viewIcon}
                                    alt="toggle"
                                />
                            </span>
                        </div>
                    </div>

                    {/* Xác nhận mật khẩu */}
                    <div className="form-group password-group">
                        <label htmlFor="confirmPassword" style={{ color: 'var(--main-text)' }}>{t('confirm_password_placeholder') || "Xác nhận mật khẩu"}</label>
                        <div className="password-wrapper">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder={t('confirm_password_placeholder') || "Nhập lại mật khẩu"}
                                onChange={handleChange}
                                required
                            />
                            <span
                                className="toggle-password-icon"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                <img
                                    src={showConfirmPassword ? hideIcon : viewIcon}
                                    alt="toggle"
                                />
                            </span>
                        </div>
                    </div>

                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? 'Đang xử lý...' : (t('register_label') || "Đăng Ký")}
                    </button>
                </form>
                <div className="auth-switch-link">
                    <p>
                        {t('already_have_account_prompt') || "Đã có tài khoản?"} <Link to="/login">{t('login_link') || "Đăng nhập"}</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default function WrappedRegisterPage(props) {
    return <RegisterPage {...props} />;
}