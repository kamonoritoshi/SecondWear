import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./css/SuccessPage.css";

export default function SuccessPage() {
  const location = useLocation();
  const orderInfo = location.state || {};

  return (
    <div className="success-container">
      <div className="success-icon">✅</div>
      <h1 className="success-title">Đặt hàng thành công!</h1>
      <p className="success-message">
        Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.
      </p>

      <div className="order-info">
        <p><strong>Mã đơn hàng:</strong> {orderInfo.orderCode || 'Không xác định'}</p>
        <p><strong>Phương thức thanh toán:</strong> {orderInfo.paymentMethod || 'COD'}</p>
        <p><strong>Tổng tiền:</strong> {orderInfo.totalAmount ? orderInfo.totalAmount.toLocaleString('vi-VN') + ' ₫' : '---'}</p>
      </div>

      <div className="success-buttons">
        <Link to="/" className="btn btn-primary">Về trang chủ</Link>
        <Link to="/orders" className="btn btn-secondary">Xem đơn hàng</Link>
      </div>
    </div>
  );
}
