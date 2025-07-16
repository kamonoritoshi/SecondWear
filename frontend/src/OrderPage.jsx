import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./css/OrderPage.css";

export default function OrderPage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const getToken = () =>
    localStorage.getItem("jwtToken") || localStorage.getItem("jwt");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = getToken();
        const res = await axios.get("/api/orders/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Lỗi khi tải đơn hàng:", err);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchOrders();
    }
  }, [currentUser]);

  return (
    <div className="orders-container">
      <h2>Đơn hàng của bạn</h2>

      {loading ? (
        <p>Đang tải...</p>
      ) : orders.length === 0 ? (
        <p>Bạn chưa có đơn hàng nào.</p>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <div key={order.orderId} className="order-card">
              <div>
                <strong>Mã đơn hàng:</strong> {order.orderCode || order.orderId}
              </div>
              <div>
                <strong>Ngày đặt:</strong>{" "}
                {new Date(order.orderDate).toLocaleDateString()}
              </div>
              <div>
                <strong>Tổng tiền:</strong>{" "}
                {order.totalAmount?.toLocaleString()} đ
              </div>
              <div>
                <strong>Trạng thái:</strong>{" "}
                <span className="status">{order.status}</span>
              </div>
              <div>
                <strong>Thanh toán:</strong> {order.paymentMethod || "COD"}
              </div>

              <button
                className="btn-detail"
                onClick={() => setSelectedOrder(order)}
              >
                Xem chi tiết
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Modal chi tiết đơn hàng */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>
              Chi tiết đơn hàng #{selectedOrder.orderCode || selectedOrder.orderId}
            </h3>

            <ul className="order-items-list">
              {selectedOrder.items?.map((item, index) => (
                <li key={index} className="order-item">
                  <div className="order-item-thumbnail">
                    <img
                      src={
                        item.product.images?.[0]?.imageUrl ||
                        item.product.images?.[0]?.url ||
                        item.product.images?.[0]
                      }
                      alt={item.product.name}
                      className="item-image"
                    />
                  </div>
                  <div className="item-info">
                    <div><strong>{item.product.name}</strong></div>
                    <div>Số lượng: {item.quantity}</div>
                    <div>Đơn giá: {item.price.toLocaleString()} đ</div>
                    <div>
                      Thành tiền: {(item.price * item.quantity).toLocaleString()} đ
                    </div>
                    <button
                      className="btn-view-product"
                      onClick={() => {
                        setSelectedOrder(null);
                        navigate(`/products/${item.product.productId}`);
                      }}
                    >
                      Xem sản phẩm
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <button className="btn-close" onClick={() => setSelectedOrder(null)}>
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
