import React from "react";
import { FiTrendingUp } from "react-icons/fi";
import "./css/SummaryCards.css";

export default function SummaryCards({ statistics }) {
  const cards = [
    {
      title: "Tổng doanh thu tháng",
      value: statistics?.monthRevenue?.toLocaleString("vi-VN") + " VNĐ",
      description: "Tăng trưởng so với tháng trước",
      subtext: "So với tháng trước",
      growth:
        (statistics?.growthRate?.growth > 0 ? "+" : "") +
        statistics?.growthRate?.growth +
        "%",
      color: "#d1f7d6",
      textColor: "#2e7d32",
    },
    {
      title: "Sản phẩm bán chạy",
      value: statistics?.topSellingProduct?.name || "Không có dữ liệu",
      description:
        statistics?.topSellingProduct?.soldQuantity +
          " " +
          statistics?.topSellingProduct?.unit || "",
      subtext: "Dẫn đầu về doanh số",
      growth:
        (statistics?.topSellingProduct?.growth > 0 ? "+" : "") +
        statistics?.topSellingProduct?.growth +
        "%",
      color: "#e3f2fd",
      textColor: "#1565c0",
    },
    {
      title: "Khách hàng mới",
      value: statistics?.newCustomers?.count?.toLocaleString("vi-VN") || "0",
      description: "Tăng trưởng khách hàng mới",
      subtext: "Trong tháng này",
      growth:
        (statistics?.newCustomers?.growth > 0 ? "+" : "") +
        statistics?.newCustomers?.growth +
        "%",
      color: "#f3e5f5",
      textColor: "#6a1b9a",
    },
    {
      title: "Tỷ lệ tăng trưởng",
      value: (statistics?.growthRate?.value || 0).toLocaleString("vi-VN") + "%",
      description: "So với kỳ trước",
      subtext: "Hiệu suất kinh doanh",
      growth:
        (statistics?.growthRate?.growth > 0 ? "+" : "") +
        statistics?.growthRate?.growth +
        "%",
      color: "#fff3e0",
      textColor: "#ef6c00",
    },
  ];

  return (
    <div className="summary-grid">
      {cards.map((card, i) => (
        <div key={i} className="summary-card-v2">
          <div className="card-header">
            <div className="card-title">{card.title}</div>
            <div
              className="growth-tag"
              style={{ backgroundColor: card.color, color: card.textColor }}
            >
              <FiTrendingUp style={{ marginRight: 4 }} />
              {card.growth}
            </div>
          </div>
          <div className="card-value">{card.value}</div>
          <div className="card-desc">{card.description}</div>
          <div className="card-subtext">{card.subtext}</div>
        </div>
      ))}
    </div>
  );
}
