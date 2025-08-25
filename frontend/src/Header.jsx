// src/Header.jsx

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

import { useNavigate } from "react-router-dom";

import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

// --- SVG Icons ---
// Định nghĩa các icon SVG dưới dạng component để dễ dàng tái sử dụng và tùy chỉnh
const HomeIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z"></path>
  </svg>
);
const StoreIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 2L1 9l4 12h14l4-12L12 2zm6 17H6.5l-3-9L12 4.5l8.5 5.5-3 9zM12 11c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
  </svg>
);
const PolicyIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"></path>
  </svg>
);
const TermsIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"></path>
  </svg>
);
const ReturnIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path>
  </svg>
);
const ShippingIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm11-6H6.83l1.58-3.37L17 12zM18 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"></path>
  </svg>
);
const PaymentSecurityIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z"></path>
  </svg>
);
const FaqIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"></path>
  </svg>
);
const InfoIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
  </svg>
);
const ContactIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path>
  </svg>
);
const BusinessIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10z"></path>
  </svg>
);
const RecruitIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V18c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V18c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5z"></path>
  </svg>
);
const BlogIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm0-4H7v-2h10v2zm0-4H7V7h10v2z"></path>
  </svg>
);

// ĐÃ SỬA LẠI ĐÚNG ĐƯỜNG DẪN TƯƠNG ĐỐI
//import globeIcon from "./icons/globe-icon.png";
//import sunIcon from "./icons/sun-icon.png";
//import moonIcon from "./icons/moon-icon.png";
import logoBlack from "./icons/black-transparent-logo.png";
import logoWhite from "./icons/white-transparent-logo.png";
import blackCart from "./icons/black-cart-icon.png";
import whiteCart from "./icons/white-cart-icon.png";
import blackSearch from "./icons/black-search-icon.png";
import whiteSearch from "./icons/white-search-icon.png";

