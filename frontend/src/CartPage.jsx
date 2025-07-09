// src/CartPage.jsx

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
// import { authFetch } from './services/api';

// Import các hình ảnh
import voucherIcon from './icons/voucher-icon.png';
import paymentIcon from './icons/payment-icon.png';
import shopIcon from './icons/shop-icon.png';
import cashIcon from './icons/cash-icon.png';
import bankIcon from './icons/bank-icon.png';
import momoIcon from './icons/momo-icon.png';

const CartPage = ({ t }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedItems, setSelectedItems] = useState(new Set());
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('momo');
    // Không cần modal cảnh báo vượt stock, chỉ lấy đúng stock và chặn input

    const navigate = useNavigate();
    const { currentUser, isAuthenticated } = useAuth();

    const paymentMethods = {
        'cod': { label: t('payment_method_cod'), icon: cashIcon },
        'bank': { label: t('payment_method_bank'), icon: bankIcon },
        'momo': { label: t('payment_method_momo'), icon: momoIcon },
    };

    // Đọc giỏ hàng từ localStorage theo email
    const fetchCartItems = useCallback(() => {
        console.debug('[CartPage] fetchCartItems called', { isAuthenticated, currentUser });
        if (!isAuthenticated || !currentUser?.email) {
            setCartItems([]);
            setLoading(false);
            console.warn('[CartPage] Not authenticated or missing email', { isAuthenticated, currentUser });
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const cartKey = `cart_${currentUser.email}`;
            const cartStr = localStorage.getItem(cartKey);
            let cart = [];
            console.debug('[CartPage] Read cartStr:', cartStr);
            if (cartStr) {
                try {
                    cart = JSON.parse(cartStr);
                } catch (e) {
                    console.error('[CartPage] JSON.parse error', e);
                }
            }
            console.debug('[CartPage] Parsed cart:', cart);
            setCartItems(cart);
        } catch (err) {
            setError("Lỗi khi đọc giỏ hàng: " + err.message);
            console.error('[CartPage] Exception', err);
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, currentUser]);

    useEffect(() => {
        fetchCartItems();
    }, [fetchCartItems]);

    // Group by shopName (localStorage version: shopName is not nested in product)
    const groupedByShop = useMemo(() => {
        return cartItems.reduce((acc, item) => {
            // Nếu có trường shopName thì lấy, nếu không thì lấy từ product hoặc fallback
            let shopName = item.shopName || item.sellerName;
            if (!shopName && item.product && item.product.account && item.product.account.user && item.product.account.user.name) {
                shopName = item.product.account.user.name;
            }
            if (!shopName) shopName = 'Shop ẩn danh';
            acc[shopName] = acc[shopName] || [];
            acc[shopName].push(item);
            return acc;
        }, {});
    }, [cartItems]);

    // Tính tổng tiền cho localStorage version
    const totalAmount = useMemo(() => {
        return cartItems.reduce((total, item, idx) => {
            if (selectedItems.has(idx)) {
                // Nếu là localStorage dạng mới
                if (item.price && item.quantity) {
                    return total + (item.price * item.quantity);
                }
                // Nếu là dạng backend cũ
                if (item.totalAmount) {
                    return total + item.totalAmount;
                }
            }
            return total;
        }, 0);
    }, [cartItems, selectedItems]);

    const handleCheckout = useCallback(() => {
        if (selectedItems.size === 0) {
            alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán.");
            return;
        }
        // Lấy các item được chọn theo index
        const itemsToPurchase = cartItems.filter((item, idx) => selectedItems.has(idx));
        navigate('/checkout', { state: { items: itemsToPurchase, total: totalAmount } });
    }, [cartItems, selectedItems, totalAmount, navigate]);


    // Sử dụng index làm key cho localStorage version
    const handleToggleItemSelection = (idx) => {
        setSelectedItems(prev => {
            const next = new Set(prev);
            if (next.has(idx)) {
                next.delete(idx);
            } else {
                next.add(idx);
            }
            return next;
        });
    };

    const handleToggleShopSelection = (shopName) => {
        // Lấy index của các item thuộc shop này
        const shopIndexes = cartItems
            .map((item, idx) => ({ item, idx }))
            .filter(({ item }) => (item.shopName || item.sellerName || 'Shop ẩn danh') === shopName)
            .map(({ idx }) => idx);
        const allSelected = shopIndexes.every(idx => selectedItems.has(idx));
        setSelectedItems(prev => {
            const next = new Set(prev);
            shopIndexes.forEach(idx => {
                if (allSelected) {
                    next.delete(idx);
                } else {
                    next.add(idx);
                }
            });
            return next;
        });
    };

    // Thay đổi số lượng sản phẩm
    const handleQuantityChange = (idx, newQuantity) => {
        if (newQuantity < 1) return;
        let maxStock = 9999;
        if (typeof cartItems[idx]?.stock === 'number') maxStock = cartItems[idx].stock;
        else if (cartItems[idx]?.product && typeof cartItems[idx].product.stock === 'number') maxStock = cartItems[idx].product.stock;
        if (maxStock < 1) return;
        const safeQuantity = Math.max(1, Math.min(newQuantity, maxStock));
        if (cartItems[idx].quantity === safeQuantity) return;
        const updatedCart = cartItems.map((item, i) => i === idx ? { ...item, quantity: safeQuantity } : item);
        setCartItems(updatedCart);
        if (isAuthenticated && currentUser?.email) {
            const cartKey = `cart_${currentUser.email}`;
            localStorage.setItem(cartKey, JSON.stringify(updatedCart));
        }
    };

    // Xóa sản phẩm khỏi giỏ hàng
    const handleDeleteItem = (idx) => {
        const updatedCart = cartItems.filter((_, i) => i !== idx);
        setCartItems(updatedCart);
        setSelectedItems(prev => {
            const next = new Set(prev);
            next.delete(idx);
            // Cập nhật lại index các item còn lại
            const newSet = new Set();
            Array.from(next).forEach(i => {
                if (i < idx) newSet.add(i);
                else if (i > idx) newSet.add(i - 1);
            });
            return newSet;
        });
        if (isAuthenticated && currentUser?.email) {
            const cartKey = `cart_${currentUser.email}`;
            localStorage.setItem(cartKey, JSON.stringify(updatedCart));
        }
    };


    // Debug auth state and cartItems on every render
    console.debug('[CartPage] Render', { isAuthenticated, currentUser, cartItems });

    if (loading) return <main className="cart-page-container"><div>Đang tải giỏ hàng...</div></main>;
    if (error) return <main className="cart-page-container"><div>Lỗi: {error}</div></main>;
    return (
        <main className="cart-page-container">
            <div className="cart-main-wrapper">
                <div className="cart-header-title">{t('cart_title')}</div>
                <div className="cart-content">
                    {cartItems.length > 0 ? (
                        <>
                            {/* Bảng sản phẩm dạng Shopee */}
                            <table className="cart-table">
                                <thead>
                                    <tr>
                                        <th style={{ width: 40, textAlign: 'center' }}>
                                            <input
                                                type="checkbox"
                                                className="cart-checkbox"
                                                checked={cartItems.length > 0 && cartItems.every((_, idx) => selectedItems.has(idx))}
                                                onChange={() => {
                                                    const allSelected = cartItems.every((_, idx) => selectedItems.has(idx));
                                                    setSelectedItems(allSelected ? new Set() : new Set(cartItems.map((_, idx) => idx)));
                                                }}
                                            />
                                        </th>
                                        <th colSpan={2} style={{ textAlign: 'left' }}>
                                            <span className="cart-select-all-label">{t('select_all_label') || 'Chọn tất cả'}</span>
                                        </th>
                                        <th style={{ width: 120 }}>{t('unit_price_label') || 'Đơn giá'}</th>
                                        <th style={{ width: 120 }}>{t('quantity_label') || 'Số lượng'}</th>
                                        <th className="cart-total-col" style={{ width: 120 }}>{t('total_label') || 'Thành tiền'}</th>
                                        <th style={{ width: 60 }}>{t('action_label') || ''}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(groupedByShop).map(([shopName, items]) => {
                                        // Lấy index của từng item trong cartItems
                                        const shopIndexes = items.map(shopItem => cartItems.findIndex(i => i === shopItem));
                                        return (
                                            <React.Fragment key={shopName}>
                                                {/* Shop header row (Shopee style) */}
                                                <tr>
                                                    <td colSpan={7} style={{ padding: 0, background: '#fff' }}>
                                                        <div className="shop-group-header">
                                                            <input
                                                                type="checkbox"
                                                                className="cart-checkbox shop-checkbox"
                                                                onChange={() => handleToggleShopSelection(shopName)}
                                                                checked={shopIndexes.length > 0 && shopIndexes.every(idx => selectedItems.has(idx))}
                                                            />
                                                            <img src={shopIcon} alt="Shop" className="shop-icon-small" />
                                                            <span className="shop-name">{shopName}</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {items.map((item) => {
                                                    // Lấy index thực của item trong cartItems
                                                    const idx = cartItems.indexOf(item);
                                                    return (
                                                        <tr className="cart-item-row cart-item-wrapper" key={idx}>
                                                            <td style={{ textAlign: 'center' }}>
                                                                <input
                                                                    type="checkbox"
                                                                    className="cart-checkbox product-checkbox"
                                                                    checked={selectedItems.has(idx)}
                                                                    onChange={() => handleToggleItemSelection(idx)}
                                                                />
                                                            </td>
                                                            <td style={{ width: 80 }}>
                                                                <img
                                                                    src={item.image || (item.product && item.product.images && item.product.images.length > 0 ? item.product.images[0].imageUrl : '/images/placeholder.png')}
                                                                    alt={item.name || (item.product && item.product.name) || ''}
                                                                    className="cart-item-image"
                                                                />
                                                            </td>
                                                            <td style={{ minWidth: 180 }}>
                                                                <div className="cart-item-details">
                                                                    <div className="cart-item-name">{item.name || (item.product && item.product.name)}</div>
                                                                    <div className="cart-item-variant">{t('variant_label')}: {item.color || (item.product && item.product.color)}, {item.size || (item.product && item.product.size)}</div>
                                                                </div>
                                                            </td>
                                                            <td className="cart-item-price">
                                                                <span>{(item.price || (item.product && item.product.price) || 0).toLocaleString('vi-VN')}₫</span>
                                                            </td>
                                                            <td>
                                                                <div className="quantity-input-wrapper">
                                                                    <button
                                                                        className="quantity-btn decrease"
                                                                        onClick={() => handleQuantityChange(idx, (item.quantity || 1) - 1)}
                                                                        disabled={item.quantity <= 1}
                                                                    >-</button>
                                                                    <input
                                                                        type="number"
                                                                        value={item.quantity || 1}
                                                                        min={1}
                                                                        max={(() => {
                                                                            if (typeof item.stock === 'number' && !isNaN(item.stock)) return item.stock;
                                                                            if (item.product && typeof item.product.stock === 'number' && !isNaN(item.product.stock)) return item.product.stock;
                                                                            if (typeof item.maxQuantity === 'number' && !isNaN(item.maxQuantity)) return item.maxQuantity;
                                                                            return 9999;
                                                                        })()}
                                                                        className="quantity-input"
                                                                        onChange={e => {
                                                                            let val = parseInt(e.target.value, 10);
                                                                            let maxStock = 9999;
                                                                            if (typeof item.stock === 'number' && !isNaN(item.stock)) maxStock = item.stock;
                                                                            else if (item.product && typeof item.product.stock === 'number' && !isNaN(item.product.stock)) maxStock = item.product.stock;
                                                                            else if (typeof item.maxQuantity === 'number' && !isNaN(item.maxQuantity)) maxStock = item.maxQuantity;
                                                                            if (isNaN(val) || val < 1) val = 1;
                                                                            if (val > maxStock) val = maxStock;
                                                                            handleQuantityChange(idx, val);
                                                                        }}
                                                                    />
                                                                    <button
                                                                        className="quantity-btn increase"
                                                                        onClick={() => {
                                                                            let maxStock = 9999;
                                                                            if (typeof item.stock === 'number' && !isNaN(item.stock)) maxStock = item.stock;
                                                                            else if (item.product && typeof item.product.stock === 'number' && !isNaN(item.product.stock)) maxStock = item.product.stock;
                                                                            else if (typeof item.maxQuantity === 'number' && !isNaN(item.maxQuantity)) maxStock = item.maxQuantity;
                                                                            if ((item.quantity || 1) < maxStock) handleQuantityChange(idx, (item.quantity || 1) + 1);
                                                                        }}
                                                                        disabled={(() => {
                                                                            let maxStock = 9999;
                                                                            if (typeof item.stock === 'number' && !isNaN(item.stock)) maxStock = item.stock;
                                                                            else if (item.product && typeof item.product.stock === 'number' && !isNaN(item.product.stock)) maxStock = item.product.stock;
                                                                            else if (typeof item.maxQuantity === 'number' && !isNaN(item.maxQuantity)) maxStock = item.maxQuantity;
                                                                            return (item.quantity || 1) >= maxStock;
                                                                        })()}
                                                                    >+</button>
                                                                    <span className="stock-info" style={{ marginLeft: 8, color: '#888', fontSize: 13 }}>
                                                                        {t('quantity_in_stock') || 'Kho'}: {
                                                                            (() => {
                                                                                if (typeof item.stock === 'number' && !isNaN(item.stock)) return item.stock;
                                                                                if (item.product && typeof item.product.stock === 'number' && !isNaN(item.product.stock)) return item.product.stock;
                                                                                if (typeof item.maxQuantity === 'number' && !isNaN(item.maxQuantity)) return item.maxQuantity;
                                                                                return '';
                                                                            })()
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </td>
                                        <td className="cart-total-col" style={{ color: '#ff6f61' }}>
                                            {((item.price || (item.product && item.product.price) || 0) * (item.quantity || 1)).toLocaleString('vi-VN')}₫
                                        </td>
                                                            <td style={{ textAlign: 'center' }}>
                                                                <button className="delete-btn" title="Xóa sản phẩm"
                                                                    onClick={() => {
                                                                        if (window.confirm('Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?')) handleDeleteItem(idx);
                                                                    }}>
                                                                    🗑
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </React.Fragment>
                                        );
                                    })}
                                </tbody>
                            </table>
                            {/* Voucher section */}
                            <div className="cart-section voucher-section">
                                <img src={voucherIcon} alt="Voucher" className="cart-section-icon" />
                                <span>{t('voucher_label')}: <span className="voucher-highlight">1 {t('voucher_available')}</span></span>
                                <a href="#" className="change-link">{t('change_link')}</a>
                            </div>
                            {/* Payment section */}
                            <div className="cart-section payment-section">
                                <img src={paymentIcon} alt="Payment" className="cart-section-icon" />
                                <span>{t('payment_method_label')}: {paymentMethods[selectedPaymentMethod].label}</span>
                                <a href="#" className="change-link" onClick={() => setIsPaymentModalOpen(true)}>{t('change_link')}</a>
                            </div>
                        </>
                    ) : (
                        <div className="empty-cart-message">
                            <img src="/src/icons/empty-cart.png" alt="empty" />
                            <div className="empty-cart-title">{t('empty_cart_message')}</div>
                            <button className="empty-cart-buy-btn" onClick={() => window.location.href = '/'}>Mua ngay</button>
                        </div>
                    )}
                </div>
                {cartItems.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-footer-total">
                            <span>{t('grand_total_label')} ({selectedItems.size} {t('product_label')}):</span>
                            <span className="footer-total-amount">{totalAmount.toLocaleString('vi-VN')}₫</span>
                        </div>
                        <button
                            className="checkout-button"
                            onClick={handleCheckout}
                            disabled={selectedItems.size === 0}
                        >
                            {t('checkout_button')}
                        </button>
                    </div>
                )}
            </div>
            {/* Không cần modal cảnh báo vượt stock */}
            {isPaymentModalOpen && (
                <div className="overlay-modal active" onClick={() => setIsPaymentModalOpen(false)}>
                    <div className="modal-content payment-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal-button" onClick={() => setIsPaymentModalOpen(false)}>X</button>
                        <h3>{t('select_payment_method_title')}</h3>
                        <ul className="payment-options-list">
                            {Object.entries(paymentMethods).map(([key, method]) => (
                                <li key={key} onClick={() => { setSelectedPaymentMethod(key); setIsPaymentModalOpen(false); }}>
                                    <img src={method.icon} alt={method.label} />
                                    <span>{method.label}</span>
                                    <button className="select-button">{t('select_button')}</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </main>
    );
};

import Footer from './Footer.jsx';

export default function WrappedCartPage(props) {
  return <>
    <CartPage {...props} />
    <Footer />
  </>;
}