import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from './apiConfig';

const RegisterPage = ({ t }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: 'TP. Hồ Chí Minh', // Bạn có thể làm trường này thành dropdown sau
        password: '',
        confirmPassword: '',
        role: 'customer'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
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
            // Dữ liệu gửi đi phải có đủ các trường mà DTO của backend yêu cầu
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

            alert("Mã xác thực đã được gửi đến email của bạn! (Kiểm tra Console của Backend để xem mã)");
            navigate('/verify', { state: { email: formData.email } });

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-form-container">
                <h2>{t('register_label') || "Đăng Ký"}</h2>
                <form onSubmit={handleSubmit}>
                    {error && <p className="error-message">{error}</p>}
                    
                    <div className="form-group">
                        <label htmlFor="fullName">Họ và tên</label>
                        <input id="fullName" name="fullName" type="text" placeholder="Nhập họ và tên" onChange={handleChange} required />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" placeholder="Nhập email" onChange={handleChange} required />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="phone">Số điện thoại</label>
                        <input id="phone" name="phone" type="tel" placeholder="Nhập số điện thoại" onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Địa chỉ (Số nhà, tên đường)</label>
                        <input id="address" name="address" type="text" placeholder="Nhập địa chỉ cụ thể" onChange={handleChange} required />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="role">Bạn muốn đăng ký với vai trò?</label>
                        <select id="role" name="role" value={formData.role} onChange={handleChange} required>
                            <option value="customer">Người mua</option>
                            <option value="seller">Người bán</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu</label>
                        <input id="password" name="password" type="password" placeholder="Ít nhất 6 ký tự" onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                        <input id="confirmPassword" name="confirmPassword" type="password" placeholder="Nhập lại mật khẩu" onChange={handleChange} required />
                    </div>

                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? 'Đang xử lý...' : (t('register_label') || "Đăng Ký")}
                    </button>
                </form>
                <div className="auth-switch-link">
                    <p>
                        {"Đã có tài khoản?"} <Link to="/login">{"Đăng nhập"}</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;