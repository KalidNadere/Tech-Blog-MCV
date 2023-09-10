const db = require("../models");
const bcrypt = require("bcrypt");

const authController = {
  // User registration
  register: async (req, res) => {
    try {
      const { username, password } = req.body;
      const existingUser = await db.User.findOne({ where: { username } });

      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await db.User.create({ username, password: hashedPassword });
      res.status(201).json({ message: "Registration successful" });
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

  // Middleware to check if user is authenticated
  isAuthenticated: (req, res, next) => {
    if (req.session.user) {
      return next();
    }
    res.status(401).json({ message: "Authentication required" });
  },
};

module.exports = authController;
