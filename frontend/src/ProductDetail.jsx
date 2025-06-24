// src/ProductDetail.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { translations } from './translations';

// Import các hình ảnh (đảm bảo các file này đã nằm trong thư mục public/icons và public/images của bạn)
import searchIcon from '/icons/search-icon.png';
import cartIcon from '/icons/cart-icon.png';
import globeIcon from '/icons/globe-icon.png';
import sunIcon from '/icons/sun-icon.png';
import moonIcon from '/icons/moon-icon.png';
import userIcon from '/icons/user-icon.png';
import likeIcon from '/icons/like-icon.png';
import likedIcon from '/icons/liked-icon.png';
import reportIcon from '/icons/report-icon.png';
import mainProductImage from '/images/product.png';


const ProductDetail = () => {
    // --- React State Hooks ---
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);
    const [showThemeMenu, setShowThemeMenu] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
    const [isSizeColorQuantityModalOpen, setIsSizeColorQuantityModalOpen] = useState(false);
    const [isBuyNowAction, setIsBuyNowAction] = useState(false);
    const [isReportProductModalOpen, setIsReportProductModalOpen] = useState(false);
    const [isSizeGuideModalOpen, setIsSizeGuideModalOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem('language') || 'vi');
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('theme') || 'light');
    const [reportModalProductNameDisplay, setReportModalProductNameDisplay] = useState('Sản phẩm này');
    const [quantityValue, setQuantityValue] = useState(1);


    // --- Hàm dịch thuật (t) ---
    const t = useCallback((key) => {
        return translations[currentLanguage]?.[key] || key;
    }, [currentLanguage]);

    // --- Hàm chung ---

    const closeAllDropdowns = useCallback(() => {
        setShowLanguageMenu(false);
        setShowThemeMenu(false);
        setShowAccountMenu(false);
    }, []);

    const toggleDropdown = useCallback((menuSetter, currentMenuState, event) => {
        event.stopPropagation();
        closeAllDropdowns();
        menuSetter(!currentMenuState);
    }, [closeAllDropdowns]);

    const showModal = useCallback((modalSetter, isBuyNowActionContext = null) => {
        closeAllDropdowns();
        modalSetter(true);
        if (modalSetter === setIsSizeColorQuantityModalOpen) {
            setIsBuyNowAction(isBuyNowActionContext);
        }
    }, [closeAllDropdowns, setIsSizeColorQuantityModalOpen, setIsBuyNowAction]);

    const hideModal = useCallback((modalSetter) => {
        modalSetter(false);
    }, []);


    // --- Event Handlers ---

    // Dropdowns header
    const handleAccountToggle = useCallback((event) => toggleDropdown(setShowAccountMenu, showAccountMenu, event), [toggleDropdown, showAccountMenu]);
    const handleLanguageToggle = useCallback((event) => toggleDropdown(setShowLanguageMenu, showLanguageMenu, event), [toggleDropdown, showLanguageMenu]);
    const handleThemeToggle = useCallback((event) => toggleDropdown(setShowThemeMenu, showThemeMenu, event), [toggleDropdown, showThemeMenu]);

    // Nút Like
    const handleLikeToggle = useCallback(() => {
        setIsLiked(prevLiked => {
            const newState = !prevLiked;
            console.log(`Sản phẩm ${newState ? 'đã được thích' : 'đã bị bỏ thích'}!`);
            return newState;
        });
    }, []);

    // Side Menu
    const handleToggleSideMenu = useCallback(() => setIsSideMenuOpen(prevOpen => !prevOpen), []);
    const handleCloseSideMenu = useCallback(() => setIsSideMenuOpen(false), []);


    // Modal Phân loại hàng
    const handleBuyNowClick = useCallback(() => showModal(setIsSizeColorQuantityModalOpen, true), [showModal]);
    const handleAddToCartClick = useCallback(() => showModal(setIsSizeColorQuantityModalOpen, false), [showModal]);
    const handleCloseSizeColorQuantityModal = useCallback(() => hideModal(setIsSizeColorQuantityModalOpen), [hideModal]);

    const handleQuantityChange = useCallback((type) => {
        setQuantityValue(prevValue => {
            let newValue = prevValue;
            if (type === 'decrease' && prevValue > 1) {
                newValue = prevValue - 1;
            } else if (type === 'increase') {
                newValue = prevValue + 1;
            }
            return newValue;
        });
    }, []);

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
    }, [t, quantityValue, hideModal, setIsSizeColorQuantityModalOpen]);

    const handleModalAddToCart = useCallback(() => {
        const selectedColor = document.querySelector('.option-group .options-wrapper .option-button.selected')?.textContent;
        const selectedSize = document.querySelector('.option-group:nth-of-type(2) .options-wrapper .option-button.selected')?.textContent;

        setCartCount(prevCount => prevCount + quantityValue);
        
        alert(`${t('modal_add_to_cart_button_label')}: ${t('color_label')} ${selectedColor}, ${t('size_label')} ${selectedSize}, ${t('quantity_label')} ${quantityValue}`);
        hideModal(setIsSizeColorQuantityModalOpen);
    }, [t, quantityValue, hideModal, setIsSizeColorQuantityModalOpen]);

    // Logic Đổi Ngôn ngữ
    const handleLanguageChange = useCallback((lang) => {
        setCurrentLanguage(lang);
        localStorage.setItem('language', lang);
        closeAllDropdowns();
    }, [closeAllDropdowns]);

    // Logic Đổi Chủ đề
    const handleThemeChange = useCallback((theme) => {
        setCurrentTheme(theme);
        localStorage.setItem('theme', theme);
        closeAllDropdowns();
    }, [closeAllDropdowns]);

    // Logic Báo cáo sản phẩm vi phạm
    const handleReportClick = useCallback(() => {
        showModal(setIsReportProductModalOpen);
        const productNameElement = document.getElementById('product-name-hoodie');
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
    }, [t, hideModal, setIsReportProductModalOpen]);

    // Logic Bảng quy đổi kích cỡ
    const handleShowSizeGuide = useCallback((e) => {
        e.preventDefault();
        showModal(setIsSizeGuideModalOpen);
    }, [showModal]);
    const handleCloseSizeGuideModal = useCallback(() => hideModal(setIsSizeGuideModalOpen), [hideModal]);


    // --- Giả định dữ liệu sản phẩm tĩnh ---
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


    // --- useEffect để chạy các logic khởi tạo ban đầu ---
    useEffect(() => {
        document.title = t('page_title');
        document.body.className = currentTheme === 'dark' ? 'dark-mode' : '';

        // Cập nhật alt text cho theme icon ban đầu (nếu icon đã render)
        const themeIconElement = document.getElementById('theme-icon');
        if (themeIconElement) {
            themeIconElement.alt = t(currentTheme === 'light' ? 'light_theme_label' : 'dark_theme_label');
            themeIconElement.src = currentTheme === 'light' ? sunIcon : moonIcon;
        }

        // Đảm bảo đóng tất cả dropdown khi component mount lần đầu
        closeAllDropdowns();

    }, [currentLanguage, currentTheme, t, closeAllDropdowns]);


    // --- JSX Render (HTML của bạn, chuyển sang JSX) ---
    return (
        <> {/* Fragment gốc bao bọc toàn bộ JSX */}
            <header className="main-header">
                <div className="header-content">
                    <button className="menu-button" onClick={handleToggleSideMenu}>☰</button>
                    <div className="logo">LOGO SHOP</div>
                    <div className="search-bar">
                        <input type="text" placeholder={t('search_placeholder')} />
                        <button className="search-button"><img src={searchIcon} alt="Search" className="header-icon" /></button>
                    </div>
                    <div className="header-icons">
                        <a href="#" className="cart-icon">
                            <img src={cartIcon} alt="Cart" className="header-icon" />
                            <span className="cart-count">{cartCount}</span>
                        </a>
                        
                        <div className="dropdown language-dropdown">
                            <button className="dropdown-toggle language-toggle" onClick={handleLanguageToggle}>
                                <img src={globeIcon} alt="Language" className="header-icon" id="language-icon" />
                            </button>
                            {showLanguageMenu && (
                                <div className="dropdown-menu language-menu">
                                    <a href="#" className="dropdown-item" onClick={() => handleLanguageChange('vi')}>Tiếng Việt</a>
                                    <a href="#" className="dropdown-item" onClick={() => handleLanguageChange('en')}>English</a>
                                    <a href="#" className="dropdown-item" onClick={() => handleLanguageChange('ja')}>日本語</a>
                                    <a href="#" className="dropdown-item" onClick={() => handleLanguageChange('zh')}>中文</a>
                                    <a href="#" className="dropdown-item" onClick={() => handleLanguageChange('ko')}>한국어</a>
                                    <a href="#" className="dropdown-item" onClick={() => handleLanguageChange('ru')}>русский язык</a>
                                    <a href="#" className="dropdown-item" onClick={() => handleLanguageChange('ar')}>اللغة العربية</a>
                                </div>
                            )}
                        </div>

                        <div className="dropdown theme-dropdown">
                            <button className="dropdown-toggle theme-toggle" onClick={handleThemeToggle}>
                                <img src={currentTheme === 'light' ? sunIcon : moonIcon}
                                     alt={t(currentTheme === 'light' ? 'light_theme_label' : 'dark_theme_label')}
                                     className="header-icon" id="theme-icon" />
                            </button>
                            {showThemeMenu && (
                                <div className="dropdown-menu theme-menu">
                                    <a href="#" className="dropdown-item" onClick={() => handleThemeChange('light')}>{t('light_theme_label')}</a>
                                    <a href="#" className="dropdown-item" onClick={() => handleThemeChange('dark')}>{t('dark_theme_label')}</a>
                                </div>
                            )}
                        </div>

                        <div className="dropdown account-dropdown">
                            <button className="dropdown-toggle account-toggle" onClick={handleAccountToggle}>
                                <img src={userIcon} alt="User" className="header-icon" />
                                <span className="user-text">{t('guest_label')}</span>
                                <span className="arrow-down">▼</span>
                            </button>
                            {showAccountMenu && (
                                <div className="dropdown-menu account-menu">
                                    <a href="#" className="dropdown-item">{t('login_label')}</a>
                                    <a href="#" className="dropdown-item">{t('register_label')}</a>
                                    <a href="#" className="dropdown-item">{t('forgot_password_label')}</a>
                                </div>
                            )}
                        </div>

                    </div>
                    </div> 
                </header>

                {/* Side Menu */}
                <nav className={`side-menu ${isSideMenuOpen ? 'active' : ''}`}>
                    <button className="close-side-menu-button" onClick={handleCloseSideMenu}>X</button>
                    <h3>{t('menu_title')}</h3>
                    <ul>
                        <li><a href="#" onClick={handleCloseSideMenu}>{t('menu_home')}</a></li>
                        <li><a href="#" onClick={handleCloseSideMenu}>{t('menu_products')}</a></li>
                        <li><a href="#" onClick={handleCloseSideMenu}>{t('menu_categories')}</a></li>
                        <li><a href="#" onClick={handleCloseSideMenu}>{t('menu_my_orders')}</a></li>
                        <li><a href="#" onClick={handleCloseSideMenu}>{t('menu_sell_product')}</a></li>
                        <li><a href="#" onClick={handleCloseSideMenu}>{t('menu_contact')}</a></li>
                    </ul>
                    <div className="side-menu-footer">
                        <p>&copy; SecondWear 2025</p>
                    </div>
                </nav>
                {isSideMenuOpen && <div className="side-menu-overlay" onClick={handleCloseSideMenu}></div>}


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

                {/* Modals */}
                {isSizeColorQuantityModalOpen && (
                    <div className="overlay-modal active" onClick={(e) => { if (e.target.id === 'sizeColorQuantityModal') hideModal(setIsSizeColorQuantityModalOpen); }} id="sizeColorQuantityModal">
                        <div className="modal-content">
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
                                {isBuyNowAction && <button className="modal-confirm-button primary-btn" onClick={handleModalConfirm}>{t('modal_checkout_button_label')}</button>}
                                {!isBuyNowAction && <button className="modal-add-to-cart-button secondary-btn" onClick={handleModalAddToCart}>{t('modal_add_to_cart_button_label')}</button>}
                            </div>
                        </div>
                    </div>
                )}

                {isReportProductModalOpen && (
                    <div className="overlay-modal active" onClick={(e) => { if (e.target.id === 'reportProductModal') hideModal(setIsReportProductModalOpen); }} id="reportProductModal">
                        <div className="modal-content">
                            <button className="close-modal-button" onClick={handleCloseReportModal}>X</button>
                            <h3>{t('report_modal_title')}</h3>

                            <div className="modal-product-display">
                                <img src={productData.mainImageUrl} alt={productData.name} className="modal-product-image" />
                                <span>{reportModalProductNameDisplay}</span>
                            </div>

                            <div className="report-reason-group">
                                <h4>{t('report_reason_heading')}</h4>
                                <label className="report-checkbox-container">
                                    <input type="checkbox" name="report_reason" value="scam_fraud" />
                                    <span>{t('report_reason_scam')}</span>
                                </label>
                                <label className="report-checkbox-container">
                                    <input type="checkbox" name="report_reason" value="unclear_image" />
                                    <span>{t('report_reason_unclear_image')}</span>
                                </label>
                                <label className="report-checkbox-container">
                                    <input type="checkbox" name="report_reason" value="unsuitable_price" />
                                    <span>{t('report_reason_unsuitable_price')}</span>
                                </label>
                                <label className="report-checkbox-container">
                                    <input type="checkbox" name="report_reason" value="other" />
                                    <span>{t('report_reason_other')}</span>
                                </label>
                            </div>

                            <div className="modal-actions">
                                <button className="report-submit-button primary-btn" onClick={handleReportSubmit}>{t('report_submit_button')}</button>
                            </div>
                        </div>
                    </div>
                )}

                {isSizeGuideModalOpen && (
                    <div className={`overlay-modal active`} onClick={(e) => { if (e.target.id === 'sizeGuideModal') hideModal(setIsSizeGuideModalOpen); }} id="sizeGuideModal">
                        <div className="modal-content size-guide-modal-content">
                            <button className="close-modal-button" onClick={handleCloseSizeGuideModal}>X</button>
                            <h3>{t('size_guide_title')}</h3>
                            <div className="size-guide-table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>{t('size_table_heading_size')}</th>
                                            <th>{t('size_table_heading_width')}</th>
                                            <th>{t('size_table_heading_length')}</th>
                                            <th>{t('size_table_heading_sleeve')}</th>
                                            <th>{t('size_table_heading_height')}</th>
                                            <th>{t('size_table_heading_weight')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>S</td><td>61</td><td>63</td><td>17</td><td>155-160</td><td>40-50</td></tr>
                                        <tr><td>M</td><td>63</td><td>65</td><td>18</td><td>160-165</td><td>50-60</td></tr>
                                        <tr><td>L</td><td>65</td><td>67</td><td>19</td><td>165-170</td><td>60-70</td></tr>
                                        <tr><td>XL</td><td>67</td><td>70</td><td>20</td><td>170-175</td><td>70-80</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    };

    export default ProductDetail;