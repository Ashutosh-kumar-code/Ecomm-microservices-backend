const express = require('express');
const router = express.Router();
const { getProducts, getProduct, getCategories, getBrands } = require('../controllers/productController');

// GET / - Get all products with filtering and pagination
router.get('/', getProducts);

// GET /categories - Get all product categories
router.get('/categories', getCategories);

// GET /brands - Get all product brands
router.get('/brands', getBrands);

// GET /:id - Get single product by ID
router.get('/:id', getProduct);

module.exports = router;
