const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const bcrypt = require("bcrypt");
const db = require("./models");
const PORT = process.env.PORT || 3000;
require('dotenv').config();
const authController = require("./controllers/authControllers");

const User = require("./models/User.js");
const Comment = require("./models/Comment");
const Post = require("./models/Post");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 
app.use(express.static("public"));

// session setup
app.use(
  session({
    secret: "your-secret",
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({ db: db.sequelize }),
  })
);

// Routes
const htmlRoutes = require("./routes/html");
const apiRoutes = require("./routes/api");

app.use("/", htmlRoutes);
app.use("/api", apiRoutes);

// Sync database and start server
db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
  });
});
