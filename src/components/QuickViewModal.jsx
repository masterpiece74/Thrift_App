import React from "react";
import { FaTimes } from "react-icons/fa";

export default function QuickViewModal({
  open,
  onClose,
  product,
  addToCart,
  isThriftUser,
  hasSufficientFunds,
}) {
  if (!open || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded shadow-lg z-60 max-w-2xl w-full mx-4 p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-600"
        >
          <FaTimes />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center justify-center">
            {typeof product.image === "string" && (product.image.startsWith("/") || product.image.startsWith("http")) ? (
              <img src={product.image} alt={product.name} className="max-h-80 object-contain" />
            ) : (
              <div className="text-9xl">{product.image}</div>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <div className="text-sm text-gray-600 mb-2">{product.category}</div>
            <div className="text-2xl font-semibold text-teal-600 mb-4">
              ₦{product.price.toLocaleString()}
            </div>
            <p className="text-gray-700 mb-4">
              A concise description of the product goes here. Replace with real
              data when available.
            </p>

            <div className="flex gap-2">
              {!isThriftUser ? (
                <button disabled className="px-4 py-2 bg-gray-300 rounded">
                  Sign up to add
                </button>
              ) : hasSufficientFunds(product.price) ? (
                <button
                  onClick={() => {
                    addToCart(product);
                    onClose();
                  }}
                  className="px-4 py-2 bg-teal-600 text-white rounded"
                >
                  Add to cart
                </button>
              ) : (
                <button
                  onClick={() => alert("Top up to add this item")}
                  className="px-4 py-2 bg-amber-500 text-teal-900 rounded"
                >
                  Top up
                </button>
              )}
              <button onClick={onClose} className="px-4 py-2 border rounded">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
