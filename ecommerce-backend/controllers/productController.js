exports.getProducts = (req, res) => {
    // Logica para obtener productos
    res.status(200).json({ message: "Productos obtenidos correctamente" });
};

exports.createProduct = (req, res) => {
    // Logica para crear un producto
    const { name, description, price } = req.body;

    // Guardar el producto en la base de datos
    res.status(201).json({ message: "Producto creado correctamente" });
};