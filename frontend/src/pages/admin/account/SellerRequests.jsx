import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/SellerRequests.css";

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
      .get("/api/admin/seller-requests", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => {
        console.log("Data: ", res.data);
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
    setProcessingId(id);

    axios
      .put(
        `/api/admin/seller-requests/${id}/${action.toLowerCase()}`,
        { reason },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(() => {
        fetchRequests(); // reload danh sách sau khi xử lý
      })
      .catch((err) => {
        alert("❌ Có lỗi xảy ra khi xử lý yêu cầu!");
        console.error(err);
      })
      .finally(() => {
        setProcessingId(null);
      });
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
              <tr key={req.id}>
                <td>{req.name}</td>
                <td>{req.email}</td>
                <td>{req.phone}</td>
                <td>
                  {new Date(req.createdAt).toLocaleString("vi-VN", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </td>
                <td>{req.sellerStatus}</td>
                <td>
                  <input
                    type="text"
                    placeholder="Nhập lý do từ chối"
                    disabled={req.sellerStatus !== "PENDING"}
                    value={reasons[req.accountId] || ""}
                    onChange={(e) =>
                      setReasons((prev) => ({
                        ...prev,
                        [req.accountId]: e.target.value,
                      }))
                    }
                  />
                </td>
                <td>
                  {req.sellerStatus === "PENDING" ? (
                    <>
                      <img
                        src="/src/icons/approved.png"
                        alt="Phê duyệt"
                        className="action-icon"
                        title="Phê duyệt yêu cầu"
                        onClick={() => handleAction(req.accountId, "APPROVE")}
                        style={{
                          cursor:
                            processingId === req.accountId ? "not-allowed" : "pointer",
                        }}
                      />
                      <img
                        src="/src/icons/rejected.png"
                        alt="Từ chối"
                        className="action-icon"
                        title="Từ chối yêu cầu"
                        onClick={() => handleAction(req.accountId, "REJECT")}
                        style={{
                          cursor:
                            processingId === req.accountId ? "not-allowed" : "pointer",
                          marginLeft: "8px",
                        }}
                      />
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
