import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="main-footer"
      style={{
        backgroundColor: "var(--footer-bg)",
        color: "var(--footer-text)",
        padding: "40px 20px",
        marginTop: "40px",
      }}
    >
      <div className="footer-container">
        <div className="footer-column">
          <h4>Về SecondWear</h4>
          <p>Website bán quần áo second-hand thân thiện với môi trường.</p>
        </div>

        <div className="footer-column">
          <h4>Chính sách</h4>
          <ul>
            <li>
              <Link to="/privacy-policy" className="footer-link">
                Chính sách bảo mật
              </Link>
            </li>
            <li>
              <Link to="/terms-of-use" className="footer-link">
                Điều khoản sử dụng
              </Link>
            </li>
            <li>
              <Link to="/faq" className="footer-link">
                Câu hỏi thường gặp
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Liên hệ</h4>
          <p>Email: trung142p@gmail.com</p>
          <p>Hotline: 0778 157 629</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} SecondWear. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
