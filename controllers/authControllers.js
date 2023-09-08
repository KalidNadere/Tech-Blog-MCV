const passport = require("passport");
const db = require("../models");

const authController = {
  // User registration
  register: (req, res) => {
    const { username, passport } = req.body;
    db.User.create({ username, password })
    .then(() => {
      res.status(201).json({ message: "Registration successful" });
    })
    .catch((err) => {
      res.status(400).json({ message: "Registration failed", error: err.message });
    });
  },

  // User login
  login: (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: "Authentication failed", error: info.message });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json({ message: "Login successful", user });
      });
    })(req, res, next);
  },

  // User logout
  logout: (req, res) => {
    req.logout();
    res.status(200).json({ message: "Logout successful" });
  },

  // Middleware to check if user is authenticated
  isAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: "Authentication required" });
  },
};

module.exports = authController;