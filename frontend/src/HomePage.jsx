import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "./apiConfig";
import ProductsPage from "./ProductsPage";
import Header from "./Header";
import Footer from "./Footer";
import useAddToCart from "./hooks/useAddToCart";

// Import icon đen/trắng cho từng loại
import heroBanner from "./icons/hero-banner.png";
import shopIcon from "./icons/shop-icon.png";
import defaultIconBlack from "./icons/black-default-category-icon.png";
import defaultIconWhite from "./icons/white-default-category-icon.png";
import iconAoBlack from "./icons/black-shirt-icon.png";
import iconAoWhite from "./icons/white-shirt-icon.png";
import iconQuanBlack from "/src/icons/black-pants-icon.png";
import iconQuanWhite from "/src/icons/white-pants-icon.png";
import iconVayBlack from "/src/icons/black-dress-icon.png";
import iconVayWhite from "/src/icons/white-dress-icon.png";
import iconGiayBlack from "/src/icons/black-shoes-icon.png";
import iconGiayWhite from "/src/icons/white-shoes-icon.png";
import iconTuiBlack from "/src/icons/black-handbag-icon.png";
import iconTuiWhite from "/src/icons/white-handbag-icon.png";
import iconMuBlack from "/src/icons/black-hat-icon.png";
import iconMuWhite from "/src/icons/white-hat-icon.png";
import iconKinhBlack from "/src/icons/black-glasses-icon.png";
import iconKinhWhite from "/src/icons/white-glasses-icon.png";
import iconTrangSucBlack from "/src/icons/black-jewelry-icon.png";
import iconTrangSucWhite from "/src/icons/white-jewelry-icon.png";
import iconThatLungBlack from "/src/icons/black-belt-icon.png";
import iconThatLungWhite from "/src/icons/white-belt-icon.png";
import iconDoBoiBlack from "/src/icons/black-swimsuit-icon.png";
import iconDoBoiWhite from "/src/icons/white-swimsuit-icon.png";
import iconDoNguBlack from "/src/icons/black-sleepwear-icon.png";
import iconDoNguWhite from "/src/icons/white-sleepwear-icon.png";
import iconKhanBlack from "/src/icons/black-scarf-icon.png";
import iconKhanWhite from "/src/icons/white-scarf-icon.png";

// --- CÁC COMPONENT CON ---

