import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "./css/Statistics.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Statistics() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setChartData({
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Doanh thu (VND)",
            data: [5000000, 7000000, 8000000, 6500000, 9000000, 12000000],
            backgroundColor: "rgba(0, 123, 255, 0.7)",
            borderRadius: 6
          },
          {
            label: "Số đơn hàng",
            data: [50, 65, 70, 60, 80, 100],
            backgroundColor: "rgba(40, 167, 69, 0.7)",
            borderRadius: 6
          }
        ]
      });
    }, 1000);
  }, []);

  return (
    <div className="statistics-container">
      <h1>Thống kê doanh thu và đơn hàng</h1>
      {chartData ? (
        <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: "bottom" } } }} />
      ) : (
        <p>Đang tải biểu đồ...</p>
      )}
    </div>
  );
}
