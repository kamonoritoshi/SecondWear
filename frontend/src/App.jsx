import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { translations } from "./translations";
// Import các components
import Header from "./Header";
import SideMenu from "./SideMenu";
import HomePage from "./HomePage";
import ProductsPage from "./ProductsPage";
import WrappedProductDetail from "./ProductDetail";
import WrappedCartPage from "./CartPage";
import WrappedLoginPage from "./LoginPage";
import WrappedRegisterPage from "./RegisterPage";
import VerifyPage from "./VerifyPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedSellerRoute from "./components/ProtectedSellerRoute";
import SellerLayout from "./layouts/seller/SellerLayout";
import Dashboard from "./pages/seller/Dashboard";
import ProductManagement from "./pages/seller/ProductManagement";
import OrderManagement from "./pages/seller/OrderManagement";
import InventoryManagement from "./pages/seller/InventoryManagement";

// ✅ Tạo wrapper để sử dụng useLocation ngoài Router
const AppContent = () => {
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("vi");

  const t = (key) => translations[language]?.[key] || key;
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", theme === "dark");
  }, [theme]);

  // ✅ Ẩn Header và SideMenu nếu ở route /seller/*
  const isSellerRoute = location.pathname.startsWith("/seller");

  return (
    <div className={`app-container ${isMenuOpen ? "menu-open" : ""}`}>
      {!isSellerRoute && (
        <>
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
        </>
      )}

      <main className="main-content">
        <Routes>
          {/* Các Route công khai */}
          <Route path="/" element={<HomePage t={t} />} />
          <Route path="/products" element={<ProductsPage t={t} />} />
          <Route path="/products/:id" element={<WrappedProductDetail t={t} />} />
          <Route path="/login" element={<WrappedLoginPage t={t} />} />
          <Route path="/register" element={<WrappedRegisterPage t={t} />} />
          <Route path="/verify" element={<VerifyPage t={t} />} />

          {/* Các Route cần đăng nhập */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <WrappedCartPage t={t} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/seller"
            element={
              <ProtectedSellerRoute>
                <SellerLayout />
              </ProtectedSellerRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="inventory" element={<InventoryManagement />} />
            <Route path="orders" element={<OrderManagement />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
