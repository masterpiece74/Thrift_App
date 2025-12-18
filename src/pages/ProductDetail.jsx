import React from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useReviews } from "../context/ReviewContext";
import PRODUCTS from "../data/products";

export default function ProductDetail() {
  const { id } = useParams();
  const pid = Number(id);
  const product = PRODUCTS.find((p) => p.id === pid);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { getReviews, addReview, getAverage } = useReviews();
  const existing = getReviews(pid);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name =
      form.name?.value || localStorage.getItem("userEmail") || "Anonymous";
    const rating = Number(form.rating.value) || 5;
    const text = form.text.value || "";
    addReview(pid, { name, rating, text, createdAt: Date.now() });
    form.reset();
  };

  if (!product) return <div className="p-6">Product not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex gap-8">
        <div className="flex items-center justify-center">
          {typeof product.image === "string" && (product.image.startsWith("/") || product.image.startsWith("http")) ? (
            <img src={product.image} alt={product.name} className="max-h-96 object-contain" />
          ) : (
            <div className="text-9xl">{product.image}</div>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="text-sm text-gray-600 mb-2">{product.category}</div>
          <div className="text-2xl font-semibold text-teal-600 mb-4">
            ₦{product.price.toLocaleString()}
          </div>
          <p className="mb-4">
            Detailed description goes here. Replace with real product
            information when available.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => addToCart(product)}
              className="px-4 py-2 bg-teal-600 text-white rounded"
            >
              Add to cart
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className="px-4 py-2 border rounded"
            >
              {isInWishlist(product.id)
                ? "Remove from wishlist"
                : "Add to wishlist"}
            </button>
            <Link to="/marketplace" className="px-4 py-2 border rounded">
              Back
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="font-bold mb-2">Reviews</h2>
          {existing.length === 0 ? (
            <div className="text-gray-500">No reviews yet — be the first.</div>
          ) : (
            existing
              .slice()
              .reverse()
              .map((r) => (
                <div key={r.id} className="mb-3 border-b pb-2">
                  <div className="text-sm font-semibold">
                    {r.name} — {r.rating} / 5
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(r.createdAt).toLocaleString()}
                  </div>
                  <div className="mt-1 text-gray-700">{r.text}</div>
                </div>
              ))
          )}
        </div>

        <div>
          <h2 className="font-bold mb-2">Write a review</h2>
          <form onSubmit={handleSubmit} className="space-y-2">
            <input
              name="name"
              placeholder="Your name"
              className="w-full px-2 py-1 border rounded"
            />
            <select
              name="rating"
              defaultValue="5"
              className="w-full px-2 py-1 border rounded"
            >
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Good</option>
              <option value="3">3 - Okay</option>
              <option value="2">2 - Poor</option>
              <option value="1">1 - Awful</option>
            </select>
            <textarea
              name="text"
              rows={4}
              placeholder="Write your review"
              className="w-full px-2 py-1 border rounded"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-teal-600 text-white rounded"
              >
                Submit review
              </button>
              <button type="reset" className="px-4 py-2 border rounded">
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
