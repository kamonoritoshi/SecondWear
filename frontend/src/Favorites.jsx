import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./apiConfig";
import { toast } from "react-toastify";
import "./css/Favorites.css";

const Favorites = () => {
    const [activeTab, setActiveTab] = useState("products");
    const [searchTerm, setSearchTerm] = useState("");
    
    // State riêng cho từng tab
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [favoriteStores, setFavoriteStores] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
            toast.error("Bạn cần đăng nhập để xem danh sách yêu thích.");
            navigate("/login");
            return;
        }

        const fetchFavorites = async () => {
            setLoading(true);
            setError(null);
            
            // Xác định endpoint dựa trên tab đang active
            const endpoint = activeTab === 'products' ? '/api/favorites' : '/api/favorites/stores';

            try {
                const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) {
                    throw new Error(`Không thể tải danh sách ${activeTab === 'products' ? 'sản phẩm' : 'cửa hàng'}.`);
                }
                const data = await response.json();
                
                // Cập nhật state tương ứng
                if (activeTab === 'products') {
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

    const filteredProducts = favoriteProducts.filter((p) =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const filteredStores = favoriteStores.filter((s) =>
        s.storeName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const EmptyState = ({ message }) => (
        <div className="favorites-empty"><p>{message}</p></div>
    );

    const FavoriteProductList = ({ data }) => (
        <div className="favorites-grid">
            {data.map((item) => (
                <Link to={`/products/${item.productId}`} className="favorites-card" key={item.productId}>
                    <img
                        src={item.imageUrls && item.imageUrls.length > 0 ? item.imageUrls[0] : "/images/product.png"}
                        alt={item.name}
                        className="favorites-card-img"
                    />
                    <div className="favorites-card-info">
                        <h3>{item.name}</h3>
                        <p className="favorites-card-price">{item.price ? item.price.toLocaleString("vi-VN") + '₫' : 'N/A'}</p>
                    </div>
                </Link>
            ))}
        </div>
    );

    // Component mới để hiển thị danh sách cửa hàng
    const FavoriteStoreList = ({ data }) => (
        <div className="favorites-grid">
            {data.map((item) => (
                <Link to={`/stores/${item.accountId}`} className="favorites-card" key={item.accountId}>
                    <img
                        src={item.avatarUrl || "/src/icons/black-user-icon.png"}
                        alt={item.storeName}
                        className="favorites-card-img" // Dùng chung style ảnh tròn
                    />
                    <div className="favorites-card-info">
                        <h3>{item.storeName}</h3>
                    </div>
                </Link>
            ))}
        </div>
    );

    const renderContent = () => {
        if (loading) return <div>Đang tải...</div>;
        if (error) return <EmptyState message={`Lỗi: ${error}`} />;

        if (activeTab === 'products') {
            return filteredProducts.length > 0 ? (
                <FavoriteProductList data={filteredProducts} />
            ) : (
                <EmptyState message="Bạn chưa có sản phẩm yêu thích nào." />
            );
        } else { // activeTab === 'stores'
            return filteredStores.length > 0 ? (
                <FavoriteStoreList data={filteredStores} />
            ) : (
                <EmptyState message="Bạn chưa có cửa hàng yêu thích nào." />
            );
        }
    };

    return (
        <div className="favorites-container">
            <div className="favorites-tabs">
                <button
                    className={`favorites-tab ${activeTab === "products" ? "active" : ""}`}
                    onClick={() => setActiveTab("products")}
                >
                    Sản phẩm
                </button>
                <button
                    className={`favorites-tab ${activeTab === "stores" ? "active" : ""}`}
                    onClick={() => setActiveTab("stores")}
                >
                    Cửa hàng
                </button>
            </div>

            <div className="favorites-search">
                <input
                    type="text"
                    placeholder={`🔍 Tìm kiếm trong danh sách ${activeTab === 'products' ? 'sản phẩm' : 'cửa hàng'}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {renderContent()}
        </div>
    );
};

export default Favorites;
