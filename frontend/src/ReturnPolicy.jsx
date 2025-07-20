import React, { useState } from "react";

const ReturnPolicy = () => {
    const [showLanguageOptions, setShowLanguageOptions] = useState(false);

    const toggleOptions = () => {
        setShowLanguageOptions(!showLanguageOptions);
    };

    return (
        <div className="page-container">
            <h1 className="page-title">Chính sách đổi trả</h1>
            <p className="page-intro">
                Chúng tôi luôn nỗ lực mang đến trải nghiệm mua sắm tốt nhất cho khách hàng. Chính sách đổi trả dưới đây được áp dụng nhằm đảm bảo quyền lợi và sự hài lòng của bạn khi mua sắm tại SecondWear.
            </p>

            <h2>1. Điều kiện đổi/trả hàng</h2>
            <ul>
                <li>Sản phẩm còn nguyên trạng, chưa qua sử dụng lại hoặc giặt tẩy.</li>
                <li>Thời gian yêu cầu đổi/trả không quá <strong>7 ngày</strong> kể từ ngày nhận hàng.</li>
                <li>Khách hàng cần cung cấp hình ảnh/video chứng minh lỗi sản phẩm (nếu có).</li>
                <li>Không áp dụng đổi trả đối với các sản phẩm nằm trong danh mục “khuyến mãi thanh lý cuối cùng”.</li>
            </ul>

            <h2>2. Các trường hợp áp dụng</h2>
            <ul>
                <li>Giao sai sản phẩm, sai kích thước, màu sắc không đúng với mô tả.</li>
                <li>Sản phẩm có lỗi như rách, dính bẩn, hư hỏng do quá trình vận chuyển hoặc do nhà cung cấp.</li>
                <li>Sản phẩm không vừa với size đặt hàng (trong điều kiện chưa qua sử dụng).</li>
            </ul>

            <h2>3. Quy trình đổi/trả</h2>
            <ol>
                <li>Liên hệ với bộ phận CSKH qua email <strong>hotro@secondwear.vn</strong> hoặc hotline <strong>0778 157 629</strong>.</li>
                <li>Gửi thông tin đơn hàng và lý do đổi/trả kèm hình ảnh/video.</li>
                <li>Sau khi được xác nhận, gửi sản phẩm về kho hàng theo hướng dẫn.</li>
                <li>Chúng tôi tiến hành kiểm tra và thực hiện đổi/trả trong vòng <strong>3–5 ngày làm việc</strong>.</li>
            </ol>

            <h2>4. Phí đổi trả</h2>
            <ul>
                <li>Miễn phí đổi/trả nếu lỗi do phía SecondWear hoặc đối tác giao hàng.</li>
                <li>Trường hợp khách hàng đổi trả vì lý do cá nhân (không vừa, không thích…) sẽ chịu phí vận chuyển hai chiều.</li>
            </ul>

            <h2>5. Hình thức hoàn tiền</h2>
            <ul>
                <li>Hoàn tiền vào ví điện tử hoặc tài khoản ngân hàng trong vòng <strong>5–7 ngày làm việc</strong>.</li>
                <li>Không hỗ trợ hoàn tiền mặt.</li>
            </ul>

            <h2>6. Lưu ý thêm</h2>
            <ul>
                <li>Vui lòng giữ lại hóa đơn và bao bì gốc để quá trình đổi trả được xử lý nhanh chóng.</li>
                <li>Chúng tôi có quyền từ chối đổi/trả nếu phát hiện dấu hiệu gian lận hoặc không đúng quy định.</li>
            </ul>

            <div className="download-wrapper">
                <button className="download-button" onClick={toggleOptions}>
                    📄 Tải Chính sách đổi trả (PDF)
                </button>

                {showLanguageOptions && (
                    <div className="language-options">
                        <a href="/SecondWear_ReturnPolicy_vi.pdf" download>
                            🇻🇳 Chính sách đổi trả (Tiếng Việt)
                        </a>
                        <a href="/SecondWear_ReturnPolicy_en.pdf" download>
                            🇬🇧 Return Policy (English)
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReturnPolicy;
