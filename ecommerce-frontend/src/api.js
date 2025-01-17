// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com', // Cambia esta URL a la de tu API
});

export default api;
