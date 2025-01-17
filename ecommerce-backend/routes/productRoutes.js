const express = require("express");
const router = express.Router();
const { getProducts, createProduct } = require("../controllers/productController");

//Ruta para obtener todos los productos
router.get("/", getProducts);

// Ruta para crear un nuevo producto
router.post("/", createProduct);

module.exports = router;