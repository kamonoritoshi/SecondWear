// src/components/OrderRatePieChart.jsx
import React from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import "./css/ChartCommon.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF4D4F", "#8884d8"];

export default function OrderRatePieChart({ data }) {
  return (
    <div className="chart-container">
      <h3>Tỷ lệ trạng thái đơn hàng</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="count"
            nameKey="status"
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
