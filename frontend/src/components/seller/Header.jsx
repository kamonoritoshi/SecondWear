import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Header.css'; // Tùy chọn nếu bạn có style riêng

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSwitchToCustomer = () => {
    navigate('/');
  };

  return (
    <header className="seller-header">
      <div className="seller-header-left">
        <h2>SecondWear Seller Center</h2>
      </div>
      <div className="seller-header-right">
        <span className="seller-name">👤 {currentUser?.name}</span>
        <button onClick={handleSwitchToCustomer} className="switch-btn">
          Về giao diện người mua
        </button>
        <button onClick={handleLogout} className="logout-btn">
          Đăng xuất
        </button>
      </div>
    </header>
  );
};

export default Header;
