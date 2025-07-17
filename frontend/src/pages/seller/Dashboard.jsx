import React, { useEffect, useState } from "react";
import SalesChart from "./SalesChart";
import OrderTable from "./OrderTable";
import SummaryCards from "./SummaryCards"; // ✅ Thêm dòng này
import "./css/Dashboard.css";

const Dashboard = () => {
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    // Lấy danh sách sản phẩm
    fetch("/api/seller/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setProductCount(data.length))
      .catch((err) => console.error("Lỗi tải sản phẩm:", err));

    // Lấy danh sách đơn hàng
    fetch("/api/seller/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setOrderCount(data.length);
      })
      .catch((err) => console.error("Lỗi tải đơn hàng:", err));
  }, []);

  const calculateRevenue = (orders) => {
    return orders.reduce(
      (sum, order) =>
        sum +
        order.items
          .filter((i) => i.status === "Hoàn thành")
          .reduce((s, i) => s + i.price * i.quantity, 0),
      0
    );
  };

  const processingCount = orders.reduce(
    (count, order) =>
      count + order.items.filter((i) => i.status === "Đang xử lý").length,
    0
  );

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Tổng quan</h2>

      {/* ✅ Thêm SummaryCards */}
      <SummaryCards
        totalProducts={productCount}
        totalOrders={orderCount}
        totalRevenue={calculateRevenue(orders)}
        processingOrders={processingCount}
      />

      <div className="dashboard-charts">
        <SalesChart orders={orders} />
      </div>

      <div className="dashboard-table">
        <OrderTable orders={orders} />
      </div>
    </div>
  );
};

export default Dashboard;
