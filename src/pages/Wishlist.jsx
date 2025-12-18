import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!wishlist || wishlist.length === 0)
    return <div className="p-6">Your wishlist is empty.</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded shadow">
            <div className="text-6xl text-center">{p.image}</div>
            <h3 className="font-bold mt-2">{p.name}</h3>
            <div className="text-sm text-gray-600">
              ₦{p.price.toLocaleString()}
            </div>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => addToCart(p)}
                className="px-3 py-2 bg-teal-600 text-white rounded"
              >
                Add to cart
              </button>
              <button
                onClick={() => removeFromWishlist(p.id)}
                className="px-3 py-2 border rounded"
              >
                Remove
              </button>
              <Link
                to={`/marketplace/${p.id}`}
                className="px-3 py-2 border rounded"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
