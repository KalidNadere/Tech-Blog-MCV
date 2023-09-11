const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
    // If JawsDB URL is available, use it (for production)
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    // Otherwise, use local MySQL (for development)
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: 3306,
        logging: console.log // Enable logging to see SQL queries in the console
    });    
}

module.exports = sequelize;
