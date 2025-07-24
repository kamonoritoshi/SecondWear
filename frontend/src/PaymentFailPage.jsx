import React from "react";
import { useSearchParams, Link } from "react-router-dom";

export default function PaymentFailPage() {
  const [searchParams] = useSearchParams();
  const error = searchParams.get("error") || "Thanh toán thất bại!";
  const orderId = searchParams.get("orderId") || "Không rõ";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 px-4">
      <div className="bg-white p-6 rounded-xl shadow-md max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Thanh toán thất bại</h2>
        <p className="text-gray-700 mb-2">Mã đơn hàng: <strong>{orderId}</strong></p>
        <p className="text-sm text-gray-500 mb-4">Lý do: {decodeURIComponent(error)}</p>
        <Link
          to="/checkout"
          className="inline-block px-6 py-2 bg-red-600 text-black rounded hover:bg-red-700 transition"
        >
          Thử lại thanh toán
        </Link>
      </div>
    </div>
  );
}
