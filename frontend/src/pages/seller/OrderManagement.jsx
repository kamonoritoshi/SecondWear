import React, { useState, useEffect } from 'react';
import './css/OrderManagement.css';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    fetch("/api/seller/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log("Orders from API:", data);
        setOrders(data);
      })
      .catch(err => console.error("Lỗi khi tải đơn hàng:", err));
  }, []);

  const handleStatusChange = (orderItemId, value) => {
    setSelectedStatus(prev => ({
      ...prev,
      [orderItemId]: value,
    }));
  };

  const handleUpdateStatus = (orderItemId) => {
    const newStatus = selectedStatus[orderItemId];
    const token = localStorage.getItem("jwtToken");

    fetch(`/api/seller/order-items/${orderItemId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(res => {
        if (res.ok) {
          alert(`Đã cập nhật trạng thái thành công`);
          // Optional: reload lại danh sách
          window.location.reload();
        } else {
          alert("Cập nhật thất bại");
        }
      })
      .catch(err => console.error("Lỗi cập nhật:", err));
  };

  return (
    <div className="order-management">
      <h2 className="order-title">Quản lý đơn hàng</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Mã đơn</th>
            <th>Tên sản phẩm</th>
            <th>Số lượng</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            order.items.map(item => (
              <tr key={item.orderItemId}>
                <td>{order.orderId}</td>
                <td>{item.product.name}</td>
                <td>{item.quantity}</td>
                <td>
                  <select
                    value={selectedStatus[item.orderItemId] || item.status}
                    onChange={(e) =>
                      handleStatusChange(item.orderItemId, e.target.value)
                    }
                    className="status-select"
                  >
                    <option value="Đang xử lý">Đang xử lý</option>
                    <option value="Chờ xác nhận">Chờ xác nhận</option>
                    <option value="Hoàn thành">Hoàn thành</option>
                    <option value="Đã hủy">Đã hủy</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => handleUpdateStatus(item.orderItemId)}
                    className="update-btn"
                  >
                    Lưu
                  </button>
                </td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;
