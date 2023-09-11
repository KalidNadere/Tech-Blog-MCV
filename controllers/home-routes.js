const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const sequelize = require('../config/connection');

// Homepage route
router.get('/', (req, res) => {
  // Fetch all posts with associated user and comment data using Sequelize
    Post.findAll({
         attributes: [
            'id', 'title', 'content', 'created_at'
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

        res.render('homepage', {
            posts,
             loggedIn: req.session.loggedIn
           });
      })
        .catch(err => {
           console.log(err);
          res.status(500).json(err);
       });
});

// Single post view route
router.get('/post/:id', (req, res) => {
  // Fetch a single post with associated user and comment data using Sequelize
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

    res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn
    });
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

// Login route
router.get('/login', (req, res) => {
  // Check if user is already logged in
  if (req.session.logged_in) {
    res.redirect('/'); // Redirect to the dashboard if logged in
    return;
  }

  res.render('login'); // Render the login page
});

// Signup route
router.get('/signup', (req, res) => {
  // Check if the user is already logged in
  if (req.session.logged_in) {
    res.redirect('/'); // Redirect to the dashboard if logged in
    return;
  }

  res.render('signup'); // Render the signup page
});

// 404 Error Handling
router.use((req, res) => {
  res.status(404).render('Page not available');
});

module.exports = router;
