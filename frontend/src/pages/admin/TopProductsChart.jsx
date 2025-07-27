// src/components/TopProductsChart.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import "./css/TopProductsChart.css";

export default function TopProductsChart({ data }) {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, totalSold } = payload[0].payload;
      return (
        <div
          style={{
            background: "#fff",
            border: "1px solid #ccc",
            padding: "10px",
            fontSize: 14,
          }}
        >
          <strong>{name}</strong>
          <div style={{ color: "green" }}>Đã bán: {totalSold} sản phẩm</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis type="number" />
          <YAxis
            type="category"
            dataKey="productName"
            width={180}
            tick={{ fontSize: 13 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <defs>
            <linearGradient id="barColor" x1="0" y1="0" x2="1" y2="0">
              <stop offset="5%" stopColor="#4CAF50" />
              <stop offset="95%" stopColor="#81C784" />
            </linearGradient>
          </defs>
          <Bar dataKey="totalSold" fill="url(#barColor)" barSize={20}>
            <LabelList dataKey="totalSold" position="right" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
