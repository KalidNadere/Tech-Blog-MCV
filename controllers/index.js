const router = require('express').Router();

const homeRoutes = require('./home-routes.js');
const loginRoutes = require('./api/login-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/login', loginRoutes);
router.use('/dashboard', dashboardRoutes);

router.use('/api', apiRoutes);

module.exports = router;
