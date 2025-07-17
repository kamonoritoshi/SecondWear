// src/hooks/useAddToCart.js
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const useAddToCart = (setCartCount) => {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();

  return useCallback(
    (product, quantity = 1, color, size) => {
      if (!isAuthenticated) {
        alert("Vui lòng đăng nhập để thêm vào giỏ.");
        navigate("/login");
        return;
      }

      if (!product || !color || !size) {
        alert("Thiếu thông tin sản phẩm!");
        return;
      }

      try {
        const userEmail = currentUser?.email;
        const cartKey = `cart_${userEmail}`;
        let cart = [];
        const cartStr = localStorage.getItem(cartKey);
        if (cartStr) {
          try {
            cart = JSON.parse(cartStr);
          } catch (e) {
            console.error("Lỗi khi phân tích giỏ hàng:", e);
            cart = [];
          }
        }

        const existingIndex = cart.findIndex(
          (item) =>
            item.productId === product.productId &&
            item.color === color &&
            item.size === size
        );

        if (existingIndex !== -1) {
          cart[existingIndex].quantity += quantity;
        } else {
          cart.push({
            productId: product.productId,
            name: product.name,
            image: product.images?.[0]?.imageUrl || "",
            price: product.price,
            color,
            size,
            quantity,
            maxQuantity: product.quantity,
            shopName: product.account?.user?.name || "Shop ẩn danh",
          });
        }

        localStorage.setItem(cartKey, JSON.stringify(cart));
        if (typeof setCartCount === "function") {
          setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
        }

        alert("Đã thêm vào giỏ hàng!");
      } catch (e) {
        console.error("Lỗi khi thêm vào giỏ hàng:", e);
        alert("Lỗi khi thêm vào giỏ hàng.");
      }
    },
    [isAuthenticated, currentUser, navigate, setCartCount]
  );
};

export default useAddToCart;
