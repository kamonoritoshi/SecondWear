import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="site-footer">
    <div className="footer-container">
      <div className="footer-column">
        <h4>Liên hệ</h4>
        <p>(84+) 778157629</p>
        <p>trung142p@gmail.com</p>
      </div>
      <div className="footer-column">
        <h4>Thông tin</h4>
        <ul>
          <li>
            <Link to="/privacy">Chính sách bảo mật</Link>
          </li>
          <li>
            <Link to="/faq">FAQs</Link>
          </li>
          <li>
            <Link to="/terms">Điều khoản</Link>
          </li>
          <li>
            <Link to="/for-sellers">Kênh người bán</Link>
          </li>
        </ul>
      </div>
      <div className="footer-column">
        <h4>Dịch vụ khách hàng</h4>
        <ul>
          <li>
            <Link to="/support">Trung Tâm Trợ Giúp</Link>
          </li>
          <li>
            <Link to="/how-to-buy">Hướng Dẫn Mua Hàng/Đặt Hàng</Link>
          </li>
          <li>
            <Link to="/returns">Trả Hàng/Hoàn Tiền</Link>
          </li>
          <li>
            <Link to="/contact">Liên Hệ</Link>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
