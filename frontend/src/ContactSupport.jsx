// src/ContactSupport.jsx
import React, { useState } from "react";

const ContactSupport = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: xử lý gửi form (hoặc tích hợp backend nếu có)
        setSubmitted(true);
    };

    return (
        <div className="page-container">
            <h1 className="page-title">Liên hệ hỗ trợ</h1>

            <p className="page-intro">
                Nếu bạn có bất kỳ câu hỏi, thắc mắc hoặc cần được tư vấn – đừng ngần ngại liên hệ với đội ngũ SecondWear. Chúng tôi luôn sẵn sàng hỗ trợ bạn!
            </p>

            <div className="contact-grid">
                <div className="contact-info">
                    <h2 className="section-heading">Thông tin liên hệ</h2>
                    <ul className="contact-list">
                        <li><strong>Email:</strong> support@secondwear.vn</li>
                        <li><strong>Số điện thoại:</strong> +84 123 456 789</li>
                        <li><strong>Văn phòng:</strong> 123 Đường SecondWear, Phường Code Dạo, TP.HCM</li>
                    </ul>
                </div>

                <div className="contact-form">
                    <h2 className="section-heading">Gửi yêu cầu hỗ trợ</h2>
                    {submitted ? (
                        <div className="text-green-600 font-semibold mt-4">
                            ✅ Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="form-label">Tên của bạn</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Nguyễn Văn A"
                                    required
                                />
                            </div>
                            <div>
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-input"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="form-label">Nội dung</label>
                                <textarea
                                    rows="4"
                                    className="form-input"
                                    placeholder="Tôi muốn hỏi về..."
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="form-submit"
                            >
                                Gửi yêu cầu
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactSupport;
