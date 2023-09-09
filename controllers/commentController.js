const Comment = require('../models/Comment');
const Post = require("../models/Post")

const commentcontroller = {
  // Create new comment
  createComment: async (req, res) => {
    try {
      const { postId, comment } = req.body;
      const userId = req.session.userId;

      if (!userId) {
        return res.status(401).json({ message: 'You must be logged in to add a comment.' });
      }
      
      const newComment = await Comment.create({
        text: comment,
        userId: userId, //Associating comment with lodgged-in user
        postId: postId, // Associating comment with corresponding post
      });

      return res.status(201).json(newComment);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  },


  // Update a comment
  updateComment: async (req, res) => {
    try {
      const { commentId, newText } = req.body;
      const userId = req.session.userId;
      
      if (!userId) {
        return res.status(401).json({ message: 'You must be logged in to update a comment.' });
      }

      // Check if user is the author of the comment
      const existingComment = await Comment.findByPk(commentId);

      if (!existingComment) {
        return res.status(404).json({ message: 'Comment not found.' });
      }

      if (existingComment.UserId !== userId) {
        return res.status(403).json({ message: 'You are not authorized to update this comment.' });
      }

      // Update comment
      existingComment.text = newText;
      await existingComment.save();

      return res.status(200).json(existingComment);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Delete a comment
  deleteComment: async (req, res) => {
    try {
      const { commentId } = req.params;
      const userId = req.session.userId;
      
      if (!userId) {
        return res.status(401).json({ message: 'You must be logged in to delete a comment.' });
      }

      // Check if user is the author of the comment
      const existingComment = await Comment.findByPk(commentId);

      if (!existingComment) {
        return res.status(404).json({ message: 'Comment not found.' });
      }

      if (existingComment.UserId !== userId) {
        return res.status(403).json({ message: 'You are not authorized to delete this comment.' });
      }

      // Delete comment
      await existingComment.destroy();

      return res.status(204).json();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};

module.exports = commentcontroller;