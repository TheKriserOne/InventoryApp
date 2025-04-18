// src/contexts/CartContext.jsx
import React, { createContext, useState, useEffect } from "react";

// Create the context
export const CartContext = createContext();

// Create the provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Initialize cart from localStorage if available
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (itemId) => {
    if (!cart.includes(itemId)) {
      setCart([...cart, itemId]);
    } else {
      alert("Item already in cart!");
    }
  };

  // Function to remove an item from the cart (optional)
  const handleRemoveFromCart = (itemId) => {
    setCart(cart.filter((id) => id !== itemId));
  };

  return (
    <CartContext.Provider
      value={{ cart, handleAddToCart, handleRemoveFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
