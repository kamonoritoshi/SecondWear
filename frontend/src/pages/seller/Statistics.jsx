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
import axios from "axios";
import "./css/Statistics.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Statistics() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    };

    axios.get("/api/seller/statistics/monthly", { headers })
      .then((res) => {
        const data = res.data;

        const labels = data.map(item => `Tháng ${item.month}`);
        const revenueData = data.map(item => item.revenue);
        const orderData = data.map(item => item.orderCount);

        setChartData({
          labels,
          datasets: [
            {
              label: "Doanh thu (VND)",
              data: revenueData,
              backgroundColor: "rgba(0, 123, 255, 0.7)",
              borderRadius: 6,
              yAxisID: "y1", // 👈 trục doanh thu
            },
            {
              label: "Số đơn hàng",
              data: orderData,
              backgroundColor: "rgba(40, 167, 69, 0.7)",
              borderRadius: 6,
              yAxisID: "y2", // 👈 trục số lượng
            }
          ]
        });
      })
      .catch((err) => {
        console.error("❌ Lỗi lấy thống kê:", err);
      });
  }, []);

  return (
    <div className="statistics-container">
      <h1>📈 THỐNG KÊ DOANH THU & ĐƠN HÀNG THEO THÁNG</h1>
      {chartData ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: "bottom" },
              title: { display: false },
            },
            scales: {
              y1: {
                type: "linear",
                position: "left",
                beginAtZero: true,
                ticks: {
                  callback: (value) => value.toLocaleString("vi-VN") + " đ",
                },
                title: {
                  display: true,
                  text: "Doanh thu (VND)",
                },
              },
              y2: {
                type: "linear",
                position: "right",
                beginAtZero: true,
                grid: {
                  drawOnChartArea: false, // ❌ Không kẻ lại lưới dọc
                },
                title: {
                  display: true,
                  text: "Số đơn hàng",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Tháng",
                },
              },
            },
          }}
        />
      ) : (
        <p>Đang tải dữ liệu...</p>
      )}
    </div>
  );
}
