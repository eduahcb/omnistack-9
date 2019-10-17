const routes = require('express').Router();

const SessionController = require('../controllers/SessionController');

const session = new SessionController();

routes
    .route('/')
    .post(session.store);

module.exports = routes;