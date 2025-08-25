import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/PendingProducts.css"; // Chúng ta sẽ cập nhật file CSS này

export default function PendingProducts() {
  const [products, setProducts] = useState([]);
  const [reasonMap, setReasonMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processingId, setProcessingId] = useState(null); // Thêm state để theo dõi sản phẩm đang xử lý

  const token = localStorage.getItem("jwtToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetchPendingProducts();
  }, []);

  const fetchPendingProducts = () => {
    setLoading(true);
    setError("");
    axios
      .get("/api/admin/products/pending", config)
      .then((res) => {
        console.log("Dữ liệu sản phẩm từ API:", res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Lỗi khi tải sản phẩm chờ duyệt:", err);
        setError("Không thể tải danh sách sản phẩm. Vui lòng thử lại.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleApprove = async (productId) => {
    setProcessingId(productId);
    try {
      await axios.put(`/api/admin/products/${productId}/approve`, null, config);
      alert("✔ Đã phê duyệt sản phẩm thành công!");
      setProducts((prevProducts) => prevProducts.filter((p) => p.productId !== productId));
    } catch (err) {
      console.error("Lỗi khi phê duyệt sản phẩm:", err);
      alert("❌ Có lỗi xảy ra khi phê duyệt sản phẩm.");
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (productId) => {
    const reason = reasonMap[productId] || "";
    if (!reason.trim()) {
      alert("Vui lòng nhập lý do từ chối.");
      return;
    }
    setProcessingId(productId);
    try {
      await axios.put(`/api/admin/products/${productId}/reject`, { reason }, config);
      alert("❌ Đã từ chối sản phẩm thành công!");
      setProducts((prevProducts) => prevProducts.filter((p) => p.productId !== productId));
    } catch (err) {
      console.error("Lỗi khi từ chối sản phẩm:", err);
      alert("❌ Có lỗi xảy ra khi từ chối sản phẩm.");
    } finally {
      setProcessingId(null);
    }
  };

  const handleReasonChange = (productId, value) => {
    setReasonMap((prev) => ({ ...prev, [productId]: value }));
  };

  if (loading) {
    return <div className="pending-products-status">Đang tải danh sách sản phẩm...</div>;
  }

  if (error) {
    return <div className="pending-products-status error">{error}</div>;
  }

  return (
    <div className="pending-products-container">
      <h2 className="page-title">Sản phẩm chờ duyệt</h2>

      {products.length === 0 ? (
        <div className="no-products-message">
          🎉 Tuyệt vời! Không có sản phẩm nào đang chờ duyệt.
        </div>
      ) : (
        <div className="products-grid">
          {products.map((p) => (
            <div key={p.productId} className="product-card">
              <div className="card-image-wrapper">
                <img
                  src={p.images[0]?.imageUrl || "https://via.placeholder.com/300"}
                  alt={p.name}
                  className="card-image"
                />
              </div>
              <div className="card-content">
                <h3 className="card-title">{p.name}</h3>
                <p className="card-seller">
                  Người bán: <strong>{p.account?.user?.name || 'Không rõ'}</strong>
                </p>
                <p className="card-price">{p.price.toLocaleString()}₫</p>
                <p className="card-description">{p.description}</p>
                <div className="card-actions">
                  <input
                    type="text"
                    className="reason-input"
                    placeholder="Lý do từ chối (bắt buộc khi từ chối)"
                    value={reasonMap[p.productId] || ""}
                    onChange={(e) => handleReasonChange(p.productId, e.target.value)}
                    disabled={processingId === p.productId}
                  />
                  <div className="button-group">
                    <button
                      className="btn-approve"
                      onClick={() => handleApprove(p.productId)}
                      disabled={processingId === p.productId}
                    >
                      {processingId === p.productId ? "..." : "Phê duyệt"}
                    </button>
                    <button
                      className="btn-reject"
                      onClick={() => handleReject(p.productId)}
                      disabled={processingId === p.productId}
                    >
                      {processingId === p.productId ? "..." : "Từ chối"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}