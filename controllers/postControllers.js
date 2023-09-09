// const db = require("../models");

const postController = {
  // Create new blog post
  createPost: (req, res) => {
    const { title, content } = req.body;
    db.Post.create({
      title,
      content,
      UserId: req.user.id,
    })
    .then((post) => {
      res.status(201).json({ message: "Post created successfully", post });
    })
    .catch((err) => {
      res.status(400).json({ message: "Post creation failed", error: err.message });
    });
  },

  // Update blog post
  updatePost: (req,res) => {
    const postId = req.params.id;
    const { title, content } = req.body;
    db.Post.findOne({
      where: { id: postId, userId: req.user.id },
    })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: "Post not found", });
      }
      post.title - title;
      post.content = content;
      post.save()
      .then(() => {
        res.status(200).json({ message: "Post updated successfully", post });
      })
      .catch((err) => {
        res.status(400).json({ message: "Post update failed", error: err.message });
      });
    })
    .catch((err) => {
      res.status(400).json({ message: "Post update failed", error: err.message });
    });
  },

  // Delete blog post
  deletePost: (req,res) => {
    const postId = req.params.id;
    db.Post.destroy({
      where: { id: postId, userId: req.user.id },
    })
    .then(() => {
      res.status(200).json({ message: "Post deleted successfully" });
    })
    .catch((err) => {
      res.status(400).json({ message: "Post deletion failed", error: err.message });
    });
  },

  // Render homepage with existing blog posts
  renderHomepage: (req, res) => {
    db.Post.findAll({
      include: [
        { model: db.User, attributes: ["username"] },
        { model: db.Comment, attributes: ["text", "createdAt"], include: { model: db.User, attributes: ["username"] } },
      ],
      order: [["createdAt", "DESC"]],
    })
    .then((posts) => {
      res.render("home", { posts });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error", error: err.message });
    });
  },

  // Render dashboard with user's own blog posts
  renderDashboard: (req, res) => {
    db.Post.findAll({
      where: { UserId: req.user.id }, // Show only posts created by the logged-in user
    })
    .then((userPosts) => {
      res.render("dashboard", { userPosts });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error", error: err.message });
    });
  },

  // Render individual blog post
  renderPostView: (req, res) => {
    const postId = req.params.id;
    db.Post.findOne({
      where: { id: postId },
      include: [
        { model: db.User, attributes: ["username"] },
        { model: db.Comment, attributes: ["text", "createdAt"], include: { model: db.User, attributes: ["username"] } },
      ],
    })
      .then((post) => {
        if (!post) {
          return res.status(404).json({ message: "Post not found" });
        }
        res.render("post", { post });
      })
      .catch((err) => {
        res.status(500).json({ message: "Internal server error", error: err.message });
      });
    },
  };

  module.exports = postController;