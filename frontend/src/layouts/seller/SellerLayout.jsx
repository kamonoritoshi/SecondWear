import React from 'react';
import { Outlet } from 'react-router-dom';
import SideMenu from '../../components/seller/SideMenu';
import './SellerLayout.css'; // optional nếu bạn muốn style
import Header from '../../components/seller/Header';

const SellerLayout = ({ currentTheme }) => {
  console.log("🟢 SellerLayout - currentTheme:", currentTheme);
  return (
    <div className="seller-layout" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <SideMenu />
        <div className="main-content" style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          <Outlet context={{ currentTheme }} />
        </div>
      </div>
    </div>
  );
};

export default SellerLayout;
