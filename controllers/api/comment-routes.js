// Import required modules and models
const router = require('express').Router();
const { Comment } = require('../../models');

// Upload a new comment
router.post('/:id', (req, res) => {
  // Check the session to make sure the user is logged in

  // Create a new comment in the database using data from the request body
  Comment.create({
    comment_text: req.body.comment_text,
    post_id: req.body.post_id,
    // use the id from the session to associate the comment with the user
    user_id: req.session.user_id,
  })
    .then((dbCommentData) => res.json(dbCommentData)) // Send the created comment data as a JSON response
    .catch((err) => {
      console.log(err); // Log any errors that occur
      res.status(400).json(err); // Send an error response with a 400 status code and the error message
    });
});

// Delete a comment
router.delete('/:id', (req, res) => {
  // Delete a comment from the database based on the provided comment ID
  Comment.destroy({
    where: {
      id: req.params.id, // The comment ID is taken from the request parameters
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        // If no comment is found with the provided ID, send a 404 response
        res.status(404).json({ message: 'No Comment found with this id' });
        return;
      }
      res.json(dbUserData); // Send a JSON response with the deleted comment data
    })
    .catch((err) => {
      console.log(err); // Log any errors that occur
      res.status(500).json(err); // Send an error response with a 500 status code and the error message
    });
});

// Edit a comment
router.put('/:id', (req, res) => {
  // Update the comment text of an existing comment in the database

  Comment.update(
    {
      comment_text: req.body.comment_text, // Update the comment_text field with data from the request body
    },
    {
      where: {
        id: req.params.id, // Update the comment with the provided ID
      },
    }
  )
    .then((dbPostData) => {
      if (!dbPostData) {
        // If no comment is found with the provided ID, send a 404 response
        res.status(404).json({ message: 'No comment found with this id' });
        return;
      }
      res.json(dbPostData); // Send a JSON response with the updated comment data
    })
    .catch((err) => {
      console.log(err); // Log any errors that occur
      res.status(500).json(err); // Send an error response with a 500 status code and the error message
    });
});

module.exports = router; // Export the router for use in other parts of the application
