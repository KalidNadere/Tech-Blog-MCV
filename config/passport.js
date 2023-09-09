// Import passport.js library to implement authentication strategies in Node.js
const passport = require("passport"); 
// Importing localStrategy constructor for username and password authentication
const LocalStrategy = require("passport-local").Strategy; 
// Importing database connection from models

// const db = require("../models") 

// Configures Passport to use LocalStrategy for authentication whether user exists and password is valid
passport.use( 
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    (username, password, done) => {
      db.User.findOne({ where: { username } })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: "Incorrect password." });
        }
        if (!user.validPassword(password)) {
          return done(null, user);
        }
        return done(null, user);
      })
      .catch((err) => {
        return done(err);
      });
    }
  )
);

// Defines how passport should serialize user object into sessions, saves user's ID to the session for later retrieval
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

// Defines how passport should deserialize user object from session, it retrieves user's full data
passport.deserializeUser((id, cb) => {
  db.User.findByPk(id)
  .then((user) => {
    cb(null, user);
  })
  .catch((err) => {
    cb(err);
  });
});

// Exporting passport for use in other parts of the app
module.exports = passport;