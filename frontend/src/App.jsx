// src/App.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { translations } from './translations';

// Import các components
import Header from './Header';
import SideMenu from './SideMenu';
import ProductDetail from './ProductDetail';
import CartPage from './CartPage';

function App() {
  // --- Nâng các state chung lên App.jsx ---
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(1); // Giả định có 1 sp trong giỏ
  const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem('language') || 'vi');
  const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('theme') || 'light');

  // --- Các hàm chung ---
  const t = useCallback((key) => {
    return translations[currentLanguage]?.[key] || key;
  }, [currentLanguage]);

  const closeAllDropdowns = useCallback(() => {
    setShowLanguageMenu(false);
    setShowThemeMenu(false);
    setShowAccountMenu(false);
  }, []);

  const toggleDropdown = useCallback((menuSetter, currentMenuState, event) => {
    event.stopPropagation();
    closeAllDropdowns();
    menuSetter(!currentMenuState);
  }, [closeAllDropdowns]);

  // --- Handlers ---
  const handleAccountToggle = (event) => toggleDropdown(setShowAccountMenu, showAccountMenu, event);
  const handleLanguageToggle = (event) => toggleDropdown(setShowLanguageMenu, showLanguageMenu, event);
  const handleThemeToggle = (event) => toggleDropdown(setShowThemeMenu, showThemeMenu, event);
  const handleToggleSideMenu = () => setIsSideMenuOpen(prevOpen => !prevOpen);
  const handleCloseSideMenu = () => setIsSideMenuOpen(false);
  const handleLanguageChange = (lang) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
    closeAllDropdowns();
  };
  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    localStorage.setItem('theme', theme);
    closeAllDropdowns();
  };

  // --- useEffect cho các tác vụ toàn cục ---
  useEffect(() => {
    document.body.className = currentTheme === 'dark' ? 'dark-mode' : '';
    document.addEventListener('click', closeAllDropdowns);
    return () => {
      document.removeEventListener('click', closeAllDropdowns);
    };
  }, [currentTheme, closeAllDropdowns]);

  return (
    <BrowserRouter>
      <div className="App" onClick={closeAllDropdowns}>
        {/* Header và SideMenu được hiển thị trên mọi trang */}
        <Header
          t={t}
          cartCount={cartCount}
          currentTheme={currentTheme}
          showLanguageMenu={showLanguageMenu}
          showThemeMenu={showThemeMenu}
          showAccountMenu={showAccountMenu}
          handleToggleSideMenu={handleToggleSideMenu}
          handleLanguageToggle={handleLanguageToggle}
          handleThemeToggle={handleThemeToggle}
          handleAccountToggle={handleAccountToggle}
          handleLanguageChange={handleLanguageChange}
          handleThemeChange={handleThemeChange}
        />
        <SideMenu
          t={t}
          isSideMenuOpen={isSideMenuOpen}
          handleCloseSideMenu={handleCloseSideMenu}
        />

        {/* Định nghĩa các route cho ứng dụng */}
        <Routes>
          <Route path="/" element={<ProductDetail t={t} setCartCount={setCartCount} />} />
          <Route path="/cart" element={<CartPage t={t} />} />
          {/* Thêm các Route khác ở đây */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;