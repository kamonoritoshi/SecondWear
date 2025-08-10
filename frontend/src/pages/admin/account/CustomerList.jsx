import React, { useState, useEffect } from "react";
import "../css/CustomerList.css";
import axios from "axios";
import { Users, UserCheck, UserX } from "lucide-react";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    totalSpending: 0
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const headers = {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      };
      const res = await axios.get("/api/admin/customers", { headers });
      const allCustomers = res.data;
      setCustomers(allCustomers);

      // Tính toán thống kê từ toàn bộ dữ liệu
      const total = allCustomers.length;
      const active = allCustomers.filter(c => c.status === "active").length;
      const inactive = total - active;
      const totalSpending = allCustomers.reduce((sum, c) => sum + (c.totalSpending || 0), 0);

      setStats({
        total,
        active,
        inactive,
        totalSpending
      });
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
      fetchCustomers();
    } catch (err) {
      console.error("❌ Lỗi cập nhật trạng thái:", err);
    }
  };

  return (
    <div className="customer-list">
      <h2>Danh sách khách hàng</h2>

      {/* Dashboard tóm tắt */}
      <div className="account-dashboard">
        <div className="dashboard-card total">
          <Users size={28} />
          <div>
            <p>Tổng khách hàng</p>
            <h3>{stats.total}</h3>
          </div>
        </div>
        <div className="dashboard-card active">
          <UserCheck size={28} />
          <div>
            <p>Đang hoạt động</p>
            <h3>{stats.active}</h3>
          </div>
        </div>
        <div className="dashboard-card inactive">
          <UserX size={28} />
          <div>
            <p>Tạm ngưng</p>
            <h3>{stats.inactive}</h3>
          </div>
        </div>
        <div className="dashboard-card spending">
          <Users size={28} />
          <div>
            <p>Tổng chi tiêu</p>
            <h3>{stats.totalSpending.toLocaleString()}₫</h3>
          </div>
        </div>
      </div>

      {/* Bảng danh sách */}
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
