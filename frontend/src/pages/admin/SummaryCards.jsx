// src/components/SummaryCards.jsx
import React from "react";
import "./css/SummaryCards.css";

export default function SummaryCards() {
  const cards = [
    { title: "Tổng đơn hàng", value: 128 },
    { title: "Đơn đang xử lý", value: 24 },
    { title: "Đã giao", value: 92 },
    { title: "Hủy", value: 12 },
  ];

  return (
    <div className="summary-container">
      {cards.map((card, index) => (
        <div className="summary-card" key={index}>
          <div className="summary-title">{card.title}</div>
          <div className="summary-value">{card.value}</div>
        </div>
      ))}
    </div>
  );
}
