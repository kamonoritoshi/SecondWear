import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import "./css/Dashboard.css";

// Đăng ký ChartJS modules cho Bar Chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    pendingOrders: 0,
    revenueToday: 0,
    unreadMessages: 0
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setStats({
        products: 15,
        pendingOrders: 3,
        revenueToday: 1250000,
        unreadMessages: 5
      });

      setRecentOrders([
        { id: 101, customer: "Nguyễn Văn A", status: "Chờ xử lý", total: 250000 },
        { id: 102, customer: "Trần Thị B", status: "Đang vận chuyển", total: 500000 },
        { id: 103, customer: "Lê Văn C", status: "Giao thành công", total: 750000 }
      ]);

      // Dữ liệu giả cho Bar Chart
      setChartData({
        labels: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
        datasets: [
          {
            label: "Doanh thu (VND)",
            data: [500000, 800000, 700000, 1200000, 1500000, 1000000, 2000000],
            backgroundColor: "rgba(0, 123, 255, 0.7)",
            borderRadius: 6
          }
        ]
      });
    }, 1000);
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      {/* Cards */}
      <div className="dashboard-cards">
        <div className="card"><h3>Sản phẩm</h3><span>{stats.products}</span></div>
        <div className="card"><h3>Đơn hàng chờ</h3><span>{stats.pendingOrders}</span></div>
        <div className="card"><h3>Doanh thu hôm nay</h3><span>{stats.revenueToday.toLocaleString()} VND</span></div>
        <div className="card"><h3>Tin nhắn mới</h3><span>{stats.unreadMessages}</span></div>
      </div>

      {/* Biểu đồ Bar */}
      <div className="dashboard-chart">
        <h2>Biểu đồ doanh thu 7 ngày gần đây</h2>
        {chartData ? (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: true, position: "bottom" },
                title: { display: false }
              },
              scales: {
                y: {
                  ticks: {
                    callback: (value) => value.toLocaleString() + " VND"
                  }
                }
              }
            }}
          />
        ) : (
          <p>Đang tải biểu đồ...</p>
        )}
      </div>

      {/* Đơn hàng gần đây */}
      <div className="dashboard-section">
        <h2>Đơn hàng gần đây</h2>
        {recentOrders.length === 0 ? (
          <p>Đang tải dữ liệu...</p>
        ) : (
          <table className="recent-orders">
            <thead>
              <tr>
                <th>Mã ĐH</th>
                <th>Khách hàng</th>
                <th>Trạng thái</th>
                <th>Tổng tiền</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.status}</td>
                  <td>{order.total.toLocaleString()} VND</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

