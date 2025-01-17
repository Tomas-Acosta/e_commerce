const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({ // Definir el esquema de usuario
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user',
    }
});

const User = mongoose.model("User", userSchema); // Crear el modelo de usuario

module.exports = User;
