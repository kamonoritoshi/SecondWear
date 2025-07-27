import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SideMenu.css'; // Đảm bảo đã có file này để style menu

const SideMenu = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="seller-side-menu">
      <ul className="menu-list">
        <li className={isActive('/seller/dashboard') ? 'active' : ''}>
          <Link to="/seller/dashboard">Tổng quan</Link>
        </li>
        <li className={isActive('/seller/products') ? 'active' : ''}>
          <Link to="/seller/products">Sản phẩm</Link>
        </li>
        <li className={isActive('/seller/orders') ? 'active' : ''}>
          <Link to="/seller/orders">Đơn hàng</Link>
        </li>
        <li className={isActive('/seller/statistics') ? 'active' : ''}>
          <Link to="/seller/statistics">Thống kê</Link>
        </li>
        <li className={isActive('/seller/messages') ? 'active' : ''}>
          <Link to="/seller/messages">Tin nhắn</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
