import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SideMenu.css'; // tạo CSS nếu cần

const SideMenu = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="seller-side-menu">
      <h2 className="menu-title">Seller Menu</h2>
      <ul>
        <li className={isActive('/seller/dashboard') ? 'active' : ''}>
          <Link to="/seller/dashboard">Dashboard</Link>
        </li>
        <li className={isActive('/seller/products') ? 'active' : ''}>
          <Link to="/seller/products">Quản lý sản phẩm</Link>
        </li>
        <li className={isActive('/seller/inventory') ? 'active' : ''}>
          <Link to="/seller/inventory">Quản lý kho</Link>
        </li>
        <li className={isActive('/seller/orders') ? 'active' : ''}>
          <Link to="/seller/orders">Quản lý đơn hàng</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;