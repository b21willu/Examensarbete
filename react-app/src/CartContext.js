import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, sku) => {
    setCart([...cart, { ...product, sku: sku }]);
  };

  const removeFromCart = (skuToRemove) => {
    setCart(cart.filter(product => product.sku !== skuToRemove));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;