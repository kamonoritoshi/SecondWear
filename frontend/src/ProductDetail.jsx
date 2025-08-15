// src/ProductDetail.jsx

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
// import { authFetch } from './services/api';
import { API_BASE_URL } from "./apiConfig";

// Import các hình ảnh
import likeIcon from "./icons/like-icon.png";
import likedIcon from "./icons/liked-icon.png";
import reportIcon from "./icons/report-icon.png";

import { BiMessageRoundedDetail } from "react-icons/bi";
import { toast } from "react-toastify";

// Hằng số cho các lý do báo cáo
const reportReasons = [
  "Hàng giả, hàng nhái",
  "Thông tin sai sự thật",
  "Sản phẩm bị cấm",
  "Spam",
  "Lý do khác",
];

const ProductDetail = ({ t, setCartCount }) => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();

  // --- State quản lý dữ liệu ---
  const [product, setProduct] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // --- State quản lý trạng thái UI ---
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  // --- State cho các Modal ---
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false); // <-- MỚI

  // --- State cho lựa chọn của người dùng trong Modal ---
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  // --- State cho Form Báo cáo ---
  const [reportReason, setReportReason] = useState(""); // <-- MỚI
  const [reportDetails, setReportDetails] = useState(""); // <-- MỚI
  const [isSubmittingReport, setIsSubmittingReport] = useState(false); // <-- MỚI

  useEffect(() => {
    const fetchProductData = async () => {
      if (!productId) {
        setError("Không có ID sản phẩm.");
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const productRes = await fetch(
          `${API_BASE_URL}/api/products/${productId}`
        );
        if (!productRes.ok) throw new Error("Không tìm thấy sản phẩm.");
        const productData = await productRes.json();
        setProduct(productData);
        document.title = `${productData.name} - SecondWear`;
        setSelectedColor(productData.color);
        setSelectedSize(productData.size);
        if (productData.images && productData.images.length > 0) {
          setProductImages(productData.images);
          setSelectedImage(productData.images[0].imageUrl);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [productId]);

  // --- Handlers cho Báo cáo --- // <-- KHỐI MỚI
  const handleOpenReportModal = () => {
    if (!isAuthenticated) {
      toast.error("Bạn cần đăng nhập để báo cáo sản phẩm.");
      navigate("/login");
      return;
    }
    // Chặn người dùng tự báo cáo sản phẩm của mình
    if (currentUser?.accountId === product?.account?.accountId) {
      toast.error("Bạn không thể báo cáo sản phẩm của chính mình.");
      return;
    }
    setIsReportModalOpen(true);
  };

  const handleCloseReportModal = () => {
    setIsReportModalOpen(false);
    setReportReason("");
    setReportDetails("");
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    if (!reportReason) {
      toast.warn("Vui lòng chọn lý do báo cáo.");
      return;
    }

    setIsSubmittingReport(true);
    const token = localStorage.getItem("jwtToken");

    try {
      const response = await fetch(`${API_BASE_URL}/api/reports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: productId,
          reason: reportReason,
          details: reportDetails,
          reporterId: currentUser?.accountId, // Gửi ID người báo cáo
        }),
      });

      if (!response.ok) {
        // Cố gắng đọc lỗi từ body response
        const errorData = await response
          .json()
          .catch(() => ({ message: "Gửi báo cáo thất bại." }));
        throw new Error(errorData.message || "Gửi báo cáo thất bại.");
      }

      toast.success("Báo cáo của bạn đã được gửi thành công. Cảm ơn bạn!");
      handleCloseReportModal();
    } catch (error) {
      console.error("Lỗi khi gửi báo cáo:", error);
      toast.error(error.message);
    } finally {
      setIsSubmittingReport(false);
    }
  };

  // --- Các handlers khác ---
  const handleStartChat = async () => {
    const token = localStorage.getItem("jwtToken");
    const buyerId = currentUser?.accountId;
    const sellerId = product?.account?.accountId;
    if (!token) {
      toast.error("Bạn cần đăng nhập để chat với shop");
      return;
    }
    if (buyerId === sellerId) {
      toast.error("Bạn không thể chat với sản phẩm của chính mình!");
      return;
    }
    if (!product || !sellerId) {
      toast.error("Không lấy được thông tin người bán.");
      return;
    }
    try {
      const checkRes = await fetch(
        `${API_BASE_URL}/api/chat/room?buyerId=${buyerId}&sellerId=${sellerId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (checkRes.ok) {
        const data = await checkRes.json();
        navigate(`/chat/${data.roomId}`);
        return;
      }
      const createRes = await fetch(
        `${API_BASE_URL}/api/chat/room?buyerId=${buyerId}&sellerId=${sellerId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!createRes.ok) throw new Error("Không tạo được phòng chat");
      const createdData = await createRes.json();
      navigate(`/chat/${createdData.roomId}`);
    } catch (e) {
      console.error("[Chat] Lỗi khi xử lý chat:", e);
      toast.error("Không thể bắt đầu cuộc trò chuyện.");
    }
  };

  const handleQuantityChange = useCallback(
    (type) => {
      if (!product) return;
      setQuantity((prev) => {
        const stock = product.quantity || 0;
        if (stock === 0) return 0;
        if (type === "decrease" && prev > 1) return prev - 1;
        if (type === "increase" && prev < stock) return prev + 1;
        return prev;
      });
    },
    [product]
  );

  const handleAddToCart = useCallback(async () => {
    if (!isAuthenticated) {
      alert(t("Bạn phải đăng nhập để thêm sản phẩm vào giỏ hàng"));
      navigate("/login");
      return;
    }
    if (!product || !selectedColor || !selectedSize) {
      alert(t("Bạn cần chọn đầy đủ màu sắc, kích cỡ và số lượng"));
      return;
    }
    try {
      const userEmail = currentUser?.email;
      if (!userEmail) {
        alert("Không xác định được tài khoản người dùng!");
        return;
      }
      const res = await fetch(
        `${API_BASE_URL}/api/products/${product.productId}`
      );
      if (!res.ok) {
        throw new Error("Không thể lấy thông tin tồn kho mới nhất!");
      }
      const latestProduct = await res.json();
      const latestQuantity = latestProduct.quantity;
      const cartKey = `cart_${userEmail}`;
      let cart = [];
      const cartStr = localStorage.getItem(cartKey);
      if (cartStr) {
        try {
          cart = JSON.parse(cartStr);
        } catch (e) {
          cart = [];
        }
      }
      const existingIndex = cart.findIndex(
        (item) =>
          item.productId === product.productId &&
          item.color === selectedColor &&
          item.size === selectedSize
      );
      if (existingIndex !== -1) {
        const totalQuantity = cart[existingIndex].quantity + quantity;
        if (totalQuantity > latestQuantity) {
          alert(
            `Số lượng cộng dồn (${totalQuantity}) vượt quá tồn kho hiện tại (${latestQuantity}).`
          );
          return;
        }
        cart[existingIndex].quantity = totalQuantity;
      } else {
        if (quantity > latestQuantity) {
          alert(`Sản phẩm đã hết hàng.`);
          return;
        }
        const newItem = {
          productId: product.productId,
          name: product.name,
          image:
            product.images && product.images.length > 0
              ? product.images[0].imageUrl
              : "",
          price: product.price,
          color: selectedColor,
          size: selectedSize,
          quantity: quantity,
          maxQuantity: latestQuantity,
          shopName:
            product.account?.user?.name ||
            product.shopName ||
            product.sellerName ||
            "Shop ẩn danh",
        };
        cart.push(newItem);
      }
      localStorage.setItem(cartKey, JSON.stringify(cart));
      if (typeof setCartCount === "function") {
        setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
      }
      alert("Thêm vào giỏ hàng thành công!");
      setIsOptionsModalOpen(false);
    } catch (err) {
      alert("Lỗi khi thêm vào giỏ hàng: " + err.message);
    }
  }, [
    isAuthenticated,
    currentUser,
    product,
    selectedColor,
    selectedSize,
    quantity,
    setCartCount,
    setIsOptionsModalOpen,
    t,
    navigate,
  ]);

  const handleLikeToggle = useCallback(() => setIsLiked((prev) => !prev), []);
  const openOptionsModal = useCallback(() => setIsOptionsModalOpen(true), []);
  const closeOptionsModal = useCallback(() => setIsOptionsModalOpen(false), []);

  if (loading)
    return (
      <main
        className="product-detail-page"
        style={{ background: "var(--section-bg)", color: "var(--main-text)" }}
      >
        <div>Đang tải...</div>
      </main>
    );
  if (error)
    return (
      <main
        className="product-detail-page"
        style={{ background: "var(--section-bg)", color: "var(--main-text)" }}
      >
        <div>Lỗi: {error}</div>
      </main>
    );
  if (!product)
    return (
      <main
        className="product-detail-page"
        style={{ background: "var(--section-bg)", color: "var(--main-text)" }}
      >
        <div>Không tìm thấy sản phẩm.</div>
      </main>
    );

  return (
    <>
      <main
        className="product-detail-page"
        style={{ background: "var(--section-bg)" }}
      >
        {/* THAY ĐỔI onClick ở đây */}
        <button
          className="report-product-button"
          onClick={handleOpenReportModal}
        >
          <span style={{ color: "var(--secondary-text)" }}>
            {t("report_button_label")}
          </span>
          <img
            src={reportIcon}
            alt={t("report_button_label")}
            className="header-icon"
          />
        </button>

        <section className="product-main-info">
          {/* ... Phần JSX còn lại của bạn giữ nguyên ... */}
          <div className="product-image-gallery" style={{ border: "none" }}>
            <div
              className="main-image-container"
              style={{
                width: 400,
                height: 400,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--modal-bg)",
                borderRadius: 8,
                overflow: "hidden",
                border: "1px solid var(--border)",
              }}
            >
              <img
                src={selectedImage || "/images/placeholder.png"}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  display: "block",
                }}
                className="main-product-image"
              />
            </div>
            <div
              className="thumbnail-images-container"
              style={{ display: "flex", gap: 8 }}
            >
              {productImages.map((image) => (
                <div
                  key={image.imageId}
                  style={{
                    width: 60,
                    height: 60,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    borderRadius: 6,
                    border:
                      selectedImage === image.imageUrl
                        ? "2px solid var(--highlight)"
                        : "2px solid transparent",
                    background: "var(--modal-bg)",
                    boxSizing: "border-box",
                    cursor: "pointer",
                  }}
                  onMouseOver={() => setSelectedImage(image.imageUrl)}
                >
                  <img
                    src={image.imageUrl}
                    alt={`Thumbnail ${image.imageId}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                    }}
                    className={`thumbnail-image${
                      selectedImage === image.imageUrl ? " active" : ""
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="product-details-content">
            <h1 className="product-name" style={{ color: "var(--main-text)" }}>
              {product.name}
            </h1>
            <div className="product-meta">
              <h2
                className="section-title"
                style={{ color: "var(--main-text)" }}
              >
                {t("product_details_title")}
              </h2>
              <p className="price-info">
                <span style={{ color: "var(--main-text)" }}>
                  {t("price_label")}
                </span>
                : <span></span>
                <span className="current-price">
                  {product.price.toLocaleString("vi-VN")}₫
                </span>
              </p>
              <p style={{ color: "var(--main-text)" }}>
                <span>{t("category_label")}</span>
                <span>:</span>{" "}
                <span
                  className="detail-value"
                  style={{ color: "var(--main-text)" }}
                >
                  {product.category?.name || "Chưa phân loại"}
                </span>
              </p>
              <p style={{ color: "var(--main-text)" }}>
                <span>{t("brand_label")}</span>
                <span>:</span>{" "}
                <span
                  className="detail-value"
                  style={{ color: "var(--main-text)" }}
                >
                  {product.brand || "Không có thương hiệu"}
                </span>
              </p>
              <p style={{ color: "var(--main-text)" }}>
                <span>{t("origin_label")}</span>
                <span>:</span>{" "}
                <span
                  className="detail-value"
                  style={{ color: "var(--main-text)" }}
                >
                  {product.origin || "Không rõ xuất xứ"}
                </span>
              </p>
              <p style={{ color: "var(--main-text)" }}>
                <span>{t("quality_label")}</span>
                <span>:</span>{" "}
                <span className="quality-rating">{product.condition}</span>
              </p>
              <p
                style={{
                  color: "var(--main-text)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span>Cửa hàng:</span>
                <span style={{ color: "#007bff", fontWeight: "bold" }}>
                  {product.account?.user?.name || "Người bán ẩn danh"}
                </span>
                <button
                  className="chat-button"
                  onClick={handleStartChat}
                  title={t("chat_with_seller")}
                >
                  <BiMessageRoundedDetail size={20} />
                </button>
              </p>
              <p style={{ color: "var(--main-text)" }}>
                <span>{t("location_label")}</span>
                <span>:</span>{" "}
                <span className="location">
                  {product.account?.user?.address || "Không rõ vị trí"}
                </span>
              </p>
            </div>
            <div className="product-description">
              <p>
                <span
                  className="description-heading"
                  style={{ color: "var(--main-text)" }}
                >
                  {t("description_heading")}
                </span>
                :{" "}
                <span
                  className="description-text"
                  style={{ color: "var(--main-text)" }}
                >
                  {product.description}
                </span>
              </p>
            </div>
            <div className="product-actions">
              <button className="like-toggle" onClick={handleLikeToggle}>
                <img src={isLiked ? likedIcon : likeIcon} alt="Like" />
              </button>
              <button className="buy-now-button" onClick={openOptionsModal}>
                {t("buy_now_button_label")}
              </button>
              <button className="add-to-cart-button" onClick={openOptionsModal}>
                {t("add_to_cart_button_label")}
              </button>
            </div>
          </div>
        </section>
      </main>

      {isOptionsModalOpen && (
        <div className="overlay-modal active" onClick={closeOptionsModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "500px",
              background: "var(--modal-bg)",
              borderRadius: "8px",
              padding: "20px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              color: "var(--main-text)",
            }}
          >
            <button
              className="close-modal-button"
              onClick={closeOptionsModal}
              style={{
                background: "transparent",
                border: "none",
                fontSize: "18px",
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",
                color: "var(--secondary-text)",
              }}
            >
              ×
            </button>

            {/* Thông tin sản phẩm */}
            <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
              <img
                src={selectedImage || "/images/placeholder.png"}
                alt={product.name}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                }}
              />
              <div>
                <h4 style={{ marginBottom: "5px" }}>{product.name}</h4>
                <p style={{ color: "var(--highlight)", fontWeight: "bold" }}>
                  {product.price.toLocaleString("vi-VN")}₫
                </p>
                <p style={{ fontSize: "14px", color: "var(--secondary-text)" }}>
                  Tồn kho: {product.quantity || 0}
                </p>
              </div>
            </div>

            {/* Màu sắc */}
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "500",
                }}
              >
                Màu sắc:
              </label>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {(product.colors && product.colors.length > 0
                  ? product.colors
                  : [product.color]
                ).map((color, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "20px",
                      border:
                        selectedColor === color
                          ? "2px solid #f57224"
                          : "1px solid #ccc",
                      background:
                        selectedColor === color
                          ? "rgba(245, 114, 36, 0.1)"
                          : "transparent",
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "#333",
                      transition: "0.2s",
                    }}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Kích cỡ */}
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "500",
                }}
              >
                Kích cỡ:
              </label>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {(product.sizes && product.sizes.length > 0
                  ? product.sizes
                  : [product.size]
                ).map((size, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "20px",
                      border:
                        selectedSize === size
                          ? "2px solid #f57224"
                          : "1px solid #ccc",
                      background:
                        selectedSize === size
                          ? "rgba(245, 114, 36, 0.1)"
                          : "transparent",
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "#333",
                      transition: "0.2s",
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Số lượng */}
            <div className="form-group" style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "500",
                }}
              >
                Số lượng:
              </label>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <button
                  type="button"
                  onClick={() => handleQuantityChange("decrease")}
                  style={{
                    width: "30px",
                    height: "30px",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  min={1}
                  max={product.quantity || 1}
                  readOnly
                  style={{
                    width: "50px",
                    textAlign: "center",
                    border: "1px solid var(--border)",
                    borderRadius: "4px",
                    padding: "4px",
                    color: "var(--main-text)",
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleQuantityChange("increase")}
                  style={{
                    width: "30px",
                    height: "30px",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Nút hành động */}
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={handleAddToCart}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: "#f57224",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Thêm vào giỏ
              </button>
              <button
                onClick={() => {
                  handleAddToCart();
                  navigate("/checkout");
                }}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: "#ff424e",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL BÁO CÁO MỚI --- */}
      {isReportModalOpen && (
        <div className="overlay-modal active" onClick={handleCloseReportModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-modal-button"
              onClick={handleCloseReportModal}
            >
              X
            </button>
            <h3>Báo cáo sản phẩm vi phạm</h3>
            <form
              onSubmit={handleReportSubmit}
              className="report-form"
              style={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <div className="form-group">
                <label
                  htmlFor="reportReason"
                  style={{ display: "block", marginBottom: "5px" }}
                >
                  Lý do báo cáo:
                </label>
                <select
                  id="reportReason"
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                >
                  <option value="" disabled>
                    -- Chọn một lý do --
                  </option>
                  {reportReasons.map((reason, index) => (
                    <option key={index} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label
                  htmlFor="reportDetails"
                  style={{ display: "block", marginBottom: "5px" }}
                >
                  Mô tả chi tiết (không bắt buộc):
                </label>
                <textarea
                  id="reportDetails"
                  rows="4"
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  placeholder="Cung cấp thêm thông tin về vi phạm..."
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    resize: "vertical",
                  }}
                />
              </div>
              <div
                className="modal-actions"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                  marginTop: "10px",
                }}
              >
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={handleCloseReportModal}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="primary-btn"
                  disabled={isSubmittingReport}
                >
                  {isSubmittingReport ? "Đang gửi..." : "Gửi báo cáo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default function WrappedProductDetail(props) {
  return (
    <>
      <ProductDetail {...props} />
    </>
  );
}
