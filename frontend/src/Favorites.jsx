// src/Favorites.jsx
import React, { useState } from "react";

const Favorites = () => {
    const [activeTab, setActiveTab] = useState("products");
    const [searchTerm, setSearchTerm] = useState("");

    // Dữ liệu tạm thời (hiện tại database chưa có)
    const favoriteProducts = [];
    const favoriteStores = [];

    const filteredProducts = favoriteProducts.filter((p) =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredStores = favoriteStores.filter((s) =>
        s.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const EmptyState = ({ message }) => (
        <div className="favorites-empty">

            <p>{message}</p>
        </div>
    );

    const FavoriteList = ({ data }) => (
        <div className="favorites-grid">
            {data.map((item) => (
                <div className="favorites-card" key={item.id}>
                    <img src={item.image} alt={item.name} className="favorites-card-img" />
                    <div className="favorites-card-info">
                        <h3>{item.name}</h3>
                        <p>{item.subtitle}</p>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="favorites-container">
            <h1 className="favorites-title">Danh sách yêu thích</h1>

            {/* Tabs */}
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

            {/* Search */}
            <div className="favorites-search">
                <input
                    type="text"
                    placeholder="🔍 Tìm kiếm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Content */}
            {activeTab === "products" ? (
                filteredProducts.length > 0 ? (
                    <FavoriteList data={filteredProducts} />
                ) : (
                    <EmptyState message="Chưa có sản phẩm yêu thích." />
                )
            ) : filteredStores.length > 0 ? (
                <FavoriteList data={filteredStores} />
            ) : (
                <EmptyState message="Chưa có cửa hàng yêu thích." />
            )}
        </div>
    );
};

export default Favorites;
