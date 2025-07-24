import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/SellerRequests.css"; // Bạn có thể tạo file CSS riêng nếu cần

export default function SellerRequests() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "vana@example.com",
      phone: "0123456789",
      registerDate: "2025-07-20T10:30:00",
      status: "PENDING",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "thib@example.com",
      phone: "0987654321",
      registerDate: "2025-07-21T09:15:00",
      status: "PENDING",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [processingId, setProcessingId] = useState(null);
  const [reasons, setReasons] = useState({});

  useEffect(() => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    };

    axios
      .get("/api/admin/seller-requests", { headers })
      .then((res) => {
        console.log("✅ Danh sách yêu cầu:", res.data);
        // setRequests(res.data);
      })
      .catch((err) => {
        console.error("❌ Lỗi lấy yêu cầu:", err);
      });
  }, []);

  const handleAction = (id, action) => {
    const reason = reasons[id] || "";
    setProcessingId(id);

    axios
      .post(
        `/api/admin/seller-requests/${id}/${action.toLowerCase()}`,
        { reason },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(() => {
        setRequests((prev) =>
          prev.map((r) =>
            r.id === id ? { ...r, status: action.toUpperCase() } : r
          )
        );
      })
      .catch((err) => {
        alert("Có lỗi xảy ra!");
        console.error(err);
      })
      .finally(() => setProcessingId(null));
  };

  return (
    <div className="seller-requests-page">
      <h2>Yêu cầu đăng ký người bán</h2>

      {loading ? (
        <p>Đang tải...</p>
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
              <tr key={req.id}>
                <td>{req.name}</td>
                <td>{req.email}</td>
                <td>{req.phone}</td>
                <td>{new Date(req.registerDate).toLocaleString("vi-VN")}</td>
                <td>{req.status}</td>
                <td>
                  <input
                    type="text"
                    placeholder="Nhập lý do từ chối"
                    disabled={req.status !== "PENDING"}
                    value={reasons[req.id] || ""}
                    onChange={(e) =>
                      setReasons((prev) => ({
                        ...prev,
                        [req.id]: e.target.value,
                      }))
                    }
                  />
                </td>
                <td>
                  {req.status === "PENDING" ? (
                    <>
                      <button
                        onClick={() => handleAction(req.id, "APPROVED")}
                        disabled={processingId === req.id}
                        className="approve-btn"
                      >
                        Phê duyệt
                      </button>
                      <button
                        onClick={() => handleAction(req.id, "REJECTED")}
                        disabled={processingId === req.id}
                        className="reject-btn"
                      >
                        Từ chối
                      </button>
                    </>
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
