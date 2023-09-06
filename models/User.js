module.exports = function (sequelize, DataTypes) { // Exporting function with parameters sequelize and datatypes
  const User = sequelize.define("User", { // Defining sequelize model 'User', specifying its attributes and their data types
    username: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.associate = function (models) { // Defining association between User model and Post model, using hasMany association
    User.hasMany(models.Post, {
      onDelete: "cascade",
    });
  };

  return User; // Exporting the User model, to be used in other parts of the app
};