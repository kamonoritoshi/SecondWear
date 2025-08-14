import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheck, FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/PendingProducts.css";

const PendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("jwtToken");

  const fetchPendingProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/products/pending", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (err) {
      console.error("Lỗi khi tải sản phẩm pending:", err);
      toast.error("❌ Lỗi khi tải sản phẩm!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingProducts();
  }, []);

  const handleApprove = async (productId) => {
    try {
      await axios.put(`/api/admin/products/${productId}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p.productId !== productId));
      toast.success("Sản phẩm đã được phê duyệt!");
    } catch (err) {
      console.error("Lỗi khi phê duyệt sản phẩm:", err);
      toast.error("Lỗi khi phê duyệt sản phẩm!");
    }
  };

  const handleReject = async (productId) => {
    try {
      await axios.put(`/api/admin/products/${productId}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p.productId !== productId));
      toast.info("Sản phẩm đã bị từ chối!");
    } catch (err) {
      console.error("Lỗi khi từ chối sản phẩm:", err);
      toast.error("Lỗi khi từ chối sản phẩm!");
    }
  };

  if (loading) return <div className="pending-products">Đang tải sản phẩm...</div>;

  return (
    <div className="pending-products">
      {/* Toast notification container */}
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />

      {products.length === 0 ? (
        <p>Không có sản phẩm nào đang chờ phê duyệt</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.productId} className="product-card">
              <img
                src={product.images?.[0]?.imageUrl || "/placeholder.jpg"}
                alt={product.name}
              />
              <h3>{product.name}</h3>
              <p className="price">Giá: {product.price?.toLocaleString()}đ</p>
              <div className="actions">
                <button
                  className="approve-btn"
                  onClick={() => handleApprove(product.productId)}
                >
                  <FaCheck />
                </button>
                <button
                  className="reject-btn"
                  onClick={() => handleReject(product.productId)}
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingProducts;
