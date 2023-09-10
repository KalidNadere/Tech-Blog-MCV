const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config.js");

// const sequelize = new Sequelize(config.database, config.username, config.password, config);

const sequelize = new Sequelize('sqlite::memory:');
const db = {};

// Import model files
const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// Initializing each model with sequelize instance
db.User = User(sequelize);
db.Post = Post(sequelize);
db.Comment = Comment(sequelize);

// Defining associations between models
db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);

db.User.hasMany(db.Comment);
db.Comment.belongsTo(db.User);

db.Post.hasMany(db.Comment); 
db.Comment.belongsTo(db.Post);

// Exporting Sequelize instance and models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;