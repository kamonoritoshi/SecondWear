import React from 'react';
import Header from '../components/Header'; // Header cũ
import { Outlet } from 'react-router-dom';

const CustomerLayout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

export default CustomerLayout;
