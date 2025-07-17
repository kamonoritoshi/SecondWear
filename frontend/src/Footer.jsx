import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="main-footer"
      style={{
        backgroundColor: "var(--footer-bg)",
        color: "var(--footer-text)",
        padding: "60px 20px 20px",
        marginTop: "60px",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="footer-container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", maxWidth: "1200px", margin: "0 auto" }}>

        {/* Cột 1: Giới thiệu */}
        <div className="footer-column" style={{ flex: "1 1 220px", marginBottom: "30px" }}>
          <h4 style={{ marginBottom: "12px" }}>Về SecondWear</h4>
          <p style={{ lineHeight: "1.6", fontSize: "0.95rem" }}>
            SecondWear là nền tảng thương mại điện tử chuyên bán quần áo second-hand chất lượng, góp phần thúc đẩy thời trang bền vững.
          </p>
        </div>

        {/* Cột 2: Chính sách */}
        <div className="footer-column" style={{ flex: "1 1 180px", marginBottom: "30px" }}>
          <h4 style={{ marginBottom: "12px" }}>Chính sách</h4>
          <ul style={{ listStyle: "none", padding: 0, lineHeight: "2" }}>
            <li><Link to="/privacy-policy" className="footer-link">Chính sách bảo mật</Link></li>
            <li><Link to="/terms-of-use" className="footer-link">Điều khoản sử dụng</Link></li>
            <li><Link to="/return-policy" className="footer-link">Chính sách đổi trả</Link></li>
            <li><Link to="/shipping-policy" className="footer-link">Chính sách vận chuyển</Link></li>
            <li><Link to="/payment-security" className="footer-link">Bảo mật thanh toán</Link></li>
          </ul>
        </div>

        {/* Cột 3: Hỗ trợ */}
        <div className="footer-column" style={{ flex: "1 1 180px", marginBottom: "30px" }}>
          <h4 style={{ marginBottom: "12px" }}>Hỗ trợ khách hàng</h4>
          <ul style={{ listStyle: "none", padding: 0, lineHeight: "2" }}>
            <li><Link to="/faq" className="footer-link">Câu hỏi thường gặp</Link></li>
            <li><Link to="/user-guide" className="footer-link">Hướng dẫn sử dụng</Link></li>
            <li><Link to="/contact" className="footer-link">Liên hệ</Link></li>
          </ul>
        </div>

        {/* Cột 4: Pháp lý */}
        <div className="footer-column" style={{ flex: "1 1 180px", marginBottom: "30px" }}>
          <h4 style={{ marginBottom: "12px" }}>Thông tin pháp lý</h4>
          <ul style={{ listStyle: "none", padding: 0, lineHeight: "2" }}>
            <li><Link to="/legal" className="footer-link">Công bố doanh nghiệp</Link></li>
            <li><Link to="/careers" className="footer-link">Tuyển dụng</Link></li>
            <li><Link to="/blog" className="footer-link">Blog thời trang</Link></li>
          </ul>
        </div>

        {/* Cột 5: Liên hệ */}
        <div className="footer-column" style={{ flex: "1 1 220px", marginBottom: "30px" }}>
          <h4 style={{ marginBottom: "12px" }}>Liên hệ</h4>
          <p style={{ fontSize: "0.95rem", lineHeight: "1.8" }}>
            Email: <a href="mailto:trung142p@gmail.com" className="footer-link">trung142p@gmail.com</a><br />
            Hotline: 0778 157 629<br />
            Địa chỉ: Q.12, TP.HCM
          </p>
        </div>
      </div>

      {/* Footer bottom */}
      <div style={{ textAlign: "center", borderTop: "1px solid rgba(255, 255, 255, 0.15)", marginTop: "40px", paddingTop: "20px", fontSize: "0.9rem" }}>
        &copy; {currentYear} SecondWear. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
