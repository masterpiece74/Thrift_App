import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaSearch } from "react-icons/fa";
import QuickViewModal from "./QuickViewModal";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useReviews } from "../context/ReviewContext";

export default function ProductCard({
  p,
  addToCart,
  isThriftUser,
  hasSufficientFunds,
}) {
  const [open, setOpen] = useState(false);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { getAverage, getReviews } = useReviews();
  const avg = getAverage(p.id);
  const reviewsCount = getReviews(p.id).length;

  const badge =
    p.price > 1000000
      ? "Premium"
      : p.price < 50000
      ? "Budget"
      : p.id % 10 === 0
      ? "Sale"
      : null;

  return (
    <>
      <div className="bg-white text-gray-900 rounded shadow p-4 border border-gray-200 hover:shadow-lg hover:border-teal-300 transition relative">
        <div className="absolute right-3 top-3 flex items-center gap-2">
          {badge && (
            <div className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs">
              {badge}
            </div>
          )}
          <button onClick={() => toggleWishlist(p)} className="text-pink-500">
            {isInWishlist(p.id) ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>

        <Link to={`/marketplace/${p.id}`} className="block">
          {typeof p.image === "string" &&
          (p.image.startsWith("/") || p.image.startsWith("http")) ? (
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-40 object-cover rounded"
            />
          ) : (
            <div className="text-8xl text-center">{p.image}</div>
          )}
        </Link>
        <h3 className="font-bold mt-2">{p.name}</h3>
        <div className="text-sm text-gray-600">{p.category}</div>
        <div className="mt-2 font-bold text-teal-600">
          ₦{p.price.toLocaleString()}
        </div>
        <div className="text-xs text-gray-500">
          {avg} ★ ({reviewsCount})
        </div>

        <div className="mt-3 flex gap-2">
          <button
            onClick={() => setOpen(true)}
            className="flex-1 px-3 py-2 border rounded hover:bg-gray-50"
          >
            <FaSearch className="inline mr-2" /> Quick view
          </button>

          {!isThriftUser ? (
            <button
              disabled
              className="px-3 py-2 bg-gray-300 rounded text-white"
            >
              Sign up
            </button>
          ) : hasSufficientFunds(p.price) ? (
            <button
              onClick={() => addToCart(p)}
              className="px-3 py-2 bg-teal-600 text-white rounded"
            >
              Add
            </button>
          ) : (
            <button
              onClick={() => alert("Top up to add this item")}
              className="px-3 py-2 bg-amber-500 text-teal-900 rounded"
            >
              Top up
            </button>
          )}
        </div>
      </div>

      <QuickViewModal
        open={open}
        onClose={() => setOpen(false)}
        product={p}
        addToCart={addToCart}
        isThriftUser={isThriftUser}
        hasSufficientFunds={hasSufficientFunds}
      />
    </>
  );
}
