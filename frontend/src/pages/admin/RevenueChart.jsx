// src/components/RevenueChart.jsx
import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import "./css/RevenueChart.css";

export default function RevenueChart({ data }) {
  const totalRevenue = data.reduce((sum, item) => sum + (item.totalRevenue || 0), 0);

  return (
    <div className="chart-container">
      <h3>Biểu đồ doanh thu</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => `${(value / 1_000_000)}tr`} />
          <Tooltip formatter={(value) => `${value.toLocaleString()}₫`} />
          <Bar dataKey="totalRevenue" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>

      <div className="chart-total">
        Tổng doanh thu: <strong>{totalRevenue.toLocaleString()}₫</strong>
      </div>
    </div>
  );
}
