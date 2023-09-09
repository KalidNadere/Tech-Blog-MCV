const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const PORT = process.env.PORT || 3000;
const Comment = require("./models/Comment.js");
const Post = require("./models/Post.js");
const User = require("./models/User.js");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true })); 
// Parsing incoming requests with URL-encoded payloads, handling form submissions
app.use(express.json()); 
// Parsing incoming requests with JSON payloads, handling API request in JSON format
app.use(express.static("public"));
// Serves static files from public directory, allowing client to access client-side assets e.g. HTML, CSS, JS and images

// session setup
app.use(
  session({
    secret: "your-secret",
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({ db: User.Sequelize }),
  })
);

// Authentication logic
app.post("login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: "Incorrect username." });
    }

    const passwordMatch = await bcrypt.compare(password, user.passport);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    // Setting user's ID in the session
    req.session.userId = user.id;

    return res.status(200).json({ message: "Login successful." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

app.post("/logout", (req, res) => {
  // Clear session data to log the user out
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error." });
    }
    return res.status(200).json ({ message: "Logout successful." });
  });
});

// Protect routes that require authentication
const requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized." });
  }
  next();
};

// Example protected route
app.get ("/dashboard", requireAuth, (req, res) => {
  // Access user's ID from req.session.userId
  return res.status(200).json({ message: "Access granted to protected route." });
});

// Sync database and start server
User.sequelize.sync({ forces: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
  });
});