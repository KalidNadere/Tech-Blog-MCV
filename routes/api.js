const express = require("express");
const router = express.Router();
const postController = require("../controllers/postControllers");
const commentController = require("../controllers/commentController");
const authController = require("../controllers/authControllers");

// Create new blog post (requires authentication)
router.post("/posts", authController.isAuthenticated,postController.createPost);

// Update blog post (require authentication & ownership check)
router.put("/posts/:id", authController.isAuthenticated, postController.updatePost);

// Delete blog post (require authentication and ownership check)
router.delete("/posts/:id", authController.isAuthenticated, postController.deletePost);

// Create new comment on blog post (requires authentication)
router.post("/posts/:postId/comments", authController.isAuthenticated, commentController.createComment);

// Update comment (require authentication & ownership check)
router.put("/comments/:id", authController.isAuthenticated, commentController.updateComment);

// Delete comment (requires authentication & ownership check)
router.delete("/comments/:id", authController.isAuthenticated, commentController.deleteComment)

// User registration
router.post("/register", authController.register);

// User login
router.post("/login", authController.login);

// User logout
router.post("/logout", authController/logout);

module.exports = router;