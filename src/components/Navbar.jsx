import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { FaShoppingCart, FaGem } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import CartNotification from "./CartNotification";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false); // mobile menu
  const [productsOpen, setProductsOpen] = useState(false); // desktop Products dropdown
  const { cart, notification } = useCart();
  const { isThriftUser } = useAuth();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <CartNotification message={notification} />
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-85 transition group"
        >
          <div className="bg-linear-to-br from-teal-600 to-blue-700 p-2.5 rounded-lg shadow-lg group-hover:shadow-xl group-hover:scale-105 transition">
            <FaGem className="text-white text-2xl" />
          </div>
          <div className="flex flex-col">
            <div className="text-xl font-black bg-linear-to-r from-teal-700 to-blue-700 bg-clip-text text-transparent">
              RubiesThrift
            </div>
            <div className="text-xs font-semibold text-slate-500 tracking-wider uppercase -mt-1">
              Save. Share. Thrive
            </div>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Products Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button className="text-slate-700 hover:text-indigo-600 flex items-center gap-1">
              Products
            </button>
            <AnimatePresence>
              {productsOpen && (
                <motion.div
                  className="absolute top-full left-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                >
                  <Link
                    to="/solo-thrift"
                    className="block px-4 py-2 text-slate-700 hover:bg-gray-100"
                  >
                    Solo Thrift
                  </Link>
                  <Link
                    to="/group-thrift"
                    className="block px-4 py-2 text-slate-700 hover:bg-gray-100"
                  >
                    Group Thrift
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Marketplace */}
          {isThriftUser && (
            <Link
              to="/marketplace"
              className="text-slate-700 hover:text-indigo-600"
            >
              Marketplace
            </Link>
          )}

          {/* Payments */}
          {isThriftUser && (
            <Link
              to="/payments"
              className="text-slate-700 hover:text-indigo-600"
            >
              Payments
            </Link>
          )}

          <Link to="/faq" className="text-slate-700 hover:text-indigo-600">
            FAQs
          </Link>
          <Link to="/blog" className="text-slate-700 hover:text-indigo-600">
            Blog
          </Link>

          <Link
            to="/signup"
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
          >
            Get Started
          </Link>

          {/* Cart Icon */}
          {isThriftUser && (
            <Link
              to="/marketplace"
              className="relative text-slate-700 hover:text-indigo-600 flex items-center gap-2"
            >
              <FaShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cart.length}
                </span>
              )}
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-6 pb-4">
          <div className="space-y-2">
            {/* Products toggle */}
            <button
              className="w-full text-left flex justify-between items-center text-slate-700 hover:text-indigo-600"
              onClick={() => setProductsOpen(!productsOpen)}
            >
              Products
            </button>

            {productsOpen && (
              <div className="pl-4 mt-1 space-y-1">
                <Link
                  to="/solo-thrift"
                  className="block px-2 py-1 text-slate-700 hover:bg-gray-100 rounded"
                  onClick={() => setMenuOpen(false)}
                >
                  Solo Thrift
                </Link>
                <Link
                  to="/group-thrift"
                  className="block px-2 py-1 text-slate-700 hover:bg-gray-100 rounded"
                  onClick={() => setMenuOpen(false)}
                >
                  Group Thrift
                </Link>
              </div>
            )}

            {/* Marketplace link in mobile menu */}
            {isThriftUser && (
              <Link
                to="/marketplace"
                className="block text-slate-700 hover:text-indigo-600"
                onClick={() => setMenuOpen(false)}
              >
                Marketplace
              </Link>
            )}

            {/* Payments link in mobile menu */}
            {isThriftUser && (
              <Link
                to="/payments"
                className="block text-slate-700 hover:text-indigo-600"
                onClick={() => setMenuOpen(false)}
              >
                Payments
              </Link>
            )}

            <Link
              to="/faq"
              className="block text-slate-700 hover:text-indigo-600"
              onClick={() => setMenuOpen(false)}
            >
              FAQs
            </Link>
            <Link
              to="/blog"
              className="block text-slate-700 hover:text-indigo-600"
              onClick={() => setMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/signup"
              className="block px-4 py-2 bg-indigo-700 text-white rounded-md hover:bg-indigo-800 mt-2"
              onClick={() => setMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
