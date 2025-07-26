import { useRef, useEffect } from "react";
import { Bar } from "react-chartjs-2";

export default function RevenueChart({ data, isDark }) {
  const chartRef = useRef();
  console.log("🟢 RevenueChart - isDark:", isDark);

  useEffect(() => {
    if (chartRef.current) {
      console.log("🔁 Calling chartRef.current.update()");
      chartRef.current.update(); // Force re-render
    }
  }, [isDark]);

  const labels = data.map(item => item.month || item.week);
  const revenues = data.map(item => item.totalRevenue);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Doanh thu (VND)",
        data: revenues,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: isDark ? "#fff" : "#000",
        },
      },
      title: {
        display: true,
        text: "Biểu đồ doanh thu",
        color: isDark ? "#fff" : "#000",
      },
    },
    scales: {
      x: {
        ticks: { color: isDark ? "#fff" : "#000" },
        grid: { color: isDark ? "#444" : "#ccc" },
      },
      y: {
        ticks: { color: isDark ? "#fff" : "#000" },
        grid: { color: isDark ? "#444" : "#ccc" },
      },
    },
  };

  return <Bar ref={chartRef} data={chartData} options={chartOptions} />;
}
