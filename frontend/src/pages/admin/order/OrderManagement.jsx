import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/OrderManagement.css";

export default function OrderManagementAdmin() {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    axios
      .get("/api/admin/orders", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => {
        console.log("Danh sách đơn hàng: ", res.data);
        setOrders(res.data);
      })
      .catch((err) => console.error("Lỗi khi tải đơn hàng:", err));
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      !statusFilter || order.status === statusFilter;

    const matchesPayment =
      !paymentFilter || order.paymentStatus === paymentFilter;

    const orderDate = new Date(order.orderDate);
    const afterStart = !startDate || orderDate >= new Date(startDate);
    const beforeEnd = !endDate || orderDate <= new Date(endDate + "T23:59:59");

    return matchesStatus && matchesPayment && afterStart && beforeEnd;
  });

  return (
    <div className="admin-orders">
      <h2>Quản lý đơn hàng</h2>
      <div className="filter-container">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="Hoàn thành">Hoàn thành</option>
          <option value="Đã giao">Đã giao</option>
          <option value="Đang xử lý">Đang xử lý</option>
          <option value="Hủy">Hủy</option>
        </select>

        <select
          value={paymentFilter}
          onChange={(e) => setPaymentFilter(e.target.value)}
        >
          <option value="">Tất cả thanh toán</option>
          <option value="Đã thanh toán">Đã thanh toán</option>
          <option value="Chờ thanh toán">Chờ thanh toán</option>
          <option value="Thất bại">Thất bại</option>
        </select>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <span>–</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <table className="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Khách hàng</th>
            <th>Người bán</th>
            <th>Ngày tạo</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th>Trạng thái thanh toán</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.customerName || "Ẩn danh"}</td>
              <td>{order.sellerNames}</td>
              <td>
                {order.orderDate
                  ? new Date(order.orderDate).toLocaleString("vi-VN")
                  : ""}
              </td>
              <td>{order.totalAmount.toLocaleString("vi-VN")}₫</td>
              <td>{order.status}</td>
              <td>{order.paymentStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
