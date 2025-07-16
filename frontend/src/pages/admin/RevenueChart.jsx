// src/components/RevenueChart.jsx
import React from "react";
import "./css/RevenueChart.css";

export default function RevenueChart({ revenue }) {
  return (
    <div className="chart-container">
      <h3>Biểu đồ doanh thu</h3>
      <div className="chart-placeholder">
        Tổng doanh thu: <strong>{revenue.toLocaleString()}₫</strong>
      </div>
    </div>
  );
}
