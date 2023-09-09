// const Sequelize = require("sequelize");
// require("dotenv").config();
// const config = require(__dirname + "/../config.js");

// let sequelize;

// if (process.env.JAWSDB_URL) {
//   // if JAWSDB is available e.g. in a production environment
//   sequelize = new Sequelize(process.env.JAWSDB_URL);
// } else {
//   // JAWSDB is not available, use local env variables
//   sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: "localhost",
//     dialect: "mysql",
//     port: 3306,
//   });
// }

// module.exports = sequelize;

const Sequelize = require("sequelize");

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: process.env.DB_HOST || "localhost",
      dialect: "mysql",
      port: 3306,
    });

module.exports = sequelize;
