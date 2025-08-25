import React, { useState, useEffect } from "react";
import "../css/CustomerList.css";
import axios from "axios";
import { Users, UserCheck, UserX } from "lucide-react"; 
import { FaMoneyBillWave } from "react-icons/fa"; 
import { API_BASE_URL } from "../../../apiConfig"; // Import base URL

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    totalSpending: 0,
  });
  const [loading, setLoading] = useState(true); // Thêm state loading

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true); // Bắt đầu loading
    try {
      const headers = {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      };
      const res = await axios.get(`${API_BASE_URL}/api/admin/customers`, { headers });
      
      // ✨ 2. Sắp xếp danh sách theo tổng chi tiêu giảm dần
      const sortedCustomers = res.data.sort((a, b) => (b.totalSpending || 0) - (a.totalSpending || 0));
      setCustomers(sortedCustomers);

      // Tính toán thống kê
      const total = sortedCustomers.length;
      const active = sortedCustomers.filter((c) => c.status === "active").length;
      const inactive = total - active;
      const totalSpending = sortedCustomers.reduce(
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
    } finally {
        setLoading(false); // Kết thúc loading
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    // ✨ 1. Sửa lại logic kiểm tra status
    const isCurrentlyActive = currentStatus === "active";
    const url = `${API_BASE_URL}/api/admin/customers/${id}/${isCurrentlyActive ? "disable" : "enable"}`;
    
    try {
      const headers = {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      };
      await axios.put(url, null, { headers });

      // ✨ 3. Cập nhật state cục bộ thay vì fetch lại toàn bộ danh sách
      setCustomers(prevCustomers =>
        prevCustomers.map(customer =>
          customer.accountId === id
            ? { ...customer, status: isCurrentlyActive ? 'inactive' : 'active' }
            : customer
        )
      );
      
      // Cập nhật thống kê
      setStats(prevStats => ({
        ...prevStats,
        active: isCurrentlyActive ? prevStats.active - 1 : prevStats.active + 1,
        inactive: isCurrentlyActive ? prevStats.inactive + 1 : prevStats.inactive - 1,
      }));

    } catch (err) {
      console.error("❌ Lỗi cập nhật trạng thái:", err);
      alert("Cập nhật trạng thái thất bại!");
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
          {/* Giữ lại icon từ react-icons vì nó đẹp hơn */}
          <FaMoneyBillWave className="dashboard-icon" size={28} />
          <div className="dashboard-content">
            <h4>Tổng chi tiêu</h4>
            <p>{stats.totalSpending.toLocaleString()}₫</p>
          </div>
        </div>
      </div>

      {/* Bảng danh sách */}
      {loading ? (
        <p>Đang tải danh sách khách hàng...</p>
      ) : (
        <table className="account-table">
          <thead>
            <tr>
              <th>ID</th> {/* Thêm cột ID */}
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
                <td>{customer.accountId}</td>
                <td>{customer.fullName}</td>
                <td>{customer.email}</td>
                <td>{(customer.totalSpending || 0).toLocaleString()}₫</td>
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
                    className={`action-btn toggle-btn ${customer.status === "active" ? "suspend" : "restore"}`}
                    onClick={() =>
                      toggleStatus(
                        customer.accountId,
                        customer.status
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
      )}
    </div>
  );
}