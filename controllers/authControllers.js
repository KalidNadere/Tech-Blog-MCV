const db = require("../models");
const bcrypt = require("bcrypt");

const authController = {
  // User registration
  register: async (req, res) => {
    try {
      // Extract user registration data from request body
      const { username, password } = req.body;

      // Check if username already exists in the database
      const existingUser = await db.User.findOne({ where: { username } });

      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      // Hash user's password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user in the database
      await db.User.create({ username, password: hashedPassword });
     
      // res.status(201).json({ message: "Registration successful" });
      
      // Send a redirect response to the homepage
      res.redirect("/");
    } catch (err) {
      res.status(400).json({ message: "Registration failed", error: err.message });
    }
  },

  // User login
  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await db.User.findOne({ where: { username } });

      if (!user) {
        return res.status(401).json({ message: "Authentication failed" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: "Authentication failed" });
      }

      req.session.user = user;
      
      res.status(200).json({ message: "Login successful", user });
    } catch (err) {
      res.status(500).json({ message: "Login failed", error: err.message });
    }
  },

  // User logout
  logout: (req, res) => {
    req.session.destroy();
    res.status(200).json({ message: "Logout successful" });
  },

  // Render signup page
  renderSignupPage: (req, res) => {
    res.render("signup");
  },

  // Render login page
  renderLoginPage: (req, res) => {
    res.render("login");
  },
  
  // Render dashboard page
  renderDashboardPage: (req, res) => {
    res.render("dashboard");
  },
  
  // Middleware to check if user is authenticated
  isAuthenticated: (req, res, next) => {
    if (req.session.user) {
      return next();
    }
    res.status(401).json({ message: "Authentication required" });
  },
};

module.exports = authController;
