import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from './apiConfig';
import ProductsPage from './ProductsPage';
import Header from './Header';
import Footer from './Footer';

// Import toàn bộ icon từ thư mục src/icons
// const categoryIcons = import.meta.glob('./icons/*.png', {
//   eager: true,
//   import: 'default',
// });


// Import icon đen/trắng cho từng loại
import heroBanner from './icons/hero-banner.png';
import shopIcon from './icons/shop-icon.png';
import defaultIconBlack from './icons/black-default-category-icon.png';
import defaultIconWhite from './icons/white-default-category-icon.png';
import iconAoBlack from './icons/black-shirt-icon.png';
import iconAoWhite from './icons/white-shirt-icon.png';
import iconQuanBlack from '/src/icons/black-pants-icon.png';
import iconQuanWhite from '/src/icons/white-pants-icon.png';
import iconVayBlack from '/src/icons/black-dress-icon.png';
import iconVayWhite from '/src/icons/white-dress-icon.png';
import iconGiayBlack from '/src/icons/black-shoes-icon.png';
import iconGiayWhite from '/src/icons/white-shoes-icon.png';
import iconTuiBlack from '/src/icons/black-handbag-icon.png';
import iconTuiWhite from '/src/icons/white-handbag-icon.png';
import iconMuBlack from '/src/icons/black-hat-icon.png';
import iconMuWhite from '/src/icons/white-hat-icon.png';
import iconKinhBlack from '/src/icons/black-glasses-icon.png';
import iconKinhWhite from '/src/icons/white-glasses-icon.png';
import iconTrangSucBlack from '/src/icons/black-jewelry-icon.png';
import iconTrangSucWhite from '/src/icons/white-jewelry-icon.png';
import iconThatLungBlack from '/src/icons/black-belt-icon.png';
import iconThatLungWhite from '/src/icons/white-belt-icon.png';
import iconDoBoiBlack from '/src/icons/black-swimsuit-icon.png';
import iconDoBoiWhite from '/src/icons/white-swimsuit-icon.png';
import iconDoNguBlack from '/src/icons/black-sleepwear-icon.png';
import iconDoNguWhite from '/src/icons/white-sleepwear-icon.png';
import iconKhanBlack from '/src/icons/black-scarf-icon.png';
import iconKhanWhite from '/src/icons/white-scarf-icon.png';

// --- CÁC COMPONENT CON ---

