import React, { useState, useEffect, useCallback } from 'react';
import productIcon from '/images/product.png';
import voucherIcon from '/icons/voucher-icon.png';
import paymentIcon from '/icons/payment-icon.png';
import shopIcon from '/icons/shop-icon.png';
import cashIcon from '/icons/cash-icon.png';
import bankIcon from '/icons/bank-icon.png';
import momoIcon from '/icons/momo-icon.png';

const CartPage = ({ t }) => {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            shopName: "trungdeptrai111",
            productName: "Outerrity Hoodie Double Zip Blue Fish",
            imageUrl: "/images/product.png",
            color: "Trắng",
            size: "L",
            price: 150000,
            quantity: 1,
            stock: 5,
        },
        // Thêm các sản phẩm khác vào đây nếu cần
    ]);
    const [selectedItems, setSelectedItems] = useState(new Set());
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('momo'); // Giá trị mặc định
    const paymentMethods = {
        'cod': { label: t('payment_method_cod'), icon: cashIcon },
        'bank': { label: t('payment_method_bank'), icon: bankIcon },
        'momo': { label: t('payment_method_momo'), icon: momoIcon },
    };

    const handleCartItemQuantityChange = (id, type) => {
        setCartItems(currentItems =>
            currentItems.map(item => {
                if (item.id === id) {
                    let newQuantity = item.quantity;
                    if (type === 'decrease' && item.quantity > 1) newQuantity--;
                    else if (type === 'increase' && item.quantity < item.stock) newQuantity++;
                    return { ...item, quantity: newQuantity };
                }
                return item;
            })
        );
    };

    const handleToggleItemSelection = (id) => {
        setSelectedItems(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    const handleToggleShopSelection = (shopName) => {
        const shopItemIds = cartItems.filter(item => item.shopName === shopName).map(item => item.id);
        const allSelected = shopItemIds.every(id => selectedItems.has(id));
        setSelectedItems(prev => {
            const next = new Set(prev);
            shopItemIds.forEach(id => allSelected ? next.delete(id) : next.add(id));
            return next;
        });
    };

    const handleSelectPayment = (method) => {
        setSelectedPaymentMethod(method);
        setIsPaymentModalOpen(false);
    };

    const calculateTotal = () => cartItems.reduce((total, item) => selectedItems.has(item.id) ? total + item.price * item.quantity : total, 0);
    const totalAmount = calculateTotal();
    const totalSelectedItems = selectedItems.size;

    return (
        <main className="cart-page-container">
            <div className="cart-header-title">{t('cart_title')}</div>
            <div className="cart-content">
                {cartItems.length > 0 ? (
                    <>
                        <div className="cart-section shop-group">
                            {/* Lặp qua từng sản phẩm và hiển thị thông tin cửa hàng trước */}
                            {cartItems.map(item => (
                                <div className="cart-item-wrapper" key={item.id}> {/* Thêm wrapper để tạo khung */}
                                    <div className="shop-group-header">
                                        <input
                                            type="checkbox"
                                            className="cart-checkbox shop-checkbox"
                                            onChange={() => handleToggleShopSelection(item.shopName)}
                                            checked={cartItems.filter(i => i.shopName === item.shopName).every(i => selectedItems.has(i.id))}
                                        />
                                        <img src={shopIcon} alt="Shop" className="shop-icon-small" />
                                        <span>Cửa hàng: {item.shopName}</span>
                                    </div>
                                    <div className="cart-item">
                                        <input
                                            type="checkbox"
                                            className="cart-checkbox product-checkbox"
                                            checked={selectedItems.has(item.id)}
                                            onChange={() => handleToggleItemSelection(item.id)}
                                        />
                                        <img src={item.imageUrl} alt={item.productName} className="cart-item-image" />
                                        <div className="cart-item-details">
                                            <p className="cart-item-name">{item.productName}</p>
                                            <p className="cart-item-variant">{t('variant_label')}: {t('color_label')} {item.color}, {t('size_label')} {item.size}</p>
                                            <p className="cart-item-stock">{t('quantity_label')}: {t('quantity_in_stock')} {item.stock}</p>
                                        </div>
                                        <div className="cart-item-price">{item.price.toLocaleString('vi-VN')}₫</div>
                                        <div className="quantity-input-wrapper">
                                            <button className="quantity-btn decrease" onClick={() => handleCartItemQuantityChange(item.id, 'decrease')}>-</button>
                                            <input type="number" value={item.quantity} readOnly className="quantity-input" />
                                            <button className="quantity-btn increase" onClick={() => handleCartItemQuantityChange(item.id, 'increase')}>+</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="cart-section voucher-section">
                            <img src={voucherIcon} alt="Voucher" className="cart-section-icon" />
                            <span className="voucher-text">{t('voucher_label')}: <span className="voucher-highlight">1 {t('voucher_available')}</span></span>
                            <a href="#" className="change-link">{t('change_link')}</a>
                            <span className="cart-section-total-label">{t('total_label')}:</span>
                            <span className="cart-section-total-value">{totalAmount.toLocaleString('vi-VN')}₫</span>
                        </div>
                        <div className="cart-section payment-section">
                            <img src={paymentIcon} alt="Payment" className="cart-section-icon" />
                            <span>{t('payment_method_label')}: {paymentMethods.momo.label}</span> {/* Sử dụng giá trị mặc định */}
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
                        {t('grand_total_label')} ({totalSelectedItems} {t('product_label')}): <span className="footer-total-amount">{totalAmount.toLocaleString('vi-VN')}₫</span>
                    </div>
                    <button className="checkout-button" disabled={totalSelectedItems === 0}>{t('checkout_button')}</button>
                </div>
            )}

            {isPaymentModalOpen && (
                <div className="overlay-modal active" onClick={() => setIsPaymentModalOpen(false)}>
                    <div className="modal-content payment-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal-button" onClick={() => setIsPaymentModalOpen(false)}>X</button>
                        <h3>{t('select_payment_method_title')}</h3>
                        <ul className="payment-options-list">
                            {Object.entries(paymentMethods).map(([key, method]) => (
                                <li key={key} onClick={() => handleSelectPayment(key)}>
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

