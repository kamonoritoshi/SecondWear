// src/PrivacyPolicy.jsx
import React, { useState } from "react";

const PrivacyPolicy = () => {
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);

  const toggleOptions = () => {
    setShowLanguageOptions(!showLanguageOptions);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Chính sách bảo mật</h1>
      <p className="page-intro">
        Tại SecondWear, sự riêng tư và bảo mật thông tin cá nhân của khách hàng luôn là ưu tiên hàng đầu. Chính sách này trình bày cách chúng tôi thu thập, sử dụng, xử lý và bảo vệ dữ liệu mà bạn cung cấp trong quá trình tương tác với hệ thống.
      </p>

      <h2>1. Thông tin chúng tôi thu thập</h2>
      <p>Khi bạn sử dụng website hoặc dịch vụ của chúng tôi, bạn có thể cung cấp những loại thông tin sau:</p>
      <ul>
        <li><strong>Thông tin cá nhân:</strong> Bao gồm họ tên, địa chỉ email, số điện thoại, địa chỉ cư trú, thông tin thanh toán như số tài khoản, thông tin thẻ (nếu có).</li>
        <li><strong>Thông tin giao dịch:</strong> Đơn hàng đã đặt, lịch sử mua sắm, thông tin sản phẩm đã xem hoặc thêm vào giỏ hàng.</li>
        <li><strong>Thông tin hành vi:</strong> Bao gồm dữ liệu sử dụng, tần suất truy cập, thời gian lưu lại trên từng trang, hành vi lướt web và tương tác với các phần tử UI.</li>
        <li><strong>Thông tin thiết bị và kết nối:</strong> Loại thiết bị, hệ điều hành, trình duyệt, địa chỉ IP, múi giờ, khu vực địa lý tương đối.</li>
      </ul>

      <h2>2. Mục đích sử dụng thông tin</h2>
      <p>Chúng tôi sử dụng thông tin thu thập được để đảm bảo rằng bạn nhận được trải nghiệm tốt nhất, bao gồm nhưng không giới hạn ở:</p>
      <ul>
        <li>Thực hiện các giao dịch mua bán và xử lý đơn hàng một cách chính xác, an toàn và hiệu quả.</li>
        <li>Cá nhân hóa nội dung trang, đề xuất sản phẩm phù hợp với hành vi và sở thích cá nhân.</li>
        <li>Gửi thông báo về chương trình khuyến mãi, ưu đãi thành viên hoặc các thông tin cập nhật quan trọng.</li>
        <li>Hỗ trợ kỹ thuật, chăm sóc khách hàng và giải quyết khiếu nại một cách nhanh chóng.</li>
        <li>Ngăn chặn hành vi gian lận, giả mạo, vi phạm điều khoản hoặc hành vi bất thường trên hệ thống.</li>
        <li>Thực hiện nghiên cứu thị trường, phân tích hành vi người dùng nhằm cải thiện dịch vụ.</li>
        <li>Tuân thủ quy định pháp luật hiện hành liên quan đến thương mại điện tử và bảo vệ người tiêu dùng.</li>
      </ul>

      <h2>3. Bảo mật và lưu trữ dữ liệu</h2>
      <p>Chúng tôi áp dụng các biện pháp kỹ thuật và tổ chức phù hợp để đảm bảo an toàn thông tin, bao gồm:</p>
      <ul>
        <li>Áp dụng mã hóa SSL (Secure Socket Layer) trong quá trình truyền tải dữ liệu.</li>
        <li>Hạn chế truy cập thông tin cá nhân chỉ cho những nhân sự có thẩm quyền.</li>
        <li>Lưu trữ dữ liệu trên hệ thống máy chủ an toàn, có sao lưu định kỳ.</li>
        <li>Định kỳ kiểm tra, đánh giá lỗ hổng bảo mật và cập nhật vá lỗi kịp thời.</li>
      </ul>
      <p>
        Chúng tôi không chia sẻ hoặc bán thông tin của bạn cho bên thứ ba vì mục đích thương mại mà không có sự cho phép rõ ràng từ bạn, trừ khi được yêu cầu bởi cơ quan pháp luật.
      </p>

      <h2>4. Quyền của người dùng</h2>
      <ul>
        <li>Truy cập, chỉnh sửa, hoặc xóa thông tin cá nhân.</li>
        <li>Yêu cầu dừng sử dụng dữ liệu cho mục đích tiếp thị.</li>
        <li>Rút lại sự đồng ý đã cấp.</li>
        <li>Gửi yêu cầu qua email: <strong>privacy@secondwear.vn</strong></li>
      </ul>

      <h2>5. Chính sách Cookie và theo dõi hành vi</h2>
      <p>
        Chúng tôi sử dụng cookie nhằm:
      </p>
      <ul>
        <li>Ghi nhớ thông tin đăng nhập và giỏ hàng.</li>
        <li>Phân tích hành vi người dùng để nâng cao trải nghiệm.</li>
        <li>Gợi ý nội dung và quảng cáo phù hợp.</li>
      </ul>

      <h2>6. Cập nhật chính sách</h2>
      <p>
        Chính sách bảo mật có thể được điều chỉnh để phù hợp với thay đổi về luật hoặc công nghệ. Bất kỳ cập nhật nào cũng sẽ được công bố rõ ràng.
      </p>

      <h2>7. Thời gian lưu trữ thông tin</h2>
      <p>
        Dữ liệu cá nhân sẽ được lưu giữ chỉ trong khoảng thời gian cần thiết cho các mục đích đã nêu hoặc theo yêu cầu của pháp luật.
      </p>

      <h2>8. Liên hệ và khiếu nại</h2>
      <ul>
        <li>Email: <strong>trung142p@gmail.com</strong></li>
        <li>Điện thoại: <strong>0778 157 629</strong></li>
        <li>Địa chỉ: Q.12, TP.HCM</li>
      </ul>

      <div className="download-wrapper">
        <button className="download-button" onClick={toggleOptions}>
          📄 Tải Chính sách bảo mật (PDF)
        </button>

        {showLanguageOptions && (
          <div className="language-options">
            <a href="/SecondWear_Policy_vi.pdf" download>
              🇻🇳 Chính sách bảo mật (Tiếng Việt)
            </a>
            <a href="/SecondWear_Policy_en.pdf" download>
              🇬🇧 Privacy Policy (English)
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
