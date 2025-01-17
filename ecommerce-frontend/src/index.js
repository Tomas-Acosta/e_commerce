// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Importar desde 'react-dom/client'
import './styles.css';  // Si tienes un archivo CSS
import App from './App';
import { CartProvider } from './context/CartContext'; // Importar el proveedor del carrito

const root = ReactDOM.createRoot(document.getElementById('root')); // Crear un root

root.render(
    <CartProvider>
        <App />
    </CartProvider>

);  // Usar .render() con el root