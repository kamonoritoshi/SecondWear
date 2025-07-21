// src/TermsOfUse.jsx
import React, { useState } from "react";

const TermsOfUse = () => {
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);

  const toggleOptions = () => {
    setShowLanguageOptions(!showLanguageOptions);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Điều khoản sử dụng</h1>
      <p className="page-intro">
        Khi sử dụng nền tảng SecondWear, bạn đồng ý với các điều khoản dưới đây để đảm bảo trải nghiệm an toàn, minh bạch và công bằng cho tất cả người dùng.
      </p>

      <h2>1. Quyền và trách nhiệm của người dùng</h2>
      <ul>
        <li>Người dùng có quyền truy cập và sử dụng dịch vụ theo đúng quy định của pháp luật và nội quy của SecondWear.</li>
        <li>Người dùng cam kết cung cấp thông tin chính xác, không giả mạo danh tính hay sử dụng tài khoản của người khác.</li>
        <li>Không đăng tải nội dung vi phạm thuần phong mỹ tục, pháp luật hoặc ảnh hưởng tiêu cực đến cộng đồng.</li>
        <li>Không thực hiện các hành vi gian lận, lừa đảo hoặc gây hại đến hệ thống, dữ liệu hoặc trải nghiệm của người dùng khác.</li>
      </ul>

      <h2>2. Quy định về tài khoản và bảo mật</h2>
      <ul>
        <li>Mỗi người chỉ được phép đăng ký và sử dụng một tài khoản chính thức trên SecondWear.</li>
        <li>Người dùng chịu trách nhiệm bảo mật thông tin đăng nhập và mọi hoạt động diễn ra từ tài khoản của mình.</li>
        <li>Trong trường hợp phát hiện truy cập trái phép, cần thông báo ngay cho đội ngũ hỗ trợ SecondWear.</li>
      </ul>

      <h2>3. Điều khoản về giao dịch và thanh toán</h2>
      <ul>
        <li>Mọi giao dịch mua bán đều được thực hiện thông qua nền tảng và phương thức thanh toán được hỗ trợ chính thức.</li>
        <li>Người mua có trách nhiệm kiểm tra kỹ thông tin sản phẩm trước khi thanh toán.</li>
        <li>SecondWear không chịu trách nhiệm cho các giao dịch bên ngoài hệ thống hoặc không được xác nhận.</li>
      </ul>

      <h2>4. Quyền sở hữu trí tuệ</h2>
      <ul>
        <li>Tất cả nội dung hiển thị trên nền tảng (bao gồm văn bản, hình ảnh, mã nguồn, logo...) thuộc quyền sở hữu của SecondWear hoặc bên thứ ba có cấp phép.</li>
        <li>Nghiêm cấm sao chép, phân phối hoặc sử dụng nội dung vì mục đích thương mại nếu không có sự cho phép bằng văn bản.</li>
      </ul>

      <h2>5. Tạm ngưng hoặc chấm dứt quyền truy cập</h2>
      <ul>
        <li>SecondWear có quyền tạm thời hoặc vĩnh viễn chấm dứt quyền truy cập của người dùng vi phạm điều khoản hoặc có hành vi đáng ngờ.</li>
        <li>Trong trường hợp nghiêm trọng, chúng tôi có thể thông báo đến cơ quan chức năng theo quy định pháp luật.</li>
      </ul>

      <h2>6. Thay đổi và cập nhật điều khoản</h2>
      <p>
        SecondWear có thể điều chỉnh nội dung điều khoản để phù hợp với sự thay đổi về pháp lý hoặc chính sách hoạt động. Mọi cập nhật sẽ được đăng tải tại website và có hiệu lực ngay khi được công bố.
      </p>

      <h2>7. Liên hệ</h2>
      <ul>
        <li>Email: <strong>support@secondwear.vn</strong></li>
        <li>Điện thoại: <strong>0778 157 629</strong></li>
        <li>Địa chỉ: Q.12, TP.HCM</li>
      </ul>

      <div className="download-wrapper">
        <button className="download-button" onClick={toggleOptions}>
          📄 Tải Điều khoản sử dụng (PDF)
        </button>

        {showLanguageOptions && (
          <div className="language-options">
            <a href="/SecondWear_TermsOfUse_vi.pdf" download>
              🇻🇳 Điều khoản sử dụng (Tiếng Việt)
            </a>
            <a href="/SecondWear_TermsOfUse_en.pdf" download>
              🇬🇧 Terms of Use (English)
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default TermsOfUse;
