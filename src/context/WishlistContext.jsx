import React, { createContext, useState, useContext } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("rubiesthrift-wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev;
      const next = [...prev, product];
      localStorage.setItem("rubiesthrift-wishlist", JSON.stringify(next));
      return next;
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => {
      const next = prev.filter((p) => p.id !== id);
      localStorage.setItem("rubiesthrift-wishlist", JSON.stringify(next));
      return next;
    });
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.find((p) => p.id === product.id);
    if (exists) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  const isInWishlist = (id) => wishlist.some((p) => p.id === id);

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem("rubiesthrift-wishlist");
  };

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
