import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/PendingProducts.css";

const mockPendingProducts = [
  {
    id: 1,
    name: "Áo thun SecondWear",
    image: "https://via.placeholder.com/100",
    sellerName: "Nguyễn Văn A",
    price: 199000,
    description: "Chất cotton 100%, form rộng thoải mái.",
  },
  {
    id: 2,
    name: "Quần jeans vintage",
    image: "https://via.placeholder.com/100",
    sellerName: "Trần Thị B",
    price: 299000,
    description: "Quần jeans dáng straight từ năm 2000.",
  },
];

export default function PendingProducts() {
  const [products, setProducts] = useState([]);
  const [reasonMap, setReasonMap] = useState({});

  useEffect(() => {
    axios.get("/api/admin/products/pending").then(res => setProducts(res.data));
    setProducts(mockPendingProducts);
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(`/api/admin/products/${id}/approve`);
      alert("✔ Đã phê duyệt sản phẩm!");
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    const reason = reasonMap[id] || "";
    if (!reason.trim()) {
      alert("Vui lòng nhập lý do từ chối.");
      return;
    }
    try {
      // await axios.put(`/api/admin/products/${id}/reject`, { reason });
      alert("❌ Đã từ chối sản phẩm!");
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleReasonChange = (id, value) => {
    setReasonMap((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="pending-products">
      <h2>Danh sách sản phẩm chờ duyệt</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>Ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Người bán</th>
            <th>Giá</th>
            <th>Mô tả</th>
            <th>Lý do từ chối</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr><td colSpan="7">Không có sản phẩm nào đang chờ duyệt.</td></tr>
          ) : (
            products.map((p) => (
              <tr key={p.id}>
                <td><img src={p.image} alt={p.name} className="thumb" /></td>
                <td>{p.name}</td>
                <td>{p.sellerName}</td>
                <td>{p.price.toLocaleString()}₫</td>
                <td>{p.description}</td>
                <td>
                  <input
                    type="text"
                    placeholder="Nhập lý do từ chối"
                    value={reasonMap[p.id] || ""}
                    onChange={(e) => handleReasonChange(p.id, e.target.value)}
                  />
                </td>
                <td>
                  <button className="approve" onClick={() => handleApprove(p.id)}>Phê duyệt</button>
                  <button className="reject" onClick={() => handleReject(p.id)}>Từ chối</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