const HeroBanner = ({ t }) => (
  <section className="hero-section section-container">
    <div className="hero-banner-image">
      <img src={heroBanner} alt="Eco-friendly Clothing" />
    </div>
    <div className="section-container">
      <h4 style={{ color: 'var(--main-text)'}}>{t('hot_section_title')}</h4>
      <div className="hot-item">
        <span className="hot-icon new">NEW</span>
        <span style={{ color: 'var(--main-text)' }}>Hàng mới nhất trong hôm nay</span>
      </div>
      <div className="hot-item">
        <span className="hot-icon sale">SALE</span>
        <span style={{ color: 'var(--main-text)' }}>Giảm giá trong hôm nay</span>
      </div>
      <div className="hot-item">
        <span className="hot-icon trusted" style={{
          width: 22,
          height: 22,
          display: 'inline-block',
          backgroundImage: `url(${shopIcon})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          marginRight: 8,
          verticalAlign: 'middle',
        }}></span>
        <span style={{ color: 'var(--main-text)' }}>Hàng từ shop uy tín</span>
      </div>
    </div>
  </section>
);

// --- Danh mục cố định, icon tĩnh ---
const getCategoryList = (theme) => [
  { name: 'Áo', icon: theme === 'dark' ? iconAoWhite : iconAoBlack },
  { name: 'Quần', icon: theme === 'dark' ? iconQuanWhite : iconQuanBlack },
  { name: 'Váy / Đầm', icon: theme === 'dark' ? iconVayWhite : iconVayBlack },
  { name: 'Giày dép', icon: theme === 'dark' ? iconGiayWhite : iconGiayBlack },
  { name: 'Túi xách / Ba lô', icon: theme === 'dark' ? iconTuiWhite : iconTuiBlack },
  { name: 'Mũ', icon: theme === 'dark' ? iconMuWhite : iconMuBlack },
  { name: 'Kính', icon: theme === 'dark' ? iconKinhWhite : iconKinhBlack },
  { name: 'Trang sức', icon: theme === 'dark' ? iconTrangSucWhite : iconTrangSucBlack },
  { name: 'Thắt lưng', icon: theme === 'dark' ? iconThatLungWhite : iconThatLungBlack },
  { name: 'Đồ bơi', icon: theme === 'dark' ? iconDoBoiWhite : iconDoBoiBlack },
  { name: 'Đồ ngủ / Ở nhà', icon: theme === 'dark' ? iconDoNguWhite : iconDoNguBlack },
  { name: 'Khăn / Phụ kiện khác', icon: theme === 'dark' ? iconKhanWhite : iconKhanBlack },
  { name: 'Khác', icon: theme === 'dark' ? defaultIconWhite : defaultIconBlack },
];


// Đã import useState, useEffect ở đầu file rồi, không cần import lại

const CategorySection = ({ t }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState(null); // null: không animate, 'left'/'right': animate
  const [theme, setTheme] = useState('light');
  const visibleCount = 3;
  const CATEGORY_LIST = getCategoryList(theme);
  const total = CATEGORY_LIST.length;

  // Lấy theme từ class html (đồng bộ với App)
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.classList.contains('dark-mode') ? 'dark' : 'light');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    setTheme(document.documentElement.classList.contains('dark-mode') ? 'dark' : 'light');
    return () => observer.disconnect();
  }, []);

  // Lấy 3 category liên tiếp, không vòng lặp, để disable nút ở đầu/cuối
  const getVisibleCategories = () => {
    if (total <= visibleCount) return CATEGORY_LIST;
    return CATEGORY_LIST.slice(startIndex, startIndex + visibleCount);
  };

  // Kiểm tra disable nút
  const isAtStart = startIndex === 0;
  const isAtEnd = startIndex + visibleCount >= total;

  // Lướt 3 category mỗi lần
  const handlePrev = () => {
    if (isAtStart) return;
    setDirection('left');
    setStartIndex((prev) => {
      const next = prev - visibleCount;
      return next < 0 ? 0 : next;
    });
  };
  const handleNext = () => {
    if (isAtEnd) return;
    setDirection('right');
    setStartIndex((prev) => {
      const next = prev + visibleCount;
      return next + visibleCount > total ? total - visibleCount : next;
    });
  };

  return (
    <section className="category-section">
      <div className="section-container">
        <h2 className="section-title" style={{ color: 'var(--main-text)' }}>{t('category_section_title')}</h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32 }}>
          <button
            onClick={handlePrev}
            disabled={isAtStart}
            style={{
              fontSize: 32,
              fontWeight: 'bold',
              width: 56,
              height: 56,
              borderRadius: '50%',
              border: '1.5px solid var(--border)',
              background: isAtStart ? 'var(--card-hover)' : 'var(--section-bg)',
              color: isAtStart ? 'var(--secondary-text)' : 'var(--main-text)',
              cursor: isAtStart ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
              transition: 'background 0.2s',
            }}
            aria-label="Trước"
          >
            {'<'}
          </button>
          <div
            className={`category-slider-outer`}
            style={{
              width: 900,
              maxWidth: '100%',
              overflow: 'hidden',
              padding: '16px 0',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Be Vietnam Pro, Arial, Helvetica, sans-serif',
            }}
          >
            <div
              className={`category-slider-inner${direction ? ' ' + direction : ''}`}
              style={{
                display: 'flex',
                width: '100%',
                transition: direction ? 'transform 0.5s cubic-bezier(.4,2,.6,1)' : 'none',
                willChange: 'transform',
                fontFamily: 'Be Vietnam Pro, Arial, Helvetica, sans-serif',
              }}
              onAnimationEnd={() => setDirection(null)}
            >
              {getVisibleCategories().map((cat, idx) => (
                <div
                  key={cat.name + idx}
                  className="category-item"
                  style={{
                    flex: '1 0 0',
                    margin: '0 18px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 180,
                    background: 'var(--section-bg)',
                    borderRadius: 28,
                    boxShadow: '0 6px 32px rgba(0,0,0,0.13)',
                    border: '1.5px solid var(--border)',
                    transition: 'box-shadow 0.2s, transform 0.5s cubic-bezier(.4,2,.6,1)',
                    cursor: 'pointer',
                    position: 'relative',
                    zIndex: 1,
                    fontFamily: 'Be Vietnam Pro, Arial, Helvetica, sans-serif',
                  }}
                >
                  <img
                    src={cat.icon}
                    alt={cat.name}
                    style={{ width: 100, height: 100, objectFit: 'contain', marginBottom: 16 }}
                    onError={e => { e.target.src = theme === 'dark' ? defaultIconWhite : defaultIconBlack; }}
                  />
                  <span style={{ fontSize: 26, fontWeight: 800, color: 'var(--main-text)', textAlign: 'center', letterSpacing: 0, fontFamily: 'Be Vietnam Pro, Arial, Helvetica, sans-serif' }}>{cat.name}</span>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={handleNext}
            disabled={isAtEnd}
            style={{
              fontSize: 32,
              fontWeight: 'bold',
              width: 56,
              height: 56,
              borderRadius: '50%',
              border: '1.5px solid var(--border)',
              background: isAtEnd ? 'var(--card-hover)' : 'var(--section-bg)',
              color: isAtEnd ? 'var(--secondary-text)' : 'var(--main-text)',
              cursor: isAtEnd ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
              transition: 'background 0.2s',
            }}
            aria-label="Sau"
          >
            {'>'}
          </button>
        </div>
        {/* Animation slider cho category và font Việt hóa */}
        <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;700;800&display=swap" rel="stylesheet" />
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

const ProductCard = ({ product }) => (
  <Link to={`/products/${product.productId}`} className="product-card" style={{ border: 'none' }}>
    <div className="product-card-image-container">
      <img
        src={
          product.images && product.images.length > 0
            ? product.images[0].imageUrl
            : '/images/placeholder.png'
        }
        alt={product.name}
        className="product-card-image"
      />
      {product.discountPercentage && (
        <span className="discount-badge-card">{product.discountPercentage}%</span>
      )}
    </div>
    <div className="product-card-info">
      <h3 className="product-card-name">{product.name}</h3>
      <div className="product-card-price-container">
        <p className="product-card-price">{product.price.toLocaleString('vi-VN')}₫</p>
        <button
          className="add-to-cart-icon-btn"
          onClick={(e) => {
            e.preventDefault();
            alert('Đã thêm vào giỏ!');
          }}
        >
          <img src="/src/icons/white-cart-icon.png" alt="Add to cart" />
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
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [showProductsPage, setShowProductsPage] = useState(false); // Đã bỏ, không còn dùng

  const fetchPaginatedProducts = useCallback(async (pageNum) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/paged?page=${pageNum}&size=8`);
      if (!response.ok) throw new Error('Không thể tải thêm sản phẩm.');

      const data = await response.json();
      setSuggestionProducts((prev) => [...prev, ...data.content]);
      if (data.last) {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Failed to fetch more products:', err);
    }
  }, []);

  // Lưu cache homepage vào localStorage, chỉ gọi API nếu cache quá 5 phút
  useEffect(() => {
    //
    const cacheKey = 'homepage_cache';
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
      cache && cache.products && cache.categories && cache.timestamp &&
      now - cache.timestamp < 5 * 60 * 1000
    ) {
      setFlashSaleProducts(cache.products.slice(0, 4));
      const shuffled = cache.products.slice().sort(() => Math.random() - 0.5);
      setSuggestionProducts(shuffled.slice(0, 8));
      setCategories(cache.categories);
      if (cache.products.length <= 8) setHasMore(false);
      setLoading(false);
      document.title = t('homepage_title');
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
          throw new Error('Lỗi khi tải dữ liệu ban đầu.');
        const allProducts = await productsRes.json();
        const categoriesData = await categoriesRes.json();
        setFlashSaleProducts(allProducts.slice(0, 4));
        const shuffled = allProducts.slice().sort(() => Math.random() - 0.5);
        setSuggestionProducts(shuffled.slice(0, 8));
        if (allProducts.length <= 8) {
          setHasMore(false);
        }
        setCategories(categoriesData);
        // Lưu cache mới với timestamp
        localStorage.setItem(cacheKey, JSON.stringify({
          products: allProducts,
          categories: categoriesData,
          timestamp: Date.now()
        }));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
    document.title = t('homepage_title');
  }, [t]);

  const handleShowMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPaginatedProducts(nextPage);
  };

  // Chuyển sang trang ProductsPage khi click vào sản phẩm
  // (Cần dùng useNavigate để chuyển trang)
  // Đã chuyển sang dùng <Link> nên không cần sửa thêm ở đây

  if (loading)
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '#111',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div className="multi-color-spinner" style={{ width: 80, height: 80, display: 'inline-block', position: 'relative' }}>
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
        <h2>Lỗi: {error}</h2>
      </main>
    );

  // Xử lý click menu Sản phẩm
  // Hàm này không còn được sử dụng, có thể xoá để tránh cảnh báo lint

  return (
    <div className="homepage-wrapper" style={{ background: 'var(--main-bg)' }}>
      {/* Chỉ render Header nếu không có trong layout cha. Nếu Header đã được render ở ngoài, hãy xoá dòng dưới */}
      {/* <Header t={t} onMenuClick={handleMenuClick} /> */}
      {/* Luồng hiển thị mặc định, không còn chuyển trang sản phẩm tại đây */}
      <main className="home-page-container">
        <HeroBanner t={t} />
        <CategorySection categories={categories} t={t} />

        <section className="product-showcase">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title" style={{ color: 'var(--main-text)' }}>Flash sale!!!</h2>
              <Link to="/flash-sale" className="view-all-link">
                Xem tất cả
              </Link>
            </div>
            <div className="product-grid">
              {flashSaleProducts.map((product) => (
                <ProductCard key={`flash-${product.productId}`} product={product} />
              ))}
            </div>
          </div>
        </section>

        <div className="secondary-search-container" style={{ background: 'var(--section-bg)'}}>
          <div className="search-bar secondary-search" style={{ background: 'var(--section-bg)'}}>
            <input type="text" placeholder={t('search_placeholder')} style={{ background: 'var(--section-bg)'}}/>
            <button className="search-button">
              <img src="/src/icons/black-search-icon.png" alt="Search" className="header-icon" />
            </button>
          </div>
        </div>

        <section className="product-showcase suggestion-grid">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title" style={{ color: 'var(--main-text)' }}>Gợi ý hôm nay</h2>
            </div>
            <div className="product-grid">
              {suggestionProducts.map((product) => (
                <ProductCard key={`suggest-${product.productId}`} product={product} />
              ))}
            </div>

            {hasMore && (
              <div className="show-more-container">
                <button className="show-more-btn" onClick={handleShowMore} style={{ background: 'var(--button-bg)' }}>
                  Hiển thị thêm
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
