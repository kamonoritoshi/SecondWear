import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Outlet,
  useOutletContext,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./Header";
import Footer from "./Footer";
import SideMenu from "./SideMenu";
import { translations } from "./translations";

// Trang user
import HomePage from "./HomePage";
import ProductsPage from "./ProductsPage";
import WrappedProductDetail from "./ProductDetail";
import WrappedCartPage from "./CartPage";
import WrappedLoginPage from "./LoginPage";
import WrappedRegisterPage from "./RegisterPage";
import VerifyPage from "./VerifyPage";
import ProfilePage from "./ProfilePage";
import CheckoutPage from "./CheckoutPage";
import PaymentFailPage from "./PaymentFailPage";
import SuccessPage from "./SuccessPage";
import OrderPage from "./OrderPage";

// Trang Seller
import SellerLayout from "./layouts/seller/SellerLayout";
import SellerDashboard from "./pages/seller/Dashboard";
import ProductList from "./pages/seller/ProductList";
import ProductForm from "./pages/seller/ProductForm";
import OrderManagement from "./pages/seller/OrderList";
import Statistics from './pages/seller/Statistics';
import MessageList from "./pages/seller/MessageList";

// Trang Admin
import AdminLayout from "./layouts/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AccountManagement from "./pages/admin/account/AccountManagement";
import SellerRequests from "./pages/admin/account/SellerRequests";
import SellerList from "./pages/admin/account/SellerList";
import CustomerList from "./pages/admin/account/CustomerList";
import PendingProducts from "./pages/admin/product/PendingProducts";
import OrderManagementAdmin from "./pages/admin/order/OrderManagement";
import ViolatedProducts from "./pages/admin/product/ViolatedProducts";
import DisputeManagementAdmin from "./pages/admin/order/DisputeManagementAdmin";

// Chính sách
import PrivacyPolicy from "./PolicyPage";
import TermsOfUse from "./TermsOfUse";
import ReturnPolicy from "./ReturnPolicy";
import ShippingPolicy from "./ShippingPolicy";
import PaymentSecurity from "./PaymentSecurity";
import FAQPage from "./FAQPage";
import UserGuide from "./UserGuide"
import ContactSupport from "./ContactSupport";

// Route bảo vệ
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedSellerRoute from "./components/ProtectedSellerRoute";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

const AppContent = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [language, setLanguage] = useState("vi");

  const t = (key) => translations[language]?.[key] || key;
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const isAdminOrSellerRoute =
    location.pathname.startsWith("/admin") || location.pathname.startsWith("/seller");

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
          {/* Public */}
          <Route path="/" element={<HomePage t={t} />} />
          <Route path="/products" element={<ProductsPage t={t} />} />
          <Route path="/products/:id" element={<WrappedProductDetail t={t} />} />
          <Route path="/login" element={<WrappedLoginPage t={t} />} />
          <Route path="/register" element={<WrappedRegisterPage t={t} />} />
          <Route path="/verify" element={<VerifyPage t={t} />} />
          <Route path="/profile" element={<ProfilePage t={t} />} />
          <Route path="/checkout" element={<CheckoutPage t={t} />} />
          <Route path="/payment-fail" element={<PaymentFailPage />} />
          <Route path="/payment-success" element={<SuccessPage />} />
          <Route path="/orders" element={<OrderPage />} />

          {/* Chính sách */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/payment-security" element={<PaymentSecurity />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/user-guide" element={<UserGuide />} />
          <Route path="/contact" element={<ContactSupport />} />

          {/* Bảo vệ user */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <WrappedCartPage t={t} />
              </ProtectedRoute>
            }
          />

          {/* Seller */}
          <Route
            path="/seller"
            element={
              <ProtectedSellerRoute>
                <SellerLayout currentTheme={theme} />
              </ProtectedSellerRoute>
            }
          >
            <Route path="dashboard" element={<SellerDashboard />} />
            <Route path="products" element={<ProductList />} />
            <Route path="products/add" element={<ProductForm />} />
            <Route path="products/edit/:id" element={<ProductForm />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="messages" element={<MessageList />} />
          </Route>

          {/* Admin */}
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
            <Route path="seller-requests" element={<SellerRequests />} />
            <Route path="sellers" element={<SellerList />} />
            <Route path="customers" element={<CustomerList />} />
            <Route path="products/pending" element={<PendingProducts />} />
            <Route path="products/violations" element={<ViolatedProducts />} />
            <Route path="orders" element={<OrderManagementAdmin />} />
            <Route path="disputes" element={<DisputeManagementAdmin />} />
          </Route>
        </Routes>
      </main>

      {!isAdminOrSellerRoute && (
        <Footer
          t={t}
          currentTheme={theme}
          setTheme={setTheme}
          handleLanguageChange={setLanguage}
        />
      )}
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;