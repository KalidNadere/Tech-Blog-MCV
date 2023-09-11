// Importing necessary modules from Sequelize and connection configuration
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Defining Comment class that extends the Sequelize Model class
class Comment extends Model {}

// Initializing the Comment model with its attributes and data types
Comment.init(
  {
    // Defining 'id' attribute with specific properties
    id: {
      type: DataTypes.INTEGER,      
      allowNull: false,             
      primaryKey: true,            
      autoIncrement: true,      
    },
    // Defining 'text' attribute with specific properties
    text: {
      type: DataTypes.STRING,       
      allowNull: false,            
      validate: {
        len: [3],                 
      },
    },
    // Defining 'user_id' attribute with specific properties
    user_id: {
      type: DataTypes.INTEGER,      
      allowNull: false,             
      references: {
        model: 'user',              
        key: 'id',                  
      },
    },
    // Defining 'post_id' attribute with specific properties
    post_id: {
      type: DataTypes.INTEGER,      
      allowNull: false,             
      references: {
        model: 'post',              
        key: 'id',                  
      },
    },
  },
  {
    sequelize,    // Passing Sequelize connection instance
    freezeTableName: true,  // Preventing Sequelize from pluralizing the table name
    underscored: true,   // Using snake_case for column names (e.g., text)
    modelName: 'comment',  // Setting model name to 'comment'
  }
);

// Exporting Comment model for use in other parts of the application
module.exports = Comment;
