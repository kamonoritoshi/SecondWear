import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/SellerRequests.css";
import { API_BASE_URL } from "../../../apiConfig";
import { CheckCircle, XCircle } from "lucide-react"; // ✨ 1. Import icon từ thư viện

export default function SellerRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [reasons, setReasons] = useState({});

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = () => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/api/admin/seller-requests`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => {
        setRequests(res.data);
      })
      .catch((err) => {
        console.error("❌ Lỗi khi tải danh sách yêu cầu:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleAction = (id, action) => {
    const reason = reasons[id] || "";
    if (action === "REJECT" && !reason.trim()) {
      alert("Vui lòng nhập lý do trước khi từ chối yêu cầu.");
      return;
    }

    setProcessingId(id);
    axios
      .put(
        `${API_BASE_URL}/api/admin/seller-requests/${id}/${action.toLowerCase()}`,
        { reason },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(() => {
        fetchRequests();
      })
      .catch((err) => {
        alert("❌ Có lỗi xảy ra khi xử lý yêu cầu!");
        console.error(err);
      })
      .finally(() => {
        setProcessingId(null);
      });
  };

  const handleReasonChange = (accountId, value) => {
    setReasons((prev) => ({ ...prev, [accountId]: value }));
  };

  return (
    <div className="seller-requests-page">
      <h2>Yêu cầu đăng ký người bán</h2>
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : requests.length === 0 ? (
        <p>Không có yêu cầu nào đang chờ xử lý.</p>
      ) : (
        <table className="seller-request-table">
          <thead>
            <tr>
              <th>Họ tên</th>
              <th>Email</th>
              <th>SĐT</th>
              <th>Ngày đăng ký</th>
              <th>Trạng thái</th>
              <th>Lý do (nếu từ chối)</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.accountId}>
                <td>{req.name || "N/A"}</td>
                <td>{req.email || "N/A"}</td>
                <td>{req.phone || "N/A"}</td>
                <td>
                  {new Date(req.createdAt).toLocaleString("vi-VN", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </td>
                <td>
                  <span className={`status-${req.sellerStatus.toLowerCase()}`}>
                    {req.sellerStatus}
                  </span>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Nhập lý do từ chối"
                    disabled={req.sellerStatus !== "PENDING"}
                    value={reasons[req.accountId] || ""}
                    onChange={(e) =>
                      handleReasonChange(req.accountId, e.target.value)
                    }
                  />
                </td>
                <td>
                  {req.sellerStatus === "PENDING" ? (
                    <div className="action-buttons">
                      {/* ✨ 2. Thay thế <img> bằng component icon */}
                      <CheckCircle
                        className="action-icon approve"
                        size={24}
                        title="Phê duyệt yêu cầu"
                        onClick={() =>
                          !processingId &&
                          handleAction(req.accountId, "APPROVE")
                        }
                        style={{
                          cursor: processingId ? "not-allowed" : "pointer",
                          opacity: processingId ? 0.5 : 1,
                        }}
                      />
                      <XCircle
                        className="action-icon reject"
                        size={24}
                        title="Từ chối yêu cầu"
                        onClick={() =>
                          !processingId && handleAction(req.accountId, "REJECT")
                        }
                        style={{
                          cursor: processingId ? "not-allowed" : "pointer",
                          opacity: processingId ? 0.5 : 1,
                        }}
                      />
                    </div>
                  ) : (
                    <span>Đã xử lý</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
