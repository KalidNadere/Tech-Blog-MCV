// Importing Express framework
const express = require("express"); 
// Importing path module for working with file paths
const path = require('path'); 
// Importing routes/controllers module
const routes = require('./controllers'); 
// Importing Sequelize database connection
const sequelize = require('./config/connection'); 
// Importing helper functions
const helpers = require('./utils/helpers');
// Importing Handlebars for templating
const exphbs = require('express-handlebars'); 
const hbs = exphbs.create({
    helpers
}); // Creating an instance of Handlebars with custom helpers

// Importing Express Session for session management
const session = require('express-session'); 
 // Creating Sequelize session store
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Creating Express application instance
const app = express(); 
 // port for the application
const PORT = process.env.PORT || 3000;

app.use('/public/css', express.static(path.join(__dirname, 'public/css'), { 'Content-Type': 'text/css' }));
app.use('/public/js', express.static(path.join(__dirname, '/public/js'), { 'Content-Type': 'application/js' }));

const sess = {
  secret: process.env.DB_SECRET, // secret for session data
  cookie: {}, // Configuring cookie settings
  resave: false, // Disabling session resaving on every request
  saveUninitialized: true, // Save uninitialized sessions (e.g., for guest users)
  store: new SequelizeStore({
      db: sequelize,
      checkExpirationInterval: 1000 * 60 * 10, // Check session expiration every 10 minutes
      expiration: 1000 * 60 * 30 // Set session expiration to 30 minutes
  })
};

app.engine('handlebars', hbs.engine); // Set Handlebars as template engine
app.set('view engine', 'handlebars'); // Set the default view engine to Handlebars

app.use(session(sess)); // Use configured session middleware
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the "public" directory
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({
    extended: true
})); // Parse URL-encoded request bodies

app.use(routes); // Use defined routes/controllers

// Define the api/register route for user registration
  app.post('/api/register', async (req, res) => {
    try {
  const { username, password } = req.body;
      // If registration is successful, you can send a response like:
      res.status(200).json({ message: 'Registration successful' });
    } catch (err) {
        res.status(500).json({ error: 'Registration failed' });
    }
  });

sequelize.sync(); // Sync the Sequelize database

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`); // Start Express server and log the port
});
