// src/Header.jsx

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

// ĐÃ SỬA LẠI ĐÚNG ĐƯỜNG DẪN TƯƠNG ĐỐI
import globeIcon from "./icons/globe-icon.png";
import sunIcon from "./icons/sun-icon.png";
import moonIcon from "./icons/moon-icon.png";
import blackUser from "./icons/black-user-icon.png";
import whiteUser from "./icons/white-user-icon.png";
import logoBlack from "./icons/black-transparent-logo.png";
import logoWhite from "./icons/white-transparent-logo.png";
import blackCart from "./icons/black-cart-icon.png";
import whiteCart from "./icons/white-cart-icon.png";
import blackSearch from "./icons/black-search-icon.png";
import whiteSearch from "./icons/white-search-icon.png";

const Header = ({
  t,
  currentTheme,
  setTheme,
  handleLanguageChange,
  // onMenuClick, // Đã bỏ, không còn dùng
}) => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [trayOpen, setTrayOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  // Chỉ gọi setTheme, việc set class và localStorage do App quản lý
  const handleThemeChange = (theme) => {
    setTheme(theme);
  };
  return (
    <header
      className="main-header header-bg"
      style={{ background: "var(--main-bg)" }}
    >
      <div
        className="header-content"
        style={{ display: "flex", alignItems: "center" }}
      >
        {/* Nút mở tray menu */}
        <button
          className="tray-toggle-btn"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            marginRight: 24,
            display: "flex",
            alignItems: "center",
            height: 48,
            position: "relative",
            top: 0,
          }}
          aria-label="Mở menu"
          onClick={() => setTrayOpen(true)}
        >
          <span
            style={{
              display: "inline-block",
              width: 32,
              height: 32,
              verticalAlign: "middle",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: 32,
                  height: 4,
                  background: "var(--main-text)",
                  borderRadius: 2,
                  margin: "6px 0",
                  transition: "background 0.2s",
                }}
              ></span>
            ))}
          </span>
        </button>
        {/* Tray menu ẩn, kéo từ trái ra */}
        <div
          className="main-menu-tray-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: trayOpen ? "100vw" : 0,
            height: "100vh",
            background: trayOpen ? "rgba(0,0,0,0.25)" : "transparent",
            zIndex: 1000,
            transition: "background 0.2s",
            pointerEvents: trayOpen ? "auto" : "none",
          }}
          onClick={() => setTrayOpen(false)}
        />
        <nav
          className="main-menu-tray"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: 280,
            background: "var(--side-menu-bg)",
            boxShadow: "2px 0 16px rgba(0,0,0,0.13)",
            zIndex: 1100,
            padding: "32px 0 0 0",
            transform: trayOpen ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 0.25s cubic-bezier(.4,2,.6,1)",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
          <button
            style={{
              color: currentTheme === "dark" ? "white" : "black",
              background: "none",
              border: "none",
              fontSize: 28,
              alignSelf: "flex-end",
              marginRight: 16,
              marginBottom: 16,
              cursor: "pointer",
            }}
            aria-label="Đóng menu"
            onClick={() => setTrayOpen(false)}
          >
            ×
          </button>
          <ul
  style={{ listStyle: "none", margin: 0, padding: 0, width: "100%" }}
>
  {/* Mục: Sản phẩm */}
  <li style={{ width: "100%" }}>
    <Link
      to="/products"
      className="menu-link"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "var(--side-menu-bg)",
        border: "none",
        borderRadius: 12,
        padding: "14px 28px",
        fontWeight: 700,
        fontSize: 20,
        cursor: "pointer",
        color: "var(--main-text)",
        width: "100%",
        textAlign: "left",
        transition: "background 0.2s",
        boxSizing: "border-box",
        textDecoration: "none",
      }}
      onClick={() => setTrayOpen(false)}
    >
      <span style={{ fontSize: 22, marginRight: 8 }}>🛒</span>
      {t ? t("menu_products") : "Sản phẩm"}
    </Link>
  </li>

  {/* Mục: Chính sách bảo mật */}
  <li style={{ width: "100%" }}>
    <Link
      to="/privacy-policy"
      className="menu-link"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "var(--side-menu-bg)",
        border: "none",
        borderRadius: 12,
        padding: "14px 28px",
        fontWeight: 700,
        fontSize: 20,
        cursor: "pointer",
        color: "var(--main-text)",
        width: "100%",
        textAlign: "left",
        transition: "background 0.2s",
        boxSizing: "border-box",
        textDecoration: "none",
      }}
      onClick={() => setTrayOpen(false)}
    >
      <span style={{ fontSize: 22, marginRight: 8 }}>📜</span>
      {t ? t("privacy.title") : "Chính sách bảo mật"}
    </Link>
  </li>
