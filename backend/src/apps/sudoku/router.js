const express = require('express');
const controller = require('./controller');
const validation = require('./validation');

const router = express.Router();

router.get('/', controller.getInfo);
router.post('/generate', validation.validateGeneratePuzzle, controller.generatePuzzle);
router.post('/solve', validation.validateSolvePuzzle, controller.solvePuzzle);

module.exports = router;
