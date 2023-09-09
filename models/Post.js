const { DataTypes } = require("sequelize");

// Exporting sequelize
module.exports = (sequelize) => {

// Defines sequelize model Post, with attributes specified within the object. It has 2 attributes, title and content
  const Post = sequelize.define("Post", { 
    title: {
      type: DataTypes.STRING,
      allownull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allownull: false,
    },
  });

  // Defines associations for Post model
  Post.associate = function (models) { 
  // this association establishes relationship between Post model and User model, using belongsTo method
    Post.belongsTo(models.User, {
  // foreign key specified to ensure foreign key referencing the user is not null
      foreignKey: { 
        allownull: false,
      },
    });

  // Establishes one-to-many relationship that a post can have many comments
    Post.hasMany(models.comment, {
      onDelete: "cascade", // Means if a post is deleted, all associated comments should also be deleted
    });
  };

  // Exporting Post model for use in other parts of the app
  return Post; 
};