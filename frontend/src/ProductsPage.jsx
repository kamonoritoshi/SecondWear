import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from './apiConfig';
import Footer from './Footer';

// Sử dụng lại ProductCard từ HomePage
const ProductCard = ({ product }) => (
  <Link to={`/products/${product.productId}`} className="product-card">
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
          <img src="/src/icons/black-cart-icon.png" alt="Add to cart" />
        </button>
      </div>
    </div>
  </Link>
);


// Đầy đủ các danh mục phổ biến, bạn có thể bổ sung thêm nếu backend có nhiều hơn
const CATEGORY_LIST = [
  { label: 'Tất cả', value: '' },
  { label: 'Áo', value: 1 },
  { label: 'Quần', value: 2 },
  { label: 'Đầm/Váy', value: 3 },
  { label: 'Giày', value: 4 },
  { label: 'Túi xách', value: 5 },
  { label: 'Mũ', value: 6 },
  { label: 'Kính', value: 7 },
  { label: 'Trang sức', value: 8 },
  { label: 'Thắt lưng', value: 9 },
  { label: 'Đồ bơi', value: 10 },
  { label: 'Đồ ngủ / Ở nhà', value: 11 },
  { label: 'Khăn / Phụ kiện', value: 12 },
  { label: 'Khác', value: 13 },
  // ... thêm các danh mục khác nếu có (đúng id backend)
];

