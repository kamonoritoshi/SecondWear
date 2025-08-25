import React, { useState, useEffect } from "react";
import {
  FaStore,
  FaCheckCircle,
  FaUserSlash,
  FaMoneyBillWave,
} from "react-icons/fa";
import "../css/SellerList.css";
import axios from "axios";
import { API_BASE_URL } from "../../../apiConfig"; // Import base URL

export default function SellerList() {
  const [sellers, setSellers] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true); // Thêm state loading

  const fetchSellers = () => {
    setLoading(true); // Bắt đầu loading
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    };

    axios
      .get(`${API_BASE_URL}/api/admin/sellers`, { headers })
      .then((res) => {
        console.log("✅ Danh sách người bán:", res.data);
        
        // ✨ 2. Sắp xếp danh sách theo accountId giảm dần (người mới nhất lên đầu)
        const sortedSellers = res.data.sort((a, b) => a.accountId - b.accountId);
        setSellers(sortedSellers);

        // Tính toán thống kê từ dữ liệu đã sắp xếp
        const total = sortedSellers.length;
        const active = sortedSellers.filter((s) => s.status === "active").length;
        const inactive = total - active;
        const totalRevenue = sortedSellers.reduce(
          (sum, s) => sum + (s.revenue || 0),
          0
        );

        setStats({ total, active, inactive, totalRevenue });
      })
      .catch((err) => {
        console.error("❌ Lỗi lấy danh sách:", err);
      })
      .finally(() => {
        setLoading(false); // Kết thúc loading
      });
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  const toggleStatus = (id, currentStatus) => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    };
    
    // ✨ 1. Sửa lại logic kiểm tra status (dùng chữ thường)
    const isCurrentlyActive = currentStatus === "active";
    const apiUrl = isCurrentlyActive
      ? `${API_BASE_URL}/api/admin/sellers/${id}/suspend`
      : `${API_BASE_URL}/api/admin/sellers/${id}/restore`;

    axios
      .post(apiUrl, null, { headers })
      .then(() => {
        // ✨ 3. Cập nhật state cục bộ thay vì fetch lại toàn bộ danh sách
        setSellers(prevSellers => 
          prevSellers.map(seller => 
            seller.accountId === id 
              ? { ...seller, status: isCurrentlyActive ? 'inactive' : 'active' } 
              : seller
          )
        );
        
        // Cập nhật thống kê
        setStats(prevStats => ({
            ...prevStats,
            active: isCurrentlyActive ? prevStats.active - 1 : prevStats.active + 1,
            inactive: isCurrentlyActive ? prevStats.inactive + 1 : prevStats.inactive - 1,
        }));

      })
      .catch((err) => {
        console.error("❌ Lỗi cập nhật trạng thái:", err);
        alert("Cập nhật trạng thái thất bại!");
      });
  };

  return (
    <div className="seller-list">
      <h2>Danh sách người bán</h2>

      {/* Dashboard tóm tắt */}
      <div className="dashboard">
        {/* ... JSX của dashboard không đổi ... */}
        <div className="dashboard-card total">
          <FaStore className="dashboard-icon" />
          <div className="dashboard-content">
            <h4>Tổng người bán</h4>
            <p>{stats.total}</p>
          </div>
        </div>
        <div className="dashboard-card active">
          <FaCheckCircle className="dashboard-icon" />
          <div className="dashboard-content">
            <h4>Đang hoạt động</h4>
            <p>{stats.active}</p>
          </div>
        </div>
        <div className="dashboard-card inactive">
          <FaUserSlash className="dashboard-icon" />
          <div className="dashboard-content">
            <h4>Tạm ngưng</h4>
            <p>{stats.inactive}</p>
          </div>
        </div>
        <div className="dashboard-card revenue">
          <FaMoneyBillWave className="dashboard-icon" />
          <div className="dashboard-content">
            <h4>Tổng doanh thu</h4>
            <p>{stats.totalRevenue.toLocaleString()}₫</p>
          </div>
        </div>
      </div>

      {loading ? (
        <p>Đang tải danh sách người bán...</p>
      ) : (
        <table className="account-table">
          <thead>
            <tr>
              <th>ID</th> {/* Thêm cột ID để dễ theo dõi */}
              <th>Tên cửa hàng</th>
              <th>Email</th>
              <th>Doanh thu</th>
              <th>Đánh giá</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller) => (
              <tr key={seller.accountId}>
                <td>{seller.accountId}</td>
                <td>{seller.storeName}</td>
                <td>{seller.email}</td>
                <td>{seller.revenue?.toLocaleString() ?? 0}₫</td>
                <td>{seller.rating ?? "Chưa có"}</td>
                <td>
                  <span
                    className={
                      seller.status === "active"
                        ? "status-active"
                        : "status-inactive"
                    }
                  >
                    {seller.status === "active" ? "Hoạt động" : "Tạm ngưng"}
                  </span>
                </td>
                <td>
                  <button
                    className={`action-btn toggle-btn ${seller.status === "active" ? "suspend" : "restore"}`}
                    onClick={() => toggleStatus(seller.accountId, seller.status)}
                  >
                    {seller.status === "active" ? "Tạm ngưng" : "Khôi phục"}
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