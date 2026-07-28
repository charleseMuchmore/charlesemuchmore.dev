const express = require('express');
const controller = require('./controller');
const validation = require('./validation');

const router = express.Router();

router.post("/start", controller.start);
router.post("/action", controller.action);

module.exports = router;

