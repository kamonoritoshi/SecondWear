import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import "./css/SalesChart.css";

const SalesChart = ({ orders }) => {
  const chartData = useMemo(() => {
    const statusCount = {};
    orders.forEach((order) => {
      order.items.forEach((item) => {
        const status = item.status || "Không xác định";
        statusCount[status] = (statusCount[status] || 0) + 1;
      });
    });

    return Object.entries(statusCount).map(([status, count]) => ({
      status,
      count,
    }));
  }, [orders]);

  return (
    <div className="sales-chart-container">
      <h3>Thống kê trạng thái đơn hàng</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="status" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#4F46E5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
