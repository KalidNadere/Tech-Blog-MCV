const { Comment } = require('../models');

const commentData = [
  {
    comment_text: 'This is the first comment on post 1.',
    post_id: 1, 
    user_id: 1,
  },
  {
    comment_text: 'Great post!',
    post_id: 1, 
    user_id: 2, 
  },
  {
    comment_text: 'Nice job!',
    post_id: 2,
    user_id: 1, 
  },
  {
    comment_text: 'I have a question about this post.',
    post_id: 3, 
    user_id: 3, 
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
