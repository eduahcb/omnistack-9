const routes = require('express').Router();

const ApprovalController = require('../controllers/ApprovalController');
const RejectionController = require('../controllers/RejectionController');

const approval = new ApprovalController();
const rejection = new RejectionController();

routes.route('/:booking_id/approvals').post(approval.store);
routes.route('/:booking_id/rejections').post(rejection.store);

module.exports = routes;
