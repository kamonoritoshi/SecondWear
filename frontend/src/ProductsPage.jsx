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
          <img src="/src/icons/cart-icon.png" alt="Add to cart" />
        </button>
      </div>
    </div>
  </Link>
);

const ProductsPage = ({ t }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Lưu cache vào localStorage, chỉ gọi API nếu cache quá 5 phút
  useEffect(() => {
    let isMounted = true;
    const cacheKey = `products_page_${page}`;
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
    if (cache && cache.products && cache.totalPages && cache.timestamp && now - cache.timestamp < 5 * 60 * 1000) {
      setProducts(cache.products);
      setTotalPages(cache.totalPages);
      setLoading(false);
      return;
    }
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/products/paged?page=${page-1}&size=20`);
        if (!res.ok) throw new Error('Lỗi khi tải dữ liệu.');
        const data = await res.json();
        if (isMounted) {
          setProducts(data.content || []);
          setTotalPages(data.totalPages || 1);
          // Lưu cache mới với timestamp
          localStorage.setItem(cacheKey, JSON.stringify({
            products: data.content || [],
            totalPages: data.totalPages || 1,
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
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  return (
    <div
      className="products-page-wrapper main-bg"
      style={{ minHeight: '100vh' }}
    >
      <main className="products-main-container" style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 0' }}>
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
          ) : products.length === 0 ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', fontSize: 18 }}>Không có sản phẩm nào.</div>
          ) : (
            products.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))
          )}
        </div>
        {/* Phân trang */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32, gap: 8 }}>
          <button onClick={() => handlePageChange(page-1)} disabled={page === 1} style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #ccc', background: page === 1 ? '#eee' : '#fff', cursor: page === 1 ? 'not-allowed' : 'pointer' }}>Trước</button>
          <span style={{ alignSelf: 'center', fontWeight: 600 }}>Trang {page} / {totalPages}</span>
          <button onClick={() => handlePageChange(page+1)} disabled={page === totalPages} style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #ccc', background: page === totalPages ? '#eee' : '#fff', cursor: page === totalPages ? 'not-allowed' : 'pointer' }}>Sau</button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
