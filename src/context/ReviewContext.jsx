import React, { createContext, useContext, useState } from "react";

const ReviewContext = createContext();

export function ReviewProvider({ children }) {
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem("rubiesthrift-reviews");
    return saved ? JSON.parse(saved) : {};
  });

  const persist = (next) => {
    setReviews(next);
    localStorage.setItem("rubiesthrift-reviews", JSON.stringify(next));
  };

  const addReview = (productId, review) => {
    const id = Date.now();
    const next = { ...reviews };
    next[productId] = next[productId] || [];
    next[productId].push({ id, ...review });
    persist(next);
  };

  const getReviews = (productId) => reviews[productId] || [];

  const getAverage = (productId) => {
    const list = getReviews(productId);
    if (!list.length) return 0;
    const sum = list.reduce((s, r) => s + (Number(r.rating) || 0), 0);
    return Math.round((sum / list.length) * 10) / 10;
  };

  const value = { reviews, addReview, getReviews, getAverage };
  return (
    <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>
  );
}

export function useReviews() {
  const ctx = useContext(ReviewContext);
  if (!ctx) throw new Error("useReviews must be used within ReviewProvider");
  return ctx;
}
