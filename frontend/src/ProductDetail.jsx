// src/ProductDetail.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
// import { authFetch } from './services/api';
import { API_BASE_URL } from './apiConfig';

// Import các hình ảnh
import likeIcon from './icons/like-icon.png';
import likedIcon from './icons/liked-icon.png';
import reportIcon from './icons/report-icon.png';

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
                const productRes = await fetch(`${API_BASE_URL}/api/products/${productId}`);

                if (!productRes.ok) throw new Error('Không tìm thấy sản phẩm.');

                const productData = await productRes.json();
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

    const handleQuantityChange = useCallback((type) => {
        if (!product || !product.quantity) return;

        setQuantity(prev => {
            if (type === 'decrease' && prev > 1) return prev - 1;
            if (type === 'increase' && prev < product.quantity) return prev + 1;
            return prev;
        });
    }, [product]);

    const handleAddToCart = useCallback(async () => {
        console.debug('[AddToCart] Triggered', {
            isAuthenticated,
            currentUser,
            product,
            selectedColor,
            selectedSize,
            quantity
        });
        if (!isAuthenticated) {
            alert(t('please_login_to_add_to_cart'));
            console.warn('[AddToCart] Not authenticated');
            navigate('/login');
            return;
        }

        if (!product || !selectedColor || !selectedSize) {
            alert("Vui lòng chọn đầy đủ thông tin sản phẩm.");
            console.warn('[AddToCart] Missing product/color/size', { product, selectedColor, selectedSize });
            return;
        }

        // Lưu giỏ hàng vào localStorage theo email (nếu có)
        try {
            const userEmail = currentUser?.email;
            if (!userEmail) {
                alert("Không xác định được tài khoản người dùng!");
                console.error('[AddToCart] Missing user email', currentUser);
                return;
            }
            const cartKey = `cart_${userEmail}`;
            let cart = [];
            const cartStr = localStorage.getItem(cartKey);
            console.debug('[AddToCart] Read cartStr:', cartStr);
            if (cartStr) {
                try {
                    cart = JSON.parse(cartStr);
                } catch (e) {
                    console.error('[AddToCart] JSON.parse error', e);
                    cart = [];
                }
            }
            // Kiểm tra sản phẩm đã có trong giỏ chưa (cùng productId, color, size)
            const existingIndex = cart.findIndex(item =>
                item.productId === product.productId &&
                item.color === selectedColor &&
                item.size === selectedSize
            );
            console.debug('[AddToCart] Existing index:', existingIndex, cart);
            if (existingIndex !== -1) {
                cart[existingIndex].quantity += quantity;
                console.info('[AddToCart] Updated quantity:', cart[existingIndex]);
            } else {
                const newItem = {
                    productId: product.productId,
                    name: product.name,
                    image: product.images && product.images.length > 0 ? product.images[0].imageUrl : '',
                    price: product.price,
                    color: selectedColor,
                    size: selectedSize,
                    quantity: quantity,
                    maxQuantity: product.quantity,
                    shopName: product.account?.user?.name || product.shopName || product.sellerName || "Shop ẩn danh"
                };
                cart.push(newItem);
                console.info('[AddToCart] Added new item:', newItem);
            }
            localStorage.setItem(cartKey, JSON.stringify(cart));
            console.debug('[AddToCart] Saved cart:', cartKey, cart);
            if (typeof setCartCount === 'function') {
                setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
            }
            alert("Thêm vào giỏ hàng thành công!");
            setIsOptionsModalOpen(false);
        } catch (err) {
            alert("Lỗi khi lưu giỏ hàng: " + err.message);
            console.error('[AddToCart] Exception', err);
        }
    }, [isAuthenticated, currentUser, product, quantity, selectedColor, selectedSize, setCartCount, t, navigate]);

    const handleLikeToggle = useCallback(() => setIsLiked(prev => !prev), []);
    const openOptionsModal = useCallback(() => setIsOptionsModalOpen(true), []);
    const closeOptionsModal = useCallback(() => setIsOptionsModalOpen(false), []);


    if (loading) return <main className="product-detail-page" style={{ background: 'var(--section-bg)', color: 'var(--main-text)' }}><div>Đang tải...</div></main>;
    if (error) return <main className="product-detail-page" style={{ background: 'var(--section-bg)', color: 'var(--main-text)' }}><div>Lỗi: {error}</div></main>;
    if (!product) return <main className="product-detail-page" style={{ background: 'var(--section-bg)', color: 'var(--main-text)' }}><div>Không tìm thấy sản phẩm.</div></main>;

    return (
        <>
            <main className="product-detail-page" style={{ background: 'var(--section-bg)' }}>
                <button className="report-product-button" onClick={() => alert('Chức năng đang phát triển')}>
                    <span style={{ color: 'var(--secondary-text)' }}>{t('report_button_label')}</span>
                    <img src={reportIcon} alt={t('report_button_label')} className="header-icon" />
                </button>
                <section className="product-main-info">
                    <div className="product-image-gallery" style={{ border: 'none'}}>
                        <div className="main-image-container" style={{ width: 400, height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--modal-bg)', borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)' }}>
                            <img
                                src={selectedImage || '/images/placeholder.png'}
                                alt={product.name}
                                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                                className="main-product-image"
                            />
                        </div>
                        <div className="thumbnail-images-container" style={{ display: 'flex', gap: 8 }}>
                            {productImages.map(image => (
                                <div
                                    key={image.imageId}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden',
                                        borderRadius: 6,
                                        border: selectedImage === image.imageUrl ? '2px solid var(--highlight)' : '2px solid transparent',
                                        background: 'var(--modal-bg)',
                                        boxSizing: 'border-box',
                                        cursor: 'pointer',
                                    }}
                                    onMouseOver={() => setSelectedImage(image.imageUrl)}
                                >
                                    <img
                                        src={image.imageUrl}
                                        alt={`Thumbnail ${image.imageId}`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain',
                                            display: 'block',
                                        }}
                                        className={`thumbnail-image${selectedImage === image.imageUrl ? ' active' : ''}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="product-details-content">
                        <h1 className="product-name" style={{ color: 'var(--main-text)' }}>{product.name}</h1>
                        <div className="product-meta">
                            <h2 className="section-title" style={{ color: 'var(--main-text)' }}>{t('product_details_title')}</h2>
                            <p className="price-info">
                                <span style={{ color: 'var(--main-text)' }}>{t('price_label')}</span>:
                                <span className="current-price">{product.price.toLocaleString('vi-VN')}₫</span>
                            </p>
                            <p style={{ color: 'var(--main-text)' }}><span>{t('category_label')}</span><span>:</span> <span className="detail-value" style={{ color: 'var(--main-text)' }}>{product.category?.name || 'Chưa phân loại'}</span></p>
                            <p style={{ color: 'var(--main-text)' }}><span>{t('brand_label')}</span><span>:</span> <span className="detail-value"  style={{ color: 'var(--main-text)' }}>{product.brand || 'Không có thương hiệu'}</span></p>
                            <p style={{ color: 'var(--main-text)' }}><span>{t('origin_label')}</span><span>:</span> <span className="detail-value"  style={{ color: 'var(--main-text)' }}>{product.origin || 'Không rõ xuất xứ'}</span></p>
                            <p style={{ color: 'var(--main-text)' }}><span>{t('quality_label')}</span><span>:</span> <span className="quality-rating">{product.condition}</span></p>
                            <p style={{ color: 'var(--main-text)' }}><span>{t('shop_label')}</span><span>:</span> <span className="seller-name">{product.account?.user?.name || 'Người bán ẩn danh'}</span></p>
                            <p style={{ color: 'var(--main-text)' }}><span>{t('location_label')}</span><span>:</span> <span className="location">{product.account?.user?.address || 'Không rõ vị trí'}</span></p>
                        </div>
                        <div className="product-description">
                            <p>
                                <span className="description-heading" style={{ color: 'var(--main-text)' }}>{t('description_heading')}</span>: <span className="description-text" style={{ color: 'var(--main-text)' }}>{product.description}</span>
                            </p>
                        </div>
                        <div className="product-actions">
                            <button className="like-toggle" onClick={handleLikeToggle}>
                                <img src={isLiked ? likedIcon : likeIcon} alt="Like" />
                            </button>
                            <button className="buy-now-button" onClick={openOptionsModal}>{t('buy_now_button_label')}</button>
                            <button className="add-to-cart-button" onClick={openOptionsModal}>{t('add_to_cart_button_label')}</button>
                        </div>
                    </div>
                </section>
            </main>

            {isOptionsModalOpen && (
                <div className="overlay-modal active" onClick={closeOptionsModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal-button" onClick={closeOptionsModal}>X</button>
                        <h3>{t('modal_select_variant_title')}</h3>

                        <div className="modal-product-display">
                            <img src={selectedImage || '/images/placeholder.png'} alt={product.name} className="modal-product-image" />
                            <span>{product.name}</span>
                        </div>

                        <div className="option-group">
                            <p>{t('color_label')}:</p>
                            <div className="options-wrapper">
                                <button
                                    className={`option-button ${selectedColor === product.color ? 'selected' : ''}`}
                                    onClick={() => setSelectedColor(product.color)}
                                >
                                    {product.color}
                                </button>
                            </div>
                        </div>
                        <div className="option-group">
                            <p>{t('size_label')}:</p>
                            <div className="options-wrapper">
                                <button
                                    className={`option-button ${selectedSize === product.size ? 'selected' : ''}`}
                                    onClick={() => setSelectedSize(product.size)}
                                >
                                    {product.size}
                                </button>
                            </div>
                        </div>
                        <div className="option-group quantity-control">
                            <p>{t('quantity_label')}:</p>
                            <div className="quantity-input-wrapper">
                                <button className="quantity-btn" onClick={() => handleQuantityChange('decrease')}>-</button>
                                <input type="number" value={quantity} min="1" readOnly className="quantity-input" />
                                <button className="quantity-btn" onClick={() => handleQuantityChange('increase')}>+</button>
                                <span className="stock-info">{t('quantity_in_stock')}: {product.quantity}</span>
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button className="modal-add-to-cart-button secondary-btn" onClick={handleAddToCart}>
                                {t('modal_add_to_cart_button_label')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

import Footer from './Footer.jsx';

export default function WrappedProductDetail(props) {
  return <>
    <ProductDetail {...props} />
    <Footer />
  </>;
}