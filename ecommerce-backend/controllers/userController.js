const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // Importar el modelo de usuario de la base de datos
const { validationResult } = require("express-validator");

// Función para registrar un nuevo usuario
exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        // Crear un nuevo usario
        const salt = await bcrypt.genSalt(10); // Generar un salt para el encriptado 
        const hashedPassword = await bcrypt.hash(password, salt); // Encriptar la contraseña del usuario

        const newUser = new User({ // Crear un nuevo usuario
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();// Guardar el nuevo usuario en la base de datos

        // Crear un token JWT
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h', 
        });

        res.status(201).json({ message: 'Usuario registrado correctamente', token });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

// Funcion para iniciar sesion
exports.loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Verificar si el usuario existe
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }

        // Crear un token JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: "Inicio de sesión exitoso", token });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
};

// Funcion para obtener el perfil del usario (requiere autenticación)
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json({ name: user.name, email: user.email });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
};