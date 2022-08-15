const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
const bodyParser = require("body-parser");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: "/api/auth",
      user: "/api/user",
    };

    // Conectar la base de datos
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rutas
    this.routes();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    // lectura y perseo del body
    // this.app.use(express.json());

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    // Directorio publico
    this.app.use(express.static("public"));
  }

  async conectarDB() {
    await dbConnection();
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.user, require("../routes/user"));
  }

  listen() {
    if (this.port == null || this.port == "") {
      this.port = 8000;
    }

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

module.exports = Server;
