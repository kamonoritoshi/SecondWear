import React, { useState } from "react";

const UserGuide = () => {
    const [showLanguageOptions, setShowLanguageOptions] = useState(false);

    const toggleOptions = () => {
        setShowLanguageOptions(!showLanguageOptions);
    };

    return (
        <div className="page-container">
            <h1 className="page-title">Hướng dẫn sử dụng</h1>
            <p className="page-intro">
                Chào mừng bạn đến với SecondWear – nền tảng mua sắm quần áo second-hand thân thiện với môi trường. Dưới đây là hướng dẫn giúp bạn dễ dàng sử dụng trang web và tận hưởng trải nghiệm mua sắm tiện lợi, nhanh chóng.
            </p>

            <h2>1. Đăng ký và đăng nhập</h2>
            <ul>
                <li>Nhấn vào biểu tượng tài khoản ở góc trên bên phải.</li>
                <li>Chọn "Đăng ký" để tạo tài khoản mới hoặc "Đăng nhập" nếu bạn đã có tài khoản.</li>
                <li>Sau khi đăng nhập, bạn có thể mua hàng, theo dõi đơn, và quản lý thông tin cá nhân.</li>
            </ul>

            <h2>2. Tìm kiếm và khám phá sản phẩm</h2>
            <ul>
                <li>Sử dụng thanh tìm kiếm để gõ từ khóa sản phẩm bạn cần.</li>
                <li>Hoặc duyệt qua các danh mục: áo, quần, váy, phụ kiện,...</li>
                <li>Trang chủ cũng gợi ý các sản phẩm nổi bật, được yêu thích hoặc mới nhất.</li>
            </ul>

            <h2>3. Xem chi tiết sản phẩm</h2>
            <ul>
                <li>Click vào sản phẩm để xem ảnh, mô tả chi tiết, tình trạng, giá và người bán.</li>
                <li>Thông tin đánh giá, nhận xét từ khách trước cũng được hiển thị nếu có.</li>
            </ul>

            <h2>4. Thêm vào giỏ và thanh toán</h2>
            <ul>
                <li>Chọn kích cỡ (nếu có), số lượng và nhấn "Thêm vào giỏ hàng".</li>
                <li>Vào giỏ hàng để kiểm tra lại sản phẩm, sau đó chọn "Thanh toán".</li>
                <li>Điền thông tin giao hàng, chọn hình thức thanh toán.</li>
            </ul>

            <h2>5. Theo dõi đơn hàng</h2>
            <ul>
                <li>Vào mục "Đơn hàng của tôi" để theo dõi tình trạng đơn.</li>
                <li>Chúng tôi cung cấp mã vận đơn và cập nhật trạng thái thường xuyên.</li>
            </ul>

            <h2>6. Chính sách đổi trả</h2>
            <ul>
                <li>SecondWear hỗ trợ đổi/trả hàng trong vòng 3 ngày nếu sản phẩm lỗi, không đúng mô tả.</li>
                <li>Vui lòng giữ nguyên trạng sản phẩm, không giặt, không hư hỏng thêm.</li>
                <li>Xem thêm tại mục "Chính sách đổi trả".</li>
            </ul>

            <h2>7. Hướng dẫn bán hàng</h2>
            <ul>
                <li>Đăng ký tài khoản người bán tại trang "Trở thành người bán".</li>
                <li>Đăng sản phẩm, thêm hình ảnh rõ ràng, mô tả chi tiết.</li>
                <li>Theo dõi đơn hàng, doanh thu, phản hồi từ người mua.</li>
            </ul>

            <h2>8. Tuỳ chỉnh trải nghiệm</h2>
            <ul>
                <li>Chọn chế độ sáng/tối bằng biểu tượng mặt trời/trăng trên header.</li>
                <li>Chuyển đổi ngôn ngữ bằng biểu tượng địa cầu 🌐 (Tiếng Việt hoặc English).</li>
            </ul>

            <h2>9. Hỗ trợ và liên hệ</h2>
            <ul>
                <li>Email: <strong>trung142p@gmail.com</strong></li>
                <li>Hotline: <strong>0778 157 629</strong></li>
                <li>Fanpage: <a href="https://facebook.com/secondwear" target="_blank" rel="noreferrer">facebook.com/secondwear</a></li>
            </ul>

            <div className="download-wrapper">
                <button className="download-button" onClick={toggleOptions}>
                    📄 Tải Hướng dẫn sử dụng (PDF)
                </button>

                {showLanguageOptions && (
                    <div className="language-options">
                        <a href="/SecondWear_UserGuide_vi.pdf" download>
                            🇻🇳 Hướng dẫn sử dụng (Tiếng Việt)
                        </a>
                        <a href="/SecondWear_UserGuide_en.pdf" download>
                            🇬🇧 User Guide (English)
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserGuide;