import React from "react";
import "./css/SummaryCards.css"; // <-- import CSS thuần

const SummaryCards = ({ totalProducts, totalOrders, totalRevenue, processingOrders }) => {
  return (
    <div className="summary-container">
      <div className="summary-card">
        <h4 className="summary-title">Tổng sản phẩm</h4>
        <p className="summary-value">{totalProducts}</p>
      </div>
      <div className="summary-card">
        <h4 className="summary-title">Tổng đơn hàng</h4>
        <p className="summary-value">{totalOrders}</p>
      </div>
      <div className="summary-card">
        <h4 className="summary-title">Tổng doanh thu</h4>
        <p className="summary-value">{totalRevenue.toLocaleString()} đ</p>
      </div>
      <div className="summary-card">
        <h4 className="summary-title">Đơn đang xử lý</h4>
        <p className="summary-value">{processingOrders}</p>
      </div>
    </div>
  );
};

export default SummaryCards;
