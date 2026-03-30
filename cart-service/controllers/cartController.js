const Cart = require('../models/Cart');
const mongoose = require('mongoose');

// GET /cart - Get user's cart
exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.userId });
    
    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: {
          items: [],
          totalAmount: 0,
          totalItems: 0
        }
      });
    }

    // Always fetch product details for all items in cart (no caching)
    for (let item of cart.items) {
      try {
        const axios = require('axios');
        const productResponse = await axios.get(`http://localhost:5000/api/v1/products/${item.product}`);
        const productData = productResponse.data?.product || productResponse.data;
        
        if (productData) {
          // Calculate discounted price to match frontend
          const discountPrice = productData.discount > 0 
            ? Math.round(productData.price * (1 - productData.discount / 100))
            : productData.price;

          item.name = productData.name;
          item.price = discountPrice;
          item.image = productData.images?.[0] || null;
          item.description = productData.description;
          item.category = productData.category;
          item.brand = productData.brand;
        } else {
          // Remove item if product not found
          cart.items = cart.items.filter(i => i.product.toString() !== item.product.toString());
        }
      } catch (error) {
        console.error('Failed to fetch product for cart item:', error.message);
        // Remove item if product not found
        cart.items = cart.items.filter(i => i._id.toString() !== item._id.toString());
      }
    }

    // Recalculate totals after any removals
    cart.totalItems = cart.items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
    cart.totalAmount = cart.items.reduce((sum, item) => {
      const quantity = Number(item.quantity) || 0;
      const price = Number(item.price) || 0;
      return sum + (quantity * price);
    }, 0);
    cart.totalAmount = Math.round(cart.totalAmount * 100) / 100;

    // Save updated cart with product details
    await cart.save();

    // Set cache headers to prevent caching
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');

    res.status(200).json({
      success: true,
      cart
    });
  } catch (error) {
    console.error('Get cart error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// POST /cart/add - Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, message: 'Product ID is required' });
    }

    // Fetch product details from product service API
    let productData;
    try {
      const axios = require('axios');
      const productResponse = await axios.get(`http://localhost:5000/api/v1/products/${productId}`);
      productData = productResponse.data?.product || productResponse.data;
    } catch (error) {
      console.error('Failed to fetch product:', error.message);
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    if (!productData) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Find user's cart
    let cart = await Cart.findOne({ user: req.userId });
    if (!cart) {
      // Create new cart
      cart = new Cart({
        user: req.userId,
        items: [],
        totalAmount: 0,
        totalItems: 0
      });
    }

    // Check if product already in cart
    const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    
    // Calculate discounted price to match frontend
    const discountPrice = productData.discount > 0 
      ? Math.round(productData.price * (1 - productData.discount / 100))
      : productData.price;

    if (existingItemIndex > -1) {
      // Update quantity if item exists
      cart.items[existingItemIndex].quantity += Number(quantity);
      cart.items[existingItemIndex].price = discountPrice; // Update to latest price
    } else {
      // Add new item with discount-adjusted price
      cart.items.push({
        product: productId,
        name: productData.name,
        price: discountPrice,
        image: productData.images?.[0] || null,
        description: productData.description,
        category: productData.category,
        brand: productData.brand,
        quantity: Number(quantity)
      });
    }

    // Recalculate totals
    cart.totalItems = cart.items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
    cart.totalAmount = cart.items.reduce((sum, item) => {
      const quantity = Number(item.quantity) || 0;
      const price = Number(item.price) || 0;
      return sum + (quantity * price);
    }, 0);
    cart.totalAmount = Math.round(cart.totalAmount * 100) / 100; // Round to 2 decimal places

    await cart.save();

    res.status(201).json({
      success: true,
      message: 'Item added to cart',
      cart
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// PUT /cart/update - Update cart item quantity
exports.updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity < 1) {
      return res.status(400).json({ success: false, message: 'Product ID and quantity are required' });
    }

    const cart = await Cart.findOne({ user: req.userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ success: false, message: 'Item not found in cart' });
    }

    // Connect to product-service database to get product info
    const productConnection = mongoose.createConnection('mongodb://localhost:27017/product_service');
    const ProductModel = productConnection.model('Product', new mongoose.Schema({}, { collection: 'products' }));
    
    const product = await ProductModel.findById(productId);
    await productConnection.close();
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ success: false, message: 'Insufficient stock' });
    }

    cart.items[itemIndex].quantity = quantity;
    
    // Recalculate totals
    cart.totalItems = cart.items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
    cart.totalAmount = cart.items.reduce((sum, item) => {
      const quantity = Number(item.quantity) || 0;
      const price = Number(item.price) || 0;
      return sum + (quantity * price);
    }, 0);
    cart.totalAmount = Math.round(cart.totalAmount * 100) / 100;

    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Cart updated',
      cart
    });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// DELETE /cart/remove/:productId - Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Item removed from cart',
      cart
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// DELETE /cart/clear - Clear entire cart
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Cart cleared',
      cart: {
        items: [],
        totalAmount: 0,
        totalItems: 0
      }
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
