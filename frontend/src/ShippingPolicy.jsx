// src/ShippingPolicy.jsx
import React, { useState } from "react";

const ShippingPolicy = () => {
    const [showLanguageOptions, setShowLanguageOptions] = useState(false);

    const toggleOptions = () => {
        setShowLanguageOptions(!showLanguageOptions);
    };

    return (
        <div className="page-container">
            <h1 className="page-title">Chính sách vận chuyển</h1>
            <p className="page-intro">
                Tại SecondWear, chúng tôi cam kết mang đến trải nghiệm mua sắm thuận tiện và minh bạch. Chính sách vận chuyển dưới đây được thiết lập nhằm đảm bảo khách hàng nhận được sản phẩm đúng hẹn, an toàn và phù hợp với kỳ vọng.
            </p>

            <h2>1. Phạm vi giao hàng</h2>
            <p>
                Chúng tôi hỗ trợ giao hàng đến tất cả các tỉnh thành trong lãnh thổ Việt Nam. Đối với các địa chỉ tại vùng sâu, vùng xa hoặc hải đảo, thời gian giao hàng có thể kéo dài thêm từ 1–3 ngày so với thời gian tiêu chuẩn.
            </p>

            <h2>2. Thời gian xử lý đơn hàng</h2>
            <ul>
                <li>Đơn hàng được xử lý trong vòng 24–48 giờ làm việc sau khi xác nhận thanh toán thành công.</li>
                <li>Đơn hàng được đặt sau 17h, vào cuối tuần hoặc ngày lễ sẽ được chuyển sang xử lý vào ngày làm việc tiếp theo.</li>
                <li>Khách hàng sẽ nhận được email xác nhận và thông báo trạng thái đơn hàng sau mỗi bước xử lý.</li>
            </ul>

            <h2>3. Thời gian giao hàng dự kiến</h2>
            <p>Thời gian giao hàng có thể thay đổi tùy khu vực:</p>
            <ul>
                <li><strong>TP.HCM và Hà Nội (nội thành):</strong> 1–2 ngày làm việc.</li>
                <li><strong>Các tỉnh thành khác:</strong> 2–5 ngày làm việc.</li>
                <li><strong>Vùng sâu, vùng xa hoặc hải đảo:</strong> 4–7 ngày làm việc.</li>
            </ul>

            <h2>4. Phí vận chuyển</h2>
            <ul>
                <li>Phí vận chuyển được tính theo trọng lượng và kích thước gói hàng cũng như vị trí địa lý của người nhận.</li>
                <li>Hệ thống sẽ tự động hiển thị mức phí cụ thể trong quá trình thanh toán.</li>
                <li><strong>Miễn phí vận chuyển</strong> cho đơn hàng từ <strong>500.000 VNĐ</strong> trở lên.</li>
            </ul>

            <h2>5. Đơn vị vận chuyển</h2>
            <p>
                SecondWear hợp tác với các đơn vị giao hàng uy tín như Giao Hàng Nhanh (GHN), Viettel Post, J&T Express... để đảm bảo chất lượng dịch vụ và thời gian giao hàng.
            </p>

            <h2>6. Theo dõi đơn hàng</h2>
            <p>
                Sau khi đơn hàng được bàn giao cho đối tác vận chuyển, bạn sẽ nhận được mã vận đơn qua email hoặc SMS. Sử dụng mã này để theo dõi trạng thái tại website của đơn vị vận chuyển hoặc trong mục “Đơn hàng của tôi” trên SecondWear.
            </p>

            <h2>7. Trách nhiệm với hàng hóa</h2>
            <ul>
                <li>Chúng tôi chịu trách nhiệm cho hàng hóa trong suốt quá trình vận chuyển đến khi khách hàng nhận hàng.</li>
                <li>Trường hợp kiện hàng bị hư hỏng, rách nát hoặc thất lạc do vận chuyển, SecondWear sẽ hỗ trợ đổi trả hoặc hoàn tiền toàn bộ.</li>
                <li>Khách hàng cần thông báo tình trạng bất thường trong vòng 24 giờ sau khi nhận hàng để được hỗ trợ kịp thời.</li>
            </ul>

            <h2>8. Giao hàng không thành công</h2>
            <ul>
                <li>Nếu không thể liên hệ khách hàng sau 3 lần giao hàng, đơn hàng sẽ được hoàn về kho.</li>
                <li>Phí vận chuyển của đơn hàng không thành công do lỗi từ phía khách hàng sẽ không được hoàn lại.</li>
            </ul>

            <h2>9. Hỗ trợ thêm</h2>
            <p>
                Nếu bạn có thắc mắc hoặc cần thay đổi thông tin giao hàng sau khi đã đặt hàng, vui lòng liên hệ bộ phận chăm sóc khách hàng qua email <strong>hotro@secondwear.vn</strong> hoặc hotline <strong>0778 157 629</strong>.
            </p>

            <div className="download-wrapper">
                <button className="download-button" onClick={toggleOptions}>
                    📄 Tải Chính sách vận chuyển (PDF)
                </button>

                {showLanguageOptions && (
                    <div className="language-options">
                        <a href="/SecondWear_ShippingPolicy_vi.pdf" download>
                            🇻🇳 Chính sách vận chuyển (Tiếng Việt)
                        </a>
                        <a href="/SecondWear_ShippingPolicy_en.pdf" download>
                            🇬🇧 Shipping Policy (English)
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShippingPolicy;
