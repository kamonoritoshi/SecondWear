// src/HomePage.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from './apiConfig';

// --- CÁC COMPONENT CON (ĐÃ TỐI ƯU HÓA) ---

// Component cho Banner chính và mục "Hôm nay có gì HOT?"
const HeroBanner = ({ t }) => (
    <section className="hero-section">
        <div className="hero-banner-image">
            <img src="/images/hero-banner.png" alt="Eco-friendly Clothing" />
        </div>
        <div className="hot-section">
            <h4>{t('hot_section_title')}</h4>
            <div className="hot-item">
                <span className="hot-icon new">NEW</span>
                <span>Hàng mới nhất trong hôm nay</span>
            </div>
            <div className="hot-item">
                <span className="hot-icon sale">SALE</span>
                <span>Giảm giá trong hôm nay</span>
            </div>
            <div className="hot-item">
                <span className="hot-icon trusted"></span>
                <span>Hàng từ shop uy tín</span>
            </div>
        </div>
    </section>
);

// Component Danh mục giờ sẽ nhận dữ liệu từ props và được lấy từ API
const CategorySection = ({ categories, t }) => (
    <section className="category-section">
        <div className="section-container">
            <h2 className="section-title">{t('category_section_title')}</h2>
            <div className="category-grid">
                {categories.map(cat => (
                    <Link to={`/category/${cat.categoryId}`} key={cat.categoryId} className="category-item">
                        <img src={cat.iconUrl || '/icons/default-category.png'} alt={cat.name} />
                        <span>{cat.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    </section>
);

// Component ProductCard đã sửa lỗi hiển thị ảnh và tái sử dụng được
const ProductCard = ({ product }) => (
    <Link to={`/products/${product.productId}`} className="product-card">
        <div className="product-card-image-container">
            <img
                src={product.images && product.images.length > 0 ? product.images[0].imageUrl : '/images/placeholder.png'}
                alt={product.name}
                className="product-card-image"
            />
            {product.discountPercentage && <span className="discount-badge-card">{product.discountPercentage}%</span>}
        </div>
        <div className="product-card-info">
            <h3 className="product-card-name">{product.name}</h3>
            <div className="product-card-price-container">
                <p className="product-card-price">{product.price.toLocaleString('vi-VN')}₫</p>
                <button className="add-to-cart-icon-btn" onClick={(e) => { e.preventDefault(); alert('Đã thêm vào giỏ!'); }}>
                    <img src="/icons/cart-icon-red.png" alt="Add to cart" />
                </button>
            </div>
        </div>
    </Link>
);

// Component Footer
const Footer = () => (
    <footer className="site-footer">
        <div className="footer-container">
            <div className="footer-column">
                <h4>Liên hệ</h4>
                <p>(84+) 778157629</p>
                <p>trung142p@gmail.com</p>
            </div>
            <div className="footer-column">
                <h4>Thông tin</h4>
                <ul>
                    <li><Link to="/privacy">Chính sách bảo mật</Link></li>
                    <li><Link to="/faq">FAQs</Link></li>
                    <li><Link to="/terms">Điều khoản</Link></li>
                    <li><Link to="/for-sellers">Kênh người bán</Link></li>
                </ul>
            </div>
            <div className="footer-column">
                <h4>Dịch vụ khách hàng</h4>
                <ul>
                    <li><Link to="/support">Trung Tâm Trợ Giúp</Link></li>
                    <li><Link to="/how-to-buy">Hướng Dẫn Mua Hàng/Đặt Hàng</Link></li>
                    <li><Link to="/returns">Trả Hàng/Hoàn Tiền</Link></li>
                    <li><Link to="/contact">Liên Hệ</Link></li>
                </ul>
            </div>
        </div>
    </footer>
);


// --- COMPONENT HOMEPAGE CHÍNH (ĐÃ LÀM LẠI HOÀN TOÀN) ---

const HomePage = ({ t }) => {
    // State cho danh sách sản phẩm gợi ý (sử dụng pagination)
    const [suggestionProducts, setSuggestionProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    // State riêng cho các mục khác
    const [flashSaleProducts, setFlashSaleProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    // State chung
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Tải dữ liệu gợi ý phân trang
    const fetchPaginatedProducts = useCallback(async (pageNum) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/products/paged?page=${pageNum}&size=8`);
            if (!response.ok) throw new Error('Không thể tải thêm sản phẩm.');

            const data = await response.json();
            setSuggestionProducts(prev => [...prev, ...data.content]);
            if (data.last) {
                setHasMore(false);
            }
        } catch (err) {
            // Không set lỗi ở đây để không ảnh hưởng đến các sản phẩm đã tải
            console.error("Failed to fetch more products:", err);
        }
    }, []);

    // Tải tất cả dữ liệu ban đầu cho trang
    useEffect(() => {
        const fetchInitialData = async () => {
            setLoading(true);
            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/api/products`),
                    fetch(`${API_BASE_URL}/api/categories`)
                ]);

                if (!productsRes.ok || !categoriesRes.ok) throw new Error('Lỗi khi tải dữ liệu ban đầu.');

                const allProducts = await productsRes.json();
                const categoriesData = await categoriesRes.json();

                setFlashSaleProducts(allProducts.slice(0, 4));
                setSuggestionProducts(allProducts.slice(0, 8));
                if (allProducts.length <= 8) {
                    setHasMore(false);
                }
                setCategories(categoriesData);
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

    if (loading) return <main className="home-page-container"><h2>Đang tải trang...</h2></main>;
    if (error) return <main className="home-page-container"><h2>Lỗi: {error}</h2></main>;

    return (
        <div className="homepage-wrapper">
            <main className="home-page-container">
                <HeroBanner t={t} />
                <CategorySection categories={categories} t={t} />

                <section className="product-showcase">
                    <div className="section-container">
                        <div className="section-header">
                            <h2 className="section-title">Flash sale!!!</h2>
                            <Link to="/flash-sale" className="view-all-link">Xem tất cả</Link>
                        </div>
                        <div className="product-grid">
                            {flashSaleProducts.map(product => <ProductCard key={`flash-${product.productId}`} product={product} />)}
                        </div>
                    </div>
                </section>

                <div className="secondary-search-container">
                    <div className="search-bar secondary-search">
                        <input type="text" placeholder={t('search_placeholder')} />
                        <button className="search-button"><img src="/icons/search-icon.png" alt="Search" className="header-icon" /></button>
                    </div>
                </div>

                <section className="product-showcase suggestion-grid">
                    <div className="section-container">
                        <div className="section-header">
                            <h2 className="section-title">Gợi ý hôm nay</h2>
                        </div>
                        <div className="product-grid">
                            {suggestionProducts.map(product => <ProductCard key={`suggest-${product.productId}`} product={product} />)}
                        </div>

                        {hasMore && (
                            <div className="show-more-container">
                                <button className="show-more-btn" onClick={handleShowMore}>Hiển thị thêm</button>
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