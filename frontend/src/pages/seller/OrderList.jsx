import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/OrderList.css";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      console.warn("⚠️ Không tìm thấy JWT Token. Hãy đăng nhập.");
      setLoading(false);
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };
    axios
      .get("/api/seller/orders", { headers })
      .then((res) => {
        console.log("✅ API trả về:", res.data);
        setOrders(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("❌ Lỗi khi tải đơn hàng:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = (id, newStatus) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) return;

    axios
      .put(
        `/api/seller/orders/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setOrders((prev) =>
          prev.map((o) => (o.orderId === id ? { ...o, status: newStatus } : o))
        );
        console.log("✅ Cập nhật trạng thái thành công");
      })
      .catch((err) => console.error("❌ Lỗi update:", err));
  };

  const renderActionButton = (order) => {
    const { orderId, status } = order;

    switch (status) {
      case "Đang xử lý":
        return (
          <button
            className="status-btn-processing"
            onClick={() => updateStatus(orderId, "Đã giao")}
          >
            Đánh dấu đã giao
          </button>
        );
      case "Đã giao":
        return (
          <button
            className="status-btn-delivered"
            onClick={() => updateStatus(orderId, "Hoàn thành")}
          >
            Đánh dấu hoàn thành
          </button>
        );
      case "Hoàn thành":
        return <span className="status-done">✔ Hoàn tất</span>;
      case "Hủy":
        return <span className="status-cancelled">✖ Đã hủy</span>;
      default:
        return null;
    }
  };

  return (
    <div className="order-list-container">
      <h1>QUẢN LÝ ĐƠN HÀNG</h1>
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : orders.length === 0 ? (
        <p>Không có đơn hàng nào.</p>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>Mã ĐH</th>
              <th>Trạng thái</th>
              <th>Ngày đặt</th>
              <th>Tổng tiền</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order.orderId, e.target.value)
                    }
                  >
                    <option>Đang xử lý</option>
                    <option>Đã giao</option>
                    <option>Hoàn thành</option>
                    <option>Hủy</option>
                  </select>
                </td>
                <td>{new Date(order.orderDate).toLocaleString()}</td>
                <td>{order.totalAmount.toLocaleString()} VND</td>
                <td>{renderActionButton(order)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
