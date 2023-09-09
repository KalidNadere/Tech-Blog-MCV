const { DataTypes } = require("sequelize");

// Exporting function with 2 parameters; sequelize and DataTypes
module.exports = (sequelize) => { 

// Defines sequelize model 'Comment' with attributes specified within object 
  const Comment = sequelize.define("comment", { 
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  Comment.associate = function (models) { // defines associations for Comment
    Comment.belongsTo(models.User, { // establishes relationship between Comment model and User model
      foreignKey: { // specified to ensure that foreign key referencing User is not null
        allowNull: false,
      },
    });
    Comment.belongsTo(models.Post, { // Establishes relationship between Comment model and Post model
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Comment; // Exports Comment for use in other parts of the app
};