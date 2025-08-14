import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/ProductForm.css";

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    condition: "Mới",
    size: "",
    color: "",
    price: "",
    status: "Đang bán",
    quantity: "",
    categoryId: "",
    brand: "",
    origin: "",
    approved: 0, // 0: chờ duyệt, 1: đã duyệt, 2: bị từ chối
  });

  // Load product khi sửa
  useEffect(() => {
    if (isEditing) {
      const token = localStorage.getItem("jwtToken");
      axios
        .get(`/api/seller/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const data = res.data;
          setProduct({
            name: data.name || "",
            description: data.description || "",
            condition: data.condition || "Mới",
            size: data.size || "",
            color: data.color || "",
            price: data.price || "",
            status: data.status || "Đang bán",
            quantity: data.quantity || "",
            categoryId: data.category?.categoryId || "",
            brand: data.brand || "",
            origin: data.origin || "",
            approved: data.approved ?? 0,
          });
        })
        .catch((err) => {
          console.error("❌ Không thể tải sản phẩm:", err);
          alert("Không tìm thấy sản phẩm hoặc không có quyền");
          navigate("/seller/products");
        });
    }
  }, [id]);

  // Gửi dữ liệu lên server
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwtToken");

    try {
      setLoading(true);
      if (isEditing) {
        await axios.put(`/api/seller/products/${id}`, product, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post("/api/seller/products", product, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      alert("✅ Sản phẩm đã được " + (isEditing ? "cập nhật" : "thêm mới"));
      navigate("/seller/products");
    } catch (err) {
      console.error("❌ Cập nhật thất bại:", err);
      alert(
        "Cập nhật thất bại: " +
          (err.response?.data?.message || "Lỗi không xác định")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const getApprovalStatusText = (code) => {
    switch (code) {
      case 1:
        return "✅ Đã duyệt";
      case 2:
        return "❌ Bị từ chối";
      default:
        return "⏳ Chờ duyệt";
    }
  };

  return (
    <div className="product-form-container">
      <h1>{isEditing ? "CHỈNH SỬA SẢN PHẨM" : "THÊM MỚI SẢN PHẨM"}</h1>
      <form className="product-form" onSubmit={handleSubmit}>
        <div>
          <label>Tên sản phẩm</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mô tả</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Tình trạng</label>
          <select
            name="condition"
            value={product.condition}
            onChange={handleChange}
          >
            <option value="Mới">Mới</option>
            <option value="Đã qua sử dụng">Đã qua sử dụng</option>
          </select>
        </div>
        <div>
          <label>Kích cỡ</label>
          <input
            type="text"
            name="size"
            value={product.size}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Màu sắc</label>
          <input
            type="text"
            name="color"
            value={product.color}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Giá</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Tình trạng bán</label>
          <select
            name="status"
            value={product.status}
            onChange={handleChange}
          >
            <option value="Đang bán">Đang bán</option>
            <option value="Ngừng bán">Ngừng bán</option>
          </select>
        </div>
        <div>
          <label>Số lượng</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Danh mục (ID)</label>
          <input
            type="number"
            name="categoryId"
            value={product.categoryId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Thương hiệu</label>
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Xuất xứ</label>
          <input
            type="text"
            name="origin"
            value={product.origin}
            onChange={handleChange}
          />
        </div>

        {isEditing && (
          <div>
            <label>Trạng thái duyệt:</label>
            <span className="approval-status">
              {getApprovalStatusText(product.approved)}
            </span>
          </div>
        )}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading
            ? "Đang xử lý..."
            : isEditing
            ? "Cập nhật"
            : "Thêm mới"}
        </button>
      </form>
    </div>
  );
}
