module.exports = function (sequelize, DataTypes) { // Exporting function with parameters, sequelize and DataTypes
  const Post = sequelize.define("Post", { // Defines sequelize model Post, with attributes specified within the object. It has 2 attributes, title and content
    title: {
      type: DataTypes.STRING,
      allownull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allownull: false,
    },
  });

  Post.associate = function (models) { // Defines associations for Post model
    Post.belongsTo(models.User, { // this association establishes relationship between Post model and User model, using belongsTo method
      foreignKey: { // foreign key specified to ensure foreign key referencing the user is not null
        allownull: false,
      },
    });
    Post.hasMany(models.comment, { // Establishes one-to-many relationship that a post can have many comments
      onDelete: "cascade", // Means if a post is deleted, all associated comments should also be deleted
    });
  };

  return Post; // Exporting Post model for use in other parts of the app
};