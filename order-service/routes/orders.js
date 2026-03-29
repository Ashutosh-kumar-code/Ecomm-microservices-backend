const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getOrderById } = require('../controllers/orderController');
const authMiddleware = require('../middleware/auth');

// Apply auth middleware to all order routes
router.use(authMiddleware);

// POST /orders - Create new order
router.post('/', createOrder);

// GET /orders - Get user orders
router.get('/', getOrders);

// GET /orders/:id - Get order by ID
router.get('/:id', getOrderById);

module.exports = router;
