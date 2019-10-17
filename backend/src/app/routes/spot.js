const routes = require('express').Router();
const multer = require('multer');
const uploadConfig = require('../../config/upload');

const upload = multer(uploadConfig);
const SpotController = require('../controllers/SpotController');
const BookingController = require('../controllers/BookingController');

const spot = new SpotController();
const booking = new BookingController();

routes
    .route('/')
    .get(spot.index)
    .post(upload.single('thumbnail'), spot.store);

routes
    .route('/:spot_id/bookings')
    .post(booking.store);


module.exports = routes;