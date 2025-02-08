// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const folderController = require('../controllers/folderController'); // Added folder controller

// New route for accessing specific folder
router.get('/folder', folderController.accessFolder); // Added route for folder access


router.post('/add', cartController.addToCart);
router.get('/', cartController.getCart);
router.delete('/remove/:productId', cartController.removeFromCart);
router.put('/update/:productId', cartController.updateQuantity);

module.exports = router;