</ul>
            style={{ listStyle: "none", margin: 0, padding: 0, width: "100%" }}
          >
            {/* Mục: Sản phẩm */}
            <li style={{ width: "100%" }}>
              <Link
                to="/products"
                className="menu-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "var(--side-menu-bg)",
                  border: "none",
                  borderRadius: 12,
                  padding: "14px 28px",
                  fontWeight: 700,
                  fontSize: 20,
                  cursor: "pointer",
                  color: "var(--main-text)",
                  width: "100%",
                  textAlign: "left",
                  transition: "background 0.2s",
                  boxSizing: "border-box",
                  textDecoration: "none",
                }}
                onClick={() => setTrayOpen(false)}
              >
                <span style={{ fontSize: 22, marginRight: 8 }}>🎽</span>
                {t ? t("menu_products") : "Sản phẩm"}
              </Link>
            </li>

            {/* Mục: Chính sách bảo mật */}
            <li style={{ width: "100%" }}>
              <Link
                to="/privacy-policy"
                className="menu-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "var(--side-menu-bg)",
                  border: "none",
                  borderRadius: 12,
                  padding: "14px 28px",
                  fontWeight: 700,
                  fontSize: 20,
                  cursor: "pointer",
                  color: "var(--main-text)",
                  width: "100%",
                  textAlign: "left",
                  transition: "background 0.2s",
                  boxSizing: "border-box",
                  textDecoration: "none",
                }}
                onClick={() => setTrayOpen(false)}
              >
                <span style={{ fontSize: 22, marginRight: 8 }}>📜</span>
                {t ? t("Chính sách bảo mật") : "Chính sách bảo mật"}
              </Link>
            </li>

            {/* Mục: Điều khoản sử dụng */}
            <li style={{ width: "100%" }}>
              <Link
                to="/terms-of-use"
                className="menu-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "var(--side-menu-bg)",
                  border: "none",
                  borderRadius: 12,
                  padding: "14px 28px",
                  fontWeight: 700,
                  fontSize: 20,
                  cursor: "pointer",
                  color: "var(--main-text)",
                  width: "100%",
                  textAlign: "left",
                  transition: "background 0.2s",
                  boxSizing: "border-box",
                  textDecoration: "none",
                }}
                onClick={() => setTrayOpen(false)}
              >
                <span style={{ fontSize: 22, marginRight: 8 }}>📃</span>
                {t ? t("Điều khoản sử dụng") : "Điều khoản sử dụng"}
              </Link>
            </li>

            {/* Mục: Chính sách đổi trả */}
            <li style={{ width: "100%" }}>
              <Link
                to="/return-policy"
                className="menu-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "var(--side-menu-bg)",
                  border: "none",
                  borderRadius: 12,
                  padding: "14px 28px",
                  fontWeight: 700,
                  fontSize: 20,
                  cursor: "pointer",
                  color: "var(--main-text)",
                  width: "100%",
                  textAlign: "left",
                  transition: "background 0.2s",
                  boxSizing: "border-box",
                  textDecoration: "none",
                }}
                onClick={() => setTrayOpen(false)}
              >
                <span style={{ fontSize: 22, marginRight: 8 }}>🔄</span>
                {t ? t("Chính sách đổi trả") : "Chính sách đổi trả"}
              </Link>
            </li>

            {/* Mục: Câu hỏi thường gặp */}
            <li style={{ width: "100%" }}>
              <Link
                to="/faq"
                className="menu-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "var(--side-menu-bg)",
                  border: "none",
                  borderRadius: 12,
                  padding: "14px 28px",
                  fontWeight: 700,
                  fontSize: 20,
                  cursor: "pointer",
                  color: "var(--main-text)",
                  width: "100%",
                  textAlign: "left",
                  transition: "background 0.2s",
                  boxSizing: "border-box",
                  textDecoration: "none",
                }}
                onClick={() => setTrayOpen(false)}
              >
                <span style={{ fontSize: 22, marginRight: 8 }}>❓</span>
                {t ? t("Câu hỏi thường gặp") : "Câu hỏi thường gặp"}
              </Link>
            </li>
          </ul>
        </nav>
        <div className="logo">
          <Link to="/">
            <img
              src={currentTheme === "dark" ? logoWhite : logoBlack}
              alt="SecondWear Logo"
              style={{ height: "40px" }}
            />
          </Link>
        </div>
        <div
          className="search-bar"
          style={{
            background: "var(--button-bg)",
            display: "flex",
            alignItems: "center",
            borderRadius: 12,
            padding: "0 8px",
            height: 40,
            minWidth: 0,
            flex: 1,
            maxWidth: 400,
            margin: "0 16px",
          }}
        >
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
                fontSize: 16,
                padding: "8px 10px",
                minWidth: 0,
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
                alignItems: "center",
              }}
            >
              <img
                src={currentTheme === "dark" ? whiteSearch : blackSearch}
                alt="Search"
                className="header-icon"
                style={{ width: 22, height: 22 }}
              />
            </button>
          </form>
        </div>
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
                zIndex: 2,
                position: "relative",
              }}
            >
              <img src={globeIcon} alt="Language" className="header-icon" />
            </button>
            <div
              className="dropdown-menu language-dropdown-menu"
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                left: 0,
                minWidth: 120,
                background: "var(--dropdown-bg)",
                boxShadow: "0 6px 24px rgba(0,0,0,0.13)",
                borderRadius: 12,
                padding: "10px 0",
                opacity: openDropdown === "language" ? 1 : 0,
                pointerEvents: openDropdown === "language" ? "auto" : "none",
                transform:
                  openDropdown === "language"
                    ? "translateY(0)"
                    : "translateY(-12px)",
                transition:
                  "opacity 0.22s cubic-bezier(.4,2,.6,1), transform 0.22s cubic-bezier(.4,2,.6,1)",
                zIndex: 10,
              }}
            >
              <a
                href="#"
                className="dropdown-item"
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  padding: "9px 20px",
                  color: "var(--main-text)",
                  textDecoration: "none",
                  display: "block",
                  border: "none",
                  transition: "background 0.18s",
                }}
                onClick={() => {
                  handleLanguageChange("vi");
                  setOpenDropdown(null);
                }}
              >
                Tiếng Việt
              </a>
              <a
                href="#"
                className="dropdown-item"
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  padding: "9px 20px",
                  color: "var(--main-text)",
                  textDecoration: "none",
                  display: "block",
                  border: "none",
                  transition: "background 0.18s",
                }}
                onClick={() => {
                  handleLanguageChange("en");
                  setOpenDropdown(null);
                }}
              >
                English
              </a>
            </div>
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
                zIndex: 2,
                position: "relative",
              }}
            >
              <img
                src={currentTheme === "light" ? sunIcon : moonIcon}
                alt="Theme"
                className="header-icon"
              />
            </button>
            <div
              className="dropdown-menu theme-dropdown-menu"
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                left: 0,
                minWidth: 120,
                background: "var(--dropdown-bg)",
                boxShadow: "0 6px 24px rgba(0,0,0,0.13)",
                borderRadius: 12,
                padding: "10px 0",
                opacity: openDropdown === "theme" ? 1 : 0,
                pointerEvents: openDropdown === "theme" ? "auto" : "none",
                transform:
                  openDropdown === "theme"
                    ? "translateY(0)"
                    : "translateY(-12px)",
                transition:
                  "opacity 0.22s cubic-bezier(.4,2,.6,1), transform 0.22s cubic-bezier(.4,2,.6,1)",
                zIndex: 10,
              }}
            >
              <a
                href="#"
                className="dropdown-item"
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  padding: "9px 20px",
                  color: "var(--main-text)",
                  textDecoration: "none",
                  display: "block",
                  border: "none",
                  transition: "background 0.18s",
                }}
                onClick={() => {
                  handleThemeChange("light");
                  setOpenDropdown(null);
                }}
              >
                {t("light_theme_label")}
              </a>
              <a
                href="#"
                className="dropdown-item"
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  padding: "9px 20px",
                  color: "var(--main-text)",
                  textDecoration: "none",
                  display: "block",
                  border: "none",
                  transition: "background 0.18s",
                }}
                onClick={() => {
                  handleThemeChange("dark");
                  setOpenDropdown(null);
                }}
              >
                {t("dark_theme_label")}
              </a>
            </div>
          </div>

          <div
            className="dropdown account-dropdown"
            style={{ position: "relative", display: "inline-block" }}
          >
            <button
              className="dropdown-toggle account-toggle"
              onClick={() => toggleDropdown("account")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontWeight: 600,
                fontSize: 16,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "6px 10px",
                borderRadius: 8,
                transition: "background 0.2s",
                position: "relative",
                zIndex: 2,
              }}
            >
              <img
                src={currentTheme === "dark" ? whiteUser : blackUser}
                alt="User"
                className="header-icon"
              />
              <span className="user-text">
                {isAuthenticated
                  ? currentUser.name || currentUser.email
                  : t("guest_label")}
              </span>
              <span
                className="arrow-down"
                style={{ fontSize: 14, marginLeft: 2 }}
              >
                ▼
              </span>
            </button>
            <div
              className="dropdown-menu account-dropdown-menu"
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                left: 0,
                minWidth: 170,
                background: "var(--dropdown-bg)",
                boxShadow: "0 6px 24px rgba(0,0,0,0.13)",
                borderRadius: 12,
                padding: "12px 0",
                opacity: openDropdown === "account" ? 1 : 0,
                pointerEvents: openDropdown === "account" ? "auto" : "none",
                transform:
                  openDropdown === "account"
                    ? "translateY(0)"
                    : "translateY(-12px)",
                transition:
                  "opacity 0.22s cubic-bezier(.4,2,.6,1), transform 0.22s cubic-bezier(.4,2,.6,1)",
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
                      transition: "background 0.18s",
                      border: "none",
                    }}
                  >
                    {" "}
                    {t("my_account_label")}{" "}
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
                      transition: "background 0.18s",
                      border: "none",
                    }}
                  >
                    {" "}
                    {t("menu_my_orders")}{" "}
                  </Link>

                  {/* Mục chuyển vai trò */}
                  {currentUser?.role?.toLowerCase() === "admin" ? (
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
                        transition: "background 0.18s",
                      }}
                    >
                      Giao diện quản trị
                    </Link>
                  ) : (
                    <div
                      className="dropdown-item"
                      onClick={() => {
                        if (currentUser?.role?.toLowerCase() === "seller") {
                          window.location.href = "/seller/dashboard";
                        } else {
                          alert(
                            "Bạn không có quyền truy cập giao diện người bán."
                          );
                        }
                      }}
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        padding: "10px 22px",
                        color: "var(--main-text)",
                        textDecoration: "none",
                        display: "block",
                        transition: "background 0.18s",
                        cursor: "pointer",
                      }}
                    >
                      Giao diện người bán
                    </div>
                  )}

                  <a
                    href="#"
                    onClick={logout}
                    className="dropdown-item"
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      padding: "10px 22px",
                      color: "var(--main-text)",
                      textDecoration: "none",
                      display: "block",
                      transition: "background 0.18s",
                      border: "none",
                    }}
                  >
                    {" "}
                    {t("logout_label")}{" "}
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
                      transition: "background 0.18s",
                      border: "none",
                    }}
                  >
                    {" "}
                    {t("login_label")}{" "}
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
                      transition: "background 0.18s",
                      border: "none",
                    }}
                  >
                    {" "}
                    {t("register_label")}{" "}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