const ProductsPage = ({ t }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Filter state
  const [selectedCategory, setSelectedCategory] = useState(() => localStorage.getItem('filter_category') || '');
  // Search state
  const [searchQuery, setSearchQuery] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('search') || '';
  });
  const [priceRange, setPriceRange] = useState(() => {
    const saved = localStorage.getItem('filter_priceRange');
    if (saved) try { return JSON.parse(saved); } catch { return [0, 10000000]; }
    return [0, 10000000];
  });
  const [onlyDiscount, setOnlyDiscount] = useState(() => localStorage.getItem('filter_onlyDiscount') === 'true');
  const [filteredProducts, setFilteredProducts] = useState([]);
  // Pagination (client)
  const [page, setPage] = useState(() => Number(localStorage.getItem('filter_page')) || 1);
  const [totalPages, setTotalPages] = useState(1);
  // Đặt state pendingFilter đúng chuẩn React hooks (chỉ khai báo 1 lần)
  const [pendingFilter, setPendingFilter] = useState(() => ({
    selectedCategory,
    priceRange,
    onlyDiscount
  }));

  // Lưu cache vào localStorage, chỉ gọi API nếu cache quá 5 phút
  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      let url = '';
      let cacheKey = '';
      if (searchQuery && searchQuery.trim() !== '') {
        url = `${API_BASE_URL}/api/products/search?name=${encodeURIComponent(searchQuery)}`;
        cacheKey = `products_search_${searchQuery}`;
      } else if (selectedCategory && selectedCategory !== '') {
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
      if (cache && cache.products && cache.timestamp && now - cache.timestamp < 5 * 60 * 1000) {
        setProducts(cache.products);
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Lỗi khi tải dữ liệu.');
        const data = await res.json();
        let productList = Array.isArray(data) ? data : (data.content || []);
        if (isMounted) {
          setProducts(productList);
          // Lưu cache mới với timestamp
          localStorage.setItem(cacheKey, JSON.stringify({
            products: productList,
            timestamp: Date.now()
          }));
        }
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchProducts();
    return () => { isMounted = false; };
  }, [selectedCategory, searchQuery]);
  // Lắng nghe thay đổi url search param để cập nhật searchQuery (khi chuyển trang hoặc search mới)
  useEffect(() => {
    const onPopState = () => {
      const params = new URLSearchParams(window.location.search);
      setSearchQuery(params.get('search') || '');
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // ĐÁNH DẤU: Lọc sản phẩm khi bấm nút "Lọc"
  // Lưu filter vào localStorage khi thay đổi
  useEffect(() => {
    localStorage.setItem('filter_category', selectedCategory);
    localStorage.setItem('filter_priceRange', JSON.stringify(priceRange));
    localStorage.setItem('filter_onlyDiscount', onlyDiscount);
    localStorage.setItem('filter_page', page);
  }, [selectedCategory, priceRange, onlyDiscount, page]);

  // Đồng bộ filter thực tế -> pendingFilter khi mount hoặc khi filter thực tế đổi (tránh lệch state khi reload/back)
  useEffect(() => {
    setPendingFilter({ selectedCategory, priceRange, onlyDiscount });
  }, [selectedCategory, priceRange, onlyDiscount]);

  // Khi bấm Lọc, cập nhật filter thực tế
  const handleApplyFilter = () => {
    setSelectedCategory(pendingFilter.selectedCategory);
    setPriceRange(pendingFilter.priceRange);
    setOnlyDiscount(pendingFilter.onlyDiscount);
    setPage(1);
  };

  // Lọc và phân trang client khi filter thực tế thay đổi (chỉ lọc giá, giảm giá)
  useEffect(() => {
    let filtered = products;
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (onlyDiscount) {
      filtered = filtered.filter((p) => p.discountPercentage && p.discountPercentage > 0);
    }
    // Pagination client: mỗi trang 12 sản phẩm
    const pageSize = 12;
    setTotalPages(Math.max(1, Math.ceil(filtered.length / pageSize)));
    setFilteredProducts(filtered.slice((page - 1) * pageSize, page * pageSize));
  }, [products, priceRange, onlyDiscount, page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  // Khi đổi filter thực tế thì reset về trang 1
  useEffect(() => {
    setPage(1);
  }, [selectedCategory, priceRange, onlyDiscount]);

  return (
    <div
      className="products-page-wrapper main-bg"
      style={{ minHeight: '100vh', background: 'var(--main-bg, #f7f7fa)' }}
    >
      <main className="products-main-container" style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 0', display: 'flex', gap: 16 }}>
        {/* Sidebar filter */}
        <aside style={{
          minWidth: 220,
          maxWidth: 300,
          background: 'var(--main-bg, #fff)',
          borderRadius: 12,
          padding: 24,
          boxShadow: '0 4px 16px #0001',
          height: 'fit-content',
          position: 'sticky',
          top: 24,
          left: 0,
          zIndex: 2,
          border: '1px solid #e0e0e0',
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: 'var(--main-text, #222)' }}>Bộ lọc</h2>
          {/* Danh mục */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontWeight: 600, marginBottom: 4, display: 'block', color: 'var(--main-text, #222)' }}>Danh mục</label>
            <select value={pendingFilter.selectedCategory} onChange={e => setPendingFilter(f => ({ ...f, selectedCategory: e.target.value }))} style={{ width: '100%', padding: 4, borderRadius: 4, border: '1px solid #ddd', background: '#fafbfc', color: 'var(--main-text, #222)' }}>
              {CATEGORY_LIST.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
            {/* ĐÁNH DẤU: filter danh mục */}
            {selectedCategory && (
              <div style={{ marginTop: 6, fontSize: 13, color: 'var(--main-accent, #e67e22)', fontWeight: 600 }}>
                Đang lọc: <span style={{ textDecoration: 'underline' }}>{CATEGORY_LIST.find(c => c.value === selectedCategory)?.label || selectedCategory}</span>
              </div>
            )}
          </div>
          {/* Giá dạng slider */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontWeight: 600, marginBottom: 4, display: 'block', color: 'var(--main-text, #222)' }}>Khoảng giá (₫)</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <input
                type="range"
                min={0}
                max={5000000}
                step={5000}
                value={pendingFilter.priceRange[0]}
                onChange={e => setPendingFilter(f => ({ ...f, priceRange: [Number(e.target.value), f.priceRange[1] > Number(e.target.value) ? f.priceRange[1] : Number(e.target.value)] }))}
                style={{ width: '100%' }}
              />
              <input
                type="range"
                min={0}
                max={5000000}
                step={5000}
                value={pendingFilter.priceRange[1]}
                onChange={e => setPendingFilter(f => ({ ...f, priceRange: [f.priceRange[0] < Number(e.target.value) ? f.priceRange[0] : Number(e.target.value), Number(e.target.value)] }))}
                style={{ width: '100%' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--main-text, #444)' }}>
                <span>{pendingFilter.priceRange[0].toLocaleString('vi-VN')}₫</span>
                <span>{pendingFilter.priceRange[1].toLocaleString('vi-VN')}₫</span>
              </div>
            </div>
          </div>
          {/* Giảm giá */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontWeight: 600, marginBottom: 4, display: 'block', color: 'var(--main-text, #222)' }}>Khuyến mãi</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'var(--main-text, #222)' }}>
              <input type="checkbox" checked={pendingFilter.onlyDiscount} onChange={e => setPendingFilter(f => ({ ...f, onlyDiscount: e.target.checked }))} />
              Chỉ hiển thị sản phẩm giảm giá
            </label>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <button
              onClick={handleApplyFilter}
              style={{ padding: '6px 8px', borderRadius: 4, background: 'var(--main-accent, #e67e22)', border: '1px solid #ccc', cursor: 'pointer', color: '#fff', fontWeight: 500, fontSize: 14 }}
            >Lọc</button>
            <button
              onClick={() => {
                setPendingFilter({ selectedCategory: '', priceRange: [0, 10000000], onlyDiscount: false });
                setSelectedCategory('');
                setPriceRange([0, 10000000]);
                setOnlyDiscount(false);
                setPage(1);
                // Xóa filter khỏi localStorage
                localStorage.removeItem('filter_category');
                localStorage.removeItem('filter_priceRange');
                localStorage.removeItem('filter_onlyDiscount');
                localStorage.removeItem('filter_page');
              }}
              style={{ padding: '6px 8px', borderRadius: 4, background: 'var(--main-accent, #f5f5f5)', border: '1px solid #ccc', cursor: 'pointer', color: 'var(--main-text, #222)', fontWeight: 500, fontSize: 14 }}
            >Xóa bộ lọc</button>
          </div>
        </aside>
        {/* Main content */}
        <div style={{ flex: 1 }}>
          <h1
            style={{
              fontSize: 32,
              fontWeight: 700,
              marginBottom: 24,
              color: 'var(--main-text)',
              transition: 'color 0.2s'
            }}
          >
            {t ? t('all_products_title') : 'Tất cả sản phẩm'}
          </h1>
          <div className="product-grid">
            {loading ? (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', fontSize: 20 }}>Đang tải sản phẩm...</div>
            ) : error ? (
              <div style={{ gridColumn: '1/-1', color: 'red', textAlign: 'center' }}>{error}</div>
            ) : filteredProducts.length === 0 ? (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', fontSize: 18 }}>Không có sản phẩm nào.</div>
            ) : (
              filteredProducts.map((product) => (
                <ProductCard key={product.productId} product={product} />
              ))
            )}
          </div>
          {/* Phân trang */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32, gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Nút về trang đầu */}
            <button
              onClick={() => handlePageChange(1)}
              disabled={page === 1}
              style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', background: page === 1 ? '#eee' : '#fff', cursor: page === 1 ? 'not-allowed' : 'pointer', fontWeight: 600 }}
            >⏮ Đầu</button>
            {/* Nút trước */}
            <button
              onClick={() => handlePageChange(page-1)}
              disabled={page === 1}
              style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', background: page === 1 ? '#eee' : '#fff', cursor: page === 1 ? 'not-allowed' : 'pointer' }}
            >Trước</button>
            {/* Input nhập số trang */}
            <form
              onSubmit={e => {
                e.preventDefault();
                const input = e.target.elements['pageInput'];
                let val = Number(input.value);
                if (!isNaN(val) && val >= 1 && val <= totalPages) handlePageChange(val);
                input.value = '';
              }}
              style={{ display: 'flex', alignItems: 'center', gap: 4 }}
            >
              <span style={{ fontWeight: 600 }}>Trang</span>
              <input
                name="pageInput"
                type="number"
                min={1}
                max={totalPages}
                placeholder={page}
                style={{ width: 48, padding: '4px 6px', borderRadius: 4, border: '1px solid #ccc', textAlign: 'center' }}
              />
              <span style={{ fontWeight: 600 }}>/ {totalPages}</span>
              <button
                type="submit"
                style={{
                  padding: '8px 12px',
                  borderRadius: 6,
                  border: '1px solid #ccc',
                  background: '#fafbfc',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 600,
                  height: 36
                }}
              >Đi</button>
            </form>
            {/* Nút sau */}
            <button
              onClick={() => handlePageChange(page+1)}
              disabled={page === totalPages}
              style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', background: page === totalPages ? '#eee' : '#fff', cursor: page === totalPages ? 'not-allowed' : 'pointer' }}
            >Sau</button>
            {/* Nút về trang cuối */}
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={page === totalPages}
              style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', background: page === totalPages ? '#eee' : '#fff', cursor: page === totalPages ? 'not-allowed' : 'pointer', fontWeight: 600 }}
            >Cuối ⏭</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
