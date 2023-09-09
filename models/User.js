const { DataTypes } = require("sequelize");

// Exporting sequelize
module.exports = (sequelize) => { 

// Defining sequelize model 'User', specifying its attributes and their data types
  const User = sequelize.define("User", { 
    username: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

// Defining association between User model and Post model, using hasMany association
  User.associate = function (models) { 
    User.hasMany(models.Post, {
      onDelete: "cascade",
    });
  };

  return User; // Exporting the User model, to be used in other parts of the app
};