const Header = ({ t, currentTheme, setTheme, handleLanguageChange }) => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [trayOpen, setTrayOpen] = useState(false);
  const dropdownRef = useRef(null);
  console.log(currentUser);

  const navigate = useNavigate();

  const [totalUnread, setTotalUnread] = useState(0);

  const accountId = localStorage.getItem("currentUser");
  const token = localStorage.getItem("jwtToken");

  const fetchUnread = async () => {
    if (!accountId || !token) return;
    try {
      const res = await fetch(`http://localhost:8080/api/chat/rooms/${accountId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const rooms = await res.json();
      const unreadSum = rooms.reduce((sum, r) => sum + (r.unread || 0), 0);
      setTotalUnread(unreadSum);
    } catch (e) {
      console.error("Lỗi fetch unread:", e);
    }
  };

  useEffect(() => {
    if (!accountId) return;
    fetchUnread();

    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      connectHeaders: { Authorization: `Bearer ${token}` },
      onConnect: () => {
        client.subscribe(`/topic/rooms/${accountId}`, (msg) => {
          console.log("Room update:", msg.body);
          fetchUnread(); // 🔥 cập nhật lại mỗi khi có sự kiện
        });
      },
    });

    client.activate();
    return () => client.deactivate();
  }, [accountId, token]);


  // Hàm xử lý đăng xuất
  const handleLogout = (e) => {
    e.preventDefault(); // Ngăn chặn reload trang
    logout(); // Gọi hàm logout từ AuthContext
    setOpenDropdown(null); // Đóng dropdown
    navigate("/login"); // Chuyển hướng sau khi logout
  };

  const GlobeIcon = (props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
             10-4.48 10-10S17.52 2 12 2zm-1 17.93
             c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1
             c0 1.1.9 2 2 2v1.93zM11 14H8v-2h3V9l4 4-4 4v-3zm1-12
             c4.08 0 7.44 3.06 7.93 7h-1.93c-.5-2.83-2.99-5-6-5V2.07z"
      />
    </svg>
  );

  const SunIcon = (props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8
             1.42-1.42zM1 13h3v-2H1v2zm10
             9h2v-3h-2v3zm9-9h3v-2h-3v2zm-4.24
             7.16l1.79 1.8 1.41-1.41-1.8-1.79
             -1.4 1.4zM12 8a4 4 0 100 8 4 4 0 000-8zm6.24
             -3.16l1.8-1.79-1.41-1.41-1.79 1.8
             1.4 1.4zM4.22 19.78l1.79-1.8-1.41-1.41
             -1.8 1.79 1.42 1.42z"
      />
    </svg>
  );

  const MoonIcon = (props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M21.75 15.5A9 9 0 0110.5 3.25
             a7 7 0 1011.25 12.25z"
      />
    </svg>
  );

  // --- Cấu trúc dữ liệu cho Menu ---
  // Dễ dàng thay đổi, thêm, bớt hoặc sắp xếp lại menu tại đây
  const menuData = [
    {
      items: [
        {
          labelKey: "menu_home",
          label: "Trang chủ",
          to: "/",
          icon: <HomeIcon />,
        },
        {
          labelKey: "menu_products",
          label: "Sản phẩm",
          to: "/products",
          icon: <StoreIcon />,
        },
      ],
    },
    {
      titleKey: "menu_section_policy",
      title: "Chính sách",
      items: [
        {
          labelKey: "menu_policy_privacy",
          label: "Chính sách bảo mật",
          to: "/privacy-policy",
          icon: <PolicyIcon />,
        },
        {
          labelKey: "menu_policy_terms",
          label: "Điều khoản sử dụng",
          to: "/terms-of-use",
          icon: <TermsIcon />,
        },
        {
          labelKey: "menu_policy_return",
          label: "Chính sách đổi trả",
          to: "/return-policy",
          icon: <ReturnIcon />,
        },
        {
          labelKey: "menu_policy_shipping",
          label: "Chính sách vận chuyển",
          to: "/shipping-policy",
          icon: <ShippingIcon />,
        },
        {
          labelKey: "menu_policy_payment",
          label: "Bảo mật thanh toán",
          to: "/payment-security",
          icon: <PaymentSecurityIcon />,
        },
      ],
    },
    {
      titleKey: "menu_section_support",
      title: "Hỗ trợ khách hàng",
      items: [
        {
          labelKey: "menu_support_faq",
          label: "Câu hỏi thường gặp",
          to: "/faq",
          icon: <FaqIcon />,
        },
        {
          labelKey: "menu_support_guide",
          label: "Hướng dẫn sử dụng",
          to: "/user-guide",
          icon: <InfoIcon />,
        },
        {
          labelKey: "menu_support_contact",
          label: "Liên hệ hỗ trợ",
          to: "/contact",
          icon: <ContactIcon />,
        },
      ],
    },
    {
      titleKey: "menu_section_legal",
      title: "Thông tin pháp lý",
      items: [
        {
          labelKey: "menu_legal_about",
          label: "Công bố doanh nghiệp",
          to: "/about-us",
          icon: <BusinessIcon />,
        },
        {
          labelKey: "menu_legal_careers",
          label: "Tuyển dụng",
          to: "/careers",
          icon: <RecruitIcon />,
        },
        {
          labelKey: "menu_legal_blog",
          label: "Blog",
          to: "/blog",
          icon: <BlogIcon />,
        },
      ],
    },
  ];

  const toggleDropdown = (menu) => {
    setOpenDropdown((prev) => (prev === menu ? null : menu));
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

  const handleThemeChange = (theme) => {
    setTheme(theme);
  };

  const defaultAvatar = "/src/icons/black-user-icon.png"; // Icon user mặc định của bạn
  const avatarToShow = currentUser?.avatarUrl || defaultAvatar;
  return (
    <>
      {/* CSS cho Tray Menu, đặt ở đây để component tự chứa và dễ quản lý */}
      <style>{`
        .tray-menu-link {
          display: flex;
          align-items: center;
          padding: 10px 24px;
          text-decoration: none;
          color: var(--main-text);
          border-radius: 8px;
          margin: 2px 12px;
          transition: background-color 0.2s ease-in-out;
        }
        .tray-menu-link:hover {
          background-color: var(--button-bg-hover);
        }
        .tray-menu-link svg {
          width: 22px;
          height: 22px;
          margin-right: 20px;
          fill: currentColor;
          flex-shrink: 0;
        }
        .tray-menu-link span {
          font-size: 14px;
          font-weight: 500;
        }
        .menu-section-title {
          font-size: 15px;
          font-weight: 600;
          color: var(--main-text);
          padding: 16px 24px 8px 24px;
          text-transform: uppercase;
          letter-spacing: .5px;
        }
        .menu-divider {
          border: none;
          border-top: 1px solid var(--border-color);
          margin: 8px 0;
        }
      `}</style>

      <header
        className="main-header header-bg"
        style={{ background: "var(--main-bg)" }}
      >
        <div
          className="header-content"
          style={{ display: "flex", alignItems: "center" }}
        >
          {/* Nút mở tray menu (Hamburger) */}
          <button
            className="tray-toggle-btn"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              marginRight: "16px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Mở menu"
            onClick={() => setTrayOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              fill="var(--main-text)"
            >
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
            </svg>
          </button>

          {/* Logo */}
          <div className="logo">
            <Link to="/">
              <img
                src={currentTheme === "dark" ? logoWhite : logoBlack}
                alt="SecondWear Logo"
                style={{ height: "40px", display: "block" }}
              />
            </Link>
          </div>

          {/* Overlay phía sau menu */}
          <div
            className="main-menu-tray-overlay"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.5)",
              zIndex: 1000,
              opacity: trayOpen ? 1 : 0,
              transition: "opacity 0.3s ease-in-out",
              pointerEvents: trayOpen ? "auto" : "none",
            }}
            onClick={() => setTrayOpen(false)}
          />

          {/* Tray menu */}
          <nav
            className="main-menu-tray"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              height: "100vh",
              width: 280,
              background: "var(--side-menu-bg)",
              zIndex: 1100,
              transform: trayOpen ? "translateX(0)" : "translateX(-100%)",
              transition: "transform 0.3s ease-in-out",
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              boxShadow: "2px 0 16px rgba(0,0,0,0.13)",
            }}
          >
            {/* Header bên trong Tray Menu */}
            <div
              style={{
                padding: "11.5px 4px 11.5px 16px",
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <button
                className="tray-toggle-btn"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "8px",
                  marginRight: "16px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-label="Đóng menu"
                onClick={() => setTrayOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  fill="var(--main-text)"
                >
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
                </svg>
              </button>
              <Link to="/" onClick={() => setTrayOpen(false)}>
                <img
                  src={currentTheme === "dark" ? logoWhite : logoBlack}
                  alt="SecondWear Logo"
                  style={{ height: "40px", display: "block" }}
                />
              </Link>
            </div>

            {/* Render các mục menu từ `menuData` */}
            <div style={{ padding: "12px 0" }}>
              {menuData.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  {section.title && (
                    <h3 className="menu-section-title">
                      {t(section.titleKey) || section.title}
                    </h3>
                  )}
                  <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <Link
                          to={item.to}
                          className="tray-menu-link"
                          onClick={() => setTrayOpen(false)}
                        >
                          {item.icon}
                          <span>{t(item.labelKey) || item.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {sectionIndex < menuData.length - 1 && (
                    <hr className="menu-divider" />
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* Search bar */}
          <div
            className="search-bar"
            style={{
              background: "var(--button-bg)",
              display: "flex",
              alignItems: "center",
              borderRadius: 12,
              padding: "0 8px",
              height: 40,
              flex: 1,
              maxWidth: 400,
              margin: "0 16px",
            }}
          >
            {/* Form và các phần tử khác giữ nguyên */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const query = e.target.elements.searchInput.value.trim();
                if (query) {
                  window.location.href = `/products?search=${encodeURIComponent(
                    query
                  )}`;
                }
              }}
              style={{ display: "flex", alignItems: "center", width: "100%" }}
            >
              <input
                type="text"
                name="searchInput"
                placeholder={t("search_placeholder")}
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  color: "var(--main-text)",
                  fontSize: 16,
                  padding: "8px 10px",
                }}
                autoComplete="off"
              />
              <button
                type="submit"
                className="search-button"
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  marginLeft: 4,
                  cursor: "pointer",
                  display: "flex",
                }}
              >
                <img
                  src={currentTheme === "dark" ? whiteSearch : blackSearch}
                  alt="Search"
                  style={{ width: 22, height: 22 }}
                />
              </button>
            </form>
          </div>

          {/* Các icon và dropdown bên phải - giữ nguyên */}
          <div className="header-icons" ref={dropdownRef}>
            <Link to="/cart" className="action-button">
              <img
                src={currentTheme === "dark" ? whiteCart : blackCart}
                alt="Cart"
                className="header-icon"
              />
            </Link>

            <div
              className="dropdown language-dropdown"
              style={{ position: "relative", display: "inline-block" }}
            >
              <button
                className="dropdown-toggle"
                onClick={() => toggleDropdown("language")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "6px 10px",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <GlobeIcon style={{ color: "var(--main-text)" }} />
              </button>
              {openDropdown === "language" && (
                <div
                  className="dropdown-menu"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    right: -30,
                    minWidth: 120,
                    background: "var(--dropdown-bg)",
                    boxShadow: "0 6px 24px rgba(0,0,0,0.13)",
                    borderRadius: 12,
                    padding: "10px 0",
                    zIndex: 10,
                  }}
                >
                  <a
                    href="#"
                    className="dropdown-item"
                    onClick={() => {
                      handleLanguageChange("vi");
                      setOpenDropdown(null);
                    }}
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      padding: "9px 20px",
                      color: "var(--main-text)",
                      textDecoration: "none",
                      display: "block",
                    }}
                  >
                    Tiếng Việt
                  </a>
                  <a
                    href="#"
                    className="dropdown-item"
                    onClick={() => {
                      handleLanguageChange("en");
                      setOpenDropdown(null);
                    }}
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      padding: "9px 20px",
                      color: "var(--main-text)",
                      textDecoration: "none",
                      display: "block",
                    }}
                  >
                    English
                  </a>
                </div>
              )}
            </div>

            <div
              className="dropdown theme-dropdown"
              style={{ position: "relative", display: "inline-block" }}
            >
              <button
                className="dropdown-toggle"
                onClick={() => toggleDropdown("theme")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "6px 10px",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {currentTheme === "light" ? (
                  <SunIcon style={{ color: "var(--main-text)" }} />
                ) : (
                  <MoonIcon style={{ color: "var(--main-text)" }} />
                )}
              </button>

              {openDropdown === "theme" && (
                <div
                  className="dropdown-menu"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    right: -100,
                    minWidth: 120,
                    background: "var(--dropdown-bg)",
                    boxShadow: "0 6px 24px rgba(0,0,0,0.13)",
                    borderRadius: 12,
                    padding: "10px 0",
                    zIndex: 10,
                  }}
                >
                  <a
                    href="#"
                    className="dropdown-item"
                    onClick={() => {
                      handleThemeChange("light");
                      setOpenDropdown(null);
                    }}
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      padding: "9px 20px",
                      color: "var(--main-text)",
                      textDecoration: "none",
                      display: "block",
                    }}
                  >
                    {t("light_theme_label")}
                  </a>
                  <a
                    href="#"
                    className="dropdown-item"
                    onClick={() => {
                      handleThemeChange("dark");
                      setOpenDropdown(null);
                    }}
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      padding: "9px 20px",
                      color: "var(--main-text)",
                      textDecoration: "none",
                      display: "block",
                    }}
                  >
                    {t("dark_theme_label")}
                  </a>
                </div>
              )}
            </div>

            <div
              className="dropdown account-dropdown"
              style={{ position: "relative", display: "inline-block" }}
            >
              <button
                className="dropdown-toggle"
                onClick={() => toggleDropdown("account")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontWeight: 600,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "6px 10px",
                  borderRadius: 8,
                }}
              >
                <img
                  src={avatarToShow}
                  alt="User Avatar"
                  className="header-icon" // Thêm class để style
                />
                <span
                  className="user-text"
                  style={{ color: "var(--main-text)" }}
                >
                  {isAuthenticated
                    ? currentUser.name || currentUser.email
                    : t("guest_label")}
                </span>
              </button>
              {openDropdown === "account" && (
                <div
                  className="dropdown-menu"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    right: 0,
                    minWidth: 170,
                    background: "var(--dropdown-bg)",
                    boxShadow: "0 6px 24px rgba(0,0,0,0.13)",
                    borderRadius: 12,
                    padding: "12px 0",
                    zIndex: 10,
                  }}
                >
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/profile"
                        className="dropdown-item"
                        style={{
                          fontSize: 15,
                          fontWeight: 600,
                          padding: "10px 22px",
                          color: "var(--main-text)",
                          textDecoration: "none",
                          display: "block",
                        }}
                      >
                        {t("my_account_label")}
                      </Link>

                      <Link
                        to="/orders"
                        className="dropdown-item"
                        style={{
                          fontSize: 15,
                          fontWeight: 600,
                          padding: "10px 22px",
                          color: "var(--main-text)",
                          textDecoration: "none",
                          display: "block",
                        }}
                      >
                        {t("menu_my_orders")}
                      </Link>

                      {/* Nút Yêu thích */}
                      <Link
                        to="/favorites"
                        className="dropdown-item"
                        style={{
                          fontSize: 15,
                          fontWeight: 600,
                          padding: "10px 22px",
                          color: "var(--main-text)",
                          textDecoration: "none",
                          display: "block",
                        }}
                      >
                        {t("Yêu thích")}
                      </Link>
                      {/* Đổi mật khẩu */}
                      <Link
                        to="/change-password"
                        className="dropdown-item"
                        style={{
                          fontSize: 15,
                          fontWeight: 600,
                          padding: "10px 22px",
                          color: "var(--main-text)",
                          textDecoration: "none",
                          display: "block",
                        }}
                      >
                        {t("Đổi mật khẩu")}
                      </Link>
                      {/* Nút Tin nhắn */}
                      <Link
                        to={`/chat/rooms/${currentUser.accountId}`}
                        className="dropdown-item"
                        style={{
                          fontSize: 15,
                          fontWeight: 600,
                          padding: "10px 22px",
                          color: "var(--main-text)",
                          textDecoration: "none",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center"
                        }}
                      >
                        {t("Tin nhắn")}
                        {totalUnread > 0 && (
                          <span
                            style={{
                              background: "red",
                              color: "white",
                              borderRadius: "50%",
                              fontSize: 12,
                              padding: "2px 6px",
                              marginLeft: 8
                            }}
                          >
                            {totalUnread}
                          </span>
                        )}
                      </Link>

                      {currentUser?.role?.toLowerCase() === "admin" && (
                        <Link
                          to="/admin/dashboard"
                          className="dropdown-item"
                          style={{
                            fontSize: 15,
                            fontWeight: 600,
                            padding: "10px 22px",
                            color: "var(--main-text)",
                            textDecoration: "none",
                            display: "block",
                          }}
                        >
                          {t("admin_page_label")}
                        </Link>
                      )}

                      {currentUser &&
                        currentUser.role?.toLowerCase() === "seller" &&
                        currentUser.sellerStatus === "APPROVED" && (
                          <Link
                            to="/seller/dashboard"
                            className="dropdown-item"
                            style={{
                              fontSize: 15,
                              fontWeight: 600,
                              padding: "10px 22px",
                              color: "var(--main-text)",
                              textDecoration: "none",
                              display: "block",
                            }}
                          >
                            {t("seller_page_label")}
                          </Link>
                        )}

                      <a
                        href="/"
                        onClick={handleLogout}
                        className="dropdown-item"
                        style={{
                          fontSize: 15,
                          fontWeight: 600,
                          padding: "10px 22px",
                          color: "var(--main-text)",
                          textDecoration: "none",
                          display: "block",
                        }}
                      >
                        {t("logout_label")}
                      </a>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="dropdown-item"
                        style={{
                          fontSize: 15,
                          fontWeight: 600,
                          padding: "10px 22px",
                          color: "var(--main-text)",
                          textDecoration: "none",
                          display: "block",
                        }}
                      >
                        {t("login_label")}
                      </Link>

                      <Link
                        to="/register"
                        className="dropdown-item"
                        style={{
                          fontSize: 15,
                          fontWeight: 600,
                          padding: "10px 22px",
                          color: "var(--main-text)",
                          textDecoration: "none",
                          display: "block",
                        }}
                      >
                        {t("register_label")}
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
