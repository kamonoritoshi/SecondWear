import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "./apiConfig";
import Footer from "./Footer";

// Sử dụng lại ProductCard từ HomePage, áp dụng i18n cho các văn bản
const ProductCard = ({ product, t }) => (
  <Link to={`/products/${product.productId}`} className="product-card">
    <div className="product-card-image-container">
      <img
        src={
          product.images && product.images.length > 0
            ? product.images[0].imageUrl
            : "/images/placeholder.png"
        }
        alt={product.name}
        className="product-card-image"
      />
      {product.discountPercentage && (
        <span className="discount-badge-card">
          {product.discountPercentage}%
        </span>
      )}
    </div>
    <div className="product-card-info">
      <h3 className="product-card-name">{product.name}</h3>
      <div className="product-card-price-container">
        <p className="product-card-price">
          {product.price.toLocaleString("vi-VN")}₫
        </p>
        <button
          className="add-to-cart-icon-btn"
          onClick={(e) => {
            e.preventDefault();
            alert(t ? t("add_to_cart_alert") : "Đã thêm vào giỏ!");
          }}
        >
          <img
            src="/src/icons/black-cart-icon.png"
            alt={t ? t("add_to_cart_alt") : "Thêm vào giỏ"}
          />
        </button>
      </div>
    </div>
  </Link>
);

// Danh mục với translation keys
const CATEGORY_LIST = [
  { label: "category_all", defaultLabel: "Tất cả", value: "" },
  { label: "category_shirts", defaultLabel: "Áo", value: 1 },
  { label: "category_pants", defaultLabel: "Quần", value: 2 },
  { label: "category_dresses", defaultLabel: "Đầm / Váy", value: 3 },
  { label: "category_shoes", defaultLabel: "Giày", value: 4 },
  { label: "category_bags", defaultLabel: "Túi xách", value: 5 },
  { label: "category_hats", defaultLabel: "Mũ", value: 6 },
  { label: "category_glasses", defaultLabel: "Kính", value: 7 },
  { label: "category_jewelry", defaultLabel: "Trang sức", value: 8 },
  { label: "category_belts", defaultLabel: "Thắt lưng", value: 9 },
  { label: "category_swimwear", defaultLabel: "Đồ bơi", value: 10 },
  { label: "category_loungewear", defaultLabel: "Đồ ngủ / Ở nhà", value: 11 },
  { label: "category_accessories", defaultLabel: "Khăn / Phụ kiện", value: 12 },
  { label: "category_others", defaultLabel: "Khác", value: 13 },
];

