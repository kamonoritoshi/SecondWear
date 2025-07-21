// src/PaymentSecurity.jsx
import React, { useState } from "react";

const PaymentSecurity = () => {
    const [showLanguageOptions, setShowLanguageOptions] = useState(false);

    const toggleOptions = () => {
        setShowLanguageOptions(!showLanguageOptions);
    };

    return (
        <div className="page-container">
            <h1 className="page-title">Bảo mật thanh toán</h1>
            <p className="page-intro">
                SecondWear cam kết đảm bảo mọi giao dịch thanh toán của khách hàng diễn ra an toàn tuyệt đối, bảo vệ tối đa thông tin cá nhân và tài chính.
            </p>

            <h2>1. Phương thức thanh toán được hỗ trợ</h2>
            <ul>
                <li>Thanh toán khi nhận hàng (COD)</li>
                <li>Chuyển khoản ngân hàng</li>
                <li>Ví điện tử (Momo, ZaloPay, VNPay...)</li>
                <li>Thẻ tín dụng/ghi nợ nội địa và quốc tế</li>
            </ul>

            <h2>2. Mã hóa và bảo vệ dữ liệu</h2>
            <ul>
                <li>Tất cả thông tin thanh toán được mã hóa qua giao thức SSL (Secure Socket Layer) 256-bit.</li>
                <li>Chúng tôi không lưu trữ thông tin thẻ của khách hàng trên hệ thống.</li>
                <li>Giao dịch được xử lý thông qua các cổng thanh toán được cấp phép và chứng nhận bảo mật quốc tế.</li>
            </ul>

            <h2>3. Phát hiện và phòng chống gian lận</h2>
            <ul>
                <li>Hệ thống tự động phát hiện giao dịch bất thường và có thể từ chối đơn hàng nếu có dấu hiệu gian lận.</li>
                <li>Đội ngũ hỗ trợ sẽ liên hệ xác minh nếu có nghi vấn từ phía người mua hoặc người bán.</li>
            </ul>

            <h2>4. Cam kết bảo mật của đối tác thanh toán</h2>
            <p>
                Các đối tác thanh toán của chúng tôi như VNPay, ZaloPay, Momo đều đáp ứng tiêu chuẩn bảo mật cao cấp PCI DSS (Payment Card Industry Data Security Standard).
            </p>

            <h2>5. Quyền và trách nhiệm của khách hàng</h2>
            <ul>
                <li>Khách hàng có trách nhiệm giữ bảo mật thông tin tài khoản cá nhân và mã OTP.</li>
                <li>Không chia sẻ thông tin thẻ cho bất kỳ ai, kể cả nhân viên SecondWear.</li>
                <li>Liên hệ ngay với chúng tôi nếu phát hiện giao dịch đáng ngờ.</li>
            </ul>

            <h2>6. Liên hệ hỗ trợ</h2>
            <p>
                Mọi thắc mắc liên quan đến vấn đề bảo mật thanh toán, vui lòng liên hệ:
            </p>
            <ul>
                <li>Email: <strong>hotro@secondwear.vn</strong></li>
                <li>Hotline: <strong>0778 157 629</strong></li>
            </ul>

            <div className="download-wrapper">
                <button className="download-button" onClick={toggleOptions}>
                    📄 Tải Bảo mật thanh toán (PDF)
                </button>

                {showLanguageOptions && (
                    <div className="language-options">
                        <a href="/SecondWear_PaymentSecurity_vi.pdf" download>
                            🇻🇳 Bảo mật thanh toán (Tiếng Việt)
                        </a>
                        <a href="/SecondWear_PaymentSecurity_en.pdf" download>
                            🇬🇧 Payment Security (English)
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentSecurity;
