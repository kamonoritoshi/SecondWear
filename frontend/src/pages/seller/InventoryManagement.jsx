import React, { useEffect, useState } from 'react';
import './css/InventoryManagement.css';

const InventoryManagement = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    fetch('/api/seller/products', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        const initialQuantities = {};
        data.forEach((p) => {
          initialQuantities[p.productId] = p.quantity || 0;
        });
        setQuantities(initialQuantities);
      })
      .catch((err) => console.error('Lỗi khi tải sản phẩm:', err));
  }, []);

  const handleQuantityChange = (productId, value) => {
    const parsed = parseInt(value);
    if (!isNaN(parsed) && parsed >= 0) {
      setQuantities({ ...quantities, [productId]: parsed });
    }
  };

  const handleIncrease = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const handleDecrease = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 0) - 1, 0),
    }));
  };

  const updateQuantity = (productId) => {
    const newQuantity = quantities[productId];
    fetch(`/api/seller/products/${productId}/quantity`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newQuantity),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Cập nhật thất bại');
        return res.text();
      })
      .then((msg) => alert(msg))
      .catch((err) => {
        alert('❌ Không thể cập nhật số lượng');
        console.error(err);
      });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Quản lý kho</h2>
      <table className="w-full border border-gray-300 text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3">Ảnh</th>
            <th className="p-3">Tên sản phẩm</th>
            <th className="p-3">Số lượng hiện tại</th>
            <th className="p-3">Cập nhật</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.productId} className="border-t">
              <td className="p-3">
                <img
                  src={p.images?.[0]?.imageUrl || '/images/placeholder.png'}
                  alt={p.name}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="p-3">{p.name}</td>
              <td className="p-3">
                <div className="quantity-control">
                  <button
                    className="quantity-btn" style={{ background: 'var(--section-bg)' }}
                    onClick={() => handleDecrease(p.productId)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantities[p.productId] || 0}
                    onChange={(e) => handleQuantityChange(p.productId, e.target.value)}
                    className="quantity-input"
                    min="0"
                  />
                  <button
                    className="quantity-btn" style={{ background: 'var(--section-bg)' }}
                    onClick={() => handleIncrease(p.productId)}
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="p-3">
                <button
                  onClick={() => updateQuantity(p.productId)}
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                >
                  Lưu
                </button>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan="4" className="p-3 text-center text-gray-500">
                Không có sản phẩm nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryManagement;