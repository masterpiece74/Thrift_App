import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
// ensure linter recognizes motion usage in JSX
void motion;
import { FaShoppingCart, FaTimesCircle } from 'react-icons/fa';

const PRODUCTS = [
  { id: 1, name: 'iPhone 15 Pro', price: 650000, category: 'Phones', image: 'iphone15.jpg' },
  { id: 2, name: 'Samsung Galaxy S24', price: 580000, category: 'Phones', image: 'https://images.unsplash.com/photo-1511298828896-baf561c51406?q=80&w=400&auto=format&fit=crop' },
  { id: 3, name: 'MacBook Pro M3', price: 2800000, category: 'Laptops', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=400&auto=format&fit=crop' },
  { id: 4, name: 'iPad Air', price: 450000, category: 'Tablets', image: 'https://images.unsplash.com/photo-1559163616-cd4628902d4a?q=80&w=400&auto=format&fit=crop' },
  { id: 5, name: 'AirPods Pro Max', price: 380000, category: 'Audio', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop' },
  { id: 6, name: 'Sony WH-1000XM5', price: 120000, category: 'Audio', image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=400&auto=format&fit=crop' },
  { id: 7, name: 'Samsung TV 55"', price: 380000, category: 'TV', image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=400&auto=format&fit=crop' },
  { id: 8, name: 'DJI Drone Pro', price: 550000, category: 'Gadgets', image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?q=80&w=400&auto=format&fit=crop' },
];

export default function NavMarketplace() {
  const [showMarket, setShowMarket] = useState(false);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(PRODUCTS.map(p => p.category))];
  const filteredProducts = selectedCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    if (cartTotal === 0) return;

    // Initialize Paystack payment
    const email = localStorage.getItem('userEmail') || 'customer@example.com';
    const paystackKey = 'pk_test_your_paystack_key'; // Replace with your actual Paystack public key

    const handler = window.PaystackPop.setup({
      key: paystackKey,
      email: email,
      amount: cartTotal * 100, // Paystack amount in kobo
      ref: '' + Math.floor(Math.random() * 1000000000) + 1,
      onClose: function () {
        alert('Payment window closed.');
      },
      onSuccess: function (response) {
        alert('Payment successful! Reference: ' + response.reference);
        // Clear cart after successful payment
        setCart([]);
        setShowMarket(false);
        // Here you can add logic to save the order, send email confirmation, etc.
      },
    });

    handler.openIframe();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMarket(!showMarket)}
        className="text-slate-600 hover:text-slate-800 flex items-center gap-2 relative"
      >
        <FaShoppingCart size={18} />
        Marketplace
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {cart.length}
          </span>
        )}
      </button>

      <AnimatePresence>
        {showMarket && (
          <motion.div
            className="absolute top-full right-0 mt-4 w-96 bg-white shadow-2xl rounded-lg z-50 max-h-96 overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="bg-slate-700 text-white p-4 flex justify-between items-center">
              <h3 className="font-bold text-lg">Marketplace</h3>
              <button onClick={() => setShowMarket(false)} className="text-xl">✕</button>
            </div>

            {/* Categories */}
            <div className="flex gap-2 px-4 py-3 bg-gray-50 border-b overflow-x-auto">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                    selectedCategory === cat
                      ? 'bg-slate-700 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Products List */}
            <div className="overflow-y-auto flex-1 px-4 py-3 space-y-2">
              {filteredProducts.map(product => (
                <div key={product.id} className="flex items-center justify-between p-2 border rounded-md hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      {product.image ? (
                        <img
                          src={product.image.startsWith('http') || product.image.startsWith('//') ? product.image : `/${product.image}`}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded"
                          onError={(e) => {
                            // fallback to a placeholder if local image is missing
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=400&auto=format&fit=crop';
                          }}
                        />
                      ) : (
                        <span className="text-lg">{product.emoji}</span>
                      )}
                      {product.name}
                    </div>
                    <div className="text-xs text-gray-600">₦{product.price.toLocaleString()}</div>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="px-2 py-1 text-xs bg-slate-700 text-white rounded hover:bg-slate-800 transition"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            {cart.length > 0 && (
              <div className="border-t p-4 space-y-3">
                <div className="max-h-32 overflow-y-auto space-y-1">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between text-xs bg-gray-50 p-2 rounded">
                      <div>
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-gray-600">x{item.quantity} = ₦{(item.price * item.quantity).toLocaleString()}</div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTimesCircle size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-2 flex justify-between items-center font-bold">
                  <span>Total:</span>
                  <span className="text-slate-700 text-lg">₦{cartTotal.toLocaleString()}</span>
                </div>
                <button className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition" onClick={handleCheckout}>
                  Checkout with Paystack
                </button>
              </div>
            )}

            {cart.length === 0 && (
              <div className="flex-1 flex items-center justify-center text-gray-500 text-sm p-4">
                Cart is empty
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
