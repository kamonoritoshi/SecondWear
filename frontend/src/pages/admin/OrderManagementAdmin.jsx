import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/OrderManagementAdmin.css";

export default function OrderManagementAdmin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("/api/admin/orders", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Lỗi khi tải đơn hàng:", err));
  }, []);

  return (
    <div className="admin-orders">
      <h2>Quản lý đơn hàng</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Khách hàng</th>
            <th>Ngày tạo</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.account?.fullName || "Ẩn danh"}</td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
              <td>{order.totalPrice.toLocaleString()}₫</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
