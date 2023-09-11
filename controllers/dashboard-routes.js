const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection')

// Dashboard route (display user's posts)
router.get('/', withAuth, (req, res) => {
  Post.findAll({
      where: {
          user_id: req.session.user_id
      },
      attributes: [
          'id','title','content','created_at'
       ],
       include: [{
              model: Comment,
              attributes: ['id', 'text', 'post_id', 'user_id', 'created_at'],
              include: {
                   model: User,
                   attributes: ['username']
               }
           },
           {
              model: User,
              attributes: ['username']
           }
      ]
  })
   .then(dbPostData => {
     const posts = dbPostData.map(post => post.get({
          plain: true
       }));
       res.render('dashboard', {
       posts,
          loggedIn: true
       });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
   });
});

// Edit post route
router.get('/edit/:id', withAuth, (req, res) => {
  Post.findOne({
       where: {
          id: req.params.id
       },
       attributes: [
          'id','title','content','created_at'
       ],
       include: [{
               model: Comment,
               attributes: ['id', 'text', 'post_id', 'user_id', 'created_at'],
              include: {
                  model: User,
                  attributes: ['username']
              }
           },
           {
               model: User,
               attributes: ['username']
           }
       ]
  })
   .then(dbPostData => {
       if (!dbPostData) {
           res.status(404).json({
              message: 'Post not found with this id'
          });
           return;
      }
       const post = dbPostData.get({
           plain: true
      });

      res.render('edit-post', {
          post,
           loggedIn: true
       });
   })
   .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
})

// Create new post route
router.get('/create', withAuth, (req, res) => {
  res.render('create-post', {
    loggedIn: true,
  });
});

module.exports = router;
