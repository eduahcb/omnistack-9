const routes = require('express').Router();

const DashboadController = require('../controllers/DashboardController');

const dashboad = new DashboadController();

routes
    .route('/')
    .get(dashboad.show);

module.exports = routes;