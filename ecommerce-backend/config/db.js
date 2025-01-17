const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || "mongodb+srv://acostaguillermotomas:mongotomas@cluster0.5tlvu.mongodb.net/?retryWrites=true&w=majority";
    await mongoose.connect(mongoURI);
    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Error al conectar MongoDB:", error.message);
    process.exit(1); // Salir del proceso si no puede conectar
  }
};

module.exports = connectDB;
