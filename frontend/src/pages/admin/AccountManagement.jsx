import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/AccountManagement.css";

export default function AccountManagement() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/admin/accounts", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => setAccounts(res.data))
      .catch((err) => console.error("Lỗi tải danh sách tài khoản:", err));
  }, []);

  return (
    <div className="account-management">
      <h2>Quản lý tài khoản</h2>
      <table className="account-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Họ tên</th>
            <th>SĐT</th>
            <th>Địa chỉ</th>
            <th>Vai trò</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.accountId}>
              <td>{account.accountId}</td>
              <td>{account.email}</td>
              <td>{account.fullName}</td>
              <td>{account.phone}</td>
              <td>{account.address}</td>
              <td>{account.role?.roleName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
