const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();
const { getUser, createUser } = require("../controllers/user");
const { emailExiste } = require("../helpers/db-validators");

const { validarCampos, validarJWT } = require("../middlewares");

router.get("/profile", [validarJWT, validarCampos], getUser);

router.post(
  "/",
  [
    check("email", "Is not a valid email format").isEmail(),
    check("email").custom(emailExiste),
    check("name", "Name es required").not().isEmpty(),

    validarCampos,
  ],
  createUser
);

module.exports = router;
