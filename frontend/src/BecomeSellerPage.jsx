import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
// ❌ Bỏ import useAuth vì không cần dùng nữa
// import { useAuth } from './contexts/AuthContext';
import './css/BecomeSellerPage.css';

const BecomeSellerPage = ({ t }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [agreed, setAgreed] = useState(false);
    const navigate = useNavigate();
    // ❌ Bỏ const { login } = useAuth();

    const token = localStorage.getItem("jwtToken");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        axios.get("/api/accounts/me", config)
            .then(res => {
                setUser(res.data.user);
            })
            .catch(() => setError("Không thể tải thông tin của bạn."));
    }, []);

    const handleSubmit = () => {
        if (!agreed) {
            alert("Bạn phải đồng ý với điều khoản dịch vụ.");
            return;
        }
        setLoading(true);
        setError('');
        axios.post("/api/accounts/request-seller", {}, config)
            .then((res) => {
                // ✅ LOGIC MỚI: Đơn giản hóa
                // Hiển thị thông báo thành công từ backend
                alert(res.data); 
                
                // Điều hướng về trang profile, không cần cập nhật token
                navigate('/profile');
            })
            .catch(err => {
                setError(err.response?.data?.message || err.response?.data || "Có lỗi xảy ra, vui lòng thử lại.");
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="become-seller-container">
            <div className="seller-banner">
                <h1>Trở thành Người bán trên SecondWear</h1>
                <p>Tiếp cận hàng ngàn khách hàng và phát triển kinh doanh của bạn.</p>
            </div>

            <div className="seller-info-section">
                 <h2>Quy trình đăng ký đơn giản</h2>
                <div className="steps">
                    {/* ... JSX không đổi ... */}
                </div>
            </div>

            <div className="registration-form">
                <h2>Thông tin đăng ký</h2>
                {user ? (
                    <div className="user-info">
                        <p><strong>Họ và tên:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Số điện thoại:</strong> {user.phone}</p>
                    </div>
                ) : <p>Đang tải thông tin...</p>}
                
                <div className="terms">
                    <input type="checkbox" id="agree" checked={agreed} onChange={() => setAgreed(!agreed)} />
                    <label htmlFor="agree">
                        Tôi đã đọc và đồng ý với <Link to="/terms-of-use" target="_blank">Điều khoản dịch vụ dành cho Người bán</Link> của SecondWear.
                    </label>
                </div>

                {error && <p className="error-message">{error}</p>}

                <button onClick={handleSubmit} disabled={loading || !agreed || !user}>
                    {loading ? 'Đang gửi...' : 'Gửi yêu cầu'}
                </button>
            </div>
        </div>
    );
};

export default BecomeSellerPage;