const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const authMiddleware = require('../middleware/authMiddleware');
const productController = require('../controllers/productController');
const folderController = require('../controllers/folderController'); // Added folder controller

// New route for accessing specific folder
router.get('/folder', folderController.accessFolder); // Added route for folder access


// Public routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.get('/search', productController.searchProducts);

// Protected routes (require authentication)
router.use(authMiddleware);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
