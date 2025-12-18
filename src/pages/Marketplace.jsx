import React, { useState } from "react";
import {
  FaShoppingCart,
  FaTimesCircle,
  FaSearch,
  FaFilter,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import MarketplaceBanner from "../components/MarketplaceBanner";
import ProductCard from "../components/ProductCard";
import PRODUCTS from "../data/products";

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [sortOption, setSortOption] = useState("none");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { cart, addToCart, removeFromCart, updateQuantity, checkout } =
    useCart();
  const { isThriftUser, contributions, recordPayment, hasSufficientFunds } =
    useAuth();

  const categories = [
    "All",
    ...Array.from(new Set(PRODUCTS.map((p) => p.category))),
  ];
  const filteredProducts = PRODUCTS.filter((p) => {
    const catMatch =
      selectedCategory === "All" || p.category === selectedCategory;
    const searchMatch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return catMatch && searchMatch;
  });

  // Apply price filters
  const priceFiltered = filteredProducts.filter((p) => {
    const minMatch = !minPrice || p.price >= Number(minPrice);
    const maxMatch = !maxPrice || p.price <= Number(maxPrice);
    return minMatch && maxMatch;
  });

  // Apply sorting
  const sortedProducts = [...priceFiltered].sort((a, b) => {
    if (sortOption === "price-asc") return a.price - b.price;
    if (sortOption === "price-desc") return b.price - a.price;
    if (sortOption === "name-asc") return a.name.localeCompare(b.name);
    if (sortOption === "name-desc") return b.name.localeCompare(a.name);
    return 0;
  });

  const cartTotal = (cart || []).reduce(
    (s, it) => s + it.price * it.quantity,
    0
  );

  const handlePaystackCheckout = () => {
    if (cartTotal === 0) {
      alert("Cart is empty");
      return;
    }

    // Get user email from localStorage or use default
    const userEmail =
      localStorage.getItem("userEmail") || "customer@example.com";
    const paystackKey = "pk_test_your_paystack_key"; // Replace with your actual Paystack public key

    // Check if Paystack is loaded
    if (!window.PaystackPop) {
      alert("Payment gateway is loading. Please try again in a moment.");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: paystackKey,
      email: userEmail,
      amount: cartTotal * 100, // Paystack amount in kobo
      ref: "" + Math.floor(Math.random() * 1000000000) + 1,
      onClose: function () {
        alert("Payment window closed.");
      },
      onSuccess: function (response) {
        alert("Payment successful! Reference: " + response.reference);
        // Clear cart after successful payment
        checkout();
        // Here you can add logic to save the order, send email confirmation, etc.
      },
    });

    handler.openIframe();
  };

  function TopUpForm({ onTopUp }) {
    const [amt, setAmt] = useState("");
    return (
      <div className="flex gap-2">
        <input
          value={amt}
          onChange={(e) => setAmt(e.target.value)}
          className="w-full rounded px-2 py-1 border"
          placeholder="Amount"
        />
        <button
          onClick={() => {
            const n = Number(amt);
            if (!n || n <= 0) return alert("Enter a valid amount");
            onTopUp(n);
            setAmt("");
          }}
          className="px-3 py-1 bg-indigo-600 text-white rounded"
        >
          Add
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-teal-50">
      <div className="bg-linear-to-r from-teal-700 to-emerald-700 text-white py-8 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-amber-300">
            RubiesThrift Marketplace
          </h1>
          <div className="mt-4 max-w-md">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-teal-200" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded w-full text-gray-900"
                placeholder="Search products..."
              />
            </div>
          </div>
        </div>
      </div>

      <MarketplaceBanner />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          <div className="w-1/4">
            <div className="bg-white text-gray-900 p-4 rounded shadow border-t-4 border-teal-600">
              <h3 className="font-bold mb-2 text-teal-900">Categories</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={
                      selectedCategory === cat
                        ? "block w-full text-left px-3 py-2 bg-teal-600 text-white rounded"
                        : "block w-full text-left px-3 py-2 rounded"
                    }
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white text-gray-900 p-4 rounded shadow border-t-4 border-emerald-600 mt-4">
              <h3 className="font-bold mb-2 text-teal-900">Price Range</h3>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-1/2 px-2 py-1 border rounded"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-1/2 px-2 py-1 border rounded"
                />
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => {
                    setMinPrice(0);
                    setMaxPrice(0);
                  }}
                  className="px-3 py-1 bg-gray-100 rounded"
                >
                  Clear Price
                </button>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                    setMinPrice(0);
                    setMaxPrice(0);
                    setSortOption("none");
                  }}
                  className="px-3 py-1 bg-teal-600 text-white rounded ml-auto"
                >
                  Reset Filters
                </button>
              </div>
            </div>

            <div className="bg-white text-gray-900 p-4 rounded shadow border-t-4 border-emerald-600 mt-4">
              <h3 className="font-bold mb-2 text-teal-900">Sort</h3>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full px-2 py-1 border rounded"
              >
                <option value="none">Default</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="name-asc">Name: A → Z</option>
                <option value="name-desc">Name: Z → A</option>
              </select>
            </div>

            <div className="bg-white text-gray-900 p-4 rounded shadow border-t-4 border-emerald-600 mt-4">
              <h3 className="font-bold text-teal-900">Cart</h3>
              <div className="mt-2 text-sm text-teal-700">
                Wallet: ₦{(contributions || 0).toLocaleString()}
              </div>
              <div className="mt-2">
                <TopUpForm
                  onTopUp={(amt) => {
                    const next = recordPayment(amt);
                    alert(
                      `Wallet topped up. New balance: ₦${next.toLocaleString()}`
                    );
                  }}
                />
              </div>
              <div className="mt-3">
                {(cart || []).length === 0 ? (
                  <p className="text-gray-500">Cart is empty</p>
                ) : (
                  <>
                    {(cart || []).map((it) => (
                      <div
                        key={it.id}
                        className="flex items-center justify-between py-2"
                      >
                        <div>
                          <div className="font-semibold">{it.name}</div>
                          <div className="text-xs text-gray-600">
                            ₦{it.price.toLocaleString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(it.id, it.quantity - 1)
                            }
                            className="px-2"
                          >
                            −
                          </button>
                          <div>{it.quantity}</div>
                          <button
                            onClick={() =>
                              updateQuantity(it.id, it.quantity + 1)
                            }
                            className="px-2"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(it.id)}
                            className="text-red-500"
                          >
                            x
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="mt-2 flex justify-between items-center">
                      <div className="font-bold">Total</div>
                      <div className="font-bold text-teal-700">
                        ₦{cartTotal.toLocaleString()}
                      </div>
                    </div>
                    <button
                      onClick={handlePaystackCheckout}
                      className="mt-3 w-full bg-linear-to-r from-teal-600 to-emerald-600 text-white py-2 rounded hover:from-teal-700 hover:to-emerald-700 font-semibold"
                    >
                      Checkout with Paystack
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  p={p}
                  addToCart={addToCart}
                  isThriftUser={isThriftUser}
                  hasSufficientFunds={hasSufficientFunds}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-linear-to-r from-teal-900 to-emerald-900 text-white py-12 shadow-lg">
        <div className="max-w-7xl mx-auto text-center text-amber-300 font-semibold">
          RubiesThrift Marketplace
        </div>
      </div>
    </div>
  );
}
