// Importing necessary modules
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Creating Post model by extending the Model class
class Post extends Model {}

// Initializing the Post model with its attributes and data types
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user', // References 'user' model
        key: 'id',     // References 'id' field in the 'user' model
      },
    },
  },
  {
    sequelize,   // Passing sequelize connection
    freezeTableName: true, // Prevents pluralization of the table name
    underscored: true,    // Uses underscores in column names
    modelName: 'post',   // Model name used in queries
  }
);

// Exporting the Post model for use in other parts of the application
module.exports = Post;
