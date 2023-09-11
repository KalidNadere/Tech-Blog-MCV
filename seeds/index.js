// Import seed functions for users, posts, and comments
const seedUsers = require('./user-seeds');
const seedPosts = require('./post-seeds');
const seedComments = require('./comment-seeds');

// Import Sequelize and establish a connection to the database
const sequelize = require('../../app/config/connection');

// Define the seedAll function, which will perform data seeding
const seedAll = async () => {
  // Synchronize the database by creating tables based on model definitions
  await sequelize.sync({ force: true });
  console.log('--------------');
  
  // Seed user data into the database
  await seedUsers();
  console.log('--------------');

  // Seed post data into the database
  await seedPosts();
  console.log('--------------');

  // Seed comment data into the database
  await seedComments();
  console.log('--------------');

  // Exit the process to signify the completion of data seeding
  process.exit(0);
};

// Call the seedAll function to initiate data seeding
seedAll();
