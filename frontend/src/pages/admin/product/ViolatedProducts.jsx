import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/ViolatedProducts.css";

const mockViolatedProducts = [
  {
    id: 1,
    name: "Áo thun in logo giả",
    image: "https://via.placeholder.com/100",
    sellerName: "Nguyễn Văn A",
    price: 199000,
    reason: "Vi phạm bản quyền thương hiệu",
  },
  {
    id: 2,
    name: "Giày fake Nike",
    image: "https://via.placeholder.com/100",
    sellerName: "Trần Thị B",
    price: 399000,
    reason: "Hàng nhái thương hiệu",
  },
];

export default function ViolatedProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [filterReason, setFilterReason] = useState("");

  useEffect(() => {
    axios
      .get("/api/admin/products/violations")
      .then((res) => setProducts(res.data));
    setProducts(mockViolatedProducts);
  }, []);

  const handleSearch = () => {
    setFilterReason(searchTerm.trim());
  };

  const handleHide = async (id) => {
    try {
      await axios.put(`/api/admin/products/${id}/hide`);
      alert("🔒 Sản phẩm đã bị ẩn khỏi hệ thống.");
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xoá sản phẩm này?")) return;
    try {
      // await axios.delete(`/api/admin/products/${id}`);
      alert("🗑 Đã xoá sản phẩm.");
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleWarn = async (id) => {
    try {
      // await axios.post(`/api/admin/products/${id}/warn`);
      alert("⚠ Đã gửi cảnh báo đến người bán.");
    } catch (err) {
      console.error(err);
    }
  };

  const filteredProducts = products.filter((p) =>
    filterReason
      ? p.reason.toLowerCase().includes(filterReason.toLowerCase())
      : true
  );

  return (
    <div className="violated-products">
      <h2>Danh sách sản phẩm vi phạm</h2>
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Lý do vi phạm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-btn" onClick={handleSearch}>
          Tìm kiếm
        </button>
      </div>
      <table className="product-table">
        <thead>
          <tr>
            <th>Ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Người bán</th>
            <th>Giá</th>
            <th>Lý do vi phạm</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length === 0 ? (
            <tr>
              <td colSpan="6">Không có sản phẩm vi phạm nào.</td>
            </tr>
          ) : (
            filteredProducts.map((p) => (
              <tr key={p.id}>
                <td>
                  <img src={p.image} alt={p.name} className="thumb" />
                </td>
                <td>{p.name}</td>
                <td>{p.sellerName}</td>
                <td>{p.price.toLocaleString()}₫</td>
                <td>{p.reason}</td>
                <td>
                  <button className="warn" onClick={() => handleWarn(p.id)}>
                    Cảnh báo
                  </button>
                  <button className="hide" onClick={() => handleHide(p.id)}>
                    Ẩn
                  </button>
                  <button className="delete" onClick={() => handleDelete(p.id)}>
                    Xoá
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
