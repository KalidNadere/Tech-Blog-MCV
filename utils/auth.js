// Middleware function for route authentication
const withAuth = (req, res, next) => {
  if (!req.session.user_id) { // Checking if user is not authenticated (user_id is not in the session)
    res.redirect('/login'); // Redirect to login page if not authenticated
  } else {
    next(); // Continue to next middleware or route if authenticated
  }
};

// Exporting the withAuth middleware function for use in routes
module.exports = withAuth; 
