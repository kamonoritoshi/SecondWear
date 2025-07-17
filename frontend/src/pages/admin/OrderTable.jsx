// src/components/OrderTable.jsx
import React from "react";
import "./css/OrderTable.css";

export default function OrderTable({ orders = [] }) {
  return (
    <div className="order-table-container">
      <h3 className="order-table-title">Danh sách đơn hàng gần đây</h3>
      <table className="order-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Khách hàng</th>
            <th>Trạng thái</th>
            <th>Ngày đặt hàng</th>
            <th>Tổng tiền</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                Không có đơn hàng nào
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.customerName || "N/A"}</td>
                <td>{order.status}</td>
                <td>
                  {new Date(order.orderDate).toLocaleDateString("vi-VN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </td>
                <td>{order.totalAmount?.toLocaleString()}₫</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
