import React, { useState, useEffect } from "react";
import "../css/SellerList.css";
import axios from "axios";

export default function SellerList() {
  const [sellers, setSellers] = useState([]);

  const fetchSellers = () => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    };

    axios
      .get("/api/admin/sellers", { headers })
      .then((res) => {
        console.log("✅ Danh sách người bán:", res.data);
        setSellers(res.data);
      })
      .catch((err) => {
        console.error("❌ Lỗi lấy danh sách:", err);
      });
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  const toggleStatus = (id, currentStatus) => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    };

    const apiUrl =
      currentStatus === "ACTIVE"
        ? `/api/admin/sellers/${id}/suspend`
        : `/api/admin/sellers/${id}/restore`;

    axios
      .post(apiUrl, null, { headers })
      .then((res) => {
        console.log("✅ Cập nhật trạng thái:", res.data);
        fetchSellers(); // reload lại danh sách sau khi thay đổi trạng thái
      })
      .catch((err) => {
        console.error("❌ Lỗi cập nhật trạng thái:", err);
      });
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
            <tr key={seller.accountId}>
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
                  className="action-btn toggle-btn"
                  onClick={() => toggleStatus(seller.accountId, seller.status)}
                >
                  {seller.status === "active" ? "Tạm ngưng" : "Khôi phục"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
