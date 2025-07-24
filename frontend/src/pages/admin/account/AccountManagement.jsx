import React, { useEffect, useState } from "react";
import { Ban, RotateCw, KeyRound } from "lucide-react";
import axios from "axios";
import "../css/AccountManagement.css";

export default function AccountManagement() {
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [accounts, setAccounts] = useState([]);
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [keyword, setKeyword] = useState(""); // Giá trị người dùng nhập
  const [searchKeyword, setSearchKeyword] = useState(""); // Giá trị dùng khi fetch

  const fetchAccounts = () => {
    const params = new URLSearchParams();
    if (roleFilter) params.append("role", roleFilter);
    if (statusFilter) params.append("status", statusFilter);
    if (searchKeyword) params.append("keyword", searchKeyword);
    params.append("page", currentPage); // thêm tham số trang
    params.append("size", 20); // số item mỗi trang

    axios
      .get(`/api/admin/accounts?${params.toString()}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => {
        setAccounts(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.error("Lỗi tải danh sách tài khoản:", err));
  };

  // Chỉ gọi lại khi các bộ lọc thay đổi (không phải khi người dùng đang gõ)
  useEffect(() => {
    fetchAccounts();
  }, [roleFilter, statusFilter, searchKeyword, currentPage]);

  const translateRole = (role) => {
    switch (role) {
      case "admin":
        return "Quản trị viên";
      case "seller":
        return "Người bán";
      case "customer":
        return "Khách hàng";
      default:
        return "Không xác định";
    }
  };

  const handleDisableAccount = (accountId) => {
    axios
      .put(`/api/admin/accounts/${accountId}/disable`, null, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      })
      .then(() => fetchAccounts())
      .catch((err) => console.error("Lỗi vô hiệu hóa tài khoản:", err));
  };

  const handleEnableAccount = (accountId) => {
    axios
      .put(`/api/admin/accounts/${accountId}/enable`, null, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      })
      .then(() => fetchAccounts())
      .catch((err) => console.error("Lỗi khôi phục tài khoản:", err));
  };

  const handleResetPassword = (accountId) => {
    if (window.confirm("Bạn có chắc chắn muốn đặt lại mật khẩu?")) {
      axios
        .put(`/api/admin/accounts/${accountId}/reset-password`, null, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
        })
        .then(() => alert("Mật khẩu đã được đặt lại."))
        .catch((err) => console.error("Lỗi đặt lại mật khẩu:", err));
    }
  };

  return (
    <div className="account-management">
      <h2>Quản lý tài khoản</h2>

      <div className="filters">
        <select
          onChange={(e) => setRoleFilter(e.target.value)}
          value={roleFilter}
        >
          <option value="">-- Tất cả vai trò --</option>
          <option value="admin">Quản trị viên</option>
          <option value="seller">Người bán</option>
          <option value="customer">Khách hàng</option>
        </select>

        <select
          onChange={(e) => setStatusFilter(e.target.value)}
          value={statusFilter}
        >
          <option value="">-- Tất cả trạng thái --</option>
          <option value="active">Đang hoạt động</option>
          <option value="inactive">Đã vô hiệu hóa</option>
        </select>

        <input
          type="text"
          placeholder="Tìm theo tên hoặc email"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={() => setSearchKeyword(keyword)}>Tìm kiếm</button>
      </div>

      <table className="account-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Họ tên</th>
            <th>SĐT</th>
            <th>Địa chỉ</th>
            <th>Vai trò</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.accountId}>
              <td>{account.accountId}</td>
              <td>{account.user?.email}</td>
              <td>{account.user?.name}</td>
              <td>{account.user?.phone}</td>
              <td>{account.user?.address}</td>
              <td>{translateRole(account.role?.roleName)}</td>
              <td>
                {account.status === "active" ? (
                  <span className="active-label">Đang hoạt động</span>
                ) : (
                  <span className="inactive-label">Đã vô hiệu hóa</span>
                )}
              </td>
              <td>
                <div style={{ display: "flex", gap: "8px" }}>
                  {account.status === "active" ? (
                    <button
                      onClick={() => handleDisableAccount(account.accountId)}
                      title="Vô hiệu hóa"
                      className="icon-button danger"
                    >
                      <Ban size={18} />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEnableAccount(account.accountId)}
                      title="Khôi phục"
                      className="icon-button success"
                    >
                      <RotateCw size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => handleResetPassword(account.accountId)}
                    title="Đặt lại mật khẩu"
                    className="icon-button"
                  >
                    <KeyRound size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
        >
          &laquo; Trước
        </button>

        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={currentPage === page ? "active-page" : ""}
          >
            {page + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
          }
          disabled={currentPage === totalPages - 1}
        >
          Sau &raquo;
        </button>
      </div>
    </div>
  );
}
