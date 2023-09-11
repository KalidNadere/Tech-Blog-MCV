const router = require('express').Router();

// Importing routes from separate route files
const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboard-routes');
const apiRoutes = require('./api');

// Using the imported routes with specific prefixes
router.use('/', homeRoutes); // Routes for home page
router.use('/dashboard', dashboardRoutes); // Routes for dashboard
router.use('/api', apiRoutes); // Routes for API

// If no route matches the request, this middleware is executed
router.use((req, res) => {
  res.status(404).end(); // Respond with a 404 status code
});

module.exports = router;
