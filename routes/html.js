const express = require("express");
const router = express.Router();
const postController = require("../controllers/postControllers");
const authController = require("../controllers/authControllers");

// Homepage
router.get("/", postController.renderHomepage);

// Dashboard (require authentication)
router.get("/dashboard", authController.isAuthenticated, authController.renderDashboardPage);

// Route for user registration
router.post("/register", authController.register);

// Login page
router.get("/login", authController.renderLoginPage);

router.post("/logout", authController.logout);

// Signup page
router.get("/signup", authController.renderSignupPage);

// Blog post view
router.get("/post/:id", postController.renderPostView);


module.exports = router;