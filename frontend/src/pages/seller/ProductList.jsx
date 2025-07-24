import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/ProductList.css";

export default function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  // Giả lập gọi API
  useEffect(() => {
    setTimeout(() => {
      setProducts([
        { id: 1, name: "Áo sơ mi nam", price: 120000, status: "Còn hàng", image: "https://via.placeholder.com/80" },
        { id: 2, name: "Quần jean nữ", price: 200000, status: "Hết hàng", image: "https://via.placeholder.com/80" }
      ]);
    }, 1000);
  }, []);

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h1>Quản lý sản phẩm</h1>
        <button className="add-product-btn" onClick={() => navigate("/products/add")}>
          + Thêm sản phẩm
        </button>
      </div>

      {products.length === 0 ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Tình trạng</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>
                  <img src={p.image} alt={p.name} className="product-image" />
                </td>
                <td>{p.name}</td>
                <td>{p.price.toLocaleString()} VND</td>
                <td>{p.status}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-edit" onClick={() => navigate(`/products/edit/${p.id}`)}>Sửa</button>
                    <button className="btn-delete">Xóa</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
