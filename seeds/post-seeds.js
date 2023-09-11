const { Post } = require('../models');

const postData = [
  {
    title: 'First Post',
    description: 'This is the content of the first post.',
    user_id: 1, 
  },
  {
    title: 'Second Post',
    description: 'Another post with some content.',
    user_id: 2, 
  },
  {
    title: 'Third Post',
    description: 'A third post for testing purposes.',
    user_id: 1, 
  },
  
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
