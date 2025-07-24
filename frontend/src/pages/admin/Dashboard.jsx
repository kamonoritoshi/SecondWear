import React, { useEffect, useState } from "react";
import SummaryCards from "./SummaryCards";
import RevenueChart from "./RevenueChart";
import SellerRegisterChart from "./SellerRegisterChart";
import OrderRatePieChart from "./OrderRatePieChart";
import OrderTable from "./OrderTable";
import "./css/Dashboard.css";
import axios from "axios";

export default function Dashboard() {
  const [statistics, setStatistics] = useState({
    totalAccounts: 1050,
    totalSellers: 120,
    totalOrders: 340,
    todayRevenue: 520000,
    monthRevenue: 8500000,
  });

  const [revenueByMonth, setRevenueByMonth] = useState([
    { month: "01", totalRevenue: 1000000 },
    { month: "02", totalRevenue: 1500000 },
    { month: "03", totalRevenue: 1200000 },
    { month: "04", totalRevenue: 1800000 },
    { month: "05", totalRevenue: 2200000 },
    { month: "06", totalRevenue: 2000000 },
    { month: "07", totalRevenue: 2400000 },
  ]);

  const [orderRates, setOrderRates] = useState([
    { status: "Hoàn thành", count: 55 },
    { status: "Đang xử lý", count: 25 },
    { status: "Hủy", count: 10 },
    { status: "Đã giao", count: 10 },
  ]);

  const [recentOrders, setRecentOrders] = useState([
    {
      id: 101,
      customerName: "Nguyễn Văn A",
      totalAmount: 150000,
      status: "Hoàn thành",
      createdAt: "2025-07-23T10:20:00",
    },
    {
      id: 102,
      customerName: "Trần Thị B",
      totalAmount: 350000,
      status: "Đang xử lý",
      createdAt: "2025-07-23T12:40:00",
    },
    {
      id: 103,
      customerName: "Lê Văn C",
      totalAmount: 120000,
      status: "Đã giao",
      createdAt: "2025-07-22T16:15:00",
    },
    {
      id: 104,
      customerName: "Phạm Thị D",
      totalAmount: 180000,
      status: "Hủy",
      createdAt: "2025-07-21T09:30:00",
    },
  ]);

  useEffect(() => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    };

    axios
      .get("/api/admin/statistics", { headers })
      .then((res) => {
        console.log("✅ Thống kê:", res.data);
        setStatistics(res.data);
      })
      .catch((err) => {
        console.error("❌ Lỗi lấy thống kê:", err);
        if (err.response) console.error("↳ Response:", err.response);
      });

    axios
      .get("/api/admin/revenue/monthly", { headers })
      .then((res) => {
        console.log("✅ Doanh thu theo tháng:", res.data);
        setRevenueByMonth(res.data);
      })
      .catch((err) => {
        console.error("❌ Lỗi lấy doanh thu theo tháng:", err);
        if (err.response) console.error("↳ Response:", err.response);
      });

    axios
      .get("/api/admin/orders/rate", { headers })
      .then((res) => {
        console.log("✅ Tỷ lệ đơn hàng:", res.data);
        setOrderRates(res.data);
      })
      .catch((err) => {
        console.error("❌ Lỗi lấy tỷ lệ đơn hàng:", err);
        if (err.response) console.error("↳ Response:", err.response);
      });

    axios
      .get("/api/admin/orders/recent", { headers })
      .then((res) => {
        console.log("✅ Đơn hàng gần đây:", res.data);
        setRecentOrders(res.data);
      })
      .catch((err) => {
        console.error("❌ Lỗi lấy đơn hàng gần đây:", err);
        if (err.response) console.error("↳ Response:", err.response);
      });
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>📊 Thống kê tổng quan</h2>

      {statistics ? (
        <SummaryCards statistics={statistics} />
      ) : (
        <p>Đang tải thống kê...</p>
      )}

      <div className="dashboard-grid">
        <div className="dashboard-section">
          <h3>Doanh thu theo tháng</h3>
          <RevenueChart data={revenueByMonth} />
        </div>

        <div className="dashboard-section">
          <h3>Tỷ lệ đơn hàng</h3>
          <OrderRatePieChart data={orderRates} />
        </div>
      </div>

      <div className="dashboard-section full-width">
        <h3>Đơn hàng gần đây</h3>
        <OrderTable orders={recentOrders} />
      </div>
    </div>
  );
}
