import React, { createContext, useState, useContext } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('rubiesthrift-cart');
    return saved ? JSON.parse(saved) : [];
  });

  const { isThriftUser, contributions, hasSufficientFunds, consumeFunds } = useAuth();

  const [notification, setNotification] = useState(null);

  const addToCart = (product) => {
    // Enforce permission: must be a thrift user and have sufficient contributions
    if (!isThriftUser) {
      showNotification('Please create a Solo or Group Thrift account to add items to cart');
      return;
    }

    if (!hasSufficientFunds(product.price)) {
      const needed = (Number(product.price) || 0) - (contributions || 0);
      showNotification(`Insufficient funds. Top up ₦${needed.toLocaleString()} to add this item`);
      return;
    }

    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      let newCart;
      if (existing) {
        newCart = prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...prevCart, { ...product, quantity: 1 }];
      }
      localStorage.setItem('rubiesthrift-cart', JSON.stringify(newCart));
      showNotification(`✓ ${product.name} added to cart`);
      return newCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const newCart = prevCart.filter(item => item.id !== productId);
      localStorage.setItem('rubiesthrift-cart', JSON.stringify(newCart));
      showNotification('✗ Item removed from cart');
      return newCart;
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart => {
        const newCart = prevCart.map(item =>
          item.id === productId ? { ...item, quantity } : item
        );
        localStorage.setItem('rubiesthrift-cart', JSON.stringify(newCart));
        return newCart;
      });
    }
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('rubiesthrift-cart');
  };

  const checkout = () => {
    if (!isThriftUser) {
      showNotification('Only thrift members can checkout.');
      return false;
    }
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (!hasSufficientFunds(total)) {
      showNotification('Insufficient wallet balance for checkout. Top up and try again.');
      return false;
    }
    const remaining = consumeFunds(total);
    clearCart();
    showNotification(`Purchase successful. Remaining balance: ₦${(remaining || 0).toLocaleString()}`);
    return true;
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 2500);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    checkout,
    notification,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
