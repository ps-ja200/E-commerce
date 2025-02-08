const express = require('express');
const router = express.Router();
const folderController = require('../controllers/folderController');

// Route for accessing specific folder
router.get('/', folderController.accessFolder); // Access folder contents

module.exports = router;
