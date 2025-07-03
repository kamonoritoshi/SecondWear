// src/CartPage.jsx

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { authFetch } from './services/api';

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

    const navigate = useNavigate();
    const { currentUser, isAuthenticated } = useAuth();

    const paymentMethods = {
        'cod': { label: t('payment_method_cod'), icon: cashIcon },
        'bank': { label: t('payment_method_bank'), icon: bankIcon },
        'momo': { label: t('payment_method_momo'), icon: momoIcon },
    };

    const fetchCartItems = useCallback(async () => {
        if (!isAuthenticated || !currentUser?.accountId) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await authFetch(`/api/orders/accounts/${currentUser.accountId}`);
            if (!response.ok) throw new Error('Không thể tải dữ liệu giỏ hàng.');

            const ordersFromApi = await response.json();
            const itemsInCart = ordersFromApi.filter(order => order.status === 'In Cart');
            setCartItems(itemsInCart);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, currentUser]);

    useEffect(() => {
        fetchCartItems();
    }, [fetchCartItems]);

    const groupedByShop = useMemo(() => {
        return cartItems.reduce((acc, item) => {
            const shopName = item.product.account?.user?.name || 'Shop ẩn danh';
            acc[shopName] = acc[shopName] || [];
            acc[shopName].push(item);
            return acc;
        }, {});
    }, [cartItems]);

    const totalAmount = useMemo(() => {
        return cartItems.reduce((total, item) => {
            if (selectedItems.has(item.orderId)) {
                return total + item.totalAmount;
            }
            return total;
        }, 0);
    }, [cartItems, selectedItems]);

    const handleCheckout = useCallback(() => {
        if (selectedItems.size === 0) {
            alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán.");
            return;
        }

        const itemsToPurchase = cartItems.filter(item => selectedItems.has(item.orderId));
        navigate('/checkout', { state: { items: itemsToPurchase, total: totalAmount } });
    }, [cartItems, selectedItems, totalAmount, navigate]);

    const handleToggleItemSelection = (orderId) => {
        setSelectedItems(prev => {
            const next = new Set(prev);
            if (next.has(orderId)) {
                next.delete(orderId);
            } else {
                next.add(orderId);
            }
            return next;
        });
    };

    const handleToggleShopSelection = (shopName) => {
        const shopItemIds = (groupedByShop[shopName] || []).map(item => item.orderId);
        const allSelected = shopItemIds.every(id => selectedItems.has(id));

        setSelectedItems(prev => {
            const next = new Set(prev);
            shopItemIds.forEach(id => {
                if (allSelected) {
                    next.delete(id);
                } else {
                    next.add(id);
                }
            });
            return next;
        });
    };

    if (loading) return <main className="cart-page-container"><div>Đang tải giỏ hàng...</div></main>;
    if (error) return <main className="cart-page-container"><div>Lỗi: {error}</div></main>;

    return (
        <main className="cart-page-container">
            <div className="cart-header-title">{t('cart_title')}</div>
            <div className="cart-content">
                {cartItems.length > 0 ? (
                    <>
                        {Object.entries(groupedByShop).map(([shopName, items]) => (
                            <div className="cart-item-wrapper" key={shopName}>
                                <div className="shop-group-header">
                                    <input
                                        type="checkbox"
                                        className="cart-checkbox shop-checkbox"
                                        onChange={() => handleToggleShopSelection(shopName)}
                                        checked={items.length > 0 && items.every(i => selectedItems.has(i.orderId))}
                                    />
                                    <img src={shopIcon} alt="Shop" className="shop-icon-small" />
                                    <span>{shopName}</span>
                                </div>
                                {items.map(item => (
                                    <div className="cart-item" key={item.orderId}>
                                        <input
                                            type="checkbox"
                                            className="cart-checkbox product-checkbox"
                                            checked={selectedItems.has(item.orderId)}
                                            onChange={() => handleToggleItemSelection(item.orderId)}
                                        />
                                        <img
                                            src={item.product.images && item.product.images.length > 0 ? item.product.images[0].imageUrl : '/images/placeholder.png'}
                                            alt={item.product.name}
                                            className="cart-item-image"
                                        />
                                        <div className="cart-item-details">
                                            <p className="cart-item-name">{item.product.name}</p>
                                            <p className="cart-item-variant">{t('variant_label')}: {item.product.color}, {item.product.size}</p>
                                        </div>
                                        <div className="cart-item-price">{item.product.price.toLocaleString('vi-VN')}₫</div>
                                        <div className="quantity-input-wrapper">
                                            <button className="quantity-btn decrease">-</button>
                                            <input type="number" value={item.quantity} readOnly className="quantity-input" />
                                            <button className="quantity-btn increase">+</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                        <div className="cart-section voucher-section">
                            <img src={voucherIcon} alt="Voucher" className="cart-section-icon" />
                            <span className="voucher-text">{t('voucher_label')}: <span className="voucher-highlight">1 {t('voucher_available')}</span></span>
                            <a href="#" className="change-link">{t('change_link')}</a>
                        </div>
                        <div className="cart-section payment-section">
                            <img src={paymentIcon} alt="Payment" className="cart-section-icon" />
                            <span>{t('payment_method_label')}: {paymentMethods[selectedPaymentMethod].label}</span>
                            <a href="#" className="change-link" onClick={() => setIsPaymentModalOpen(true)}>{t('change_link')}</a>
                        </div>
                    </>
                ) : (
                    <div className="empty-cart-message">{t('empty_cart_message')}</div>
                )}
            </div>

            {cartItems.length > 0 && (
                <div className="cart-footer">
                    <div className="cart-footer-total">
                        {t('grand_total_label')} ({selectedItems.size} {t('product_label')}):
                        <span className="footer-total-amount">{totalAmount.toLocaleString('vi-VN')}₫</span>
                    </div>
                    <button className="checkout-button" onClick={handleCheckout} disabled={selectedItems.size === 0}>
                        {t('checkout_button')}
                    </button>
                </div>
            )}

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

export default CartPage;