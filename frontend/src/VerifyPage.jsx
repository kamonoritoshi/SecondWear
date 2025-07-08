import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_BASE_URL } from './apiConfig';

const VerifyPage = ({ t }) => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Tự động điền email nếu được chuyển từ trang đăng ký
        if (location.state?.email) {
            setEmail(location.state.email);
        }
    }, [location.state]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code }),
            });

            const responseText = await response.text();
            if (!response.ok) {
                throw new Error(responseText || 'Xác thực thất bại.');
            }

            setMessage(t('verification_success_message'));
            // Đợi 2 giây rồi chuyển hướng
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        // SỬ DỤNG LẠI CÁC CLASS CSS CỦA TRANG AUTH
        <div className="auth-page"> 
            <div className="auth-form-container">
                <h2>{t('verify_account_title')}</h2>
                <form onSubmit={handleSubmit}>
                    {error && <p className="error-message">{error}</p>}
                    {message && <p className="success-message">{message}</p>}
                    
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder={t('email_placeholder')}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="code">Mã xác thực</label>
                        <input
                            id="code"
                            type="text"
                            placeholder={t('verification_code_placeholder')}
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                        />
                    </div>
                    
                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? "Đang xử lý..." : t('verify_button')}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VerifyPage;