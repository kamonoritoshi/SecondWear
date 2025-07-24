import React, { useState, useEffect } from "react";
import "../css/DisputeManagement.css";

const mockDisputes = [
  {
    id: 1,
    orderId: 101,
    customer: "Nguyen Van A",
    seller: "Tran Thi B",
    reason: "Hàng không đúng mô tả",
    createdAt: "2025-07-22T10:30:00",
    status: "Đang xử lý",
  },
  {
    id: 2,
    orderId: 102,
    customer: "Le Van C",
    seller: "Pham Van D",
    reason: "Không nhận được hàng",
    createdAt: "2025-07-20T14:45:00",
    status: "Chờ xác minh",
  },
];

export default function DisputeManagementAdmin() {
  const [disputes, setDisputes] = useState([]);
  const [selectedDispute, setSelectedDispute] = useState(null);

  useEffect(() => {
    setDisputes(mockDisputes);
  }, []);

  const handleSendWarning = (id) => {
    alert("Đã gửi cảnh báo cho người bán (ID tranh chấp: " + id + ")");
  };

  const handleManualResolve = (id) => {
    alert("Đã đánh dấu là đã giải quyết thủ công (ID: " + id + ")");
  };

  return (
    <div className="dispute-management">
      <h2>Danh sách tranh chấp</h2>
      <table className="dispute-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Mã đơn</th>
            <th>Khách hàng</th>
            <th>Người bán</th>
            <th>Lý do</th>
            <th>Thời gian</th>
            <th>Trạng thái</th>
            <th>Chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {disputes.map((dispute) => (
            <tr key={dispute.id}>
              <td>{dispute.id}</td>
              <td>{dispute.orderId}</td>
              <td>{dispute.customer}</td>
              <td>{dispute.seller}</td>
              <td>{dispute.reason}</td>
              <td>{new Date(dispute.createdAt).toLocaleString("vi-VN")}</td>
              <td>{dispute.status}</td>
              <td>
                <button
                  onClick={() => setSelectedDispute(dispute)}
                  className="view-detail"
                >
                  Xem
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedDispute && (
        <div className="dispute-detail">
          <h3>Chi tiết tranh chấp #{selectedDispute.id}</h3>
          <p><strong>Khách hàng:</strong> {selectedDispute.customer}</p>
          <p><strong>Người bán:</strong> {selectedDispute.seller}</p>
          <p><strong>Lý do:</strong> {selectedDispute.reason}</p>
          <p><strong>Thời gian:</strong> {new Date(selectedDispute.createdAt).toLocaleString("vi-VN")}</p>
          <p><strong>Trạng thái:</strong> {selectedDispute.status}</p>

          <div className="action-buttons">
            <button className="warn" onClick={() => handleSendWarning(selectedDispute.id)}>Gửi cảnh báo</button>
            <button className="resolve" onClick={() => handleManualResolve(selectedDispute.id)}>Giải quyết thủ công</button>
            <button className="close" onClick={() => setSelectedDispute(null)}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
}
