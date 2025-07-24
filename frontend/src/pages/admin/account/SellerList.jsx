import React, { useState, useEffect } from "react";
import "../css/SellerList.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SellerList() {
  const navigate = useNavigate();
  const [sellers, setSellers] = useState([
    {
      id: 1,
      storeName: "Cửa hàng ABC",
      email: "abc@example.com",
      revenue: 15000000,
      rating: 4.5,
      status: "ACTIVE",
    },
    {
      id: 2,
      storeName: "Shop XYZ",
      email: "xyz@example.com",
      revenue: 23000000,
      rating: 4.8,
      status: "INACTIVE",
    },
  ]);

  useEffect(() => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    };

    axios
      .get("/api/admin/accounts/sellers", { headers })
      .then((res) => {
        console.log("✅ Danh sách người bán:", res.data);
        // setSellers(res.data);
      })
      .catch((err) => {
        console.error("❌ Lỗi lấy danh sách:", err);
      });
  }, []);

  const toggleStatus = (id) => {
    setSellers((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" }
          : s
      )
    );
  };

  return (
    <div className="seller-list">
      <h2>Danh sách người bán</h2>
      <table className="account-table">
        <thead>
          <tr>
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
            <tr key={seller.id}>
              <td>{seller.storeName}</td>
              <td>{seller.email}</td>
              <td>{seller.revenue.toLocaleString()}₫</td>
              <td>{seller.rating}</td>
              <td>
                <span
                  className={
                    seller.status === "ACTIVE"
                      ? "status-active"
                      : "status-inactive"
                  }
                >
                  {seller.status === "ACTIVE" ? "Hoạt động" : "Tạm ngưng"}
                </span>
              </td>
              <td>
                <button
                  className="action-btn view-btn"
                  onClick={() => navigate(`/admin/accounts/${seller.id}`)}
                >
                  Xem
                </button>
                <button
                  className="action-btn toggle-btn"
                  onClick={() => toggleStatus(seller.id)}
                >
                  {seller.status === "ACTIVE" ? "Tạm ngưng" : "Khôi phục"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
