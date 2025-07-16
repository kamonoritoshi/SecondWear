import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminSidebar.css';

export default function AdminSidebar() {
  return (
    <nav className="admin-sidebar">
      <ul>
        <li>
          <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/accounts" className={({ isActive }) => isActive ? 'active' : ''}>
            Quản lý tài khoản
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/orders" className={({ isActive }) => isActive ? 'active' : ''}>
            Quản lý đơn hàng
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
