const express = require('express');
const controller = require('./controller');
const validation = require('./validation');

const router = express.Router();

router.get('/', controller.getInfo);
router.post('/order', validation.validateGameState, controller.order);
router.post('/make', validation.validateGameState, validation.validateOrder, controller.make);
router.post('/restock', validation.validateGameState, controller.restock);
router.post('/report', validation.validateGameState, controller.report);
router.post('/reset', controller.reset);

module.exports = router;
