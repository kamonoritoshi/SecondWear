import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./css/ProductManagement.css";

const getCategoryList = () => [
  { name: "Áo", categoryId: 1 },
  { name: "Quần", categoryId: 2 },
  { name: "Váy / Đầm", categoryId: 3 },
  { name: "Giày dép", categoryId: 4 },
  { name: "Túi xách / Ba lô", categoryId: 5 },
  { name: "Mũ", categoryId: 6 },
  { name: "Kính", categoryId: 7 },
  { name: "Trang sức", categoryId: 8 },
  { name: "Thắt lưng", categoryId: 9 },
  { name: "Đồ bơi", categoryId: 10 },
  { name: "Đồ ngủ / Ở nhà", categoryId: 11 },
  { name: "Khăn / Phụ kiện khác", categoryId: 12 },
  { name: "Khác", categoryId: 13 },
];

const PAGE_SIZE = 16;

const ProductManagement = () => {
  const { currentUser } = useAuth();
  const [allProducts, setAllProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categoryList = getCategoryList("light"); // hoặc "dark" tùy vào theme

  const paginatedProducts = allProducts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );
  const totalPages = Math.ceil(allProducts.length / PAGE_SIZE);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    fetch("/api/seller/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const myProducts = data
          .filter((p) => p.accountId === currentUser.accountId)
          .map((p) => ({
            ...p,
            categoryId: p.category?.categoryId || "",
          }));
        console.log("API products:", myProducts); // 👈 log tại đây
        setAllProducts(myProducts);
      })
      .catch((err) => console.error("Lỗi khi tải sản phẩm:", err));
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCloseModal = () => setSelectedProduct(null);

  const handleEdit = (product) => {
    setSelectedProduct({
      ...product,
      categoryId: product.category?.categoryId?.toString() || "",
      condition: product.condition || "",
      isNew: false,
    });
  };

  const handleDelete = async (product) => {
    if (!window.confirm(`Xoá "${product.name}"?`)) return;
    try {
      const res = await fetch(`/api/products/${product.productId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setAllProducts((prev) =>
          prev.filter((p) => p.productId !== product.productId)
        );
      }
    } catch (err) {
      console.error("Lỗi xoá sản phẩm:", err);
    }
  };

  const handleSaveProduct = async () => {
    const method = selectedProduct.isNew ? "POST" : "PUT";
    const url = selectedProduct.isNew
      ? "/api/products"
      : `/api/products/${selectedProduct.productId}`;
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...selectedProduct,
          accountId: currentUser.accountId,
        }),
      });
      const saved = await res.json();
      if (res.ok) {
        if (selectedProduct.isNew) {
          setAllProducts((prev) => [saved, ...prev]);
        } else {
          setAllProducts((prev) =>
            prev.map((p) => (p.productId === saved.productId ? saved : p))
          );
        }
        setSelectedProduct(null);
      }
    } catch (err) {
      console.error("Lỗi lưu sản phẩm:", err);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    console.log("Ảnh đã chọn:", files);
    // TODO: upload lên server nếu cần
  };

  return (
    <div className="product-management">
      <h2>Quản lý sản phẩm</h2>
      <div className="product-grid">
        {paginatedProducts.map((product) => (
          <div
            key={product.productId}
            className="product-card"
            onClick={() => setSelectedProduct(product)}
          >
            <img
              src={product.images?.[0]?.imageUrl || "/images/placeholder.png"}
              alt={product.name}
              className="product-thumbnail"
            />
            <div className="product-info">
              <h4>{product.name}</h4>
              <p>{product.price.toLocaleString()} đ</p>
              <p>{product.status}</p>
            </div>
            <div className="product-actions">
              <button
                className="edit-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(product);
                }}
              >
                Sửa
              </button>
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(product);
                }}
              >
                Xoá
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={page === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>
              {selectedProduct.isNew ? "Thêm sản phẩm" : "Chỉnh sửa sản phẩm"}
            </h2>

            <label>Tên sản phẩm</label>
            <input
              name="name"
              value={selectedProduct.name}
              onChange={handleChange}
            />

            <label>Giá</label>
            <input
              name="price"
              type="number"
              value={selectedProduct.price}
              onChange={handleChange}
            />

            <label>Danh mục</label>
            <select
              name="categoryId"
              value={selectedProduct.categoryId?.toString() || ""}
              onChange={handleChange}
            >
              <option value="">-- Chọn danh mục --</option>
              {categoryList.map((c) => (
                <option key={c.categoryId} value={c.categoryId.toString()}>
                  {c.name}
                </option>
              ))}
            </select>

            <label>Thương hiệu</label>
            <input
              name="brand"
              value={selectedProduct.brand || ""}
              onChange={handleChange}
            />

            <label>Xuất xứ</label>
            <input
              name="origin"
              value={selectedProduct.origin || ""}
              onChange={handleChange}
            />

            <label>Chất lượng</label>
            <select
              name="condition"
              value={selectedProduct.condition || ""}
              onChange={handleChange}
            >
              <option value="">-- Chọn chất lượng --</option>
              <option value="Như mới">Như mới</option>
              <option value="Mới 99%">Mới 99%</option>
              <option value="Đã qua sử dụng">Đã qua sử dụng</option>
              <option value="Tốt">Tốt</option>
              <option value="Khá">Khá</option>
              <option value="Hư nhẹ">Hư nhẹ</option>
            </select>

            <label>Mô tả</label>
            <textarea
              name="description"
              value={selectedProduct.description || ""}
              onChange={handleChange}
              rows={3}
            />

            <label>URL ảnh (xuống dòng mỗi link)</label>
            <textarea
              value={selectedProduct.images.map((i) => i.imageUrl).join("\n")}
              onChange={(e) => {
                const urls = e.target.value
                  .split("\n")
                  .map((link) => ({ imageUrl: link.trim() }))
                  .filter((i) => i.imageUrl);
                setSelectedProduct((p) => ({ ...p, images: urls }));
              }}
              rows={3}
            />

            <label>Hoặc chọn ảnh</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
            />

            <div className="modal-actions">
              <button className="close-btn" onClick={handleCloseModal}>
                Hủy
              </button>
              <button className="save-btn" onClick={handleSaveProduct}>
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        className="floating-add-btn"
        onClick={() =>
          setSelectedProduct({
            name: "",
            price: "",
            description: "",
            categoryId: "",
            brand: "",
            origin: "",
            condition: "",
            images: [],
            isNew: true,
          })
        }
      >
        ＋
      </button>
    </div>
  );
};

export default ProductManagement;
