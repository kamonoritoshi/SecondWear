import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./css/ProductForm.css";

export default function ProductForm() {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    status: "Còn hàng",
    image: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dữ liệu sản phẩm:", product);
  };

  return (
    <div className="product-form-container">
      <h1>{id ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}</h1>
      <form className="product-form" onSubmit={handleSubmit}>
        <div>
          <label>Tên sản phẩm</label>
          <input
            type="text"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </div>
        <div>
          <label>Giá</label>
          <input
            type="number"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
        </div>
        <div>
          <label>Tình trạng</label>
          <select
            value={product.status}
            onChange={(e) => setProduct({ ...product, status: e.target.value })}
          >
            <option value="Còn hàng">Còn hàng</option>
            <option value="Hết hàng">Hết hàng</option>
          </select>
        </div>
        <div>
          <label>Hình ảnh</label>
          <input
            type="file"
            onChange={(e) =>
              setProduct({ ...product, image: URL.createObjectURL(e.target.files[0]) })
            }
          />
        </div>
        {product.image && <img src={product.image} alt="Preview" width="120" />}
        <button type="submit" className="submit-btn">
          {id ? "Cập nhật" : "Thêm mới"}
        </button>
      </form>
    </div>
  );
}
