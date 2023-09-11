const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//Create a comment
router.post('/', withAuth, (req, res) => {
  if (req.session) {
      Comment.create({
          text: req.body.text,
          post_id: req.body.post_id,
          user_id: req.session.user_id
          })
          .then(dbCommentData => res.json(dbCommentData))
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
  }
});

//Get all comments
router.get("/", (req, res) => {
  Comment.findAll()
      .then((dbCommentData) => res.json(dbCommentData))
      .catch((err) => {
          console.log(err);
          res.status(500).json(err);
      });
});

module.exports = router;
