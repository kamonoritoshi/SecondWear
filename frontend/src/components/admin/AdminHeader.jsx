import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./AdminHeader.css";
import { useNavigate } from "react-router-dom";

export default function AdminHeader() {
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navigate = useNavigate();

  const handleSwitchToCustomer = () => {
    navigate("/");
  };

  return (
    <header className="admin-header">
      <h2>Trang quản trị</h2>
      <div className="admin-header-right">
        <span className="seller-name">Xin chào, {currentUser?.name}</span>
        <button onClick={handleSwitchToCustomer} className="switch-btn">
          Về giao diện người mua
        </button>
        <button onClick={handleLogout}>Đăng xuất</button>
      </div>
    </header>
  );
}
