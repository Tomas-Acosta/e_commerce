const express = require("express"); // Para crear el servidor
const dotenv = require("dotenv"); // Para trabajar con variables de entorno
const cors = require("cors"); // Para permitir peticiones de otros dominios
const productRoutes = require("./routes/productRoutes"); // Para manejar las rutas de productos
const userRoutes = require("./routes/userRoutes"); // Para manejar las rutas de usuarios
const errorMiddleware = require("./middleware/errorMiddleware");// Para manejar los errores de la API
const connectDB = require("./config/db"); // Para conectar a la base de datos

dotenv.config();// Cargar las variables de entorno

const app = express(); // Crear el servidor
app.use(express.json());// Para parsear el body de las peticiones

const PORT = process.env.PORT || 5000; // Puerto en el que se ejecutara el servidor
const MONGO_URI = process.env.MONGO_URI; // URI de la base de datos

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB conectado'))
  .catch((err) => console.log('Error al conectar MongoDB:', err));


app.use(cors()); // Permite peticiones de otros dominios
app.use('/api/products', productRoutes);// Rutas de productos
app.use('/api/users', userRoutes); // Rutas de usuarios

app.use(errorMiddleware); // Middleware para manejar errores

app.get("/", (req, res) => { // Ruta de inicio de la API
    res.send("API funcionando")
});

app.listen(PORT, () =>
    console.log('Servidor corriendo en puerto ${PORT}') 
);