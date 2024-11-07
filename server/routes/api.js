const express = require('express');
const router = express.Router();

const a11yTreeController = require('../controllers/a11yTreeController');

// Sample route
router.post('/', a11yTreeController.getTree);

router.delete('/', a11yTreeController.deleteTree);

module.exports = router;
