import React from "react";
import { useSearchParams, Link } from "react-router-dom";

// Import file CSS thuần
import "./css/PaymentFailPage.css";

// Icon "X" đơn giản bằng SVG, không thay đổi
const ErrorIcon = () => (
  <svg
    className="error-icon" // Sử dụng class từ file CSS
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);

export default function PaymentFailPage() {
  const [searchParams] = useSearchParams();
  const error = searchParams.get("error") || "Giao dịch không thể hoàn tất.";
  const orderId = searchParams.get("orderId") || "Không xác định";

  return (
    <div className="payment-fail-container">
      <div className="payment-fail-card">
        <ErrorIcon />
        <h1 className="card-title">
          Giao dịch thất bại
        </h1>
        <p className="card-description">
          Rất tiếc, đã có sự cố trong quá trình thanh toán.
        </p>
        
        <div className="error-details">
          <p>
            Mã đơn hàng: <span className="order-id">{orderId}</span>
          </p>
          <p>
            <span className="label">Chi tiết lỗi:</span> {decodeURIComponent(error)}
          </p>
        </div>
        
        <Link to="/checkout" className="btn btn-retry">
          Thử lại thanh toán
        </Link>
        <Link to="/" className="link-home">
          Quay về trang chủ
        </Link>
      </div>
    </div>
  );
}