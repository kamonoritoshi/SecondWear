import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="seller-dashboard">
      <h1>Dashboard Người Bán</h1>
      <div className="stats">
        <div>Đơn hàng: 50</div>
        <div>Doanh thu: 10,000,000 VND</div>
      </div>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Mã đơn</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#001</td>
            <td>Đang xử lý</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;