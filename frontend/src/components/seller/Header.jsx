import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  const dropdownRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle('dark-theme', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSwitchToCustomer = () => {
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="seller-header">
      <div className="seller-header-left">
        <h2>SecondWear Seller Center</h2>
      </div>

      <div className="seller-header-right" ref={dropdownRef}>
        {/* Với màn hình lớn */}
        <div className="desktop-buttons">
          <span className="seller-name">👤 {currentUser?.name}</span>
          {/* <button onClick={() => setDarkMode(!darkMode)} className="theme-btn">
            {darkMode ? '☀️ Light' : '🌙 Dark'} 
          </button>*/}
          <button onClick={handleSwitchToCustomer} className="switch-btn">
            Về giao diện người mua
          </button>
          <button onClick={handleLogout} className="logout-btn">
            Đăng xuất
          </button>
        </div>

        {/* Với màn hình nhỏ */}
        <div className="mobile-dropdown">
          <button
            className="menu-btn"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            ☰
          </button>
          {showDropdown && (
            <div className="dropdown-menu">
              <div className="dropdown-name">
                <i className="fa fa-user" /> {currentUser?.name}
              </div>
              <button onClick={() => setDarkMode(!darkMode)} className="theme-btn">
                {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </button>
              <button onClick={handleSwitchToCustomer} className="switch-btn">
                Về giao diện người mua
              </button>
              <button onClick={handleLogout} className="logout-btn">
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
