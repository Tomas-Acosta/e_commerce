// src/components/NavBar.js
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './NavBar.css';

const NavBar = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <nav className="navbar">
      <a href="/">Home</a>
      <a href="/products">Productos</a>
      <a href="/cart">
        Carrito <span className="cart-count">{cartItems.length}</span>
      </a>
      <a href="/profile">Perfil</a>
    </nav>
  );
};

export default NavBar;
