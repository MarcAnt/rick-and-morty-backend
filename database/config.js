const dbConnection = async () => {
  try {
    // mongoose.connect(process.env.DB_CNN);
    console.log("DB online");
  } catch (error) {
    throw new Error("Error al inicializar la base de datos");
  }
};

module.exports = { dbConnection };
