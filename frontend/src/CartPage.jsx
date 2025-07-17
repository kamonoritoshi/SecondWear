import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import shopIcon from './icons/shop-icon.png';
import './css/CartPage.css'; // Import file CSS cho CartPage

const CartPage = ({ t }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState(new Set());

  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();

  const fetchCartItems = useCallback(() => {
    if (!isAuthenticated || !currentUser?.email) {
      setCartItems([]);
      setLoading(false);
      return;
    }
    try {
      const cartKey = `cart_${currentUser.email}`;
      const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
      setCartItems(cart);
    } catch (err) {
      setError("Lỗi khi đọc giỏ hàng: " + err.message);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, currentUser]);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const groupedByShop = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      let shopName = item.shopName || item.sellerName || (item.product?.account?.user?.name) || 'Shop ẩn danh';
      acc[shopName] = acc[shopName] || [];
      acc[shopName].push(item);
      return acc;
    }, {});
  }, [cartItems]);

  const totalAmount = useMemo(() => {
    return cartItems.reduce((total, item, idx) => {
      if (selectedItems.has(idx)) {
        return total + (item.price * item.quantity);
      }
      return total;
    }, 0);
  }, [cartItems, selectedItems]);

  const handleCheckout = useCallback(() => {
    if (selectedItems.size === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán.");
      return;
    }
    const itemsToPurchase = cartItems.filter((_, idx) => selectedItems.has(idx));
    navigate('/checkout', { state: { items: itemsToPurchase, total: totalAmount } });
  }, [cartItems, selectedItems, totalAmount, navigate]);

  const handleToggleItemSelection = (idx) => {
    setSelectedItems(prev => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  };

  const handleToggleShopSelection = (shopName) => {
    const shopIndexes = cartItems
      .map((item, idx) => ({ item, idx }))
      .filter(({ item }) => (item.shopName || item.sellerName || item.product?.account?.user?.name || 'Shop ẩn danh') === shopName)
      .map(({ idx }) => idx);
    const allSelected = shopIndexes.every(idx => selectedItems.has(idx));
    setSelectedItems(prev => {
      const next = new Set(prev);
      shopIndexes.forEach(idx => {
        allSelected ? next.delete(idx) : next.add(idx);
      });
      return next;
    });
  };

  const handleQuantityChange = (idx, newQuantity) => {
    if (newQuantity < 1) return;
    let maxStock = cartItems[idx]?.stock ?? cartItems[idx]?.product?.stock ?? 9999;
    const safeQuantity = Math.min(Math.max(1, newQuantity), maxStock);
    const updatedCart = cartItems.map((item, i) => i === idx ? { ...item, quantity: safeQuantity } : item);
    setCartItems(updatedCart);
    if (isAuthenticated && currentUser?.email) {
      const cartKey = `cart_${currentUser.email}`;
      localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    }
  };

  const handleDeleteItem = (idx) => {
    const updatedCart = cartItems.filter((_, i) => i !== idx);
    setCartItems(updatedCart);
    setSelectedItems(prev => {
      const next = new Set([...prev].filter(i => i !== idx).map(i => i > idx ? i - 1 : i));
      return next;
    });
    if (isAuthenticated && currentUser?.email) {
      const cartKey = `cart_${currentUser.email}`;
      localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    }
  };

  if (loading) return <main><div>Đang tải giỏ hàng...</div></main>;
  if (error) return <main><div>Lỗi: {error}</div></main>;

  return (
    <main className="cart-page-container">
      <div className="cart-main-wrapper">
        <div className="cart-header-title">{t('cart_title') || "Giỏ hàng"}</div>
        <div className="cart-content">
          {cartItems.length > 0 ? (
            <>
              <table className="cart-table">
                <thead>
                  <tr>
                    <th><input type="checkbox"
                      checked={cartItems.length > 0 && cartItems.every((_, idx) => selectedItems.has(idx))}
                      onChange={() => {
                        const allSelected = cartItems.every((_, idx) => selectedItems.has(idx));
                        setSelectedItems(allSelected ? new Set() : new Set(cartItems.map((_, idx) => idx)));
                      }}
                    /></th>
                    <th colSpan={2}>Sản phẩm</th>
                    <th>Đơn giá</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(groupedByShop).map(([shopName, items]) => {
                    const shopIndexes = items.map(item => cartItems.indexOf(item));
                    return (
                      <React.Fragment key={shopName}>
                        <tr>
                          <td colSpan={7}>
                            <div className="shop-group-header">
                              <input
                                type="checkbox"
                                checked={shopIndexes.every(idx => selectedItems.has(idx))}
                                onChange={() => handleToggleShopSelection(shopName)}
                              />
                              <img src={shopIcon} alt="shop" />
                              <span>{shopName}</span>
                            </div>
                          </td>
                        </tr>
                        {items.map(item => {
                          const idx = cartItems.indexOf(item);
                          const price = item.price || item.product?.price || 0;
                          const quantity = item.quantity || 1;
                          const image = item.image || item.product?.images?.[0]?.imageUrl || "/images/placeholder.png";
                          return (
                            <tr key={idx}>
                              <td><input type="checkbox" checked={selectedItems.has(idx)} onChange={() => handleToggleItemSelection(idx)} /></td>
                              <td><img src={image} alt={item.name} className="cart-item-image" /></td>
                              <td>{item.name || item.product?.name}</td>
                              <td>{price.toLocaleString()}₫</td>
                              <td>
                                <input type="number" value={quantity} min={1} max={9999}
                                  onChange={(e) => handleQuantityChange(idx, parseInt(e.target.value))} />
                              </td>
                              <td>{(price * quantity).toLocaleString()}₫</td>
                              <td>
                                <button onClick={() => handleDeleteItem(idx)}>🗑</button>
                              </td>
                            </tr>
                          );
                        })}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>

              <div className="cart-footer">
                <div>Tổng cộng: <strong>{totalAmount.toLocaleString()}₫</strong></div>
                <button onClick={handleCheckout} disabled={selectedItems.size === 0}>
                  Thanh toán ({selectedItems.size} sản phẩm)
                </button>
              </div>
            </>
          ) : (
            <div>Giỏ hàng của bạn đang trống</div>
          )}
        </div>
      </div>
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
