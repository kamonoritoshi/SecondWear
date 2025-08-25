import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './AdminSidebar.css';

export default function AdminSidebar() {
  const [openSections, setOpenSections] = useState({
    users: true,
    products: true,
    orders: true,
    finance: false,
    others: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <nav className="admin-sidebar">
      <ul>
        <li>
          <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
            Tổng quan
          </NavLink>
        </li>

        {/* --- Quản lý người dùng --- */}
        <li className="sidebar-section" onClick={() => toggleSection('users')}>
          ▶ Quản lý người dùng
        </li>
        {openSections.users && (
          <>
            <li>
              <NavLink to="/admin/accounts" className={({ isActive }) => isActive ? 'active' : ''}>
                Tài khoản người dùng
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/seller-requests" className={({ isActive }) => isActive ? 'active' : ''}>
                Yêu cầu người bán
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/sellers" className={({ isActive }) => isActive ? 'active' : ''}>
                Danh sách người bán
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/customers" className={({ isActive }) => isActive ? 'active' : ''}>
                Danh sách khách hàng
              </NavLink>
            </li>
          </>
        )}

        {/* --- Quản lý sản phẩm --- */}
        <li className="sidebar-section" onClick={() => toggleSection('products')}>
          ▶ Quản lý sản phẩm
        </li>
        {openSections.products && (
          <>
            <li>
              <NavLink to="/admin/products/pending" className={({ isActive }) => isActive ? 'active' : ''}>
                Phê duyệt sản phẩm
              </NavLink>
            </li>
          </>
        )}

        {/* --- Quản lý đơn hàng --- */}
        <li className="sidebar-section" onClick={() => toggleSection('orders')}>
          ▶ Quản lý đơn hàng
        </li>
        {openSections.orders && (
          <>
            <li>
              <NavLink to="/admin/orders" className={({ isActive }) => isActive ? 'active' : ''}>
                Danh sách đơn hàng
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/disputes" className={({ isActive }) => isActive ? 'active' : ''}>
                Đơn hàng hoàn trả
              </NavLink>
            </li>
          </>
        )}

        {/* --- Tài chính & Ưu đãi --- */}
        <li className="sidebar-section" onClick={() => toggleSection('finance')}>
          ▶ Tài chính & Ưu đãi
        </li>
        {openSections.finance && (
          <>
            <li>
              <NavLink to="/admin/commission" className={({ isActive }) => isActive ? 'active' : ''}>
                Thiết lập hoa hồng
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/transactions" className={({ isActive }) => isActive ? 'active' : ''}>
                Giao dịch
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/vouchers" className={({ isActive }) => isActive ? 'active' : ''}>
                Mã giảm giá
              </NavLink>
            </li>
          </>
        )}

        {/* --- Khác --- */}
        <li className="sidebar-section" onClick={() => toggleSection('others')}>
          ▶ Khác
        </li>
        {openSections.others && (
          <>
            <li>
              <NavLink to="/admin/notifications" className={({ isActive }) => isActive ? 'active' : ''}>
                Thông báo hệ thống
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/reports" className={({ isActive }) => isActive ? 'active' : ''}>
                Báo cáo & Phân tích
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/support" className={({ isActive }) => isActive ? 'active' : ''}>
                Trung tâm hỗ trợ
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
