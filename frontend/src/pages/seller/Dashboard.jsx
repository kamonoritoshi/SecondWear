import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import RevenueChart from "./RevenueChart";
import OrderRatePieChart from "./OrderRatePieChart";
import "./css/Dashboard.css";
import axios from "axios";

export default function SellerDashboard() {
  const { currentTheme } = useOutletContext();
  const isDark = currentTheme === "dark";
  console.log("🟢 SellerDashboard - isDark:", isDark);

  const [dashboardData, setDashboardData] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    todayRevenue: 0,
    thisWeekRevenue: 0,
    thisMonthRevenue: 0,
  });

  const [revenueByWeek, setRevenueByWeek] = useState([]);
  const [orderRates, setOrderRates] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    };

    const fetchData = async () => {
      try {
        const [dashboardRes, recentRes, weekRes, rateRes] = await Promise.all([
          axios.get("/api/seller/orders/dashboard", { headers }),
          axios.get("/api/seller/orders/recent", { headers }),
          axios.get("/api/seller/orders/revenue/weekly", { headers }),
          axios.get("/api/seller/orders/rate", { headers }),
        ]);

        setDashboardData(dashboardRes.data);
        setRecentOrders(Array.isArray(recentRes.data) ? recentRes.data : []);
        setRevenueByWeek(
          Array.isArray(weekRes.data)
            ? weekRes.data.map((item) => ({
                week: item.week,
                totalRevenue: item.totalRevenue,
              }))
            : []
        );
        setOrderRates(Array.isArray(rateRes.data) ? rateRes.data : []);
      } catch (err) {
        console.error("❌ Lỗi khi tải dashboard:", err);
      }
    };

    fetchData();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "Hoàn thành":
        return "status status-success";
      case "Hủy":
        return "status status-danger";
      case "Đang xử lý":
        return "status status-warning";
      case "Đã giao":
        return "status status-info";
      default:
        return "status";
    }
  };

  return (
    <div className="seller-dashboard">
      <h2>📊 THỐNG KÊ NGƯỜI BÁN</h2>

      <div className="summary-cards">
        <div className="card">
          <h4>Tổng đơn hàng</h4>
          <p>{dashboardData.totalOrders}</p>
        </div>
        <div className="card">
          <h4>Tổng doanh thu</h4>
          <p>{dashboardData.totalRevenue.toLocaleString()} VND</p>
        </div>
        <div className="card">
          <h4>Hôm nay</h4>
          <p>{dashboardData.todayRevenue.toLocaleString()} VND</p>
        </div>
        <div className="card">
          <h4>Tháng này</h4>
          <p>{dashboardData.thisMonthRevenue.toLocaleString()} VND</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-section">
          <h3>Doanh thu theo tuần</h3>
          <RevenueChart
            key={isDark ? "dark" : "light"}
            data={revenueByWeek}
            isDark={isDark}
          />
        </div>
        <div className="dashboard-section">
          <h3>Tỷ lệ đơn hàng</h3>
          <OrderRatePieChart
            key={isDark ? "dark" : "light"}
            data={orderRates}
            isDark={isDark}
          />
        </div>
      </div>

      <div className="dashboard-section full-width">
        <h3>Đơn hàng gần đây</h3>
        <div className="table-responsive">
          <table className="order-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Khách hàng</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Ngày đặt</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <tr key={order.orderId}>
                    <td data-label="ID">{order.orderId}</td>
                    <td data-label="Khách hàng">{order.customerName}</td>
                    <td data-label="Tổng tiền">
                      {order.totalAmount.toLocaleString()} VND
                    </td>
                    <td data-label="Trạng thái">
                      <span className={getStatusClass(order.status)}>
                        {order.status}
                      </span>
                    </td>
                    <td data-label="Ngày đặt">
                      {new Date(order.orderDate).toLocaleDateString("vi-VN")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    Không có đơn hàng nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
