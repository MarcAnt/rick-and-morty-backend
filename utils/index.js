const fs = require("fs");
const dataPath = "./database/db.json";

// util functions
const saveAccountData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync(dataPath, stringifyData);
};
const getAccountData = () => {
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
};

module.exports = { getAccountData, saveAccountData, dataPath };
