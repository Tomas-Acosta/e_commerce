import React, { createContext, useState, useContext, useEffect } from 'react';

// Crear el contexto para el carrito
const CartContext = createContext();

// Proveedor de contexto
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);
  
  // Función para agregar un producto al carrito
  const addToCart = (product) => {
    setCartItems((prevCart) => [...prevCart, product]);
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (productId) => {
    setCartItems((prevCart) => prevCart.filter((product) => product.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook para usar el contexto del carrito en otros componentes
export const useCart = () => useContext(CartContext);
