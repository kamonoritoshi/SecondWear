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
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import SellerLayout from "./layouts/seller/SellerLayout";
import SellerDashboard from "./pages/seller/Dashboard";
import ProductManagement from "./pages/seller/ProductManagement";
import OrderManagement from "./pages/seller/OrderManagement";
import InventoryManagement from "./pages/seller/InventoryManagement";
import AdminLayout from "./layouts/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AccountManagement from "./pages/admin/AccountManagement";
import OrderManagementAdmin from "./pages/admin/OrderManagementAdmin";
import ProfilePage from "./ProfilePage";
import CheckoutPage from "./CheckoutPage";
import SuccessPage from "./SuccessPage";
import OrderPage from "./OrderPage";

// ✅ Import thêm trang Chính sách bảo mật
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfUse from "./TermsOfUse";
import ReturnPolicy from "./ReturnPolicy";
import FAQPage from "./FAQPage";

const AppContent = () => {
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  const [language, setLanguage] = useState("vi");

  const t = (key) => translations[language]?.[key] || key;
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const isAdminOrSellerRoute =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/seller");

  return (
    <div className={`app-container ${isMenuOpen ? "menu-open" : ""}`}>
      {!isAdminOrSellerRoute && (
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
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/products" element={<ProductsPage t={t} />} />
          <Route
            path="/products/:id"
            element={<WrappedProductDetail t={t} />}
          />
          <Route path="/login" element={<WrappedLoginPage t={t} />} />
          <Route path="/register" element={<WrappedRegisterPage t={t} />} />
          <Route path="/verify" element={<VerifyPage t={t} />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/checkout" element={<CheckoutPage t={t} />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/orders" element={<OrderPage />} />

          {/* Route cần đăng nhập */}
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
            <Route path="dashboard" element={<SellerDashboard />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="inventory" element={<InventoryManagement />} />
            <Route path="orders" element={<OrderManagement />} />
          </Route>

          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminLayout />
              </ProtectedAdminRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="accounts" element={<AccountManagement />} />
            <Route path="orders" element={<OrderManagementAdmin />} />
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
