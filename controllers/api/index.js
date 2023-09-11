// Import the Express Router
const router = require('express').Router();

// Import route modules for home, login, and dachboard
const homeRoutes = require('../home-routes');
const loginRoutes = require('./login-routes');
const dashboardRoutes = require('../dashboard-routes');

const apiRoutes = require('../api');

// Define routes and associate them with their respective route modules
router.use('/', homeRoutes);
router.use('/login', loginRoutes);
router.use('/dashboard', dashboardRoutes);

router.use('/api', apiRoutes);

module.exports = router;
