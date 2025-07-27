// src/components/RevenueChart.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./css/RevenueChart.css";

export default function RevenueChart({ data }) {
  const totalRevenue = data.reduce(
    (sum, item) => sum + (item.totalRevenue || 0),
    0
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const revenue = payload[0].value.toLocaleString() + "₫";
      return (
        <div
          style={{
            backgroundColor: "white",
            padding: "10px 14px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <p style={{ margin: 0, fontWeight: "bold" }}>Tháng {label}</p>
          <p style={{ margin: 0, color: "#4CAF50" }}>Doanh thu: {revenue}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tickFormatter={(month) => `Tháng ${month}`} />
          <YAxis tickFormatter={(value) => `${value / 1_000_000}tr`} />
          <Tooltip content={<CustomTooltip />} />
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={1} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.5} />
            </linearGradient>
          </defs>
          <Bar
            dataKey="totalRevenue"
            fill="url(#colorRevenue)"
            animationDuration={1000}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="chart-total">
        Tổng doanh thu: <strong>{totalRevenue.toLocaleString()}₫</strong>
      </div>
    </div>
  );
}
