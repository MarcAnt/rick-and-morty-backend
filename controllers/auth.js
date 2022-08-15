const { response } = require("express");
const { generarJWT } = require("../helpers/generar-jwt");
const { getAccountData } = require("../utils");

const login = async (req, res = response) => {
  const { name, email } = req.body;

  try {
    // if email already exist

    const data = getAccountData();
    const existingUser = data.users.find((user) => user.email === email);

    if (!existingUser) {
      return res.status(400).json({
        msg: "User does not exist.",
      });
    }

    // generar JWT
    const token = await generarJWT(existingUser.id);

    res.json({
      name: existingUser.name,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Unexpected error, try again.",
    });
  }
};

// const loginUsuario = async (req, res = response) => {
//   const { email, password } = req.body;

//   try {
//     const usuario = await Usuario.findOne({ email });

//     //verificar que el usuario no existe
//     if (!usuario) {
//       return res.status(400).json({
//         ok: false,
//         msg: "Un usuario existe con ese correo",
//       });
//     }

//     // Confimar passwords
//     const validarPassword = bcrypt.compareSync(password, usuario.password);

//     if (!validarPassword) {
//       return res.status(400).json({
//         ok: false,
//         msg: "Password incorrecto",
//       });
//     }

//     const token = await generarJWT(usuario.id, usuario.name);

//     res.json({
//       ok: true,
//       uid: usuario.id,
//       name: usuario.name,
//       token,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       ok: false,
//       msg: "Por favor hable con el admin",
//     });
//   }
// };

module.exports = { login };
