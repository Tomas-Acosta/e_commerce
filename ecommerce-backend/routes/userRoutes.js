const express = require("express");
const User = require("../models/userModel");
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const { check, validationResult } = require("express-validator");

// Ruta para registrar un nuevo usuario
router.post("/register",
    [
        check("name", "El nombre es requerido").not().isEmpty(),
        check("email", "El email es requerido").isEmail(),
        check("password", "La contraseña es requerida").isLength({ min: 6 })
    ]
    , registerUser);

// Ruta para iniciar sesion
router.post("/login",
    [
        check("email", "El email es requerido").isEmail(),
        check("password", "La contraseña es requerida").exists()
    ]
    , loginUser);

// Ruta para obtener el perfil del usario
router.get("/profile", authMiddleware, getUserProfile);

// Crear un nuevo usuario
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;
  
    try {
      // Verificar si el correo ya existe
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'El correo ya está registrado' });
      }
  
      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Crear el nuevo usuario
      const newUser = new User({ name, email, password: hashedPassword, role });
      await newUser.save();
  
      res.status(201).json({ message: 'Usuario creado con éxito' });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el usuario', error });
    }
  });
  
  // Obtener todos los usuarios
  router.get('/', async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener usuarios', error });
    }
  });
  
  // Obtener un usuario por ID
  router.get('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el usuario', error });
    }
  });
  
  // Actualizar un usuario
  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, password, role } = req.body;
  
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Actualizar los campos del usuario
      user.name = name || user.name;
      user.email = email || user.email;
      user.role = role || user.role;
  
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }
  
      await user.save();
      res.status(200).json({ message: 'Usuario actualizado con éxito' });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }
  });
  
  // Eliminar un usuario
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      await user.remove();
      res.status(200).json({ message: 'Usuario eliminado con éxito' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el usuario', error });
    }
  });

module.exports = router;