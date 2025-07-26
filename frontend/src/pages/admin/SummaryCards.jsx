import React from "react";
import { FiTrendingUp } from "react-icons/fi";
import "./css/SummaryCards.css";

export default function SummaryCards({ statistics }) {
  const cards = [
    {
      title: "Tổng doanh thu",
      value: statistics.monthRevenue.toLocaleString("vi-VN") + " VNĐ",
      description: "Tăng trưởng mạnh tháng này",
      subtext: "So với tháng trước",
      growth: "+15.2%",
      color: "#d1f7d6", // xanh lá nhạt
      textColor: "#2e7d32",
    },
    {
      title: "Sản phẩm bán chạy",
      value: "Tôn lạnh Pomina",
      description: "1,250 tấn đã bán",
      subtext: "Dẫn đầu về doanh số",
      growth: "+28%",
      color: "#e3f2fd", // xanh dương nhạt
      textColor: "#1565c0",
    },
    {
      title: "Khách hàng mới",
      value: "186",
      description: "Tăng trưởng ổn định",
      subtext: "Khách hàng tiềm năng tốt",
      growth: "+22%",
      color: "#f3e5f5", // tím nhạt
      textColor: "#6a1b9a",
    },
    {
      title: "Tỷ lệ tăng trưởng",
      value: "12.8%",
      description: "Vượt mục tiêu đề ra",
      subtext: "Hiệu suất kinh doanh tốt",
      growth: "+8.2%",
      color: "#fff3e0", // cam nhạt
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
