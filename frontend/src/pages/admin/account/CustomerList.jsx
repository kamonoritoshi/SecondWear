import React, { useState, useEffect } from "react";
import "../css/CustomerList.css";
import axios from "axios";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const headers = {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      };
      const res = await axios.get("/api/admin/customers", { headers });
      setCustomers(res.data);
    } catch (err) {
      console.error("❌ Lỗi lấy danh sách khách hàng:", err);
    }
  };

  const toggleStatus = async (id, isActive) => {
    const url = `/api/admin/customers/${id}/${isActive ? "disable" : "enable"}`;
    try {
      const headers = {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      };
      await axios.put(url, null, { headers });

      // Cập nhật lại danh sách
      fetchCustomers();
    } catch (err) {
      console.error("❌ Lỗi cập nhật trạng thái:", err);
    }
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
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.accountId}>
              <td>{customer.fullName}</td>
              <td>{customer.email}</td>
              <td>{customer.totalSpending.toLocaleString()}₫</td>
              <td>
                <span
                  className={
                    customer.status === "active"
                      ? "status-active"
                      : "status-inactive"
                  }
                >
                  {customer.status === "active" ? "Hoạt động" : "Tạm ngưng"}
                </span>
              </td>
              <td>
                <button
                  className="action-btn toggle-btn"
                  onClick={() =>
                    toggleStatus(customer.accountId, customer.status === "active")
                  }
                >
                  {customer.status === "active" ? "Tạm ngưng" : "Khôi phục"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
