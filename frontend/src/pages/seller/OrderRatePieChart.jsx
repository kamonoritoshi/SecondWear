import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Màu tương ứng với trạng thái
const COLORS = ["#4caf50", "#ff9800", "#f44336", "#2196f3"];

export default function OrderRatePieChart({ data, isDark }) {
  console.log("🟡 OrderRatePieChart - isDark:", isDark);
  const tooltipStyle = {
    backgroundColor: isDark ? "#2e2e2e" : "#fff",
    border: isDark ? "1px solid #444" : "1px solid #ccc",
    color: isDark ? "#fff" : "#000",
  };

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="status"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} />
          <Legend
            wrapperStyle={{
              color: isDark ? "#ddd" : "#000",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
