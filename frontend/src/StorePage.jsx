import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { API_BASE_URL } from './apiConfig';
import { toast } from 'react-toastify';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Icon trái tim
import "./css/StorePage.css"; // Import file CSS

const StorePage = () => {
    const { storeId } = useParams();
    const { isAuthenticated, currentUser } = useAuth();
    const navigate = useNavigate();

    const [storeData, setStoreData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStoreData = async () => {
            setLoading(true);
            const token = localStorage.getItem("jwtToken");
            const headers = {};
            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/api/stores/${storeId}`, { headers });
                if (!response.ok) {
                    throw new Error('Không tìm thấy cửa hàng này.');
                }
                const data = await response.json();
                setStoreData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStoreData();
    }, [storeId]);

    const handleFavoriteStore = useCallback(async () => {
        if (!isAuthenticated) {
            toast.error("Bạn cần đăng nhập để yêu thích cửa hàng.");
            navigate("/login");
            return;
        }

        const token = localStorage.getItem("jwtToken");
        setStoreData(prev => ({ ...prev, isFavorited: !prev.isFavorited })); // Cập nhật UI trước

        try {
            const response = await fetch(`${API_BASE_URL}/api/favorites/stores/${storeId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Có lỗi xảy ra, vui lòng thử lại.");
            }

            const isNowFavorited = await response.json();
            
            // Đồng bộ lại state từ server
            setStoreData(prev => ({ ...prev, isFavorited: isNowFavorited }));

            toast.success(isNowFavorited ? "Đã thêm cửa hàng vào danh sách yêu thích!" : "Đã bỏ yêu thích cửa hàng.");

        } catch (err) {
            toast.error(err.message);
            // Hoàn tác lại nếu có lỗi
            setStoreData(prev => ({ ...prev, isFavorited: !prev.isFavorited }));
        }
    }, [isAuthenticated, navigate, storeId]);


    if (loading) return <div>Đang tải trang cửa hàng...</div>;
    if (error) return <div>Lỗi: {error}</div>;
    if (!storeData) return <div>Không có dữ liệu cửa hàng.</div>;

    const isMyStore = currentUser?.accountId === storeData.accountId;

    return (
        <div className="store-page-container">
            <header className="store-header">
                <div className="store-avatar">
                    <img src={storeData.avatarUrl || '/src/icons/black-user-icon.png'} alt={storeData.storeName} />
                </div>
                <div className="store-info">
                    <h1>{storeData.storeName}</h1>
                    <p>{storeData.address || "Chưa có địa chỉ"}</p>
                </div>
                {!isMyStore && (
                    <button onClick={handleFavoriteStore} className="favorite-store-btn">
                        {storeData.isFavorited ? <FaHeart color="red" /> : <FaRegHeart />}
                        {storeData.isFavorited ? ' Đã yêu thích' : ' Yêu thích'}
                    </button>
                )}
            </header>

            <main className="store-products">
                <h2>Sản phẩm của cửa hàng</h2>
                <div className="product-grid">
                    {storeData.products && storeData.products.length > 0 ? (
                        storeData.products.map(product => (
                            <Link to={`/products/${product.productId}`} key={product.productId} className="product-card-link">
                                <div className="product-card">
                                    <img src={product.imageUrls[0] || '/images/product.png'} alt={product.name} />
                                    <div className="product-card-info">
                                        <h4>{product.name}</h4>
                                        <p>{product.price.toLocaleString('vi-VN')}₫</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p>Cửa hàng này chưa có sản phẩm nào được duyệt.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default StorePage;
