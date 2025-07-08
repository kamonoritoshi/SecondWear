import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { translations } from './translations';
// Import các components
import Header from './Header';
import SideMenu from './SideMenu';
import HomePage from './HomePage';
import ProductsPage from './ProductsPage';
import ProductDetail from './ProductDetail';
import CartPage from './CartPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import VerifyPage from './VerifyPage'; // (MỚI) Import trang xác thực
import ProtectedRoute from './components/ProtectedRoute'; // Import route bảo vệ

function App() {
  // State quản lý trạng thái của menu (đóng/mở)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // State theme: 'light' | 'dark'
  const [theme, setTheme] = useState('light');

  // State quản lý ngôn ngữ
  const [language, setLanguage] = useState('vi');

  // Hàm dịch, lấy giá trị từ file translations.js
  const t = (key) => translations[language]?.[key] || key;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Xóa hàm toggleTheme vì đã dùng setTheme trực tiếp

  // Cập nhật class cho <html> khi theme đổi
  useEffect(() => {
    document.documentElement.classList.toggle('dark-mode', theme === 'dark');
  }, [theme]);

  return (
    // Sử dụng BrowserRouter để quản lý routing
    <Router>
      <div className={`app-container ${isMenuOpen ? 'menu-open' : ''}`}>
        <Header
          t={t}
          currentTheme={theme}
          setTheme={setTheme}
          handleLanguageChange={setLanguage}
        />
        <SideMenu
          isOpen={isMenuOpen}
          onClose={toggleMenu}
          t={t}
          language={language}
          setLanguage={setLanguage}
        />
        <main className="main-content">
          {/* Hệ thống Routes định nghĩa các trang của ứng dụng */}
          <Routes>
            {/* Các Route công khai */}
            <Route path="/" element={<HomePage t={t} />} />
            <Route path="/products" element={<ProductsPage t={t} />} />
            <Route path="/products/:id" element={<ProductDetail t={t} />} />
            <Route path="/login" element={<LoginPage t={t} />} />
            <Route path="/register" element={<RegisterPage t={t} />} />
            <Route path="/verify" element={<VerifyPage t={t} />} />

            {/* Các Route cần đăng nhập mới được truy cập */}
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage t={t} />
                </ProtectedRoute>
              }
            />
            {/* Trong tương lai, bạn có thể thêm các trang khác cần bảo vệ ở đây:
                          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} /> 
                        */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;