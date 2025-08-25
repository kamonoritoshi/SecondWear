import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/ProductList.css";
import { API_BASE_URL } from "../../apiConfig"; // ✨ Import base URL

export default function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✨ Hàm fetch dữ liệu, có thể tái sử dụng
  const fetchProducts = () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      console.warn("⚠️ Vui lòng đăng nhập để xem sản phẩm.");
      setLoading(false);
      return;
    }

    setLoading(true);
    axios
      .get(`${API_BASE_URL}/api/seller/products`, {
        // ✨ Thêm base URL
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
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✨ 1. Thêm hàm xử lý xóa sản phẩm
  const handleDelete = async (productId) => {
    // Hỏi xác nhận trước khi xóa
    if (
      window.confirm(
        "Bạn có chắc chắn muốn xóa sản phẩm này không? Hành động này không thể hoàn tác."
      )
    ) {
      const token = localStorage.getItem("jwtToken");
      try {
        await axios.delete(`${API_BASE_URL}/api/seller/products/${productId}`, {
          // ✨ Thêm base URL
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Sản phẩm đã được xóa thành công!");
        // Cập nhật lại danh sách sản phẩm trên UI
        setProducts(products.filter((p) => p.productId !== productId));
      } catch (err) {
        console.error("❌ Lỗi khi xóa sản phẩm:", err);
        alert(`Xóa thất bại: ${err.response?.data || err.message}`);
      }
    }
  };

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h1>QUẢN LÝ SẢN PHẨM</h1>
        <button
          className="add-product-btn"
          onClick={() => navigate("/seller/products/add")}
        >
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
              <th>Tình trạng duyệt</th> {/* ✨ Sửa lại tiêu đề cho rõ nghĩa */}
              <th>Trạng thái bán</th>
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
                <td>
                  {/* ✨ Hiển thị trạng thái duyệt một cách trực quan hơn */}
                  <span
                    className={`approval-status ${
                      p.approved ? "approved" : "pending"
                    }`}
                  >
                    {p.approved ? "Đã duyệt" : "Chờ duyệt"}
                  </span>
                </td>
                <td>{p.status}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-edit"
                      onClick={() =>
                        navigate(`/seller/products/edit/${p.productId}`)
                      }
                    >
                      Sửa
                    </button>
                    {/* ✨ 2. Gắn hàm handleDelete vào nút Xóa */}
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(p.productId)}
                    >
                      Xoá
                    </button>
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
