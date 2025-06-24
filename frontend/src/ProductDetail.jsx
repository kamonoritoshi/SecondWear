// src/ProductDetail.jsx
import React, { useState, useEffect, useCallback } from 'react';
// Import các hình ảnh
import likeIcon from '/icons/like-icon.png';
import likedIcon from '/icons/liked-icon.png';
import reportIcon from '/icons/report-icon.png';

const ProductDetail = ({ t, setCartCount }) => { // Nhận t và setCartCount từ props
    // --- Các state riêng của trang ProductDetail ---
    const [isSizeColorQuantityModalOpen, setIsSizeColorQuantityModalOpen] = useState(false);
    const [isBuyNowAction, setIsBuyNowAction] = useState(false);
    const [isReportProductModalOpen, setIsReportProductModalOpen] = useState(false);
    const [isSizeGuideModalOpen, setIsSizeGuideModalOpen] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [reportModalProductNameDisplay, setReportModalProductNameDisplay] = useState('Sản phẩm này');
    const [quantityValue, setQuantityValue] = useState(1);

    // --- Dữ liệu giả định ---
    const productData = {
        name: "Outerrity Hoodie Double Zip Blue Fish",
        currentPrice: '150.000₫',
        originalPrice: '200.000₫',
        category: "Áo",
        brand: 'OUTERITY',
        origin: 'Việt Nam',
        quality: 'LIKE NEW 98%',
        seller: 'trungdeptrai111',
        location: 'TP. Hồ Chí Minh',
        description: 'Hàng like new chỉ mới mặc 1 lần còn thơm lắm.',
        discountPercentage: '25%',
        stockQuantity: 5,
        mainImageUrl: '/images/product.png',
        smallImageUrl: '/images/product.png',
        shortName: "Outerrity Hoodie Double..."
    };

    // --- useEffect chỉ cho trang này ---
    useEffect(() => {
        document.title = t('page_title');
    }, [t]);

    // --- Các hàm và handler giữ lại ---
    const showModal = useCallback((modalSetter, isBuyNowActionContext = null) => {
        modalSetter(true);
        if (modalSetter === setIsSizeColorQuantityModalOpen) {
            setIsBuyNowAction(isBuyNowActionContext);
        }
    }, []);

    const hideModal = useCallback((modalSetter) => {
        modalSetter(false);
    }, []);

    const handleLikeToggle = useCallback(() => setIsLiked(prev => !prev), []);
    const handleBuyNowClick = useCallback(() => showModal(setIsSizeColorQuantityModalOpen, true), [showModal]);
    const handleAddToCartClick = useCallback(() => showModal(setIsSizeColorQuantityModalOpen, false), [showModal]);
    const handleCloseSizeColorQuantityModal = useCallback(() => hideModal(setIsSizeColorQuantityModalOpen), [hideModal]);
    const handleQuantityChange = useCallback((type) => {
        setQuantityValue(prevValue => {
            if (type === 'decrease' && prevValue > 1) return prevValue - 1;
            if (type === 'increase' && prevValue < productData.stockQuantity) return prevValue + 1;
            return prevValue;
        });
    }, [productData.stockQuantity]);

    // ... (Các hàm còn lại như handleOptionSelect, handleModalConfirm, etc. giữ nguyên) ...
    const handleOptionSelect = useCallback((event) => {
        const button = event.target;
        const parentWrapper = button.closest('.options-wrapper');
        if (parentWrapper) {
            parentWrapper.querySelectorAll('.option-button').forEach(btn => btn.classList.remove('selected'));
        }
        button.classList.add('selected');
    }, []);

    const handleModalConfirm = useCallback(() => {
        const selectedColor = document.querySelector('.option-group .options-wrapper .option-button.selected')?.textContent;
        const selectedSize = document.querySelector('.option-group:nth-of-type(2) .options-wrapper .option-button.selected')?.textContent;

        alert(`${t('modal_checkout_button_label')}: ${t('color_label')} ${selectedColor}, ${t('size_label')} ${selectedSize}, ${t('quantity_label')} ${quantityValue}`);
        hideModal(setIsSizeColorQuantityModalOpen);
    }, [t, quantityValue, hideModal]);

    const handleModalAddToCart = useCallback(() => {
        const selectedColor = document.querySelector('.option-group .options-wrapper .option-button.selected')?.textContent;
        const selectedSize = document.querySelector('.option-group:nth-of-type(2) .options-wrapper .option-button.selected')?.textContent;

        setCartCount(prevCount => prevCount + quantityValue);

        alert(`${t('modal_add_to_cart_button_label')}: ${t('color_label')} ${selectedColor}, ${t('size_label')} ${selectedSize}, ${t('quantity_label')} ${quantityValue}`);
        hideModal(setIsSizeColorQuantityModalOpen);
    }, [t, quantityValue, hideModal, setCartCount]);

    // Logic Báo cáo sản phẩm vi phạm
    const handleReportClick = useCallback(() => {
        showModal(setIsReportProductModalOpen);
        const productNameElement = document.querySelector('.product-name'); // Sử dụng querySelector an toàn hơn
        if (productNameElement) {
            setReportModalProductNameDisplay(productNameElement.textContent);
        }
    }, [showModal]);
    const handleCloseReportModal = useCallback(() => hideModal(setIsReportProductModalOpen), [hideModal]);
    const handleReportSubmit = useCallback(() => {
        const selectedReasons = [];
        document.querySelectorAll('input[name="report_reason"]:checked').forEach(checkbox => {
            selectedReasons.push(checkbox.value);
        });
        alert(`${t('report_submit_button')}: ${selectedReasons.join(', ')}`);
        hideModal(setIsReportProductModalOpen);
    }, [t, hideModal]);

    // Logic Bảng quy đổi kích cỡ
    const handleShowSizeGuide = useCallback((e) => {
        e.preventDefault();
        showModal(setIsSizeGuideModalOpen);
    }, [showModal]);
    const handleCloseSizeGuideModal = useCallback(() => hideModal(setIsSizeGuideModalOpen), [hideModal]);


    return (
        <>
            {/* Phần JSX của ProductDetail giữ nguyên từ <main> trở đi */}
            <main className="product-detail-page">
                {/* Nút Báo cáo sản phẩm */}
                <button className="report-product-button" onClick={handleReportClick}>
                    <span>{t('report_button_label')}</span>
                    <img src={reportIcon} alt={t('report_button_label')} className="header-icon" />
                </button>

                <section className="product-main-info">
                    <div className="product-image-gallery">
                        <img src={productData.mainImageUrl} alt={productData.name} className="main-product-image" />
                        <div className="discount-badge">{t('discount_25_percent')}</div>
                    </div>

                    <div className="product-details-content">
                        <h1 className="product-name">{productData.name}</h1>
                        <div className="product-meta">
                            <h2 className="section-title">{t('product_details_title')}</h2>
                            <p className="price-info">
                                <span>{t('price_label')}</span>: <span className="current-price">{productData.currentPrice}</span> <span className="original-price">{productData.originalPrice}</span>
                            </p>
                            <p><span>{t('category_label')}</span>: <span className="detail-value">{productData.category}</span></p>
                            <p><span>{t('brand_label')}</span>: <span className="detail-value">{productData.brand}</span></p>
                            <p><span>{t('origin_label')}</span>: <span className="detail-value">{productData.origin}</span></p>
                            <p><span>{t('quality_label')}</span>: <span className="quality-rating">{productData.quality}</span></p>
                            <p><span>{t('shop_label')}</span>: <span className="seller-name">{productData.seller}</span></p>
                            <p><span>{t('location_label')}</span>: <span className="location">{productData.location}</span></p>
                        </div>
                        <div className="product-description">
                            <p>
                                <span className="description-heading">{t('description_heading')}</span>:
                                <span className="description-text">{productData.description}</span>
                            </p>
                        </div>

                        <div className="product-actions">
                            <button className="like-toggle" onClick={handleLikeToggle}>
                                <img src={isLiked ? likedIcon : likeIcon}
                                    alt={isLiked ? 'Đã thích' : t('wishlist_icon_alt')}
                                    className="header-icon" id="like-icon" />
                            </button>
                            <button className="buy-now-button" onClick={handleBuyNowClick}>{t('buy_now_button_label')}</button>
                            <button className="add-to-cart-button" onClick={handleAddToCartClick}>{t('add_to_cart_button_label')}</button>
                        </div>
                    </div>
                </section>
            </main>

            {/* Các Modals giữ nguyên */}
            {isSizeColorQuantityModalOpen && (
                <div className="overlay-modal active" onClick={handleCloseSizeColorQuantityModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal-button" onClick={handleCloseSizeColorQuantityModal}>X</button>
                        <h3>{t('modal_select_variant_title')}</h3>

                        <div className="modal-product-display">
                            <img src={productData.smallImageUrl} alt={productData.name} className="modal-product-image" />
                            <span>{productData.shortName}</span>
                        </div>

                        <div className="option-group">
                            <p>{t('color_label')}:</p>
                            <div className="options-wrapper">
                                <button className="option-button selected" onClick={handleOptionSelect}>Trắng</button>
                                <button className="option-button" onClick={handleOptionSelect}>Đen</button>
                                <button className="option-button" onClick={handleOptionSelect}>Xanh</button>
                            </div>
                        </div>

                        <div className="option-group">
                            <p>{t('size_label')}:</p>
                            <div className="options-wrapper">
                                <button className="option-button" onClick={handleOptionSelect}>S</button>
                                <button className="option-button" onClick={handleOptionSelect}>M</button>
                                <button className="option-button selected" onClick={handleOptionSelect}>L</button>
                                <button className="option-button">XL</button>
                            </div>
                        </div>

                        <div className="option-group quantity-control">
                            <p>{t('quantity_label')}:</p>
                            <div className="quantity-input-wrapper">
                                <button className="quantity-btn decrease" onClick={() => handleQuantityChange('decrease')}>-</button>
                                <input type="number" value={quantityValue} min="1" className="quantity-input" onChange={(e) => setQuantityValue(parseInt(e.target.value) || 1)} />
                                <button className="quantity-btn increase" onClick={() => handleQuantityChange('increase')}>+</button>
                                <span className="stock-info">{t('quantity_in_stock')}: {productData.stockQuantity}</span>
                            </div>
                        </div>

                        <p className="size-guide-link" onClick={handleShowSizeGuide}>{t('size_guide_link')}</p>

                        <div className="modal-actions">
                            {isBuyNowAction ? (
                                <button className="modal-confirm-button primary-btn" onClick={handleModalConfirm}>{t('modal_checkout_button_label')}</button>
                            ) : (
                                <button className="modal-add-to-cart-button secondary-btn" onClick={handleModalAddToCart}>{t('modal_add_to_cart_button_label')}</button>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {/* Các modal khác (Report, SizeGuide) giữ nguyên... */}
        </>
    );
};

export default ProductDetail;