const ProductsPage = ({ t }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(
    () => localStorage.getItem("filter_category") || ""
  );
  const [searchQuery, setSearchQuery] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("search") || "";
  });
  const [priceRange, setPriceRange] = useState(() => {
    const saved = localStorage.getItem("filter_priceRange");
    if (saved)
      try {
        return JSON.parse(saved);
      } catch {
        return [0, 5000000];
      }
    return [0, 5000000];
  });
  const [onlyDiscount, setOnlyDiscount] = useState(
    () => localStorage.getItem("filter_onlyDiscount") === "true"
  );
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(
    () => Number(localStorage.getItem("filter_page")) || 1
  );
  const [totalPages, setTotalPages] = useState(1);
  const [pendingFilter, setPendingFilter] = useState(() => ({
    selectedCategory,
    priceRange,
    onlyDiscount,
  }));

  // Fetch products (unchanged)
  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      let url = "";
      let cacheKey = "";
      if (searchQuery && searchQuery.trim() !== "") {
        url = `${API_BASE_URL}/api/products/search?name=${encodeURIComponent(
          searchQuery
        )}`;
        cacheKey = `products_search_${searchQuery}`;
      } else if (selectedCategory && selectedCategory !== "") {
        url = `${API_BASE_URL}/api/products/category/${selectedCategory}`;
        cacheKey = `products_category_${selectedCategory}`;
      } else {
        url = `${API_BASE_URL}/api/products/paged?page=0&size=1000`;
        cacheKey = `products_all`;
      }
      const cacheStr = localStorage.getItem(cacheKey);
      let cache = null;
      if (cacheStr) {
        try {
          cache = JSON.parse(cacheStr);
        } catch (e) {
          console.log(e);
        }
      }
      const now = Date.now();
      if (
        cache &&
        cache.products &&
        cache.timestamp &&
        now - cache.timestamp < 5 * 60 * 1000
      ) {
        setProducts(cache.products);
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(url);
        if (!res.ok)
          throw new Error(t ? t("error_fetch") : "Lỗi khi tải dữ liệu.");
        const data = await res.json();
        let productList = Array.isArray(data) ? data : data.content || [];
        if (isMounted) {
          setProducts(productList);
          localStorage.setItem(
            cacheKey,
            JSON.stringify({
              products: productList,
              timestamp: Date.now(),
            })
          );
        }
      } catch (err) {
        if (isMounted) setError(t ? t("error_fetch") : err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchProducts();
    return () => {
      isMounted = false;
    };
  }, [selectedCategory, searchQuery, t]);

  // Handle URL search params (unchanged)
  useEffect(() => {
    const onPopState = () => {
      const params = new URLSearchParams(window.location.search);
      setSearchQuery(params.get("search") || "");
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Save filters to localStorage (unchanged)
  useEffect(() => {
    localStorage.setItem("filter_category", selectedCategory);
    localStorage.setItem("filter_priceRange", JSON.stringify(priceRange));
    localStorage.setItem("filter_onlyDiscount", onlyDiscount);
    localStorage.setItem("filter_page", page);
  }, [selectedCategory, priceRange, onlyDiscount, page]);

  // Sync pendingFilter with actual filters (unchanged)
  useEffect(() => {
    setPendingFilter({ selectedCategory, priceRange, onlyDiscount });
  }, [selectedCategory, priceRange, onlyDiscount]);

  // Apply filter
  const handleApplyFilter = () => {
    setSelectedCategory(pendingFilter.selectedCategory);
    setPriceRange(pendingFilter.priceRange);
    setOnlyDiscount(pendingFilter.onlyDiscount);
    setPage(1);
  };

  // Filter and paginate products (unchanged)
  useEffect(() => {
    let filtered = products;
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    if (onlyDiscount) {
      filtered = filtered.filter(
        (p) => p.discountPercentage && p.discountPercentage > 0
      );
    }
    const pageSize = 12;
    setTotalPages(Math.max(1, Math.ceil(filtered.length / pageSize)));
    setFilteredProducts(filtered.slice((page - 1) * pageSize, page * pageSize));
  }, [products, priceRange, onlyDiscount, page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  useEffect(() => {
    setPage(1);
  }, [selectedCategory, priceRange, onlyDiscount]);

  return (
    <div
      className="products-page-wrapper main-bg"
      style={{ minHeight: "100vh", background: "var(--main-bg, #f7f7fa)" }}
    >
      <main
        className="products-main-container"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "32px 0",
          display: "flex",
          gap: 16,
        }}
      >
        {/* Sidebar filter */}
        <aside
          style={{
            minWidth: 220,
            maxWidth: 300,
            background: "var(--main-bg, #fff)",
            borderRadius: 12,
            padding: 24,
            boxShadow: "0 4px 16px #0001",
            height: "fit-content",
            position: "sticky",
            top: 24,
            left: 0,
            zIndex: 2,
            border: "1px solid #e0e0e0",
          }}
        >
          <h2
            style={{
              fontSize: 16,
              fontWeight: 700,
              marginBottom: 12,
              color: "var(--main-text, #222)",
            }}
          >
            {t ? t("filter_label") : "Bộ lọc"}
          </h2>
          {/* Danh mục */}
          <div style={{ marginBottom: 14 }}>
            <label
              style={{
                fontWeight: 600,
                marginBottom: 4,
                display: "block",
                color: "var(--main-text, #222)",
              }}
            >
              {t ? t("category_label") : "Danh mục"}
            </label>
            <select
              value={pendingFilter.selectedCategory}
              onChange={(e) =>
                setPendingFilter((f) => ({
                  ...f,
                  selectedCategory: e.target.value,
                }))
              }
              style={{
                width: "100%",
                padding: 4,
                borderRadius: 4,
                border: "1px solid #ddd",
                background: "var(--section-bg)",
                color: "var(--main-text, #222)",
              }}
            >
              {CATEGORY_LIST.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {t ? t(cat.label) : cat.defaultLabel}
                </option>
              ))}
            </select>
            {selectedCategory && (
              <div
                style={{
                  marginTop: 6,
                  fontSize: 13,
                  color: "var(--main-accent, #e67e22)",
                  fontWeight: 600,
                }}
              >
                {t ? t("filtering_category") : "Đang lọc"}:{" "}
                <span style={{ textDecoration: "underline" }}>
                  {t
                    ? t(
                        CATEGORY_LIST.find(
                          (c) => c.value === Number(selectedCategory)
                        )?.label || "category_unknown"
                      )
                    : CATEGORY_LIST.find(
                        (c) => c.value === Number(selectedCategory)
                      )?.defaultLabel || selectedCategory}
                </span>
              </div>
            )}
          </div>
          {/* Giá */}
          <div style={{ marginBottom: 14 }}>
            <label
              style={{
                fontWeight: 600,
                marginBottom: 4,
                display: "block",
                color: "var(--main-text, #222)",
              }}
            >
              {t ? t("price_range_label") : "Khoảng giá (₫)"}
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <input
                type="range"
                min={0}
                max={5000000}
                step={5000}
                value={pendingFilter.priceRange[0]}
                onChange={(e) =>
                  setPendingFilter((f) => ({
                    ...f,
                    priceRange: [
                      Number(e.target.value),
                      f.priceRange[1] > Number(e.target.value)
                        ? f.priceRange[1]
                        : Number(e.target.value),
                    ],
                  }))
                }
                style={{ width: "100%" }}
              />
              <input
                type="range"
                min={0}
                max={5000000}
                step={5000}
                value={pendingFilter.priceRange[1]}
                onChange={(e) =>
                  setPendingFilter((f) => ({
                    ...f,
                    priceRange: [
                      f.priceRange[0] < Number(e.target.value)
                        ? f.priceRange[0]
                        : Number(e.target.value),
                      Number(e.target.value),
                    ],
                  }))
                }
                style={{ width: "100%" }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 13,
                  color: "var(--main-text, #444)",
                }}
              >
                <span>
                  {pendingFilter.priceRange[0].toLocaleString("vi-VN")}₫
                </span>
                <span>
                  {pendingFilter.priceRange[1].toLocaleString("vi-VN")}₫
                </span>
              </div>
            </div>
          </div>
          {/* Giảm giá */}
          <div style={{ marginBottom: 14 }}>
            <label
              style={{
                fontWeight: 600,
                marginBottom: 4,
                display: "block",
                color: "var(--main-text, #222)",
              }}
            >
              {t ? t("discount_label") : "Khuyến mãi"}
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 14,
                color: "var(--main-text, #222)",
              }}
            >
              <input
                type="checkbox"
                checked={pendingFilter.onlyDiscount}
                onChange={(e) =>
                  setPendingFilter((f) => ({
                    ...f,
                    onlyDiscount: e.target.checked,
                  }))
                }
              />
              {t ? t("only_discount_label") : "Chỉ hiển thị sản phẩm giảm giá"}
            </label>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button
              onClick={handleApplyFilter}
              style={{
                padding: "6px 8px",
                borderRadius: 4,
                background: "var(--main-accent, #e67e22)",
                border: "1px solid #ccc",
                cursor: "pointer",
                color: "#fff",
                fontWeight: 500,
                fontSize: 14,
              }}
            >
              {t ? t("button_apply") : "Lọc"}
            </button>
            <button
              onClick={() => {
                setPendingFilter({
                  selectedCategory: "",
                  priceRange: [0, 5000000],
                  onlyDiscount: false,
                });
                setSelectedCategory("");
                setPriceRange([0, 5000000]);
                setOnlyDiscount(false);
                setPage(1);
                localStorage.removeItem("filter_category");
                localStorage.removeItem("filter_priceRange");
                localStorage.removeItem("filter_onlyDiscount");
                localStorage.removeItem("filter_page");
              }}
              style={{
                padding: "6px 8px",
                borderRadius: 4,
                background: "var(--section-bg)",
                border: "1px solid #ccc",
                cursor: "pointer",
                color: "var(--main-text, #222)",
                fontWeight: 500,
                fontSize: 14,
              }}
            >
              {t ? t("button_clear_filter") : "Xóa bộ lọc"}
            </button>
          </div>
        </aside>
        {/* Main content */}
        <div style={{ flex: 1 }}>
          <h1
            style={{
              fontSize: 32,
              fontWeight: 700,
              marginBottom: 24,
              color: "var(--main-text)",
              transition: "color 0.2s",
            }}
          >
            {t ? t("all_products_title") : "Tất cả sản phẩm"}
          </h1>
          <div className="product-grid">
            {loading ? (
              <div
                style={{
                  gridColumn: "1/-1",
                  textAlign: "center",
                  fontSize: 20,
                }}
              >
                {t ? t("loading_products") : "Đang tải sản phẩm..."}
              </div>
            ) : error ? (
              <div
                style={{
                  gridColumn: "1/-1",
                  color: "red",
                  textAlign: "center",
                }}
              >
                {error}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div
                style={{
                  gridColumn: "1/-1",
                  textAlign: "center",
                  fontSize: 18,
                }}
              >
                {t ? t("no_products") : "Không có sản phẩm nào."}
              </div>
            ) : (
              filteredProducts.map((product) => (
                <ProductCard key={product.productId} product={product} t={t} />
              ))
            )}
          </div>
          {/* Phân trang */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 32,
              gap: 8,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => handlePageChange(1)}
              disabled={page === 1}
              style={{
                padding: "8px 12px",
                borderRadius: 6,
                border: "1px solid #ccc",
                background: page === 1 ? "#eee" : "#fff",
                cursor: page === 1 ? "not-allowed" : "pointer",
                fontWeight: 600,
              }}
            >
              {t ? t("button_first_page") : "⏮ Đầu"}
            </button>
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              style={{
                padding: "8px 12px",
                borderRadius: 6,
                border: "1px solid #ccc",
                background: page === 1 ? "#eee" : "#fff",
                cursor: page === 1 ? "not-allowed" : "pointer",
              }}
            >
              {t ? t("button_previous") : "Trước"}
            </button>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const input = e.target.elements["pageInput"];
                let val = Number(input.value);
                if (!isNaN(val) && val >= 1 && val <= totalPages)
                  handlePageChange(val);
                input.value = "";
              }}
              style={{ display: "flex", alignItems: "center", gap: 4 }}
            >
              <span style={{ fontWeight: 600 }}>
                {t ? t("page_label") : "Trang"}
              </span>
              <input
                name="pageInput"
                type="number"
                min={1}
                max={totalPages}
                placeholder={page.toString()}
                style={{
                  width: 48,
                  padding: "4px 6px",
                  borderRadius: 4,
                  border: "1px solid #ccc",
                  textAlign: "center",
                }}
              />
              <span style={{ fontWeight: 600 }}>/ {totalPages}</span>
              <button
                type="submit"
                style={{
                  padding: "8px 12px",
                  borderRadius: 6,
                  border: "1px solid #ccc",
                  background: "#fafbfc",
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 600,
                  height: 36,
                }}
              >
                {t ? t("button_go") : "Đi"}
              </button>
            </form>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              style={{
                padding: "8px 12px",
                borderRadius: 6,
                border: "1px solid #ccc",
                background: page === totalPages ? "#eee" : "#fff",
                cursor: page === totalPages ? "not-allowed" : "pointer",
              }}
            >
              {t ? t("button_next") : "Sau"}
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={page === totalPages}
              style={{
                padding: "8px 12px",
                borderRadius: 6,
                border: "1px solid #ccc",
                background: page === totalPages ? "#eee" : "#fff",
                cursor: page === totalPages ? "not-allowed" : "pointer",
                fontWeight: 600,
              }}
            >
              {t ? t("button_last_page") : "Cuối ⏭"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;
