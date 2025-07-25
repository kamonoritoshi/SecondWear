import React, { useEffect, useState } from "react";
import "./css/OrderList.css";

export default function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setOrders([
        { id: 1, customer: "Nguyễn Văn A", status: "Chờ xử lý", total: 250000 },
        { id: 2, customer: "Trần Thị B", status: "Đang vận chuyển", total: 500000 },
        { id: 3, customer: "Lê Văn C", status: "Giao thành công", total: 750000 }
      ]);
    }, 1000);
  }, []);

  const updateStatus = (id, newStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  return (
    <div className="order-list-container">
      <h1>Quản lý đơn hàng</h1>
      {orders.length === 0 ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>Mã ĐH</th>
              <th>Khách hàng</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.total.toLocaleString()} VND</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                  >
                    <option value="Chờ xử lý">Chờ xử lý</option>
                    <option value="Đang vận chuyển">Đang vận chuyển</option>
                    <option value="Giao thành công">Giao thành công</option>
                    <option value="Hủy">Hủy</option>
                  </select>
                </td>
                <td>
                  <button className="btn-view">Xem</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
