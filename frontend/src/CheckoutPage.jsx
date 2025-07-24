import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./css/CheckoutPage.css"; // File CSS tùy chỉnh

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState("cod");
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) return;

    const cartKey = `cart_${currentUser.email}`;
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    setCartItems(cart);
  }, [currentUser]);

  const getToken = () =>
    localStorage.getItem("jwtToken") || localStorage.getItem("jwt");

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Giỏ hàng trống");
      return;
    }

    setIsLoading(true);

    try {
      const token = getToken();
      if (!token) {
        alert("Bạn cần đăng nhập");
        setIsLoading(false);
        return;
      }

      // 1. Tạo đơn hàng
      const orderPayload = {
        status: "Đang xử lý",
        items: cartItems.map((item) => ({
          product: { productId: item.productId },
          quantity: item.quantity,
          status: "Đang xử lý",
        })),
      };

      const orderRes = await axios.post("/api/orders", orderPayload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const order = orderRes.data;

      // 2. Gửi yêu cầu thanh toán đến /api/payments/create
      const paymentRes = await axios.post(
        "/api/payments/create",
        {
          method: selectedMethod.toUpperCase(), // "COD", "PAYOS"
          orderId: order.orderId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const paymentUrl = paymentRes.data.paymentUrl;

      if (selectedMethod === "cod") {
        alert("Đơn hàng của bạn đã được ghi nhận với hình thức COD.");
        localStorage.removeItem(`cart_${currentUser.email}`);

        navigate(`/payment-success?orderId=${order.orderId}`);
      } else if (selectedMethod === "payos" || selectedMethod === "vnpay") {
        window.location.href = paymentUrl; // redirect đến PayOS
      }
    } catch (error) {
      console.error("Lỗi thanh toán:", error);

      if (error.response?.status === 403) {
        alert("Bạn không có quyền thanh toán đơn hàng này.");
      } else if (error.response?.status === 401) {
        alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
      } else {
        alert("Lỗi khi tạo đơn hàng hoặc thanh toán: " + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="checkout-container">
      <h2>Thanh toán</h2>

      <div className="section">
        <h3>Sản phẩm</h3>
        {cartItems.length === 0 ? (
          <p>Giỏ hàng trống.</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.productId} className="cart-item">
                <img
                  src={item.image || "/images/placeholder.png"}
                  alt={item.name}
                  style={{
                    width: 64,
                    height: 64,
                    objectFit: "cover",
                    borderRadius: 8,
                    marginRight: 16,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{item.name}</div>
                  <div style={{ fontSize: 14, color: "#666" }}>
                    Số lượng: {item.quantity} | Giá:{" "}
                    {item.price.toLocaleString()} đ
                  </div>
                </div>
                <div style={{ fontWeight: 500, color: "green" }}>
                  {(item.price * item.quantity).toLocaleString()} đ
                </div>
              </div>
            ))}

            <div
              style={{
                textAlign: "right",
                fontWeight: "bold",
                marginTop: 8,
                fontSize: 16,
              }}
            >
              Tổng cộng: {totalAmount.toLocaleString()} đ
            </div>
          </>
        )}
      </div>

      <div className="section">
        <h3>Phương thức thanh toán</h3>
        <div className="payment-options">
          <label>
            <input
              type="radio"
              value="cod"
              checked={selectedMethod === "cod"}
              onChange={() => setSelectedMethod("cod")}
            />
            <span style={{ marginLeft: "8px" }}>
              Thanh toán khi nhận hàng (COD)
            </span>
          </label>
          <label>
            <input
              type="radio"
              value="payos"
              checked={selectedMethod === "payos"}
              onChange={() => setSelectedMethod("payos")}
            />
            <span style={{ marginLeft: "8px" }}>
              Thanh toán qua PayOS 
            </span>
          </label>
          <label>
            <input
              type="radio"
              value="vnpay"
              checked={selectedMethod === "vnpay"}
              onChange={() => setSelectedMethod("vnpay")}
            />
            <span style={{ marginLeft: "8px" }}>
              Thanh toán qua VNPay
            </span>
          </label>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        disabled={isLoading}
        className="checkout-button"
      >
        {isLoading ? "Đang xử lý..." : "Tiến hành thanh toán"}
      </button>
    </div>
  );
};

export default CheckoutPage;
