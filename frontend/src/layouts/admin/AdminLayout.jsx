import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminSidebar from '../../components/admin/AdminSidebar';
import './AdminLayout.css'; // Nếu muốn style riêng

const AdminLayout = () => {
  return (
    <div className="admin-layout" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AdminHeader />
      <div style={{ display: 'flex', flex: 1 }}>
        <AdminSidebar />
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
