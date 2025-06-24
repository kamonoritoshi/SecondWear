// src/Header.jsx
import React from 'react';

// Import các icon
import searchIcon from '/icons/search-icon.png';
import cartIcon from '/icons/cart-icon.png';
import globeIcon from '/icons/globe-icon.png';
import sunIcon from '/icons/sun-icon.png';
import moonIcon from '/icons/moon-icon.png';
import userIcon from '/icons/user-icon.png';
import { Link } from 'react-router-dom'; // Dùng Link để chuyển trang

const Header = ({
    t,
    cartCount,
    currentTheme,
    showLanguageMenu,
    showThemeMenu,
    showAccountMenu,
    handleToggleSideMenu,
    handleLanguageToggle,
    handleThemeToggle,
    handleAccountToggle,
    handleLanguageChange,
    handleThemeChange,
}) => {
    return (
        <header className="main-header">
            <div className="header-content">
                <button className="menu-button" onClick={handleToggleSideMenu}>☰</button>
                <div className="logo">LOGO SHOP</div>
                <div className="search-bar">
                    <input type="text" placeholder={t('search_placeholder')} />
                    <button className="search-button"><img src={searchIcon} alt="Search" className="header-icon" /></button>
                </div>
                <div className="header-icons">
                    {/* Sử dụng Link để điều hướng đến trang giỏ hàng */}
                    <Link to="/cart" className="cart-icon">
                        <img src={cartIcon} alt="Cart" className="header-icon" />
                        <span className="cart-count">{cartCount}</span>
                    </Link>

                    <div className="dropdown language-dropdown">
                        <button className="dropdown-toggle language-toggle" onClick={handleLanguageToggle}>
                            <img src={globeIcon} alt="Language" className="header-icon" id="language-icon" />
                        </button>
                        {showLanguageMenu && (
                            <div className="dropdown-menu language-menu">
                                <a href="#" onClick={() => handleLanguageChange('vi')}>Tiếng Việt</a>
                                <a href="#" onClick={() => handleLanguageChange('en')}>English</a>
                                <a href="#" onClick={() => handleLanguageChange('ja')}>日本語</a>
                                <a href="#" onClick={() => handleLanguageChange('zh')}>中文</a>
                                <a href="#" onClick={() => handleLanguageChange('ko')}>한국어</a>
                                <a href="#" onClick={() => handleLanguageChange('ru')}>русский язык</a>
                                <a href="#" onClick={() => handleLanguageChange('ar')}>اللغة العربية</a>
                            </div>
                        )}
                    </div>

                    <div className="dropdown theme-dropdown">
                        <button className="dropdown-toggle theme-toggle" onClick={handleThemeToggle}>
                            <img src={currentTheme === 'light' ? sunIcon : moonIcon}
                                alt={t(currentTheme === 'light' ? 'light_theme_label' : 'dark_theme_label')}
                                className="header-icon" id="theme-icon" />
                        </button>
                        {showThemeMenu && (
                            <div className="dropdown-menu theme-menu">
                                <a href="#" onClick={() => handleThemeChange('light')}>{t('light_theme_label')}</a>
                                <a href="#" onClick={() => handleThemeChange('dark')}>{t('dark_theme_label')}</a>
                            </div>
                        )}
                    </div>

                    <div className="dropdown account-dropdown">
                        <button className="dropdown-toggle account-toggle" onClick={handleAccountToggle}>
                            <img src={userIcon} alt="User" className="header-icon" />
                            <span className="user-text">{t('guest_label')}</span>
                            <span className="arrow-down">▼</span>
                        </button>
                        {showAccountMenu && (
                            <div className="dropdown-menu account-menu">
                                <a href="#" className="dropdown-item">{t('login_label')}</a>
                                <a href="#" className="dropdown-item">{t('register_label')}</a>
                                <a href="#" className="dropdown-item">{t('forgot_password_label')}</a>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </header>
    );
};

export default Header;