// Importing necessary modules
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// Creating User model by extending the Model class
class User extends Model {

  // Method to check if provided password matches the user's hashed password
  checkPassword(loginPassword) {
    return bcrypt.compareSync(loginPassword, this.password);
  }
}

// Initializing User model with its attributes and data types
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8], // Minimum character length for the password
      },
    },
  },
  {
    hooks: {
      // Hash the user's password before creating new user
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,    // Passing the sequelize connection
    freezeTableName: true, // Prevents pluralization of the table name
    underscored: true,    // Uses underscores in column names
    modelName: 'user',   // Model name used in queries
  }
);

// Export the User model for use in other parts of the application
module.exports = User;
