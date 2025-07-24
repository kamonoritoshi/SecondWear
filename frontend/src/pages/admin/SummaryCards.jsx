import React from "react";
import "./css/SummaryCards.css";

export default function SummaryCards({ statistics }) {
  const {
    totalAccounts = 0,
    totalSellers = 0,
    totalOrders = 0,
    todayRevenue = 0,
    monthRevenue = 0,
    totalRevenue = 0,
  } = statistics || {};

  const cards = [
    { title: "Tổng tài khoản", value: totalAccounts },
    { title: "Tổng người bán", value: totalSellers },
    { title: "Tổng đơn hàng", value: totalOrders },
    { title: "Doanh thu hôm nay", value: `${todayRevenue.toLocaleString()} đ` },
    { title: "Doanh thu tháng", value: `${monthRevenue.toLocaleString()} đ` },
    { title: "Tổng doanh thu", value: `${totalRevenue.toLocaleString()} đ` },
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
