const express = require('express');
const router = express.Router();
const { getCart, addToCart, updateCartItem, removeFromCart, clearCart } = require('../controllers/cartController');
const protect = require('../middleware/auth');

// All cart routes require authentication
router.use(protect);

// GET / - Get user's cart
router.get('/', getCart);

// POST /add - Add item to cart
router.post('/add', addToCart);

// PUT /update - Update cart item quantity
router.put('/update', updateCartItem);

// DELETE /remove/:productId - Remove item from cart
router.delete('/remove/:productId', removeFromCart);

// DELETE /clear - Clear entire cart
router.delete('/clear', clearCart);

module.exports = router;
