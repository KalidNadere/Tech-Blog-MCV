const { User } = require('../models');

const userData = [
  {
    username: 'john_doe',
    email: 'john@example.com',
    password: 'password123',
  },
  {
    username: 'jane_smith',
    email: 'jane@example.com',
    password: 'securepassword',
  },
  {
    username: 'bob_jones',
    email: 'bob@example.com',
    password: '123456789',
  },
];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUsers;
