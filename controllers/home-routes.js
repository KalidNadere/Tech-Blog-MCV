const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const sequelize = require('../config/connection');

// Homepage route
router.get('/', (req, res) => {
  // Fetch all posts with associated user and comment data using Sequelize
  Post.findAll({
    include: [
      {
        model: User,
        attributes: ['username'],
      },
      {
        model: Comment,
        attributes: ['text', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
    ],
  })
    .then((postData) => {
      const posts = postData.map((post) => post.get({ plain: true }));
      res.render('dashboard', {
        posts,
        loggedIn: req.session.logged_in,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Single post view route
router.get('/post/:id', (req, res) => {
  // Fetch a single post with associated user and comment data using Sequelize
  Post.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ['username'],
      },
      {
        model: Comment,
        attributes: ['text', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
    ],
  })
    .then((postData) => {
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }

      const post = postData.get({ plain: true });

      res.render('single-post', {
        post,
        loggedIn: req.session.logged_in,
      });
    })
    .catch((err) => {
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
