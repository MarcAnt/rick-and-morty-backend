const { Usuario } = require("../models/");
const fs = require("fs");
const dbPath = "./database/db.json";

const emailExiste = async (email = "") => {
  // const existeEmail = await Usuario.findOne({ correo });
  const dbData = fs.readFileSync(dbPath);
  const data = JSON.parse(dbData);
  const existeEmail = data?.users.find((user) => user.email === email);

  if (existeEmail) {
    throw new Error(`Email ${email} already exist`);
  }
};
// const existeUsuariPorId = async (id) => {
//   const existeUsuario = await Usuario.findById(id);
//   if (!existeUsuario) {
//     throw new Error(`El id no existe ${id}`);
//   }
// };

module.exports = {
  emailExiste,
  // existeUsuariPorId,
};
