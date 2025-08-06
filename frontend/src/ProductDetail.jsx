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

  // --- State cho lựa chọn của người dùng trong Modal ---
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

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
        console.log("[ProductDetail] Dữ liệu sản phẩm:", productData);
        setProduct(productData);
        document.title = `${productData.name} - SecondWear`;

        setSelectedColor(productData.color);
        setSelectedSize(productData.size);

        // Sau khi có productData, ta mới biết là có cần fetch ảnh hay không
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

  const handleStartChat = async () => {
    const token = localStorage.getItem("jwtToken");
    const buyerId = currentUser?.accountId;
    const sellerId = product?.account?.accountId;

    if (!token) {
      toast.error("Bạn cần đăng nhập để chat với shop");
      return;
    }

    // ❗ CHẶN seller tự chat với chính sản phẩm của mình
    if (buyerId === sellerId) {
      toast.error("Bạn không thể chat với sản phẩm của chính mình!");
      return;
    }

    if (!product || !sellerId) {
      toast.error("Không lấy được thông tin người bán.");
      return;
    }

    try {
      // BƯỚC 1: Kiểm tra xem room đã tồn tại chưa
      const checkRes = await fetch(
        `${API_BASE_URL}/api/chat/room?buyerId=${buyerId}&sellerId=${sellerId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (checkRes.ok) {
        const data = await checkRes.json();
        console.log("[Chat] Room đã tồn tại:", data.roomId);
        navigate(`/chat/${data.roomId}`);
        return;
      }

      // BƯỚC 2: Nếu chưa có, tạo mới room
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
      console.log("[Chat] Room mới được tạo:", createdData.roomId);
      navigate(`/chat/${createdData.roomId}`);
    } catch (e) {
      console.error("[Chat] Lỗi khi xử lý chat:", e);
      toast.error("Không thể bắt đầu cuộc trò chuyện.");
    }
  };

  const handleCloseChat = () => {
    setShowChat(false);
    setRoomId(null);
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
    console.debug("[AddToCart] Triggered", {
      isAuthenticated,
      currentUser,
      product,
      selectedColor,
      selectedSize,
      quantity,
    });

    if (!isAuthenticated) {
      alert(t("Bạn phải đăng nhập để thêm sản phẩm vào giỏ hàng"));
      console.warn("[AddToCart] Not authenticated");
      navigate("/login");
      return;
    }

    if (!product || !selectedColor || !selectedSize) {
      alert(t("Bạn cần chọn đầy đủ màu sắc, kích cỡ và số lượng"));
      console.warn("[AddToCart] Missing product/color/size", {
        product,
        selectedColor,
        selectedSize,
      });
      return;
    }

    try {
      const userEmail = currentUser?.email;
      if (!userEmail) {
        alert("Không xác định được tài khoản người dùng!");
        console.error("[AddToCart] Missing user email", currentUser);
        return;
      }

      // Gọi API lấy tồn kho mới nhất
      const res = await fetch(`${API_BASE_URL}/api/products/${product.productId}`);
      if (!res.ok) {
        throw new Error("Không thể lấy thông tin tồn kho mới nhất!");
      }
      const latestProduct = await res.json();
      const latestQuantity = latestProduct.quantity;

      // Đọc giỏ hàng từ localStorage
      const cartKey = `cart_${userEmail}`;
      let cart = [];
      const cartStr = localStorage.getItem(cartKey);
      console.debug("[AddToCart] Read cartStr:", cartStr);
      if (cartStr) {
        try {
          cart = JSON.parse(cartStr);
        } catch (e) {
          console.error("[AddToCart] JSON.parse error", e);
          cart = [];
        }
      }

      // Kiểm tra sản phẩm đã có trong giỏ chưa
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
          console.warn("[AddToCart] Vượt tồn kho, không cộng thêm");
          return;
        }
        cart[existingIndex].quantity = totalQuantity;
        console.info("[AddToCart] Updated quantity:", cart[existingIndex]);
      } else {
        if (quantity > latestQuantity) {
          alert(
            `Sản phẩm đã hết hàng.`
          );
          console.warn("[AddToCart] Quá số lượng cho phép");
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
        console.info("[AddToCart] Added new item:", newItem);
      }

      // Lưu lại giỏ hàng
      localStorage.setItem(cartKey, JSON.stringify(cart));
      console.debug("[AddToCart] Saved cart:", cartKey, cart);

      if (typeof setCartCount === "function") {
        setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
      }

      alert("Thêm vào giỏ hàng thành công!");
      setIsOptionsModalOpen(false);
    } catch (err) {
      alert("Lỗi khi thêm vào giỏ hàng: " + err.message);
      console.error("[AddToCart] Exception", err);
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
        <button
          className="report-product-button"
          onClick={() => alert("Chức năng đang phát triển")}
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
                    className={`thumbnail-image${selectedImage === image.imageUrl ? " active" : ""
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
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-button" onClick={closeOptionsModal}>
              X
            </button>
            <h3>{t("modal_select_variant_title")}</h3>

            <div className="modal-product-display">
              <img
                src={selectedImage || "/images/placeholder.png"}
                alt={product.name}
                className="modal-product-image"
              />
              <span>{product.name}</span>
            </div>

            <div className="option-group">
              <p>{t("color_label")}:</p>
              <div className="options-wrapper">
                <button
                  className={`option-button ${selectedColor === product.color ? "selected" : ""
                    }`}
                  onClick={() => setSelectedColor(product.color)}
                >
                  {product.color}
                </button>
              </div>
            </div>
            <div className="option-group">
              <p>{t("size_label")}:</p>
              <div className="options-wrapper">
                <button
                  className={`option-button ${selectedSize === product.size ? "selected" : ""
                    }`}
                  onClick={() => setSelectedSize(product.size)}
                >
                  {product.size}
                </button>
              </div>
            </div>
            <div className="option-group quantity-control">
              <p>{t("quantity_label")}:</p>
              <div className="quantity-input-wrapper">
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange("decrease")}
                  disabled={product.quantity === 0}
                >
                  -
                </button>

                <input
                  type="number"
                  value={product.quantity === 0 ? 0 : quantity}
                  min={product.quantity === 0 ? 0 : 1}
                  readOnly
                  className="quantity-input"
                />
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange("increase")}
                  disabled={product.quantity === 0}
                >
                  +
                </button>

                <span
                  className="stock-info"
                  style={{ color: product.quantity === 0 ? "red" : undefined }}
                >
                  {product.quantity === 0
                    ? t("out_of_stock")
                    : `${t("quantity_label")}: ${product.quantity}`}
                </span>
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="modal-add-to-cart-button secondary-btn"
                onClick={handleAddToCart}
                disabled={product.quantity === 0}
              >
                {t("add_to_cart_button_label")}
              </button>
            </div>

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
