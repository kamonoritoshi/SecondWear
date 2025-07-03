// src/Header.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// ĐÃ SỬA LẠI ĐÚNG ĐƯỜNG DẪN TƯƠNG ĐỐI
import searchIcon from './icons/search-icon.png';
import cartIcon from './icons/cart-icon.png';
import globeIcon from './icons/globe-icon.png';
import sunIcon from './icons/sun-icon.png';
import moonIcon from './icons/moon-icon.png';
import userIcon from './icons/user-icon.png';
import menuIcon from './icons/menu-icon.png';
import logo from './icons/logo-secondwear.png';

const Header = ({
    t,
    currentTheme,
    handleThemeChange,
    currentLanguage,
    handleLanguageChange,
    onMenuClick,
}) => {
    const { isAuthenticated, currentUser, logout } = useAuth();
    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownRef = useRef(null);

    const toggleDropdown = (menu) => {
        setOpenDropdown(prev => (prev === menu ? null : menu));
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="main-header">
            <div className="header-content">
                <button className="menu-button" onClick={onMenuClick}>
                    <img src={menuIcon} alt="Menu" style={{ width: '24px', height: '24px' }} />
                </button>
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="SecondWear Logo" style={{ height: '40px' }} />
                    </Link>
                </div>
                <div className="search-bar">
                    <input type="text" placeholder={t('search_placeholder')} />
                    <button className="search-button"><img src={searchIcon} alt="Search" className="header-icon" /></button>
                </div>
                <div className="header-icons" ref={dropdownRef}>
                    <Link to="/cart" className="action-button">
                        <img src={cartIcon} alt="Cart" className="header-icon" />
                    </Link>

                    <div className="dropdown language-dropdown">
                        <button className="dropdown-toggle" onClick={() => toggleDropdown('language')}>
                            <img src={globeIcon} alt="Language" className="header-icon" />
                        </button>
                        {openDropdown === 'language' && (
                            <div className="dropdown-menu">
                                <a href="#" className="dropdown-item" onClick={() => { handleLanguageChange('vi'); setOpenDropdown(null); }}>Tiếng Việt</a>
                                <a href="#" className="dropdown-item" onClick={() => { handleLanguageChange('en'); setOpenDropdown(null); }}>English</a>
                            </div>
                        )}
                    </div>

                    <div className="dropdown theme-dropdown">
                        <button className="dropdown-toggle" onClick={() => toggleDropdown('theme')}>
                            <img src={currentTheme === 'light' ? sunIcon : moonIcon} alt="Theme" className="header-icon" />
                        </button>
                        {openDropdown === 'theme' && (
                            <div className="dropdown-menu">
                                <a href="#" className="dropdown-item" onClick={() => { handleThemeChange('light'); setOpenDropdown(null); }}>{t('light_theme_label')}</a>
                                <a href="#" className="dropdown-item" onClick={() => { handleThemeChange('dark'); setOpenDropdown(null); }}>{t('dark_theme_label')}</a>
                            </div>
                        )}
                    </div>

                    <div className="dropdown account-dropdown">
                        <button className="dropdown-toggle account-toggle" onClick={() => toggleDropdown('account')}>
                            <img src={userIcon} alt="User" className="header-icon" />
                            <span className="user-text">{isAuthenticated ? (currentUser.name || currentUser.email) : t('guest_label')}</span>
                            <span className="arrow-down">▼</span>
                        </button>
                        {openDropdown === 'account' && (
                            <div className="dropdown-menu">
                                {isAuthenticated ? (
                                    <>
                                        <Link to="/profile" className="dropdown-item">{t('my_account_label')}</Link>
                                        <Link to="/my-orders" className="dropdown-item">{t('menu_my_orders')}</Link>
                                        <a href="#" onClick={logout} className="dropdown-item">{t('logout_label')}</a>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/login" className="dropdown-item">{t('login_label')}</Link>
                                        <Link to="/register" className="dropdown-item">{t('register_label')}</Link>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;