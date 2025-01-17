// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { useCart } from '../context/CartContext';
import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]); // Estado para almacenar los productos
  const [loading, setLoading] = useState(true); // Estado de carga
  const { addToCart } = useCart(); // Función para agregar un producto al carrito
  const [categories, setCategories] = useState([]); // Estado para almacenar las categorías de productos
  const [selectedCategory, setSelectedCategory] = useState('all'); // Categoria por defecto para todos los productos
  const [priceRange, setPriceRange] = useState([0, 1000]); // Rango de precios por defecto

  // Función para obtener productos desde la API
  const fetchProducts = async () => { // Función para obtener productos desde la API
    try {
      const response = await axios.get('https://fakestoreapi.com/products'); // Petición a la API
      setProducts(response.data); // Guardamos los productos en el estado
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false); // Terminamos la carga
    }
  };

  const fethCategories = async () => { // Función para obtener las categorias desde la API
    try {
      const response = await axios.get('https://fakestoreapi.com/products/categories'); // Petición a la API
      setCategories(response.data); // Guardamos las categorias en el estado
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const filteredProducts = products
  .filter((product) =>
    selectedCategory === 'all' ? true : product.category === selectedCategory
  )
  .filter(
    (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  useEffect(() => { // Llamamos a la API al cargar el componente
    fetchProducts();
    fethCategories(); 
  }, []);

  return (
    <div className="home">
      <header className="home-header">
        <h1>Bienvenido a nuestra tienda</h1>
        <nav className="navbar">
          <a href="/">Home</a>
          <a href="/products">Productos</a>
          <a href="/cart">Carrito</a>
          <a href="/profile">Perfil</a>
        </nav>
      </header>

      {/* Carrusel de productos destacados */}
      <div className="carousel">
        <h2>Productos Destacados</h2>
        {loading ? (
          <p>Cargando productos...</p>
        ) : (
          <div className="carousel-images">
            {products.slice(0, 3).map((product) => ( // Mostrar solo 3 productos
              <div key={product.id} className="carousel-item">
                <img src={product.image} alt={product.title} />
                <h3>{product.title}</h3>
                <p>Precio: ${product.price}</p>
                <button onClick={() => addToCart(product)}>Agregar al carrito</button>
              </div>
            ))}
          </div>
        )}
      </div>


      {/* Listado de productos */}
      <div className="product-list">
        <h2>Todos los Productos</h2>
        <div className='filters'>
          {/* Categorias */}
        <label htmlFor='category'>Filtrar por categoría:</label>
        <select
          id='category'
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
            <option value='all'>Todos los productos</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

          {/* Rango de precios */}
          <label htmlFor='priceRange'>Filtrar por sprecios:</label>
          <input
            type='range'
            id='priceRange'
            min="0"
            max="1000"
            step="10"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
          />
          <span>Hasta: ${priceRange[1]}</span>
      </div>

        {loading ? (
          <p>Cargando productos...</p>
        ) : (
          <div className="product-items">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-item">
                <img src={product.image} alt={product.title} />
                <h3>{product.title}</h3>
                <p>Precio: ${product.price}</p>
                <button onClick={() => addToCart(product)}>Agregar al carrito</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
