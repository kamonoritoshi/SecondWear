// src/pages/seller/ProductForm.jsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/ProductForm.css";
import { API_BASE_URL } from "../../apiConfig";

export default function ProductForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    const [product, setProduct] = useState({
        name: "", description: "", condition: "Mới", size: "", color: "",
        price: "", status: "Đang bán", quantity: "", categoryId: "",
        brand: "", origin: "",
    });

    // State quản lý ảnh
    const [imageFiles, setImageFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const [imagesToDelete, setImagesToDelete] = useState([]);

    // Load danh mục và sản phẩm (nếu edit)
    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/categories`)
            .then(res => setCategories(res.data))
            .catch(err => console.error("Không thể tải danh mục:", err));

        if (isEditing) {
            setLoading(true);
            const token = localStorage.getItem("jwtToken");
            axios.get(`${API_BASE_URL}/api/seller/products/${id}`, { headers: { Authorization: `Bearer ${token}` } })
                .then((res) => {
                    const data = res.data;
                    setProduct({
                        name: data.name || "", description: data.description || "",
                        condition: data.condition || "Mới", size: data.size || "",
                        color: data.color || "", price: data.price || "",
                        status: data.status || "Đang bán", quantity: data.quantity || "",
                        categoryId: data.category?.categoryId || "", brand: data.brand || "",
                        origin: data.origin || "",
                    });
                    setExistingImages(data.images || []);
                })
                .catch((err) => {
                    console.error("❌ Không thể tải sản phẩm:", err);
                    navigate("/seller/products");
                })
                .finally(() => setLoading(false));
        }
    }, [id, isEditing, navigate]);

    // Các hàm xử lý ảnh
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles(prev => [...prev, ...files]);
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(prev => [...prev, ...newPreviews]);
        e.target.value = null; // Reset input để có thể chọn lại file giống nhau
    };

    const removeNewImage = (index) => {
        setImageFiles(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const markImageForDeletion = (imageId) => {
        setImagesToDelete(prev => [...prev, imageId]);
        setExistingImages(prev => prev.filter(img => img.imageId !== imageId));
    };

    // Hàm submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if ((existingImages.length + imageFiles.length) === 0) {
            alert("Vui lòng thêm ít nhất một hình ảnh cho sản phẩm.");
            return;
        }

        const token = localStorage.getItem("jwtToken");
        const formData = new FormData();
        
        formData.append("product", new Blob([JSON.stringify(product)], { type: "application/json" }));
        imageFiles.forEach(file => formData.append("images", file));
        if (isEditing) {
            imagesToDelete.forEach(id => formData.append("deleteImageIds", id));
        }

        try {
            setLoading(true);
            const config = { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } };
            
            isEditing
                ? await axios.put(`${API_BASE_URL}/api/seller/products/${id}`, formData, config)
                : await axios.post(`${API_BASE_URL}/api/seller/products`, formData, config);
            
            alert(`Sản phẩm đã được ${isEditing ? "cập nhật" : "thêm mới"} thành công!`);
            navigate("/seller/products");
        } catch (err) {
            console.error("❌ Thao tác thất bại:", err);
            alert(`Thất bại: ${err.response?.data?.message || err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    return (
        <div className="product-form-container">
            <h1>{isEditing ? "Chỉnh sửa Sản phẩm" : "Thêm mới Sản phẩm"}</h1>
            <form className="product-form" onSubmit={handleSubmit}>
                
                <div className="form-section">
                    <h2>Hình ảnh sản phẩm</h2>
                    <div className="image-preview-grid">
                        {existingImages.map((image) => (
                            <div key={image.imageId} className="image-preview-item">
                                <img src={image.imageUrl} alt="Ảnh sản phẩm" />
                                <button type="button" className="remove-btn" onClick={() => markImageForDeletion(image.imageId)}>×</button>
                            </div>
                        ))}
                        {imagePreviews.map((preview, index) => (
                            <div key={index} className="image-preview-item">
                                <img src={preview} alt="Ảnh xem trước" />
                                <button type="button" className="remove-btn" onClick={() => removeNewImage(index)}>×</button>
                            </div>
                        ))}
                        <label htmlFor="image-upload" className="image-upload-placeholder">
                            <div>
                                <span>+</span>
                                <p>Thêm ảnh</p>
                            </div>
                        </label>
                        <input id="image-upload" type="file" multiple accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
                    </div>
                </div>

                <div className="form-section">
                    <h2>Thông tin cơ bản</h2>
                    <div className="form-grid">
                        <div className="full-width">
                            <label>Tên sản phẩm</label>
                            <input type="text" name="name" value={product.name} onChange={handleChange} required placeholder="Ví dụ: Áo thun cotton cao cấp" />
                        </div>
                        <div>
                            <label>Giá (VND)</label>
                            <input type="number" name="price" value={product.price} onChange={handleChange} required placeholder="Ví dụ: 250000" />
                        </div>
                        <div>
                            <label>Số lượng</label>
                            <input type="number" name="quantity" value={product.quantity} onChange={handleChange} required placeholder="Ví dụ: 10" />
                        </div>
                        <div className="full-width">
                            <label>Mô tả</label>
                            <textarea name="description" value={product.description} onChange={handleChange} placeholder="Mô tả chi tiết về sản phẩm..." />
                        </div>
                    </div>
                </div>
                
                <div className="form-section">
                    <h2>Phân loại & Thuộc tính</h2>
                    <div className="form-grid">
                        <div>
                            <label>Danh mục</label>
                            <select name="categoryId" value={product.categoryId} onChange={handleChange} required>
                                <option value="">-- Chọn danh mục --</option>
                                {categories.map(cat => <option key={cat.categoryId} value={cat.categoryId}>{cat.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label>Thương hiệu</label>
                            <input type="text" name="brand" value={product.brand} onChange={handleChange} placeholder="Ví dụ: Zara, H&M..." />
                        </div>
                        <div>
                            <label>Tình trạng sản phẩm</label>
                            <select name="condition" value={product.condition} onChange={handleChange}>
                                <option value="Mới">Mới</option>
                                <option value="Đã qua sử dụng">Đã qua sử dụng</option>
                            </select>
                        </div>
                         <div>
                            <label>Tình trạng bán</label>
                            <select name="status" value={product.status} onChange={handleChange}>
                                <option value="Đang bán">Đang bán</option>
                                <option value="Ngừng bán">Ngừng bán</option>
                            </select>
                        </div>
                        <div>
                            <label>Kích cỡ</label>
                            <input type="text" name="size" value={product.size} onChange={handleChange} placeholder="Ví dụ: M, L, XL, 42..." />
                        </div>
                        <div>
                            <label>Màu sắc</label>
                            <input type="text" name="color" value={product.color} onChange={handleChange} placeholder="Ví dụ: Đen, Trắng, Xanh navy..." />
                        </div>
                         <div>
                            <label>Xuất xứ</label>
                            <input type="text" name="origin" value={product.origin} onChange={handleChange} placeholder="Ví dụ: Việt Nam, Trung Quốc..." />
                        </div>
                    </div>
                </div>
                
                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? "Đang xử lý..." : isEditing ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
                </button>
            </form>
        </div>
    );
}