import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./apiConfig";
import { toast } from "react-toastify";
import "./css/Favorites.css"; 

const Favorites = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [searchTerm, setSearchTerm] = useState("");

  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [favoriteStores, setFavoriteStores] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [isBulkEditMode, setIsBulkEditMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState(new Set());

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      toast.error("Bạn cần đăng nhập để xem danh sách yêu thích.");
      navigate("/login");
      return;
    }

    setIsBulkEditMode(false);
    setSelectedItems(new Set());

    const fetchFavorites = async () => {
      setLoading(true);
      setError(null);

      const endpoint =
        activeTab === "products" ? "/api/favorites" : "/api/favorites/stores";

      try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error(
            `Không thể tải danh sách ${
              activeTab === "products" ? "sản phẩm" : "cửa hàng"
            }.`
          );
        }
        const data = await response.json();

        if (activeTab === "products") {
          setFavoriteProducts(data);
        } else {
          setFavoriteStores(data);
        }
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [activeTab, navigate]);

  // --- HÀM XỬ LÝ ĐÃ ĐƯỢC CẬP NHẬT ĐỂ PHÙ HỢP VỚI API ---

  /**
   * Hàm gọi API để bỏ thích.
   * Do backend sử dụng cơ chế "toggle" POST cho từng ID, chúng ta cần lặp qua
   * mảng idsToRemove và gửi một request POST cho mỗi ID.
   * Promise.all được dùng để thực hiện các request này đồng thời.
   */
  const handleUnfavorite = async (idsToRemove) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      toast.error("Phiên đăng nhập hết hạn.");
      return;
    }

    // Xác định endpoint cơ sở dựa trên tab đang hoạt động
    const baseEndpoint =
      activeTab === "products"
        ? `${API_BASE_URL}/api/favorites`
        : `${API_BASE_URL}/api/favorites/stores`;

    try {
      // Tạo một mảng các promise, mỗi promise là một request POST để toggle favorite
      const unfavoritePromises = idsToRemove.map((id) =>
        fetch(`${baseEndpoint}/${id}`, {
          method: "POST", // Sử dụng phương thức POST theo API
          headers: {
            // "Content-Type" không thực sự cần thiết vì không có body, nhưng thêm vào cũng không sao
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          // API toggle không yêu cầu body
        })
      );

      // Chờ tất cả các request hoàn thành
      const responses = await Promise.all(unfavoritePromises);

      // Kiểm tra xem có request nào thất bại không
      const allOk = responses.every((res) => res.ok);

      if (!allOk) {
        throw new Error("Không thể bỏ thích một hoặc nhiều mục. Vui lòng thử lại.");
      }

      // Nếu tất cả thành công, cập nhật giao diện
      if (activeTab === "products") {
        setFavoriteProducts((prev) =>
          prev.filter((p) => !idsToRemove.includes(p.productId))
        );
      } else {
        setFavoriteStores((prev) =>
          prev.filter((s) => !idsToRemove.includes(s.accountId))
        );
      }

      toast.success("Đã bỏ thích thành công!");
      
      // Reset lại trạng thái chọn
      setSelectedItems(new Set());
      setIsBulkEditMode(false);
      
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Các hàm còn lại không cần thay đổi
  const handleBulkUnfavorite = () => {
    if (selectedItems.size === 0) {
      toast.warn("Bạn chưa chọn mục nào để bỏ thích.");
      return;
    }
    if (
      window.confirm(
        `Bạn có chắc muốn bỏ thích ${selectedItems.size} mục đã chọn?`
      )
    ) {
      handleUnfavorite(Array.from(selectedItems));
    }
  };

  const toggleBulkEditMode = () => {
    setIsBulkEditMode(!isBulkEditMode);
    setSelectedItems(new Set());
  };

  const handleSelectItem = (itemId) => {
    const newSelectedItems = new Set(selectedItems);
    if (newSelectedItems.has(itemId)) {
      newSelectedItems.delete(itemId);
    } else {
      newSelectedItems.add(itemId);
    }
    setSelectedItems(newSelectedItems);
  };

  // --- CÁC COMPONENT CON VÀ PHẦN RENDER (KHÔNG THAY ĐỔI) ---
  const filteredProducts = favoriteProducts.filter((p) =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStores = favoriteStores.filter((s) =>
    s.storeName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const EmptyState = ({ message }) => (
    <div className="favorites-empty">
      <p>{message}</p>
    </div>
  );

  const FavoriteProductList = ({
    data,
    isBulkEditMode,
    selectedItems,
    onSelectItem,
    onUnfavorite,
  }) => (
    <div className="favorites-grid">
      {data.map((item) => {
        const isSelected = selectedItems.has(item.productId);
        return (
          <div
            key={item.productId}
            className={`favorites-card-wrapper ${isSelected ? "selected" : ""}`}
            onClick={() => {
              if (isBulkEditMode) {
                onSelectItem(item.productId);
              }
            }}
            style={{ cursor: isBulkEditMode ? "pointer" : "default" }}
          >
            {!isBulkEditMode && (
              <button
                className="quick-unfavorite-btn"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (
                    window.confirm(
                      `Bạn có chắc muốn bỏ thích sản phẩm "${item.name}"?`
                    )
                  ) {
                    onUnfavorite([item.productId]);
                  }
                }}
              >
                &times;
              </button>
            )}
            {isBulkEditMode && (
              <input
                type="checkbox"
                className="favorite-item-checkbox"
                checked={isSelected}
                readOnly
              />
            )}
            <Link
              to={`/products/${item.productId}`}
              className="favorites-card"
              onClick={(e) => {
                if (isBulkEditMode) {
                  e.preventDefault();
                }
              }}
            >
              <img
                src={
                  item.imageUrls && item.imageUrls.length > 0
                    ? item.imageUrls[0]
                    : "/images/product.png"
                }
                alt={item.name}
                className="favorites-card-img"
              />
              <div className="favorites-card-info">
                <h3>{item.name}</h3>
                <p className="favorites-card-price">
                  {item.price
                    ? item.price.toLocaleString("vi-VN") + "₫"
                    : "N/A"}
                </p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );

  const FavoriteStoreList = ({
    data,
    isBulkEditMode,
    selectedItems,
    onSelectItem,
    onUnfavorite,
  }) => (
    <div className="favorites-grid">
      {data.map((item) => {
        const isSelected = selectedItems.has(item.accountId);
        return (
          <div
            key={item.accountId}
            className={`favorites-card-wrapper ${isSelected ? "selected" : ""}`}
            onClick={() => {
              if (isBulkEditMode) {
                onSelectItem(item.accountId);
              }
            }}
            style={{ cursor: isBulkEditMode ? "pointer" : "default" }}
          >
            {!isBulkEditMode && (
              <button
                className="quick-unfavorite-btn"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (
                    window.confirm(
                      `Bạn có chắc muốn bỏ thích cửa hàng "${item.storeName}"?`
                    )
                  ) {
                    onUnfavorite([item.accountId]);
                  }
                }}
              >
                &times;
              </button>
            )}
            {isBulkEditMode && (
              <input
                type="checkbox"
                className="favorite-item-checkbox"
                checked={isSelected}
                readOnly
              />
            )}
            <Link
              to={`/stores/${item.accountId}`}
              className="favorites-card"
              onClick={(e) => {
                if (isBulkEditMode) {
                  e.preventDefault();
                }
              }}
            >
              <img
                src={item.avatarUrl || "/src/icons/black-user-icon.png"}
                alt={item.storeName}
                className="favorites-card-img"
              />
              <div className="favorites-card-info">
                <h3>{item.storeName}</h3>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );

  const renderContent = () => {
    if (loading) return <div>Đang tải...</div>;
    if (error) return <EmptyState message={`Lỗi: ${error}`} />;

    if (activeTab === "products") {
      return filteredProducts.length > 0 ? (
        <FavoriteProductList
          data={filteredProducts}
          isBulkEditMode={isBulkEditMode}
          selectedItems={selectedItems}
          onSelectItem={handleSelectItem}
          onUnfavorite={handleUnfavorite}
        />
      ) : (
        <EmptyState message="Bạn chưa có sản phẩm yêu thích nào." />
      );
    } else {
      return filteredStores.length > 0 ? (
        <FavoriteStoreList
          data={filteredStores}
          isBulkEditMode={isBulkEditMode}
          selectedItems={selectedItems}
          onSelectItem={handleSelectItem}
          onUnfavorite={handleUnfavorite}
        />
      ) : (
        <EmptyState message="Bạn chưa có cửa hàng yêu thích nào." />
      );
    }
  };

  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <div className="favorites-tabs">
          <button
            className={`favorites-tab ${
              activeTab === "products" ? "active" : ""
            }`}
            onClick={() => setActiveTab("products")}
          >
            Sản phẩm
          </button>
          <button
            className={`favorites-tab ${
              activeTab === "stores" ? "active" : ""
            }`}
            onClick={() => setActiveTab("stores")}
          >
            Cửa hàng
          </button>
        </div>
        {(favoriteProducts.length > 0 || favoriteStores.length > 0) && (
          <button onClick={toggleBulkEditMode} className="bulk-edit-toggle-btn">
            {isBulkEditMode ? "Hủy" : "Chỉnh sửa"}
          </button>
        )}
      </div>

      <div className="favorites-search-bar">
        <input
          type="text"
          placeholder={`🔍 Tìm kiếm trong danh sách ${
            activeTab === "products" ? "sản phẩm" : "cửa hàng"
          }...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isBulkEditMode && (
        <div className="bulk-action-bar">
          <span>Đã chọn: {selectedItems.size}</span>
          <button
            onClick={handleBulkUnfavorite}
            className="bulk-unfavorite-btn"
            disabled={selectedItems.size === 0}
          >
            Bỏ thích mục đã chọn
          </button>
        </div>
      )}

      {renderContent()}
    </div>
  );
};

export default Favorites;