const { response } = require("express");
const { generarJWT } = require("../helpers/generar-jwt");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { getAccountData, dataPath } = require("../utils");

const getUser = async (req, res = response) => {
  const { email, name } = req.user;

  if (!email) {
    return res.status(500).json({ msg: "User doesn't exist." });
  }

  res.status(200).json({ email, name });
};

const createUser = async (req, res = response) => {
  const { name, email } = req.body;

  try {
    const data = getAccountData();
    const existingUser = data.users.find((user) => user.email === email);

    if (existingUser) {
      return res.status(400).json({
        msg: "Email already exist",
      });
    }

    const newUser = [
      ...data.users,
      {
        id: uuidv4(),
        name,
        email,
      },
    ];

    const stringifyData = JSON.stringify({
      users: newUser,
    });

    fs.writeFileSync(dataPath, stringifyData);

    const token = await generarJWT(name);

    res.status(201).json({ name, email, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error. Please try again",
    });
  }
};

module.exports = { createUser, getUser };
