import React, { useEffect, useState } from "react";
import SummaryCards from "./SummaryCards";
import RevenueChart from "./RevenueChart";
import OrderTable from "./OrderTable"; // Bạn có thể tái sử dụng file seller
import "./css/Dashboard.css";
import axios from "axios";

export default function Dashboard() {
  const [summary, setSummary] = useState({
    totalAccounts: 0,
    totalSellers: 0,
    totalRevenue: 0,
    totalOrders: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    // Lấy dữ liệu thống kê
    axios
      .get("/api/admin/statistics", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => {
        setSummary(res.data);
      })
      .catch((err) => console.error("Lỗi lấy thống kê:", err));

    // Lấy đơn hàng gần đây
    axios
      .get("/api/admin/orders/recent", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => {
        console.log("Recent orders:", res.data);
        setRecentOrders(res.data);
      })
      .catch((err) => console.error("Lỗi lấy đơn hàng:", err));
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <SummaryCards
        totalAccounts={summary.totalAccounts}
        totalSellers={summary.totalSellers}
        totalRevenue={summary.totalRevenue}
        totalOrders={summary.totalOrders}
      />

      <div className="dashboard-section">
        <h3>Thống kê doanh thu</h3>
        <RevenueChart revenue={summary.totalRevenue} />
      </div>

      <div className="dashboard-section">
        <h3>Đơn hàng gần đây</h3>
        <OrderTable orders={recentOrders} />
      </div>
    </div>
  );
}