const HeroBanner = ({ t }) => (
  <section className="hero-section section-container">
    <div className="hero-banner-image">
      <img src={heroBanner} alt={t ? t('hero_banner_alt') : 'Eco-friendly Clothing'} />
    </div>
    <div className="section-container">
      <h4 style={{ color: "var(--main-text)" }}>{t ? t('hot_section_title') : 'Ưu đãi hot'}</h4>
      <div className="hot-item">
        <span className="hot-icon new">{t ? t('hot_item_new') : 'NEW'}</span>
        <span style={{ color: "var(--main-text)" }}>
          {t ? t('hot_item_new_text') : 'Hàng mới nhất trong hôm nay'}
        </span>
      </div>
      <div className="hot-item">
        <span className="hot-icon sale">{t ? t('hot_item_sale') : 'SALE'}</span>
        <span style={{ color: "var(--main-text)" }}>
          {t ? t('hot_item_sale_text') : 'Giảm giá trong hôm nay'}
        </span>
      </div>
      <div className="hot-item">
        <span
          className="hot-icon trusted"
          style={{
            width: 22,
            height: 22,
            display: "inline-block",
            backgroundImage: `url(${shopIcon})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            marginRight: 8,
            verticalAlign: "middle",
          }}
        ></span>
        <span style={{ color: "var(--main-text)" }}>
          {t ? t('hot_item_trusted') : 'Hàng từ shop uy tín'}
        </span>
      </div>
    </div>
  </section>
);

// --- Danh mục cố định, hỗ trợ dịch ---
const getCategoryList = (theme, t) => [
  {
    name: t ? t('category_shirts') : 'Áo',
    defaultName: 'Áo',
    icon: theme === "dark" ? iconAoWhite : iconAoBlack,
    categoryId: 1,
  },
  {
    name: t ? t('category_pants') : 'Quần',
    defaultName: 'Quần',
    icon: theme === "dark" ? iconQuanWhite : iconQuanBlack,
    categoryId: 2,
  },
  {
    name: t ? t('category_dresses') : 'Váy / Đầm',
    defaultName: 'Váy / Đầm',
    icon: theme === "dark" ? iconVayWhite : iconVayBlack,
    categoryId: 3,
  },
  {
    name: t ? t('category_shoes') : 'Giày dép',
    defaultName: 'Giày dép',
    icon: theme === "dark" ? iconGiayWhite : iconGiayBlack,
    categoryId: 4,
  },
  {
    name: t ? t('category_bags') : 'Túi xách / Ba lô',
    defaultName: 'Túi xách / Ba lô',
    icon: theme === "dark" ? iconTuiWhite : iconTuiBlack,
    categoryId: 5,
  },
  {
    name: t ? t('category_hats') : 'Mũ',
    defaultName: 'Mũ',
    icon: theme === "dark" ? iconMuWhite : iconMuBlack,
    categoryId: 6,
  },
  {
    name: t ? t('category_glasses') : 'Kính',
    defaultName: 'Kính',
    icon: theme === "dark" ? iconKinhWhite : iconKinhBlack,
    categoryId: 7,
  },
  {
    name: t ? t('category_jewelry') : 'Trang sức',
    defaultName: 'Trang sức',
    icon: theme === "dark" ? iconTrangSucWhite : iconTrangSucBlack,
    categoryId: 8,
  },
  {
    name: t ? t('category_belts') : 'Thắt lưng',
    defaultName: 'Thắt lưng',
    icon: theme === "dark" ? iconThatLungWhite : iconThatLungBlack,
    categoryId: 9,
  },
  {
    name: t ? t('category_swimwear') : 'Đồ bơi',
    defaultName: 'Đồ bơi',
    icon: theme === "dark" ? iconDoBoiWhite : iconDoBoiBlack,
    categoryId: 10,
  },
  {
    name: t ? t('category_loungewear') : 'Đồ ngủ / Ở nhà',
    defaultName: 'Đồ ngủ / Ở nhà',
    icon: theme === "dark" ? iconDoNguWhite : iconDoNguBlack,
    categoryId: 11,
  },
  {
    name: t ? t('category_accessories') : 'Khăn / Phụ kiện khác',
    defaultName: 'Khăn / Phụ kiện khác',
    icon: theme === "dark" ? iconKhanWhite : iconKhanBlack,
    categoryId: 12,
  },
  {
    name: t ? t('category_others') : 'Khác',
    defaultName: 'Khác',
    icon: theme === "dark" ? defaultIconWhite : defaultIconBlack,
    categoryId: 13,
  },
];

const CategorySection = ({ t }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [theme, setTheme] = useState("light");
  const visibleCount = 3;
  const CATEGORY_LIST = getCategoryList(theme, t);
  const total = CATEGORY_LIST.length;

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(
        document.documentElement.classList.contains("dark-mode")
          ? "dark"
          : "light"
      );
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    setTheme(
      document.documentElement.classList.contains("dark-mode")
        ? "dark"
        : "light"
    );
    return () => observer.disconnect();
  }, []);

  const getVisibleCategories = () => {
    if (total <= visibleCount) return CATEGORY_LIST;
    return CATEGORY_LIST.slice(startIndex, startIndex + visibleCount);
  };

  const isAtStart = startIndex === 0;
  const isAtEnd = startIndex + visibleCount >= total;

  const handlePrev = () => {
    if (isAtStart) return;
    setDirection("left");
    setStartIndex((prev) => {
      const next = prev - visibleCount;
      return next < 0 ? 0 : next;
    });
  };
  const handleNext = () => {
    if (isAtEnd) return;
    setDirection("right");
    setStartIndex((prev) => {
      const next = prev + visibleCount;
      return next + visibleCount > total ? total - visibleCount : next;
    });
  };

  const handleCategoryClick = (cat) => {
    localStorage.setItem("filter_category", cat.categoryId);
    localStorage.setItem("filter_page", "1");
    window.location.href = "/products";
  };

  return (
    <section className="category-section">
      <div className="section-container">
        <h2 className="section-title" style={{ color: "var(--main-text)" }}>
          {t ? t('category_section_title') : 'Danh mục nổi bật'}
        </h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
          }}
        >
          <button
            onClick={handlePrev}
            disabled={isAtStart}
            style={{
              fontSize: 32,
              fontWeight: "bold",
              width: 56,
              height: 56,
              borderRadius: "50%",
              border: "1.5px solid var(--border)",
              background: isAtStart ? "var(--card-hover)" : "var(--section-bg)",
              color: isAtStart ? "var(--secondary-text)" : "var(--main-text)",
              cursor: isAtStart ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
              transition: "background 0.2s",
            }}
            aria-label={t ? t('button_previous') : 'Trước'}
          >
            {"<"}
          </button>
          <div
            className={`category-slider-outer`}
            style={{
              width: 900,
              maxWidth: "100%",
              overflow: "hidden",
              padding: "16px 0",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Be Vietnam Pro, Arial, Helvetica, sans-serif",
            }}
          >
            <div
              className={`category-slider-inner${direction ? " " + direction : ""}`}
              style={{
                display: "flex",
                width: "100%",
                transition: direction
                  ? "transform 0.5s cubic-bezier(.4,2,.6,1)"
                  : "none",
                willChange: "transform",
                fontFamily: "Be Vietnam Pro, Arial, Helvetica, sans-serif",
              }}
              onAnimationEnd={() => setDirection(null)}
            >
              {getVisibleCategories().map((cat, idx) => (
                <div
                  key={cat.categoryId + idx}
                  className="category-item"
                  style={{
                    flex: "1 0 0",
                    margin: "0 18px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 180,
                    background: "var(--section-bg)",
                    borderRadius: 28,
                    boxShadow: "0 6px 32px rgba(0,0,0,0.13)",
                    border: "1.5px solid var(--border)",
                    transition:
                      "box-shadow 0.2s, transform 0.5s cubic-bezier(.4,2,.6,1)",
                    cursor: "pointer",
                    position: "relative",
                    zIndex: 1,
                    fontFamily: "Be Vietnam Pro, Arial, Helvetica, sans-serif",
                  }}
                  onClick={() => handleCategoryClick(cat)}
                >
                  <img
                    src={cat.icon}
                    alt={t ? t(cat.name) : cat.defaultName}
                    style={{
                      width: 100,
                      height: 100,
                      objectFit: "contain",
                      marginBottom: 16,
                    }}
                    onError={(e) => {
                      e.target.src =
                        theme === "dark" ? defaultIconWhite : defaultIconBlack;
                    }}
                  />
                  <span
                    style={{
                      fontSize: 26,
                      fontWeight: 800,
                      color: "var(--main-text)",
                      textAlign: "center",
                      letterSpacing: 0,
                      fontFamily: "Be Vietnam Pro, Arial, Helvetica, sans-serif",
                    }}
                  >
                    {t ? t(cat.name) : cat.defaultName}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={handleNext}
            disabled={isAtEnd}
            style={{
              fontSize: 32,
              fontWeight: "bold",
              width: 56,
              height: 56,
              borderRadius: "50%",
              border: "1.5px solid var(--border)",
              background: isAtEnd ? "var(--card-hover)" : "var(--section-bg)",
              color: isAtEnd ? "var(--secondary-text)" : "var(--main-text)",
              cursor: isAtEnd ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
              transition: "background 0.2s",
            }}
            aria-label={t ? t('button_next') : 'Sau'}
          >
            {">"}
          </button>
        </div>
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;700;800&display=swap"
          rel="stylesheet"
        />
        <style>{`
          .category-slider-inner.right {
            animation: slideRight 0.5s cubic-bezier(.4,2,.6,1);
          }
          .category-slider-inner.left {
            animation: slideLeft 0.5s cubic-bezier(.4,2,.6,1);
          }
          @keyframes slideRight {
            from { transform: translateX(-80px); opacity: 0.7; }
            to { transform: translateX(0); opacity: 1; }
          }
          @keyframes slideLeft {
            from { transform: translateX(80px); opacity: 0.7; }
            to { transform: translateX(0); opacity: 1; }
          }
        `}</style>
      </div>
    </section>
  );
};

const ProductCard = ({ product, onQuickAddToCart, t }) => (
  <Link
    to={`/products/${product.productId}`}
    className="product-card"
    style={{ border: "none" }}
  >
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
            if (product.quantity === 0) {
              alert( t("Sản phẩm đã hết hàng"));
              return;
            }
            if (onQuickAddToCart) {
              onQuickAddToCart(product);
            }
          }}
        >
          <img
            src="/src/icons/white-cart-icon.png"
            alt={t ? t('add_to_cart_alt') : 'Thêm vào giỏ'}
          />
        </button>

      </div>
    </div>
  </Link>
);

// --- HOMEPAGE CHÍNH ---
const HomePage = ({ t }) => {
  const [suggestionProducts, setSuggestionProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [flashSaleProducts, setFlashSaleProducts] = useState([]);
  const [, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const onQuickAddToCart = useAddToCart();

  const fetchPaginatedProducts = useCallback(async (pageNum) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/products/paged?page=${pageNum}&size=8`
      );
      if (!response.ok) throw new Error(t ? t('error_fetch_products') : 'Không thể tải thêm sản phẩm.');
      const data = await response.json();
      setSuggestionProducts((prev) => [...prev, ...data.content]);
      if (data.last) {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Failed to fetch more products:", err);
    }
  }, [t]);

  useEffect(() => {
    const cacheKey = "homepage_cache";
    const cacheStr = localStorage.getItem(cacheKey);
    let cache = null;
    if (cacheStr) {
      try {
        cache = JSON.parse(cacheStr);
      } catch {
        // Nếu lỗi parse cache, bỏ qua và fetch lại từ API
      }
    }
    const now = Date.now();
    if (
      cache &&
      cache.products &&
      cache.categories &&
      cache.timestamp &&
      now - cache.timestamp < 5 * 60 * 1000
    ) {
      setFlashSaleProducts(cache.products.slice(0, 4));
      const shuffled = cache.products.slice().sort(() => Math.random() - 0.5);
      setSuggestionProducts(shuffled.slice(0, 8));
      setCategories(cache.categories);
      if (cache.products.length <= 8) setHasMore(false);
      setLoading(false);
      document.title = t ? t('homepage_title') : 'Trang chủ';
      return;
    }
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/products`),
          fetch(`${API_BASE_URL}/api/categories`),
        ]);
        if (!productsRes.ok || !categoriesRes.ok)
          throw new Error(t ? t('error_fetch_initial') : 'Lỗi khi tải dữ liệu ban đầu.');
        const allProducts = await productsRes.json();
        const categoriesData = await categoriesRes.json();
        setFlashSaleProducts(allProducts.slice(0, 4));
        const shuffled = allProducts.slice().sort(() => Math.random() - 0.5);
        setSuggestionProducts(shuffled.slice(0, 8));
        if (allProducts.length <= 8) {
          setHasMore(false);
        }
        setCategories(categoriesData);
        localStorage.setItem(
          cacheKey,
          JSON.stringify({
            products: allProducts,
            categories: categoriesData,
            timestamp: Date.now(),
          })
        );
      } catch (err) {
        setError(t ? t('error_fetch_initial') : err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
    document.title = t ? t('homepage_title') : 'Trang chủ';
  }, [t]);

  const handleShowMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPaginatedProducts(nextPage);
  };

  if (loading)
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "#111",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="multi-color-spinner"
          style={{
            width: 80,
            height: 80,
            display: "inline-block",
            position: "relative",
          }}
        >
          <style>{`
            @keyframes spin-multi {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            .multi-color-spinner {
              animation: spin-multi 1.1s linear infinite;
              border: 8px solid #eee;
              border-top: 8px solid #ff5252;
              border-right: 8px solid #40c4ff;
              border-bottom: 8px solid #69f0ae;
              border-left: 8px solid #ffd740;
              border-radius: 50%;
              box-shadow: 0 0 32px 0 #0008;
            }
          `}</style>
        </div>
      </div>
    );
  if (error)
    return (
      <main className="home-page-container">
        <h2>{t ? t('error_label') : 'Lỗi'}: {error}</h2>
      </main>
    );

  return (
    <div className="homepage-wrapper" style={{ background: "var(--main-bg)" }}>
      <main className="home-page-container">
        <HeroBanner t={t} />
        <CategorySection t={t} />

        <section className="product-showcase">
          <div className="section-container">
            <div className="section-header">
              <h2
                className="section-title"
                style={{ color: "var(--main-text)" }}
              >
                {t ? t('flash_sale_title') : 'Flash sale!!!'}
              </h2>
              <Link to="/flash-sale" className="view-all-link">
                {t ? t('view_all') : 'Xem tất cả'}
              </Link>
            </div>
            <div className="product-grid">
              {flashSaleProducts.map((product) => (
                <ProductCard
                  key={`flash-${product.productId}`}
                  product={product}
                  onQuickAddToCart={() => {
                    onQuickAddToCart(product, 1, product.color, product.size);
                  }}
                  t={t}
                />
              ))}
            </div>
          </div>
        </section>

        <div
          className="secondary-search-container"
          style={{ background: "var(--section-bg)" }}
        >
          <form
            className="search-bar secondary-search"
            style={{ background: "var(--section-bg)" }}
            onSubmit={(e) => {
              e.preventDefault();
              const query = e.target.elements.secondarySearchInput.value.trim();
              if (query) {
                window.location.href = `/products?search=${encodeURIComponent(
                  query
                )}`;
              }
            }}
          >
            <input
              type="text"
              name="secondarySearchInput"
              placeholder={t ? t('search_placeholder') : 'Tìm kiếm sản phẩm...'}
              style={{ background: "var(--section-bg)" }}
              autoComplete="off"
            />
            <button className="search-button" type="submit">
              <img
                src="/src/icons/black-search-icon.png"
                alt={t ? t('search_icon_alt') : 'Tìm kiếm'}
                className="header-icon"
              />
            </button>
          </form>
        </div>

        <section className="product-showcase suggestion-grid">
          <div className="section-container">
            <div className="section-header">
              <h2
                className="section-title"
                style={{ color: "var(--main-text)" }}
              >
                {t ? t('suggestion_title') : 'Gợi ý hôm nay'}
              </h2>
            </div>
            <div className="product-grid">
              {suggestionProducts.map((product) => (
                <ProductCard
                  key={`suggest-${product.productId}`}
                  product={product}
                  onQuickAddToCart={() => {
                    onQuickAddToCart(product, 1, product.color, product.size);
                  }}
                  t={t}
                />
              ))}
            </div>

            {hasMore && (
              <div className="show-more-container">
                <button
                  className="show-more-btn"
                  onClick={handleShowMore}
                  style={{ background: "var(--button-bg)" }}
                >
                  {t ? t('show_more') : 'Hiển thị thêm'}
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;