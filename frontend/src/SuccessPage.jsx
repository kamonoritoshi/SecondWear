import React, { useEffect, useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import "./css/SuccessPage.css";

export default function SuccessPage() {
  const { currentUser } = useAuth();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [orderInfo, setOrderInfo] = useState(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("---");

  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        setLoading(true);
        console.log("OrderId từ URL:", orderId);

        const orderRes = await axios.get(`/api/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const order = orderRes.data;
        setOrderInfo(order);
        console.log("Order Info:", order);

        // Fallback mặc định
        let method = "---";
        let amount = order.total || 0;

        try {
          const paymentRes = await axios.get(`/api/payments/order/${orderId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (paymentRes.data) {
            console.log("Payment Info:", paymentRes.data);
            method = paymentRes.data.method || method;
            amount = paymentRes.data.amount || amount;
          } else {
            console.warn("Không có payment info cho orderId:", orderId);
          }
        } catch (err) {
          console.warn(err);
        }

        setPaymentMethod(method);
        setTotal(amount);

        // Xoá giỏ hàng nếu là COD hoặc VNPAY
        if (["COD", "VNPAY"].includes(method.toUpperCase())) {
          if (currentUser?.email) {
            localStorage.removeItem(`cart_${currentUser.email}`);
          }
        }
      } catch (error) {
        console.error("Lỗi khi tải thông tin đơn hàng:", error);
      } finally {
        setLoading(false);
      }
    };

    if (orderId && token) {
      fetchOrderData();
    }
  }, [orderId, token]);

  return (
    <div className="success-container">
      <div className="success-icon">✅</div>
      <h1 className="success-title">Đặt hàng thành công!</h1>
      <p className="success-message">
        Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.
      </p>

      {loading ? (
        <p>Đang tải thông tin đơn hàng...</p>
      ) : orderInfo ? (
        <div className="order-info">
          <p>
            <strong>Mã đơn hàng:</strong> {orderInfo.orderId || "---"}
          </p>
          <p>
            <strong>Phương thức thanh toán:</strong> {paymentMethod}
          </p>
          <p>
            <strong>Tổng tiền:</strong>{" "}
            {typeof total === "number"
              ? total.toLocaleString("vi-VN") + "₫"
              : "---"}
          </p>
        </div>
      ) : (
        <p>Không tìm thấy thông tin đơn hàng.</p>
      )}

      <div className="success-buttons">
        <Link to="/" className="btn btn-primary">
          Về trang chủ
        </Link>
        <Link to="/orders" className="btn btn-secondary">
          Xem đơn hàng
        </Link>
      </div>
    </div>
  );
}
