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
    totalSpending: 0,
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
      const active = allCustomers.filter((c) => c.status === "active").length;
      const inactive = total - active;
      const totalSpending = allCustomers.reduce(
        (sum, c) => sum + (c.totalSpending || 0),
        0
      );

      setStats({
        total,
        active,
        inactive,
        totalSpending,
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
      <div className="dashboard">
        <div className="dashboard-card total">
          <Users className="dashboard-icon" size={28} />
          <div className="dashboard-content">
            <h4>Tổng khách hàng</h4>
            <p>{stats.total}</p>
          </div>
        </div>

        <div className="dashboard-card active">
          <UserCheck className="dashboard-icon" size={28} />
          <div className="dashboard-content">
            <h4>Đang hoạt động</h4>
            <p>{stats.active}</p>
          </div>
        </div>

        <div className="dashboard-card inactive">
          <UserX className="dashboard-icon" size={28} />
          <div className="dashboard-content">
            <h4>Tạm ngưng</h4>
            <p>{stats.inactive}</p>
          </div>
        </div>

        <div className="dashboard-card spending">
          <Users className="dashboard-icon" size={28} />
          <div className="dashboard-content">
            <h4>Tổng chi tiêu</h4>
            <p>{stats.totalSpending.toLocaleString()}₫</p>
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
                    toggleStatus(
                      customer.accountId,
                      customer.status === "active"
                    )
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
