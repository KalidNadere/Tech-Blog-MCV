const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const bcrypt = require("bcrypt");
const db = require("./models");
const PORT = process.env.PORT || 3000;
require('dotenv').config();
const authController = require("./controllers/authControllers");
const helpers = require("./utils/helpers");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers });const User = require("./models/User.js");
const Comment = require("./models/Comment");
const Post = require("./models/Post");
const path = require('path');

// Routes
const htmlRoutes = require("./routes/html");
const apiRoutes = require("./routes/api");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));


app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// session setup
app.use(
  session({
    secret: "your-secret",
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({ db: db.sequelize }),
  })
);

// Homepage route
app.get("/", (req, res) => {
  res.render("home"); 
});

app.use("/", htmlRoutes);
app.use("/api", apiRoutes);

// Sync database and start server
db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
  });
});
