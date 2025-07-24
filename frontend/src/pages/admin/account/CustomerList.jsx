import React, { useState, useEffect } from "react";
import "../css/CustomerList.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CustomerList() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([
    {
      id: 101,
      fullName: "Nguyễn Văn A",
      email: "vana@gmail.com",
      revenue: 450000,
      rating: 4.2,
      status: "ACTIVE",
    },
    {
      id: 102,
      fullName: "Trần Thị B",
      email: "thib@example.com",
      revenue: 1200000,
      rating: 4.9,
      status: "INACTIVE",
    },
  ]);

  useEffect(() => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    };

    axios
      .get("/api/admin/accounts/customer", { headers })
      .then((res) => {
        console.log("✅ Danh sách người bán:", res.data);
        setCustomers(res.data);
      })
      .catch((err) => {
        console.error("❌ Lỗi lấy danh sách:", err);
      });
  }, []);

  const toggleStatus = (id) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" }
          : c
      )
    );
  };

  return (
    <div className="customer-list">
      <h2>Danh sách khách hàng</h2>
      <table className="account-table">
        <thead>
          <tr>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Tổng chi tiêu</th>
            <th>Đánh giá</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.fullName}</td>
              <td>{customer.email}</td>
              <td>{customer.revenue.toLocaleString()}₫</td>
              <td>{customer.rating}</td>
              <td>
                <span
                  className={
                    customer.status === "ACTIVE"
                      ? "status-active"
                      : "status-inactive"
                  }
                >
                  {customer.status === "ACTIVE" ? "Hoạt động" : "Tạm ngưng"}
                </span>
              </td>
              <td>
                <button
                  className="action-btn view-btn"
                  onClick={() => navigate(`/admin/accounts/${customer.id}`)}
                >
                  Xem
                </button>
                <button
                  className="action-btn toggle-btn"
                  onClick={() => toggleStatus(customer.id)}
                >
                  {customer.status === "ACTIVE" ? "Tạm ngưng" : "Khôi phục"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
