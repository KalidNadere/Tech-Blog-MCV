const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection')

// Dashboard route (display user's posts)
router.get('/', withAuth, async (req, res) => {
  try {
    // Fetch user's posts and associated user data using Sequelize
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      loggedIn: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Edit post route
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    // Fetch post data for editing
    const postData = await Post.findByPk(req.params.id);

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    const post = postData.get({ plain: true });

    res.render('edit-post', {
      ...post,
      loggedIn: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create new post route
router.get('/create', withAuth, (req, res) => {
  res.render('create-post', {
    loggedIn: true,
  });
});

module.exports = router;
