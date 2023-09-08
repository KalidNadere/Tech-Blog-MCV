const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("./models");
const PORT = process.env.PORT || 3000;
const passportConfig = require("./config/passport");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true })); 
// Parsing incoming requests with URL-encoded payloads, handling form submissions
app.use(express.json()); 
// Parsing incoming requests with JSON payloads, handling API request in JSON format
app.use(express.static("public"));
// Serves static files from public directory, allowing client to access client-side assets e.g. HTML, CSS, JS and images

// Passport initialization
passportConfig(passport);

passport.use(
  new LocalStrategy(
    {
      usernameField: "username", // field for username in login form
      passwordField: "password", // field for password in login form
    },
    (username, password, done) => {
      // finding user with provided username in database
      db.User.findOne({ where: { username } })
      .then((user) => {
        if (!user) {
          // If no user is found, return error message
          return done(null, false, { message: "Incorrect username." });
        }

        // Check if password provided matches the user's hashed password
        if (!user.validPassword(password)) {
          // If password does not match, return error message
          return done(null, false, { message: "Incorrect password." });
        }

        // If username and password are correct, return user object
        return done(null, user);
      })
      .catch((err) => {
        // If there's an error, handle it (e.g. log it or return an error)
        return done(err);
      });
    }
  )
);

// Serialize user information to store in the session
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

// Deserialize user information from the session
passport.deserializeUser((id, cb) => {
  db.User.findByPk(id)
  .then((user) => {
    cb(null, user);
  })
  .catch((err) => {
    cb(err);
  });
});

// session setup
app.use(
  session({
    secret: "your-secret",
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({ db }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
require("./routes/api")(app);
require("./routes/html")(app);

// Sync database and start server
db.Sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
  });
});