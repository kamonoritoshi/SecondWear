import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/ProductList.css";

export default function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      console.warn("⚠️ Vui lòng đăng nhập để xem sản phẩm.");
      setLoading(false);
      return;
    }

    axios
      .get("/api/seller/products", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("✅ Lấy sản phẩm thành công:", res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("❌ Lỗi khi tải danh sách sản phẩm:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h1>QUẢN LÝ SẢN PHẨM</h1>
        <button className="add-product-btn" onClick={() => navigate("/products/add")}>
          + Thêm sản phẩm
        </button>
      </div>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : products.length === 0 ? (
        <p>Không có sản phẩm nào.</p>
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
              <tr key={p.productId}>
                <td>
                  <img
                    src={
                      p.images && p.images.length > 0
                        ? p.images[0].imageUrl
                        : "https://via.placeholder.com/80"
                    }
                    alt={p.name}
                    className="product-image"
                  />
                </td>
                <td>{p.name}</td>
                <td>{Number(p.price).toLocaleString()} VND</td>
                <td>{p.status}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-edit" onClick={() => navigate(`/seller/products/edit/${p.productId}`)}>
                      Sửa
                    </button>

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
