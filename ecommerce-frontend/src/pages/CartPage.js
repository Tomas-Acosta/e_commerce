import React from 'react';
import { useCart } from '../context/CartContext';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="cart-page">
      <h1>Tu Carrito</h1>
      {cartItems.length === 0 ? (
        <p>No tienes productos en el carrito</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} />
                <div>
                  <h3>{item.title}</h3>
                  <p>Precio: ${item.price}</p>
                  <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
          <h2>Total: ${totalPrice.toFixed(2)}</h2>
        </>
      )}
    </div>
  );
};

export default CartPage;
