const { response } = require("express");
const jwt = require("jsonwebtoken");

const { getAccountData } = require("../utils");

const validarJWT = async (req, res = response, next) => {
  // leer el token de la ruta en los headers
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "There is not token in the petition",
    });
  }

  try {
    //Extraer el id del token
    const { uid } = jwt.verify(token, process.env.SECRETOPRIVATEKEY);

    // leer el usuario que corresponde al uid

    const data = getAccountData();
    const user = data.users.find((user) => user.id === uid);

    if (!user) {
      return res.status(400).json({
        msg: "Invalid token - user doesn't exist.",
      });
    }

    //Colocar en la request, el usuario
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Invalid token",
    });
  }
};

module.exports = { validarJWT };
