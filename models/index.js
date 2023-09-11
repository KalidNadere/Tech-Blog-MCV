// Importing User, Post, and Comment models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Defining associations between the models
// User can have many Posts, and the user_id foreign key in Post references User's id
User.hasMany(Post, {
  foreignKey: 'user_id',   
  onDelete: 'CASCADE',  // onDelete behavior for related Posts
});

// Post belongs to a User, and it has a foreign key user_id that references User's id
Post.belongsTo(User, {
  foreignKey: 'user_id',
});

// User can have many Comments, and the user_id foreign key in Comment references User's id
User.hasMany(Comment, {
  foreignKey: 'user_id', 
  onDelete: 'CASCADE', 
});

// Comment belongs to a User, and it has a foreign key user_id that references User's id
Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

// Post can have many Comments, and the post_id foreign key in Comment references Post's id
Post.hasMany(Comment, {
  foreignKey: 'post_id',  
  onDelete: 'CASCADE',  
});

// Comment belongs to a Post, and it has a foreign key post_id that references Post's id
Comment.belongsTo(Post, {
  foreignKey: 'post_id', 
});

// Exporting User, Post, and Comment models for use in other parts of the application
module.exports = { User, Post, Comment };
