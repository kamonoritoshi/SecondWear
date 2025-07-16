import React from "react";
import "./css/OrderTable.css";

const OrderTable = ({ orders }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date) ? date.toLocaleTimeString() + " " + date.toLocaleDateString() : "Không rõ";
  };

  return (
    <div className="order-table-wrapper">
      <h3>Đơn hàng mới nhất</h3>
      <table className="order-table">
        <thead>
          <tr>
            <th>Mã đơn</th>
            <th>Ngày tạo</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{formatDate(order.orderDate)}</td>
              <td>{order.totalAmount.toLocaleString()} đ</td>
              <td>{order.items[0]?.status || "Không rõ"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
